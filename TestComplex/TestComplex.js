"use strict";

(function() {
 function define() {
  var complex = {
   name: 'complex.complex',
   body: [],
   add: function(t) {this.body.push(t);}
  };

  try {
   var eps = 4*ak.EPSILON;
  
   var c0 = ak.complex(1);
   var c1 = ak.complex(1, 2);
   var c2 = ak.complex(c1);
   var c3 = ak.complex({re: -1, im: 3});
   var c4 = ak.complex(123.456789, 0.00987654);
  
   var init = {
    name: 'init',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   init.add('numbers', function(){return ak.type(c0)===ak.COMPLEX_T && c0.re()===1 && c0.im()===0 && ak.type(c1)==ak.COMPLEX_T && c1.re()===1 && c1.im()===2;});
   init.add('complex', function(){return ak.type(c2)===ak.COMPLEX_T && ak.eq(c1, c2);});
   init.add('object',  function(){return ak.type(c3)===ak.COMPLEX_T && ak.eq(c3, ak.complex(-1, 3));});
  
   var members = {
    name: 'members',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   members.add('toString',      function(){return c1.toString()==='(1,2i)';});
   members.add('toExponential', function(){return c4.toExponential(2)==='(1.23e+2,9.88e-3i)';});
   members.add('toFixed',       function(){return c4.toFixed(3)==='(123.457,0.010i)';});
   members.add('toPrecision',   function(){return c4.toPrecision(3)==='(123,0.00988i)';});
   members.add('valueOf',       function(){return isNaN(1 - c1);});
  
   var operators = {
    name: 'operators',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   operators.add('diff',   function(){return ak.diff(c0, c1)>eps && ak.diff(c1, c2)<eps;});
   operators.add('diffCR', function(){return ak.diff(c1, 1) >eps && ak.diff(c0, 1) <eps;});
   operators.add('diffRC', function(){return ak.diff(1, c1)>eps && ak.diff(1, c0)<eps;});
  
   operators.add('abs',    function(){return ak.diff(ak.abs(c1), Math.sqrt(5))<eps;});
   operators.add('arg',    function(){return ak.diff(ak.arg(c1), Math.atan(2))<eps;});
   operators.add('argR',   function(){return ak.diff(ak.arg(1), 0)<eps && ak.diff(ak.arg(-1), ak.PI)<eps;});
   operators.add('conj',   function(){return ak.eq(ak.conj(c1), ak.complex(1, -2));});
   operators.add('conjR',  function(){return ak.conj(1)===1;});
   operators.add('cos',    function(){return ak.diff(ak.cos(c1), ak.cosh(ak.mul(c1, ak.I)))<eps;});
   operators.add('cosh',   function(){return ak.diff(ak.cosh(c1), ak.mul(0.5, ak.add(ak.exp(c1), ak.exp(ak.neg(c1)))))<eps;});
   operators.add('exp',    function(){return ak.diff(ak.exp(c1), ak.complex(ak.E*Math.cos(2), ak.E*Math.sin(2)))<eps;});
   operators.add('inv',    function(){return ak.diff(ak.mul(ak.inv(c1), c1), 1)<eps;});
   operators.add('log',    function(){return ak.diff(ak.log(c1), ak.complex(0.5*Math.log(5), Math.atan(2)))<eps;});
   operators.add('logR',   function(){return ak.diff(ak.log(2), Math.log(2))<eps && ak.diff(ak.log(-2), ak.complex(Math.log(2), ak.PI))<eps;});
   operators.add('neg',    function(){return ak.eq(ak.neg(c1), ak.complex(-1, -2));});
   operators.add('sin',    function(){return ak.diff(ak.sin(c1), ak.div(ak.sinh(ak.mul(c1, ak.I)), ak.I))<eps;});
   operators.add('sinh',   function(){return ak.diff(ak.sinh(c1), ak.mul(0.5, ak.sub(ak.exp(c1), ak.exp(ak.neg(c1)))))<eps;});
   operators.add('sqrt',   function(){return ak.diff(ak.mul(ak.sqrt(c1), ak.sqrt(c1)), c1)<eps;});
   operators.add('sqrtR',  function(){return ak.sqrt(1)===1 && ak.eq(ak.sqrt(-1), ak.I);});
   operators.add('tan',    function(){return ak.diff(ak.tan(c1), ak.div(ak.sin(c1), ak.cos(c1)))<eps;});
   operators.add('tanh',   function(){return ak.diff(ak.tanh(c1), ak.div(ak.sinh(c1), ak.cosh(c1)))<eps;});
  
   operators.add('add',    function(){return ak.eq(ak.add(c0, c1), ak.complex(2, 2));});
   operators.add('addCR',  function(){return ak.eq(ak.add(c1, 1), ak.complex(2, 2));});
   operators.add('addRC',  function(){return ak.eq(ak.add(1, c1), ak.complex(2, 2));});
   operators.add('dist',   function(){return ak.diff(ak.dist(c0, c1), 2)<eps;});
   operators.add('distCR', function(){return ak.diff(ak.dist(c1, 1), 2)<eps;});
   operators.add('distRC', function(){return ak.diff(ak.dist(1, c1), 2)<eps;});
   operators.add('div',    function(){return ak.dist(ak.mul(ak.div(c3, c1), c1), c3)<eps;});
   operators.add('divCR',  function(){return ak.dist(ak.div(c1, 2), ak.complex(0.5, 1))<eps;});
   operators.add('divRC',  function(){return ak.dist(ak.mul(ak.div(2, c1), c1), 2)<eps;});
   operators.add('eq',     function(){return ak.eq(c1, c2) && !ak.eq(c0, c2)});
   operators.add('eqCR',   function(){return ak.eq(c0, 1) && !ak.eq(c1, 1)});
   operators.add('eqRC',   function(){return ak.eq(1, c0) && !ak.eq(1, c1)});
   operators.add('mul',    function(){return ak.eq(ak.mul(c1, c3), ak.complex(-7, 1));});
   operators.add('mulCR',  function(){return ak.eq(ak.mul(c1, 2), ak.complex(2, 4));});
   operators.add('mulRC',  function(){return ak.eq(ak.mul(2, c1), ak.complex(2, 4));});
   operators.add('ne',     function(){return ak.ne(c0, c2) && !ak.ne(c1, c2)});
   operators.add('neCR',   function(){return ak.ne(c1, 1) && !ak.ne(c0, 1)});
   operators.add('neRC',   function(){return ak.ne(1, c1) && !ak.ne(1, c0)});
   operators.add('pow',    function(){return ak.diff(ak.pow(c1, c3), ak.exp(ak.mul(ak.log(c1),  c3)))<eps;});
   operators.add('powCR',  function(){return ak.diff(ak.pow(c1, 2.5), ak.exp(ak.mul(ak.log(c1), 2.5)))<eps;});
   operators.add('powRC',  function(){return ak.diff(ak.pow(2.5, c3), ak.exp(ak.mul(ak.log(2.5), c3)))<eps;});
   operators.add('powRR',  function(){return ak.diff(ak.pow(-2, 2), 4)<eps && ak.diff(ak.pow(-2, 2.1), ak.exp(ak.mul(ak.log(-2), 2.1)))<eps;});
   operators.add('sub',    function(){return ak.eq(ak.sub(c1, c3), ak.complex(2, -1));});
   operators.add('subCR',  function(){return ak.eq(ak.sub(c1, 1), ak.complex(0, 2));});
   operators.add('subRC',  function(){return ak.eq(ak.sub(1, c1), ak.complex(0, -2));});
  
   complex.add(init);
   complex.add(members);
   complex.add(operators);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   complex.add(load);
  }

  akTest.add(complex);
 }

 ak.using('Complex/Complex.js', define);
})();
