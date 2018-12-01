"use strict";

(function() {
 function define() {
  var blindfoldMinimum = {
   name: 'optimise.blindfoldMinimum',
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
  
   function rt(x) {
    return Math.sqrt(x.at(0)) + Math.sqrt(x.at(1));
   }
  
   var uni = {
    name: 'uni',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   uni.add('def step===2', function(){return ak.dist(ak.blindfoldMinimum(f)(0), 2) < 0.05;});
   uni.add('def steps===2', function(){return ak.dist(ak.blindfoldMinimum(f)(0,0.01), 2) < 0.05;});
   uni.add('few steps!==2', function(){return ak.dist(ak.blindfoldMinimum(f, 10)(0,0.01), 2) > 0.05;});
   uni.add('short steps===2', function(){return ak.dist(ak.blindfoldMinimum(f, 100000)(0,0.0001), 2) < 0.0005;});
   uni.add('uniform rnd step===2', function(){return ak.dist(ak.blindfoldMinimum(f, undefined, ak.uniformRnd(0, 1))(0), 2) < 0.05;});
   uni.add('sqrt', function(){return Math.sqrt(ak.blindfoldMinimum(Math.sqrt)(0.15,0.01))<0.2;});
  
   var multi = {
    name: 'multi',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   multi.add('def step===(2,1)', function(){return ak.dist(ak.blindfoldMinimum(g)(ak.vector([0,0])), ak.vector([2,1])) < 0.05;});
   multi.add('def steps===(2,1)', function(){return ak.dist(ak.blindfoldMinimum(g)(ak.vector([0,0]),0.01), ak.vector([2,1])) < 0.05;});
   multi.add('few steps!==(2,1)', function(){return ak.dist(ak.blindfoldMinimum(g, 10)(ak.vector([0,0]),0.01), ak.vector([2,1])) > 0.05;});
   multi.add('short steps===(2,1)', function(){return ak.dist(ak.blindfoldMinimum(g, 100000)(ak.vector([0,0]),0.0001), ak.vector([2,1])) < 0.0005;});
   multi.add('uniform rnd step===(2,1)', function(){return ak.dist(ak.blindfoldMinimum(g, undefined, ak.uniformRnd(0, 1))(ak.vector([0,0])), ak.vector([2,1])) < 0.05;});
   multi.add('sqrt', function(){return rt(ak.blindfoldMinimum(rt,4096)(ak.vector([0.15,0.15]),0.01))<0.2;});
  
   blindfoldMinimum.add(uni);
   blindfoldMinimum.add(multi);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   blindfoldMinimum.add(load);
  }

  akTest.add(blindfoldMinimum);
 }

 ak.using(['Optimise/BlindfoldMinimum.js', 'Distribution/UniformDistribution.js'], define);

})();
