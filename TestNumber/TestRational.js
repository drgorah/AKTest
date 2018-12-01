"use strict";

(function() {
 function define() {
  var rational = {
   name: 'number.rational',
   body: [],
   add: function(t) {this.body.push(t);}
  };

  try {
   var eps = 2*ak.EPSILON;
  
   var r0  = ak.rational(1);
   var r1  = ak.rational(1, 2);
   var r2  = ak.rational(1.9, 2.1);
   var r3  = ak.rational(-2, 4);
   var r4  = r1;
   var r5  = ak.rational({num: 1, den: 2});
   var r6  = ak.rational(1, 0);
   var r7  = ak.rational(-2, 0);
   var r8  = ak.rational(0, 3);
   var r9  = ak.rational(0, -4);
   var r10 = ak.rational(ak.INT_MAX+1, 4);
   var r11 = ak.rational(5, ak.INT_MAX+1);
   var r12 = ak.rational(0, 0);
   var r13 = ak.rational(ak.INFINITY, ak.INFINITY);
   var r14 = ak.rational(2);
   var r15 = ak.rational(7, 5);
  
   var free = {
    name: 'free',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   free.add('hcf - common',   function(){return ak.hcf(24, 30)===6 && ak.hcf(-62, 12)===2;});
   free.add('hcf - coprime',  function(){return ak.hcf(24, 35)===1 && ak.hcf(-38, 33)===1;});
   free.add('hcf - zero',     function(){return ak.hcf(0, 35)===35 && ak.hcf(0, 0)===0;});
   free.add('hcf - infinite', function(){return ak.hcf(ak.INFINITY, 12)===12 && ak.hcf(ak.INFINITY, -ak.INFINITY)===ak.INFINITY;});
   free.add('hcf - invalid',  function(){return isNaN(ak.hcf(ak.NaN, 1));});
  
   var init = {
    name: 'init',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   init.add('numbers',  function(){return ak.type(r0)===ak.RATIONAL_T && r0.num()===1 && r0.den()===1 && ak.type(r1)===ak.RATIONAL_T && r1.num()===1 && r1.den()===2 && ak.type(r2)===ak.RATIONAL_T && r2.num()===1 && r2.den()===2 && ak.type(r3)===ak.RATIONAL_T && r3.num()===-1 && r3.den()===2});
   init.add('rational', function(){return ak.eq(r4, r1);});
   init.add('object',   function(){return ak.eq(r5, r1);});
   init.add('infinity', function(){return r6.num()===ak.INFINITY && r6.den()===1 && r7.num()===-ak.INFINITY && r7.den()===1;});
   init.add('zero',     function(){return r8.num()===0 && r8.den()===1 && r9.num()===0 && r9.den()===1;});
   init.add('overflow', function(){return r10.num()===ak.INFINITY && r10.den()===1 && r11.num()===0 && r11.den()===1;});  
   init.add('invalid',  function(){return isNaN(r12.num()) && isNaN(r12.den()) && isNaN(r13.num()) && isNaN(r13.den())});
  
   var members = {
    name: 'members',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   members.add('toNumber', function(){return ak.diff(r1.toNumber(), 0.5)<eps;});
   members.add('toString', function(){return r1.toString()==='1/2';});
   members.add('valueOf',  function(){return isNaN(1 - r0);});
  
   var operators = {
    name: 'operators',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   operators.add('abs',  function(){return ak.eq(ak.abs(r3), r1);});
   operators.add('inv',  function(){return ak.eq(ak.inv(r1), r14);});
   operators.add('neg',  function(){return ak.eq(ak.neg(r3), r1);});
  
   operators.add('add',  function(){return ak.eq(ak.add(r1, r2), r0);});
   operators.add('cmp',  function(){return ak.cmp(r1, r2)===0 && ak.cmp(r0, r1)>0 && ak.cmp(r1, r0)<0 && isNaN(ak.cmp(r12, r1));});
   operators.add('div',  function(){return ak.eq(ak.div(r0, r1), r14);});
   operators.add('eq',   function(){return ak.eq(r1, r2) && !ak.eq(r1, r0);});
   operators.add('ge',   function(){return ak.ge(r1, r2) && ak.ge(r0, r1) && !ak.ge(r1, r0);});
   operators.add('gt',   function(){return !ak.gt(r1, r2) && ak.gt(r0, r1) && !ak.gt(r1, r0);});
   operators.add('le',   function(){return ak.le(r2, r1) && ak.le(r1, r0) && !ak.le(r0, r1);});
   operators.add('lt',   function(){return !ak.lt(r2, r1) && ak.lt(r1, r0) && !ak.lt(r0, r1);});
   operators.add('mod',  function(){return ak.eq(ak.mod(r15, r1), ak.rational(4, 5));});
   operators.add('mul',  function(){return ak.eq(ak.mul(r14, r1), r0);});
   operators.add('ne',   function(){return !ak.ne(r1, r2) && ak.ne(r1, r0);});
   operators.add('sub',  function(){return ak.eq(ak.sub(r1, r2), r8);});
  
   rational.add(free);
   rational.add(init);
   rational.add(members);
   rational.add(operators);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   rational.add(load);
  }

  akTest.add(rational);
 }

 ak.using('Number/Rational.js', define);
})();