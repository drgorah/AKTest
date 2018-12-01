"use strict";

(function() {
 function define() {
  var archimedeanCopula = {
   name: 'copula.archimedeanCopula',
   body: [],
   add: function(t) {this.body.push(t);}
  };

  try {
   var theta = 1.1;
   function p(u) {return Math.pow(-Math.log(u), theta);}
   function dp(u) {return -theta*Math.pow(-Math.log(u), theta-1)/u;}
   function q(t) {return Math.exp(-Math.pow(t, 1/theta));}
   function dnq1(t,n) {return ak.exp(ak.neg(ak.pow(ak.surreal(n, t, 1), 1/theta)));}
   function dnq2(t,n) {return dnq1(t,n).deriv(n);}

   var n = 3;
   var copula = ak.archimedeanCopula(n, p, q);
   var density1 = ak.archimedeanCopulaDensity(n, p, dp, dnq1);
   var rnd1 = ak.archimedeanCopulaRnd(n, p, q, dnq1);
   var density2 = ak.archimedeanCopulaDensity(n, p, dp, dnq2);
   var rnd2 = ak.archimedeanCopulaRnd(n, p, q, dnq2);

   var init = {
    name: 'init',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   function bad() {
    try {ak.archimedeanCopula(); return false;} catch(e) {}
    try {ak.archimedeanCopula('a'); return false;} catch(e) {}
    try {ak.archimedeanCopula(1.5); return false;} catch(e) {}
    try {ak.archimedeanCopula(ak.INFINITY); return false;} catch(e) {}
    try {ak.archimedeanCopula(2, 1); return false;} catch(e) {}
    try {ak.archimedeanCopula(2, p); return false;} catch(e) {}
    try {ak.archimedeanCopula(2, p, 1); return false;} catch(e) {}
    try {ak.archimedeanCopula(2, 1, q); return false;} catch(e) {}

    try {ak.archimedeanCopulaDensity(); return false;} catch(e) {}
    try {ak.archimedeanCopulaDensity('a'); return false;} catch(e) {}
    try {ak.archimedeanCopulaDensity(1.5); return false;} catch(e) {}
    try {ak.archimedeanCopulaDensity(ak.INFINITY); return false;} catch(e) {}
    try {ak.archimedeanCopulaDensity(2, 1); return false;} catch(e) {}
    try {ak.archimedeanCopulaDensity(2, p); return false;} catch(e) {}
    try {ak.archimedeanCopulaDensity(2, p, 1); return false;} catch(e) {}
    try {ak.archimedeanCopulaDensity(2, p, dp); return false;} catch(e) {}
    try {ak.archimedeanCopulaDensity(2, p, dp, 1); return false;} catch(e) {}

    try {ak.archimedeanCopulaRnd(); return false;} catch(e) {}
    try {ak.archimedeanCopulaRnd('a'); return false;} catch(e) {}
    try {ak.archimedeanCopulaRnd(1.5); return false;} catch(e) {}
    try {ak.archimedeanCopulaRnd(ak.INFINITY); return false;} catch(e) {}
    try {ak.archimedeanCopulaRnd(2, p); return false;} catch(e) {}
    try {ak.archimedeanCopulaRnd(2, p, q, 1); return false;} catch(e) {}
    try {ak.archimedeanCopulaRnd(2, p, q, dnq, []); return false;} catch(e) {}
    try {ak.archimedeanCopulaRnd(2, p, q, dnq, ak.INFINITY); return false;} catch(e) {}
    try {ak.archimedeanCopulaRnd(2, p, q, dnq, -1); return false;} catch(e) {}
    try {ak.archimedeanCopulaRnd(2, p, q, dnq,  1); return false;} catch(e) {}
    try {ak.archimedeanCopulaRnd(2, p, q, dnq,  2048.5); return false;} catch(e) {}
    try {ak.archimedeanCopulaRnd(2, p, q, dnq,  2048, []); return false;} catch(e) {}
    try {ak.archimedeanCopulaRnd(2, p, q, dnq,  2048, 1e-6, []); return false;} catch(e) {}

    return true;
   }

   init.add('bad', bad);
   init.add('copula', function(){return copula.dims()===n && copula.p()===p && copula.q()===q;});
   init.add('density', function(){return density1.dims()===n && density1.p()===p && density1.dp()===dp && density1.dnq()===dnq1 && density2.dims()===n && density2.p()===p && density2.dp()===dp && density2.dnq()===dnq2;});
   init.add('rnd', function(){return rnd1.dims()===n && rnd1.p()===p && rnd1.q()===q && rnd1.dnq()===dnq1 && rnd1.rnd()===Math.random && rnd2.dims()===n && rnd2.p()===p && rnd2.q()===q && rnd2.dnq()===dnq2 && rnd2.rnd()===Math.random;});

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

   val.add('copula versus density 1', function(){return compareDensity(copula, density1);});
   val.add('copula versus density 2', function(){return compareDensity(copula, density2);});
   val.add('copula versus rnd 1', function(){return compareRnd(copula, rnd1);});
   val.add('copula versus rnd 2', function(){return compareRnd(copula, rnd2);});

   archimedeanCopula.add(init);
   archimedeanCopula.add(val);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   archimedeanCopula.add(load);
  }

  akTest.add(archimedeanCopula);
 }

 ak.using(['Copula/ArchimedeanCopula.js', 'Distribution/MultiUniformDistribution.js', 'Calculus/QuasiRandomIntegral.js', 'Calculus/Surreal.js'], define);
})();