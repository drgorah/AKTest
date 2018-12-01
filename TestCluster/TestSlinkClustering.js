"use strict";

(function() {
 function define() {
  var slinkClustering = {
   name: 'cluster.slinkClustering',
   body: [],
   add: function(t) {this.body.push(t);}
  };

  try {
   var scalars = [17, 2, 8, 4, 5, 14, 10, 1];

   var ss0 = [0, 1, 2, 3, 4, 5, 6, 7];
   var ss1 = [0, 1, 2, 3, 3, 4, 5, 1];
   var ss2 = [0, 1, 2, 1, 1, 3, 2, 1];
   var ss3 = [0, 1, 1, 1, 1, 0, 1, 1];
   var ss4 = [0, 0, 0, 0, 0, 0, 0, 0];
   var ss = [ss0, ss1, ss2, ss3, ss4];

   var dist = ak.distanceMatrix(scalars, scalars);
   var scalarSlink = ak.slinkClustering(scalars);
   var distSlink = ak.slinkClustering(dist);

   function compare(a0, a1) {
    var n = a0.length;
    var i;

    if(a1.length!==n) return false;
    for(i=0;i<n;++i) if(a0[i]!==a1[i]) return false;
    return true;
   }

   function makeVectors(n, d) {
    var data = new Array(n);
    var rnd = ak.multiUniformRnd(d);
    while(n-->0) data[n] = rnd();
    return data;
   }

   function sDist(data) {
    return function(c0, c1) {
     var n0 = c0.size();
     var n1 = c1.size();
     var min = ak.INFINITY;
     var i0, i1, d;

     for(i0=0;i0<n0;++i0) {
      for(i1=0;i1<n1;++i1) {
       d = ak.dist(data[c0.at(i0)], data[c1.at(i1)]);
       if(d<min) min = d;
      }
     }
     return min;
    };
   }

   function compareVectorClustering(n, d) {
    var data = makeVectors(n, d);
    var hCluster = ak.hierarchicalClustering(data, sDist(data));
    var sCluster = ak.clusterings(ak.slinkClustering(data));
    var nc = hCluster.size();
    var i;

    if(sCluster.size()!==nc) return false;
    for(i=0;i<n;++i) if(!compare(hCluster.at(i).memberships.toArray(), sCluster.at(i).memberships.toArray())) return false;
    return true;
   }

   var init = {
    name: 'init',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   function invalid() {
    try {ak.slinkClustering(); return false;} catch(e) {}
    try {ak.slinkClustering('a'); return false;} catch(e) {}
    try {ak.slinkClustering([], 'a'); return false;} catch(e) {}
    return true;
   }

   init.add('invalid', invalid);

   var fromScalars = {
    name: 'from scalars',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   fromScalars.add('types', function() {
    var i;

    if(ak.type(scalarSlink)!==ak.CLUSTERINGS_T) return false;
    if(scalarSlink.size()!==5) return false;

    for(i=0;i<5;++i) {
     if(ak.type(scalarSlink.at(i))!==ak.CLUSTERING_T) return false;
    }
    return true;
   });

   fromScalars.add('memberships', function() {
    var i;

    for(i=0;i<5;++i) {
     if(!compare(scalarSlink.at(i).memberships.toArray(), ss[i])) return false;
    }
    return true;
   });

   fromScalars.add('data', function() {
    var i;

    if(!compare(scalarSlink.at(0).data.toArray(), scalars)) return false;

    for(i=1;i<5;++i) {
     if(scalarSlink.at(i).data!==scalarSlink.at(0).data) return false;
    }
    return true;
   });

   var fromDist = {
    name: 'from distance matrix',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   fromDist.add('types', function() {
    var i;

    if(ak.type(distSlink)!==ak.CLUSTERINGS_T) return false;
    if(distSlink.size()!==5) return false;

    for(i=0;i<5;++i) {
     if(ak.type(distSlink.at(i))!==ak.CLUSTERING_T) return false;
    }
    return true;
   });

   fromDist.add('memberships', function() {
    var i;

    for(i=0;i<5;++i) {
     if(!compare(distSlink.at(i).memberships.toArray(), ss[i])) return false;
    }
    return true;
   });

   var fromVectors = {
    name: 'from vectors',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   fromVectors.add('versus hierarchical 2d', function() {return compareVectorClustering(10, 2);});
   fromVectors.add('versus hierarchical 3d', function() {return compareVectorClustering(10, 3);});
   fromVectors.add('versus hierarchical 4d', function() {return compareVectorClustering(10, 4);});

   slinkClustering.add(init);
   slinkClustering.add(fromScalars);
   slinkClustering.add(fromDist);
   slinkClustering.add(fromVectors);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   slinkClustering.add(load);
  }

  akTest.add(slinkClustering);
 }

 ak.using(['Cluster/SlinkClustering.js', 'Cluster/HierarchicalClustering.js', 'Distribution/MultiUniformDistribution.js'], define);
})();
