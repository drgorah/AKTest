"use strict";

(function() {
 function define() {
  var polytopeMinimum = {
   name: 'optimise.polytopeMinimum',
   body: [],
   add: function(t) {this.body.push(t);}
  };

  try {
   function rosenbrock(x) {
    var l = 1-x.at(0);
    var r = x.at(1)-x.at(0)*x.at(0);
  
    return l*l + 100*r*r;
   }
  
   function quad(x) {
    var x0 = x.at(0)-1;
    var x1 = x.at(1)-1;
    return x0*x0 + x1*x1;
   }
  
   function rt(x) {
    return Math.sqrt(x.at(0)) + Math.sqrt(x.at(1));
   }
  
   var ros_def = {
    name: 'rosenbrock default threshold',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   ros_def.add('min(4,4)', function(){return ak.diff(ak.polytopeMinimum(rosenbrock)(ak.vector([4,4]), 0.1), ak.vector([1,1])) < 1e-5;});
   ros_def.add('min(-4,-4)', function(){return ak.diff(ak.polytopeMinimum(rosenbrock)(ak.vector([-4,-4]), 0.1), ak.vector([1,1])) < 1e-5;});
  
   var ros_low = {
    name: 'rosenbrock low threshold',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   ros_low.add('min(4,4)', function(){return ak.diff(ak.polytopeMinimum(rosenbrock, 1e-5)(ak.vector([4,4]), 0.1), ak.vector([1,1])) < 1e-2 && ak.diff(ak.polytopeMinimum(rosenbrock, 1e-5)(ak.vector([4,4], 0.1)), ak.vector([1,1])) > 1e-5;});
   ros_low.add('min(-4,-4)', function(){return ak.diff(ak.polytopeMinimum(rosenbrock, 1e-5)(ak.vector([-4,-4]), 0.1), ak.vector([1,1])) < 1e-2 && ak.diff(ak.polytopeMinimum(rosenbrock, 1e-5)(ak.vector([-4,-4], 0.1)), ak.vector([1,1])) > 1e-5;});
  
   var quad_def = {
    name: 'quadratic default threshold',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   quad_def.add('min(4,4)', function(){return ak.diff(ak.polytopeMinimum(quad)(ak.vector([4,4]), 0.1), ak.vector([1,1])) < 1e-5;});
   quad_def.add('min(-4,-4)', function(){return ak.diff(ak.polytopeMinimum(quad)(ak.vector([-4,-4]), 0.1), ak.vector([1,1])) < 1e-5;});
  
   var quad_low = {
    name: 'quadratic low threshold',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   quad_low.add('min(4,4)', function(){return ak.diff(ak.polytopeMinimum(quad, 1e-5)(ak.vector([4,4]), 0.1), ak.vector([1,1])) < 1e-2 && ak.diff(ak.polytopeMinimum(quad, 1e-5)(ak.vector([4,4], 0.1)), ak.vector([1,1])) > 1e-5;});
   quad_low.add('min(-4,-4)', function(){return ak.diff(ak.polytopeMinimum(quad, 1e-5)(ak.vector([-4,-4]), 0.1), ak.vector([1,1])) < 1e-2 && ak.diff(ak.polytopeMinimum(quad, 1e-5)(ak.vector([-4,-4], 0.1)), ak.vector([1,1])) > 1e-5;});
  
   var sqrt = {
    name: 'sqrt',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   sqrt.add('min(0,0)', function(){return rt(ak.polytopeMinimum(rt, 1e-5)(ak.vector([0,0]), 0.1)) < 0.01;});
  
   polytopeMinimum.add(ros_def);
   polytopeMinimum.add(ros_low);
   polytopeMinimum.add(quad_def);
   polytopeMinimum.add(quad_low);
   polytopeMinimum.add(sqrt);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   polytopeMinimum.add(load);
  }

  akTest.add(polytopeMinimum);
 }

 ak.using('Optimise/PolytopeMinimum.js', define);

})();
