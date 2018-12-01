"use strict";

(function() {
 function define() {
  var annealMinimum = {
   name: 'optimise.annealMinimum',
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
  
   function ff(x) {
    return Math.sin(x*ak.PI)*Math.exp(x);
   }
  
   function gg(x) {
    return Math.sin(x.at(0)*ak.PI)*Math.exp(x.at(0));
   }
  
   function rt(x) {
    return Math.sqrt(x.at(0)) + Math.sqrt(x.at(1));
   }
  
   var init = {
    name: 'init',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   init.add('bad f', function(){try{ak.annealMinimum(1);}catch(e){return true;} return false;});
   init.add('bad rate', function(){try{ak.annealMinimum(f, 'a');}catch(e){return true;} return false;});
   init.add('bad steps', function(){try{ak.annealMinimum(f, 0.99, 'a');}catch(e){return true;} return false;});
   init.add('bad rnd', function(){try{ak.annealMinimum(f, 0.99, 100, 'a');}catch(e){return true;} return false;});
   init.add('bad arg', function(){try{ak.annealMinimum(f)('a', 1, 0.01);}catch(e){return true;} return false;});
   init.add('bad temp', function(){try{ak.annealMinimum(f)(1, 'a', 0.01);}catch(e){return true;} return false;});
   init.add('bad step', function(){try{ak.annealMinimum(f)(1, 1, 'a');}catch(e){return true;} return false;});

   var uni = {
    name: 'uni',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   uni.add('def step===2', function(){return ak.dist(ak.annealMinimum(f)(0,0.01), 2) < 0.05;});
   uni.add('def steps===2', function(){return ak.dist(ak.annealMinimum(f)(0,0.01,0.01), 2) < 0.05;});
   uni.add('few steps!==2', function(){return ak.dist(ak.annealMinimum(f, 0.99, 10)(0,0.01,0.01), 2) > 0.05;});
   uni.add('short steps===2', function(){return ak.dist(ak.annealMinimum(f, 0.999, 100000)(0,0.01,0.0001), 2) < 0.0001;});
   uni.add('uniform rnd step===2', function(){return ak.dist(ak.annealMinimum(f, 0.99, undefined, ak.uniformRnd(0, 1))(0,0.01), 2) < 0.05;});
   uni.add('sqrt', function(){return Math.sqrt(ak.annealMinimum(Math.sqrt,0.9)(0.15,0.01,0.01))<0.1;});
   uni.add('global', function() {
    var c = 0;
    var i;
  
    for(i=0;i<10;++i) if(ak.annealMinimum(ff, 0.99, 1024)(0,10,0.5)>1) ++c;
    return c>3;
   });
  
   var multi = {
    name: 'multi',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   multi.add('def step===(2,1)', function(){return ak.dist(ak.annealMinimum(g)(ak.vector([0,0]),0.01), ak.vector([2,1])) < 0.05;});
   multi.add('def steps===(2,1)', function(){return ak.dist(ak.annealMinimum(g)(ak.vector([0,0]),0.01,0.01), ak.vector([2,1])) < 0.05;});
   multi.add('few steps!==(2,1)', function(){return ak.dist(ak.annealMinimum(g, 0.99, 10)(ak.vector([0,0]),0.01,0.01), ak.vector([2,1])) > 0.05;});
   multi.add('short steps===(2,1)', function(){return ak.dist(ak.annealMinimum(g, 0.999, 100000)(ak.vector([0,0]),0.01,0.0001), ak.vector([2,1])) < 0.0001;});
   multi.add('uniform rnd step===(2,1)', function(){return ak.dist(ak.annealMinimum(g, 0.99, undefined, ak.uniformRnd(0, 1))(ak.vector([0,0]),0.01), ak.vector([2,1])) < 0.05;});
   multi.add('sqrt', function(){return rt(ak.annealMinimum(rt,0.9,4096)(ak.vector([0.15,0.15]),0.01,0.01))<0.2;});
   multi.add('global', function() {
    var c = 0;
    var i;
  
    for(i=0;i<10;++i) if(ak.annealMinimum(gg, 0.99, 2048)(ak.vector([0]),10,0.5).at(0)>1) ++c;
    return c>3;
   });
  
   annealMinimum.add(init);
   annealMinimum.add(uni);
   annealMinimum.add(multi);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   annealMinimum.add(load);
  }

  akTest.add(annealMinimum);
 }

 ak.using(['Optimise/AnnealMinimum.js', 'Distribution/UniformDistribution.js'], define);

})();
