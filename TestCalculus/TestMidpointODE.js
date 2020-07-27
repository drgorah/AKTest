"use strict";

(function() {
 function define() {
  var midpointODE = {
   name: 'calculus.midpointODE',
   body: [],
   add: function(t) {this.body.push(t);}
  };

  try {
   var invalidArguments = {
    name: 'invalidArguments',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   invalidArguments.add('non-function', function(){try{ak.midpointODE(1, 0.1);} catch(e){return true;} return false;});
   invalidArguments.add('NaN width', function(){try{ak.midpointODE(Math.exp, ak.NaN);} catch(e){return true;} return false;});
   invalidArguments.add('NaN x0', function(){try{ak.midpointODE(Math.exp, 0.1)(ak.NaN, 1, 1);} catch(e){return true;} return false;});
   invalidArguments.add('NaN x1', function(){try{ak.midpointODE(Math.exp, 0.1)(1, ak.NaN, 1);} catch(e){return true;} return false;});
   invalidArguments.add('infinite x0', function(){try{ak.midpointODE(Math.exp, 0.1)(-ak.INFINITY, 0, 1);} catch(e){return true;} return false;});
   invalidArguments.add('infinite x1', function(){try{ak.midpointODE(Math.exp, 0.1)(0, ak.INFINITY, 1);} catch(e){return true;} return false;});

   var evaluate = {
    name: 'eval',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   function firstOrder() {
    function f(x, y) {return -x*y}
    var xn = 3;
    var n = 30;
    var dx = xn/n;
    var ode = ak.midpointODE(f, dx);
    var i, xi;

    for(i=0;i<n;++i) {
     var xi = xn * i/n;
     var yi = ode(0, xi, 1);
     if(ak.diff(yi, Math.exp(-0.5*xi*xi))>dx*dx) return false;
    }
    return true;
   }

   function secondOrder() {
    function f(t, x) {
     return ak.vector([x.at(1), -2*x.at(1) - 101*x.at(0)]);
    }
    var tn = 2.5;
    var n = 25;
    var dt = tn/n;
    var ode = ak.midpointODE(f, dt/10);
    var i, ti;

    for(i=0;i<n;++i) {
     var ti = tn * i/n;
     var xi = ode(0, ti, ak.vector([1,0]));
     if(ak.diff(xi.at(0), Math.exp(-ti)*(Math.cos(10*ti)+0.1*Math.sin(10*ti)))>2*dt*dt) return false;
    }
    return true;
   }

   evaluate.add('first order', firstOrder);
   evaluate.add('second order', secondOrder);

   midpointODE.add(invalidArguments);
   midpointODE.add(evaluate);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   midpointODE.add(load);
  }

  akTest.add(midpointODE);
 }

 ak.using('Calculus/MidpointODE.js', define);
})();
