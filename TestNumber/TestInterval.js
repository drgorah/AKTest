"use strict";

(function() {
 function define() {
  var interval = {
   name: 'number.interval',
   body: [],
   add: function(t) {this.body.push(t);}
  };

  try {
   var EPS = 4.0*ak.EPSILON;
  
   var EPS_SUB = 1-ak.EPSILON;
   var EPS_SUP = 1+ak.EPSILON;
  
   var i00 = ak.interval(1);
   var i01 = ak.interval(-3.14);
   var i02 = ak.interval(ak.MIN_NORMAL);
   var i03 = ak.interval(-ak.MIN_NORMAL/4);
   var i04 = ak.interval(1, 1);
   var i05 = ak.interval(-1, 1);
   var i06 = ak.interval(1, -1);
   var i07 = ak.interval(i05);
   var i08 = ak.interval({lb: -1, ub: 1});
   var i09 = ak.interval(-ak.INFINITY, ak.INFINITY);
   var i10 = ak.interval(3, 5);
   var i11 = ak.interval(-5, -3);
   var i12 = ak.interval(-5, 3);
   var i13 = ak.interval(-3, 5);
   var i14 = ak.interval(0, 5);
   var i15 = ak.interval(-3, 0);
   var i16 = ak.interval(-ak.INFINITY, -ak.INFINITY);
   var i17 = ak.interval( ak.INFINITY,  ak.INFINITY);
   var i18 = ak.interval(-2, -ak.INFINITY);
   var i19 = ak.interval( 2,  ak.INFINITY);
   var i20 = ak.interval( 0,  ak.INFINITY);
   var i21 = ak.interval(-0.32, 0.45);
   var i22 = ak.interval( ak.NaN, 1);
   var i23 = ak.interval( -1, ak.NaN);
   var i24 = ak.interval( 0.2*ak.PI,  0.3*ak.PI);
   var i25 = ak.interval( 0.2*ak.PI,  2.3*ak.PI);
   var i26 = ak.interval( 0.2*ak.PI,  0.7*ak.PI);
   var i27 = ak.interval(-0.7*ak.PI, -0.2*ak.PI);
   var i28 = ak.interval(-0.2*ak.PI,  0.3*ak.PI);
   var i29 = ak.interval( 0.8*ak.PI,  1.1*ak.PI);
   var i30 = ak.interval( 0.2*ak.PI,  1.3*ak.PI);
   var i31 = ak.interval(3, 3);
   var i32 = ak.interval(4, 4);
   var i33 = ak.interval(0, 0);
   var i34 = ak.interval( 3.1,  3.2);
   var i35 = ak.interval(-3.2, -3.1);
   var i36 = ak.interval(-3.2,  3.1);
   var i37 = ak.interval( 8.1,  8.2);
   var i38 = ak.interval(-8.2, -8.1);
   var i39 = ak.interval(-8.2,  8.1);
   var i40 = ak.interval( 9.2,  9.4);
   var i41 = ak.interval(-9.4, -9.2);
   var i42 = ak.interval( 9.5,  9.7);
   var i43 = ak.interval(-9.7, -9.5);
   var i44 = ak.interval(0.00987654, 123.456789);
  
   var init = {
    name: 'init',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   init.add('numbers',  function(){return ak.type(i00)===ak.INTERVAL_T && i00.lb()===EPS_SUB && i00.ub()===EPS_SUP && ak.type(i01)===ak.INTERVAL_T && i01.lb()===-3.14*EPS_SUP && i01.ub()===-3.14*EPS_SUB && ak.type(i02)===ak.INTERVAL_T && i02.lb()===ak.MIN_NORMAL-ak.MIN_VALUE && i02.ub()===ak.MIN_NORMAL+ak.MIN_VALUE && ak.type(i03)===ak.INTERVAL_T && i03.lb()===-ak.MIN_NORMAL/4-ak.MIN_VALUE && i03.ub()===-ak.MIN_NORMAL/4+ak.MIN_VALUE;});
   init.add('pairs',    function(){return ak.type(i04)===ak.INTERVAL_T && i04.lb()===1 && i04.ub()===1 && ak.type(i05)===ak.INTERVAL_T && i05.lb()===-1 && i05.ub()===1 && i06.lb()===i05.lb() && i06.ub()===i05.ub();});
   init.add('interval', function(){return i07.lb()===i05.lb() && i07.ub()===i05.ub();});
   init.add('object',   function(){return i08.lb()===i05.lb() && i08.ub()===i05.ub();});
   init.add('infinite', function(){return i16.lb()===-ak.INFINITY && i16.ub()===-ak.MAX_VALUE && i17.lb()===ak.MAX_VALUE && i17.ub()===ak.INFINITY;});
   init.add('invalid',  function(){return isNaN(i22.lb()) && isNaN(i22.ub()) && isNaN(i23.lb()) && isNaN(i23.ub());});
  
   var members = {
    name: 'members',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   members.add('mid',           function(){return i05.mid()===0 && isNaN(i09.mid());});
   members.add('toNumber',      function(){return i05.toNumber()===0 && isNaN(i09.toNumber());});
   members.add('toString',      function(){return i05.toString()==='[-1,1]' && i09.toString()==='[-Infinity,Infinity]';});
   members.add('toExponential', function(){return i44.toExponential(2)==='[9.88e-3,1.23e+2]';});
   members.add('toFixed',       function(){return i44.toFixed(3)==='[0.010,123.457]';});
   members.add('toPrecision',   function(){return i44.toPrecision(3)==='[0.00988,123]';});
   members.add('valueOf',       function(){return isNaN(1 - i00);});
  
   var operators = {
    name: 'operators',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   operators.add('acos', function(){return ak.eq(ak.acos(i21), ak.interval(Math.acos(i21.ub())*EPS_SUB, Math.acos(i21.lb())*EPS_SUP));});
   operators.add('asin', function(){return ak.eq(ak.asin(i21), ak.interval(Math.asin(i21.lb())*EPS_SUP, Math.asin(i21.ub())*EPS_SUP));});
   operators.add('atan', function(){return ak.eq(ak.atan(i21), ak.interval(Math.atan(i21.lb())*EPS_SUP, Math.atan(i21.ub())*EPS_SUP));});
   operators.add('log',  function(){return ak.eq(ak.log(i20), i09) && ak.eq(ak.log(i10), ak.interval(Math.log(3)*EPS_SUB, Math.log(5)*EPS_SUP)) && ak.eq(ak.log(i19), ak.interval(Math.log(2)*EPS_SUB, ak.INFINITY));});
   operators.add('sqrt', function(){return isNaN(ak.sqrt(i12).lb()) && ak.eq(ak.sqrt(i10), ak.interval(Math.sqrt(3)*EPS_SUB, Math.sqrt(5)*EPS_SUP)) && ak.eq(ak.sqrt(i19), ak.interval(Math.sqrt(2)*EPS_SUB, ak.INFINITY));});
  
   operators.add('abs',  function(){return ak.eq(ak.abs(i10), i10) && ak.eq(ak.abs(i11), i10) && ak.eq(ak.abs(i12), i14) && ak.eq(ak.abs(i13), i14);});
   operators.add('cos',  function(){return ak.eq(ak.cos(i24), ak.interval(Math.cos(0.3*ak.PI)*EPS_SUB, Math.cos(0.2*ak.PI)*EPS_SUP)) && ak.eq(ak.cos(i25), i05) && ak.eq(ak.cos(i28), ak.interval(Math.cos(0.3*ak.PI)*EPS_SUB, 1)) && ak.eq(ak.cos(i29), ak.interval(-1, Math.cos(0.8*ak.PI)*EPS_SUB));});
   operators.add('cosh', function(){return ak.diff(ak.cosh(i10).lb(), ak.cosh(3))<EPS && ak.diff(ak.cosh(i10).ub(), ak.cosh(5))<EPS && ak.cosh(i12).lb()===1 && ak.diff(ak.cosh(i12).ub(), ak.cosh(5))<EPS;});
   operators.add('exp',  function(){return ak.eq(ak.exp(i09), i20) && ak.eq(ak.exp(i13), ak.interval(Math.exp(-3)*EPS_SUB, Math.exp(5)*EPS_SUP));});
   operators.add('inv',  function(){return ak.eq(ak.inv(i10), ak.div(i04, i10)) && ak.eq(ak.inv(i11), ak.div(i04, i11)) && ak.eq(ak.inv(i12), ak.div(i04, i12)) && ak.eq(ak.inv(i13), ak.div(i04, i13)) && ak.eq(ak.inv(i14), ak.div(i04, i14)) && ak.eq(ak.inv(i15), ak.div(i04, i15)) && ak.eq(ak.inv(i18), ak.div(i04, i18)) && ak.eq(ak.inv(i19), ak.div(i04, i19));});
   operators.add('neg',  function(){return ak.eq(ak.neg(i12), i13) && ak.eq(ak.neg(i13), i12);});
   operators.add('sin',  function(){return ak.eq(ak.sin(i24), ak.interval(Math.sin(0.2*ak.PI)*EPS_SUB, Math.sin(0.3*ak.PI)*EPS_SUP)) && ak.eq(ak.sin(i25), i05) && ak.eq(ak.sin(i26), ak.interval(Math.sin(0.2*ak.PI)*EPS_SUB, 1)) && ak.eq(ak.sin(i27), ak.interval(-1, -Math.sin(0.2*ak.PI)*EPS_SUB));});
   operators.add('sinh', function(){return ak.diff(ak.sinh(i10).lb(), ak.sinh(3))<EPS && ak.diff(ak.sinh(i10).ub(), ak.sinh(5))<EPS && ak.diff(ak.sinh(i12).lb(), ak.sinh(-5))<EPS && ak.diff(ak.sinh(i12).ub(), ak.sinh(3))<EPS;});
   operators.add('tan',  function(){return ak.eq(ak.tan(i24), ak.interval(Math.tan(0.2*ak.PI)*EPS_SUB, Math.tan(0.3*ak.PI)*EPS_SUP)) && ak.eq(ak.tan(i26), i09) && ak.eq(ak.tan(i30), i09);});
   operators.add('tanh', function(){return ak.diff(ak.tanh(i21).lb(), ak.tanh(-0.32))<EPS && ak.diff(ak.tanh(i21).ub(), ak.tanh(0.45))<EPS;});
  
   operators.add('add',        function(){return ak.eq(ak.add(i10, i12), ak.interval(-2*EPS_SUP, 8*EPS_SUP)) && ak.eq(ak.add(i09, i09), i09);});
   operators.add('dist',       function(){return ak.eq(ak.dist(i12, i13), ak.interval(6*EPS_SUB, 10*EPS_SUP));});
   operators.add('div',        function(){return ak.eq(ak.div(i11, i10), ak.interval(-5/3*EPS_SUP, -3/5*EPS_SUB)) && ak.eq(ak.div(i12, i10), ak.interval(-5/3*EPS_SUP, 1*EPS_SUP));});
   operators.add('div - inf',  function(){return ak.eq(ak.div(i10, i14), ak.interval(0, ak.INFINITY)) && ak.eq(ak.div(i10, i15), ak.interval(-ak.INFINITY, 0)) && ak.eq(ak.div(i11, i14), ak.interval(-ak.INFINITY, 0)) && ak.eq(ak.div(i11, i15), ak.interval(0, ak.INFINITY)) && ak.eq(ak.div(i12, i14), ak.interval(-ak.INFINITY, ak.INFINITY)) && ak.eq(ak.div(i12, i15), ak.interval(-ak.INFINITY, ak.INFINITY)) && ak.eq(ak.div(i10, i33), ak.interval(-ak.INFINITY, ak.INFINITY)) && ak.eq(ak.div(i11, i33), ak.interval(-ak.INFINITY, ak.INFINITY)) && ak.eq(ak.div(i33, i33), ak.interval(-ak.INFINITY, ak.INFINITY));});
   operators.add('eq',         function(){return ak.eq(i04, i04) &&  ak.eq(i05, i05) && !ak.eq(i04, i05) && !ak.eq(i05, i04);});
   operators.add('mod',        function(){return ak.eq(ak.mod(i37, i34), ak.interval((8.1%3.2)*EPS_SUB, (8.2%3.1)*EPS_SUP)) && ak.eq(ak.mod(i37, i35), ak.interval((8.1%3.2)*EPS_SUB, (8.2%3.1)*EPS_SUP)) && ak.eq(ak.mod(i38, i34), ak.interval(-(8.2%3.1)*EPS_SUP, -(8.1%3.2)*EPS_SUB)) && ak.eq(ak.mod(i38, i35), ak.interval(-(8.2%3.1)*EPS_SUP, -(8.1%3.2)*EPS_SUB)) && ak.eq(ak.mod(i39, i34), ak.interval(-3.2, 3.2)) && ak.eq(ak.mod(i40, i34), ak.interval(0, (9.4/3)*EPS_SUP)) && ak.eq(ak.mod(i41, i34), ak.interval(-(9.4/3)*EPS_SUP, 0)) && ak.eq(ak.mod(i42, i34), ak.interval(0, 3.2)) && ak.eq(ak.mod(i43, i34), ak.interval(-3.2, 0));});
   operators.add('mod - inf',  function(){return ak.eq(ak.mod(i09, i34), ak.interval(-3.2, 3.2)) && ak.eq(ak.mod(i18, i34), ak.interval(-3.2, 0)) && ak.eq(ak.mod(i19, i34), ak.interval(0, 3.2));});
   operators.add('mod - zero', function(){return ak.eq(ak.mod(i34, i14), ak.interval(0, 3.2)) && ak.eq(ak.mod(i35, i14), ak.interval(-3.2, 0)) && ak.eq(ak.mod(i36, i14), ak.interval(-3.2, 3.1)) && ak.eq(ak.mod(i37, i36), ak.interval(0, 8.2)) && ak.eq(ak.mod(i37, i33), ak.interval(8.1, 8.2));});
   operators.add('mul',        function(){return ak.eq(ak.mul(i12, i13), ak.interval(-25*EPS_SUP, 15*EPS_SUP)) && ak.eq(ak.mul(i15, i19), ak.interval(-ak.INFINITY, ak.MIN_VALUE));});
   operators.add('ne',         function(){return !ak.ne(i04, i04) && !ak.ne(i05, i05) &&  ak.ne(i04, i05) &&  ak.ne(i05, i04);});
   operators.add('pow',        function(){return ak.eq(ak.pow(i10, i21), ak.interval(Math.pow(5, -0.32)*EPS_SUB, Math.pow(5, 0.45)*EPS_SUP)) && ak.eq(ak.pow(i12, i31), ak.interval(-125*EPS_SUP, 27*EPS_SUP)) && ak.eq(ak.pow(i12, i32), ak.interval(0, 625*EPS_SUP)) && isNaN(ak.pow(i13, i01).lb());});
   operators.add('sub',        function(){return ak.eq(ak.sub(i12, i13), ak.interval(-10*EPS_SUP, 6*EPS_SUP)) && ak.eq(ak.sub(i09, i09), i09);});
  
   interval.add(init);
   interval.add(members);
   interval.add(operators);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   interval.add(load);
  }

  akTest.add(interval);
 }

 ak.using('Number/Interval.js', define);
})();