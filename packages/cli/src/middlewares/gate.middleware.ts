import { GlobalConfig } from '@n8n/config';
import { Container } from '@n8n/di';
import type { Application, Request, Response, NextFunction } from 'express';
import { createHmac, timingSafeEqual } from 'node:crypto';

const GATE_COOKIE_NAME = 'n8n-gate';
const GATE_COOKIE_MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

/** Paths that natively bypass the gate protection */
const BYPASS_PREFIXES = ['/healthz', '/favicon.ico'];

/** Check if a request path should bypass the gate */
function shouldBypassGate(path: string): boolean {
	if (path === '/gate/verify') return true;

	const { endpoints } = Container.get(GlobalConfig);
	const bypassPrefixes = [
		...BYPASS_PREFIXES,
		`/${endpoints.webhook}`,
		`/${endpoints.webhookTest}`,
		`/${endpoints.webhookWaiting}`,
		`/${endpoints.form}`,
		`/${endpoints.formTest}`,
		`/${endpoints.formWaiting}`,
		`/${endpoints.mcp}`,
		`/${endpoints.mcpTest}`,
	];

	return bypassPrefixes.some((p) => path === p || path.startsWith(`${p}/`));
}

/** Parse a specific cookie value from the raw Cookie header */
function parseCookieValue(cookieHeader: string | undefined, name: string): string | undefined {
	if (!cookieHeader) return undefined;
	const match = cookieHeader.split(';').find((c) => c.trim().startsWith(`${name}=`));
	if (!match) return undefined;
	return decodeURIComponent(match.trim().substring(name.length + 1));
}

/** Parse URL-encoded form body from raw request */
function parseFormBody(req: Request): Promise<Record<string, string>> {
	return new Promise((resolve) => {
		let body = '';
		req.on('data', (chunk: Buffer) => {
			body += chunk.toString();
			// Limit body size to 1KB to prevent abuse
			if (body.length > 1024) {
				body = body.substring(0, 1024);
			}
		});
		req.on('end', () => {
			const params: Record<string, string> = {};
			for (const pair of body.split('&')) {
				const [key, value] = pair.split('=');
				if (key && value !== undefined) {
					params[decodeURIComponent(key)] = decodeURIComponent(value.replace(/\+/g, ' '));
				}
			}
			resolve(params);
		});
		req.on('error', () => resolve({}));
	});
}

/** Generate HMAC signature for the gate cookie */
function generateSignature(code: string): string {
	return createHmac('sha256', code).update('n8n-gate-verified').digest('hex');
}

/** Verify the gate cookie signature */
function verifySignature(signature: string, code: string): boolean {
	const expected = generateSignature(code);
	if (signature.length !== expected.length) return false;
	return timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
}

