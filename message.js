
class Message {
  constructor(message) {
    Object.assign(this, message);
  }
  static create(message) {
    return new Message(message);
  }
  static reply(msgtype, data) {
    return {
      msgtype,
      [msgtype]: data,
      at: {
        atMobiles: [],
        isAtAll: false
      }
    };
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

module.exports = Message;