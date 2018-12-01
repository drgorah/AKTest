"use strict";

(function() {
 function define() {
  var geometricSeries = {
   name: 'series.geometricSeries',
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
    try {ak.geometricSeries(ak.NaN, 1);} catch(e) {result = true;}
    if(!result) return false;
  
    result = false
    try {ak.geometricSeries(ak.INFINITY, 1);} catch(e) {result = true;}
    if(!result) return false;
  
    result = false
    try {ak.geometricSeries({}, 1);} catch(e) {result = true;}
    if(!result) return false;
  
    result = false
    try {ak.geometricSeries('5', 1);} catch(e) {result = true;}
    if(!result) return false;
  
    result = false
    try {ak.geometricSeries(1, ak.NaN);} catch(e) {result = true;}
    if(!result) return false;
  
    result = false
    try {ak.geometricSeries(1, ak.INFINITY);} catch(e) {result = true;}
    if(!result) return false;
  
    result = false
    try {ak.geometricSeries(1, {});} catch(e) {result = true;}
    if(!result) return false;
  
    result = false
    try {ak.geometricSeries(1, '5');} catch(e) {result = true;}
    if(!result) return false;
  
    result = false
    try {ak.geometricSeries(1, 1)(-1);} catch(e) {result = true;}
    if(!result) return false;
  
    result = false
    try {ak.geometricSeries(1, 1)(ak.NaN);} catch(e) {result = true;}
    if(!result) return false;
  
    result = false
    try {ak.geometricSeries(1, 1)('5');} catch(e) {result = true;}
    if(!result) return false;
  
    result = false
    try {ak.geometricSeries(1, 1)({});} catch(e) {result = true;}
    if(!result) return false;
  
    return true;
   }
  
   args.add('invalid arguments', invalidArgs);
  
   var series = {
    name: 'series',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   function compare(a, r) {
    var seq = ak.geometricSequence(a, r);
    var ser = ak.geometricSeries(a, r);
    var i = 0;
    var n = 10;
  
    if(ser(i)!==seq(i))	return false;
    while(++i<n) if(ak.diff(ser(i)-ser(i-1), seq(i))>1e-12) return false;
    return true;
   }
  
   series.add('unit ratio', function(){return compare(1, 1) && compare(5, 1);});
   series.add('zero first ', function(){return compare(0, 1) && compare(0, 2);});
   series.add('non-zero first', function(){return compare(3, 2) && compare(-1.3, 4) && compare(3, -2.4)});
  
   series.add('infinity', function(){return ak.geometricSeries( 2, 2.0)(ak.INFINITY) ===  ak.INFINITY
                                         && ak.geometricSeries( 2, 1.0)(ak.INFINITY) ===  ak.INFINITY
                                         && ak.geometricSeries( 2, 0.5)(ak.INFINITY) ===  4
                                         && ak.geometricSeries( 2, 0.0)(ak.INFINITY) ===  2
                                         && ak.geometricSeries(-2, 2.0)(ak.INFINITY) === -ak.INFINITY
                                         && ak.geometricSeries(-2, 1.0)(ak.INFINITY) === -ak.INFINITY
                                         && ak.geometricSeries(-2, 0.5)(ak.INFINITY) === -4
                                         && ak.geometricSeries(-2, 0.0)(ak.INFINITY) === -2
                                         && ak.geometricSeries( 0, 2.0)(ak.INFINITY) ===  0
                                         && ak.geometricSeries( 0, 1.0)(ak.INFINITY) ===  0
                                         && ak.geometricSeries( 0, 0.5)(ak.INFINITY) ===  0
                                         && ak.geometricSeries( 0, 0.0)(ak.INFINITY) ===  0
                                         && isNaN(ak.geometricSeries( 2, -2.0)(ak.INFINITY))
                                         && isNaN(ak.geometricSeries( 2, -1.0)(ak.INFINITY))
                                         && ak.geometricSeries( 2, -0.5)(ak.INFINITY) ===  4/3
                                         && isNaN(ak.geometricSeries(-2, -2.0)(ak.INFINITY))
                                         && isNaN(ak.geometricSeries(-2, -1.0)(ak.INFINITY))
                                         && ak.geometricSeries(-2, -0.5)(ak.INFINITY) === -4/3
                                         && ak.geometricSeries( 0, -2.0)(ak.INFINITY) ===  0
                                         && ak.geometricSeries( 0, -1.0)(ak.INFINITY) ===  0
                                         && ak.geometricSeries( 0, -0.5)(ak.INFINITY) ===  0});
  
   geometricSeries.add(args);
   geometricSeries.add(series);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   geometricSeries.add(load);
  }

  akTest.add(geometricSeries);
 }

 ak.using(['Series/GeometricSeries.js', 'Sequence/GeometricSequence.js'], define);
})();