"use strict";

(function() {
 function define() {
  var noisyAnnealMinimum = {
   name: 'optimise.noisyAnnealMinimum',
   body: [],
   add: function(t) {this.body.push(t);}
  };

  try {
   function f(x) {
    //!! add noise
    return Math.pow(x-2, 2) - 2 + 0.01*(2*Math.random()-1);
   }
  
   function g(x) {
    //!! add noise
    return Math.pow(x.at(0)-2, 2) + Math.pow(x.at(1)-1, 2) - 2 + 0.01*(2*Math.random()-1);
   }
  
   function ff(x) {
    //!! add noise
    return Math.sin(x*ak.PI)*Math.exp(x) + 0.01*(2*Math.random()-1);
   }
  
   function gg(x) {
    //!! add noise
    return Math.sin(x.at(0)*ak.PI)*Math.exp(x.at(0)) + 0.01*(2*Math.random()-1);
   }

   function sqrt(x) {
    //!! add noise
    return Math.sqrt(x) + 0.01*(2*Math.random()-1);
   }
  
   function rt(x) {
    //!! add noise
    return Math.sqrt(x.at(0)) + Math.sqrt(x.at(1)) + 0.01*(2*Math.random()-1);
   }
  
   var init = {
    name: 'init',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   init.add('bad f', function(){try{ak.noisyAnnealMinimum(1);}catch(e){return true;} return false;});
   init.add('bad rate', function(){try{ak.noisyAnnealMinimum(f, 'a');}catch(e){return true;} return false;});
   init.add('bad steps', function(){try{ak.noisyAnnealMinimum(f, 0.99, 'a');}catch(e){return true;} return false;});
   init.add('bad rnd', function(){try{ak.noisyAnnealMinimum(f, 0.99, 100, 'a');}catch(e){return true;} return false;});
   init.add('bad arg', function(){try{ak.noisyAnnealMinimum(f)('a', 1, 0.01);}catch(e){return true;} return false;});
   init.add('bad temp', function(){try{ak.noisyAnnealMinimum(f)(1, 'a', 0.01);}catch(e){return true;} return false;});
   init.add('bad step', function(){try{ak.noisyAnnealMinimum(f)(1, 1, 'a');}catch(e){return true;} return false;});

   var uni = {
    name: 'uni',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   uni.add('def step===2', function(){return ak.dist(f(ak.noisyAnnealMinimum(f)(1,0.01)), -2) < 0.05;});
   uni.add('def steps===2', function(){return ak.dist(f(ak.noisyAnnealMinimum(f)(1,0.01,0.01)), -2) < 0.05;});
   uni.add('uniform rnd step===2', function(){return ak.dist(f(ak.noisyAnnealMinimum(f, 0.99, undefined, ak.uniformRnd(0, 1))(1,0.01)), -2) < 0.05;});
   uni.add('sqrt', function(){return Math.sqrt(ak.noisyAnnealMinimum(sqrt,0.9)(0.15,0.01,0.01))<0.2;});
   uni.add('global', function() {
    var c = 0;
    var i;
  
    for(i=0;i<10;++i) if(ak.noisyAnnealMinimum(ff, 0.99, 1024)(0,10,0.5)>1) ++c;
    return c>3;
   });
  
   var multi = {
    name: 'multi',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   multi.add('def step===(2,1)', function(){return ak.dist(g(ak.noisyAnnealMinimum(g)(ak.vector([1,0]),0.01)), -2) < 0.05;});
   multi.add('def steps===(2,1)', function(){return ak.dist(g(ak.noisyAnnealMinimum(g)(ak.vector([1,0]),0.01,0.01)), -2) < 0.05;});
   multi.add('uniform rnd step===(2,1)', function(){return ak.dist(g(ak.noisyAnnealMinimum(g, 0.99, undefined, ak.uniformRnd(0, 1))(ak.vector([1,0]),0.01)), -2) < 0.05;});
   multi.add('sqrt', function(){return rt(ak.noisyAnnealMinimum(rt,0.9,4096)(ak.vector([0.15,0.15]),0.01,0.01))<0.2;});
   multi.add('global', function() {
    var c = 0;
    var i;
  
    for(i=0;i<10;++i) if(ak.noisyAnnealMinimum(gg, 0.99, 2048)(ak.vector([0]),10,0.5).at(0)>1) ++c;
    return c>3;
   });
  
   noisyAnnealMinimum.add(init);
   noisyAnnealMinimum.add(uni);
   noisyAnnealMinimum.add(multi);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   noisyAnnealMinimum.add(load);
  }

  akTest.add(noisyAnnealMinimum);
 }

 ak.using(['Optimise/NoisyAnnealMinimum.js', 'Distribution/UniformDistribution.js'], define);

})();
