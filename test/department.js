/**
 * Created by bangbang93 on 2016/12/21.
 */
'use strict';
module.exports = function (sdk) {
  describe('department', function () {
    let id;
    it('create', function () {
      return sdk.department.create({
        name: 'tencent-exmail-sdk-test',
        parentid: 1
      })
        .then((res)=>{
          res.should.be.Number();
          id = res;
        })
    });
    it('update', function () {
      return sdk.department.update({
        id,
        name: 'tencent-exmail-sdk-test2',
        parentid: 0
      })
        .then((res)=>{
          res.should.eql('updated')
        })
    });
    it('list', function () {
      return sdk.department.list(0)
        .then((res)=>{
          res.should.be.Array();
          res.length.should.greaterThanOrEqual(1);
          res.some((dep)=>dep.name == 'tencent-exmail-sdk-test2').length.should.eql(1);
        })
    });
    it('search', function () {
      return sdk.department.search({
        name: 'tencent-exmail-sdk-test'
      })
        .then((res)=>{
          res.should.be.Array();
          res.length.should.greaterThanOrEqual(1);
          res.some((dep)=>dep.name == 'tencent-exmail-sdk-test2').length.should.eql(1);
        })
    })
  })
};