"use strict";

(function() {
 function define() {
  var clusterMinima = {
   name: 'optimise.clusterMinima',
   body: [],
   add: function(t) {this.body.push(t);}
  };

  try {
   var v00 = ak.vector([-4, -2]);
   var v01 = ak.vector([-2, -1]);
   var v10 = ak.vector([1, 2]);
   var v11 = ak.vector([2, 4]);
   var u0 = ak.multiUniformRnd(v00, v01);
   var u1 = ak.multiUniformRnd(v10, v11);
   var s1 = [];
   var s2 = [];
   var i, y;

   for(i=0;i<100;++i) {
    y = Math.random()-0.5;

    s1.push({x:-2*(Math.random()+1), y:y});
    s1.push({x: 2*(Math.random()+1), y:y});

    s2.push({x:u0(), y:y});
    s2.push({x:u1(), y:y});
   }

   function badClustering() {
    return 0;
   }

   var init = {
    name: 'init',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   init.add('bad clustering algorithm', function(){try{ak.clusterMinima('f1', 5); return false;} catch(e){return true;}});
   init.add('bad s2', function(){try{var f = ak.clusterMinima(ak.kMeansClustering, 5); f('a', 20, 2); return false;} catch(e){return true;}});
   init.add('bad cut off', function(){try{var f = ak.clusterMinima(ak.kMeansClustering, 5); f(s2, 'a', 2); return false;} catch(e){return true;}});
   init.add('bad clusters', function(){try{var f = ak.clusterMinima(ak.kMeansClustering, 5); f(s2, 20, 'a'); return false;} catch(e){return true;}});
   init.add('Non-numeric value', function(){try{var s = s2.slice(0); s.push({x:u1(), y:'a'}); var f = ak.clusterMinima(ak.kMeansClustering, 5); f(s, 20, 2); return false;} catch(e){return true;}});
   init.add('bad clustering', function(){try{var s = s2.slice(0); s.push({x:u1(), y:ak.NaN}); var f = ak.clusterMinima(badClustering); f(s, 20, 2); return false;} catch(e){return true;}});

   var apply = {
    name: 'apply',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   apply.add('uni size', function(){var f = ak.clusterMinima(ak.kMeansClustering, 2); var min = f(s1, 20, 2); return min.length===2;});
   apply.add('uni locations', function(){var f = ak.clusterMinima(ak.kMeansClustering, 2); var min = f(s1, 20, 2); return min[0].x*min[1].x<0;});
   apply.add('multi size', function(){var f = ak.clusterMinima(ak.kMeansClustering, 2); var min = f(s2, 20, 2); return min.length===2;});
   apply.add('multi locations', function(){var f = ak.clusterMinima(ak.kMeansClustering, 2); var min = f(s2, 20, 2); return min[0].x.at(0)*min[1].x.at(0)<0 && min[0].x.at(1)*min[1].x.at(1)<0;});

   clusterMinima.add(init);
   clusterMinima.add(apply);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   clusterMinima.add(load);
  }

  akTest.add(clusterMinima);
 }

 ak.using(['Optimise/ClusterMinima.js', 'Distribution/MultiUniformDistribution.js', 'Cluster/KMeansClustering.js'], define);
})();
