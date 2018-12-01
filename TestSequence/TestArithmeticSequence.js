"use strict";

(function() {
 function define() {
  var arithmeticSequence = {
   name: 'sequence.arithmeticSequence',
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
    try {ak.arithmeticSequence(ak.NaN, 1);} catch(e) {result = true;}
    if(!result) return false;
  
    result = false
    try {ak.arithmeticSequence(ak.INFINITY, 1);} catch(e) {result = true;}
    if(!result) return false;
  
    result = false
    try {ak.arithmeticSequence({}, 1);} catch(e) {result = true;}
    if(!result) return false;
  
    result = false
    try {ak.arithmeticSequence('5', 1);} catch(e) {result = true;}
    if(!result) return false;
  
    result = false
    try {ak.arithmeticSequence(1, ak.NaN);} catch(e) {result = true;}
    if(!result) return false;
  
    result = false
    try {ak.arithmeticSequence(1, ak.INFINITY);} catch(e) {result = true;}
    if(!result) return false;
  
    result = false
    try {ak.arithmeticSequence(1, {});} catch(e) {result = true;}
    if(!result) return false;
  
    result = false
    try {ak.arithmeticSequence(1, '5');} catch(e) {result = true;}
    if(!result) return false;
  
    result = false
    try {ak.arithmeticSequence(1, 1)(-1);} catch(e) {result = true;}
    if(!result) return false;
  
    result = false
    try {ak.arithmeticSequence(1, 1)(ak.NaN);} catch(e) {result = true;}
    if(!result) return false;
  
    result = false
    try {ak.arithmeticSequence(1, 1)('5');} catch(e) {result = true;}
    if(!result) return false;
  
    result = false
    try {ak.arithmeticSequence(1, 1)({});} catch(e) {result = true;}
    if(!result) return false;
  
    return true;
   }
  
   args.add('invalid arguments', invalidArgs);
  
   var sequence = {
    name: 'sequence',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   function compare(a, d) {
    var arith = ak.arithmeticSequence(a, d);
    var i = 0;
    var n = 1000;
    var x0, x1;
  
    x0 = arith(i);
    if(x0!==a) return false;
  
    while(++i<n) {
     x1 = arith(i);
     if(ak.diff(x1-x0, d)>1e-12) return false;
     x0 = x1;
    }
    return true;
   }
  
   sequence.add('zero diff', function(){return compare(0, 0) && compare(5, 0);});
   sequence.add('non-zero diff', function(){return compare(3, 4) && compare(-1.3, 4) && compare(3, -2.4)});
   sequence.add('infinity', function(){return ak.arithmeticSequence(0, 1)(ak.INFINITY)===ak.INFINITY && ak.arithmeticSequence(0, -1)(ak.INFINITY)===-ak.INFINITY && ak.arithmeticSequence(0, 0)(ak.INFINITY)===0});
  
   arithmeticSequence.add(args);
   arithmeticSequence.add(sequence);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   arithmeticSequence.add(load);
  }

  akTest.add(arithmeticSequence);
 }

 ak.using('Sequence/ArithmeticSequence.js', define);
})();