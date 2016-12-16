/**
 * Created by bangbang93 on 2016/12/16.
 */
'use strict';
const co = require('co');
const querystring = require('querystring');

const BASE_URL = 'https://api.exmail.qq.com';

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
  constructor({corpId, corpSecret}){
    this._corpId = corpId;
    this._corpSecret = corpSecret;
    this.init();
  }

  init(){
    return request.get('/cgi-bin/gettoken', {
      qs: {
        corpid: this._corpId,
        corpsecret: this._corpSecret,
      }
    })
      .then((res)=>{
        let body = res.body;
        if (body['errcode']){
          let err = new Error(body['errmsg']);
          err.errcode = body.errcode;
          throw err;
        }
        this._accessToken = body['access_token'];
        this._expireIn = body['expire_in'];
        this._loginTime = new Date();
        this._expire = this._loginTime.valueOf() / 1000 + this._expireIn;
        setInterval(this.init.bind(this), this._expireIn - 60);
        return body;
      })
  }

  /**
   *
   * @param name
   * @param parentid
   * @param order
   * @returns {Promise.<Number>} 新建的部门id
   */
  createDepartment(name, parentid, order){
    return request.post('/cgi-bin/department/create', {
      form: {
        name,
        parentid,
        order
      },
      qs: {
        access_token: this._accessToken
      }
    })
      .then((res)=>{
        let body = res.body;
        if (body.errcode == 0){
          return body.id;
        } else {
          throw makeError(body);
        }
      })
  }

  /**
   *
   * @param id
   * @param name
   * @param partentid
   * @param order
   * @returns {Promise}
   */
  updateDepartment(id, {name, partentid, order}){
    return request.post('/cgi-bin/department/update', {
      form: {
        id, name, partentid, order
      },
      qs: {
        access_token: this._accessToken
      }
    })
      .then((res)=>{
        let body = res.body;
        if (body.errcode == 0){
          return true;
        } else {
          throw makeError(body);
        }
      })
  }

  /**
   *
   * @param id
   * @returns {Promise}
   */
  deleteDepartment(id){
    return request.get('/cgi-bin/department/delete', {
      qs: {
        access_token: this._accessToken,
        id
      }
    })
      .then((res)=>{
        let body = res.body;
        if (body.errcode == 0){
          return true;
        } else {
          throw makeError(body);
        }
      })
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
  listDepartment(id){
    return request.get('/cgi-bin/department/list', {
      qs: {
        access_token: this._accessToken,
        id
      }
    })
      .then((res)=>{
        let body = res.body;
        if (body.errcode == 0){
          return body['department'];
        } else {
          throw makeError(body);
        }
      })
  }

  /**
   *
   * @param name
   * @param fuzzy
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
  searchDepartment(name, fuzzy){
    return request.post('/cgi-bin/department/search', {
      form: {
        name,
        fuzzy,
      },
      qs: {
        access_token: this._accessToken
      }
    })
      .then((res)=>{
        let body = res.body;
        if (body.errcode == 0){
          return body['department'];
        } else {
          throw makeError(body);
        }
      })
  }



}

/**
 *
 * @param body
 * @returns {Error}
 */
function makeError(body){
  let err = new Error(body.errmsg);
  err.errcode = body.errcode;
  return err;
}