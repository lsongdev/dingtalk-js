const http = require('http');
const dingtalk = require('../server');

const app = dingtalk({
  secret: '_QiOA0W298zwRWaXZ4ZjzjIh6HAcqcqWAzg5FfaO2mgojT1v96w-VfkbBK_rPL2Q'
}, async (content, message) => {
  console.log('message:', message);
  return reply('text', { content });
});

http.createServer(app).listen(3002);
