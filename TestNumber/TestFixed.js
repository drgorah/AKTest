"use strict";

(function() {
 function define() {
  var fixed = {
   name: 'number.fixed',
   body: [],
   add: function(t) {this.body.push(t);}
  };

  try {
   var eps = 2*ak.EPSILON;
  
   var f0  = ak.fixed(1);
   var f1  = ak.fixed(2, -272);
   var f2  = ak.fixed(2,  314.1);
   var f3  = ak.fixed(f1);
   var f4  = ak.fixed({places: 3, digits: 3142});
   var f5  = ak.fixed(2,  ak.DEC_MAX);
   var f6  = ak.fixed(2, -ak.DEC_MAX);
   var f7  = ak.fixed(2,  ak.DEC_MAX+1);
   var f8  = ak.fixed(2, -ak.DEC_MAX-1);
   var f9  = ak.fixed(2, 150);
   var f10 = ak.fixed(0, 23);
  
   var init = {
    name: 'init',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   init.add('numbers',  function(){return ak.type(f0)===ak.FIXED_T && f0.places()===1 && f0.digits()===0 && f0.scale()===10 && ak.type(f1)===ak.FIXED_T && f1.places()===2 && f1.digits()===-272 && f1.scale()===100 && ak.type(f2)===ak.FIXED_T && f2.places()===2 && f2.digits()===314 && f2.scale()===100;});
   init.add('fixed',    function(){return ak.type(f3)===ak.FIXED_T && ak.eq(f1, f3);});
   init.add('object',   function(){return ak.type(f4)===ak.FIXED_T && ak.eq(f4, ak.fixed(3, 3142));});
   init.add('limits',   function(){return ak.type(f5)===ak.FIXED_T && f5.digits()===ak.DEC_MAX && ak.type(f6)===ak.FIXED_T && f6.digits()===-ak.DEC_MAX;});
   init.add('overflow', function(){return ak.type(f7)===ak.FIXED_T && f7.digits()===ak.INFINITY && ak.type(f8)===ak.FIXED_T && f8.digits()===-ak.INFINITY;});
  
   var members = {
    name: 'members',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   members.add('toNumber', function(){return ak.diff(f1.toNumber(), -2.72)<eps;});
   members.add('toString', function(){return f0.toString()==='0.0' && f1.toString()==='-2.72' && f7.toString()==='Infinity' && f10.toString()==='23';});
   members.add('valueOf',  function(){return isNaN(1 + f1);});
  
   var operators = {
    name: 'operators',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   operators.add('abs',  function(){return ak.eq(ak.abs(f1),  ak.fixed(2,  272));});
   operators.add('inv',  function(){return ak.eq(ak.inv(f9),  ak.fixed(2,   67));});
   operators.add('neg',  function(){return ak.eq(ak.neg(f2),  ak.fixed(2, -314));});
   operators.add('sqrt', function(){return ak.eq(ak.sqrt(f4), ak.fixed(3, 1773));});
  
   operators.add('add',       function(){return ak.eq(ak.add(f1, f2), ak.fixed(2, 42));});
   operators.add('add - mis', function(){try{ak.add(f1, f4);}catch(e){return true;} return false;});
   operators.add('cmp',       function(){return ak.cmp(f1, f1)===0 && ak.cmp(f2, f1)>0 && ak.cmp(f1, f2)<0 && ak.cmp(f7, f7)===0 && ak.cmp(f1, f6)>0 && isNaN(ak.cmp(ak.fixed(2, ak.NaN), f1));});
   operators.add('cmp - mis', function(){try{ak.cmp(f1, f4);}catch(e){return true;} return false;});
   operators.add('div',       function(){return ak.eq(ak.div(f2, f9), ak.fixed(2, 209));});
   operators.add('div - mis', function(){try{ak.div(f4, f9);}catch(e){return true;} return false;});
   operators.add('ge',        function(){return ak.ge(f1, f1) && ak.ge(f2, f1) && !ak.ge(f1, f2);});
   operators.add('ge - mis',  function(){try{ak.ge(f1, f4);}catch(e){return true;} return false;});
   operators.add('gt',        function(){return !ak.gt(f1, f1) && ak.gt(f2, f1) && !ak.gt(f1, f2);});
   operators.add('gt - mis',  function(){try{ak.gt(f1, f4);}catch(e){return true;} return false;});
   operators.add('eq',        function(){return ak.eq(f1, f1) && !ak.eq(f2, f1);});
   operators.add('le',        function(){return ak.le(f1, f1) && ak.le(f1, f2) && !ak.le(f2, f1);});
   operators.add('le - mis',  function(){try{ak.le(f1, f4);}catch(e){return true;} return false;});
   operators.add('lt',        function(){return !ak.lt(f1, f1) && ak.lt(f1, f2) && !ak.lt(f2, f1);});
   operators.add('lt - mis',  function(){try{ak.lt(f1, f4);}catch(e){return true;} return false;});
   operators.add('mod',       function(){return ak.eq(ak.mod(f2, f9), ak.fixed(2, 14));});
   operators.add('mod - mis', function(){try{ak.mod(f4, f9);}catch(e){return true;} return false;});
   operators.add('mul',       function(){return ak.eq(ak.mul(f2, f9), ak.fixed(2, 471));});
   operators.add('mul - mis', function(){try{ak.mul(f4, f9);}catch(e){return true;} return false;});
   operators.add('ne',        function(){return !ak.ne(f1, f1) && ak.ne(f2, f1);});
   operators.add('sub',       function(){return ak.eq(ak.sub(f1, f2), ak.fixed(2, -586));});
   operators.add('sub - mis', function(){try{ak.sub(f1, f4);}catch(e){return true;} return false;});
  
   fixed.add(init);
   fixed.add(members);
   fixed.add(operators);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   fixed.add(load);
  }

  akTest.add(fixed);
 }

 ak.using('Number/Fixed.js', define);
})();