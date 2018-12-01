"use strict";

(function() {
 function define() {
  var genestCopula = {
   name: 'copula.genestCopula',
   body: [],
   add: function(t) {this.body.push(t);}
  };

  try {
   var copula = ak.genestCopula(3, 4.5);
   var density = ak.genestCopulaDensity(3, 4.5);
   var rnd = ak.genestCopulaRnd(3, 4.5);

   var copulaLower = ak.genestCopula(2, 1);
   var densityLower = ak.genestCopulaDensity(2, 1);
   var rndLower = ak.genestCopulaRnd(2, 1);

   var copulaUpper = ak.genestCopula(3, ak.INFINITY);
   var densityUpper = ak.genestCopulaDensity(3, ak.INFINITY);
   var rndUpper = ak.genestCopulaRnd(3, ak.INFINITY);

   var w = ak.lowerCopula(2);
   var densityW = ak.lowerCopulaDensity(2);

   var m = ak.upperCopula(3);
   var densityM = ak.upperCopulaDensity(3);

   var init = {
    name: 'init',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   function bad() {
    try {ak.genestCopula(); return false;} catch(e) {}
    try {ak.genestCopula('a'); return false;} catch(e) {}
    try {ak.genestCopula(1.5); return false;} catch(e) {}
    try {ak.genestCopula(ak.INFINITY); return false;} catch(e) {}
    try {ak.genestCopula(2, 'a'); return false;} catch(e) {}
    try {ak.genestCopula(2, 0.5); return false;} catch(e) {}
    try {ak.genestCopula(3, 1.5); return false;} catch(e) {}

    try {ak.genestCopulaDensity(); return false;} catch(e) {}
    try {ak.genestCopulaDensity('a'); return false;} catch(e) {}
    try {ak.genestCopulaDensity(1.5); return false;} catch(e) {}
    try {ak.genestCopulaDensity(ak.INFINITY); return false;} catch(e) {}
    try {ak.genestCopulaDensity(2, 'a'); return false;} catch(e) {}
    try {ak.genestCopulaDensity(2, 0.5); return false;} catch(e) {}
    try {ak.genestCopulaDensity(3, 1.5); return false;} catch(e) {}

    try {ak.genestCopulaRnd(); return false;} catch(e) {}
    try {ak.genestCopulaRnd('a'); return false;} catch(e) {}
    try {ak.genestCopulaRnd(1.5); return false;} catch(e) {}
    try {ak.genestCopulaRnd(ak.INFINITY); return false;} catch(e) {}
    try {ak.genestCopulaRnd(2, 'a'); return false;} catch(e) {}
    try {ak.genestCopulaRnd(2, 0.5); return false;} catch(e) {}
    try {ak.genestCopulaRnd(3, 1.5); return false;} catch(e) {}
    try {ak.genestCopulaRnd(2, 1.5, ak.INFINITY); return false;} catch(e) {}
    try {ak.genestCopulaRnd(2, 1.5, -1); return false;} catch(e) {}
    try {ak.genestCopulaRnd(2, 1.5,  1); return false;} catch(e) {}
    try {ak.genestCopulaRnd(2, 1.5,  2048.5); return false;} catch(e) {}
    try {ak.genestCopulaRnd(2, 1.5,  2048, []); return false;} catch(e) {}
    try {ak.genestCopulaRnd(2, 1.5,  2048, 1e-6, []); return false;} catch(e) {}

    return true;
   }

   init.add('bad', bad);
   init.add('copula', function(){return copula.dims()===3 && copula.theta()===4.5 && copulaLower.dims()===2 && copulaLower.theta()===1 && copulaUpper.dims()===3 && copulaUpper.theta()===ak.INFINITY;});
   init.add('density', function(){return density.dims()===3 && density.theta()===4.5 && densityLower.dims()===2 && densityLower.theta()===1 && densityUpper.dims()===3 && densityUpper.theta()===ak.INFINITY;});
   init.add('rnd', function(){return rnd.dims()===3 && rnd.theta()===4.5 && rnd.rnd()===Math.random && rndLower.dims()===2 && rndLower.theta()===1 && rndLower.rnd()===Math.random && rndUpper.dims()===3 && rndUpper.theta()===ak.INFINITY && rndUpper.rnd()===Math.random;});

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
    var integral = ak.quasiRandomIntegral(density, Math.pow(2, -9));
    var u;

    while(tests-->0) {
     u = urnd();
     if(ak.diff(copula(u), integral(zero, u))>1.5e-2) return false;
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
   val.add('lower copula', function(){return compareLimits(copulaLower, w);});
   val.add('lower density', function(){return compareLimits(densityLower, densityW);});
   val.add('lower versus rnd', function(){return compareRnd(copulaLower, rndLower);});
   val.add('upper copula', function(){return compareLimits(copulaUpper, m);});
   val.add('upper density', function(){return compareLimits(densityUpper, densityM);});
   val.add('upper versus rnd', function(){return compareRnd(copulaUpper, rndUpper);});

   genestCopula.add(init);
   genestCopula.add(val);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   genestCopula.add(load);
  }

  akTest.add(genestCopula);
 }

 ak.using(['Copula/GenestCopula.js', 'Distribution/MultiUniformDistribution.js', 'Calculus/QuasiRandomIntegral.js'], define);
})();