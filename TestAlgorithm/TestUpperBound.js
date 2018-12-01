"use strict";

(function() {
 function define() {
  var upperBound = {
   name: 'algorithm.upperBound',
   body: [],
   add: function(t) {this.body.push(t);}
  };

  try {
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
    try {ak.upperBound(1, 0);} catch(e) {result = true;}
    if(!result) return false;

    result = false;
    try {ak.upperBound([1, 2, 3, 4], 0, {});} catch(e) {result = true;}
    if(!result) return false;
   
    result = false;
    try {ak.upperBound([1, 2, 3, 4], 0, ak.numberCompare, '1');} catch(e) {result = true;}
    if(!result) return false;
   
    result = false;
    try {ak.upperBound([1, 2, 3, 4], 0, ak.numberCompare, 1.5);} catch(e) {result = true;}
    if(!result) return false;
   
    result = false;
    try {ak.upperBound([1, 2, 3, 4], 0, ak.numberCompare, 1, 2.5);} catch(e) {result = true;}
    if(!result) return false;

    result = true;
    try {ak.upperBound([1, 2, 3, 4], 0, ak.numberCompare, 1, 3);} catch(e) {result = false;}
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
    return ak.upperBound(alpha, 100)===5
        && ak.upperBound(alpha, 6)===9
        && ak.upperBound(alpha, 2)===5
        && ak.upperBound(alpha, 1, ak.alphaCompare, 2, 6)===2
        && ak.upperBound(alpha, 10, ak.alphaCompare, 6, 4)===-1;
   });

   search.add('number', function() {
    return ak.upperBound(number, 10, ak.numberCompare)===8
        && ak.upperBound(number, 200, ak.numberCompare)===10
        && ak.upperBound(number, 6, ak.numberCompare)===5
        && ak.upperBound(number, 1, ak.numberCompare, 2, 6)===2
        && ak.upperBound(number, 10, ak.numberCompare, 6, 4)===-1;
   });

   upperBound.add(init);
   upperBound.add(search);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   upperBound.add(load);
  }

  akTest.add(upperBound);
 }

 ak.using('Algorithm/UpperBound.js', define);
})();