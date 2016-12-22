/**
 * Created by bangbang93 on 2016/12/16.
 */
'use strict';
const makeError = require('./util').makeError;
const Api = require('./api');

class Group extends Api {
  /**
   *
   * @param {Object} body
   * @param body.groupid
   * @param body.groupname
   * @param body.allow_type
   * @param [body.userlist]
   * @param [body.grouplist]
   * @param [body.department]
   * @param [body.allow_userlist]
   * @returns {Promise.<String>}
   */
  create(body) {
    return this.request.post('/cgi-bin/group/create', {
      body,
      qs: {
        access_token: this.sdk.accessToken,
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
   * @param {Object} body
   * @param body.groupid
   * @param [body.groupname]
   * @param [body.allow_type]
   * @param [body.userlist]
   * @param [body.grouplist]
   * @param [body.department]
   * @param [body.allow_userlist]
   * @returns {Promise.<String>}
   */
  update(body) {
    return this.request.post('/cgi-bin/group/update', {
      body,
      qs: {
        access_token: this.sdk.accessToken,
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
   * @returns {Promise.<String>}
   */
  del(groupid) {
    return this.request.get('/cgi-bin/group/delete', {
      qs: {
        access_token: this.sdk.accessToken,
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
  get(groupid) {
    return this.request.get('/cgi-bin/group/get', {
      qs: {
        access_token: this.sdk.accessToken,
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

module.exports = Group;