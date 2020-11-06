const http = require('http');
const dingtalk = require('../server');

const { 
  DINGTALK_BOT_SECRET: secret,
} = process.env;

const app = dingtalk({ secret }, async (content, message) => {
  console.log('message:', message);
  return reply('text', { content });
});

http.createServer(app).listen(3002);
