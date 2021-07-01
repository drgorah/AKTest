"use strict";

(function() {
 function define() {
  var biasedSampler = {
   name: 'optimise.biasedSampler',
   body: [],
   add: function(t) {this.body.push(t);}
  };

  try {
   function f1(x) {
    return 2 - Math.exp((x+0.5)*(x+0.5)) - Math.exp((x-0.5)*(x-0.5));
   }

   var l2 = ak.vector(2, -0.5);
   var u2 = ak.vector(2, 0.5);
  
   function f2(x) {
    return 2 - Math.exp(Math.pow(ak.dist(x, l2), 2)) - Math.exp(Math.pow(ak.dist(x, u2), 2));
   }

   var clusterMinima = ak.clusterMinima(ak.kMeansClustering, 2);

   var init = {
    name: 'init',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   init.add('bad function', function(){try{ak.biasedSampler('f', 1000, Math.random); return false;} catch(e){return true;}});
   init.add('bad steps', function(){try{ak.biasedSampler(f, 'a', Math.random); return false;} catch(e){return true;}});
   init.add('negative steps', function(){try{ak.biasedSampler(f, -1000, Math.random); return false;} catch(e){return true;}});
   init.add('non-integer steps', function(){try{ak.biasedSampler(f, 1000.5, Math.random); return false;} catch(e){return true;}});
   init.add('bad random', function(){try{ak.biasedSampler(f, 1000, 'rnd'); return false;} catch(e){return true;}});
   init.add('bad lb', function(){try{ak.biasedSampler(f, 1000, Math.random)('a', 1, 8, 0.1, -1.5); return false;} catch(e){return true;}});
   init.add('bad ub', function(){try{ak.biasedSampler(f, 1000, Math.random)(0, ak.vector(2, 1), 8, 0.1, -1.5); return false;} catch(e){return true;}});
   init.add('bad k', function(){try{ak.biasedSampler(f, 1000, Math.random)(-1, 1, 'a', 0.1, 1.5); return false;} catch(e){return true;}});
   init.add('negative k', function(){try{ak.biasedSampler(f, 1000, Math.random)(-1, 1, -8, 0.1, 1.5); return false;} catch(e){return true;}});
   init.add('non-integer k', function(){try{ak.biasedSampler(f, 1000, Math.random)(-1, 1, 8.5, 0.1, 1.5); return false;} catch(e){return true;}});
   init.add('bad w', function(){try{ak.biasedSampler(f, 1000, Math.random)(-1, 1, 8, 'w', 1.5); return false;} catch(e){return true;}});
   init.add('w less than zero', function(){try{ak.biasedSampler(f, 1000, Math.random)(-1, 1, 8, -1, 1.5); return false;} catch(e){return true;}});
   init.add('w greater than one', function(){try{ak.biasedSampler(f, 1000, Math.random)(-1, 1, 8, 2, 1.5); return false;} catch(e){return true;}});
   init.add('bad d', function(){try{ak.biasedSampler(f, 1000, Math.random)(-1, 1, 8, 0.1, 'd'); return false;} catch(e){return true;}});
   init.add('negative d', function(){try{ak.biasedSampler(f, 1000, Math.random)(-1, 1, 8, 0.1, -1.5); return false;} catch(e){return true;}});

   var apply = {
    name: 'apply',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   apply.add('uni size', function(){var f = ak.biasedSampler(f1, 100); var min = clusterMinima(f(-1, 1, 8, 0.2), 20, 2); return min.length===2;});
   apply.add('uni locations', function(){var f = ak.biasedSampler(f1, 100); var min = clusterMinima(f(-1, 1, 8, 0.2), 20, 2); return min[0].x*min[1].x<0;});
   apply.add('multi size', function(){var f = ak.biasedSampler(f2, 400); var min = clusterMinima(f(ak.vector(2, -1), ak.vector(2, 1), 16, 0.2), 40, 2); return min.length===2;});
   apply.add('multi locations', function(){var f = ak.biasedSampler(f2, 400); var min = clusterMinima(f(ak.vector(2, -1), ak.vector(2, 1), 16, 0.2), 40, 2); return min[0].x.at(0)*min[1].x.at(0)<0 && min[0].x.at(1)*min[1].x.at(1)<0;});

   biasedSampler.add(init);
   biasedSampler.add(apply);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   biasedSampler.add(load);
  }

  akTest.add(biasedSampler);
 }

 ak.using(['Optimise/BiasedSampler.js', 'Optimise/ClusterMinima.js', 'Matrix/Vector.js', 'Cluster/KMeansClustering.js'], define);
})();
