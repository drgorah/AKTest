"use strict";

(function() {
 function define() {
  var haltonSequence = {
   name: 'sequence.haltonSequence',
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
    try {ak.haltonSequence(ak.NaN);} catch(e) {result = true;}
    if(!result) return false;
  
    result = false
    try {ak.haltonSequence(ak.INFINITY);} catch(e) {result = true;}
    if(!result) return false;
  
    result = false
    try {ak.haltonSequence({});} catch(e) {result = true;}
    if(!result) return false;
  
    result = false
    try {ak.haltonSequence('5');} catch(e) {result = true;}
    if(!result) return false;
  
    result = false
    try {ak.haltonSequence(-1);} catch(e) {result = true;}
    if(!result) return false;
  
    result = false
    try {ak.haltonSequence(1);} catch(e) {result = true;}
    if(!result) return false;
  
    result = false
    try {ak.haltonSequence(1.5);} catch(e) {result = true;}
    if(!result) return false;
  
    result = false
    try {ak.haltonSequence(5)(ak.NaN);} catch(e) {result = true;}
    if(!result) return false;
  
    result = false
    try {ak.haltonSequence(5)({});} catch(e) {result = true;}
    if(!result) return false;
  
    result = false
    try {ak.haltonSequence(5)('5');} catch(e) {result = true;}
    if(!result) return false;
  
    result = false
    try {ak.haltonSequence(5)(-1);} catch(e) {result = true;}
    if(!result) return false;
  
    result = false
    try {ak.haltonSequence(5)(1.5);} catch(e) {result = true;}
    if(!result) return false;
  
    return true;
   }
  
   args.add('invalid arguments', invalidArgs);
  
   var sequence = {
    name: 'sequence',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   function test2() {
    var halton = ak.haltonSequence(2);
    var seq = [0, 1/2, 1/4, 3/4, 1/8, 5/8, 3/8, 7/8];
    var i;
  
    for(i=0;i<seq.length && ak.diff(halton(i), seq[i])<1e-12;++i);
    return i===seq.length;
   }
  
   function test3() {
    var halton = ak.haltonSequence(3);
    var seq = [0, 1/3, 2/3, 1/9, 4/9, 7/9, 2/9, 5/9, 8/9];
    var i;
  
    for(i=0;i<seq.length && ak.diff(halton(i), seq[i])<1e-12;++i);
    return i===seq.length;
   }
  
   sequence.add('two', test2);
   sequence.add('three', test3);
   sequence.add('infinity', function(){return ak.haltonSequence(5)(ak.INFINITY)===1;});
  
   haltonSequence.add(args);
   haltonSequence.add(sequence);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   haltonSequence.add(load);
  }

  akTest.add(haltonSequence);
 }

 ak.using('Sequence/HaltonSequence.js', define);
})();