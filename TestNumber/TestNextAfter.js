"use strict";

(function() {
 function define() {
  var nextAfter = {
   name: 'number.nextAfter',
   body: [],
   add: function(t) {this.body.push(t);}
  };

  var EPS = ak.EPSILON;
  var INF = ak.INFINITY;
  var MIN = ak.MIN_VALUE;
  var MAX = ak.MAX_VALUE;
  var NaN = ak.NaN;
  var NRM = 2*ak.MIN_NORMAL;
  var SUB = 2*ak.MIN_NORMAL-MIN;

  try {
   var infinity = {
    name: 'infinity',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   infinity.add('-inf to -inf', function() {return ak.nextAfter(-INF, -INF)===-INF;});
   infinity.add('-inf to zero', function() {return ak.nextAfter(-INF,  0  )===-MAX;});
   infinity.add('-inf to +inf', function() {return ak.nextAfter(-INF, +INF)===-MAX;});
   infinity.add('+inf to -inf', function() {return ak.nextAfter(+INF, -INF)===+MAX;});
   infinity.add('+inf to zero', function() {return ak.nextAfter(+INF,  0  )===+MAX;});
   infinity.add('+inf to +inf', function() {return ak.nextAfter(+INF, +INF)===+INF;});

   var normal = {
    name: 'normal',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   normal.add('-nrm to -inf', function() {return ak.nextAfter(-NRM, -INF)===-NRM-2*MIN;});
   normal.add('-nrm to -nrm', function() {return ak.nextAfter(-NRM, -NRM)===-NRM;});
   normal.add('-nrm to +inf', function() {return ak.nextAfter(-NRM, +INF)===-NRM+MIN;});
   normal.add('-one to -inf', function() {return ak.nextAfter(-1, -INF)===-1-EPS;});
   normal.add('-one to -one', function() {return ak.nextAfter(-1, -1  )===-1;});
   normal.add('-one to +one', function() {return ak.nextAfter(-1, +1  )===-1+0.5*EPS;});
   normal.add('-one to +inf', function() {return ak.nextAfter(-1, +INF)===-1+0.5*EPS;});
   normal.add('+one to -inf', function() {return ak.nextAfter(+1, -INF)===+1-0.5*EPS;});
   normal.add('+one to -one', function() {return ak.nextAfter(+1, -1  )===+1-0.5*EPS;});
   normal.add('+one to +one', function() {return ak.nextAfter(+1, +1  )===+1;});
   normal.add('+one to +inf', function() {return ak.nextAfter(+1, +INF)===+1+EPS;});
   normal.add('+nrm to -inf', function() {return ak.nextAfter(+NRM, -INF)===+NRM-MIN;});
   normal.add('+nrm to +nrm', function() {return ak.nextAfter(+NRM, +NRM)===+NRM;});
   normal.add('+nrm to +inf', function() {return ak.nextAfter(+NRM, +INF)===+NRM+2*MIN;});

   var subnormal = {
    name: 'subnormal',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   subnormal.add('-sub to -inf', function() {return ak.nextAfter(-SUB, -INF)===-SUB-MIN;});
   subnormal.add('-sub to -sub', function() {return ak.nextAfter(-SUB, -SUB)===-SUB;});
   subnormal.add('-sub to +inf', function() {return ak.nextAfter(-SUB, +INF)===-SUB+MIN;});
   subnormal.add('-min to -inf', function() {return ak.nextAfter(-MIN, -INF)===-2*MIN;});
   subnormal.add('-min to -min', function() {return ak.nextAfter(-MIN, -MIN)===-MIN;});
   subnormal.add('-min to +inf', function() {return ak.nextAfter(-MIN, +INF)=== 0;});
   subnormal.add('zero to -inf', function() {return ak.nextAfter( 0  , -INF)===-MIN;});
   subnormal.add('zero to zero', function() {return ak.nextAfter( 0  ,  0  )=== 0;});
   subnormal.add('zero to +inf', function() {return ak.nextAfter( 0  , +INF)===+MIN;});
   subnormal.add('+min to -inf', function() {return ak.nextAfter(+MIN, -INF)=== 0;});
   subnormal.add('+min to +min', function() {return ak.nextAfter(+MIN, +MIN)===+MIN;});
   subnormal.add('+min to +inf', function() {return ak.nextAfter(+MIN, +INF)===+2*MIN;});
   subnormal.add('+sub to -inf', function() {return ak.nextAfter(+SUB, -INF)===+SUB-MIN;});
   subnormal.add('+sub to -sub', function() {return ak.nextAfter(+SUB, +SUB)===+SUB;});
   subnormal.add('+sub to +inf', function() {return ak.nextAfter(+SUB, +INF)===+SUB+MIN;});

   var nan = {
    name: 'nan',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   nan.add('zero to NaN', function() {return isNaN(ak.nextAfter(0, NaN));});
   nan.add('NaN to zero', function() {return isNaN(ak.nextAfter(NaN, 0));});

   nextAfter.add(infinity);
   nextAfter.add(normal);
   nextAfter.add(subnormal);
   nextAfter.add(nan);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   nextAfter.add(load);
  }

  akTest.add(nextAfter);
 }

 ak.using('Number/NextAfter.js', define);
})();