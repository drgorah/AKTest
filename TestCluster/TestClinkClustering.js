"use strict";

(function() {
 function define() {
  var clinkClustering = {
   name: 'cluster.clinkClustering',
   body: [],
   add: function(t) {this.body.push(t);}
  };

  try {
   var scalars = [17, 2, 8, 4, 5, 14, 10, 1];

   var sc0 = [0, 1, 2, 3, 4, 5, 6, 7];
   var sc1 = [0, 1, 2, 3, 3, 4, 5, 1];
   var sc2 = [0, 1, 2, 3, 3, 4, 2, 1];
   var sc3 = [0, 1, 2, 3, 3, 0, 2, 1];
   var sc4 = [0, 1, 2, 1, 1, 0, 2, 1];
   var sc5 = [0, 0, 0, 0, 0, 0, 0, 0];
   var sc = [sc0, sc1, sc2, sc3, sc4, sc5];

   var dist = ak.distanceMatrix(scalars, scalars);
   var scalarClink = ak.clinkClustering(scalars);
   var distClink = ak.clinkClustering(dist);

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

   function cDist(data) {
    return function(c0, c1) {
     var n0 = c0.size();
     var n1 = c1.size();
     var max = 0;
     var i0, i1, d;

     for(i0=0;i0<n0;++i0) {
      for(i1=0;i1<n1;++i1) {
       d = ak.dist(data[c0.at(i0)], data[c1.at(i1)]);
       if(d>max) max = d;
      }
     }
     return max;
    };
   }

   function compareVectorClustering(n, d) {
    var data = makeVectors(n, d);
    var hCluster = ak.hierarchicalClustering(data, cDist(data));
    var cCluster = ak.clusterings(ak.clinkClustering(data));
    var nc = hCluster.size();
    var i;

    if(cCluster.size()!==nc) return false;
    for(i=0;i<n;++i) if(!compare(hCluster.at(i).memberships.toArray(), cCluster.at(i).memberships.toArray())) return false;
    return true;
   }

   var init = {
    name: 'init',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   function invalid() {
    try {ak.clinkClustering(); return false;} catch(e) {}
    try {ak.clinkClustering('a'); return false;} catch(e) {}
    try {ak.clinkClustering([], 'a'); return false;} catch(e) {}
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

    if(ak.type(scalarClink)!==ak.CLUSTERINGS_T) return false;
    if(scalarClink.size()!==6) return false;

    for(i=0;i<6;++i) {
     if(ak.type(scalarClink.at(i))!==ak.CLUSTERING_T) return false;
    }
    return true;
   });

   fromScalars.add('memberships', function() {
    var i;

    for(i=0;i<6;++i) {
     if(!compare(scalarClink.at(i).memberships.toArray(), sc[i])) return false;
    }
    return true;
   });

   fromScalars.add('data', function() {
    var i;

    if(!compare(scalarClink.at(0).data.toArray(), scalars)) return false;

    for(i=1;i<6;++i) {
     if(scalarClink.at(i).data!==scalarClink.at(0).data) return false;
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

    if(ak.type(distClink)!==ak.CLUSTERINGS_T) return false;
    if(distClink.size()!==6) return false;

    for(i=0;i<5;++i) {
     if(ak.type(distClink.at(i))!==ak.CLUSTERING_T) return false;
    }
    return true;
   });

   fromDist.add('memberships', function() {
    var i;

    for(i=0;i<6;++i) {
     if(!compare(distClink.at(i).memberships.toArray(), sc[i])) return false;
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

   clinkClustering.add(init);
   clinkClustering.add(fromScalars);
   clinkClustering.add(fromDist);
   clinkClustering.add(fromVectors);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   clinkClustering.add(load);
  }

  akTest.add(clinkClustering);
 }

 ak.using(['Cluster/ClinkClustering.js', 'Cluster/HierarchicalClustering.js', 'Distribution/MultiUniformDistribution.js'], define);
})();
