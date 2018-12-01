"use strict";

(function() {
 function define() {
  var congruentialRnd = {
   name: 'random.congruentialRnd',
   body: [],
   add: function(t) {this.body.push(t);}
  };

  try {
   function bigGenerator(a, m, c, rnd) {
    var x = ak.bignum(1);
    var ba = ak.bignum(a);
    var bm = ak.bignum(m);
    var bc = ak.bignum(c);
    var i, y;
  
    for(i=0;i<10000;++i) {
     x = ak.mod(ak.add(ak.mul(ba, x), bc), bm);
     y = rnd();
     if(c!==0 && y!=x.toNumber()/m) return false;
     else if(c===0 && y!=(x.toNumber()-1)/(m-1)) return false;
    }
    return true;
   }
  
   var multiplicative = {
    name: 'multiplicative',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };  
  
   function invalidMultiplicative() {
    var result;
  
    result = false
    try {ak.congruentialRnd(3, 1);} catch(e) {result = true;}
    if(!result) return false;
  
    result = false
    try {ak.congruentialRnd(3, 3);} catch(e) {result = true;}
    if(!result) return false;
  
    result = false
    try {ak.congruentialRnd(3, 9);} catch(e) {result = true;}
    if(!result) return false;
  
    result = false
    try {ak.congruentialRnd('x', 3);} catch(e) {result = true;}
    if(!result) return false;
  
    result = false
    try {ak.congruentialRnd(3, 'x');} catch(e) {result = true;}
    if(!result) return false;
  
    result = false
    try {ak.congruentialRnd(1.5, 3);} catch(e) {result = true;}
    if(!result) return false;
  
    result = false
    try {ak.congruentialRnd(3, 5.5);} catch(e) {result = true;}
    if(!result) return false;
  
    result = false
    try {ak.congruentialRnd(3, ak.INT_MAX*2);} catch(e) {result = true;}
    if(!result) return false;
  
    result = false
    try {ak.congruentialRnd(3, 5, 0, -1);} catch(e) {result = true;}
    if(!result) return false;
  
    result = false
    try {ak.congruentialRnd(3, 5, 0, 0.5);} catch(e) {result = true;}
    if(!result) return false;
  
    result = false
    try {ak.congruentialRnd(3, 5, 0, 'x');} catch(e) {result = true;}
    if(!result) return false;
  
    return true;
   }
  
   function smallMultiplicative() {
    var rnd = ak.congruentialRnd(5, 7, 0, 1);
  
    if(rnd()!==2/3) return false;
    if(rnd()!==1/2) return false;
    if(rnd()!==5/6) return false;
    if(rnd()!==1/6) return false;
    if(rnd()!==1/3) return false;
    if(rnd()!==0) return false;
  
    return true;
   }
  
   function largeMultiplicative() {
    var rnd = ak.congruentialRnd(949062651, 949062671, 0, 1);
    return bigGenerator(949062651, 949062671, 0, rnd);
   }
  
   function recursiveMultiplicative() {
    var rnd = ak.congruentialRnd(949062653, 9007199254740987, 0, 1);
    return bigGenerator(949062653, 9007199254740987, 0, rnd);
   }
  
   multiplicative.add('invalid arguments', invalidMultiplicative);
   multiplicative.add('small', smallMultiplicative);
   multiplicative.add('large', largeMultiplicative);
   multiplicative.add('recursive', recursiveMultiplicative);
  
   var linear = {
    name: 'linear',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   function invalidLinear() {
    var result;
  
    result = false
    try {ak.congruentialRnd(3, 1, 1);} catch(e) {result = true;}
    if(!result) return false;
  
    result = false
    try {ak.congruentialRnd(3, 3, 1);} catch(e) {result = true;}
    if(!result) return false;
  
    result = false
    try {ak.congruentialRnd(3, 5, -1);} catch(e) {result = true;}
    if(!result) return false;
  
    result = false
    try {ak.congruentialRnd(1.5, 5, 1);} catch(e) {result = true;}
    if(!result) return false;
  
    result = false
    try {ak.congruentialRnd(3, 5.5, 1);} catch(e) {result = true;}
    if(!result) return false;
  
    result = false
    try {ak.congruentialRnd(3, ak.INT_MAX*2, 1);} catch(e) {result = true;}
    if(!result) return false;
  
    result = false
    try {ak.congruentialRnd(3, 5, 1.5);} catch(e) {result = true;}
    if(!result) return false;
  
    result = false
    try {ak.congruentialRnd('x', 3, 1);} catch(e) {result = true;}
    if(!result) return false;
  
    result = false
    try {ak.congruentialRnd(3, 'x', 1);} catch(e) {result = true;}
    if(!result) return false;
  
    result = false
    try {ak.congruentialRnd(3, 5, 'x');} catch(e) {result = true;}
    if(!result) return false;
  
    result = false
    try {ak.congruentialRnd(3, 5, 1, -1);} catch(e) {result = true;}
    if(!result) return false;
  
    result = false
    try {ak.congruentialRnd(3, 5, 1, 0.5);} catch(e) {result = true;}
    if(!result) return false;
  
    result = false
    try {ak.congruentialRnd(3, 5, 1, 'x');} catch(e) {result = true;}
    if(!result) return false;
  
    return true;
   }
  
   function tinyLinear() {
    var rnd = ak.congruentialRnd(5, 7, 1, 1);
  
    if(rnd()!==6/7) return false;
    if(rnd()!==3/7) return false;
    if(rnd()!==2/7) return false;
    if(rnd()!==4/7) return false;
    if(rnd()!==0/7) return false;
    if(rnd()!==1/7) return false;
  
    return true;
   }
  
   function smallLinear() {
    var rnd = ak.congruentialRnd(94906264, 94906268, 83585001, 1);
    return bigGenerator(94906264, 94906268, 83585001, rnd);
   }
  
   function largeLinear() {
    var rnd = ak.congruentialRnd(949062651, 949062671, 83585001, 1);
    return bigGenerator(949062651, 949062671, 83585001, rnd);
   }
  
   linear.add('invalid arguments', invalidLinear);
   linear.add('tiny', tinyLinear);
   linear.add('small', smallLinear);
   linear.add('large', largeLinear);
  
   congruentialRnd.add(multiplicative);
   congruentialRnd.add(linear);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   congruentialRnd.add(load);
  }

  akTest.add(congruentialRnd);
 }

 ak.using(['Random/CongruentialRnd.js', 'Number/Bignum.js'], define);
})();