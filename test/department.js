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
          console.log(id);
        })
    });
    it('list', function () {
      return sdk.department.list(1)
        .then((res)=>{
          res.should.be.Array();
          res.length.should.greaterThanOrEqual(1);
          res.some((dep)=>dep.name == 'tencent-exmail-sdk-test').should.eql(true);
          id = res[res.length - 1].id;
        })
    });
    it('update', function () {
      return sdk.department.update({
        id,
        name: 'tencent-exmail-sdk-test2',
        parentid: 1
      })
        .then((res)=>{
          res.should.eql('updated')
        })
    });
    it('list', function () {
      return sdk.department.list(1)
        .then((res)=>{
          res.should.be.Array();
          res.length.should.greaterThanOrEqual(1);
          res.some((dep)=>dep.name == 'tencent-exmail-sdk-test2').should.eql(true);
          id = res[res.length - 1].id;
        })
    });
    it('search', function () {
      return sdk.department.search({
        name: 'tencent-exmail-sdk-test'
      })
        .then((res)=>{
          res.should.be.Array();
          res.length.should.greaterThanOrEqual(1);
          res.some((dep)=>dep.name == 'tencent-exmail-sdk-test2').should.eql(true);
        })
    });
    it('delete', function () {
      return sdk.department.del(id)
        .then((res)=>{
          res.should.eql('deleted');
        })
    })
  })
};