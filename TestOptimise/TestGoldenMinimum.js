"use strict";

(function() {
 function define() {
  var goldenMinimum = {
   name: 'optimise.goldenMinimum',
   body: [],
   add: function(t) {this.body.push(t);}
  };

  try {
   function quad(x) {
    return 2*x*x - x + 1;
   }
  
   function pos(x) {
    return x;
   }
  
   function neg(x) {
    return -x;
   }
  
   var quad_def = {
    name: 'quadratic default threshold',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   quad_def.add('min(0,1)===0.25', function(){return Math.abs(ak.goldenMinimum(quad)(0,1)-0.25)  < 1e-8;});
   quad_def.add('min(-1,0)===0',   function(){return Math.abs(ak.goldenMinimum(quad)(-1,0))      < 1e-8;});
   quad_def.add('min(0.5,1)===1',  function(){return Math.abs(ak.goldenMinimum(quad)(0.5,1)-0.5) < 1e-8;});
  
   var quad_low = {
    name: 'quadratic low threshold',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   quad_low.add('min(0,1)===0.25', function(){return Math.abs(ak.goldenMinimum(quad, 1e-8)(0,1)-0.25)  < 1e-4});
   quad_low.add('min(-1,0)===0',   function(){return Math.abs(ak.goldenMinimum(quad, 1e-8)(-1,0))      < 1e-4;});
   quad_low.add('min(0.5,1)===1',  function(){return Math.abs(ak.goldenMinimum(quad, 1e-8)(0.5,1)-0.5) < 1e-4;});
  
   var linear = {
    name: 'linear',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   linear.add('min pos(0,1)===0.0', function(){return Math.abs(ak.goldenMinimum(pos)(0,1))       < 1e-8;});
   linear.add('min neg(0,1)===1.0', function(){return Math.abs(ak.goldenMinimum(neg)(0,1) - 1.0) < 1e-8;});
  
   var sqrt = {
    name: 'sqrt',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   sqrt.add('sqrt', function(){return Math.sqrt(ak.goldenMinimum(Math.sqrt)(-1,1)) < 1e-4;});
  
   goldenMinimum.add(quad_def);
   goldenMinimum.add(quad_low);
   goldenMinimum.add(linear);
   goldenMinimum.add(sqrt);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   goldenMinimum.add(load);
  }

  akTest.add(goldenMinimum);
 }

 ak.using('Optimise/GoldenMinimum.js', define);

})();
