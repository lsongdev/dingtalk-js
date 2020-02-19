## dingtalk

> Simple DingTalk API for Node.js

### installation

```bash
~$ npm i dingtalk-bot-api
```

### example

```js
const DingTalk = require('dingtalk-bot-api');

const dingtalk = new DingTalk({
  access_token: '-- Your Access Token Here --'
});

dingtalk
.create()
.text('dingtalk is great!')
.send()
//-> "ok"
```

### licesne

This project is under MIT license.