/**
 * Created by bangbang93 on 2016/12/16.
 */
'use strict';
const SDK = require('../');
const sdk = new SDK({
  corpSecret: process.env.secret,
  corpId: process.env.id,
});
require('should');

before('init', function () {
  return sdk.init()
    .then(()=>{
      console.log(sdk.accessToken);
    })
});

require('./department')(sdk);
