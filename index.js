/**
 * Created by bangbang93 on 2016/12/16.
 */

const BASE_URL = 'https://api.exmail.qq.com';
const makeError = require('./util').makeError;

const request = require('co-request').defaults({
  baseUrl: BASE_URL,
  json: true,
});

class TencentExmailSdk {
  /**
   *
   * @param corpId
   * @param corpSecret
   */
  constructor({ corpId, corpSecret }) {
    if (!corpId || !corpSecret){
      throw new Error('corpId and corpSecret can not be null');
    }
    this.corpId = corpId;
    this.corpSecret = corpSecret;
    this.request = request;
    this.department = new (require('./department'))(this);
    this.user = new (require('./user'))(this);
    this.group = new (require('./group'))(this);
    this.option = new (require('./option'))(this);
    this.log = new (require('./log'))(this);

  }

  init() {
    return request.get('/cgi-bin/gettoken', {
      qs: {
        corpid: this.corpId,
        corpsecret: this.corpSecret,
      },
    })
      .then((res) => {
        if (res.body.errcode) {
          throw makeError(res.body);
        }
        this.accessToken = res.body.access_token;
        this.expireIn = res.body.expire_in;
        this.loginTime = new Date();
        this.expire = (this.loginTime.valueOf() / 1000) + this.expireIn;
        setInterval(this.init.bind(this), this.expireIn - 60);
        return res.body;
      });
  }

}


module.exports = TencentExmailSdk;
