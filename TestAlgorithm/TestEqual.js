"use strict";

(function() {
 function define() {
  var equal = {
   name: 'algorithm.equal',
   body: [],
   add: function(t) {this.body.push(t);}
  };

  try {
   var alphaEqual = {
    name: 'alphaEqual',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   alphaEqual.add('alpha', function() {
    var eq = ak.alphaEqual;
    return !eq('abc', 'abd') && !eq('abd', 'abc') && eq('abc', 'abc');
   });

   var numberEqual = {
    name: 'numberEqual',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   numberEqual.add('number', function() {
    var eq = ak.numberEqual;
    return !eq(0, 1) && !eq(1, 0) && eq(0, 0) && !eq(0, ak.NaN) && !eq(ak.NaN, 0) && !eq(ak.NaN, ak.NaN);
   });

   var floatEqual = {
    name: 'floatEqual',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   floatEqual.add('float', function() {
    var eq = ak.floatEqual;
    return !eq(0, 1) && !eq(1, 0) && eq(0, 0) && !eq(0, ak.NaN) && !eq(ak.NaN, 0) && eq(ak.NaN, ak.NaN);
   });

   equal.add(alphaEqual);
   equal.add(numberEqual);
   equal.add(floatEqual);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   equal.add(load);
  }

  akTest.add(equal);
 }

 ak.using('Algorithm/Equal.js', define);
})();