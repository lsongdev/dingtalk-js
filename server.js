const crypto = require('crypto');

const readStream = req => new Promise((resolve, reject) => {
  var output = '';
  req
    .on('error', reject)
    .on('data', c => output += c)
    .on('end', () => resolve(output));
});

const dingtalk = ({ secret }, fn) => {
  return async (req, res) => {
    const { timestamp, sign, token } = req.headers;
    const str = [timestamp, secret].join('\n');
    const sha256 = crypto.createHmac('sha256', secret);
    const hash = sha256.update(str).digest('base64');
    if (hash !== sign) return res.end('Invalid Signature');
    const data = await readStream(req);
    const body = JSON.parse(data);
    const { msgtype } = body;
    const message = await fn(body[msgtype].content, body);
    res.end(JSON.stringify(message));
  };
};

module.exports = dingtalk;