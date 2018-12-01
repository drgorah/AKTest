"use strict";

(function() {
 function define() {
  var geneticMinimum = {
   name: 'optimise.geneticMinimum',
   body: [],
   add: function(t) {this.body.push(t);}
  };

  try {
   function f(x) {
    return Math.pow(x-2, 2) - 2;
   }
  
   function g(x) {
    return Math.pow(x.at(0)-2, 2) + Math.pow(x.at(1)-1, 2) - 2;
   }

   var init = {
    name: 'init',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   init.add('bad f', function(){try{ak.geneticMinimum(1);}catch(e){return true;} return false;});
   init.add('bad size', function(){try{ak.geneticMinimum(f, 'a');}catch(e){return true;} return false;});
   init.add('bad cross', function(){try{ak.geneticMinimum(f, 10, 'a');}catch(e){return true;} return false;});
   init.add('low cross', function(){try{ak.geneticMinimum(f, 10, -1);}catch(e){return true;} return false;});
   init.add('high cross', function(){try{ak.geneticMinimum(f, 10, 2);}catch(e){return true;} return false;});
   init.add('bad mutate', function(){try{ak.geneticMinimum(f, 10, 0.6, 'a');}catch(e){return true;} return false;});
   init.add('low mutate', function(){try{ak.geneticMinimum(f, 10, 0.6, -1);}catch(e){return true;} return false;});
   init.add('high mutate', function(){try{ak.geneticMinimum(f, 10, 0.6, 2);}catch(e){return true;} return false;});
   init.add('bad pressure', function(){try{ak.geneticMinimum(f, 10, 0.6, 0.01, 'a');}catch(e){return true;} return false;});
   init.add('low pressure', function(){try{ak.geneticMinimum(f, 10, 0.6, 0.01, -1);}catch(e){return true;} return false;});
   init.add('high pressure', function(){try{ak.geneticMinimum(f, 10, 0.6, 0.01, 2);}catch(e){return true;} return false;});
   init.add('bad rnd', function(){try{ak.geneticMinimum(f, 10, 0.6, 0.01, 0.9, 'a');}catch(e){return true;} return false;});
   init.add('bad lb', function(){try{ak.geneticMinimum(f)('a', 1, 100);}catch(e){return true;} return false;});
   init.add('bad ub', function(){try{ak.geneticMinimum(f)(1, 'a', 100);}catch(e){return true;} return false;});
   init.add('bad uni length', function(){try{ak.geneticMinimum(f)(1, 2, 'a');}catch(e){return true;} return false;});
   init.add('bad multi length', function(){try{ak.geneticMinimum(f)(ak.vector(2, 1), ak.vector(2, 2), 'a');}catch(e){return true;} return false;});
   init.add('long uni length', function(){try{ak.geneticMinimum(f)(1, 2, 33);}catch(e){return true;} return false;});
   init.add('long multi length', function(){try{ak.geneticMinimum(f)(ak.vector(2, 1), ak.vector(2, 2), [1, 33]);}catch(e){return true;} return false;});

   var uni = {
    name: 'uni',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   uni.add('defaults', function(){return ak.dist(ak.geneticMinimum(f)(-4,4,18), 2) < 0.05;});
   uni.add('pop=100', function(){return ak.dist(ak.geneticMinimum(f, 100)(-4,4,18), 2) < 0.05;});
   uni.add('cross=0.8', function(){return ak.dist(ak.geneticMinimum(f, 50, 0.8)(-4,4,18), 2) < 0.05;});
   uni.add('mutate=0.05', function(){return ak.dist(ak.geneticMinimum(f, 50, 0.6, 0.05)(-4,4,18), 2) < 0.05;});
   uni.add('pressure=0.5', function(){return ak.dist(ak.geneticMinimum(f, 50, 0.6, 0.01, 0.5)(-4,4,18), 2) < 0.05;});
   uni.add('steps=200', function(){return ak.dist(ak.geneticMinimum(f, 50, 0.6, 0.01, 0.75, 200)(-4,4,18), 2) < 0.05;});
   uni.add('rnd=uniform', function(){return ak.dist(ak.geneticMinimum(f, 50, 0.6, 0.01, 0.75, 100, ak.uniformRnd(0, 1))(-4,4,18), 2) < 0.05;});

   var multi = {
    name: 'multi',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   multi.add('defaults', function(){return ak.dist(ak.geneticMinimum(g)(ak.vector(2, -4),ak.vector(2, 4),18), ak.vector([2,1])) < 0.05;});
   multi.add('pop=100', function(){return ak.dist(ak.geneticMinimum(g, 100)(ak.vector(2, -4),ak.vector(2, 4),18), ak.vector([2,1])) < 0.05;});
   multi.add('cross=0.8', function(){return ak.dist(ak.geneticMinimum(g, 50, 0.8)(ak.vector(2, -4),ak.vector(2, 4),18), ak.vector([2,1])) < 0.05;});
   multi.add('mutate=0.05', function(){return ak.dist(ak.geneticMinimum(g, 50, 0.6, 0.05)(ak.vector(2, -4),ak.vector(2, 4),[18,18]), ak.vector([2,1])) < 0.05;});
   multi.add('pressure=0.5', function(){return ak.dist(ak.geneticMinimum(g, 50, 0.6, 0.01, 0.5)(ak.vector(2, -4),ak.vector(2, 4),[18,18]), ak.vector([2,1])) < 0.05;});
   multi.add('steps=200', function(){return ak.dist(ak.geneticMinimum(g, 50, 0.6, 0.01, 0.75, 200)(ak.vector(2, -4),ak.vector(2, 4),[18,18]), ak.vector([2,1])) < 0.05;});
   multi.add('rnd=uniform', function(){return ak.dist(ak.geneticMinimum(g, 50, 0.6, 0.01, 0.75, 100, ak.uniformRnd(0, 1))(ak.vector(2, -4),ak.vector(2, 4),[18,18]), ak.vector([2,1])) < 0.05;});

   geneticMinimum.add(init);
   geneticMinimum.add(uni);
   geneticMinimum.add(multi);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   geneticMinimum.add(load);
  }

  akTest.add(geneticMinimum);
 }

 ak.using(['Optimise/GeneticMinimum.js', 'Distribution/UniformDistribution.js'], define);

})();
