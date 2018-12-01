"use strict";

(function() {
 function define() {
  var nearestNeighbours = {
   name: 'cluster.nearestNeighbours',
   body: [],
   add: function(t) {this.body.push(t);}
  };

  try {
   function l1(x, y) {
    var n = x.dims();
    var d = 0;
    var i;

    if(y.dims()!==n) return ak.NaN;
    for(i=0;i<n;++i) d += Math.abs(x.at(i)-y.at(i));
    return d;
   }

   var n0 = 20;
   var n1 = 30;
   var A0 = new Array(n0);
   var A1 = new Array(n1);
   var i;

   var rnd = ak.multiUniformRnd(4, -1, 1);

   for(i=0;i<n0;++i) A0[i] = rnd();
   for(i=0;i<n1;++i) A1[i] = rnd();

   var E003d = ak.nearestNeighbours(ak.distanceMatrix(A0, A0), 3);
   var E014d = ak.nearestNeighbours(ak.distanceMatrix(A0, A1), 4);
   var E105d = ak.nearestNeighbours(ak.distanceMatrix(A1, A0), 5);
   var E116d = ak.nearestNeighbours(ak.distanceMatrix(A1, A1), 6);

   var E00nd = ak.nearestNeighbours(ak.distanceMatrix(A0, A0));
   var E01nd = ak.nearestNeighbours(ak.distanceMatrix(A0, A1));
   var E10nd = ak.nearestNeighbours(ak.distanceMatrix(A1, A0));
   var E11nd = ak.nearestNeighbours(ak.distanceMatrix(A1, A1));

   var E003a = ak.nearestNeighbours(A0, A0, 3);
   var E014a = ak.nearestNeighbours(A0, A1, 4);
   var E105a = ak.nearestNeighbours(A1, A0, 5);
   var E116a = ak.nearestNeighbours(A1, A1, 6);

   var E00na = ak.nearestNeighbours(A0, A0);
   var E01na = ak.nearestNeighbours(A0, A1);
   var E10na = ak.nearestNeighbours(A1, A0);
   var E11na = ak.nearestNeighbours(A1, A1);

   var M003d = ak.nearestNeighbours(ak.distanceMatrix(A0, A0, l1), 3);
   var M014d = ak.nearestNeighbours(ak.distanceMatrix(A0, A1, l1), 4);
   var M105d = ak.nearestNeighbours(ak.distanceMatrix(A1, A0, l1), 5);
   var M116d = ak.nearestNeighbours(ak.distanceMatrix(A1, A1, l1), 6);

   var M00nd = ak.nearestNeighbours(ak.distanceMatrix(A0, A0, l1));
   var M01nd = ak.nearestNeighbours(ak.distanceMatrix(A0, A1, l1));
   var M10nd = ak.nearestNeighbours(ak.distanceMatrix(A1, A0, l1));
   var M11nd = ak.nearestNeighbours(ak.distanceMatrix(A1, A1, l1));

   var M003a = ak.nearestNeighbours(A0, A0, 3, l1);
   var M014a = ak.nearestNeighbours(A0, A1, 4, l1);
   var M105a = ak.nearestNeighbours(A1, A0, 5, l1);
   var M116a = ak.nearestNeighbours(A1, A1, 6, l1);

   var M00na = ak.nearestNeighbours(A0, A0, l1);
   var M01na = ak.nearestNeighbours(A0, A1, l1);
   var M10na = ak.nearestNeighbours(A1, A0, l1);
   var M11na = ak.nearestNeighbours(A1, A1, l1);

   function args() {
    try {ak.nearestNeighbours(); return false;} catch(e) {}
    try {ak.nearestNeighbours('a'); return false;} catch(e) {}
    try {ak.nearestNeighbours(ak.matrix(3, 5), 'a'); return false;} catch(e) {}
    try {ak.nearestNeighbours(ak.matrix(3, 5), -1); return false;} catch(e) {}
    try {ak.nearestNeighbours(ak.matrix(3, 5),  6); return false;} catch(e) {}
    try {ak.nearestNeighbours(ak.matrix(3, 5),  1.5); return false;} catch(e) {}

    try {ak.nearestNeighbours([1, 2, 3], 'a'); return false;} catch(e) {}
    try {ak.nearestNeighbours([1, 2, 3], [1, 2, 3], 'a'); return false;} catch(e) {}
    try {ak.nearestNeighbours([1, 2, 3], [1, 2, 3], -1); return false;} catch(e) {}
    try {ak.nearestNeighbours([1, 2, 3], [1, 2, 3], 4); return false;} catch(e) {}
    try {ak.nearestNeighbours([1, 2, 3], [1, 2, 3], 1.5); return false;} catch(e) {}
    try {ak.nearestNeighbours([1, 2, 3], [1, 2, 3], 2, 'a'); return false;} catch(e) {}
    return true;
   }

   var invalid = {
    name: 'invalid',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   invalid.add('arguments', args);

   function checkElementNeighbours(x, a, k, dist, neighbours) {
    var n = a.length;
    var i, j, d, c;

    if(neighbours.length!==k) return false;

    for(i=0;i<k;++i) {
     d = dist(x, a[neighbours[i]]);
     c = 0;
     for(j=0;j<n;++j) if(dist(x, a[j])<d) ++c;
     if(c>i) return false;
    }
    return true;
   }

   function checkArrayNeighbours(a0, a1, k, dist, neighbours) {
    var n = a0.length;
    var i;

    if(neighbours.length!==n) return false;
    for(i=0;i<n;++i) if(!checkElementNeighbours(a0[i], a1, k, dist, neighbours[i])) return false;
    return true;
   }

   var euclideanArray = {
    name: 'euclidean arrays',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   euclideanArray.add('A0 vs A0, 3 neighbours', function(){return checkArrayNeighbours(A0, A0, 3, ak.dist, E003a);});
   euclideanArray.add('A0 vs A1, 4 neighbours', function(){return checkArrayNeighbours(A0, A1, 4, ak.dist, E014a);});
   euclideanArray.add('A1 vs A0, 5 neighbours', function(){return checkArrayNeighbours(A1, A0, 5, ak.dist, E105a);});
   euclideanArray.add('A1 vs A1, 6 neighbours', function(){return checkArrayNeighbours(A1, A1, 6, ak.dist, E116a);});

   euclideanArray.add('A0 vs A0, all neighbours', function(){return checkArrayNeighbours(A0, A0, A0.length, ak.dist, E00na);});
   euclideanArray.add('A0 vs A1, all neighbours', function(){return checkArrayNeighbours(A0, A1, A1.length, ak.dist, E01na);});
   euclideanArray.add('A1 vs A0, all neighbours', function(){return checkArrayNeighbours(A1, A0, A0.length, ak.dist, E10na);});
   euclideanArray.add('A1 vs A1, all neighbours', function(){return checkArrayNeighbours(A1, A1, A1.length, ak.dist, E11na);});

   var euclideanDistance = {
    name: 'euclidean distance matrix',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   euclideanDistance.add('A0 vs A0, 3 neighbours', function(){return checkArrayNeighbours(A0, A0, 3, ak.dist, E003d);});
   euclideanDistance.add('A0 vs A1, 4 neighbours', function(){return checkArrayNeighbours(A0, A1, 4, ak.dist, E014d);});
   euclideanDistance.add('A1 vs A0, 5 neighbours', function(){return checkArrayNeighbours(A1, A0, 5, ak.dist, E105d);});
   euclideanDistance.add('A1 vs A1, 6 neighbours', function(){return checkArrayNeighbours(A1, A1, 6, ak.dist, E116d);});

   euclideanDistance.add('A0 vs A0, all neighbours', function(){return checkArrayNeighbours(A0, A0, A0.length, ak.dist, E00nd);});
   euclideanDistance.add('A0 vs A1, all neighbours', function(){return checkArrayNeighbours(A0, A1, A1.length, ak.dist, E01nd);});
   euclideanDistance.add('A1 vs A0, all neighbours', function(){return checkArrayNeighbours(A1, A0, A0.length, ak.dist, E10nd);});
   euclideanDistance.add('A1 vs A1, all neighbours', function(){return checkArrayNeighbours(A1, A1, A1.length, ak.dist, E11nd);});

   var manhattanArray = {
    name: 'manhattan arrays',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   manhattanArray.add('A0 vs A0, 3 neighbours', function(){return checkArrayNeighbours(A0, A0, 3, l1, M003a);});
   manhattanArray.add('A0 vs A1, 4 neighbours', function(){return checkArrayNeighbours(A0, A1, 4, l1, M014a);});
   manhattanArray.add('A1 vs A0, 5 neighbours', function(){return checkArrayNeighbours(A1, A0, 5, l1, M105a);});
   manhattanArray.add('A1 vs A1, 6 neighbours', function(){return checkArrayNeighbours(A1, A1, 6, l1, M116a);});

   manhattanArray.add('A0 vs A0, all neighbours', function(){return checkArrayNeighbours(A0, A0, A0.length, l1, M00na);});
   manhattanArray.add('A0 vs A1, all neighbours', function(){return checkArrayNeighbours(A0, A1, A1.length, l1, M01na);});
   manhattanArray.add('A1 vs A0, all neighbours', function(){return checkArrayNeighbours(A1, A0, A0.length, l1, M10na);});
   manhattanArray.add('A1 vs A1, all neighbours', function(){return checkArrayNeighbours(A1, A1, A1.length, l1, M11na);});

   var manhattanDistance = {
    name: 'manhattan distance matrix',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   manhattanDistance.add('A0 vs A0, 3 neighbours', function(){return checkArrayNeighbours(A0, A0, 3, l1, M003d);});
   manhattanDistance.add('A0 vs A1, 4 neighbours', function(){return checkArrayNeighbours(A0, A1, 4, l1, M014d);});
   manhattanDistance.add('A1 vs A0, 5 neighbours', function(){return checkArrayNeighbours(A1, A0, 5, l1, M105d);});
   manhattanDistance.add('A1 vs A1, 6 neighbours', function(){return checkArrayNeighbours(A1, A1, 6, l1, M116d);});

   manhattanDistance.add('A0 vs A0, all neighbours', function(){return checkArrayNeighbours(A0, A0, A0.length, l1, M00nd);});
   manhattanDistance.add('A0 vs A1, all neighbours', function(){return checkArrayNeighbours(A0, A1, A1.length, l1, M01nd);});
   manhattanDistance.add('A1 vs A0, all neighbours', function(){return checkArrayNeighbours(A1, A0, A0.length, l1, M10nd);});
   manhattanDistance.add('A1 vs A1, all neighbours', function(){return checkArrayNeighbours(A1, A1, A1.length, l1, M11nd);});

   nearestNeighbours.add(invalid);
   nearestNeighbours.add(euclideanArray);
   nearestNeighbours.add(euclideanDistance);
   nearestNeighbours.add(manhattanArray);
   nearestNeighbours.add(manhattanDistance);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   nearestNeighbours.add(load);
  }

  akTest.add(nearestNeighbours);
 }

 ak.using(['Cluster/DistanceMatrix.js', 'Cluster/NearestNeighbours.js', 'Distribution/MultiUniformDistribution.js'], define);
})();
