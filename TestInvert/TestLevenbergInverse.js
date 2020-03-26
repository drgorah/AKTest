"use strict";

(function() {
 function define() {
  var levenbergInverse = {
   name: 'invert.levenbergInverse',
   body: [],
   add: function(t) {this.body.push(t);}
  };

  try {
   function invalid() {
    try {ak.levenbergInverse(); return false;} catch(e) {}
    try {ak.levenbergInverse('a'); return false;} catch(e) {}
    try {ak.levenbergInverse(function(){}, 'a'); return false;} catch(e) {}
    try {ak.levenbergInverse(function(){}, function(){}, 'a'); return false;} catch(e) {}
    try {ak.levenbergInverse(function(){}, function(){}, 0); return false;} catch(e) {}
    try {ak.levenbergInverse(function(){}, function(){}, ak.INFINITY); return false;} catch(e) {}
    try {ak.levenbergInverse(function(){}, function(){}, 0.01, 'a'); return false;} catch(e) {}
    try {ak.levenbergInverse(function(){}, function(){}, 0.01, 0); return false;} catch(e) {}
    try {ak.levenbergInverse(function(){}, function(){}, 0.01, 2); return false;} catch(e) {}
    try {ak.levenbergInverse(function(){}, function(){}, 0.01, 0.1, 'a'); return false;} catch(e) {}
    try {ak.levenbergInverse(function(){}, function(){}, 0.01, 0.1, 0.5); return false;} catch(e) {}
    try {ak.levenbergInverse(function(){}, function(){}, 0.01, 0.1, ak.INFINITY); return false;} catch(e) {}
    try {ak.levenbergInverse(function(){}, function(){}, 0.01, 0.1, 2, 'a'); return false;} catch(e) {}
    try {ak.levenbergInverse(function(){}, function(){}, 0.01, 0.1, 2, 1e-7, 'a'); return false;} catch(e) {}
    return true;
   }

   var init = {
    name: 'init',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   init.add('invalid', invalid);

   var evaluate = {
    name: 'eval',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   function rndScalar() {
    return Math.random()*2-1;
   }

   function rndVector() {
    var x0 = Math.random()*2-1;
    var x1 = Math.random()*2-1;
    return ak.vector([x0,x1]);
   }

   function rndMatrix() {
    var a = Math.random()*2-1;
    var b = Math.random()*2-1;
    var c = Math.random()*2-1;
    var d = Math.random()*2-1;
    return ak.matrix([[a,b],[c,d]]);
   }

   function scalarLinear() {
    var a = rndVector();
    var b = rndScalar();
    var x0 = rndVector();

    function f(x)  {return ak.mul(a, x) + b;}
    function df(x) {return a;}

    var inv = ak.levenbergInverse(f, df, 0.1, 0.1, 2);
    var x1 = inv(b, x0);
    var y1 = f(x1);
    return ak.diff(y1, b)<1e-7;
   }

   function vectorLinear() {
    var a = rndMatrix();
    var b = rndVector();
    var x0 = rndVector();

    function f(x)  {return ak.add(ak.mul(a, x), b);}
    function df(x) {return a;}

    var inv = ak.levenbergInverse(f, df, 0.1, 0.1, 2);
    var x1 = inv(b, x0);
    var y1 = f(x1);
    return ak.diff(y1, b)<1e-7;
   }

   function scalarQuadratic() {
    var a = rndMatrix();
    var b = rndVector();
    var c = rndScalar();
    var x0 = rndVector();

    function f(x) {return ak.add(ak.add(ak.mul(x, ak.mul(a, x)), ak.mul(b, x)), c);}
    function df(x) {return ak.add(ak.mul(a, x), b);}

    var inv = ak.levenbergInverse(f, df, 0.1, 0.1, 2);
    var x1 = inv(c, x0);
    var y1 = f(x1);
    return ak.diff(y1, c)<1e-7;
   }

   function vectorQuadratic() {
    var a0 = rndMatrix();
    var b0 = rndVector();
    var c0 = rndScalar();
    var a1 = rndMatrix();
    var b1 = rndVector();
    var c1 = rndScalar();
    var x0 = rndVector();
    var c = ak.vector([c0, c1]);

    function f(x) {
     var f0 = ak.add(ak.add(ak.mul(x, ak.mul(a0, x)), ak.mul(b0, x)), c0);
     var f1 = ak.add(ak.add(ak.mul(x, ak.mul(a1, x)), ak.mul(b1, x)), c1);
     return ak.vector([f0,f1]);
    }

    function df(x) {
     var df0 = ak.add(ak.mul(a0, x), b0);
     var df1 = ak.add(ak.mul(a1, x), b1);
     return ak.matrix([df0.toArray(), df1.toArray()]);
    }

    var inv = ak.levenbergInverse(f, df, 0.1, 0.1, 2);
    var x1 = inv(c, x0);
    var y1 = f(x1);
    return ak.diff(y1, c)<1e-7;
   }

   evaluate.add('scalar linear', scalarLinear);
   evaluate.add('vector linear', vectorLinear);
   evaluate.add('scalar quadratic', scalarQuadratic);
   evaluate.add('vector quadratic', vectorQuadratic);

   levenbergInverse.add(init);
   levenbergInverse.add(evaluate);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   levenbergInverse.add(load);
  }

  akTest.add(levenbergInverse);
 }

 ak.using('Invert/LevenbergInverse.js', define);

})();
