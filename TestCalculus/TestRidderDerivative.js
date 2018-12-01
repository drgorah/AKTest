"use strict";

(function() {
 function define() {
  var ridderDerivative = {
   name: 'calculus.ridderDerivative',
   body: [],
   add: function(t) {this.body.push(t);}
  };

  try {
   var derivatives = {
    name: 'derivatives',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   derivatives.add('exp', function(){return ak.diff(ak.ridderDerivative(Math.exp, 0.2)(1), ak.E)<20*ak.EPSILON;});
   derivatives.add('sin', function(){return ak.diff(ak.ridderDerivative(Math.sin)(0), 1)<20*ak.EPSILON;});
   derivatives.add('cos', function(){return ak.diff(ak.ridderDerivative(Math.cos)(0), 0)<20*ak.EPSILON;});
   derivatives.add('bad_f', function(){try{ak.ridderDerivative(1)(0);}catch(e){return true;}return false;});
   derivatives.add('bad_d', function(){try{ak.ridderDerivative(Math.exp, Math.exp)(0);}catch(e){return true;}return false;});
   derivatives.add('neg_d', function(){try{ak.ridderDerivative(Math.exp, -1)(0);}catch(e){return true;}return false;});
   derivatives.add('zero_d', function(){try{ak.ridderDerivative(Math.exp, 0)(0);}catch(e){return true;}return false;});
  
   var errors = {
    name: 'errors',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   function ridderError(f, x, y) {
    var res  = ak.ridderDerivative(f).apply(x);
    var diff = ak.diff(res.val, y);
    return diff <= 2*res.err;
   }
  
   errors.add('exp', function(){return ridderError(Math.exp, 1, ak.E);});
   errors.add('sin', function(){return ridderError(Math.sin, 0, 1);});
   errors.add('cos', function(){return ridderError(Math.cos, 0, 0);});
  
   ridderDerivative.add(derivatives);
   ridderDerivative.add(errors);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   ridderDerivative.add(load);
  }

  akTest.add(ridderDerivative);
 }

 ak.using('Calculus/ridderDerivative.js', define);
})();
