"use strict";

(function() {
 function define() {
  var clusterVariance = {
   name: 'cluster.clusterVariance',
   body: [],
   add: function(n, b) {this.body.push({name: n, body: b});}
  };

  try {
   function makeCluster(x, y, r, n) {
    var rnd = ak.normalRnd();
    var c = [];
    var i;
  
    for(i=0;i<n;++i) c.push(ak.vector([x+r*rnd(), y+r*rnd()]));
    return c;
   }
  
   var d2 = [];
   d2.push.apply(d2, makeCluster(-1, -1, 0.1, 10));
   d2.push.apply(d2, makeCluster(+1, +1, 0.1, 9));
  
   var c22 = ak.kMeansClustering(d2, 2);
  
   function checkWithin() {
    var s2 = 0.0;
    var i, j, d;
    
    for(i=0;i<10;++i) {
     for(j=0;j<10;++j) {
      d = ak.sub(d2[i], d2[j]);
      s2 += ak.mul(d, d);
     }
    }
  
    for(i=10;i<19;++i) {
     for(j=10;j<19;++j) {
      d = ak.sub(d2[i], d2[j]);
      s2 += ak.mul(d, d);
     }
    }
    s2 /= 2*19*19;
  
    return ak.diff(s2, ak.withinClusterVariance(c22)) < 1e-12;
   }
  
   function checkBetween() {
    var s2 = 0.0;
    var i, j, d;
    
    for(i=0;i<10;++i) {
     for(j=10;j<19;++j) {
      d = ak.sub(d2[i], d2[j]);
      s2 += ak.mul(d, d);
     }
    }
  
    for(i=10;i<19;++i) {
     for(j=0;j<10;++j) {
      d = ak.sub(d2[i], d2[j]);
      s2 += ak.mul(d, d);
     }
    }
    s2 /= 2*19*19;
  
    return ak.diff(s2, ak.betweenClusterVariance(c22)) < 1e-12;
   }
  
   clusterVariance.add('within', checkWithin);
   clusterVariance.add('between', checkBetween);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   clusterVariance.add(load);
  }

  akTest.add(clusterVariance);
 }

 ak.using(['Cluster/ClusterVariance.js', 'Cluster/KMeansClustering.js', 'Distribution/NormalDistribution.js', 'Matrix/Vector.js'], define);
})();
