"use strict";

(function() {
 function define() {
  var independentCopula = {
   name: 'copula.independentCopula',
   body: [],
   add: function(t) {this.body.push(t);}
  };

  try {
   var n = 3;
   var copula = ak.independentCopula(n);
   var density = ak.independentCopulaDensity(n);
   var rnd = ak.independentCopulaRnd(n);

   var init = {
    name: 'init',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   function bad() {
    try {ak.independentCopula(); return false;} catch(e) {}
    try {ak.independentCopula('a'); return false;} catch(e) {}
    try {ak.independentCopula(1.5); return false;} catch(e) {}
    try {ak.independentCopula(ak.INFINITY); return false;} catch(e) {}

    try {ak.independentCopulaDensity(); return false;} catch(e) {}
    try {ak.independentCopulaDensity('a'); return false;} catch(e) {}
    try {ak.independentCopulaDensity(1.5); return false;} catch(e) {}
    try {ak.independentCopulaDensity(ak.INFINITY); return false;} catch(e) {}

    try {ak.independentCopulaRnd(); return false;} catch(e) {}
    try {ak.independentCopulaRnd('a'); return false;} catch(e) {}
    try {ak.independentCopulaRnd(1.5); return false;} catch(e) {}
    try {ak.independentCopulaRnd(ak.INFINITY); return false;} catch(e) {}
    try {ak.independentCopulaRnd(2, 'a'); return false;} catch(e) {}

    return true;
   }

   init.add('bad', bad);
   init.add('copula', function(){return copula.dims()===n;});
   init.add('density', function(){return density.dims()===n;});
   init.add('rnd', function(){return rnd.dims()===n && rnd.rnd()===Math.random;});

   var val = {
    name: 'val',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   function compareDensity(copula, density) {
    var tests = 10;
    var urnd = ak.multiUniformRnd(n, 0.1, 0.9);
    var zero = ak.vector(n, 0);
    var integral = ak.quasiRandomIntegral(density);
    var u;

    while(tests-->0) {
     u = urnd();
     if(ak.diff(copula(u), integral(zero, u))>5e-4) return false;
    }
    return true;
   }

   function compareRnd(copula, rnd) {
    var tests = 10;
    var samples = 100000;
    var urnd = ak.multiUniformRnd(n, 0.1, 0.9);
    var u, count, sample, x, i;

    while(tests-->0) {
     u = urnd();
     count = 0;
     for(sample=0;sample<samples;++sample) {
      x = rnd();
      i = 0;
      while(i<n && x.at(i)<=u.at(i)) ++i;
      if(i===n) ++count;
     }
     if(ak.diff(count/samples, copula(u))>5e-2) return false;
    }
    return true;
   }

   val.add('copula versus density', function(){return compareDensity(copula, density);});
   val.add('copula versus rnd', function(){return compareRnd(copula, rnd);});

   independentCopula.add(init);
   independentCopula.add(val);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   independentCopula.add(load);
  }

  akTest.add(independentCopula);
 }

 ak.using(['Copula/IndependentCopula.js', 'Distribution/MultiUniformDistribution.js', 'Calculus/QuasiRandomIntegral.js', 'Calculus/Surreal.js'], define);
})();