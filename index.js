const https = require('https');
const { URL } = require('url');
const { createHmac } = require('crypto');
const EventEmitter = require('events');

const post = (url, query, body) =>
  new Promise((resolve, reject) => {
    const u = new URL(url);
    Object.keys(query).forEach(k =>
      u.searchParams.append(k, query[k]));
    const headers = {
      'content-type': 'application/json'
    };
    const req = https.request(u, {
      method: 'POST',
      headers
    }, resolve);
    req.on('error', reject);
    if (body) {
      if (typeof body !== 'string')
        body = JSON.stringify(body);
      req.write(body);
    }
    req.end();
  });

const readStream = stream =>
  new Promise((resolve, reject) => {
    var buf = '';
    stream
      .on('error', reject)
      .on('data', chunk => buf += chunk)
      .on('end', () => resolve(buf));
  });

/**
 * DingTalk
 * @docs https://open-doc.dingtalk.com/microapp/serverapi2/qf2nxq
 */
class DingTalk extends EventEmitter {
  constructor(options) {
    super();
    Object.assign(this, {
      api: 'https://oapi.dingtalk.com/robot/send'
    }, options);
  }
  send(message) {
    if (!(message instanceof Message))
      throw new TypeError('"message" must be instance of Message');
    const { api, access_token, secret } = this;
    const timestamp = Date.now();
    const str = [timestamp, secret].join('\n');
    const hash = createHmac('sha256', secret);
    const sign = hash.update(str).digest('base64');
    return Promise
      .resolve()
      .then(() => post(api, { access_token, timestamp, sign }, message))
      .then(readStream)
      .then(JSON.parse)
      .then(res => {
        const { errcode, errmsg } = res;
        const error = new Error(errmsg);
        error.code = errcode;
        if (errcode === 0) return errmsg;
        else throw error;
      });
  }
  create(message) {
    const dingtalk = this;
    return Message.create(Object.assign({
      dingtalk
    }, message));
  }
  text(content) {
    const message = new Message();
    message.text(content);
    return this.send(message);
  }
}

class Message {
  constructor(message) {
    Object.assign(this, message);
  }
  static create(message) {
    return new Message(message);
  }
  at(isAtAll, atMobiles) {
    this.at = { isAtAll, atMobiles };
    return this;
  }
  text(content) {
    this.msgtype = 'text';
    this.text = { content };
    return this;
  }
  link(title, link, options) {
    this.msgtype = 'link';
    if (typeof title === 'object') {
      this.link = title;
    } else {
      this.link = Object.assign({
        title,
        text: title,
        messageUrl: link,
      }, options);
    }
    return this;
  }
  markdown(title, text) {
    this.msgtype = 'markdown';
    this.markdown = { title, text };
    return this;
  }
  actionCard(actionCard) {
    this.msgtype = 'actionCard';
    this.actionCard = actionCard;
    return this;
  }
  feedCard(feedCard) {
    this.msgtype = 'feedCard';
    this.feedCard = feedCard;
    return this;
  }
  send() {
    if (!this.dingtalk)
      throw new Error('Can not access DingTalk instance');
    return this.dingtalk.send(this);
  }
}

DingTalk.Message = Message;

module.exports = DingTalk;