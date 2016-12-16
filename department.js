/**
 * Created by bangbang93 on 2016/12/16.
 */
'use strict';
const makeError = require('./util').makeError;

class Department {

  constructor(sdk){
    this.request = sdk.request;
    this.sdk = sdk;
  }

  /**
   *
   * @param form.name
   * @param form.parentid
   * @param [form.order]
   * @returns {Promise.<Number>} 新建的部门id
   */
  create(form) {
    return this.request.post('/cgi-bin/department/create', {
      form,
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
   * @param form.id
   * @param form.name
   * @param form.partentid
   * @param [form.order]
   * @returns {Promise.<String>}
   */
  update(form) {
    return this.request.post('/cgi-bin/department/update', {
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
   * @param form.name
   * @param form.fuzzy
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
  search(form) {
    return this.request.post('/cgi-bin/department/search', {
      form,
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