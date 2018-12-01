"use strict";

(function() {
 function define() {
  var binarySearch = {
   name: 'algorithm.binarySearch',
   body: [],
   add: function(t) {this.body.push(t);}
  };

  try {
   var alpha = [1, 10, 100, 2, 3, 30, 4, 5];
   var number = [1, 2, 3, 4, 5, 10, 30, 100];

   var init = {
    name: 'init',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   
   function invalidInit() {
    var result;

    result = false;
    try {ak.binarySearch(1, 0);} catch(e) {result = true;}
    if(!result) return false;

    result = false;
    try {ak.binarySearch([1, 2, 3, 4], 0, {});} catch(e) {result = true;}
    if(!result) return false;
   
    result = false;
    try {ak.binarySearch([1, 2, 3, 4], 0, ak.numberCompare, '1');} catch(e) {result = true;}
    if(!result) return false;
   
    result = false;
    try {ak.binarySearch([1, 2, 3, 4], 0, ak.numberCompare, 1.5);} catch(e) {result = true;}
    if(!result) return false;
   
    result = false;
    try {ak.binarySearch([1, 2, 3, 4], 0, ak.numberCompare, 1, 2.5);} catch(e) {result = true;}
    if(!result) return false;

    result = true;
    try {ak.binarySearch([1, 2, 3, 4], 0, ak.numberCompare, 1, 3);} catch(e) {result = false;}
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
    return  ak.binarySearch(alpha, 10)
        && !ak.binarySearch(alpha, 6)
        &&  ak.binarySearch(alpha, 10, ak.alphaCompare, 1, 4)
        && !ak.binarySearch(alpha, 10, ak.alphaCompare, 2, 5);
   });

   search.add('number', function() {
    return  ak.binarySearch(number, 10, ak.numberCompare)
        && !ak.binarySearch(number, 6, ak.numberCompare)
        &&  ak.binarySearch(number, 10, ak.numberCompare, 1, 6)
        && !ak.binarySearch(number, 10, ak.numberCompare, 1, 5);
   });

   binarySearch.add(init);
   binarySearch.add(search);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   binarySearch.add(load);
  }

  akTest.add(binarySearch);
 }

 ak.using('Algorithm/BinarySearch.js', define);
})();