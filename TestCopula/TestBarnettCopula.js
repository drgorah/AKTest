"use strict";

(function() {
 function define() {
  var barnettCopula = {
   name: 'copula.barnettCopula',
   body: [],
   add: function(t) {this.body.push(t);}
  };

  try {
   var copula = ak.barnettCopula(3, 0.25);
   var density = ak.barnettCopulaDensity(3, 0.25);
   var rnd = ak.barnettCopulaRnd(3, 0.25);

   var copulaIndependent = ak.barnettCopula(3, 0);
   var densityIndependent = ak.barnettCopulaDensity(3, 0);
   var rndIndependent = ak.barnettCopulaRnd(3, 0);

   var p = ak.independentCopula(3);
   var densityP = ak.independentCopulaDensity(3);

   var init = {
    name: 'init',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   function bad() {
    try {ak.barnettCopula(); return false;} catch(e) {}
    try {ak.barnettCopula('a'); return false;} catch(e) {}
    try {ak.barnettCopula(1.5); return false;} catch(e) {}
    try {ak.barnettCopula(ak.INFINITY); return false;} catch(e) {}
    try {ak.barnettCopula(2, 'a'); return false;} catch(e) {}
    try {ak.barnettCopula(2, -0.5); return false;} catch(e) {}
    try {ak.barnettCopula(2,  1.5); return false;} catch(e) {}

    try {ak.barnettCopulaDensity(); return false;} catch(e) {}
    try {ak.barnettCopulaDensity('a'); return false;} catch(e) {}
    try {ak.barnettCopulaDensity(1.5); return false;} catch(e) {}
    try {ak.barnettCopulaDensity(ak.INFINITY); return false;} catch(e) {}
    try {ak.barnettCopulaDensity(2, 'a'); return false;} catch(e) {}
    try {ak.barnettCopulaDensity(2, -0.5); return false;} catch(e) {}
    try {ak.barnettCopulaDensity(2,  1.5); return false;} catch(e) {}

    try {ak.barnettCopulaRnd(); return false;} catch(e) {}
    try {ak.barnettCopulaRnd('a'); return false;} catch(e) {}
    try {ak.barnettCopulaRnd(1.5); return false;} catch(e) {}
    try {ak.barnettCopulaRnd(ak.INFINITY); return false;} catch(e) {}
    try {ak.barnettCopulaRnd(2, 'a'); return false;} catch(e) {}
    try {ak.barnettCopularnd(2, -0.5); return false;} catch(e) {}
    try {ak.barnettCopulaRnd(2,  1.5); return false;} catch(e) {}
    try {ak.barnettCopulaRnd(2, 0.5, ak.INFINITY); return false;} catch(e) {}
    try {ak.barnettCopulaRnd(2, 0.5, -1); return false;} catch(e) {}
    try {ak.barnettCopulaRnd(2, 0.5,  1); return false;} catch(e) {}
    try {ak.barnettCopulaRnd(2, 0.5,  2048.5); return false;} catch(e) {}
    try {ak.barnettCopulaRnd(2, 0.5,  2048, []); return false;} catch(e) {}
    try {ak.barnettCopulaRnd(2, 0.5,  2048, 1e-6, []); return false;} catch(e) {}

    return true;
   }

   init.add('bad', bad);
   init.add('copula', function(){return copula.dims()===3 && copula.theta()===0.25 && copulaIndependent.dims()===3 && copulaIndependent.theta()===0;});
   init.add('density', function(){return density.dims()===3 && density.theta()===0.25 && densityIndependent.dims()===3 && densityIndependent.theta()===0;});
   init.add('rnd', function(){return rnd.dims()===3 && rnd.theta()===0.25 && rnd.rnd()===Math.random && rndIndependent.dims()===3 && rndIndependent.theta()===0 && rndIndependent.rnd()===Math.random;});

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

   barnettCopula.add(init);
   barnettCopula.add(val);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   barnettCopula.add(load);
  }

  akTest.add(barnettCopula);
 }

 ak.using(['Copula/BarnettCopula.js', 'Distribution/MultiUniformDistribution.js', 'Calculus/QuasiRandomIntegral.js'], define);
})();