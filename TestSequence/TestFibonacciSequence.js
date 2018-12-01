"use strict";

(function() {
 function define() {
  var fibonacciSequence = {
   name: 'sequence.fibonacciSequence',
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
    try {ak.fibonacciSequence(ak.NaN);} catch(e) {result = true;}
    if(!result) return false;
  
    result = false
    try {ak.fibonacciSequence({});} catch(e) {result = true;}
    if(!result) return false;
  
    result = false
    try {ak.fibonacciSequence('5');} catch(e) {result = true;}
    if(!result) return false;
  
    result = false
    try {ak.fibonacciSequence(-1);} catch(e) {result = true;}
    if(!result) return false;
  
    result = false
    try {ak.fibonacciSequence(1.5);} catch(e) {result = true;}
    if(!result) return false;
  
    return true;
   }
  
   args.add('invalid arguments', invalidArgs);
  
   var sequence = {
    name: 'sequence',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   function compare() {
    var seq = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89];
    var i;
  
    for(i=0;i!==seq.length && ak.fibonacciSequence(i)===seq[i];++i);
    return i===seq.length;
   }
  
   sequence.add('compare', compare);
  
   fibonacciSequence.add(args);
   fibonacciSequence.add(sequence);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   fibonacciSequence.add(load);
  }

  akTest.add(fibonacciSequence);
 }

 ak.using('Sequence/FibonacciSequence.js', define);
})();