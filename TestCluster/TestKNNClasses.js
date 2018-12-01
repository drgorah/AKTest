"use strict";

(function() {
 function define() {
  var knnClasses = {
   name: 'cluster.knnClasses',
   body: [],
   add: function(t) {this.body.push(t);}
  };

  try {
   function makeCluster(x, y, r, n) {
    var rnd = ak.normalRnd();
    var c = [];
    var i;
  
    for(i=0;i<n;++i) c.push(ak.vector([x+r*rnd(), y+r*rnd()]));
    return c;
   }

   function makeCandidates(l, u, n) {
    var rnd = ak.multiUniformRnd(2, l, u);
    var c = new Array(n);
    var i;
    for(i=0;i<n;++i) c[i] = rnd();
    return c;
   }

   var d2 = [];
   d2.push.apply(d2, makeCluster(-1, -1, 0.1, 10));
   d2.push.apply(d2, makeCluster(+1, +1, 0.1, 9));
  
   var d4 = [];
   d4.push.apply(d4, makeCluster(-1, -1, 0.1, 10));
   d4.push.apply(d4, makeCluster(-1, +1, 0.1, 9));
   d4.push.apply(d4, makeCluster(+1, -1, 0.1, 8));
   d4.push.apply(d4, makeCluster(+1, +1, 0.1, 7));

   var c2 = ak.kMeansClustering(d2, 2);
   var c4 = ak.kMeansClustering(d4, 4);

   var C2 = ak.clustering(c2.clusters.toArray());
   var C4 = ak.clustering(c4.clusters.toArray());

   function args() {
    try {ak.knnClasses(); return false;} catch(e) {}
    try {ak.knnClasses('a'); return false;} catch(e) {}
    try {ak.knnClasses([], 'a'); return false;} catch(e) {}
    try {ak.knnClasses([], c2, 'a'); return false;} catch(e) {}
    try {ak.knnClasses([], c2, 3, 'a'); return false;} catch(e) {}
    try {ak.knnClasses([], c2, [1, 0.5, 0.25], 'a'); return false;} catch(e) {}
    try {ak.knnClasses([], c2, [1, -0.5, 0.25]); return false;} catch(e) {}
    try {ak.knnClasses([], c2, [1, 0.5, ak.NaN]); return false;} catch(e) {}

    try {ak.knnClasses([], [], 'a'); return false;} catch(e) {}
    try {ak.knnClasses([], [], c2, 'a'); return false;} catch(e) {}
    try {ak.knnClasses([], [], c2, 3, 'a'); return false;} catch(e) {}
    try {ak.knnClasses([], [], c2, [1, 0.5, 0.25], 'a'); return false;} catch(e) {}
    try {ak.knnClasses([], [], c2, [1, -0.5, 0.25]); return false;} catch(e) {}
    try {ak.knnClasses([], [], c2, [1, 0.5, ak.NaN]); return false;} catch(e) {}

    try {ak.knnClasses([], c2.data, 'a'); return false;} catch(e) {}
    try {ak.knnClasses([], c2.data, c2, 'a'); return false;} catch(e) {}
    try {ak.knnClasses([], c2.data, c2, 3, 'a'); return false;} catch(e) {}
    try {ak.knnClasses([], c2.data, c2, [1, 0.5, 0.25], 'a'); return false;} catch(e) {}
    try {ak.knnClasses([], c2.data, c2, [1, -0.5, 0.25]); return false;} catch(e) {}
    try {ak.knnClasses([], c2.data, c2, [1, 0.5, ak.NaN]); return false;} catch(e) {}
    return true;
   }

   var invalid = {
    name: 'invalid',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   invalid.add('arguments', args);

   function checkUniformClasses(candidates, clustering, k) {
    var nc = clustering.clusters.size();
    var neighbours = ak.nearestNeighbours(candidates, clustering.data, k);
    var classes = ak.knnClasses(candidates, clustering, k);
    var i, c, n, m, s;

    if(classes.length!==candidates.length) return false;

    for(i=0;i<candidates.length;++i) {
     if(classes[i].length!==nc) return false;
     for(c=0;c<nc;++c) {
      s = 0;
      for(n=0;n<k;++n) {
       if(clustering.memberships.at(neighbours[i][n])===c) ++s;
      }
      if(!(ak.diff(s/k, classes[i][c])<1e-12)) return false;
     }
    }
    return true;
   }

   function checkUniformClassesEx(candidates, data, clustering, k) {
    var nc = clustering.clusters.size();
    var neighbours = ak.nearestNeighbours(candidates, data, k);
    var classes = ak.knnClasses(candidates, data, clustering, k);
    var i, c, n, m, s;

    if(classes.length!==candidates.length) return false;

    for(i=0;i<candidates.length;++i) {
     if(classes[i].length!==nc) return false;
     for(c=0;c<nc;++c) {
      s = 0;
      for(n=0;n<k;++n) {
       if(clustering.memberships.at(neighbours[i][n])===c) ++s;
      }
      if(!(ak.diff(s/k, classes[i][c])<1e-12)) return false;
     }
    }
    return true;
   }

   var uniform = {
    name: 'uniform',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   uniform.add('2 clusters, k=10', function() {
    return checkUniformClasses(makeCandidates(-1.25, 1.25, 100), c2, 10)
        && checkUniformClassesEx(makeCandidates(-1.25, 1.25, 100), c2.data, C2, 10)
        && checkUniformClassesEx(makeCandidates(-1.25, 1.25, 100), d2, C2, 10);
   });

   uniform.add('4 clusters, k=20', function() {
    return checkUniformClasses(makeCandidates(-1.25, 1.25, 100), c4, 20)
        && checkUniformClassesEx(makeCandidates(-1.25, 1.25, 100), c4.data, C4, 20)
        && checkUniformClassesEx(makeCandidates(-1.25, 1.25, 100), d4, C4, 20);
   });

   function checkWeightedClasses(candidates, clustering, weights) {
    var nc = clustering.clusters.size();
    var neighbours = ak.nearestNeighbours(candidates, clustering.data, weights.length);
    var classes = ak.knnClasses(candidates, clustering, weights);
    var sum = 0;
    var i, c, n, m, s;

    if(classes.length!==candidates.length) return false;

    for(i=0;i<weights.length;++i) sum += weights[i];

    for(i=0;i<candidates.length;++i) {
     if(classes[i].length!==nc) return false;
     for(c=0;c<nc;++c) {
      s = 0;
      for(n=0;n<weights.length;++n) {
       if(clustering.memberships.at(neighbours[i][n])===c) s += weights[n];
      }
      if(!(ak.diff(s/sum, classes[i][c])<1e-12)) return false;
     }
    }
    return true;
   }

   function checkWeightedClassesEx(candidates, data, clustering, weights) {
    var nc = clustering.clusters.size();
    var neighbours = ak.nearestNeighbours(candidates, data, weights.length);
    var classes = ak.knnClasses(candidates, data, clustering, weights);
    var sum = 0;
    var i, c, n, m, s;

    if(classes.length!==candidates.length) return false;

    for(i=0;i<weights.length;++i) sum += weights[i];

    for(i=0;i<candidates.length;++i) {
     if(classes[i].length!==nc) return false;
     for(c=0;c<nc;++c) {
      s = 0;
      for(n=0;n<weights.length;++n) {
       if(clustering.memberships.at(neighbours[i][n])===c) s += weights[n];
      }
      if(!(ak.diff(s/sum, classes[i][c])<1e-12)) return false;
     }
    }
    return true;
   }

   var weighted = {
    name: 'weighted',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   var w10 = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
   weighted.add('2 clusters, k=10', function() {
    return checkWeightedClasses(makeCandidates(-1.25, 1.25, 100), c2, w10)
        && checkWeightedClassesEx(makeCandidates(-1.25, 1.25, 100), c2.data, C2, w10)
        && checkWeightedClassesEx(makeCandidates(-1.25, 1.25, 100), d2, C2, w10);
   });

   var w20 = [20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
   weighted.add('4 clusters, k=20', function() {
    return checkWeightedClasses(makeCandidates(-1.25, 1.25, 100), c4, w20)
        && checkWeightedClassesEx(makeCandidates(-1.25, 1.25, 100), c4.data, C4, w20)
        && checkWeightedClassesEx(makeCandidates(-1.25, 1.25, 100), d4, C4, w20);
   });

   knnClasses.add(invalid);
   knnClasses.add(uniform);
   knnClasses.add(weighted);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   knnClasses.add(load);
  }

  akTest.add(knnClasses);
 }

 ak.using(['Cluster/KNNClasses.js', 'Cluster/KMeansClustering.js', 'Distribution/NormalDistribution.js', 'Distribution/MultiUniformDistribution.js', 'Matrix/Vector.js'], define);
})();
