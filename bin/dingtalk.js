#!/usr/bin/env node

const DingTalk = require('..');

const { 
  DINGTALK_BOT_TOKEN: access_token, 
  DINGTALK_BOT_SECRET: secret 
} = process.env;

const message = process.argv.slice(2).join(' ');

const dingtalk = new DingTalk({
  secret,
  access_token
});

(async () => {

  dingtalk
    .create()
    .text(message)
    .send()
})();
