"use strict";

(function() {
 function define() {
  var randuRnd = {
   name: 'random.randuRnd',
   body: [],
   add: function(t) {this.body.push(t);}
  };

  try {
   function bigRANDU() {
    var x = ak.bignum(1);
    var a = ak.bignum(65539);
    var m = ak.bignum(2147483648);
    var rnd = ak.randuRnd(1);
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
    try {ak.randuRnd(-1);} catch(e) {result = true;}
    if(!result) return false;
  
    result = false
    try {ak.randuRnd(0.5);} catch(e) {result = true;}
    if(!result) return false;
  
    result = false
    try {ak.randuRnd('x');} catch(e) {result = true;}
    if(!result) return false;
  
    return true;
   }
  
   seed.add('invalid seed', invalidSeed);
  
   var sequence = {
    name: 'sequence',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   sequence.add('big RANDU', bigRANDU);
  
   randuRnd.add(seed);
   randuRnd.add(sequence);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   randuRnd.add(load);
  }
  
  akTest.add(randuRnd);
 }

 ak.using(['Random/RANDURnd.js', 'Number/Bignum.js'], define);
})();