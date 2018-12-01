"use strict";

(function() {
 function define() {
  var arithmeticSeries = {
   name: 'series.arithmeticSeries',
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
    try {ak.arithmeticSeries(ak.NaN, 1);} catch(e) {result = true;}
    if(!result) return false;
  
    result = false
    try {ak.arithmeticSeries(ak.INFINITY, 1);} catch(e) {result = true;}
    if(!result) return false;
  
    result = false
    try {ak.arithmeticSeries({}, 1);} catch(e) {result = true;}
    if(!result) return false;
  
    result = false
    try {ak.arithmeticSeries('5', 1);} catch(e) {result = true;}
    if(!result) return false;
  
    result = false
    try {ak.arithmeticSeries(1, ak.NaN);} catch(e) {result = true;}
    if(!result) return false;
  
    result = false
    try {ak.arithmeticSeries(1, ak.INFINITY);} catch(e) {result = true;}
    if(!result) return false;
  
    result = false
    try {ak.arithmeticSeries(1, {});} catch(e) {result = true;}
    if(!result) return false;
  
    result = false
    try {ak.arithmeticSeries(1, '5');} catch(e) {result = true;}
    if(!result) return false;
  
    result = false
    try {ak.arithmeticSeries(1, 1)(-1);} catch(e) {result = true;}
    if(!result) return false;
  
    result = false
    try {ak.arithmeticSeries(1, 1)(ak.NaN);} catch(e) {result = true;}
    if(!result) return false;
  
    result = false
    try {ak.arithmeticSeries(1, 1)('5');} catch(e) {result = true;}
    if(!result) return false;
  
    result = false
    try {ak.arithmeticSeries(1, 1)({});} catch(e) {result = true;}
    if(!result) return false;
  
    return true;
   }
  
   args.add('invalid arguments', invalidArgs);
  
   var series = {
    name: 'series',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   function compare(a, d) {
    var seq = ak.arithmeticSequence(a, d);
    var ser = ak.arithmeticSeries(a, d);
    var i = 0;
    var n = 1000;
  
    if(ser(i)!==seq(i))	return false;
    while(++i<n) if(ak.diff(ser(i)-ser(i-1), seq(i))>1e-12) return false;
    return true;
   }
  
   series.add('zero first', function(){return compare(0, 3) && compare(0, 5);});
   series.add('zero diff', function(){return compare(3, 0) && compare(5, 0);});
   series.add('zero both', function(){return compare(0, 0);});
   series.add('non-zero diff', function(){return compare(3, 4) && compare(-1.3, 4) && compare(3, -2.4)});
  
   series.add('infinity', function(){return ak.arithmeticSeries( 1,  1)(ak.INFINITY) ===  ak.INFINITY
                                         && ak.arithmeticSeries( 1, -1)(ak.INFINITY) === -ak.INFINITY
                                         && ak.arithmeticSeries(-1,  1)(ak.INFINITY) ===  ak.INFINITY
                                         && ak.arithmeticSeries(-1, -1)(ak.INFINITY) === -ak.INFINITY
                                         && ak.arithmeticSeries( 1,  0)(ak.INFINITY) ===  ak.INFINITY
                                         && ak.arithmeticSeries(-1,  0)(ak.INFINITY) === -ak.INFINITY
                                         && ak.arithmeticSeries( 0,  1)(ak.INFINITY) ===  ak.INFINITY
                                         && ak.arithmeticSeries( 0, -1)(ak.INFINITY) === -ak.INFINITY
                                         && ak.arithmeticSeries( 0,  0)(ak.INFINITY) ===  0});
  
   arithmeticSeries.add(args);
   arithmeticSeries.add(series);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   arithmeticSeries.add(load);
  }

  akTest.add(arithmeticSeries);
 }

 ak.using(['Series/ArithmeticSeries.js', 'Sequence/ArithmeticSequence.js'], define);
})();