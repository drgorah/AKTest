"use strict";

(function() {
 function define() {
  var gumbelCopula = {
   name: 'copula.gumbelCopula',
   body: [],
   add: function(t) {this.body.push(t);}
  };

  try {
   var copula = ak.gumbelCopula(3, 1.1);
   var density = ak.gumbelCopulaDensity(3, 1.1);
   var rnd = ak.gumbelCopulaRnd(3, 1.1);

   var copulaIndependent = ak.gumbelCopula(3, 1);
   var densityIndependent = ak.gumbelCopulaDensity(3, 1);
   var rndIndependent = ak.gumbelCopulaRnd(3, 1);

   var copulaUpper = ak.gumbelCopula(3, ak.INFINITY);
   var densityUpper = ak.gumbelCopulaDensity(3, ak.INFINITY);
   var rndUpper = ak.gumbelCopulaRnd(3, ak.INFINITY);

   var p = ak.independentCopula(3);
   var densityP = ak.independentCopulaDensity(3);

   var m = ak.upperCopula(3);
   var densityM = ak.upperCopulaDensity(3);

   var init = {
    name: 'init',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   function bad() {
    try {ak.gumbelCopula(); return false;} catch(e) {}
    try {ak.gumbelCopula('a'); return false;} catch(e) {}
    try {ak.gumbelCopula(1.5); return false;} catch(e) {}
    try {ak.gumbelCopula(ak.INFINITY); return false;} catch(e) {}
    try {ak.gumbelCopula(2, 'a'); return false;} catch(e) {}
    try {ak.gumbelCopula(2, 0.5); return false;} catch(e) {}

    try {ak.gumbelCopulaDensity(); return false;} catch(e) {}
    try {ak.gumbelCopulaDensity('a'); return false;} catch(e) {}
    try {ak.gumbelCopulaDensity(1.5); return false;} catch(e) {}
    try {ak.gumbelCopulaDensity(ak.INFINITY); return false;} catch(e) {}
    try {ak.gumbelCopulaDensity(2, 'a'); return false;} catch(e) {}
    try {ak.gumbelCopulaDensity(2, 0.5); return false;} catch(e) {}

    try {ak.gumbelCopulaRnd(); return false;} catch(e) {}
    try {ak.gumbelCopulaRnd('a'); return false;} catch(e) {}
    try {ak.gumbelCopulaRnd(1.5); return false;} catch(e) {}
    try {ak.gumbelCopulaRnd(ak.INFINITY); return false;} catch(e) {}
    try {ak.gumbelCopulaRnd(2, 'a'); return false;} catch(e) {}
    try {ak.gumbelCopulaRnd(2, 0.5); return false;} catch(e) {}
    try {ak.gumbelCopulaRnd(2, 1.5, ak.INFINITY); return false;} catch(e) {}
    try {ak.gumbelCopulaRnd(2, 1.5, -1); return false;} catch(e) {}
    try {ak.gumbelCopulaRnd(2, 1.5,  1); return false;} catch(e) {}
    try {ak.gumbelCopulaRnd(2, 1.5,  2048.5); return false;} catch(e) {}
    try {ak.gumbelCopulaRnd(2, 1.5,  2048, []); return false;} catch(e) {}
    try {ak.gumbelCopulaRnd(2, 1.5,  2048, 1e-6, []); return false;} catch(e) {}

    return true;
   }

   init.add('bad', bad);
   init.add('copula', function(){return copula.dims()===3 && copula.theta()===1.1 && copulaIndependent.dims()===3 && copulaIndependent.theta()===1 && copulaUpper.dims()===3 && copulaUpper.theta()===ak.INFINITY;});
   init.add('density', function(){return density.dims()===3 && density.theta()===1.1 && densityIndependent.dims()===3 && densityIndependent.theta()===1 && densityUpper.dims()===3 && densityUpper.theta()===ak.INFINITY;});
   init.add('rnd', function(){return rnd.dims()===3 && rnd.theta()===1.1 && rnd.rnd()===Math.random && rndIndependent.dims()===3 && rndIndependent.theta()===1 && rndIndependent.rnd()===Math.random && rndUpper.dims()===3 && rndUpper.theta()===ak.INFINITY && rndUpper.rnd()===Math.random;});

   var val = {
    name: 'val',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   function compareDensity(copula, density) {
    var n = copula.dims();
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
    var n = copula.dims();
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

   function compareLimits(f, g) {
    var n = f.dims();
    var samples = 100000;
    var urnd = ak.multiUniformRnd(n, 0.1, 0.9);
    var sample, u;

    for(sample=0;sample<samples;++sample) {
     u = urnd();
     if(f(u)!==g(u)) return false;
    }
    return true;
   }

   val.add('copula versus density', function(){return compareDensity(copula, density);});
   val.add('copula versus rnd', function(){return compareRnd(copula, rnd);});
   val.add('independent copula', function(){return compareLimits(copulaIndependent, p);});
   val.add('independent density', function(){return compareLimits(densityIndependent, densityP);});
   val.add('independent versus rnd', function(){return compareRnd(copulaIndependent, rndIndependent);});
   val.add('upper copula', function(){return compareLimits(copulaUpper, m);});
   val.add('upper density', function(){return compareLimits(densityUpper, densityM);});
   val.add('upper versus rnd', function(){return compareRnd(copulaUpper, rndUpper);});

   gumbelCopula.add(init);
   gumbelCopula.add(val);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   gumbelCopula.add(load);
  }

  akTest.add(gumbelCopula);
 }

 ak.using(['Copula/GumbelCopula.js', 'Distribution/MultiUniformDistribution.js', 'Calculus/QuasiRandomIntegral.js'], define);
})();