"use strict";

(function() {
 function define() {
  var nestedIntegral = {
   name: 'calculus.nestedIntegral',
   body: [],
   add: function(t) {this.body.push(t);}
  };

  try {
   function f(x) {
    return x<0 ? -1 : 1;
   }
  
   function g(x) {
    return ak.mul(x,x);
   }
  
   function h(x) {
    return x.at(0)<0 ? -1 : 1;
   }
  
   function sin(x) {
    return Math.sin(ak.mul(x,x));
   }
  
   var nestedRomberg = ak.nestedIntegral(ak.rombergIntegral);

   var invalidArgument = {
    name: 'invalidArgument',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   invalidArgument.add('non-function', function(){try{ak.nestedIntegral(1);} catch(e){return true;} return false;});
   invalidArgument.add('non-integral', function(){try{ak.nestedIntegral(g)(g)(-1, 1);} catch(e){return true;} return false;});
  
   var invalidArgumentsUni = {
    name: 'invalidArgumentsUni',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   invalidArgumentsUni.add('non-function', function(){try{nestedRomberg(1, 0.1)(-1, 1);} catch(e){return true;} return false;});
   invalidArgumentsUni.add('discontinuous function', function(){try{nestedRomberg(f)(-1, 1);} catch(e){return true;} return false;});
   invalidArgumentsUni.add('NaN threshold', function(){try{nestedRomberg(Math.exp, ak.NaN)(-1, 1);} catch(e){return true;} return false;});
   invalidArgumentsUni.add('NaN steps', function(){try{nestedRomberg(Math.exp, 0.1, ak.NaN)(-1, 1);} catch(e){return true;} return false;});
   invalidArgumentsUni.add('No steps', function(){try{nestedRomberg(Math.sin, 1e-15, 0)(8);} catch(e){return true;} return false;});
   invalidArgumentsUni.add('NaN x0', function(){try{nestedRomberg(Math.exp, 0.1)(ak.NaN, 1);} catch(e){return true;} return false;});
   invalidArgumentsUni.add('NaN x1', function(){try{nestedRomberg(Math.exp, 0.1)(1, ak.NaN);} catch(e){return true;} return false;});
   invalidArgumentsUni.add('infinite x0', function(){try{nestedRomberg(Math.exp, 0.1)(-ak.INFINITY, 0);} catch(e){return true;} return false;});
   invalidArgumentsUni.add('infinite x1', function(){try{nestedRomberg(Math.exp, 0.1)(0, ak.INFINITY);} catch(e){return true;} return false;});
  
   var oneArgumentUni = {
    name: 'oneArgumentUni',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   oneArgumentUni.add('exp', function(){return ak.diff(nestedRomberg(Math.exp)(1), Math.exp(1)-1)<1e-10;});
   oneArgumentUni.add('sin', function(){return ak.diff(nestedRomberg(Math.sin)(8), 1-Math.cos(8))<1e-10;});
   oneArgumentUni.add('cos', function(){return ak.diff(nestedRomberg(Math.cos)(8), Math.sin(8))<1e-10;});
  
   var twoArgumentsUni = {
    name: 'twoArgumentsUni',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   twoArgumentsUni.add('exp', function(){return ak.diff(nestedRomberg(Math.exp)(-1, 1), Math.exp(1)-Math.exp(-1))<1e-10;});
   twoArgumentsUni.add('sin', function(){return ak.diff(nestedRomberg(Math.sin)(-2, 4), Math.cos(-2)-Math.cos(4))<1e-10;});
   twoArgumentsUni.add('cos', function(){return ak.diff(nestedRomberg(Math.cos)(-2, 4), Math.sin(4)-Math.sin(-2))<1e-10;});
  
   var invalidArgumentsBi = {
    name: 'invalidArgumentsBi',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   invalidArgumentsBi.add('non-function', function(){try{nestedRomberg(1, 0.1)(ak.vector(2, -1), ak.vector(2, 1));} catch(e){return true;} return false;});
   invalidArgumentsBi.add('discontinuous function', function(){try{nestedRomberg(h)(ak.vector(2, -1), ak.vector(2, 1));} catch(e){return true;} return false;});
   invalidArgumentsBi.add('NaN threshold', function(){try{nestedRomberg(g, ak.NaN)(ak.vector(2, -1), ak.vector(2, 1));} catch(e){return true;} return false;});
   invalidArgumentsBi.add('NaN steps', function(){try{nestedRomberg(g, 0.1, ak.NaN)(ak.vector(2, -1), ak.vector(2, 1));} catch(e){return true;} return false;});
   invalidArgumentsBi.add('No steps', function(){try{nestedRomberg(sin, 1e-15, 0)(ak.vector(2, -8), ak.vector(2, 8));} catch(e){return true;} return false;});
   invalidArgumentsBi.add('NaN x0', function(){try{nestedRomberg(g, 0.1)(ak.vector(2, ak.NaN), ak.vector(2, 1));} catch(e){return true;} return false;});
   invalidArgumentsBi.add('NaN x1', function(){try{nestedRomberg(g, 0.1)(ak.vector(2, -1), ak.vector(2, ak.NaN));} catch(e){return true;} return false;});
   invalidArgumentsBi.add('infinite x0', function(){try{nestedRomberg(g, 0.1)(ak.vector(2, -ak.INFINITY), ak.vector(2, 1));} catch(e){return true;} return false;});
   invalidArgumentsBi.add('infinite x1', function(){try{nestedRomberg(g, 0.1)(ak.vector(2, -1), ak.vector(2, ak.INFINITY));} catch(e){return true;} return false;});
  
   var oneArgumentBi = {
    name: 'oneArgumentBi',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   oneArgumentBi.add('abs', function(){return ak.diff(nestedRomberg(g)(ak.vector(2, 1)), 2/3)<1e-10;});
  
   var twoArgumentsBi = {
    name: 'twoArgumentsBi',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   twoArgumentsBi.add('abs', function(){return ak.diff(nestedRomberg(g)(ak.vector(2, -1), ak.vector(2, 1)), 8/3)<1e-10;});
  
   var invalidArgumentsTri = {
    name: 'invalidArgumentsTri',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   invalidArgumentsTri.add('non-function', function(){try{nestedRomberg(1, 0.1)(ak.vector(3, -1), ak.vector(3, 1));} catch(e){return true;} return false;});
   invalidArgumentsTri.add('discontinuous function', function(){try{nestedRomberg(h)(ak.vector(3, -1), ak.vector(3, 1));} catch(e){return true;} return false;});
   invalidArgumentsTri.add('NaN threshold', function(){try{nestedRomberg(g, ak.NaN)(ak.vector(3, -1), ak.vector(3, 1));} catch(e){return true;} return false;});
   invalidArgumentsTri.add('NaN steps', function(){try{nestedRomberg(g, 0.1, ak.NaN)(ak.vector(3, -1), ak.vector(3, 1));} catch(e){return true;} return false;});
   invalidArgumentsTri.add('No steps', function(){try{nestedRomberg(sin, 1e-15, 0)(ak.vector(3, -8), ak.vector(3, 8));} catch(e){return true;} return false;});
   invalidArgumentsTri.add('NaN x0', function(){try{nestedRomberg(g, 0.1)(ak.vector(3, ak.NaN), ak.vector(3, 1));} catch(e){return true;} return false;});
   invalidArgumentsTri.add('NaN x1', function(){try{nestedRomberg(g, 0.1)(ak.vector(3, -1), ak.vector(3, ak.NaN));} catch(e){return true;} return false;});
   invalidArgumentsTri.add('infinite x0', function(){try{nestedRomberg(g, 0.1)(ak.vector(3, -ak.INFINITY), ak.vector(3, 1));} catch(e){return true;} return false;});
   invalidArgumentsTri.add('infinite x1', function(){try{nestedRomberg(g, 0.1)(ak.vector(3, -1), ak.vector(3, ak.INFINITY));} catch(e){return true;} return false;});
  
   var oneArgumentTri = {
    name: 'oneArgumentTri',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   oneArgumentTri.add('abs', function(){return ak.diff(nestedRomberg(g)(ak.vector(3, 1)), 1)<1e-10;});
  
   var twoArgumentsTri = {
    name: 'twoArgumentsTri',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   twoArgumentsTri.add('abs', function(){return ak.diff(nestedRomberg(g)(ak.vector(3, -1), ak.vector(3, 1)), 8)<1e-10;});
  
   nestedIntegral.add(invalidArgument);
   nestedIntegral.add(invalidArgumentsUni);
   nestedIntegral.add(oneArgumentUni);
   nestedIntegral.add(twoArgumentsUni);
   nestedIntegral.add(invalidArgumentsBi);
   nestedIntegral.add(oneArgumentBi);
   nestedIntegral.add(twoArgumentsBi);
   nestedIntegral.add(invalidArgumentsTri);
   nestedIntegral.add(oneArgumentTri);
   nestedIntegral.add(twoArgumentsTri);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   nestedIntegral.add(load);
  }

  akTest.add(nestedIntegral);
 }

 ak.using(['Calculus/NestedIntegral.js', 'Calculus/RombergIntegral.js'], define);
})();
