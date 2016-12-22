/**
 * Created by bangbang93 on 2016/12/21.
 */
'use strict';
const Api = require('./api');
const makeError = require('./util').makeError;

class Mail extends Api {

  /**
   *
   * @param userId
   * @param beginDate
   * @param endDate
   * @returns {Promise.<Number>}
   */
  newCount(userId, beginDate, endDate) {
    return this.request.get('/cgi-bin/mail/newcount', {
      qs: {
        access_token: this.sdk.accessToken,
      },
      body: {
        userid: userId,
        begin_date: beginDate,
        end_date: endDate,
      }
    })
      .then((res)=>{
        if (res.body.errcode){
          throw makeError(res.body);
        }
        return res.body.count;
      })
  }
}