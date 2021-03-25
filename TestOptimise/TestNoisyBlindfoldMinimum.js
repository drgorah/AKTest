"use strict";

(function() {
 function define() {
  var noisyBlindfoldMinimum = {
   name: 'optimise.noisyBlindfoldMinimum',
   body: [],
   add: function(t) {this.body.push(t);}
  };

  try {
   function f(x) {
    return Math.pow(x-2, 2) - 2 + 0.01*(2*Math.random()-1);
   }
  
   function g(x) {
    return Math.pow(x.at(0)-2, 2) + Math.pow(x.at(1)-1, 2) - 2 + 0.01*(2*Math.random()-1);
   }
  
   function sqrt(x) {
    return Math.sqrt(x) + 0.01*(2*Math.random()-1);
   }

   function rt(x) {
    return Math.sqrt(x.at(0)) + Math.sqrt(x.at(1)) + 0.01*(2*Math.random()-1);
   }
  
   var init = {
    name: 'init',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   init.add('bad f', function(){try{ak.noisyblindfoldMinimum(1);}catch(e){return true;} return false;});
   init.add('bad steps', function(){try{ak.noisyblindfoldMinimum(f, 0.99, 'a');}catch(e){return true;} return false;});
   init.add('bad rnd', function(){try{ak.noisyblindfoldMinimum(f, 0.99, 100, 'a');}catch(e){return true;} return false;});
   init.add('bad arg', function(){try{ak.noisyblindfoldMinimum(f)('a', 0.01);}catch(e){return true;} return false;});
   init.add('bad step', function(){try{ak.noisyblindfoldMinimum(f)(1, 'a');}catch(e){return true;} return false;});

   var uni = {
    name: 'uni',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   uni.add('def step===2', function(){return ak.dist(f(ak.noisyBlindfoldMinimum(f)(1)), -2) < 0.05;});
   uni.add('def steps===2', function(){return ak.dist(f(ak.noisyBlindfoldMinimum(f)(1,0.01)), -2) < 0.05;});
   uni.add('uniform rnd step===2', function(){return ak.dist(f(ak.noisyBlindfoldMinimum(f, undefined, ak.uniformRnd(0, 1))(1)), -2) < 0.05;});
   uni.add('sqrt', function(){return Math.sqrt(ak.noisyBlindfoldMinimum(sqrt)(0.15,0.01))<0.2;});
  
   var multi = {
    name: 'multi',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   multi.add('def step===(2,1)', function(){return ak.dist(g(ak.noisyBlindfoldMinimum(g)(ak.vector([1,0]))), -2) < 0.05;});
   multi.add('def steps===(2,1)', function(){return ak.dist(g(ak.noisyBlindfoldMinimum(g)(ak.vector([1,0]),0.01)), -2) < 0.05;});
   multi.add('uniform rnd step===(2,1)', function(){return ak.dist(g(ak.noisyBlindfoldMinimum(g, undefined, ak.uniformRnd(0, 1))(ak.vector([1,0]))), -2) < 0.05;});
   multi.add('sqrt', function(){return rt(ak.noisyBlindfoldMinimum(rt,4096)(ak.vector([0.15,0.15]),0.01))<0.2;});
  
   noisyBlindfoldMinimum.add(init);
   noisyBlindfoldMinimum.add(uni);
   noisyBlindfoldMinimum.add(multi);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   noisyBlindfoldMinimum.add(load);
  }

  akTest.add(noisyBlindfoldMinimum);
 }

 ak.using(['Optimise/NoisyBlindfoldMinimum.js', 'Distribution/UniformDistribution.js'], define);

})();
