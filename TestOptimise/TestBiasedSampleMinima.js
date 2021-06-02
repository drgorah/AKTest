"use strict";

(function() {
 function define() {
  var biasedSampleMinima = {
   name: 'optimise.biasedSampleMinima',
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

   init.add('bad function', function(){try{ak.biasedSampleMinima('f', 1000, clusterMinima, 200, 20, Math.random); return false;} catch(e){return true;}});
   init.add('bad steps', function(){try{ak.biasedSampleMinima(f, 'a', clusterMinima, 200, 20, Math.random); return false;} catch(e){return true;}});
   init.add('negative steps', function(){try{ak.biasedSampleMinima(f, -1000, clusterMinima, 200, 20, Math.random); return false;} catch(e){return true;}});
   init.add('non-integer steps', function(){try{ak.biasedSampleMinima(f, 1000.5, clusterMinima, 200, 20, Math.random); return false;} catch(e){return true;}});
   init.add('bad cluster minima', function(){try{ak.biasedSampleMinima(f, 1000, 'clusterMinima', 200, 20, Math.random); return false;} catch(e){return true;}});
   init.add('bad n', function(){try{ak.biasedSampleMinima(f, 1000, clusterMinima, 'n', 20, Math.random); return false;} catch(e){return true;}});
   init.add('negative n', function(){try{ak.biasedSampleMinima(f, 1000, clusterMinima, -200, 20, Math.random); return false;} catch(e){return true;}});
   init.add('non-integer n', function(){try{ak.biasedSampleMinima(f, 1000, clusterMinima, 200.5, 20, Math.random); return false;} catch(e){return true;}});
   init.add('bad clusters', function(){try{ak.biasedSampleMinima(f, 1000, clusterMinima, 200, 'n', Math.random); return false;} catch(e){return true;}});
   init.add('negative clusters', function(){try{ak.biasedSampleMinima(f, 1000, clusterMinima, 200, -20, Math.random); return false;} catch(e){return true;}});
   init.add('non-integer clusters', function(){try{ak.biasedSampleMinima(f, 1000, clusterMinima, 200, -20, Math.random); return false;} catch(e){return true;}});
   init.add('bad random', function(){try{ak.biasedSampleMinima(f, 1000, clusterMinima, 200, 20, 'rnd'); return false;} catch(e){return true;}});
   init.add('bad lb', function(){try{ak.biasedSampleMinima(f, 1000, clusterMinima, 200, 20, Math.random)('a', 1, 8, 0.1, -1.5); return false;} catch(e){return true;}});
   init.add('bad ub', function(){try{ak.biasedSampleMinima(f, 1000, clusterMinima, 200, 20, Math.random)(0, ak.vector(2, 1), 8, 0.1, -1.5); return false;} catch(e){return true;}});
   init.add('bad k', function(){try{ak.biasedSampleMinima(f, 1000, clusterMinima, 200, 20, Math.random)(-1, 1, 'a', 0.1, 1.5); return false;} catch(e){return true;}});
   init.add('negative k', function(){try{ak.biasedSampleMinima(f, 1000, clusterMinima, 200, 20, Math.random)(-1, 1, -8, 0.1, 1.5); return false;} catch(e){return true;}});
   init.add('non-integer k', function(){try{ak.biasedSampleMinima(f, 1000, clusterMinima, 200, 20, Math.random)(-1, 1, 8.5, 0.1, 1.5); return false;} catch(e){return true;}});
   init.add('bad w', function(){try{ak.biasedSampleMinima(f, 1000, clusterMinima, 200, 20, Math.random)(-1, 1, 8, 'w', 1.5); return false;} catch(e){return true;}});
   init.add('w less than zero', function(){try{ak.biasedSampleMinima(f, 1000, clusterMinima, 200, 20, Math.random)(-1, 1, 8, -1, 1.5); return false;} catch(e){return true;}});
   init.add('w greater than one', function(){try{ak.biasedSampleMinima(f, 1000, clusterMinima, 200, 20, Math.random)(-1, 1, 8, 2, 1.5); return false;} catch(e){return true;}});
   init.add('bad d', function(){try{ak.biasedSampleMinima(f, 1000, clusterMinima, 200, 20, Math.random)(-1, 1, 8, 0.1, 'd'); return false;} catch(e){return true;}});
   init.add('negative d', function(){try{ak.biasedSampleMinima(f, 1000, clusterMinima, 200, 20, Math.random)(-1, 1, 8, 0.1, -1.5); return false;} catch(e){return true;}});

   var apply = {
    name: 'apply',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   apply.add('uni size', function(){var f = ak.biasedSampleMinima(f1, 100, clusterMinima, 20, 2); var min = f(-1, 1, 8, 0.2); return min.length===2;});
   apply.add('uni locations', function(){var f = ak.biasedSampleMinima(f1, 100, clusterMinima, 20, 2); var min = f(-1, 1, 8, 0.2); return min[0].x*min[1].x<0;});
   apply.add('multi size', function(){var f = ak.biasedSampleMinima(f2, 400, clusterMinima, 40, 2); var min = f(ak.vector(2, -1), ak.vector(2, 1), 16, 0.2); return min.length===2;});
   apply.add('multi locations', function(){var f = ak.biasedSampleMinima(f2, 400, clusterMinima, 40, 2); var min = f(ak.vector(2, -1), ak.vector(2, 1), 16, 0.2); return min[0].x.at(0)*min[1].x.at(0)<0 && min[0].x.at(1)*min[1].x.at(1)<0;});

   biasedSampleMinima.add(init);
   biasedSampleMinima.add(apply);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   biasedSampleMinima.add(load);
  }

  akTest.add(biasedSampleMinima);
 }

 ak.using(['Optimise/BiasedSampleMinima.js', 'Matrix/Vector.js', 'Cluster/KMeansClustering.js'], define);
})();
