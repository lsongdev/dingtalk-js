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
    .text(`@宙斯 发布了新的 📦 npm packages 🎉:

+ @alipay/flyover
+ @alipay/flyover-hooks
+ @alipay/mybank-hooks

详情请查看：https://npm.alibaba-inc.com/~zeus.ls
`)
.at(true)
.send()

})();
