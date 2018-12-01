"use strict";

(function() {
 function define() {
  var baysDurhamRnd = {
   name: 'random.baysDurhamRnd',
   body: [],
   add: function(t) {this.body.push(t);}
  };

  try {
   var args = {
    name: 'arguments',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   function invalidArgs() {
    var result;
  
    result = false
    try {ak.baysDurhamRnd();} catch(e) {result = true;}
    if(!result) return false;
  
    result = false
    try {ak.baysDurhamRnd('');} catch(e) {result = true;}
    if(!result) return false;
  
    result = false
    try {ak.baysDurhamRnd(ak.randuRnd(), 'x');} catch(e) {result = true;}
    if(!result) return false;
  
    return true;
   }
  
   args.add('invalid', invalidArgs);
  
   var shuffle = {
    name: 'shuffle',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   function randu() {
    var m = Math.pow(2, 31);
    var rnd = ak.baysDurhamRnd(ak.randuRnd());
    var x0 = rnd();
    var x1 = rnd();
    var x2 = rnd();
    var planes = {};
    var count = 0;
    var i, c;
  
    for(i=0;i<1000;++i) {
     c = (9*x0 - 6*x1 + x2)/m;
     if(!planes[c]) {
      planes[c] = true;
      ++count;
     }
  
     x0 = x1;
     x1 = x2;
     x2 = rnd();
    }
    return count > 15;
   }
  
   shuffle.add('RANDU', randu);
  
   baysDurhamRnd.add(args);
   baysDurhamRnd.add(shuffle);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   baysDurhamRnd.add(load);
  }

  akTest.add(baysDurhamRnd);
 }

 ak.using(['Random/BaysDurhamRnd.js', 'Random/RANDURnd.js'], define);
})();