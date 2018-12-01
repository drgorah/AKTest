"use strict";

(function() {
 function define() {
  var knuthRnd = {
   name: 'random.knuthRnd',
   body: [],
   add: function(t) {this.body.push(t);}
  };

  try {
   function bigKnuth() {
    var x = ak.bignum(1);
    var a = ak.bignum(1664525);
    var m = ak.bignum(4294967296);
    var c = ak.bignum(1013904223);
    var rnd = ak.knuthRnd(1);
    var i, y;
  
    for(i=0;i<10000;++i) {
     x = ak.mod(ak.add(ak.mul(a, x), c), m);
     y = rnd();
     if(y!=x.toNumber()/m.toNumber()) return false;
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
    try {ak.knuthRnd(-1);} catch(e) {result = true;}
    if(!result) return false;
  
    result = false
    try {ak.knuthRnd(0.5);} catch(e) {result = true;}
    if(!result) return false;
  
    result = false
    try {ak.knuthRnd('x');} catch(e) {result = true;}
    if(!result) return false;
  
    return true;
   }
  
   seed.add('invalid seed', invalidSeed);
  
   var sequence = {
    name: 'sequence',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   sequence.add('big Knuth', bigKnuth);
  
   knuthRnd.add(seed);
   knuthRnd.add(sequence);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   knuthRnd.add(load);
  }
  
  akTest.add(knuthRnd);
 }

 ak.using(['Random/KnuthRnd.js', 'Number/Bignum.js'], define);
})();