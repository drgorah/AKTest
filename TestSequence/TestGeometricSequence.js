"use strict";

(function() {
 function define() {
  var geometricSequence = {
   name: 'sequence.geometricSequence',
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
    try {ak.geometricSequence(ak.NaN, 1);} catch(e) {result = true;}
    if(!result) return false;
  
    result = false
    try {ak.geometricSequence(ak.INFINITY, 1);} catch(e) {result = true;}
    if(!result) return false;
  
    result = false
    try {ak.geometricSequence({}, 1);} catch(e) {result = true;}
    if(!result) return false;
  
    result = false
    try {ak.geometricSequence('5', 1);} catch(e) {result = true;}
    if(!result) return false;
  
    result = false
    try {ak.geometricSequence(1, ak.NaN);} catch(e) {result = true;}
    if(!result) return false;
  
    result = false
    try {ak.geometricSequence(1, ak.INFINITY);} catch(e) {result = true;}
    if(!result) return false;
  
    result = false
    try {ak.geometricSequence(1, {});} catch(e) {result = true;}
    if(!result) return false;
  
    result = false
    try {ak.geometricSequence(1, '5');} catch(e) {result = true;}
    if(!result) return false;
  
    result = false
    try {ak.geometricSequence(1, 1)(-1);} catch(e) {result = true;}
    if(!result) return false;
  
    result = false
    try {ak.geometricSequence(1, 1)(ak.NaN);} catch(e) {result = true;}
    if(!result) return false;
  
    result = false
    try {ak.geometricSequence(1, 1)('5');} catch(e) {result = true;}
    if(!result) return false;
  
    result = false
    try {ak.geometricSequence(1, 1)({});} catch(e) {result = true;}
    if(!result) return false;
  
    return true;
   }
  
   args.add('invalid arguments', invalidArgs);
  
   var sequence = {
    name: 'sequence',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   function compare(a, r) {
    var geom = ak.geometricSequence(a, r);
    var i = 0;
    var n = 10;
    var x0, x1;
  
    x0 = geom(i);
    if(x0!==a) return false;
  
    while(++i<n) {
     x1 = geom(i);
     if(ak.diff(x1/x0, r)>1e-12) return false;
     x0 = x1;
    }
    return true;
   }
  
   sequence.add('unit ratio', function(){return compare(1, 1) && compare(5, 1);});
   sequence.add('zero first ', function(){return compare(0, 1) && compare(0, 2);});
   sequence.add('non-zero first', function(){return compare(3, 2) && compare(-1.3, 4) && compare(3, -2.4)});
   sequence.add('infinity', function(){return ak.geometricSequence(1, 2)(ak.INFINITY)===ak.INFINITY && ak.geometricSequence(1, 0.5)(ak.INFINITY)===0 && ak.geometricSequence(1, 1)(ak.INFINITY)===1 && ak.geometricSequence(1, -0.5)(ak.INFINITY)===-0 && isNaN(ak.geometricSequence(1, -1)(ak.INFINITY)) && isNaN(ak.geometricSequence(1, -2)(ak.INFINITY));});
  
   geometricSequence.add(args);
   geometricSequence.add(sequence);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   geometricSequence.add(load);
  }

  akTest.add(geometricSequence);
 }

 ak.using('Sequence/GeometricSequence.js', define);
})();