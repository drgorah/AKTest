"use strict";

(function() {
 function define() {
  var sampleMarginals = {
   name: 'copula.sampleMarginals',
   body: [],
   add: function(t) {this.body.push(t);}
  };

  try {
   var args = {
    name: 'arguments',
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

   function bad() {
    try {ak.sampleMarginals(); return false;} catch(e) {}
    try {ak.sampleMarginals('a'); return false;} catch(e) {}
    try {ak.sampleMarginals([]); return false;} catch(e) {}
    try {ak.sampleMarginals(['a', 'b']); return false;} catch(e) {}
    try {ak.sampleMarginals([ak.vector([]), ak.vector([0, 0])]); return false;} catch(e) {}
    try {ak.sampleMarginals([ak.vector([0, 0]), ak.vector([])]); return false;} catch(e) {}
    try {ak.sampleMarginals([ak.vector([0, 0]), ak.vector([0, 0, 0])]); return false;} catch(e) {}
    try {ak.sampleMarginals([ak.vector([0, 0]), ak.vector([0, ak.NaN])]); return false;} catch(e) {}

    return true;
   }

   function good() {
    var marginal = new Array(n);
    var m = marginals.length;
    var i, j;

    for(j=0;j<m;++j) {
     for(i=0;i<n;++i) marginal[i] = samples[i].at(j);
     marginal.sort(ak.numberCompare);
     for(i=0;i<m;++i) if(marginals[j][i]!==marginal[i]) return false;
    }
    return true;
   }

   args.add('bad', bad);
   args.add('good', good);

   sampleMarginals.add(args);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   sampleMarginals.add(load);
  }

  akTest.add(sampleMarginals);
 }

 ak.using(['Copula/SampleMarginals.js', 'Distribution/MultiNormalDistribution.js'], define);
})();