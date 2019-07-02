"use strict";

(function() {
 function define() {
  var core = {
   name: 'core',
   body: [],
   add: function(t) {this.body.push(t);}
  };

  try {
   var eps = 2*ak.EPSILON;
  
   function harmonic(n) {
    var s = 0;
    var i;
    for(i=1;i<n;++i) s += 1/i;
    return s;
   }
  
   var constants = {
    name: 'constants',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   constants.add('addEpsilon',    function(){return 1+ak.EPSILON!==1 && 1+0.5*ak.EPSILON===1;});
   constants.add('subEpsilon',    function(){return 1-0.5*ak.EPSILON!==1 && 1-0.25*ak.EPSILON===1;});
   constants.add('invertPhi',     function(){return ak.diff(1/ak.PHI, ak.PHI-1)<eps;});
   constants.add('harmonicGamma', function(){return ak.diff(ak.GAMMA, harmonic(1000)-Math.log(1000))<1e-3;});
   constants.add('minNormal',     function(){return ak.MIN_NORMAL*ak.EPSILON===ak.MIN_VALUE;});
   constants.add('maxValue',      function(){return ak.MAX_VALUE*(1+ak.EPSILON)===ak.INFINITY;});
  
   var types = {
    name: 'types',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   types.add('undefinedUnique', function(){return ak.UNDEFINED_T!==ak.ARRAY_T && ak.UNDEFINED_T!==ak.BOOLEAN_T && ak.UNDEFINED_T!==ak.FUNCTION_T && ak.UNDEFINED_T!==ak.NUMBER_T && ak.UNDEFINED_T!==ak.OBJECT_T && ak.UNDEFINED_T!==ak.STRING_T;});
   types.add('arrayUnique',     function(){return ak.ARRAY_T!==ak.BOOLEAN_T && ak.ARRAY_T!==ak.FUNCTION_T && ak.ARRAY_T!==ak.NUMBER_T && ak.ARRAY_T!==ak.OBJECT_T && ak.ARRAY_T!==ak.STRING_T;});
   types.add('booleanUnique',   function(){return ak.BOOLEAN_T!==ak.FUNCTION_T && ak.BOOLEAN_T!==ak.NUMBER_T && ak.BOOLEAN_T!==ak.OBJECT_T && ak.BOOLEAN_T!==ak.STRING_T;});
   types.add('functionUnique',  function(){return ak.FUNCTION_T!==ak.NUMBER_T && ak.FUNCTION_T!==ak.OBJECT_T && ak.FUNCTION_T!==ak.STRING_T;});
   types.add('numberUnique',    function(){return ak.NUMBER_T!==ak.OBJECT_T && ak.NUMBER_T!==ak.STRING_T;});
   types.add('objectUnique',    function(){return ak.OBJECT_T!==ak.STRING_T;});
  
   types.add('undefinedNative', function(){var u; return ak.nativeType(u)===ak.UNDEFINED_T;});
   types.add('arrayNative',     function(){return ak.nativeType([])===ak.ARRAY_T;});
   types.add('booleanNative',   function(){return ak.nativeType(false)===ak.BOOLEAN_T && ak.nativeType(true)===ak.BOOLEAN_T;});
   types.add('functionNative',  function(){return ak.nativeType(Math.abs)===ak.FUNCTION_T;});
   types.add('numberNative',    function(){return ak.nativeType(1)===ak.NUMBER_T;});
   types.add('objectNative',    function(){return ak.nativeType({})===ak.OBJECT_T;});
  
   types.add('undefinedType',   function(){var u; return ak.type(u)===ak.UNDEFINED_T;});
   types.add('arrayType',       function(){return ak.type([])===ak.ARRAY_T;});
   types.add('booleanType',     function(){return ak.type(false)===ak.BOOLEAN_T && ak.nativeType(true)===ak.BOOLEAN_T;});
   types.add('functionType',    function(){return ak.type(Math.abs)===ak.FUNCTION_T;});
   types.add('numberType',      function(){return ak.type(1)===ak.NUMBER_T;});
   types.add('objectType',      function(){return ak.type({})===ak.OBJECT_T;});
  
   var operators = {
    name: 'operators',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   operators.add('trunc', function(){return ak.trunc(2.1)===2 && ak.trunc(2.9)===2 && ak.trunc(ak.INT_MAX)===ak.INT_MAX && ak.trunc(-2.1)===-2 && ak.trunc(-2.9)===-2 && ak.trunc(-ak.INT_MAX)===-ak.INT_MAX;});
   operators.add('round', function(){return ak.round(2.1)===2 && ak.round(2.9)===3 && ak.round(ak.INT_MAX)===ak.INT_MAX && ak.round(-2.1)===-2 && ak.round(-2.9)===-3 && ak.round(-ak.INT_MAX)===-ak.INT_MAX && ak.round(Math.pow(2, ak.INT_DIG-1)+1)===Math.pow(2, ak.INT_DIG-1)+1 && ak.round(-Math.pow(2, ak.INT_DIG-1)-1)===-Math.pow(2, ak.INT_DIG-1)-1;});
   operators.add('hypot', function() {return ak.hypot(0, 0)===0 && ak.hypot(1, 0)===1 && ak.hypot(0, 1)===1 && ak.diff(ak.hypot(16, 15), Math.sqrt(16*16+15*15))<eps && ak.diff(ak.hypot(15, 16), Math.sqrt(16*16+15*15))<eps && ak.diff(ak.hypot(ak.DEC_MAX, 1), ak.DEC_MAX)<eps && ak.diff(ak.hypot(1, ak.DEC_MAX), ak.DEC_MAX)<eps && isNaN(ak.hypot(ak.NaN, 1)) && isNaN(ak.hypot(1, ak.NaN)) && isNaN(ak.hypot(ak.NaN, ak.NaN)) && ak.hypot(ak.INFINITY, ak.INFINITY)===ak.INFINITY;});
   operators.add('diff',  function(){return ak.diff(1, 2)>eps && ak.diff(1, 1+ak.EPSILON)<eps && ak.calc(1, 2, 'diff')>eps && ak.calc(1, 1+ak.EPSILON, 'diff')<eps;});
  
   operators.add('not',  function(){return ak.not(true)===false && ak.not(false)===true && ak.calc(true, '!')===false && ak.calc(false, '!')===true;});

   operators.add('abs',  function(){return ak.abs(3)===3 && ak.abs(-3)===3 && ak.calc(3, '||')===3 && ak.calc(-3, '||')===3;});
   operators.add('acos', function(){return ak.diff(ak.acos(0), 0.5*ak.PI)<eps && ak.diff(ak.calc(0, 'acos'), 0.5*ak.PI)<eps;});
   operators.add('asin', function(){return ak.diff(ak.asin(1), 0.5*ak.PI)<eps && ak.diff(ak.calc(1, 'asin'), 0.5*ak.PI)<eps;});
   operators.add('atan', function(){return ak.diff(ak.atan(1), 0.25*ak.PI)<eps && ak.diff(ak.calc(1, 'atan'), 0.25*ak.PI)<eps;});
   operators.add('cos',  function(){return ak.diff(ak.cos(0), 1)<eps && ak.diff(ak.cos(ak.PI/2), 0)<eps && ak.diff(ak.calc(0,'cos'), 1)<eps && ak.diff(ak.calc(ak.PI/2, 'cos'), 0)<eps;});
   operators.add('cosh', function(){return ak.diff(ak.cosh(0), 1)<eps && ak.diff(ak.cosh(1), 0.5*(ak.E+1/ak.E))<eps && ak.diff(ak.calc(0, 'cosh'), 1)<eps && ak.diff(ak.calc(1, 'cosh'), 0.5*(ak.E+1/ak.E))<eps;});
   operators.add('exp',  function(){return ak.diff(ak.exp(0), 1)<eps && ak.diff(ak.exp(1), ak.E)<eps && ak.diff(ak.calc(0, 'e^'), 1)<eps && ak.diff(ak.calc(1, 'e^'), ak.E)<eps;});
   operators.add('inv',  function(){return ak.inv(2)===0.5 && ak.inv(-0.5)===-2 && ak.calc(2, '1/')===0.5 && ak.calc(-0.5, '1/')===-2;});
   operators.add('log',  function(){return ak.diff(ak.log(1), 0)<eps && ak.diff(ak.log(4), 2*ak.log(2))<eps && isNaN(ak.log(-1)) && ak.diff(ak.calc(1, 'log'), 0)<eps && ak.diff(ak.calc(4, 'log'), ak.calc(2, 2, 'log', '*'))<eps && isNaN(ak.calc(-1, 'log'));});
   operators.add('neg',  function(){return ak.neg(2)===-2 && ak.neg(-2)===2 && ak.calc(2, '~')===-2 && ak.calc(-2, '~')===2;});
   operators.add('sin',  function(){return ak.diff(ak.sin(0), 0)<eps && ak.diff(ak.sin(ak.PI/2), 1)<eps && ak.diff(ak.calc(0, 'sin'), 0)<eps && ak.diff(ak.calc(ak.PI/2, 'sin'), 1)<eps;});
   operators.add('sinh', function(){return ak.diff(ak.sinh(0), 0)<eps && ak.diff(ak.sinh(1), 0.5*(ak.E-1/ak.E))<eps && ak.diff(ak.calc(0, 'sinh'), 0)<eps && ak.diff(ak.calc(1, 'sinh'), 0.5*(ak.E-1/ak.E))<eps;});
   operators.add('sqrt', function(){return ak.diff(ak.sqrt(4), 2)<eps && isNaN(ak.sqrt(-1)) && ak.diff(ak.calc(4, 'sqrt'), 2)<eps && isNaN(ak.calc(-1, 'sqrt'));});
   operators.add('tan',  function(){return ak.diff(ak.tan(0), 0)<eps && ak.diff(ak.tan(ak.PI/4), 1)<eps && ak.diff(ak.calc(0, 'tan'), 0)<eps && ak.diff(ak.calc(ak.PI/4, 'tan'), 1)<eps;});
   operators.add('tanh', function(){return ak.diff(ak.tanh(0), 0)<eps && ak.diff(ak.tanh(1), ak.sinh(1)/ak.cosh(1))<eps && ak.diff(ak.calc(0, 'tanh'), 0)<eps && ak.diff(ak.calc(1, 'tanh'), ak.calc(1, 'sinh', 1, 'cosh', '/'))<eps;});

   operators.add('and',  function(){return !ak.and(false, false) && !ak.and(false, true) && !ak.and(true, false) && ak.and(true, true) && !ak.calc(false, false, '&') && !ak.calc(false, true, '&') && !ak.calc(true, false, '&') && ak.calc(true, true, '&');});
   operators.add('impl', function(){return ak.impl(false, false) && ak.impl(false, true) && !ak.impl(true, false) && ak.impl(true, true) && ak.calc(false, false, '->') && ak.calc(false, true, '->') && !ak.calc(true, false, '->') && ak.calc(true, true, '->');});
   operators.add('nand',  function(){return ak.nand(false, false) && ak.nand(false, true) && ak.nand(true, false) && !ak.nand(true, true) && ak.calc(false, false, '!&') && ak.calc(false, true, '!&') && ak.calc(true, false, '!&') && !ak.calc(true, true, '!&');});
   operators.add('or',  function(){return !ak.or(false, false) && ak.or(false, true) && ak.or(true, false) && ak.or(true, true) && !ak.calc(false, false, '|') && ak.calc(false, true, '|') && ak.calc(true, false, '|') && ak.calc(true, true, '|');});
   operators.add('nor',  function(){return ak.nor(false, false) && !ak.nor(false, true) && !ak.nor(true, false) && !ak.nor(true, true) && ak.calc(false, false, '!|') && !ak.calc(false, true, '!|') && !ak.calc(true, false, '!|') && !ak.calc(true, true, '!|');});
   operators.add('xor',  function(){return !ak.xor(false, false) && ak.xor(false, true) && ak.xor(true, false) && !ak.xor(true, true) && !ak.calc(false, false, 'I') && ak.calc(false, true, 'I') && ak.calc(true, false, 'I') && !ak.calc(true, true, 'I');});
   operators.add('xnor',  function(){return ak.xnor(false, false) && !ak.xnor(false, true) && !ak.xnor(true, false) && ak.xnor(true, true) && ak.calc(false, false, '!I') && !ak.calc(false, true, '!I') && !ak.calc(true, false, '!I') && ak.calc(true, true, '!I');});

   operators.add('add',  function(){return ak.add(3, 2)===5 && ak.calc(3, 2, '+')===5;});
   operators.add('cmp',  function(){return ak.cmp(2, 2)===0 && ak.cmp(3,2)>0 && ak.cmp(2,3)<0 && ak.cmp(ak.INFINITY, 2)>0 && ak.cmp(2, ak.INFINITY)<0 && ak.cmp(ak.INFINITY, ak.INFINITY)===0 && isNaN(ak.cmp(1, ak.NaN)) && isNaN(ak.cmp(ak.NaN, 1)) && isNaN(ak.cmp(ak.INFINITY, ak.NaN)) && isNaN(ak.cmp(ak.NaN, ak.INFINITY)) && ak.calc(2, 2, 'cmp')===0 && ak.calc(3,2, 'cmp')>0 && ak.calc(2,3, 'cmp')<0 && ak.calc(ak.INFINITY, 2, 'cmp')>0 && ak.calc(2, ak.INFINITY, 'cmp')<0 && ak.calc(ak.INFINITY, ak.INFINITY, 'cmp')===0 && isNaN(ak.calc(1, ak.NaN, 'cmp')) && isNaN(ak.calc(ak.NaN, 1, 'cmp')) && isNaN(ak.calc(ak.INFINITY, ak.NaN, 'cmp')) && isNaN(ak.calc(ak.NaN, ak.INFINITY, 'cmp'));});
   operators.add('dist', function(){return ak.dist(3, 2)===1 && ak.calc(3, 2, 'dist')===1;});
   operators.add('div',  function(){return ak.div (3, 2)===1.5 && ak.calc(3, 2, '/')===1.5;});
   operators.add('eq',   function(){return ak.eq  (2, 2) && !ak.eq(3, 2) && ak.calc(2, 2, '=') && !ak.calc(3, 2, '=');});
   operators.add('ge',   function(){return ak.ge  (3, 2) &&  ak.ge(2, 2) && !ak.ge(2, 3) && ak.calc(3, 2, '>=') &&  ak.calc(2, 2, '>=') && !ak.calc(2, 3, '>=');});
   operators.add('gt',   function(){return ak.gt  (3, 2) && !ak.gt(2, 2) && !ak.gt(2, 3) && ak.calc(3, 2, '>') && !ak.calc(2, 2, '>') && !ak.calc(2, 3, '>');});
   operators.add('le',   function(){return ak.le  (2, 3) &&  ak.le(2, 2) && !ak.le(3, 2) && ak.calc(2, 3, '<=') &&  ak.calc(2, 2, '<=') && !ak.calc(3, 2, '<=');});
   operators.add('lt',   function(){return ak.lt  (2, 3) && !ak.lt(2, 2) && !ak.lt(3, 2) && ak.calc(2, 3, '<') && !ak.calc(2, 2, '<') && !ak.calc(3, 2, '<');});
   operators.add('mod',  function(){return ak.mod (3, 2)===1 && ak.calc(3, 2, '%')===1;});
   operators.add('mul',  function(){return ak.mul (3, 2)===6 && ak.calc(3, 2, '*')===6;});
   operators.add('ne',   function(){return ak.ne  (3, 2) && !ak.ne(2, 2) && ak.calc(3, 2, '!=') && !ak.calc(2, 2, '!=');});
   operators.add('pow',  function(){return ak.pow (3, 2)===9 && ak.calc(3, 2, '^')===9;});
   operators.add('sub',  function(){return ak.sub (3, 2)===1 && ak.calc(3, 2, '-')===1;});
  
   operators.add('calc', function(){return ak.calc(1, 5, '+', 2, '~', '/')===-3;});
  
   core.add(constants);
   core.add(types);
   core.add(operators);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   core.add(load);
  }

  akTest.add(core);
 }

 ak.using('', define);
})();