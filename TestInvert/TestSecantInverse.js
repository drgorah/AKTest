"use strict";

(function() {
 function define() {
  var secantInverse = {
   name: 'invert.secantInverse',
   body: [],
   add: function(t) {this.body.push(t);}
  };

  try {
   var exp_def = {
    name: 'exp default threshold',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   exp_def.add('exp(x)===exp(1.1)', function(){return Math.abs(ak.secantInverse(Math.exp)(Math.exp(1.1))-1.1)<1e-10;});
   exp_def.add('exp(x)===exp(1.1) - hint(0.5)', function(){return Math.abs(ak.secantInverse(Math.exp)(Math.exp(1.1), 0.5)-1.1)<1e-10;});
   exp_def.add('exp(x)===exp(1.1) - hint(1.5)', function(){return Math.abs(ak.secantInverse(Math.exp)(Math.exp(1.1), 1.5)-1.1)<1e-10;});
   exp_def.add('exp(x)===exp(1.1) - hint([0.5, 1.5])', function(){return Math.abs(ak.secantInverse(Math.exp)(Math.exp(1.1), [0.5, 1.5])-1.1)<1e-10;});
  
   var exp_low = {
    name: 'exp low threshold',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   exp_low.add('exp(x)===exp(1.1)', function(){return Math.abs(ak.secantInverse(Math.exp, 1e-6)(Math.exp(1.1))-1.1)<1e-4 && Math.abs(ak.secantInverse(Math.exp, 1e-6)(Math.exp(1.1))-1.1)>1e-10;});
   exp_low.add('exp(x)===exp(1.1) - hint(0.5)', function(){return Math.abs(ak.secantInverse(Math.exp, 1e-6)(Math.exp(1.1), 0.5)-1.1)<1e-4 && Math.abs(ak.secantInverse(Math.exp, 1e-6)(Math.exp(1.1), 0.5)-1.1)>1e-10;});
   exp_low.add('exp(x)===exp(1.1) - hint(1.5)', function(){return Math.abs(ak.secantInverse(Math.exp, 1e-6)(Math.exp(1.1), 1.5)-1.1)<1e-4 && Math.abs(ak.secantInverse(Math.exp, 1e-6)(Math.exp(1.1), 1.5)-1.1)>1e-10;});
   exp_low.add('exp(x)===exp(1.1) - hint([0.5, 1.5])', function(){return Math.abs(ak.secantInverse(Math.exp, 1e-6)(Math.exp(1.1), [0.5, 1.5])-1.1)<1e-4 && Math.abs(ak.secantInverse(Math.exp, 1e-6)(Math.exp(1.1), [0.5, 1.5])-1.1)>1e-10;});
  
   var exp_fail = {
    name: 'exp fail',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   exp_fail.add('exp(x)===-1', function(){try{ak.secantInverse(Math.exp)(-1)}catch(e){return true;} return false;});
  
   secantInverse.add(exp_def);
   secantInverse.add(exp_low);
   secantInverse.add(exp_fail);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   secantInverse.add(load);
  }

  akTest.add(secantInverse);
 }

 ak.using('Invert/SecantInverse.js', define);

})();
