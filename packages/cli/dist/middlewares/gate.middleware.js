"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupGateProtection = setupGateProtection;
const config_1 = require("@n8n/config");
const di_1 = require("@n8n/di");
const node_crypto_1 = require("node:crypto");
const GATE_COOKIE_NAME = 'n8n-gate';
const GATE_COOKIE_MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000;
const BYPASS_PREFIXES = ['/healthz', '/favicon.ico'];
function shouldBypassGate(path) {
    if (path === '/gate/verify')
        return true;
    const { endpoints } = di_1.Container.get(config_1.GlobalConfig);
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
function parseCookieValue(cookieHeader, name) {
    if (!cookieHeader)
        return undefined;
    const match = cookieHeader.split(';').find((c) => c.trim().startsWith(`${name}=`));
    if (!match)
        return undefined;
    return decodeURIComponent(match.trim().substring(name.length + 1));
}
function parseFormBody(req) {
    return new Promise((resolve) => {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk.toString();
            if (body.length > 1024) {
                body = body.substring(0, 1024);
            }
        });
        req.on('end', () => {
            const params = {};
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
function generateSignature(code) {
    return (0, node_crypto_1.createHmac)('sha256', code).update('n8n-gate-verified').digest('hex');
}
function verifySignature(signature, code) {
    const expected = generateSignature(code);
    if (signature.length !== expected.length)
        return false;
    return (0, node_crypto_1.timingSafeEqual)(Buffer.from(signature), Buffer.from(expected));
}
function getGatePageHtml(errorMessage = '') {
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
function setupGateProtection(app) {
    const gateCode = di_1.Container.get(config_1.GlobalConfig).gate.code;
    if (!gateCode)
        return;
    app.post('/gate/verify', (req, res) => {
        void (async () => {
            const body = await parseFormBody(req);
            const submittedCode = body.code ?? '';
            if (submittedCode === gateCode) {
                const signature = generateSignature(gateCode);
                res.setHeader('Set-Cookie', `${GATE_COOKIE_NAME}=${signature}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${Math.floor(GATE_COOKIE_MAX_AGE_MS / 1000)}`);
                res.redirect('/');
                return;
            }
            res.status(401).send(getGatePageHtml('Invalid access code. Please try again.'));
        })();
    });
    app.use((req, res, next) => {
        if (shouldBypassGate(req.path)) {
            next();
            return;
        }
        const cookieValue = parseCookieValue(req.headers.cookie, GATE_COOKIE_NAME);
        if (cookieValue && verifySignature(cookieValue, gateCode)) {
            next();
            return;
        }
        const accept = req.headers.accept ?? '';
        const { endpoints } = di_1.Container.get(config_1.GlobalConfig);
        if (req.path.startsWith(`/${endpoints.rest}/`) ||
            (!accept.includes('text/html') && !accept.includes('*/*'))) {
            res.status(401).json({
                message: 'Access code required. Visit the site in a browser to enter the code.',
            });
            return;
        }
        res.status(401).send(getGatePageHtml());
    });
}
//# sourceMappingURL=gate.middleware.js.map