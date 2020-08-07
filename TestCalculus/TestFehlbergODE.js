"use strict";

(function() {
 function define() {
  var fehlbergODE = {
   name: 'calculus.fehlbergODE',
   body: [],
   add: function(t) {this.body.push(t);}
  };

  try {
   var invalidArguments = {
    name: 'invalidArguments',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   var a = [[1/4],[3/32,9/32],[1932/2197,-7200/2197,7296/2197],[439/216,-8,3680/513,-845/4104],[-8/27,2,-3544/2565,1859/4104,-11/40]];
   var b0 = [33440,0,146432,142805,-50787,10260];
   var b1 = [2375,0,11264,10985,-4104,0];
   var c = [1/4,3/8,12/13,1,1/2];

   invalidArguments.add('non-function', function(){try{ak.fehlbergODE(1, 0.1, 0.2, 5, a, b0, b1, c);} catch(e){return true;} return false;});
   invalidArguments.add('NaN min eps', function(){try{ak.fehlbergODE(Math.exp, ak.NaN, 0.2, 5, a, b0, b1, c);} catch(e){return true;} return false;});
   invalidArguments.add('NaN max eps', function(){try{ak.fehlbergODE(Math.exp, 0.1, ak.NaN, 5, a, b0, b1, c);} catch(e){return true;} return false;});
   invalidArguments.add('unordered eps', function(){try{ak.fehlbergODE(Math.exp, 0.2, 0.1, 5, a, b0, b1, c);} catch(e){return true;} return false;});
   invalidArguments.add('NaN order', function(){try{ak.fehlbergODE(Math.exp, 0.1, 0.2, ak.NaN, a, b0, b1, c);} catch(e){return true;} return false;});
   invalidArguments.add('non-integer order', function(){try{ak.fehlbergODE(Math.exp, 0.1, 0.2, 4.5, a, b0, b1, c);} catch(e){return true;} return false;});
   invalidArguments.add('non-array a', function(){try{ak.fehlbergODE(Math.exp, 0.1, 0.2, 5, 'a', b0, b1, c);} catch(e){return true;} return false;});
   invalidArguments.add('non-array a row', function(){try{ak.fehlbergODE(Math.exp, 0.1, 0.2, 5, [a[0],'a1',a[2]], b0, b1, c);} catch(e){return true;} return false;});
   invalidArguments.add('size mismatch a row', function(){try{ak.fehlbergODE(Math.exp, 0.1, 0.2, 5, [a[0],[0,0.5,0],a[2]], b0, b1, c);} catch(e){return true;} return false;});
   invalidArguments.add('non-number a element', function(){try{ak.fehlbergODE(Math.exp, 0.1, 0.2, 5, [a[0],['a',0.5],a[2]], b0, b1, c);} catch(e){return true;} return false;});
   invalidArguments.add('NaN a element', function(){try{ak.fehlbergODE(Math.exp, 0.1, 0.2, 5, [a[0],[0,ak.NaN],a[2]], b0, b1, c);} catch(e){return true;} return false;});
   invalidArguments.add('non-array b0', function(){try{ak.fehlbergODE(Math.exp, 0.1, 0.2, 5, a, 'b0', b1, c);} catch(e){return true;} return false;});
   invalidArguments.add('size mismatch b0', function(){try{ak.fehlbergODE(Math.exp, 0.1, 0.2, 5, a, c, b1, c);} catch(e){return true;} return false;});
   invalidArguments.add('zero b0', function(){try{ak.fehlbergODE(Math.exp, 0.1, 0.2, 5, a, [0,0,0,0], b1, c);} catch(e){return true;} return false;});
   invalidArguments.add('non-number b0 element', function(){try{ak.fehlbergODE(Math.exp, 0.1, 0.2, 5, a, [1,2,'a',1], b1, c);} catch(e){return true;} return false;});
   invalidArguments.add('NaN b0 element', function(){try{ak.fehlbergODE(Math.exp, 0.1, 0.2, 5, a, [1,2,ak.NaN,1], b1, c);} catch(e){return true;} return false;});
   invalidArguments.add('non-array b1', function(){try{ak.fehlbergODE(Math.exp, 0.1, 0.2, 5, a, b0, 'b1', c);} catch(e){return true;} return false;});
   invalidArguments.add('size mismatch b1', function(){try{ak.fehlbergODE(Math.exp, 0.1, 0.2, 5, a, b0, c, c);} catch(e){return true;} return false;});
   invalidArguments.add('zero b1', function(){try{ak.fehlbergODE(Math.exp, 0.1, 0.2, 5, a, b0, [0,0,0,0], c);} catch(e){return true;} return false;});
   invalidArguments.add('non-number b1 element', function(){try{ak.fehlbergODE(Math.exp, 0.1, 0.2, 5, a, b0, [1,2,'a',1], c);} catch(e){return true;} return false;});
   invalidArguments.add('NaN b1 element', function(){try{ak.fehlbergODE(Math.exp, 0.1, 0.2, 5, a, b1, [1,2,ak.NaN,1], c);} catch(e){return true;} return false;});
   invalidArguments.add('non-array c', function(){try{ak.fehlbergODE(Math.exp, 0.1, 0.2, 5, a, b0, b1, 'c');} catch(e){return true;} return false;});
   invalidArguments.add('size mismatch c', function(){try{ak.fehlbergODE(Math.exp, 0.1, 0.2, 5, a, b0, b1, b0);} catch(e){return true;} return false;});
   invalidArguments.add('non-number c element', function(){try{ak.fehlbergODE(Math.exp, 0.1, 0.2, 5, a, b0, b1, [0.5,0.5,'a']);} catch(e){return true;} return false;});
   invalidArguments.add('zero c element', function(){try{ak.fehlbergODE(Math.exp, 0.1, 0.2, 5, a, b0, b1, [0.5,0.5,0]);} catch(e){return true;} return false;});
   invalidArguments.add('NaN c element', function(){try{ak.fehlbergODE(Math.exp, 0.1, 0.2, 5, a, b0, b1, [0.5,0.5,ak.NaN]);} catch(e){return true;} return false;});
   invalidArguments.add('non-number steps', function(){try{ak.fehlbergODE(Math.exp, 0.1, 0.2, 5, a, b0, b1, c, 'a');} catch(e){return true;} return false;});
   invalidArguments.add('NaN x0', function(){try{ak.fehlbergODE(Math.exp, 0.1, 0.2, 5, a, b0, b1, c)(ak.NaN, 1, 1);} catch(e){return true;} return false;});
   invalidArguments.add('NaN x1', function(){try{ak.fehlbergODE(Math.exp, 0.1, 0.2, 5, a, b0, b1, c)(1, ak.NaN, 1);} catch(e){return true;} return false;});
   invalidArguments.add('infinite x0', function(){try{ak.fehlbergODE(Math.exp, 0.1, 0.2, 5, a, b0, b1, c)(-ak.INFINITY, 0, 1);} catch(e){return true;} return false;});
   invalidArguments.add('infinite x1', function(){try{ak.fehlbergODE(Math.exp, 0.1, 0.2, 5, a, b0, b1, c)(0, ak.INFINITY, 1);} catch(e){return true;} return false;});

   var evaluate = {
    name: 'eval',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   function firstOrder(ode, o, a, b0, b1, c) {
    function f(x, y) {return -x*y}
    var xn = 3;
    var n = 30;
    var dx = xn/n;
    var e0 = Math.pow(dx, o)/10;
    var e1 = Math.pow(dx, o)*10;
    var i, xi;

    ode = ode(f, e0, e1, o, a, b0, b1, c);

    for(i=0;i<n;++i) {
     var xi = xn * i/n;
     var yi = ode(0, xi, 1);
     if(ak.diff(yi, Math.exp(-0.5*xi*xi))>10*e1) return false;
    }
    return true;
   }

   function specificFirstOrder(ode, o) {
    function f(x, y) {return -x*y}
    var xn = 3;
    var n = 30;
    var dx = xn/n;
    var e0 = Math.pow(dx, o)/10;
    var e1 = Math.pow(dx, o)*10;
    var i, xi;

    ode = ode(f, e0, e1);

    for(i=0;i<n;++i) {
     var xi = xn * i/n;
     var yi = ode(0, xi, 1);
     if(ak.diff(yi, Math.exp(-0.5*xi*xi))>10*e1) return false;
    }
    return true;
   }

   function secondOrder(ode, o, a, b0, b1, c) {
    function f(t, x) {
     return ak.vector([x.at(1), -2*x.at(1) - 101*x.at(0)]);
    }
    var tn = 2.5;
    var n = 25;
    var dt = tn/n;
    var e0 = Math.pow(dt, o)/10;
    var e1 = Math.pow(dt, o)*10;
    var i, ti;

    ode = ode(f, e0, e1, o, a, b0, b1, c);

    for(i=0;i<n;++i) {
     var ti = tn * i/n;
     var xi = ode(0, ti, ak.vector([1,0]));
     if(ak.diff(xi.at(0), Math.exp(-ti)*(Math.cos(10*ti)+0.1*Math.sin(10*ti)))>10*e1) return false;
    }
    return true;
   }

   function specificSecondOrder(ode, o) {
    function f(t, x) {
     return ak.vector([x.at(1), -2*x.at(1) - 101*x.at(0)]);
    }
    var tn = 2.5;
    var n = 25;
    var dt = tn/n;
    var e0 = Math.pow(dt, o)/10;
    var e1 = Math.pow(dt, o)*10;
    var i, ti;

    ode = ode(f, e0, e1);

    for(i=0;i<n;++i) {
     var ti = tn * i/n;
     var xi = ode(0, ti, ak.vector([1,0]));
     if(ak.diff(xi.at(0), Math.exp(-ti)*(Math.cos(10*ti)+0.1*Math.sin(10*ti)))>10*e1) return false;
    }
    return true;
   }

   evaluate.add('generic first order', function() {return firstOrder(ak.fehlbergODE, 5, a, b0, b1, c);});
   evaluate.add('generic first order default nodes', function() {return firstOrder(ak.fehlbergODE, 5, a, b0, b1);});
   evaluate.add('generic second order', function() {return secondOrder(ak.fehlbergODE, 5, a, b0, b1, c);});
   evaluate.add('generic second order default nodes', function() {return secondOrder(ak.fehlbergODE, 5, a, b0, b1);});
   evaluate.add('heun rkf2 first order', function() {return specificFirstOrder(ak.heunRKF2ODE, 2);});
   evaluate.add('heun rkf2 second order', function() {return specificSecondOrder(ak.heunRKF2ODE, 2);});
   evaluate.add('bogacki-shampine rkf3 first order', function() {return specificFirstOrder(ak.bogackiShampineRKF3ODE, 3);});
   evaluate.add('bogacki-shampine rkf3 second order', function() {return specificSecondOrder(ak.bogackiShampineRKF3ODE, 3);});
   evaluate.add('fehlberg rkf5 first order', function() {return specificFirstOrder(ak.fehlbergRKF5ODE, 5);});
   evaluate.add('fehlberg rkf5 second order', function() {return specificSecondOrder(ak.fehlbergRKF5ODE, 5);});
   evaluate.add('cash-karp rkf5 first order', function() {return specificFirstOrder(ak.cashKarpRKF5ODE, 5);});
   evaluate.add('cash-karp rkf5 second order', function() {return specificSecondOrder(ak.cashKarpRKF5ODE, 5);});
   evaluate.add('dormand-prince rkf5 first order', function() {return specificFirstOrder(ak.dormandPrinceRKF5ODE, 5);});
   evaluate.add('dormand-prince rkf5 second order', function() {return specificSecondOrder(ak.dormandPrinceRKF5ODE, 5);});

   fehlbergODE.add(invalidArguments);
   fehlbergODE.add(evaluate);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   fehlbergODE.add(load);
  }

  akTest.add(fehlbergODE);
 }

 ak.using('Calculus/FehlbergODE.js', define);
})();
