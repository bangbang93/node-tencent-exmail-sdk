/**
 * Created by bangbang93 on 2016/12/16.
 */
'use strict';
const makeError = require('./util').makeError;
const Api = require('./api');

class User extends Api{
  /**
   *
   * @param {Object} body
   * @param body.userid
   * @param body.name
   * @param body.department
   * @param [body.position]
   * @param [body.mobile]
   * @param [body.tel]
   * @param [body.extid]
   * @param [body.gender]
   * @param [body.slaves]
   * @param [body.password]
   * @param [body.cpwd_login]
   * @returns {Promise.<String>}
   */
  create(body) {
    return this.request.post('/cgi-bin/user/create', {
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
   * @param body.userid
   * @param [body.name]
   * @param [body.department]
   * @param [body.position]
   * @param [body.mobile]
   * @param [body.tel]
   * @param [body.extid]
   * @param [body.gender]
   * @param [body.slaves]
   * @param [body.password]
   * @param [body.cpwd_login]
   * @returns {Promise.<String>}
   */
  update(body) {
    return this.request.post('/cgi-bin/user/update', {
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
      body: {
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