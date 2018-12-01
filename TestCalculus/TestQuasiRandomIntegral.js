"use strict";

(function() {
 function define() {
  var quasiRandomIntegral = {
   name: 'calculus.quasiRandomIntegral',
   body: [],
   add: function(t) {this.body.push(t);}
  };

  try {
   function g(x) {
    return ak.mul(x,x);
   }
  
   function sin(x) {
    return Math.sin(ak.mul(x,x));
   }

   var invalidArgumentsUni = {
    name: 'invalidArgumentsUni',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   invalidArgumentsUni.add('non-function', function(){try{ak.quasiRandomIntegral(1, 0.1)(-1, 1);} catch(e){return true;} return false;});
   invalidArgumentsUni.add('NaN threshold', function(){try{ak.quasiRandomIntegral(Math.exp, ak.NaN)(-1, 1);} catch(e){return true;} return false;});
   invalidArgumentsUni.add('NaN steps', function(){try{ak.quasiRandomIntegral(Math.exp, 0.1, ak.NaN)(-1, 1);} catch(e){return true;} return false;});
   invalidArgumentsUni.add('no steps', function(){try{ak.quasiRandomIntegral(Math.sin, 1e-15, 0)(8);} catch(e){return true;} return false;});
   invalidArgumentsUni.add('non-qrnd', function(){try{ak.quasiRandomIntegral(Math.sin, 1e-15, 100, 2)(8);} catch(e){return true;} return false;});
   invalidArgumentsUni.add('non-prnd', function(){try{ak.quasiRandomIntegral(Math.sin, 1e-15, 100, undefined, 2)(8);} catch(e){return true;} return false;});
   invalidArgumentsUni.add('NaN x0', function(){try{ak.quasiRandomIntegral(Math.exp, 0.1)(ak.NaN, 1);} catch(e){return true;} return false;});
   invalidArgumentsUni.add('NaN x1', function(){try{ak.quasiRandomIntegral(Math.exp, 0.1)(1, ak.NaN);} catch(e){return true;} return false;});
   invalidArgumentsUni.add('infinite x0', function(){try{ak.quasiRandomIntegral(Math.exp, 0.1)(-ak.INFINITY, 0);} catch(e){return true;} return false;});
   invalidArgumentsUni.add('infinite x1', function(){try{ak.quasiRandomIntegral(Math.exp, 0.1)(0, ak.INFINITY);} catch(e){return true;} return false;});
  
   var oneArgumentUni = {
    name: 'oneArgumentUni',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   oneArgumentUni.add('exp', function(){return ak.diff(ak.quasiRandomIntegral(Math.exp)(1), Math.exp(1)-1)<1e-4;});
   oneArgumentUni.add('sin', function(){return ak.diff(ak.quasiRandomIntegral(Math.sin)(8), 1-Math.cos(8))<1e-4;});
   oneArgumentUni.add('cos', function(){return ak.diff(ak.quasiRandomIntegral(Math.cos)(8), Math.sin(8))<1e-4;});
   oneArgumentUni.add('exp explicit', function(){return ak.diff(ak.quasiRandomIntegral(Math.exp, 1e-3, 10000000, ak.haltonRnd(7))(1), Math.exp(1)-1)<1e-2;});
   oneArgumentUni.add('sin explicit', function(){return ak.diff(ak.quasiRandomIntegral(Math.sin, 1e-3, 10000000, ak.haltonRnd(7))(8), 1-Math.cos(8))<1e-2;});
   oneArgumentUni.add('cos explicit', function(){return ak.diff(ak.quasiRandomIntegral(Math.cos, 1e-3, 10000000, ak.haltonRnd(7))(8), Math.sin(8))<1e-2;});
  
   var twoArgumentsUni = {
    name: 'twoArgumentsUni',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   twoArgumentsUni.add('exp', function(){return ak.diff(ak.quasiRandomIntegral(Math.exp)(-1, 1), Math.exp(1)-Math.exp(-1))<1e-4;});
   twoArgumentsUni.add('sin', function(){return ak.diff(ak.quasiRandomIntegral(Math.sin)(-2, 4), Math.cos(-2)-Math.cos(4))<1e-4;});
   twoArgumentsUni.add('cos', function(){return ak.diff(ak.quasiRandomIntegral(Math.cos)(-2, 4), Math.sin(4)-Math.sin(-2))<1e-4;});
  
   var invalidArgumentsBi = {
    name: 'invalidArgumentsBi',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   invalidArgumentsBi.add('non-function', function(){try{ak.quasiRandomIntegral(1, 0.1)(ak.vector(2, -1), ak.vector(2, 1));} catch(e){return true;} return false;});
   invalidArgumentsBi.add('NaN threshold', function(){try{ak.quasiRandomIntegral(g, ak.NaN)(ak.vector(2, -1), ak.vector(2, 1));} catch(e){return true;} return false;});
   invalidArgumentsBi.add('NaN steps', function(){try{ak.quasiRandomIntegral(g, 0.1, ak.NaN)(ak.vector(2, -1), ak.vector(2, 1));} catch(e){return true;} return false;});
   invalidArgumentsBi.add('no steps', function(){try{ak.quasiRandomIntegral(sin, 1e-15, 0)(ak.vector(2, -8), ak.vector(2, 8));} catch(e){return true;} return false;});
   invalidArgumentsBi.add('non-qrnd', function(){try{ak.quasiRandomIntegral(sin, 1e-15, 100, 1)(ak.vector(2, -8), ak.vector(2, 8));} catch(e){return true;} return false;});
   invalidArgumentsBi.add('uni qrnd', function(){try{ak.quasiRandomIntegral(g, 1e-3, 10000000, ak.haltonRnd(5))(ak.vector(2, 1));} catch(e){return true;} return false;});
   invalidArgumentsBi.add('non-prnd', function(){try{ak.quasiRandomIntegral(sin, 1e-15, 100, undefined, 1)(ak.vector(2, -8), ak.vector(2, 8));} catch(e){return true;} return false;});
   invalidArgumentsBi.add('NaN x0', function(){try{ak.quasiRandomIntegral(g, 0.1)(ak.vector(2, ak.NaN), ak.vector(2, 1));} catch(e){return true;} return false;});
   invalidArgumentsBi.add('NaN x1', function(){try{ak.quasiRandomIntegral(g, 0.1)(ak.vector(2, -1), ak.vector(2, ak.NaN));} catch(e){return true;} return false;});
   invalidArgumentsBi.add('infinite x0', function(){try{ak.quasiRandomIntegral(g, 0.1)(ak.vector(2, -ak.INFINITY), ak.vector(2, 1));} catch(e){return true;} return false;});
   invalidArgumentsBi.add('infinite x1', function(){try{ak.quasiRandomIntegral(g, 0.1)(ak.vector(2, -1), ak.vector(2, ak.INFINITY));} catch(e){return true;} return false;});
  
   var oneArgumentBi = {
    name: 'oneArgumentBi',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   oneArgumentBi.add('abs', function(){return ak.diff(ak.quasiRandomIntegral(g)(ak.vector(2, 1)), 2/3)<5e-4;});
   oneArgumentBi.add('abs explicit', function(){return ak.diff(ak.quasiRandomIntegral(g, 1e-3, 10000000, ak.haltonRnd([7, 13]))(ak.vector(2, 1)), 2/3)<1e-2;});
  
   var twoArgumentsBi = {
    name: 'twoArgumentsBi',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   twoArgumentsBi.add('abs', function(){return ak.diff(ak.quasiRandomIntegral(g)(ak.vector(2, -1), ak.vector(2, 1)), 8/3)<5e-4;});
  
   var invalidArgumentsTri = {
    name: 'invalidArgumentsTri',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   invalidArgumentsTri.add('non-function', function(){try{ak.quasiRandomIntegral(1, 0.1)(ak.vector(3, -1), ak.vector(3, 1));} catch(e){return true;} return false;});
   invalidArgumentsTri.add('NaN threshold', function(){try{ak.quasiRandomIntegral(g, ak.NaN)(ak.vector(3, -1), ak.vector(3, 1));} catch(e){return true;} return false;});
   invalidArgumentsTri.add('NaN steps', function(){try{ak.quasiRandomIntegral(g, 0.1, ak.NaN)(ak.vector(3, -1), ak.vector(3, 1));} catch(e){return true;} return false;});
   invalidArgumentsTri.add('no steps', function(){try{ak.quasiRandomIntegral(sin, 1e-15, 0)(ak.vector(3, -8), ak.vector(3, 8));} catch(e){return true;} return false;});
   invalidArgumentsTri.add('non-qrnd', function(){try{ak.quasiRandomIntegral(sin, 1e-15, 100, [])(ak.vector(3, -8), ak.vector(3, 8));} catch(e){return true;} return false;});
   invalidArgumentsTri.add('uni qrnd', function(){try{ak.quasiRandomIntegral(g, 1e-3, 10000000, ak.haltonRnd(5))(ak.vector(3, 1));} catch(e){return true;} return false;});
   invalidArgumentsTri.add('non-prnd', function(){try{ak.quasiRandomIntegral(sin, 1e-15, 100, undefined, [])(ak.vector(3, -8), ak.vector(3, 8));} catch(e){return true;} return false;});
   invalidArgumentsTri.add('NaN x0', function(){try{ak.quasiRandomIntegral(g, 0.1)(ak.vector(3, ak.NaN), ak.vector(3, 1));} catch(e){return true;} return false;});
   invalidArgumentsTri.add('NaN x1', function(){try{ak.quasiRandomIntegral(g, 0.1)(ak.vector(3, -1), ak.vector(3, ak.NaN));} catch(e){return true;} return false;});
   invalidArgumentsTri.add('infinite x0', function(){try{ak.quasiRandomIntegral(g, 0.1)(ak.vector(3, -ak.INFINITY), ak.vector(3, 1));} catch(e){return true;} return false;});
   invalidArgumentsTri.add('infinite x1', function(){try{ak.quasiRandomIntegral(g, 0.1)(ak.vector(3, -1), ak.vector(3, ak.INFINITY));} catch(e){return true;} return false;});
  
   var oneArgumentTri = {
    name: 'oneArgumentTri',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   oneArgumentTri.add('abs', function(){return ak.diff(ak.quasiRandomIntegral(g)(ak.vector(3, 1)), 1)<5e-4;});
   oneArgumentTri.add('abs explicit', function(){return ak.diff(ak.quasiRandomIntegral(g, 1e-3, 10000000, ak.haltonRnd([7, 13, 23]))(ak.vector(3, 1)), 1)<1e-2;});
  
   var twoArgumentsTri = {
    name: 'twoArgumentsTri',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   twoArgumentsTri.add('abs', function(){return ak.diff(ak.quasiRandomIntegral(g)(ak.vector(3, -1), ak.vector(3, 1)), 8)<5e-4;});
  
   quasiRandomIntegral.add(invalidArgumentsUni);
   quasiRandomIntegral.add(oneArgumentUni);
   quasiRandomIntegral.add(twoArgumentsUni);
   quasiRandomIntegral.add(invalidArgumentsBi);
   quasiRandomIntegral.add(oneArgumentBi);
   quasiRandomIntegral.add(twoArgumentsBi);
   quasiRandomIntegral.add(invalidArgumentsTri);
   quasiRandomIntegral.add(oneArgumentTri);
   quasiRandomIntegral.add(twoArgumentsTri);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   quasiRandomIntegral.add(load);
  }

  akTest.add(quasiRandomIntegral);
 }

 ak.using(['Calculus/QuasiRandomIntegral.js', 'Random/HaltonRnd.js'], define);
})();
