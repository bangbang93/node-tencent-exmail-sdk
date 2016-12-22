/**
 * Created by bangbang93 on 2016/12/21.
 */
'use strict';
const Api = require('./api');
const makeError = require('./util').makeError;

class Option extends Api {

  /**
   *
   * @param userId
   * @param type
   * @returns {Promise.<Array>}
   * [{"type":1,"value":"0"}, {"type":2,"value":"1"}, {"type":3,"value":"0"}]
   */
  get(userId, type) {
    return this.request.post('/cgi-bin/useroption/get', {
      qs: {
        access_token: this.sdk.accessToken,
      },
      body: {
        userid: userId,
        type,
      }
    })
      .then((res) => {
        if (res.body.errcode) {
          throw makeError(res.body);
        }
        return res.body.option;
      });
  }

  /**
   *
   * @param userId
   * @param option
   * @returns {Promise.<String>}
   */
  update(userId, option) {
    return this.request.post('/cgi-bin/useroption/update', {
      qs: {
        access_token: this.sdk.accessToken,
      },
      body: {
        userid: userId,
        option,
      }
    })
      .then((res) => {
        if (res.body.errcode) {
          throw makeError(res.body);
        }
        return res.body.errmsg;
      });
  }
}

module.exports = Option;