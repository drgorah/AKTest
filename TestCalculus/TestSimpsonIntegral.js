"use strict";

(function() {
 function define() {
  var simpsonIntegral = {
   name: 'calculus.simpsonIntegral',
   body: [],
   add: function(t) {this.body.push(t);}
  };

  try {
   var invalidArguments = {
    name: 'invalidArguments',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   function f(x) {
    return x<0 ? -1 : 1;
   }
  
   invalidArguments.add('non-function', function(){try{ak.simpsonIntegral(1, 0.1);} catch(e){return true;} return false;});
   invalidArguments.add('discontinuous function', function(){try{ak.simpsonIntegral(f)(-1, 1);} catch(e){return true;} return false;});
   invalidArguments.add('NaN threshold', function(){try{ak.simpsonIntegral(Math.exp, ak.NaN);} catch(e){return true;} return false;});
   invalidArguments.add('NaN steps', function(){try{ak.simpsonIntegral(Math.exp, 0.1, ak.NaN);} catch(e){return true;} return false;});
   invalidArguments.add('No steps', function(){try{ak.simpsonIntegral(Math.sin, 1e-15, 0)(8);} catch(e){return true;} return false;});
   invalidArguments.add('NaN x0', function(){try{ak.simpsonIntegral(Math.exp, 0.1)(ak.NaN, 1);} catch(e){return true;} return false;});
   invalidArguments.add('NaN x1', function(){try{ak.simpsonIntegral(Math.exp, 0.1)(1, ak.NaN);} catch(e){return true;} return false;});
   invalidArguments.add('infinite x0', function(){try{ak.simpsonIntegral(Math.exp, 0.1)(-ak.INFINITY, 0);} catch(e){return true;} return false;});
   invalidArguments.add('infinite x1', function(){try{ak.simpsonIntegral(Math.exp, 0.1)(0, ak.INFINITY);} catch(e){return true;} return false;});
  
   var oneArgument = {
    name: 'oneArgument',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   oneArgument.add('exp', function(){return ak.diff(ak.simpsonIntegral(Math.exp)(1), Math.exp(1)-1)<1e-10;});
   oneArgument.add('sin', function(){return ak.diff(ak.simpsonIntegral(Math.sin)(8), 1-Math.cos(8))<1e-10;});
   oneArgument.add('cos', function(){return ak.diff(ak.simpsonIntegral(Math.cos)(8), Math.sin(8))<1e-10;});
  
   var twoArguments = {
    name: 'twoArguments',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   twoArguments.add('exp', function(){return ak.diff(ak.simpsonIntegral(Math.exp)(-1, 1), Math.exp(1)-Math.exp(-1))<1e-10;});
   twoArguments.add('sin', function(){return ak.diff(ak.simpsonIntegral(Math.sin)(-2, 4), Math.cos(-2)-Math.cos(4))<1e-10;});
   twoArguments.add('cos', function(){return ak.diff(ak.simpsonIntegral(Math.cos)(-2, 4), Math.sin(4)-Math.sin(-2))<1e-10;});
  
   simpsonIntegral.add(invalidArguments);
   simpsonIntegral.add(oneArgument);
   simpsonIntegral.add(twoArguments);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   simpsonIntegral.add(load);
  }

  akTest.add(simpsonIntegral);
 }

 ak.using('Calculus/SimpsonIntegral.js', define);
})();
