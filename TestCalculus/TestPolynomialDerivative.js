"use strict";

(function() {
 function define() {
  var polynomialDerivative = {
   name: 'calculus.polynomialDerivative',
   body: [],
   add: function(t) {this.body.push(t);}
  };

  try {
   function iCmp(iDx, dx, n) {
    return iDx.lb()<=dx && iDx.ub()>=dx && ak.diff(iDx.mid(), dx)<2*n*n*ak.EPSILON && ak.diff(iDx.lb(), dx)<4*n*n*Math.sqrt(ak.EPSILON) && ak.diff(iDx.ub(), dx)<4*n*n*Math.sqrt(ak.EPSILON);
   }
  
   var basicPolynomialDerivative = {
    name: 'polynomialDerivative',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   basicPolynomialDerivative.add('exp O(2)', function(){return ak.diff(ak.polynomialDerivative(Math.exp, 2)(1), ak.E)<20*Math.sqrt(ak.EPSILON);});
   basicPolynomialDerivative.add('sin O(2)', function(){return ak.diff(ak.polynomialDerivative(Math.sin, 2)(0), 1)<20*Math.sqrt(ak.EPSILON);});
   basicPolynomialDerivative.add('cos O(2)', function(){return ak.diff(ak.polynomialDerivative(Math.cos, 2)(0), 0)<20*Math.sqrt(ak.EPSILON);});
   basicPolynomialDerivative.add('exp O(3)', function(){return ak.diff(ak.polynomialDerivative(Math.exp, 3)(1), ak.E)<30*Math.pow(ak.EPSILON, 2/3);});
   basicPolynomialDerivative.add('sin O(3)', function(){return ak.diff(ak.polynomialDerivative(Math.sin, 3)(0), 1)<30*Math.pow(ak.EPSILON, 2/3);});
   basicPolynomialDerivative.add('cos O(3)', function(){return ak.diff(ak.polynomialDerivative(Math.cos, 3)(0), 0)<30*Math.pow(ak.EPSILON, 2/3);});
   basicPolynomialDerivative.add('bad_f', function(){try{ak.polynomialDerivative(1)(0);}catch(e){return true;}return false;});
   basicPolynomialDerivative.add('bad_n', function(){try{ak.polynomialDerivative(Math.exp, Math.exp)(0);}catch(e){return true;}return false;});
   basicPolynomialDerivative.add('neg_n', function(){try{ak.polynomialDerivative(Math.exp, -1)(0);}catch(e){return true;}return false;});
   basicPolynomialDerivative.add('zero_n', function(){try{ak.polynomialDerivative(Math.exp, 0)(0);}catch(e){return true;}return false;});
  
   var polynomialDerivativeBounds = {
    name: 'polynomialDerivativeBounds',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   polynomialDerivativeBounds.add('exp O(2)', function(){return iCmp(ak.polynomialDerivativeBounds(Math.exp, 2)(1), ak.polynomialDerivative(Math.exp, 2)(1), 2);});
   polynomialDerivativeBounds.add('sin O(2)', function(){return iCmp(ak.polynomialDerivativeBounds(Math.sin, 2)(0), ak.polynomialDerivative(Math.sin, 2)(0), 2);});
   polynomialDerivativeBounds.add('cos O(2)', function(){return iCmp(ak.polynomialDerivativeBounds(Math.cos, 2)(0), ak.polynomialDerivative(Math.cos, 2)(0), 2);});
   polynomialDerivativeBounds.add('exp O(3)', function(){return iCmp(ak.polynomialDerivativeBounds(Math.exp, 3)(1), ak.polynomialDerivative(Math.exp, 3)(1), 3);});
   polynomialDerivativeBounds.add('sin O(3)', function(){return iCmp(ak.polynomialDerivativeBounds(Math.sin, 3)(0), ak.polynomialDerivative(Math.sin, 3)(0), 3);});
   polynomialDerivativeBounds.add('cos O(3)', function(){return iCmp(ak.polynomialDerivativeBounds(Math.cos, 3)(0), ak.polynomialDerivative(Math.cos, 3)(0), 3);});
  
   var stablePolynomialDerivative = {
    name: 'stablePolynomialDerivative',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   stablePolynomialDerivative.add('exp O(2)', function(){return ak.diff(ak.stablePolynomialDerivative(Math.exp, 2)(1), ak.E)<20*Math.sqrt(ak.EPSILON);});
   stablePolynomialDerivative.add('sin O(2)', function(){return ak.diff(ak.stablePolynomialDerivative(Math.sin, 2)(0), 1)<20*Math.sqrt(ak.EPSILON);});
   stablePolynomialDerivative.add('cos O(2)', function(){return ak.diff(ak.stablePolynomialDerivative(Math.cos, 2)(0), 0)<20*Math.sqrt(ak.EPSILON);});
   stablePolynomialDerivative.add('exp O(3)', function(){return ak.diff(ak.stablePolynomialDerivative(Math.exp, 3)(1), ak.E)<20*Math.pow(ak.EPSILON, 2/3);});
   stablePolynomialDerivative.add('sin O(3)', function(){return ak.diff(ak.stablePolynomialDerivative(Math.sin, 3)(0), 1)<30*Math.pow(ak.EPSILON, 2/3);});
   stablePolynomialDerivative.add('cos O(3)', function(){return ak.diff(ak.stablePolynomialDerivative(Math.cos, 3)(0), 0)<30*Math.pow(ak.EPSILON, 2/3);});
   stablePolynomialDerivative.add('exp O(7)', function(){return ak.diff(ak.stablePolynomialDerivative(Math.exp, 7)(1), ak.E)<70*Math.pow(ak.EPSILON, 6/7);});
   stablePolynomialDerivative.add('sin O(7)', function(){return ak.diff(ak.stablePolynomialDerivative(Math.sin, 7)(0), 1)<70*Math.pow(ak.EPSILON, 6/7);});
   stablePolynomialDerivative.add('cos O(7)', function(){return ak.diff(ak.stablePolynomialDerivative(Math.cos, 7)(0), 0)<70*Math.pow(ak.EPSILON, 6/7);});
   stablePolynomialDerivative.add('bad_f', function(){try{ak.stablePolynomialDerivative(1)(0);}catch(e){return true;}return false;});
   stablePolynomialDerivative.add('bad_n', function(){try{ak.stablePolynomialDerivative(Math.exp, Math.exp)(0);}catch(e){return true;}return false;});
   stablePolynomialDerivative.add('neg_n', function(){try{ak.stablePolynomialDerivative(Math.exp, -1)(0);}catch(e){return true;}return false;});
   stablePolynomialDerivative.add('zero_n', function(){try{ak.stablePolynomialDerivative(Math.exp, 0)(0);}catch(e){return true;}return false;});
  
   var stablePolynomialDerivativeBounds = {
    name: 'stablePolynomialDerivativeBounds',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   stablePolynomialDerivativeBounds.add('exp O(2)', function(){return iCmp(ak.stablePolynomialDerivativeBounds(Math.exp, 2)(1), ak.stablePolynomialDerivative(Math.exp, 2)(1), 2);});
   stablePolynomialDerivativeBounds.add('sin O(2)', function(){return iCmp(ak.stablePolynomialDerivativeBounds(Math.sin, 2)(0), ak.stablePolynomialDerivative(Math.sin, 2)(0), 2);});
   stablePolynomialDerivativeBounds.add('cos O(2)', function(){return iCmp(ak.stablePolynomialDerivativeBounds(Math.cos, 2)(0), ak.stablePolynomialDerivative(Math.cos, 2)(0), 2);});
   stablePolynomialDerivativeBounds.add('exp O(3)', function(){return iCmp(ak.stablePolynomialDerivativeBounds(Math.exp, 3)(1), ak.stablePolynomialDerivative(Math.exp, 3)(1), 3);});
   stablePolynomialDerivativeBounds.add('sin O(3)', function(){return iCmp(ak.stablePolynomialDerivativeBounds(Math.sin, 3)(0), ak.stablePolynomialDerivative(Math.sin, 3)(0), 3);});
   stablePolynomialDerivativeBounds.add('cos O(3)', function(){return iCmp(ak.stablePolynomialDerivativeBounds(Math.cos, 3)(0), ak.stablePolynomialDerivative(Math.cos, 3)(0), 3);});
   stablePolynomialDerivativeBounds.add('exp O(7)', function(){return iCmp(ak.stablePolynomialDerivativeBounds(Math.exp, 7)(1), ak.stablePolynomialDerivative(Math.exp, 7)(1), 7);});
   stablePolynomialDerivativeBounds.add('sin O(7)', function(){return iCmp(ak.stablePolynomialDerivativeBounds(Math.sin, 7)(0), ak.stablePolynomialDerivative(Math.sin, 7)(0), 7);});
   stablePolynomialDerivativeBounds.add('cos O(7)', function(){return iCmp(ak.stablePolynomialDerivativeBounds(Math.cos, 7)(0), ak.stablePolynomialDerivative(Math.cos, 7)(0), 7);});
  
   var symmetricPolynomialDerivative = {
    name: 'symmetricPolynomialDerivative',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   symmetricPolynomialDerivative.add('exp O(2)', function(){return ak.diff(ak.symmetricPolynomialDerivative(Math.exp, 2)(1), ak.E)<20*Math.pow(ak.EPSILON, 2/3);});
   symmetricPolynomialDerivative.add('sin O(2)', function(){return ak.diff(ak.symmetricPolynomialDerivative(Math.sin, 2)(0), 1)<20*Math.pow(ak.EPSILON, 2/3);});
   symmetricPolynomialDerivative.add('cos O(2)', function(){return ak.diff(ak.symmetricPolynomialDerivative(Math.cos, 2)(0), 0)<20*Math.pow(ak.EPSILON, 2/3);});
   symmetricPolynomialDerivative.add('exp O(3)', function(){return ak.diff(ak.symmetricPolynomialDerivative(Math.exp, 3)(1), ak.E)<30*Math.pow(ak.EPSILON, 3/4);});
   symmetricPolynomialDerivative.add('sin O(3)', function(){return ak.diff(ak.symmetricPolynomialDerivative(Math.sin, 3)(0), 1)<30*Math.pow(ak.EPSILON, 3/4);});
   symmetricPolynomialDerivative.add('cos O(3)', function(){return ak.diff(ak.symmetricPolynomialDerivative(Math.cos, 3)(0), 0)<30*Math.pow(ak.EPSILON, 3/4);});
   symmetricPolynomialDerivative.add('exp O(7)', function(){return ak.diff(ak.symmetricPolynomialDerivative(Math.exp, 7)(1), ak.E)<70*Math.pow(ak.EPSILON, 7/8);});
   symmetricPolynomialDerivative.add('sin O(7)', function(){return ak.diff(ak.symmetricPolynomialDerivative(Math.sin, 7)(0), 1)<70*Math.pow(ak.EPSILON, 7/8);});
   symmetricPolynomialDerivative.add('cos O(7)', function(){return ak.diff(ak.symmetricPolynomialDerivative(Math.cos, 7)(0), 0)<70*Math.pow(ak.EPSILON, 7/8);});
   symmetricPolynomialDerivative.add('bad_f', function(){try{ak.symmetricPolynomialDerivative(1)(0);}catch(e){return true;}return false;});
   symmetricPolynomialDerivative.add('bad_n', function(){try{ak.symmetricPolynomialDerivative(Math.exp, Math.exp)(0);}catch(e){return true;}return false;});
   symmetricPolynomialDerivative.add('neg_n', function(){try{ak.symmetricPolynomialDerivative(Math.exp, -1)(0);}catch(e){return true;}return false;});
   symmetricPolynomialDerivative.add('zero_n', function(){try{ak.symmetricPolynomialDerivative(Math.exp, 0)(0);}catch(e){return true;}return false;});
  
   var symmetricPolynomialDerivativeBounds = {
    name: 'symmetricPolynomialDerivativeBounds',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   symmetricPolynomialDerivativeBounds.add('exp O(2)', function(){return iCmp(ak.symmetricPolynomialDerivativeBounds(Math.exp, 2)(1), ak.symmetricPolynomialDerivative(Math.exp, 2)(1), 2);});
   symmetricPolynomialDerivativeBounds.add('sin O(2)', function(){return iCmp(ak.symmetricPolynomialDerivativeBounds(Math.sin, 2)(0), ak.symmetricPolynomialDerivative(Math.sin, 2)(0), 2);});
   symmetricPolynomialDerivativeBounds.add('cos O(2)', function(){return iCmp(ak.symmetricPolynomialDerivativeBounds(Math.cos, 2)(0), ak.symmetricPolynomialDerivative(Math.cos, 2)(0), 2);});
   symmetricPolynomialDerivativeBounds.add('exp O(3)', function(){return iCmp(ak.symmetricPolynomialDerivativeBounds(Math.exp, 3)(1), ak.symmetricPolynomialDerivative(Math.exp, 3)(1), 3);});
   symmetricPolynomialDerivativeBounds.add('sin O(3)', function(){return iCmp(ak.symmetricPolynomialDerivativeBounds(Math.sin, 3)(0), ak.symmetricPolynomialDerivative(Math.sin, 3)(0), 3);});
   symmetricPolynomialDerivativeBounds.add('cos O(3)', function(){return iCmp(ak.symmetricPolynomialDerivativeBounds(Math.cos, 3)(0), ak.symmetricPolynomialDerivative(Math.cos, 3)(0), 3);});
   symmetricPolynomialDerivativeBounds.add('exp O(7)', function(){return iCmp(ak.symmetricPolynomialDerivativeBounds(Math.exp, 7)(1), ak.symmetricPolynomialDerivative(Math.exp, 7)(1), 7);});
   symmetricPolynomialDerivativeBounds.add('sin O(7)', function(){return iCmp(ak.symmetricPolynomialDerivativeBounds(Math.sin, 7)(0), ak.symmetricPolynomialDerivative(Math.sin, 7)(0), 7);});
   symmetricPolynomialDerivativeBounds.add('cos O(7)', function(){return iCmp(ak.symmetricPolynomialDerivativeBounds(Math.cos, 7)(0), ak.symmetricPolynomialDerivative(Math.cos, 7)(0), 7);});
  
   polynomialDerivative.add(basicPolynomialDerivative);
   polynomialDerivative.add(polynomialDerivativeBounds);
   polynomialDerivative.add(stablePolynomialDerivative);
   polynomialDerivative.add(stablePolynomialDerivativeBounds);
   polynomialDerivative.add(symmetricPolynomialDerivative);
   polynomialDerivative.add(symmetricPolynomialDerivativeBounds);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   polynomialDerivative.add(load);
  }

  akTest.add(polynomialDerivative);
 }

 ak.using('Calculus/PolynomialDerivative.js', define);
})();
