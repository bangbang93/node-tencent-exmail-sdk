/**
 * Created by bangbang93 on 2016/12/16.
 */
'use strict';
const makeError = require('./util').makeError;
const Api = require('./api');

class Group extends Api {
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
  create(form) {
    return this.request.post('/cgi-bin/group/create', {
      form,
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
  update(form) {
    return this.request.post('/cgi-bin/group/update', {
      form,
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