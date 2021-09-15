"use strict";

(function() {
 function define() {
  var nodeMarginals = {
   name: 'approx.nodeMarginals',
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
   var phi = ak.multiNormalRnd(mu, sigma);
   var u = ak.uniformRnd(-1, 1);
   var n = 100;
   var nodes = new Array(n);
   var i;

   for(i=0;i<n;++i) nodes[i] = {x: phi(), y: u()};

   var marginals = ak.nodeMarginals(nodes);

   function bad() {
    try {ak.nodeMarginals(); return false;} catch(e) {}
    try {ak.nodeMarginals('a', [0, 1]); return false;} catch(e) {}
    try {ak.nodeMarginals([], [0, 1]); return false;} catch(e) {}
    try {ak.nodeMarginals(['a', 'b'], [0, 1]); return false;} catch(e) {}
    try {ak.nodeMarginals([ak.vector([]), ak.vector([0, 0])], [0, 1]); return false;} catch(e) {}
    try {ak.nodeMarginals([ak.vector([0, 0]), ak.vector([])], [0, 1]); return false;} catch(e) {}
    try {ak.nodeMarginals([ak.vector([0, 0]), ak.vector([0, 0, 0])], [0, 1]); return false;} catch(e) {}
    try {ak.nodeMarginals([ak.vector([0, 0]), ak.vector([0, ak.NaN])], [0, 1]); return false;} catch(e) {}
    try {ak.nodeMarginals([ak.vector([0, 0]), ak.vector([0, 1])], 'a'); return false;} catch(e) {}
    try {ak.nodeMarginals([ak.vector([0, 0]), ak.vector([0, 1])], [0]); return false;} catch(e) {}
    try {ak.nodeMarginals([{x: 'a', y: 1}]); return false;} catch(e) {}
    try {ak.nodeMarginals([{x: [], y: 1}]); return false;} catch(e) {}
    try {ak.nodeMarginals([{x: ak.vector([0, 0]), y: 0}, {x: ak.vector([0, ak.NaN]), y: 1}]); return false;} catch(e) {}
    try {ak.nodeMarginals([{x: ak.vector([0, 0, 0]), y: 0}, {x: ak.vector([0, 0]), y: 1}]); return false;} catch(e) {}

    return true;
   }

   function good() {
    var marginal = new Array(n);
    var m = marginals.length;
    var i, j;

    for(j=0;j<m;++j) {
     for(i=0;i<n;++i) marginal[i] = {x: nodes[i].x.at(j), y: nodes[i].y};
     marginal.sort(function(n0, n1) {return ak.numberCompare(n0.x, n1.x);});
     for(i=0;i<m;++i) if(marginals[j][i].x!==marginal[i].x || marginals[j][i].y!==marginal[i].y) return false;
    }
    return true;
   }

   args.add('bad', bad);
   args.add('good', good);

   nodeMarginals.add(args);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   nodeMarginals.add(load);
  }

  akTest.add(nodeMarginals);
 }

 ak.using(['Approx/NodeMarginals.js', 'Distribution/MultiNormalDistribution.js', 'Distribution/UniformDistribution.js'], define);
})();