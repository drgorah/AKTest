"use strict";

(function() {
 function define() {
  var claytonCopula = {
   name: 'copula.claytonCopula',
   body: [],
   add: function(t) {this.body.push(t);}
  };

  try {
   var copula = ak.claytonCopula(3, -0.1);
   var density = ak.claytonCopulaDensity(3, -0.1);
   var rnd = ak.claytonCopulaRnd(3, -0.1);

   var copulaIndependent = ak.claytonCopula(3, 0);
   var densityIndependent = ak.claytonCopulaDensity(3, 0);
   var rndIndependent = ak.claytonCopulaRnd(3, 0);

   var copulaLower = ak.claytonCopula(2, -1);
   var densityLower = ak.claytonCopulaDensity(2, -1);
   var rndLower = ak.claytonCopulaRnd(2, -1);

   var copulaUpper = ak.claytonCopula(3, ak.INFINITY);
   var densityUpper = ak.claytonCopulaDensity(3, ak.INFINITY);
   var rndUpper = ak.claytonCopulaRnd(3, ak.INFINITY);

   var p = ak.independentCopula(3);
   var densityP = ak.independentCopulaDensity(3);

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
    try {ak.claytonCopula(); return false;} catch(e) {}
    try {ak.claytonCopula('a'); return false;} catch(e) {}
    try {ak.claytonCopula(1.5); return false;} catch(e) {}
    try {ak.claytonCopula(ak.INFINITY); return false;} catch(e) {}
    try {ak.claytonCopula(2, 'a'); return false;} catch(e) {}
    try {ak.claytonCopula(2, -1.5); return false;} catch(e) {}
    try {ak.claytonCopula(3, -0.75); return false;} catch(e) {}

    try {ak.claytonCopulaDensity(); return false;} catch(e) {}
    try {ak.claytonCopulaDensity('a'); return false;} catch(e) {}
    try {ak.claytonCopulaDensity(1.5); return false;} catch(e) {}
    try {ak.claytonCopulaDensity(ak.INFINITY); return false;} catch(e) {}
    try {ak.claytonCopulaDensity(2, 'a'); return false;} catch(e) {}
    try {ak.claytonCopulaDensity(2, -1.5); return false;} catch(e) {}
    try {ak.claytonCopulaDensity(3, -0.75); return false;} catch(e) {}

    try {ak.claytonCopulaRnd(); return false;} catch(e) {}
    try {ak.claytonCopulaRnd('a'); return false;} catch(e) {}
    try {ak.claytonCopulaRnd(1.5); return false;} catch(e) {}
    try {ak.claytonCopulaRnd(ak.INFINITY); return false;} catch(e) {}
    try {ak.claytonCopulaRnd(2, 'a'); return false;} catch(e) {}
    try {ak.claytonCopulaRnd(2, -1.5); return false;} catch(e) {}
    try {ak.claytonCopulaRnd(3, -0.75); return false;} catch(e) {}
    try {ak.claytonCopulaRnd(2, 1.5, ak.INFINITY); return false;} catch(e) {}
    try {ak.claytonCopulaRnd(2, 1.5, -1); return false;} catch(e) {}
    try {ak.claytonCopulaRnd(2, 1.5,  1); return false;} catch(e) {}
    try {ak.claytonCopulaRnd(2, 1.5,  2048.5); return false;} catch(e) {}
    try {ak.claytonCopulaRnd(2, 1.5,  2048, []); return false;} catch(e) {}
    try {ak.claytonCopulaRnd(2, 1.5,  2048, 1e-6, []); return false;} catch(e) {}

    return true;
   }

   init.add('bad', bad);
   init.add('copula', function(){return copula.dims()===3 && copula.theta()===-0.1 && copulaIndependent.dims()===3 && copulaIndependent.theta()===0 && copulaLower.dims()===2 && copulaLower.theta()===-1 && copulaUpper.dims()===3 && copulaUpper.theta()===ak.INFINITY;});
   init.add('density', function(){return density.dims()===3 && density.theta()===-0.1 && densityIndependent.dims()===3 && densityIndependent.theta()===0 && densityLower.dims()===2 && densityLower.theta()===-1 && densityUpper.dims()===3 && densityUpper.theta()===ak.INFINITY;});
   init.add('rnd', function(){return rnd.dims()===3 && rnd.theta()===-0.1 && rnd.rnd()===Math.random && rndIndependent.dims()===3 && rndIndependent.theta()===0 && rndIndependent.rnd()===Math.random && rndLower.dims()===2 && rndLower.theta()===-1 && rndLower.rnd()===Math.random && rndUpper.dims()===3 && rndUpper.theta()===ak.INFINITY && rndUpper.rnd()===Math.random;});

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
   val.add('lower copula', function(){return compareLimits(copulaLower, w);});
   val.add('lower density', function(){return compareLimits(densityLower, densityW);});
   val.add('lower versus rnd', function(){return compareRnd(copulaLower, rndLower);});
   val.add('upper copula', function(){return compareLimits(copulaUpper, m);});
   val.add('upper density', function(){return compareLimits(densityUpper, densityM);});
   val.add('upper versus rnd', function(){return compareRnd(copulaUpper, rndUpper);});

   claytonCopula.add(init);
   claytonCopula.add(val);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   claytonCopula.add(load);
  }

  akTest.add(claytonCopula);
 }

 ak.using(['Copula/ClaytonCopula.js', 'Distribution/MultiUniformDistribution.js', 'Calculus/QuasiRandomIntegral.js'], define);
})();