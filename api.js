/**
 * Created by bangbang93 on 2016/12/16.
 */
'use strict';

class Api {
  constructor(sdk){
    this.request = sdk.request;
    this.sdk = sdk;
  }
}

module.exports = Api;