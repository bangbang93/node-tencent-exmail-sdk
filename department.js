/**
 * Created by bangbang93 on 2016/12/16.
 */
'use strict';
const makeError = require('./util').makeError;
const Api = require('./api');

class Department extends Api{

  /**
   *
   * @param body.name
   * @param body.parentid
   * @param [body.order]
   * @returns {Promise.<Number>} 新建的部门id
   */
  create(body) {
    return this.request.post('/cgi-bin/department/create', {
      body,
      qs: {
        access_token: this.sdk.accessToken,
      },
    })
      .then((res) => {
        if (res.body.errcode) {
          throw makeError(res.body);
        }
        return res.body.id;
      });
  }

  /**
   *
   * @param body.id
   * @param body.name
   * @param body.partentid
   * @param [body.order]
   * @returns {Promise.<String>} updated
   */
  update(body) {
    return this.request.post('/cgi-bin/department/update', {
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
   * @param id
   * @returns {Promise.<String>}
   */
  del(id) {
    return this.request.get('/cgi-bin/department/delete', {
      qs: {
        access_token: this.sdk.accessToken,
        id,
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
   * @param id
   * @returns {Promise.<Array.<Object>>}
   * [{
           "id": 2,
           "name": "广州研发中心",
           "parentid": 1,
           "order": 10
       },{
           "id": 3
           "name": "邮箱产品部",
           "parentid": 2,
           "order": 40
       }]
   */
  list(id) {
    return this.request.get('/cgi-bin/department/list', {
      qs: {
        access_token: this.sdk.accessToken,
        id,
      },
    })
      .then((res) => {
        if (res.body.errcode) {
          throw makeError(res.body);
        }
        return res.body.department;
      });
  }

  /**
   *
   * @param [body.name]
   * @param [body.fuzzy]
   * @returns {Promise.<Array.<Object>>}
   * [{
           "id": 2,
           "name": "广州研发中心",
           "parentid": 1,
           "order": 10
       },{
           "id": 3
           "name": "邮箱产品部",
           "parentid": 2,
           "order": 40
       }]
   */
  search(body) {
    return this.request.post('/cgi-bin/department/search', {
      body,
      qs: {
        access_token: this.sdk.accessToken,
      },
    })
      .then((res) => {
        if (res.body.errcode) {
          throw makeError(res.body);
        }
        return res.body.department;
      });
  }
}

module.exports = Department;