"use strict";

(function() {
 function define() {
  var ranfRnd = {
   name: 'random.ranfRnd',
   body: [],
   add: function(t) {this.body.push(t);}
  };

  try {
   function bigRANF() {
    var x = ak.bignum(1);
    var a = ak.bignum(44485709377909);
    var m = ak.bignum(281474976710656);
    var rnd = ak.ranfRnd(1);
    var i, y;
  
    for(i=0;i<10000;++i) {
     x = ak.mod(ak.mul(a, x), m);
     y = rnd();
     if(y!=(x.toNumber()-1)/(m.toNumber()-1)) return false;
    }
    return true;
   }
  
   var seed = {
    name: 'seed',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   function invalidSeed() {
    var result;
  
    result = false
    try {ak.ranfRnd(-1);} catch(e) {result = true;}
    if(!result) return false;
  
    result = false
    try {ak.ranfRnd(0.5);} catch(e) {result = true;}
    if(!result) return false;
  
    result = false
    try {ak.ranfRnd('x');} catch(e) {result = true;}
    if(!result) return false;
  
    return true;
   }
  
   seed.add('invalid seed', invalidSeed);
  
   var sequence = {
    name: 'sequence',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   sequence.add('big RANF', bigRANF);
  
   ranfRnd.add(seed);
   ranfRnd.add(sequence);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   ranfRnd.add(load);
  }
  
  akTest.add(ranfRnd);
 }

 ak.using(['Random/RANFRnd.js', 'Number/Bignum.js'], define);
})();