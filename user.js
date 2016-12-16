/**
 * Created by bangbang93 on 2016/12/16.
 */
'use strict';
const makeError = require('./util').makeError;
const Api = require('./api');

class User extends Api{
  /**
   *
   * @param {Object} form
   * @param form.userid
   * @param form.name
   * @param form.department
   * @param [form.position]
   * @param [form.mobile]
   * @param [form.tel]
   * @param [form.extid]
   * @param [form.gender]
   * @param [form.slaves]
   * @param [form.password]
   * @param [form.cpwd_login]
   * @returns {Promise.<String>}
   */
  create(form) {
    return this.request.post('/cgi-bin/user/create', {
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
   * @param form.userid
   * @param [form.name]
   * @param [form.department]
   * @param [form.position]
   * @param [form.mobile]
   * @param [form.tel]
   * @param [form.extid]
   * @param [form.gender]
   * @param [form.slaves]
   * @param [form.password]
   * @param [form.cpwd_login]
   * @returns {Promise.<String>}
   */
  update(form) {
    return this.request.post('/cgi-bin/user/update', {
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
   * @param userid
   * @returns {Promise.<String>}
   */
  del(userid) {
    return this.request.get('/cgi-bin/user/delete', {
      qs: {
        access_token: this.sdk.accessToken,
        userid,
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
   * @param userid
   * @returns {Promise.<String>}
   */
  get(userid) {
    return this.request.get('/cgi-bin/user/get', {
      qs: {
        access_token: this.sdk.accessToken,
        userid,
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
   * @param departmentId
   * @param fetchChild
   * @returns {Promise.<Array<Object>>}
   * [{
    "userid": "zhangsan@gzdev.com",
    "name": "李四",
    "t": [1, 2]
    }]
   */
  getByDepartment(departmentId, fetchChild) {
    return this.request.get('/cgi-bin/user/simplelist', {
      qs: {
        access_token: this.sdk.accessToken,
        department_id: departmentId,
        fetch_child: fetchChild,
      },
    })
      .then((res) => {
        if (res.body.errcode) {
          throw makeError(res.body);
        }
        return res.body.userlist;
      });
  }

  /**
   *
   * @param departmentId
   * @param fetchChild
   * @returns {Promise.<Array>}
   * [{
    "userid": "zhangsan@gzdev.com",
    "name": "李四",
    "department": [1, 2],
    "position": "后台工程师",
    "tel": "60000",
    "mobile": "15913215421",
    "extid": "123456789",
    "gender": "1",
    "enable": "1",
    "slaves": ["zhangsan@gz.com", "zhangsan@bjdev.com"],
    "cpwd_login": 0
  }]
   */
  getDetailByDepartment(departmentId, fetchChild) {
    return this.request.get('/cgi-bin/user/list', {
      qs: {
        access_token: this.sdk.accessToken,
        department_id: departmentId,
        fetch_child: fetchChild,
      },
    })
      .then((res) => {
        if (res.body.errcode) {
          throw makeError(res.body);
        }
        return res.body.userlist;
      });
  }

  /**
   *
   * @param userList
   * @returns {Promise.<Array>}
   * [
   {"user":"zhangsan@bjdev.com", "type":1},
   {"user":"zhangsangroup@shdev.com", "type":3}
   ]
   */
  check(userList) {
    return this.request.post('/cgi-bin/user/batchcheck', {
      form: {
        userlist: userList,
      },
      qs: {
        access_token: this.sdk.accessToken,
      },
    })
      .then((res) => {
        if (res.body.errcode) {
          throw makeError(res.body);
        }
        return res.body.list;
      });
  }
}

module.exports = User;