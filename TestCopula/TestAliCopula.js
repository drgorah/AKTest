"use strict";

(function() {
 function define() {
  var aliCopula = {
   name: 'copula.aliCopula',
   body: [],
   add: function(t) {this.body.push(t);}
  };

  try {
   var copula = ak.aliCopula(3, 0.1);
   var density = ak.aliCopulaDensity(3, 0.1);
   var rnd = ak.aliCopulaRnd(3, 0.1);

   var copulaIndependent = ak.aliCopula(3, 0);
   var densityIndependent = ak.aliCopulaDensity(3, 0);
   var rndIndependent = ak.aliCopulaRnd(3, 0);

   var copulaMiddle = ak.aliCopula(3, 1);
   var densityMiddle = ak.aliCopulaDensity(3, 1);
   var rndMiddle = ak.aliCopulaRnd(3, 1);

   var p = ak.independentCopula(3);
   var densityP = ak.independentCopulaDensity(3);

   var e = ak.claytonCopula(3, 1);
   var densityE = ak.claytonCopulaDensity(3, 1);

   var init = {
    name: 'init',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   function bad() {
    try {ak.aliCopula(); return false;} catch(e) {}
    try {ak.aliCopula('a'); return false;} catch(e) {}
    try {ak.aliCopula(1.5); return false;} catch(e) {}
    try {ak.aliCopula(ak.INFINITY); return false;} catch(e) {}
    try {ak.aliCopula(2, 'a'); return false;} catch(e) {}
    try {ak.aliCopula(2, -1.5); return false;} catch(e) {}
    try {ak.aliCopula(2,  1.5); return false;} catch(e) {}

    try {ak.aliCopulaDensity(); return false;} catch(e) {}
    try {ak.aliCopulaDensity('a'); return false;} catch(e) {}
    try {ak.aliCopulaDensity(1.5); return false;} catch(e) {}
    try {ak.aliCopulaDensity(ak.INFINITY); return false;} catch(e) {}
    try {ak.aliCopulaDensity(2, 'a'); return false;} catch(e) {}
    try {ak.aliCopulaDensity(2, -1.5); return false;} catch(e) {}
    try {ak.aliCopulaDensity(2,  1.5); return false;} catch(e) {}

    try {ak.aliCopulaRnd(); return false;} catch(e) {}
    try {ak.aliCopulaRnd('a'); return false;} catch(e) {}
    try {ak.aliCopulaRnd(1.5); return false;} catch(e) {}
    try {ak.aliCopulaRnd(ak.INFINITY); return false;} catch(e) {}
    try {ak.aliCopulaRnd(2, 'a'); return false;} catch(e) {}
    try {ak.aliCopulaRnd(2, -1.5); return false;} catch(e) {}
    try {ak.aliCopulaRnd(2,  1.5); return false;} catch(e) {}
    try {ak.aliCopulaRnd(2, 1.5, ak.INFINITY); return false;} catch(e) {}
    try {ak.aliCopulaRnd(2, 1.5, -1); return false;} catch(e) {}
    try {ak.aliCopulaRnd(2, 1.5,  1); return false;} catch(e) {}
    try {ak.aliCopulaRnd(2, 1.5,  2048.5); return false;} catch(e) {}
    try {ak.aliCopulaRnd(2, 1.5,  2048, []); return false;} catch(e) {}
    try {ak.aliCopulaRnd(2, 1.5,  2048, 1e-6, []); return false;} catch(e) {}

    return true;
   }

   init.add('bad', bad);
   init.add('copula', function(){return copula.dims()===3 && copula.theta()===0.1 && copulaIndependent.dims()===3 && copulaIndependent.theta()===0 && copulaMiddle.dims()===3 && copulaMiddle.theta()===1;});
   init.add('density', function(){return density.dims()===3 && density.theta()===0.1 && densityIndependent.dims()===3 && densityIndependent.theta()===0 && densityMiddle.dims()===3 && densityMiddle.theta()===1;});
   init.add('rnd', function(){return rnd.dims()===3 && rnd.theta()===0.1 && rnd.rnd()===Math.random && rndIndependent.dims()===3 && rndIndependent.theta()===0 && rndIndependent.rnd()===Math.random && rndMiddle.dims()===3 && rndMiddle.theta()===1 && rndMiddle.rnd()===Math.random;});

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
     if(ak.diff(f(u), g(u))>1e-12) return false;
    }
    return true;
   }

   val.add('copula versus density', function(){return compareDensity(copula, density);});
   val.add('copula versus rnd', function(){return compareRnd(copula, rnd);});
   val.add('independent copula', function(){return compareLimits(copulaIndependent, p);});
   val.add('independent density', function(){return compareLimits(densityIndependent, densityP);});
   val.add('independent versus rnd', function(){return compareRnd(copulaIndependent, rndIndependent);});
   val.add('middle copula', function(){return compareLimits(copulaMiddle, e);});
   val.add('middle density', function(){return compareLimits(densityMiddle, densityE);});
   val.add('middle versus rnd', function(){return compareRnd(copulaMiddle, rndMiddle);});

   aliCopula.add(init);
   aliCopula.add(val);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   aliCopula.add(load);
  }

  akTest.add(aliCopula);
 }

 ak.using(['Copula/AliCopula.js', 'Copula/ClaytonCopula.js', 'Distribution/MultiUniformDistribution.js', 'Calculus/QuasiRandomIntegral.js'], define);
})();