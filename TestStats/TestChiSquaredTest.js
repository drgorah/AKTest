"use strict";

(function() {
 function define() {
  var chiSquared = {
   name: 'stats.chiSquaredTest',
   body: [],
   add: function(t) {this.body.push(t);}
  };

  try {
   var expected = [3.5, 4.5, 5.5, 6.5];
   var failing = [6, 6, 5, 3];
   var passing = [3, 5, 6, 6];

   var xf = failing[0]*failing[0]/expected[0]
          + failing[1]*failing[1]/expected[1]
          + failing[2]*failing[2]/expected[2]
          + failing[3]*failing[3]/expected[3]
          - 20;

   var xp = passing[0]*passing[0]/expected[0]
          + passing[1]*passing[1]/expected[1]
          + passing[2]*passing[2]/expected[2]
          + passing[3]*passing[3]/expected[3]
          - 20;

   var sample = [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0];
   var depend = [1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0];
   var independ = [1, 0, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1];

   var inhomog = ak.matrix([[5, 6],[1, 8]]);
   var homog = ak.matrix([[4, 7],[3, 8]]);

   var stat = {
    name: 'stat',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   stat.add('non-array observed', function(){try{ak.chiSquaredStat('a', [1, 1])} catch(e){return true;} return false;});
   stat.add('non-number observed', function(){try{ak.chiSquaredStat([1, 'a'], [1, 1])} catch(e){return true;} return false;});
   stat.add('no observed', function(){try{ak.chiSquaredStat([0, 0], [1, 1])} catch(e){return true;} return false;});
   stat.add('NaN observed', function(){try{ak.chiSquaredStat([1, ak.NaN], [1, 1])} catch(e){return true;} return false;});
   stat.add('infinite observed', function(){try{ak.chiSquaredStat([1, ak.INFINITY], [1, 1])} catch(e){return true;} return false;});
   stat.add('negative observed', function(){try{ak.chiSquaredStat([1, -1], [1, 1])} catch(e){return true;} return false;});
   stat.add('non-array expected', function(){try{ak.chiSquaredStat([1, 1], 'a')} catch(e){return true;} return false;});
   stat.add('non-number expected', function(){try{ak.chiSquaredStat([1, 1], [1, 'a'])} catch(e){return true;} return false;});
   stat.add('no expected', function(){try{ak.chiSquaredStat([1, 1], [0, 0])} catch(e){return true;} return false;});
   stat.add('NaN expected', function(){try{ak.chiSquaredStat([1, 1], [1, ak.NaN])} catch(e){return true;} return false;});
   stat.add('infinite expected', function(){try{ak.chiSquaredStat([1, 1], [1, ak.INFINITY])} catch(e){return true;} return false;});
   stat.add('negative expected', function(){try{ak.chiSquaredStat([1, 1], [1, -1])} catch(e){return true;} return false;});
   stat.add('too few samples', function(){try{ak.chiSquaredStat([1], [1])} catch(e){return true;} return false;});
   stat.add('observed/expected size mismatch', function(){try{ak.chiSquaredStat([1, 1, 1], [1, 1])} catch(e){return true;} return false;});
   stat.add('failing sample', function(){return ak.chiSquaredStat(failing, expected)===xf;});
   stat.add('passing sample', function(){return ak.chiSquaredStat(passing, expected)===xp;});

   var test = {
    name: 'test',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   test.add('non-array observed', function(){try{ak.chiSquaredTest('a', [1, 1], 1)} catch(e){return true;} return false;});
   test.add('non-number observed', function(){try{ak.chiSquaredTest([1, 'a'], [1, 1], 1)} catch(e){return true;} return false;});
   test.add('no observed', function(){try{ak.chiSquaredTest([0, 0], [1, 1], 1)} catch(e){return true;} return false;});
   test.add('NaN observed', function(){try{ak.chiSquaredTest([1, ak.NaN], [1, 1], 1)} catch(e){return true;} return false;});
   test.add('infinite observed', function(){try{ak.chiSquaredTest([1, ak.INFINITY], [1, 1], 1)} catch(e){return true;} return false;});
   test.add('negative observed', function(){try{ak.chiSquaredTest([1, -1], [1, 1], 1)} catch(e){return true;} return false;});
   test.add('non-array expected', function(){try{ak.chiSquaredTest([1, 1], 'a', 1)} catch(e){return true;} return false;});
   test.add('non-number expected', function(){try{ak.chiSquaredTest([1, 1], [1, 'a'], 1)} catch(e){return true;} return false;});
   test.add('no expected', function(){try{ak.chiSquaredTest([1, 1], [0, 0], 1)} catch(e){return true;} return false;});
   test.add('NaN expected', function(){try{ak.chiSquaredTest([1, 1], [1, ak.NaN], 1)} catch(e){return true;} return false;});
   test.add('infinite expected', function(){try{ak.chiSquaredTest([1, 1], [1, ak.INFINITY], 1)} catch(e){return true;} return false;});
   test.add('negative expected', function(){try{ak.chiSquaredTest([1, 1], [1, -1], 1)} catch(e){return true;} return false;});
   test.add('too few samples', function(){try{ak.chiSquaredTest([1], [1], 1)} catch(e){return true;} return false;});
   test.add('observed/expected size mismatch', function(){try{ak.chiSquaredTest([1, 1, 1], [1, 1], 1)} catch(e){return true;} return false;});
   test.add('non-number free params', function(){try{ak.chiSquaredTest([1, 1, 1], [1, 1, 1], 'a')} catch(e){return true;} return false;});
   test.add('too few free params', function(){try{ak.chiSquaredTest([1, 1, 1], [1, 1, 1], 0)} catch(e){return true;} return false;});
   test.add('too many free params', function(){try{ak.chiSquaredTest([1, 1, 1], [1, 1, 1], 3)} catch(e){return true;} return false;});
   test.add('NaN free params', function(){try{ak.chiSquaredTest([1, 1, 1], [1, 1, 1], ak.NaN)} catch(e){return true;} return false;});
   test.add('non-integer free params', function(){try{ak.chiSquaredTest([1, 1, 1], [1, 1, 1], 1.5)} catch(e){return true;} return false;});
   test.add('failing sample', function(){return ak.chiSquaredTest(failing, expected, 1)<0.25;});
   test.add('passing sample', function(){return ak.chiSquaredTest(passing, expected, 1)>0.95;});

   var non_param = {
    name: 'testNonParamFit',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   non_param.add('failing sample', function(){return ak.chiSquaredTestNonParamFit(failing, expected)<0.25;});
   non_param.add('passing sample', function(){return ak.chiSquaredTestNonParamFit(passing, expected)>0.95;});

   var contingent = {
    name: 'testContingent',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   contingent.add('non-matrix table', function(){try{ak.chiSquaredTestContingent('a')} catch(e){return true;} return false;});
   contingent.add('too few rows', function(){try{ak.chiSquaredTestContingent(ak.matrix(1, 3))} catch(e){return true;} return false;});
   contingent.add('too few columns', function(){try{ak.chiSquaredTestContingent(ak.matrix(3, 1))} catch(e){return true;} return false;});
   contingent.add('inhomogenous table', function(){return ak.chiSquaredTestContingent(inhomog)<0.1;});
   contingent.add('homogenous table', function(){return ak.chiSquaredTestContingent(homog)>0.1;});

   var independent = {
    name: 'testIndependent',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   independent.add('non-array first samples', function(){try{ak.chiSquaredTestIndependent('a', [1, 2, 3])} catch(e){return true;} return false;});
   independent.add('non-array second samples', function(){try{ak.chiSquaredTestIndependent([1, 2, 3], 'a')} catch(e){return true;} return false;});
   independent.add('samples size mismatch', function(){try{ak.chiSquaredTestIndependent([1, 2], [1, 2, 3])} catch(e){return true;} return false;});
   independent.add('non-number first category', function(){try{ak.chiSquaredTestIndependent([1, 'a', 3], [1, 2, 3])} catch(e){return true;} return false;});
   independent.add('non-number second category', function(){try{ak.chiSquaredTestIndependent([1, 2, 3], [1, 'a', 3])} catch(e){return true;} return false;});
   independent.add('negative first category', function(){try{ak.chiSquaredTestIndependent([1, -2, 3], [1, 2, 3])} catch(e){return true;} return false;});
   independent.add('negative second category', function(){try{ak.chiSquaredTestIndependent([1, 2, 3], [1, -2, 3])} catch(e){return true;} return false;});
   independent.add('non-integer first category', function(){try{ak.chiSquaredTestIndependent([1, 1.5, 3], [1, 2, 3])} catch(e){return true;} return false;});
   independent.add('non-integer second category', function(){try{ak.chiSquaredTestIndependent([1, 2, 3], [1, 1.5, 3])} catch(e){return true;} return false;});
   independent.add('infinite first category', function(){try{ak.chiSquaredTestIndependent([1, ak.INFINITY, 3], [1, 2, 3])} catch(e){return true;} return false;});
   independent.add('infinite second category', function(){try{ak.chiSquaredTestIndependent([1, 2, 3], [1, ak.INFINITY, 3])} catch(e){return true;} return false;});
   independent.add('NaN first category', function(){try{ak.chiSquaredTestIndependent([1, ak.NaN, 3], [1, 2, 3])} catch(e){return true;} return false;});
   independent.add('NaN second category', function(){try{ak.chiSquaredTestIndependent([1, 2, 3], [1, ak.NaN, 3])} catch(e){return true;} return false;});
   independent.add('too few first categories', function(){try{ak.chiSquaredTestIndependent([0, 0, 0], [1, 2, 3])} catch(e){return true;} return false;});
   independent.add('too few second categories', function(){try{ak.chiSquaredTestIndependent([1, 2, 3], [0, 0, 0])} catch(e){return true;} return false;});
   independent.add('dependent samples', function(){return ak.chiSquaredTestIndependent(sample, depend)<0.1;});
   independent.add('independent samples', function(){return ak.chiSquaredTestIndependent(sample, independ)>0.1;});

   chiSquared.add(stat);
   chiSquared.add(test);
   chiSquared.add(non_param);
   chiSquared.add(contingent);
   chiSquared.add(independent);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   chiSquared.add(load);
  }

  akTest.add(chiSquared);
 }

 ak.using('Stats/ChiSquaredTest.js', define);
})();