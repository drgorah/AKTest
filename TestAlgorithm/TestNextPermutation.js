"use strict";

(function() {
 function define() {
  var nextPermutation = {
   name: 'algorithm.nextPermutation',
   body: [],
   add: function(t) {this.body.push(t);}
  };

  try {
   function arrayEq(l, r) {
    var i;
    if(l.length!==r.length) return false;
    for(i=0;i<l.length;++i) if(l[i]!==r[i]) return false;
    return true;
   }

   var init = {
    name: 'init',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   
   function invalidInit() {
    var result;
   
    result = false;
    try {ak.nextPermutation(1);} catch(e) {result = true;}
    if(!result) return false;

    result = false;
    try {ak.nextPermutation([1, 2, 3, 4], {});} catch(e) {result = true;}
    if(!result) return false;
   
    result = false;
    try {ak.nextPermutation([1, 2, 3, 4], ak.numberCompare, '1');} catch(e) {result = true;}
    if(!result) return false;
   
    result = false;
    try {ak.nextPermutation([1, 2, 3, 4], ak.numberCompare, 1.5);} catch(e) {result = true;}
    if(!result) return false;
   
    result = false;
    try {ak.nextPermutation([1, 2, 3, 4], ak.numberCompare, 1, 2.5);} catch(e) {result = true;}
    if(!result) return false;

    result = true;
    try {ak.nextPermutation([1, 2, 3, 4], ak.numberCompare, 1, 3);} catch(e) {result = false;}
    if(!result) return false;

    return true;
   }

   init.add('invalid arguments', invalidInit);

   var cycle = {
    name: 'cycle',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   function full() {
    var a = ['a', 'b', 'c'];

    if(!ak.nextPermutation(a) || a[0]!=='a' || a[1]!=='c' || a[2]!=='b') return false;
    if(!ak.nextPermutation(a) || a[0]!=='b' || a[1]!=='a' || a[2]!=='c') return false;
    if(!ak.nextPermutation(a) || a[0]!=='b' || a[1]!=='c' || a[2]!=='a') return false;
    if(!ak.nextPermutation(a) || a[0]!=='c' || a[1]!=='a' || a[2]!=='b') return false;
    if(!ak.nextPermutation(a) || a[0]!=='c' || a[1]!=='b' || a[2]!=='a') return false;
    if( ak.nextPermutation(a) || a[0]!=='a' || a[1]!=='b' || a[2]!=='c') return false;

    return true;
   }

   cycle.add('full', full);

   function partial() {
    var a = ['d', 'a', 'b', 'c', 'e', 'f'];

    if(!ak.nextPermutation(a, ak.alphaCompare, 1, 4) || a[0]!=='d' || a[1]!=='a' || a[2]!=='c' || a[3]!=='b' || a[4]!=='e' || a[5]!=='f') return false;
    if(!ak.nextPermutation(a, ak.alphaCompare, 1, 4) || a[0]!=='d' || a[1]!=='b' || a[2]!=='a' || a[3]!=='c' || a[4]!=='e' || a[5]!=='f') return false;
    if(!ak.nextPermutation(a, ak.alphaCompare, 1, 4) || a[0]!=='d' || a[1]!=='b' || a[2]!=='c' || a[3]!=='a' || a[4]!=='e' || a[5]!=='f') return false;
    if(!ak.nextPermutation(a, ak.alphaCompare, 1, 4) || a[0]!=='d' || a[1]!=='c' || a[2]!=='a' || a[3]!=='b' || a[4]!=='e' || a[5]!=='f') return false;
    if(!ak.nextPermutation(a, ak.alphaCompare, 1, 4) || a[0]!=='d' || a[1]!=='c' || a[2]!=='b' || a[3]!=='a' || a[4]!=='e' || a[5]!=='f') return false;
    if( ak.nextPermutation(a, ak.alphaCompare, 1, 4) || a[0]!=='d' || a[1]!=='a' || a[2]!=='b' || a[3]!=='c' || a[4]!=='e' || a[5]!=='f') return false;

    return true;
   }

   cycle.add('partial', partial);

   nextPermutation.add(init);
   nextPermutation.add(cycle);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   nextPermutation.add(load);
  }

  akTest.add(nextPermutation);
 }

 ak.using(['Algorithm/NextPermutation.js'], define);
})();