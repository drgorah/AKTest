"use strict";

(function() {
 function define() {
  var distanceMatrix = {
   name: 'cluster.distanceMatrix',
   body: [],
   add: function(t) {this.body.push(t);}
  };

  try {
   var a0 = [1, 2, 3];
   var a1 = [4, 5, 6];
   var a2 = [7, 8, 9];
   var a3 = [6, 5, 4];

   var v0 = ak.vector(a0);
   var v1 = ak.vector(a1);
   var v2 = ak.vector(a2);
   var v3 = ak.vector(a3);

   var A0 = [v1];
   var A1 = [v1, v3];
   var A2 = [v0, v1, v2];
   var A3 = {
    TYPE: ak.CLUSTER_DATA_T,
    size: function() {return A2.length;},
    at: function(i) {return A2[i];}
   };

   function l1(x, y) {
    var n = x.dims();
    var d = 0;
    var i;

    if(y.dims()!==n) return ak.NaN;
    for(i=0;i<n;++i) d += Math.abs(x.at(i)-y.at(i));
    return d;
   }

   var e01 = ak.dist(v0, v1);
   var e02 = ak.dist(v0, v2);
   var e03 = ak.dist(v0, v3);
   var e12 = ak.dist(v1, v2);
   var e13 = ak.dist(v1, v3);
   var e23 = ak.dist(v2, v3);

   var E02 = ak.matrix([[e01, 0, e12]]);
   var E21 = ak.matrix([[e01, e03], [0, e13], [e12, e23]]);
   var E22 = ak.matrix([[0, e01, e02],[e01, 0, e12],[e02, e12, 0]]);

   var m01 = l1(v0, v1);
   var m02 = l1(v0, v2);
   var m03 = l1(v0, v3);
   var m12 = l1(v1, v2);
   var m13 = l1(v1, v3);
   var m23 = l1(v2, v3);

   var M02 = ak.matrix([[m01, 0, m12]]);
   var M21 = ak.matrix([[m01, m03], [0, m13], [m12, m23]]);
   var M22 = ak.matrix([[0, m01, m02],[m01, 0, m12],[m02, m12, 0]]);

   function args() {
    try {ak.distanceMatrix(); return false;} catch(e) {}
    try {ak.distanceMatrix('a'); return false;} catch(e) {}
    try {ak.distanceMatrix(A2, 'a'); return false;} catch(e) {}
    try {ak.distanceMatrix(A3, 'a'); return false;} catch(e) {}
    try {ak.distanceMatrix(A2, A2, 'a'); return false;} catch(e) {}
    try {ak.distanceMatrix(A2, A3, 'a'); return false;} catch(e) {}
    try {ak.distanceMatrix(A3, A2, 'a'); return false;} catch(e) {}
    try {ak.distanceMatrix(A3, A3, 'a'); return false;} catch(e) {}
    return true;
   }

   function dist() {
    try {
     ak.distanceMatrix(A0, A2, function(lhs, rhs){return -ak.dist(lhs, rhs);});
    }
    catch(e) {}
    return true;
   }

   var invalid = {
    name: 'invalid',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   invalid.add('arguments', args);
   invalid.add('distances', dist);

   var euclidean = {
    name: 'euclidean',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   euclidean.add('A0 vs A2', function(){return ak.eq(ak.distanceMatrix(A0, A2), E02);});
   euclidean.add('A2 vs A1', function(){return ak.eq(ak.distanceMatrix(A2, A1), E21);});
   euclidean.add('A2 vs A2', function(){return ak.eq(ak.distanceMatrix(A2, A2), E22);});
   euclidean.add('A0 vs A3', function(){return ak.eq(ak.distanceMatrix(A0, A3), E02);});
   euclidean.add('A3 vs A1', function(){return ak.eq(ak.distanceMatrix(A3, A1), E21);});
   euclidean.add('A2 vs A3', function(){return ak.eq(ak.distanceMatrix(A2, A3), E22);});
   euclidean.add('A3 vs A2', function(){return ak.eq(ak.distanceMatrix(A3, A2), E22);});
   euclidean.add('A3 vs A3', function(){return ak.eq(ak.distanceMatrix(A3, A3), E22);});

   var manhattan = {
    name: 'manhattan',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   manhattan.add('A0 vs A2', function(){return ak.eq(ak.distanceMatrix(A0, A2, l1), M02);});
   manhattan.add('A2 vs A1', function(){return ak.eq(ak.distanceMatrix(A2, A1, l1), M21);});
   manhattan.add('A2 vs A2', function(){return ak.eq(ak.distanceMatrix(A2, A2, l1), M22);});
   manhattan.add('A0 vs A3', function(){return ak.eq(ak.distanceMatrix(A0, A3, l1), M02);});
   manhattan.add('A3 vs A1', function(){return ak.eq(ak.distanceMatrix(A3, A1, l1), M21);});
   manhattan.add('A2 vs A3', function(){return ak.eq(ak.distanceMatrix(A2, A3, l1), M22);});
   manhattan.add('A3 vs A2', function(){return ak.eq(ak.distanceMatrix(A3, A2, l1), M22);});
   manhattan.add('A3 vs A3', function(){return ak.eq(ak.distanceMatrix(A3, A3, l1), M22);});

   distanceMatrix.add(invalid);
   distanceMatrix.add(euclidean);
   distanceMatrix.add(manhattan);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   distanceMatrix.add(load);
  }

  akTest.add(distanceMatrix);
 }

 ak.using(['Cluster/DistanceMatrix.js', 'Matrix/Vector.js'], define);
})();
