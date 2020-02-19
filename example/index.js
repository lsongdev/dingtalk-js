const DingTalk = require('..');

const { 
  DINGTALK_BOT_TOKEN: access_token,
  DINGTALK_BOT_SECRET: secret,
} = process.env;

const dingtalk = new DingTalk({
  secret,
  access_token
});

(async () => {

  dingtalk
    .create()
    .text('dingtalk is great!')
    .send()

})();
