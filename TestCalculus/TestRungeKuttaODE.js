"use strict";

(function() {
 function define() {
  var rungeKuttaODE = {
   name: 'calculus.rungeKuttaODE',
   body: [],
   add: function(t) {this.body.push(t);}
  };

  try {
   var invalidArguments = {
    name: 'invalidArguments',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   var a = [[0.5],[0,0.5],[0,0,1]];
   var b = [1,2,2,1];
   var c = [0.5,0.5,1];

   invalidArguments.add('non-function', function(){try{ak.rungeKuttaODE(1, 0.1, a, b, c);} catch(e){return true;} return false;});
   invalidArguments.add('NaN width', function(){try{ak.rungeKuttaODE(Math.exp, ak.NaN, a, b, c);} catch(e){return true;} return false;});
   invalidArguments.add('non-array a', function(){try{ak.rungeKuttaODE(Math.exp, 0.1, 'a', b, c);} catch(e){return true;} return false;});
   invalidArguments.add('non-array a row', function(){try{ak.rungeKuttaODE(Math.exp, 0.1, [a[0],'a1',a[2]], b, c);} catch(e){return true;} return false;});
   invalidArguments.add('size mismatch a row', function(){try{ak.rungeKuttaODE(Math.exp, 0.1, [a[0],[0,0.5,0],a[2]], b, c);} catch(e){return true;} return false;});
   invalidArguments.add('non-number a element', function(){try{ak.rungeKuttaODE(Math.exp, 0.1, [a[0],['a',0.5],a[2]], b, c);} catch(e){return true;} return false;});
   invalidArguments.add('NaN a element', function(){try{ak.rungeKuttaODE(Math.exp, 0.1, [a[0],[0,ak.NaN],a[2]], b, c);} catch(e){return true;} return false;});
   invalidArguments.add('non-array b', function(){try{ak.rungeKuttaODE(Math.exp, 0.1, a, 'b', c);} catch(e){return true;} return false;});
   invalidArguments.add('size mismatch b', function(){try{ak.rungeKuttaODE(Math.exp, 0.1, a, c, c);} catch(e){return true;} return false;});
   invalidArguments.add('zero b', function(){try{ak.rungeKuttaODE(Math.exp, 0.1, a, [0,0,0,0], c);} catch(e){return true;} return false;});
   invalidArguments.add('non-number b element', function(){try{ak.rungeKuttaODE(Math.exp, 0.1, a, [1,2,'a',1], c);} catch(e){return true;} return false;});
   invalidArguments.add('NaN b element', function(){try{ak.rungeKuttaODE(Math.exp, 0.1, a, [1,2,ak.NaN,1], c);} catch(e){return true;} return false;});
   invalidArguments.add('non-array c', function(){try{ak.rungeKuttaODE(Math.exp, 0.1, a, b, 'c');} catch(e){return true;} return false;});
   invalidArguments.add('size mismatch c', function(){try{ak.rungeKuttaODE(Math.exp, 0.1, a, b, b);} catch(e){return true;} return false;});
   invalidArguments.add('non-number c element', function(){try{ak.rungeKuttaODE(Math.exp, 0.1, a, b, [0.5,0.5,'a']);} catch(e){return true;} return false;});
   invalidArguments.add('zero c element', function(){try{ak.rungeKuttaODE(Math.exp, 0.1, a, b, [0.5,0.5,0]);} catch(e){return true;} return false;});
   invalidArguments.add('NaN c element', function(){try{ak.rungeKuttaODE(Math.exp, 0.1, a, b, [0.5,0.5,ak.NaN]);} catch(e){return true;} return false;});
   invalidArguments.add('NaN x0', function(){try{ak.rungeKuttaODE(Math.exp, 0.1, a, b, c)(ak.NaN, 1, 1);} catch(e){return true;} return false;});
   invalidArguments.add('NaN x1', function(){try{ak.rungeKuttaODE(Math.exp, 0.1, a, b, c)(1, ak.NaN, 1);} catch(e){return true;} return false;});
   invalidArguments.add('infinite x0', function(){try{ak.rungeKuttaODE(Math.exp, 0.1, a, b, c)(-ak.INFINITY, 0, 1);} catch(e){return true;} return false;});
   invalidArguments.add('infinite x1', function(){try{ak.rungeKuttaODE(Math.exp, 0.1, a, b, c)(0, ak.INFINITY, 1);} catch(e){return true;} return false;});

   var evaluate = {
    name: 'eval',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   function firstOrder(ode, o, a, b, c) {
    function f(x, y) {return -x*y}
    var xn = 3;
    var n = 30;
    var dx = xn/n;
    var i, xi;

    ode = ode(f, dx, a, b, c);

    for(i=0;i<n;++i) {
     var xi = xn * i/n;
     var yi = ode(0, xi, 1);
     if(ak.diff(yi, Math.exp(-0.5*xi*xi))>Math.pow(dx, o)) return false;
    }
    return true;
   }

   function secondOrder(ode, o, a, b, c) {
    function f(t, x) {
     return ak.vector([x.at(1), -2*x.at(1) - 101*x.at(0)]);
    }
    var tn = 2.5;
    var n = 25;
    var dt = tn/n;
    var i, ti;

    ode = ode(f, dt/10, a, b, c);

    for(i=0;i<n;++i) {
     var ti = tn * i/n;
     var xi = ode(0, ti, ak.vector([1,0]));
     if(ak.diff(xi.at(0), Math.exp(-ti)*(Math.cos(10*ti)+0.1*Math.sin(10*ti)))>4*Math.pow(dt, o)) return false;
    }
    return true;
   }

   evaluate.add('generic first order', function() {return firstOrder(ak.rungeKuttaODE, 4, a, b, c);});
   evaluate.add('generic first order default nodes', function() {return firstOrder(ak.rungeKuttaODE, 4, a, b);});
   evaluate.add('generic second order', function() {return secondOrder(ak.rungeKuttaODE, 4, a, b, c);});
   evaluate.add('generic second order default nodes', function() {return secondOrder(ak.rungeKuttaODE, 4, a, b);});
   evaluate.add('euler rk1 first order', function() {return firstOrder(ak.eulerRK1ODE, 1);});
   evaluate.add('euler rk1 second order', function() {return secondOrder(ak.eulerRK1ODE, 1);});
   evaluate.add('midpoint rk2 first order', function() {return firstOrder(ak.midpointRK2ODE, 2);});
   evaluate.add('midpoint rk2 second order', function() {return secondOrder(ak.midpointRK2ODE, 2);});
   evaluate.add('heun rk2 first order', function() {return firstOrder(ak.heunRK2ODE, 2);});
   evaluate.add('heun rk2 second order', function() {return secondOrder(ak.heunRK2ODE, 2);});
   evaluate.add('ralston rk2 first order', function() {return firstOrder(ak.ralstonRK2ODE, 2);});
   evaluate.add('ralston rk2 second order', function() {return secondOrder(ak.ralstonRK2ODE, 2);});
   evaluate.add('kutta rk3 first order', function() {return firstOrder(ak.kuttaRK3ODE, 2);});
   evaluate.add('kutta rk3 second order', function() {return secondOrder(ak.kuttaRK3ODE, 2);});
   evaluate.add('heun rk3 first order', function() {return firstOrder(ak.heunRK3ODE, 2);});
   evaluate.add('heun rk3 second order', function() {return secondOrder(ak.heunRK3ODE, 2);});
   evaluate.add('ralston rk3 first order', function() {return firstOrder(ak.ralstonRK3ODE, 2);});
   evaluate.add('ralston rk3 second order', function() {return secondOrder(ak.ralstonRK3ODE, 2);});
   evaluate.add('classic rk4 first order', function() {return firstOrder(ak.classicRK4ODE, 4);});
   evaluate.add('classic rk4 second order', function() {return secondOrder(ak.classicRK4ODE, 4);});
   evaluate.add('kutta rk4 first order', function() {return firstOrder(ak.kuttaRK4ODE, 4);});
   evaluate.add('kutta rk4 second order', function() {return secondOrder(ak.kuttaRK4ODE, 4);});
   evaluate.add('fehlberg rk5 first order', function() {return firstOrder(ak.fehlbergRK5ODE, 5);});
   evaluate.add('fehlberg rk5 second order', function() {return secondOrder(ak.fehlbergRK5ODE, 5);});
   evaluate.add('cash-karp rk5 first order', function() {return firstOrder(ak.cashKarpRK5ODE, 5);});
   evaluate.add('cash-karp rk5 second order', function() {return secondOrder(ak.cashKarpRK5ODE, 5);});
   evaluate.add('dormand-prince rk5 first order', function() {return firstOrder(ak.dormandPrinceRK5ODE, 5);});
   evaluate.add('dormand-prince rk5 second order', function() {return secondOrder(ak.dormandPrinceRK5ODE, 5);});

   rungeKuttaODE.add(invalidArguments);
   rungeKuttaODE.add(evaluate);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   rungeKuttaODE.add(load);
  }

  akTest.add(rungeKuttaODE);
 }

 ak.using('Calculus/RungeKuttaODE.js', define);
})();
