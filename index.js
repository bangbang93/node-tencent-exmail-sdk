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
  createUser(form) {
    return request.post('/cgi-bin/user/create', {
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
  updateUser(form) {
    return request.post('/cgi-bin/user/update', {
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
   * @param userid
   * @returns {Promise.<String>}
   */
  deleteUser(userid) {
    return request.get('/cgi-bin/user/delete', {
      qs: {
        access_token: this.accessToken,
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
  getUser(userid) {
    return request.get('/cgi-bin/user/get', {
      qs: {
        access_token: this.accessToken,
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
  getDepartmentUser(departmentId, fetchChild) {
    return request.get('/cgi-bin/user/simplelist', {
      qs: {
        access_token: this.accessToken,
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
  getDepartmentUserDetail(departmentId, fetchChild) {
    return request.get('/cgi-bin/user/list', {
      qs: {
        access_token: this.accessToken,
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
  checkUser(userList) {
    return request.post('/cgi-bin/user/batchcheck', {
      form: {
        userlist: userList,
      },
      qs: {
        access_token: this.accessToken,
      },
    })
      .then((res) => {
        if (res.body.errcode) {
          throw makeError(res.body);
        }
        return res.body.list;
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
