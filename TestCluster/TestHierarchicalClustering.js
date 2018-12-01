"use strict";

(function() {
 function define() {
  var hierarchicalClustering = {
   name: 'cluster.hierarchicalClustering',
   body: [],
   add: function(t) {this.body.push(t);}
  };

  try {
   var scalars = [17, 2, 8, 4, 5, 14, 10, 1];

   var ss0 = [0, 1, 2, 3, 4, 5, 6, 7];
   var ss1 = [2, 0, 3, 1, 1, 4, 5, 0];
   var ss2 = [2, 0, 1, 0, 0, 3, 1, 0];
   var ss3 = [1, 0, 0, 0, 0, 1, 0, 0];
   var ss4 = [0, 0, 0, 0, 0, 0, 0, 0];
   var ss = [ss0, ss1, ss2, ss3, ss4];

   var sc0 = [0, 1, 2, 3, 4, 5, 6, 7];
   var sc1 = [2, 0, 3, 1, 1, 4, 5, 0];
   var sc2 = [3, 0, 1, 2, 2, 4, 1, 0];
   var sc3 = [0, 1, 2, 3, 3, 0, 2, 1];
   var sc4 = [1, 0, 2, 0, 0, 1, 2, 0];
   var sc5 = [0, 0, 0, 0, 0, 0, 0, 0];
   var sc = [sc0, sc1, sc2, sc3, sc4, sc5];

   function singleF(c0, c1) {
    var n0 = c0.size();
    var n1 = c1.size();
    var min = ak.INFINITY;
    var i0, i1, d;

    for(i0=0;i0<n0;++i0) {
     for(i1=0;i1<n1;++i1) {
      d = ak.dist(scalars[c0.at(i0)], scalars[c1.at(i1)]);
      if(d<min) min = d;
     }
    }
    return min;
   }

   function completeF(c0, c1) {
    var n0 = c0.size();
    var n1 = c1.size();
    var max = 0;
    var i0, i1, d;

    for(i0=0;i0<n0;++i0) {
     for(i1=0;i1<n1;++i1) {
      d = ak.dist(scalars[c0.at(i0)], scalars[c1.at(i1)]);
      if(d>max) max = d;
     }
    }
    return max;
   }

   var scalarSingle = ak.hierarchicalClustering(scalars, singleF);
   var scalarComplete = ak.hierarchicalClustering(scalars, completeF);

   function compare(a0, a1) {
    var n = a0.length;
    var i;

    if(a1.length!==n) return false;
    for(i=0;i<n;++i) if(a0[i]!==a1[i]) return false;
    return true;
   }

   var init = {
    name: 'init',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   function invalid() {
    try {ak.hierarchicalClustering(); return false;} catch(e) {}
    try {ak.hierarchicalClustering('a'); return false;} catch(e) {}
    try {ak.hierarchicalClustering([], 'a'); return false;} catch(e) {}
    return true;
   }

   init.add('invalid', invalid);

   var single = {
    name: 'single',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   single.add('types', function() {
    var i;
    if(ak.type(scalarSingle)!==ak.CLUSTERINGS_T) return false;
    if(scalarSingle.size()!==5) return false;

    for(i=0;i<5;++i) {
     if(ak.type(scalarSingle.at(i))!==ak.CLUSTERING_T) return false;
    }
    return true;
   });

   single.add('memberships', function() {
    var i;

    for(i=0;i<5;++i) {
     if(!compare(scalarSingle.at(i).memberships.toArray(), ss[i])) return false;
    }
    return true;
   });

   single.add('data', function() {
    var i;

    if(!compare(scalarSingle.at(0).data.toArray(), scalars)) return false;

    for(i=1;i<5;++i) {
     if(scalarSingle.at(i).data!==scalarSingle.at(0).data) return false;
    }
    return true;
   });

   var complete = {
    name: 'complete',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   complete.add('types', function() {
    var i;
    if(ak.type(scalarComplete)!==ak.CLUSTERINGS_T) return false;
    if(scalarComplete.size()!==6) return false;

    for(i=0;i<6;++i) {
     if(ak.type(scalarComplete.at(i))!==ak.CLUSTERING_T) return false;
    }
    return true;
   });

   complete.add('memberships', function() {
    var i;

    for(i=0;i<6;++i) {
     if(!compare(scalarComplete.at(i).memberships.toArray(), sc[i])) return false;
    }
    return true;
   });

   complete.add('data', function() {
    var i;

    if(!compare(scalarComplete.at(0).data.toArray(), scalars)) return false;

    for(i=1;i<6;++i) {
     if(scalarComplete.at(i).data!==scalarComplete.at(0).data) return false;
    }
    return true;
   });

   hierarchicalClustering.add(init);
   hierarchicalClustering.add(single);
   hierarchicalClustering.add(complete);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   hierarchicalClustering.add(load);
  }

  akTest.add(hierarchicalClustering);
 }

 ak.using(['Cluster/HierarchicalClustering.js', 'Matrix/Vector.js'], define);
})();
