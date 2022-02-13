"use strict";

(function() {
 function define() {
  var sampleCopula = {
   name: 'copula.sampleCopula',
   body: [],
   add: function(t) {this.body.push(t);}
  };

  try {
   var init = {
    name: 'init',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   var root = ak.matrix([[0.5, 0, 0], [-0.2, 0.3, 0], [0.1, -0.3, 0.2]]);
   var sigma = ak.mul(root, ak.transpose(root));
   var mu = ak.vector([-0.5, 0.25, 0.5]);
   var rnd = ak.multiNormalRnd(mu, sigma);
   var n = 100;
   var samples = new Array(n);
   var i;

   for(i=0;i<n;++i) samples[i] = rnd();

   var marginals = ak.sampleMarginals(samples);
   var copula = ak.sampleCopula(samples);
   var rnd = ak.sampleCopulaRnd(samples);

   function bad() {
    try {ak.sampleCopula(); return false;} catch(e) {}
    try {ak.sampleCopula('a'); return false;} catch(e) {}
    try {ak.sampleCopula([]); return false;} catch(e) {}
    try {ak.sampleCopula(['a', 'b']); return false;} catch(e) {}
    try {ak.sampleCopula([ak.vector([]), ak.vector([0, 0])]); return false;} catch(e) {}
    try {ak.sampleCopula([ak.vector([0, 0]), ak.vector([])]); return false;} catch(e) {}
    try {ak.sampleCopula([ak.vector([0, 0]), ak.vector([0, 0, 0])]); return false;} catch(e) {}
    try {ak.sampleCopula([ak.vector([0, 0]), ak.vector([0, ak.NaN])]); return false;} catch(e) {}

    try {ak.sampleCopulaRnd(); return false;} catch(e) {}
    try {ak.sampleCopulaRnd('a'); return false;} catch(e) {}
    try {ak.sampleCopulaRnd([]); return false;} catch(e) {}
    try {ak.sampleCopulaRnd(['a', 'b']); return false;} catch(e) {}
    try {ak.sampleCopulaRnd([ak.vector([]), ak.vector([0, 0])]); return false;} catch(e) {}
    try {ak.sampleCopulaRnd([ak.vector([0, 0]), ak.vector([])]); return false;} catch(e) {}
    try {ak.sampleCopulaRnd([ak.vector([0, 0]), ak.vector([0, 0, 0])]); return false;} catch(e) {}
    try {ak.sampleCopulaRnd([ak.vector([0, 0]), ak.vector([0, ak.NaN])]); return false;} catch(e) {}
    try {ak.sampleCopulaRnd(samples, 'a'); return false;} catch(e) {}

    return true;
   }

   function compareSamples(cSamples) {
    var i;

    if(cSamples.length!==n) return false;

    for(i=0;i<n;++i) if(ak.ne(cSamples[i], samples[i])) return false;
    return true;
   }

   init.add('bad', bad);
   init.add('copula', function(){return compareSamples(copula.samples());});
   init.add('rnd', function(){return compareSamples(rnd.samples()) && rnd.rnd()===Math.random;});

   var val = {
    name: 'val',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   function countMarginals(ui, uj, uk) {
    var count = 0;
    var s, i, j, k;

    if(ui<0 || uj<0 || uk<0) return 0;

    for(s=0;s<n;++s) {
     i = Math.min(ak.floor(ui*n), n-1);
     j = Math.min(ak.floor(uj*n), n-1);
     k = Math.min(ak.floor(uk*n), n-1);

     if(samples[s].at(0)<=marginals[0][i] && samples[s].at(1)<=marginals[1][j] && samples[s].at(2)<=marginals[2][k]) ++count;
    }
    return count;
   }

   function testCopula() {
    var i, j, k, ui, uj, uk, u, v;
    for(i=0;i<=n;i+=5) {
     ui = i/n;
     for(j=0;j<=n;j+=5) {
      uj = j/n;
      for(k=0;k<=n;k+=5) {
       uk = k/n;
       u = copula(ak.vector([ui, uj, uk]));
       v = countMarginals(ui, uj, uk)/n;
       if(u!==v) return false;
      }
     }
    }
    return true;
   }

   function testRnd() {
    var tests = 10;
    var samples = 100000;
    var u0, u1, u2, n0, n1, n2, sample, x, i;

    while(tests-->0) {
     u0 = Math.random();
     u1 = Math.random();
     u2 = Math.random();
     n0 = n1 = n2 = 0;
     for(sample=0;sample<samples;++sample) {
      x = rnd();
      if(x.dims()!==3) return false;
      if(x.at(0)<=u0) ++n0;
      if(x.at(1)<=u1) ++n1;
      if(x.at(2)<=u2) ++n2;
     }
     if(ak.diff(n0/samples, u0)>5e-2) return false;
     if(ak.diff(n1/samples, u1)>5e-2) return false;
     if(ak.diff(n2/samples, u2)>5e-2) return false;
    }
    return true;
   }

   function compareRnd() {
    var tests = 10;
    var samples = 100000;
    var m = mu.dims();
    var urnd = ak.multiUniformRnd(m, 0.1, 0.9);
    var u, count, sample, x, i;

    while(tests-->0) {
     u = urnd();
     count = 0;
     for(sample=0;sample<samples;++sample) {
      x = rnd();
      i = 0;
      while(i<m && x.at(i)<=u.at(i)) ++i;
      if(i===m) ++count;
     }
     if(ak.diff(count/samples, copula(u))>5e-2) return false;
    }
    return true;
   }

   val.add('copula', testCopula);
   val.add('rnd', testRnd);
   val.add('copula versus rnd', compareRnd);

   sampleCopula.add(init);
   sampleCopula.add(val);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   sampleCopula.add(load);
  }

  akTest.add(sampleCopula);
 }

 ak.using(['Copula/SampleCopula.js', 'Distribution/MultiNormalDistribution.js', 'Distribution/MultiUniformDistribution.js'], define);
})();