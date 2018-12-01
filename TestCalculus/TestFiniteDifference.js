"use strict";

(function() {
 function define() {
  var finiteDifference = {
   name: 'calculus.finiteDifference',
   body: [],
   add: function(t) {this.body.push(t);}
  };

  try {
   var forwardDifference = {
    name: 'forwardDifference',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   
   forwardDifference.add('exp', function(){return ak.diff(ak.forwardDifference(Math.exp)(1), ak.E)<10*Math.sqrt(ak.EPSILON);});
   forwardDifference.add('sin', function(){return ak.diff(ak.forwardDifference(Math.sin)(0), 1)<10*Math.sqrt
(ak.EPSILON);});
   forwardDifference.add('cos', function(){return ak.diff(ak.forwardDifference(Math.cos)(0), 0)<10*Math.sqrt(ak.EPSILON);});
   forwardDifference.add('bad_f', function(){try{ak.forwardDifference(1)(0);}catch(e){return true;}return false;});
   forwardDifference.add('bad_e', function(){try{ak.forwardDifference(Math.exp, Math.exp)(0);}catch(e){return true;}return false;});
   forwardDifference.add('neg_e', function(){try{ak.forwardDifference(Math.exp, -1)(0);}catch(e){return true;}return 
false;});
   forwardDifference.add('zero_e', function(){try{ak.forwardDifference(Math.exp, 0)(0);}catch(e){return true;}return false;});
   
   var symmetricDifference = {
    name: 'symmetricDifference',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   
   symmetricDifference.add('exp', function(){return ak.diff(ak.symmetricDifference(Math.exp)(1), ak.E)<10*Math.pow(ak.EPSILON, 1/3);});
   symmetricDifference.add('sin', function(){return ak.diff(ak.symmetricDifference(Math.sin)(0), 1)<10*Math.pow
(ak.EPSILON, 1/3);});
   symmetricDifference.add('cos', function(){return ak.diff(ak.symmetricDifference(Math.cos)(0), 0)<10*Math.pow(ak.EPSILON, 1/3);});
   symmetricDifference.add('bad_f', function(){try{ak.symmetricDifference(1)(0);}catch(e){return true;}return false;});
   symmetricDifference.add('bad_e', function(){try{ak.symmetricDifference(Math.exp, Math.exp)(0);}catch(e){return true;}return false;});
   symmetricDifference.add('neg_e', function(){try{ak.symmetricDifference(Math.exp, -1)(0);}catch(e){return true;}return 
false;});
   symmetricDifference.add('zero_e', function(){try{ak.symmetricDifference(Math.exp, 0)(0);}catch(e){return true;}return false;});
   
   finiteDifference.add(forwardDifference);
   finiteDifference.add(symmetricDifference);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   finiteDifference.add(load);
  }

  akTest.add(finiteDifference);
 }

 ak.using('Calculus/FiniteDifference.js', define);
})();
