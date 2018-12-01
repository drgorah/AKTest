"use strict";

(function() {
 function define() {
  var expression = {
   name: 'number.expression',
   body: [],
   add: function(t) {this.body.push(t);}
  };

  try {
   var e0 = ak.intExpr('3,456,789,012,345,987,654,321,012,345');
   var e1 = ak.intExpr(23);
   var e2 = ak.intExpr(-456);
   var e3 = ak.intExpr(0);
   var e4 = ak.piExpr();
   var e5 = ak.eExpr();
   var e6 = ak.varExpr();
  
   var members = {
    name: 'members',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   members.add('exact',  function(){return isNaN(e0.exact(-1)) && e0.exact(0)===5 && e0.exact(27)===3 && isNaN(e0.exact(28)) && isNaN(e0.exact(39)) && e2.exact(2)===4;});
   members.add('sign',   function(){return e1.sign()>0 && e2.sign()<0 && e3.sign()===0;});
   members.add('approx', function(){return e0.approx()===3456789012345988000000000000;});
   members.add('pi',     function(){return e4.exact(0)===3 && e4.exact(-1)===1 && e4.exact(-2)===4 && e4.exact(-100)===9 && e4.exact(-300)===3;});
   members.add('e',      function(){return e5.exact(0)===2 && e5.exact(-1)===7 && e5.exact(-2)===1 && e5.exact(-100)===4 && e5.exact(-300)===9;});
   members.add('var',    function(){var b1, b2; b1 = e6.approx()===0; e6.value(e0); var b2 = e6.approx()===3456789012345988000000000000; return b1 && b2;});
  
   var operators = {
    name: 'operators',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   operators.add('abs',  function(){return ak.abs(e1).approx()===ak.abs(e1.approx()) && ak.abs(e2).approx()===ak.abs(e2.approx());});
   operators.add('acos', function(){return ak.acos(ak.inv(e1)).approx()===ak.acos(1/e1.approx());});
   operators.add('asin', function(){return ak.asin(ak.inv(e1)).approx()===ak.asin(1/e1.approx());});
   operators.add('atan', function(){return ak.atan(e1).approx()===ak.atan(e1.approx());});
   operators.add('cos',  function(){return ak.cos(e1).approx()===ak.cos(e1.approx()) && ak.cos(e2).approx()===ak.cos(e2.approx());});
   operators.add('cosh', function(){return ak.cosh(e1).approx()===ak.cosh(e1.approx()) && ak.cosh(e2).approx()===ak.cosh(e2.approx());});
   operators.add('exp',  function(){return ak.exp(e1).approx()===ak.exp(e1.approx()) && ak.exp(e2).approx()===ak.exp(e2.approx());});
   operators.add('inv',  function(){return ak.inv(e1).approx()===ak.inv(e1.approx()) && ak.inv(e2).approx()===ak.inv(e2.approx());});
   operators.add('log',  function(){return ak.log(e1).approx()===ak.log(e1.approx());});
   operators.add('neg',  function(){return ak.neg(e1).approx()===ak.neg(e1.approx()) && ak.neg(e2).approx()===ak.neg(e2.approx());});
   operators.add('sin',  function(){return ak.sin(e1).approx()===ak.sin(e1.approx()) && ak.sin(e2).approx()===ak.sin(e2.approx());});
   operators.add('sinh', function(){return ak.sinh(e1).approx()===ak.sinh(e1.approx()) && ak.sinh(e2).approx()===ak.sinh(e2.approx());});
   operators.add('sqrt', function(){return ak.sqrt(e1).approx()===ak.sqrt(e1.approx());});
   operators.add('tan',  function(){return ak.tan(e1).approx()===ak.tan(e1.approx()) && ak.tan(e2).approx()===ak.tan(e2.approx());});
   operators.add('tanh', function(){return ak.tanh(e1).approx()===ak.tanh(e1.approx()) && ak.tanh(e2).approx()===ak.tanh(e2.approx());});
  
   operators.add('add',  function(){return ak.add(e1, e2).approx()===ak.add(e1.approx(), e2.approx());});
   operators.add('cmp',  function(){return ak.cmp(e1, e2).approx()===ak.cmp(e1.approx(), e2.approx()) && ak.cmp(e2, e1).approx()===ak.cmp(e2.approx(), e1.approx()) && ak.cmp(e1, e1).approx()===ak.cmp(e1.approx(), e1.approx());});
   operators.add('dist', function(){return ak.dist(e1, e2).approx()===ak.dist(e1.approx(), e2.approx());});
   operators.add('div',  function(){return ak.div(e1, e2).approx()===ak.div(e1.approx(), e2.approx());});
   operators.add('eq',   function(){return !ak.eq(e1, e2).approx() && ak.eq(e1, e1).approx();});
   operators.add('ge',   function(){return !ak.ge(e2, e1).approx() && ak.ge(e1, e2).approx() && ak.ge(e1, e1).approx();});
   operators.add('gt',   function(){return !ak.gt(e2, e1).approx() && ak.gt(e1, e2).approx() && !ak.gt(e1, e1).approx();});
   operators.add('le',   function(){return ak.le(e2, e1).approx() && !ak.le(e1, e2).approx() && ak.le(e1, e1).approx();});
   operators.add('lt',   function(){return ak.lt(e2, e1).approx() && !ak.lt(e1, e2).approx() && !ak.lt(e1, e1).approx();});
   operators.add('mod',  function(){return ak.mod(e1, e2).approx()===ak.mod(e1.approx(), e2.approx()) && ak.mod(e2, e1).approx()===ak.mod(e2.approx(), e1.approx());});
   operators.add('mul',  function(){return ak.mul(e1, e2).approx()===ak.mul(e1.approx(), e2.approx());});
   operators.add('ne',   function(){return ak.ne(e1, e2).approx() && !ak.ne(e1, e1).approx();});
   operators.add('pow',  function(){return ak.pow(e1, e2).approx()===ak.pow(e1.approx(), e2.approx());});
   operators.add('sub',  function(){return ak.sub(e1, e2).approx()===ak.sub(e1.approx(), e2.approx());});
  
   expression.add(members);
   expression.add(operators);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   expression.add(load);
  }

  akTest.add(expression);
 }

 ak.using('Number/Expression.js', define);
})();