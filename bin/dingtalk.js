#!/usr/bin/env node

const DingTalk = require('..');

const { DINGTALK_BOT_TOKEN: access_token } = process.env;
const message = process.argv.slice(2).join(' ');

const dingtalk = new DingTalk({
  access_token
});

(async () => {

  dingtalk
    .create()
    .text(message)
    .send()
})();
