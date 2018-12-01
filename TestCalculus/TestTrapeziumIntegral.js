"use strict";

(function() {
 function define() {
  var trapeziumIntegral = {
   name: 'calculus.trapeziumIntegral',
   body: [],
   add: function(t) {this.body.push(t);}
  };

  try {
   var invalidArguments = {
    name: 'invalidArguments',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   invalidArguments.add('non-function', function(){try{ak.trapeziumIntegral(1, 0.1);} catch(e){return true;} return false;});
   invalidArguments.add('NaN width', function(){try{ak.trapeziumIntegral(Math.exp, ak.NaN);} catch(e){return true;} return false;});
   invalidArguments.add('NaN x0', function(){try{ak.trapeziumIntegral(Math.exp, 0.1)(ak.NaN, 1);} catch(e){return true;} return false;});
   invalidArguments.add('NaN x1', function(){try{ak.trapeziumIntegral(Math.exp, 0.1)(1, ak.NaN);} catch(e){return true;} return false;});
   invalidArguments.add('infinite x0', function(){try{ak.trapeziumIntegral(Math.exp, 0.1)(-ak.INFINITY, 0);} catch(e){return true;} return false;});
   invalidArguments.add('infinite x1', function(){try{ak.trapeziumIntegral(Math.exp, 0.1)(0, ak.INFINITY);} catch(e){return true;} return false;});
  
   var oneArgument = {
    name: 'oneArgument',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   oneArgument.add('exp', function(){return ak.diff(ak.trapeziumIntegral(Math.exp, 1e-4)(1), Math.exp(1)-1)<1e-8;});
   oneArgument.add('sin', function(){return ak.diff(ak.trapeziumIntegral(Math.sin, 1e-4)(8), 1-Math.cos(8))<1e-8;});
   oneArgument.add('cos', function(){return ak.diff(ak.trapeziumIntegral(Math.cos, 1e-4)(8), Math.sin(8))<1e-8;});
  
   var twoArguments = {
    name: 'twoArguments',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   twoArguments.add('exp', function(){return ak.diff(ak.trapeziumIntegral(Math.exp, 1e-4)(-1, 1), Math.exp(1)-Math.exp(-1))<1e-8;});
   twoArguments.add('sin', function(){return ak.diff(ak.trapeziumIntegral(Math.sin, 1e-4)(-2, 4), Math.cos(-2)-Math.cos(4))<1e-8;});
   twoArguments.add('cos', function(){return ak.diff(ak.trapeziumIntegral(Math.cos, 1e-4)(-2, 4), Math.sin(4)-Math.sin(-2))<1e-8;});
  
   trapeziumIntegral.add(invalidArguments);
   trapeziumIntegral.add(oneArgument);
   trapeziumIntegral.add(twoArguments);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   trapeziumIntegral.add(load);
  }

  akTest.add(trapeziumIntegral);
 }

 ak.using('Calculus/TrapeziumIntegral.js', define);
})();
