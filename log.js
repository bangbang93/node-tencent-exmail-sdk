/**
 * Created by bangbang93 on 2016/12/21.
 */
'use strict';
const Api = require('./api');
const makeError = require('./util').makeError;
const moment = require('moment');

class Log extends Api {

  /**
   *
   * @param domain
   * @param beginDate
   * @param endDate
   * @returns {Promise.<Object>}
   * {sendSum, recvSum}
   */
  mailStatus(domain, beginDate, endDate) {
    return this.request.post('/cgi-bin/log/mailstatus', {
      qs: {
        access_token: this.sdk.accessToken,
      },
      body: {
        domain,
        begin_date: moment(beginDate).format('yyyy-mm-dd'),
        end_date: moment(endDate).format('yyyy-mm-dd'),
      }
    })
      .then((res)=>{
        if (res.body.errcode){
          throw makeError(res.body);
        }
        return {
          sendSum: res.body['sendsum'],
          recvSum: res.body['recvsum'],
        };
      })
  }

  /**
   *
   * @param beginDate
   * @param endDate
   * @param mailType
   * @param [userId]
   * @param [subject]
   * @returns {Promise.<Array>}
   */
  mail(beginDate, endDate, mailType, userId, subject) {
    return this.request.post('/cgi-bin/log/mail', {
      qs: {
        access_token: this.sdk.accessToken,
      },
      body: {
        begin_date: moment(beginDate).format('yyyy-mm-dd'),
        end_date: moment(endDate).format('yyyy-mm-dd'),
        mailtype: mailType,
        userid: userId,
        subject
      }
    })
      .then((res)=>{
        if (res.body.errcode){
          throw makeError(res.body);
        }
        return res.body.list;
      })
  }

  /**
   *
   * @param beginDate
   * @param endDate
   * @param mailType
   * @param userId
   * @returns {Promise.<Array>}
   */
  login(beginDate, endDate, mailType, userId) {
    return this.request.post('/cgi-bin/log/login', {
      qs: {
        access_token: this.sdk.accessToken,
      },
      body: {
        userid: userId,
        begin_date: moment(beginDate).format('yyyy-mm-dd'),
        end_date: moment(endDate).format('yyyy-mm-dd'),
      }
    })
      .then((res)=>{
        if (res.body.errcode){
          throw makeError(res.body);
        }
        return res.body.list;
      })
  }

  /**
   *
   * @param beginDate
   * @param endDate
   * @returns {Promise.<Array>}
   */
  batchJob(beginDate, endDate) {
    return this.request.post('/cgi-bin/log/batchjob', {
      qs: {
        access_token: this.sdk.accessToken,
      },
      body: {
        begin_date: moment(beginDate).format('yyyy-mm-dd'),
        end_date: moment(endDate).format('yyyy-mm-dd'),
      }
    })
      .then((res)=>{
        if (res.body.errcode){
          throw makeError(res.body);
        }
        return res.body.list;
      })
  }

  /**
   *
   * @param type
   * @param beginDate
   * @param endDate
   * @returns {Promise.<Array>}
   */
  operation(type, beginDate, endDate) {
    return this.request.post('/cgi-bin/log/operation', {
      qs: {
        access_token: this.sdk.accessToken,
      },
      body: {
        type,
        begin_date: moment(beginDate).format('yyyy-mm-dd'),
        end_date: moment(endDate).format('yyyy-mm-dd'),
      }
    })
      .then((res)=>{
        if (res.body.errcode){
          throw makeError(res.body);
        }
        return res.body.list;
      })
  }


}

module.exports = Log;