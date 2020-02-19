const assert = require('assert');
const test = require('./test');
const DingTalk = require('..');

const dingtalk = new DingTalk({
  secret: `SEC1b7e758d18b5771d1823e19ca0e57f7d785754cbc4bda0dee7efc986834cb0df`,
  access_token: `175c5a3f0e419611d00517c0b4ab0892f7c5d54059dcb39efc89338a0f344ac2`
});

test('dingtalk#send', async () => {
  const message = dingtalk
    .create()
    .text('dingtalk normal message')

  const res = await message.send();
  assert.equal(res, 'ok', res);
});

test('dingtalk#link', async () => {
  const message = dingtalk
    .create()
    .link('Alipay', 'https://alipay.com')

  const res = await message.send();
  assert.equal(res, 'ok', res);
});