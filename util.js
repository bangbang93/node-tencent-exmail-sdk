/**
 * Created by bangbang93 on 2016/12/16.
 */
'use strict';


/**
 *
 * @param body
 * @returns {Error}
 */
exports.makeError = function makeError(body) {
  const err = new Error(body.errmsg);
  err.errcode = body.errcode;
  return err;
};