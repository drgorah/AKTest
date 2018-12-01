"use strict";

(function() {
 function define() {
  var compare = {
   name: 'algorithm.compare',
   body: [],
   add: function(t) {this.body.push(t);}
  };

  try {
   var alphaCompare = {
    name: 'alphaCompare',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   alphaCompare.add('alpha', function() {
    var cmp = ak.alphaCompare;
    return cmp('abc', 'abd') === -1 && cmp('abd', 'abc') === 1 && cmp('abc', 'abc') === 0;
   });

   var numberCompare = {
    name: 'numberCompare',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   numberCompare.add('number', function() {
    var cmp = ak.numberCompare;
    return cmp(0, 1) === -1 && cmp(1, 0) === 1 && cmp(0, 0) === 0 && isNaN(cmp(0, ak.NaN)) && isNaN(cmp(ak.NaN, 0)) && isNaN(cmp(ak.NaN, ak.NaN));
   });

   var floatCompare = {
    name: 'floatCompare',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   floatCompare.add('float', function() {
    var cmp = ak.floatCompare;
    return cmp(0, 1) === -1 && cmp(1, 0) === 1 && cmp(0, 0) === 0 && cmp(0, ak.NaN) === -1 && cmp(ak.NaN, 0) === 1 && cmp(ak.NaN, ak.NaN) === 0;
   });

   compare.add(alphaCompare);
   compare.add(numberCompare);
   compare.add(floatCompare);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   compare.add(load);
  }

  akTest.add(compare);
 }

 ak.using('Algorithm/Compare.js', define);
})();