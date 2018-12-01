"use strict";

(function() {
 function define() {
  var fibonacciSeries = {
   name: 'series.fibonacciSeries',
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
    try {ak.fibonacciSeries(ak.NaN);} catch(e) {result = true;}
    if(!result) return false;
  
    result = false
    try {ak.fibonacciSeries({});} catch(e) {result = true;}
    if(!result) return false;
  
    result = false
    try {ak.fibonacciSeries('5');} catch(e) {result = true;}
    if(!result) return false;
  
    result = false
    try {ak.fibonacciSeries(-1);} catch(e) {result = true;}
    if(!result) return false;
  
    result = false
    try {ak.fibonacciSeries(1.5);} catch(e) {result = true;}
    if(!result) return false;
  
    return true;
   }
  
   args.add('invalid arguments', invalidArgs);
  
   var series = {
    name: 'series',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   function compare() {
    var seq = ak.fibonacciSequence;
    var ser = ak.fibonacciSeries;
    var i = 0;
    var n = 1000;
  
    if(ser(i)!==seq(i))	return false;
    while(++i<n) if(ak.diff(ser(i)-ser(i-1), seq(i))>1e-12) return false;
    return true;
   }
  
   series.add('compare', compare);
  
   fibonacciSeries.add(args);
   fibonacciSeries.add(series);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   fibonacciSeries.add(load);
  }

  akTest.add(fibonacciSeries);
 }

 ak.using(['Series/FibonacciSeries.js', 'Sequence/FibonacciSequence.js'], define);
})();