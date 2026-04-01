const express = require('express');
const app = express();

function parseFormBody(req) {
	return new Promise((resolve) => {
		let body = '';
		req.on('data', (chunk) => {
			body += chunk.toString();
		});
		req.on('end', () => {
			console.log("Stream ended, body:", body);
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

const p = new Promise(resolve => resolve());
app.post('/gate/verify', (req, res) => {
  p.then(async () => {
    console.log("in post");
    const body = await parseFormBody(req);
    res.json(body);
  });
});

app.use((req, res, next) => {
  console.log("Middleware");
  next();
});

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const srv = app.listen(3002, () => {
  const http = require('http');
  const req = http.request({
    method: 'POST', port: 3002, path: '/gate/verify',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  }, res => {
    let data = '';
    res.on('data', c => data += c.toString());
    res.on('end', () => { console.log("res:", data); srv.close(); });
  });
  req.write('code=123');
  req.end();
});