/** Self-contained HTML page for the gate code entry */
function getGatePageHtml(errorMessage = ''): string {
	const errorBlock = errorMessage ? `<div class="error">${errorMessage}</div>` : '';

	return `<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<title>n8n - Access Gate</title>
	<style>
		* { margin: 0; padding: 0; box-sizing: border-box; }
		body {
			font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
			min-height: 100vh;
			display: flex;
			align-items: center;
			justify-content: center;
			background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
			color: #e0e0e0;
		}
		.container {
			background: rgba(255, 255, 255, 0.05);
			backdrop-filter: blur(20px);
			border: 1px solid rgba(255, 255, 255, 0.1);
			border-radius: 16px;
			padding: 48px 40px;
			width: 100%;
			max-width: 420px;
			box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
		}
		.logo {
			text-align: center;
			margin-bottom: 32px;
		}
		.logo h1 {
			font-size: 28px;
			font-weight: 700;
			background: linear-gradient(135deg, #ff6b35, #ff8c42);
			-webkit-background-clip: text;
			-webkit-text-fill-color: transparent;
			background-clip: text;
		}
		.logo p {
			color: #8a8fa8;
			margin-top: 8px;
			font-size: 14px;
		}
		form { display: flex; flex-direction: column; gap: 16px; }
		label {
			font-size: 13px;
			font-weight: 500;
			color: #a0a5b8;
			text-transform: uppercase;
			letter-spacing: 0.5px;
		}
		input[type="password"] {
			width: 100%;
			padding: 14px 16px;
			border: 1px solid rgba(255, 255, 255, 0.15);
			border-radius: 10px;
			background: rgba(255, 255, 255, 0.08);
			color: #fff;
			font-size: 16px;
			outline: none;
			transition: border-color 0.2s, box-shadow 0.2s;
		}
		input[type="password"]:focus {
			border-color: #ff6b35;
			box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.15);
		}
		input[type="password"]::placeholder { color: #555; }
		button {
			padding: 14px;
			border: none;
			border-radius: 10px;
			background: linear-gradient(135deg, #ff6b35, #e85d26);
			color: #fff;
			font-size: 16px;
			font-weight: 600;
			cursor: pointer;
			transition: transform 0.15s, box-shadow 0.15s;
		}
		button:hover {
			transform: translateY(-1px);
			box-shadow: 0 6px 20px rgba(255, 107, 53, 0.3);
		}
		button:active { transform: translateY(0); }
		.error {
			background: rgba(239, 68, 68, 0.15);
			border: 1px solid rgba(239, 68, 68, 0.3);
			color: #fca5a5;
			padding: 12px 16px;
			border-radius: 8px;
			font-size: 14px;
			text-align: center;
		}
	</style>
</head>
<body>
	<div class="container">
		<div class="logo">
			<h1>n8n</h1>
			<p>Enter access code to continue</p>
		</div>
		${errorBlock}
		<form method="POST" action="/gate/verify">
			<label for="gate-code">Access Code</label>
			<input type="password" id="gate-code" name="code" placeholder="Enter your access code" autocomplete="off" autofocus required />
			<button type="submit">Verify &amp; Continue</button>
		</form>
	</div>
</body>
</html>`;
}

/**
 * Express middleware that gates all access to n8n behind an access code.
 * Enable by setting N8N_GATE_CODE environment variable.
 * When enabled, users must enter the code before accessing any page or API.
 *
 * This middleware is self-contained — it manually parses cookies from the
 * Cookie header and form bodies from raw request data, since it runs before
 * n8n's standard body parsers and n8n does not use cookie-parser.
 */
export function setupGateProtection(app: Application): void {
	const gateCode = Container.get(GlobalConfig).gate.code;

	// Gate is disabled if no code is configured
	if (!gateCode) return;

	// POST /gate/verify — validate the submitted code
	app.post('/gate/verify', (req: Request, res: Response): void => {
		void (async () => {
			const body = await parseFormBody(req);
			const submittedCode = body.code ?? '';

			if (submittedCode === gateCode) {
				const signature = generateSignature(gateCode);
				res.setHeader(
					'Set-Cookie',
					`${GATE_COOKIE_NAME}=${signature}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${Math.floor(GATE_COOKIE_MAX_AGE_MS / 1000)}`,
				);
				res.redirect('/');
				return;
			}

			// Wrong code — show gate page with error
			res.status(401).send(getGatePageHtml('Invalid access code. Please try again.'));
		})();
	});

	// Gate middleware — check cookie on every request
	app.use((req: Request, res: Response, next: NextFunction): void => {
		// Allow bypass paths (health checks, verify endpoint, etc.)
		if (shouldBypassGate(req.path)) {
			next();
			return;
		}

		// Check for valid gate cookie (manually parsed from Cookie header)
		const cookieValue = parseCookieValue(req.headers.cookie, GATE_COOKIE_NAME);
		if (cookieValue && verifySignature(cookieValue, gateCode)) {
			next();
			return;
		}

		// For API requests, return 401 JSON
		const accept = req.headers.accept ?? '';
		const { endpoints } = Container.get(GlobalConfig);
		if (
			req.path.startsWith(`/${endpoints.rest}/`) ||
			(!accept.includes('text/html') && !accept.includes('*/*'))
		) {
			res.status(401).json({
				message: 'Access code required. Visit the site in a browser to enter the code.',
			});
			return;
		}

		// For browser requests, show the gate page
		res.status(401).send(getGatePageHtml());
	});
}
