/**
 * Created by bangbang93 on 2016/12/16.
 */
'use strict';
const SDK = require('../');
const sdk = new SDK({
  corpSecret: 'a',
  corpId: 'b'
});

sdk.department.create();
sdk.department.update();