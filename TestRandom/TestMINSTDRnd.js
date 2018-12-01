"use strict";

(function() {
 function define() {
  var minstdRnd = {
   name: 'random.minstdRnd',
   body: [],
   add: function(t) {this.body.push(t);}
  };

  try {
   function bigMINSTD1() {
    var x = ak.bignum(1);
    var a = ak.bignum(16807);
    var m = ak.bignum(2147483647);
    var rnd = ak.minstd1Rnd(1);
    var i, y;
  
    for(i=0;i<10000;++i) {
     x = ak.mod(ak.mul(a, x), m);
     y = rnd();
     if(y!=(x.toNumber()-1)/(m.toNumber()-1)) return false;
    }
    return true;
   }
  
   function bigMINSTD2() {
    var x = ak.bignum(1);
    var a = ak.bignum(48271);
    var m = ak.bignum(2147483647);
    var rnd = ak.minstd2Rnd(1);
    var i, y;
  
    for(i=0;i<10000;++i) {
     x = ak.mod(ak.mul(a, x), m);
     y = rnd();
     if(y!=(x.toNumber()-1)/(m.toNumber()-1)) return false;
    }
    return true;
   }
  
   function bigMINSTD() {
    var x = ak.bignum(1);
    var a = ak.bignum(48271);
    var m = ak.bignum(2147483647);
    var rnd = ak.minstdRnd(1);
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
    try {ak.minstd1Rnd(-1);} catch(e) {result = true;}
    if(!result) return false;
  
    result = false
    try {ak.minstd1Rnd(0.5);} catch(e) {result = true;}
    if(!result) return false;
  
    result = false
    try {ak.minstd1Rnd('x');} catch(e) {result = true;}
    if(!result) return false;
  
    result = false
    try {ak.minstd2Rnd(-1);} catch(e) {result = true;}
    if(!result) return false;
  
    result = false
    try {ak.minstd2Rnd(0.5);} catch(e) {result = true;}
    if(!result) return false;
  
    result = false
    try {ak.minstd2Rnd('x');} catch(e) {result = true;}
    if(!result) return false;
  
    result = false
    try {ak.minstdRnd(-1);} catch(e) {result = true;}
    if(!result) return false;
  
    result = false
    try {ak.minstdRnd(0.5);} catch(e) {result = true;}
    if(!result) return false;
  
    result = false
    try {ak.minstdRnd('x');} catch(e) {result = true;}
    if(!result) return false;
  
    return true;
   }
  
   seed.add('invalid seed', invalidSeed);
  
   var sequence = {
    name: 'sequence',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   sequence.add('big MINSTD1', bigMINSTD1);
   sequence.add('big MINSTD2', bigMINSTD2);
   sequence.add('big MINSTD', bigMINSTD);
  
   minstdRnd.add(seed);
   minstdRnd.add(sequence);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   minstdRnd.add(load);
  }
  
  akTest.add(minstdRnd);
 }

 ak.using(['Random/MINSTDRnd.js', 'Number/Bignum.js'], define);
})();