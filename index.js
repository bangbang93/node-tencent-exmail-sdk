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
    this.corpId = corpId;
    this.corpSecret = corpSecret;
    this.init();
    this.request = request;
    this.department = new (require('./department'))(this);
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


  /**
   *
   * @param {Object} form
   * @param form.groupid
   * @param form.groupname
   * @param form.allow_type
   * @param [form.userlist]
   * @param [form.grouplist]
   * @param [form.department]
   * @param [form.allow_userlist]
   * @returns {Promise.<String>}
   */
  createGroup(form) {
    return request.post('/cgi-bin/group/create', {
      form,
      qs: {
        access_token: this.accessToken,
      },
    })
      .then((res) => {
        if (res.body.errcode) {
          throw makeError(res.body);
        }
        return res.body.errmsg;
      });
  }

  /**
   *
   * @param {Object} form
   * @param form.groupid
   * @param [form.groupname]
   * @param [form.allow_type]
   * @param [form.userlist]
   * @param [form.grouplist]
   * @param [form.department]
   * @param [form.allow_userlist]
   * @returns {Promise.<String>}
   */
  updateGroup(form) {
    return request.post('/cgi-bin/group/update', {
      form,
      qs: {
        access_token: this.accessToken,
      },
    })
      .then((res) => {
        if (res.body.errcode) {
          throw makeError(res.body);
        }
        return res.body.errmsg;
      });
  }

  deleteGroup(groupid) {
    return request.get('/cgi-bin/group/delete', {
      qs: {
        access_token: this.accessToken,
        groupid,
      },
    })
      .then((res) => {
        if (res.body.errcode) {
          throw makeError(res.body);
        }
        return res.body.errmsg;
      });
  }

  /**
   *
   * @param groupid
   * @returns {Promise.<Object>}
   */
  getGroup(groupid) {
    return request.get('/cgi-bin/group/get', {
      qs: {
        access_token: this.accessToken,
        groupid,
      },
    })
      .then((res) => {
        if (res.body.errcode) {
          throw makeError(res.body);
        }
        return res.body;
      });
  }
}


module.exports = TencentExmailSdk;
