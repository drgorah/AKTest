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

   test.add('non-array observed', function(){try{ak.chiSquaredTest('a', [1, 1])} catch(e){return true;} return false;});
   test.add('non-number observed', function(){try{ak.chiSquaredTest([1, 'a'], [1, 1])} catch(e){return true;} return false;});
   test.add('no observed', function(){try{ak.chiSquaredTest([0, 0], [1, 1])} catch(e){return true;} return false;});
   test.add('NaN observed', function(){try{ak.chiSquaredTest([1, ak.NaN], [1, 1])} catch(e){return true;} return false;});
   test.add('infinite observed', function(){try{ak.chiSquaredTest([1, ak.INFINITY], [1, 1])} catch(e){return true;} return false;});
   test.add('negative observed', function(){try{ak.chiSquaredTest([1, -1], [1, 1])} catch(e){return true;} return false;});
   test.add('non-array expected', function(){try{ak.chiSquaredTest([1, 1], 'a')} catch(e){return true;} return false;});
   test.add('non-number expected', function(){try{ak.chiSquaredTest([1, 1], [1, 'a'])} catch(e){return true;} return false;});
   test.add('no expected', function(){try{ak.chiSquaredTest([1, 1], [0, 0])} catch(e){return true;} return false;});
   test.add('NaN expected', function(){try{ak.chiSquaredTest([1, 1], [1, ak.NaN])} catch(e){return true;} return false;});
   test.add('infinite expected', function(){try{ak.chiSquaredTest([1, 1], [1, ak.INFINITY])} catch(e){return true;} return false;});
   test.add('negative expected', function(){try{ak.chiSquaredTest([1, 1], [1, -1])} catch(e){return true;} return false;});
   test.add('too few samples', function(){try{ak.chiSquaredTest([1], [1])} catch(e){return true;} return false;});
   test.add('observed/expected size mismatch', function(){try{ak.chiSquaredTest([1, 1, 1], [1, 1])} catch(e){return true;} return false;});
   test.add('failing sample', function(){return ak.chiSquaredTest(failing, expected)<0.25;});
   test.add('passing sample', function(){return ak.chiSquaredTest(passing, expected)>0.95;});
  
   chiSquared.add(stat);
   chiSquared.add(test);
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