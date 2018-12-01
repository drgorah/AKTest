"use strict";

(function() {
 function define() {
  var unique = {
   name: 'algorithm.unique',
   body: [],
   add: function(t) {this.body.push(t);}
  };

  try {
   var init = {
    name: 'init',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   
   function invalidInit() {
    var result;

    result = false;
    try {ak.unique(1);} catch(e) {result = true;}
    if(!result) return false;

    result = false;
    try {ak.unique([1, 2, 3, 4], {});} catch(e) {result = true;}
    if(!result) return false;
   
    result = false;
    try {ak.unique([1, 2, 3, 4], ak.eq, '1');} catch(e) {result = true;}
    if(!result) return false;
   
    result = false;
    try {ak.unique([1, 2, 3, 4], ak.eq, 1.5);} catch(e) {result = true;}
    if(!result) return false;
   
    result = false;
    try {ak.unique([1, 2, 3, 4], ak.eq, 1, 2.5);} catch(e) {result = true;}
    if(!result) return false;

    result = true;
    try {ak.unique([1, 2, 3, 4], ak.eq, 1, 3);} catch(e) {result = false;}
    if(!result) return false;

    return true;
   }

   init.add('invalid arguments', invalidInit);

   var apply = {
    name: 'apply',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   apply.add('number', function() {
    var a1 = [1, 1, 2, 2, 2, 1, 3, 3, 4, 5, 6, 6, 7];
    var a2 = [1, 2, 1, 3, 4, 5, 6, 7];
    var a3 = a2.slice(0, ak.unique(a2, ak.numberEqual));
    return ak.lexicographicalCompare(a2, a3, ak.numberCompare)===0;
   });

   apply.add('string', function() {
    var a1 = ['1', 1, '2', 2, 2, 1, 3, '3', 4, 5, 6, 6, 7];
    var a2 = [1, 2, '1', 3, 4, 5, '6', 7];
    var a3 = a2.slice(0, ak.unique(a2, ak.alphaEqual));
    return ak.lexicographicalCompare(a2, a3, ak.alphaCompare)===0;
   });

   unique.add(init);
   unique.add(apply);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   unique.add(load);
  }

  akTest.add(unique);
 }

 ak.using(['Algorithm/Unique.js', 'Algorithm/Unique.js', 'Algorithm/LexicographicalCompare.js'], define);
})();