"use strict";

(function() {
 function define() {
  var surreal = {
   name: 'calculus.surreal',
   body: [],
   add: function(t) {this.body.push(t);}
  };

  try {
   var eps = 2*ak.EPSILON;
  
   var s0  = ak.surreal([1, 2, -3]);
   var s1  = ak.surreal(s0);
   var s2  = ak.surreal({order: 2, coeff: function(i){return i;}});
   var s3  = ak.surreal(2, function(i){return i*i;});
   var s4  = ak.surreal(2, 1);
   var s5  = ak.surreal(3);
   var s6  = ak.surreal(2, 1, 2);
   var s7  = ak.surreal([123.456789, 0.00987654]);
   var s8  = ak.surreal(2, 2, 2);
   var s9  = ak.surreal(2, 2, 4);
   var s10 = ak.surreal([2, 6, -2]);
   var s11 = ak.surreal(2, 1, -2);
   var s12 = ak.surreal(2, -2);
   var s13 = ak.surreal(2, 2);
  
   var init = {
    name: 'init',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   init.add('array',    function(){return ak.type(s0)==ak.SURREAL_T && s0.order()===2 && s0.coeff(0)===1 && s0.coeff(1)===2 && s0.coeff(2)===-3;});
   init.add('surreal',  function(){return ak.type(s1)==ak.SURREAL_T && s1.order()===2 && s1.coeff(0)===1 && s1.coeff(1)===2 && s1.coeff(2)===-3;});
   init.add('object',   function(){return ak.type(s2)==ak.SURREAL_T && s2.order()===2 && s2.coeff(0)===0 && s2.coeff(1)===1 && s2.coeff(2)===2;});
   init.add('function', function(){return ak.type(s3)==ak.SURREAL_T && s3.order()===2 && s3.coeff(0)===0 && s3.coeff(1)===1 && s3.coeff(2)===4;});
   init.add('number',   function(){return ak.type(s4)==ak.SURREAL_T && s4.order()===2 && s4.coeff(0)===1 && s4.coeff(1)===0 && s4.coeff(2)===0;});
   init.add('zero',     function(){return ak.type(s5)==ak.SURREAL_T && s5.order()===3 && s5.coeff(0)===0 && s5.coeff(1)===0 && s5.coeff(2)===0 && s5.coeff(3)===0;});
   init.add('inf',      function(){return ak.type(s4)==ak.SURREAL_T && s6.order()===2 && s6.coeff(0)===1 && s6.coeff(1)===2 && s6.coeff(2)===0;});
  
   var members = {
    name: 'members',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   members.add('order',         function(){return s0.order()===2;});
   members.add('coeff',         function(){return s0.coeff(0)===1 && s0.coeff(1)===2 && s0.coeff(2)===-3;});
   members.add('coeff - bad',   function(){return isNaN(s0.coeff(-1)) && isNaN(s0.coeff(1.5)) && isNaN(s0.coeff(3)) && isNaN(s0.coeff('pop'));});
   members.add('coeffs',        function(){var v = s0.coeffs(); return ak.type(v)===ak.ARRAY_T && v[0]===1 && v[1]===2 && v[2]===-3;});
   members.add('deriv',         function(){return s0.deriv(0)===1 && s0.deriv(1)===2 && s0.deriv(2)===-6;});
   members.add('deriv - bad',   function(){return isNaN(s0.deriv(-1)) && isNaN(s0.deriv(1.5)) && isNaN(s0.deriv(3)) && isNaN(s0.deriv('pop'));});
   members.add('derivs',        function(){var v = s0.derivs(); return ak.type(v)===ak.ARRAY_T && v[0]===1 && v[1]===2 && v[2]===-6;});
   members.add('toString',      function(){return s0.toString()==='1 + 2d - 3d^2';});
   members.add('toExponential', function(){return s7.toExponential(2)==='1.23e+2 + 9.88e-3d';});
   members.add('toFixed',       function(){return s7.toFixed(3)==='123.457 + 0.010d';});
   members.add('toPrecision',   function(){return s7.toPrecision(3)==='123 + 0.00988d';});
   members.add('valueOf',       function(){return isNaN(1 - s0);});
  
   var operators = {
    name: 'operators',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   function cmpDf1(f, x, n) {
    var s  = ak.surreal(n, x, 1);
    var fs = f(s);
    var z  = ak.varExpr();
    var fz = f(z);
    var f  = 1;
    var i;
  
    z.value(ak.approxExpr(x));
  
    if(ak.diff(fs.coeff(0), fz.approx())>1e-12) return false;
  
    for(i=1;i<=n;++i) {
     f *= i;
     fz = ak.symbolicDerivative(fz, z);
  
     if(ak.diff(f * fs.coeff(i), fz.approx())>1e-12) return false;
    }
    return true;   
   }
  
   function cmpDf2(f, l, r, x, n) {
    var s  = ak.surreal(n, x, 1);
    var fs = f(l(s), r(s));
    var z  = ak.varExpr();
    var fz = f(l(z), r(z));
    var f  = 1;
    var i;
  
    z.value(ak.approxExpr(x));
  
    if(ak.diff(fs.coeff(0), fz.approx())>1e-12) return false;
  
    for(i=1;i<=n;++i) {
     f *= i;
     fz = ak.symbolicDerivative(fz, z);
  
     if(ak.diff(f * fs.coeff(i), fz.approx())>1e-12) return false;
    }
    return true;   
   }
  
   operators.add('abs',  function(){return cmpDf1(ak.abs,  0.5, 5) && cmpDf1(ak.abs,  -0.5, 5);});
   operators.add('acos', function(){return cmpDf1(ak.acos, 0.5, 5) && cmpDf1(ak.acos, -0.5, 5);});
   operators.add('asin', function(){return cmpDf1(ak.asin, 0.5, 5) && cmpDf1(ak.asin, -0.5, 5);});
   operators.add('atan', function(){return cmpDf1(ak.atan, 0.5, 5) && cmpDf1(ak.atan, -0.5, 5);});
   operators.add('cos',  function(){return cmpDf1(ak.cos,  0.5, 5) && cmpDf1(ak.cos,  -0.5, 5);});
   operators.add('cosh', function(){return cmpDf1(ak.cosh, 0.5, 5) && cmpDf1(ak.cosh, -0.5, 5);});
   operators.add('exp',  function(){return cmpDf1(ak.exp,  0.5, 5) && cmpDf1(ak.exp,  -0.5, 5);});
   operators.add('inv',  function(){return cmpDf1(ak.inv,  0.5, 5) && cmpDf1(ak.inv,  -0.5, 5);});
   operators.add('log',  function(){return cmpDf1(ak.log,  0.5, 5) && cmpDf1(ak.log,  -0.5, 5);});
   operators.add('neg',  function(){return cmpDf1(ak.neg,  0.5, 5) && cmpDf1(ak.neg,  -0.5, 5);});
   operators.add('sin',  function(){return cmpDf1(ak.sin,  0.5, 5) && cmpDf1(ak.sin,  -0.5, 5);});
   operators.add('sinh', function(){return cmpDf1(ak.sinh, 0.5, 5) && cmpDf1(ak.sinh, -0.5, 5);});
   operators.add('sqrt', function(){return cmpDf1(ak.sqrt, 0.5, 5) && cmpDf1(ak.sqrt,  2.0, 5);});
   operators.add('tan',  function(){return cmpDf1(ak.tan,  0.5, 5) && cmpDf1(ak.tan,  -0.5, 5);});
   operators.add('tanh', function(){return cmpDf1(ak.tanh, 0.5, 5) && cmpDf1(ak.tanh, -0.5, 5);});
  
   operators.add('add',    function(){return ak.eq(ak.add(s4, s6), s8);});
   operators.add('addSR',  function(){return ak.eq(ak.add(s6, 1), s8);});
   operators.add('addRS',  function(){return ak.eq(ak.add(1, s6), s8);});
   operators.add('cmp',    function(){return ak.cmp(s6, s6)===0 && ak.cmp(s4, s6)<0 && ak.cmp(s6, s4)>0;});
   operators.add('cmpSR',  function(){return ak.cmp(s4, 1)===0 && ak.cmp(s6, 2)<0 && ak.cmp(s6, 1)>0;});
   operators.add('cmpRS',  function(){return ak.cmp(1, s4)===0 && ak.cmp(1, s6)<0 && ak.cmp(2, s6)>0;});
   operators.add('dist',   function(){return ak.eq(ak.dist(s8, s4), s6) && ak.eq(ak.dist(s4, s8), s6);});
   operators.add('distSR', function(){return ak.eq(ak.dist(s8, 1), s6);});
   operators.add('distRS', function(){return ak.eq(ak.dist(1, s8), s11);});
   operators.add('div',    function(){return ak.eq(ak.div(s6, s6), 1) && ak.eq(ak.div(s6, s8), ak.mul(s6, ak.inv(s8))) && cmpDf2(ak.div, ak.exp, ak.sin, 0.5, 5) && cmpDf2(ak.div, ak.exp, ak.sin, -0.5, 5);});
   operators.add('divSR',  function(){return ak.eq(ak.div(s9, 2), s6);});
   operators.add('divRS',  function(){return ak.eq(ak.div(2, s9), ak.mul(2, ak.inv(s9)));});
   operators.add('eq',     function(){return ak.eq(s6, s6) && !ak.eq(s4, s6);});
   operators.add('eqSR',   function(){return ak.eq(s4, 1) && !ak.eq(s6, 1);});
   operators.add('eqRS',   function(){return ak.eq(1, s4) && !ak.eq(1, s6);});
   operators.add('ge',     function(){return ak.ge(s6, s6) && !ak.ge(s4, s6) && ak.ge(s6, s4);});
   operators.add('geSR',   function(){return ak.ge(s4, 1) && !ak.ge(s6, 2) && ak.ge(s6, 1);});
   operators.add('geRS',   function(){return ak.ge(1, s4) && ak.ge(2, s6) && !ak.ge(1, s6);});
   operators.add('gt',     function(){return !ak.gt(s6, s6) && !ak.gt(s4, s6) && ak.gt(s6, s4);});
   operators.add('gtSR',   function(){return !ak.gt(s4, 1) && !ak.gt(s6, 2) && ak.gt(s6, 1);});
   operators.add('gtRS',   function(){return !ak.gt(1, s4) && ak.gt(2, s6) && !ak.gt(1, s6);});
   operators.add('le',     function(){return ak.le(s6, s6) && ak.le(s4, s6) && !ak.le(s6, s4);});
   operators.add('leSR',   function(){return ak.le(s4, 1) && ak.le(s6, 2) && !ak.le(s6, 1);});
   operators.add('leRS',   function(){return ak.le(1, s4) && !ak.le(2, s6) && ak.le(1, s6);});
   operators.add('lt',     function(){return !ak.lt(s6, s6) && ak.lt(s4, s6) && !ak.lt(s6, s4);});
   operators.add('ltSR',   function(){return !ak.lt(s4, 1) && ak.lt(s6, 2) && !ak.lt(s6, 1);});
   operators.add('ltRS',   function(){return !ak.lt(1, s4) && !ak.lt(2, s6) && ak.lt(1, s6);});
   operators.add('mul',    function(){return ak.eq(ak.mul(s0, s8), s10) && ak.eq(ak.mul(s8, s0), s10) && cmpDf2(ak.mul, ak.exp, ak.sin, 0.5, 5) && cmpDf2(ak.mul, ak.exp, ak.sin, -0.5, 5);});
   operators.add('mulSR',  function(){return ak.eq(ak.mul(s6, 2), s9);});
   operators.add('mulRS',  function(){return ak.eq(ak.mul(2, s6), s9);});
   operators.add('ne',     function(){return !ak.ne(s6, s6) && ak.ne(s4, s6);});
   operators.add('neSR',   function(){return !ak.ne(s4, 1) && ak.ne(s6, 1);});
   operators.add('neRS',   function(){return !ak.ne(1, s4) && ak.ne(1, s6);});
   operators.add('pow',    function(){return ak.eq(ak.pow(s4, s6), ak.exp(ak.mul(s6, ak.log(s4)))) && ak.eq(ak.pow(s12, s13), 4) && cmpDf2(ak.pow, ak.exp, ak.sin, 0.5, 5) && cmpDf2(ak.pow, ak.exp, ak.sin, -0.5, 5);});
   operators.add('powSR',  function(){return ak.eq(ak.pow(s0, 2.5), ak.exp(ak.mul(2.5, ak.log(s0)))) && ak.eq(ak.pow(s12, 2), 4);});
   operators.add('powRS',  function(){return ak.eq(ak.pow(3, s6), ak.exp(ak.mul(s6, Math.log(3)))) && ak.eq(ak.pow(-2, s13), 4);});
   operators.add('sub',    function(){return ak.eq(ak.sub(s8, s4), s6);});
   operators.add('subSR',  function(){return ak.eq(ak.sub(s8, 1), s6);});
   operators.add('subRS',  function(){return ak.eq(ak.sub(1, s8), ak.neg(s6));});
  
   function surrealDiv() {
    var s = ak.surreal(0, 1);
    var r = ak.sin(s) / s;
    return s.coeff(0)===1 && isNaN(s.coeff(1));
   }
  
   operators.add('surrealDiv', surrealDiv);
  
   surreal.add(init);
   surreal.add(members);
   surreal.add(operators);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   surreal.add(load);
  }

  akTest.add(surreal);
 }

 ak.using(['Calculus/Surreal.js', 'Calculus/SymbolicDerivative.js'], define);
})();
