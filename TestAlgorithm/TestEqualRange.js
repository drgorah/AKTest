"use strict";

(function() {
 function define() {
  var equalRange = {
   name: 'algorithm.equalRange',
   body: [],
   add: function(t) {this.body.push(t);}
  };

  try {
   function rangeEq(l,r){return l[0]===r[0] && l[1]===r[1];};

   var alpha = [1, 10, 100, 100, 100, 3, 30, 4, 5];
   var number = [1, 2, 3, 4, 5, 10, 10, 10, 30, 100];

   var init = {
    name: 'init',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   
   function invalidInit() {
    var result;
   
    result = false;
    try {ak.equalRange(1, 0);} catch(e) {result = true;}
    if(!result) return false;

    result = false;
    try {ak.equalRange([1, 2, 3, 4], 0, {});} catch(e) {result = true;}
    if(!result) return false;
   
    result = false;
    try {ak.equalRange([1, 2, 3, 4], 0, ak.numberCompare, '1');} catch(e) {result = true;}
    if(!result) return false;
   
    result = false;
    try {ak.equalRange([1, 2, 3, 4], 0, ak.numberCompare, 1.5);} catch(e) {result = true;}
    if(!result) return false;
   
    result = false;
    try {ak.equalRange([1, 2, 3, 4], 0, ak.numberCompare, 1, 2.5);} catch(e) {result = true;}
    if(!result) return false;

    result = true;
    try {ak.equalRange([1, 2, 3, 4], 0, ak.numberCompare, 1, 3);} catch(e) {result = false;}
    if(!result) return false;
   
    return true;
   }

   init.add('invalid arguments', invalidInit);

   var search = {
    name: 'search',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   search.add('alpha', function() {
    return rangeEq(ak.equalRange(alpha, 100), [2,5])
        && rangeEq(ak.equalRange(alpha, 6), [9,9])
        && rangeEq(ak.equalRange(alpha, 2), [5,5])
        && rangeEq(ak.equalRange(alpha, 1, ak.alphaCompare, 2, 6), [2,2])
        && rangeEq(ak.equalRange(alpha, 10, ak.alphaCompare, 6, 4), [-1,-1]);
   });

   search.add('number', function() {
    return rangeEq(ak.equalRange(number, 10, ak.numberCompare), [5,8])
        && rangeEq(ak.equalRange(number, 200, ak.numberCompare), [10,10])
        && rangeEq(ak.equalRange(number, 6, ak.numberCompare), [5,5])
        && rangeEq(ak.equalRange(number, 1, ak.numberCompare, 2, 6), [2,2])
        && rangeEq(ak.equalRange(number, 10, ak.numberCompare, 6, 4), [-1,-1]);
   });

   equalRange.add(init);
   equalRange.add(search);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   equalRange.add(load);
  }

  akTest.add(equalRange);
 }

 ak.using('Algorithm/EqualRange.js', define);
})();