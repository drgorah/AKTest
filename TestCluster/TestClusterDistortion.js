"use strict";

(function() {
 function define() {
  var clusterDistortion = {
   name: 'cluster.clusterDistortion',
   body: [],
   add: function(n, b) {this.body.push({name: n, body: b});}
  };

  try {
   var mt = ak.mtRnd(5);

   function makeCluster(x, y, r, n) {
    var rnd = ak.normalRnd(0, r, mt);
    var c = [];
    var i;
  
    for(i=0;i<n;++i) c.push(ak.vector([x+rnd(), y+rnd()]));
    return c;
   }
  
   var d2 = [];
   d2.push.apply(d2, makeCluster(-1, -1, 0.05, 20));
   d2.push.apply(d2, makeCluster(+1, +1, 0.05, 20));
  
   var d3 = [];
   d3.push.apply(d3, makeCluster(-1, -1, 0.05, 20));
   d3.push.apply(d3, makeCluster(+1, +1, 0.05, 20));
   d3.push.apply(d3, makeCluster(+1, -1, 0.05, 20));
  
   var m22 = [ak.vector([-1,-1]), ak.vector([1,1])];
   var m23 = [ak.vector([-1.05,-1.05]), ak.vector([-0.95,-0.95]), ak.vector([1,1])];
   var m24 = [ak.vector([-1.05,-1.05]), ak.vector([-0.95,-0.95]), ak.vector([0.95,0.95]), ak.vector([1.05,1.05])];
   var m25 = [ak.vector([-1.05,-1.05]), ak.vector([-1,-1]), ak.vector([-0.95,-0.95]), ak.vector([0.95,0.95]), ak.vector([1.05,1.05])];
   var m26 = [ak.vector([-1.05,-1.05]), ak.vector([-1,-1]), ak.vector([-0.95,-0.95]), ak.vector([0.95,0.95]), ak.vector([1,1]), ak.vector([1.05,1.05])];
  
   var m32 = [ak.vector([-1,-1]), ak.vector([1,0])];
   var m33 = [ak.vector([-1,-1]), ak.vector([1,1]), ak.vector([1,-1])];
   var m34 = [ak.vector([-1.05,-1.05]), ak.vector([-0.95,-0.95]), ak.vector([1,1]), ak.vector([1,-1])];
   var m35 = [ak.vector([-1.05,-1.05]), ak.vector([-0.95,-0.95]), ak.vector([0.95,0.95]), ak.vector([1.05,1.05]), ak.vector([1,-1])];
   var m36 = [ak.vector([-1.05,-1.05]), ak.vector([-0.95,-0.95]), ak.vector([0.95,0.95]), ak.vector([1.05,1.05]), ak.vector([0.95,-1.05]), ak.vector([1.05,-0.95])];
   var m37 = [ak.vector([-1.05,-1.05]), ak.vector([-1,-1]), ak.vector([-0.95,-0.95]), ak.vector([0.95,0.95]), ak.vector([1.05,1.05]), ak.vector([0.95,-1.05]), ak.vector([1.05,-0.95])];
  
   var c22 = ak.kMeansClustering(d2, m22, mt);
   var c23 = ak.kMeansClustering(d2, m23, mt);
   var c24 = ak.kMeansClustering(d2, m24, mt);
   var c25 = ak.kMeansClustering(d2, m25, mt);
   var c26 = ak.kMeansClustering(d2, m26, mt);
  
   var c32 = ak.kMeansClustering(d3, m32, mt);
   var c33 = ak.kMeansClustering(d3, m33, mt);
   var c34 = ak.kMeansClustering(d3, m34, mt);
   var c35 = ak.kMeansClustering(d3, m35, mt);
   var c36 = ak.kMeansClustering(d3, m36, mt);
   var c37 = ak.kMeansClustering(d3, m37, mt);
  
   function check2() {
    var dis2 = ak.clusterDistortion(c22);
    var dis3 = ak.clusterDistortion(c23);
    var dis4 = ak.clusterDistortion(c24);
    var dis5 = ak.clusterDistortion(c25);
    var dis6 = ak.clusterDistortion(c26);
  
    return dis2<dis3 && dis4<dis3 && dis4<dis5 && dis6<dis5;
   }
  
   function check3() {
    var dis2 = ak.clusterDistortion(c32);
    var dis3 = ak.clusterDistortion(c33);
    var dis4 = ak.clusterDistortion(c34);
    var dis5 = ak.clusterDistortion(c35);
    var dis6 = ak.clusterDistortion(c36);
    var dis7 = ak.clusterDistortion(c37);
  
    return dis3<dis2 && dis3<dis4 && dis6<dis5 && dis6<dis7;
   }
  
   clusterDistortion.add('two clusters', check2);
   clusterDistortion.add('three clusters', check3);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   clusterDistortion.add(load);
  }

  akTest.add(clusterDistortion);
 }

 ak.using(['Cluster/ClusterDistortion.js', 'Cluster/KMeansClustering.js', 'Distribution/NormalDistribution.js', 'Random/MTRnd.js'], define);
})();
