"use strict";

(function() {
 function define() {
  var nextCombination = {
   name: 'algorithm.nextCombination',
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
    try {ak.nextCombination(1);} catch(e) {result = true;}
    if(!result) return false;

    result = false;
    try {ak.nextCombination([1, 2, 3, 4]);} catch(e) {result = true;}
    if(!result) return false;

    result = false;
    try {ak.nextCombination([1, 2, 3, 4], 'a');} catch(e) {result = true;}
    if(!result) return false;

    result = false;
    try {ak.nextCombination([1, 2, 3, 4], 2, 'a');} catch(e) {result = true;}
    if(!result) return false;
   
    result = false;
    try {ak.nextCombination([1, 2, 3, 4], 2, ak.numberCompare, '1');} catch(e) {result = true;}
    if(!result) return false;
   
    result = false;
    try {ak.nextCombination([1, 2, 3, 4], 2, ak.numberCompare, 1.5);} catch(e) {result = true;}
    if(!result) return false;
   
    result = false;
    try {ak.nextCombination([1, 2, 3, 4], 2, ak.numberCompare, 1, 2.5);} catch(e) {result = true;}
    if(!result) return false;

    result = true;
    try {ak.nextCombination([1, 2, 3, 4], 2, ak.numberCompare, 1, 3);} catch(e) {alert(e.message);result = false;}
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
    var a = ['a', 'b', 'c', 'd'];
    var b = ['a', 'b', 'c', 'c', 'c', 'd'];

    if(!ak.nextCombination(a, 2) || a[0]!=='a' || a[1]!=='c') return false;
    if(!ak.nextCombination(a, 2) || a[0]!=='a' || a[1]!=='d') return false;
    if(!ak.nextCombination(a, 2) || a[0]!=='b' || a[1]!=='c') return false;
    if(!ak.nextCombination(a, 2) || a[0]!=='b' || a[1]!=='d') return false;
    if(!ak.nextCombination(a, 2) || a[0]!=='c' || a[1]!=='d') return false;
    if( ak.nextCombination(a, 2) || a[0]!=='a' || a[1]!=='b') return false;

    if(!ak.nextCombination(b, 3) || b[0]!=='a' || b[1]!=='b' || b[2]!=='d') return false;
    if(!ak.nextCombination(b, 3) || b[0]!=='a' || b[1]!=='c' || b[2]!=='c') return false;
    if(!ak.nextCombination(b, 3) || b[0]!=='a' || b[1]!=='c' || b[2]!=='d') return false;
    if(!ak.nextCombination(b, 3) || b[0]!=='b' || b[1]!=='c' || b[2]!=='c') return false;
    if(!ak.nextCombination(b, 3) || b[0]!=='b' || b[1]!=='c' || b[2]!=='d') return false;
    if(!ak.nextCombination(b, 3) || b[0]!=='c' || b[1]!=='c' || b[2]!=='c') return false;
    if(!ak.nextCombination(b, 3) || b[0]!=='c' || b[1]!=='c' || b[2]!=='d') return false;
    if( ak.nextCombination(b, 3) || b[0]!=='a' || b[1]!=='b' || b[2]!=='c') return false;

    return true;
   }

   cycle.add('full', full);

   function partial() {
    var a = ['e', 'a', 'b', 'c', 'd', 'f', 'g'];

    if(!ak.nextCombination(a, 3, ak.alphaCompare, 1, 5) || a[0]!=='e' || a[1]!=='a' || a[2]!=='c' || a[5]!=='f' || a[6]!=='g') return false;
    if(!ak.nextCombination(a, 3, ak.alphaCompare, 1, 5) || a[0]!=='e' || a[1]!=='a' || a[2]!=='d' || a[5]!=='f' || a[6]!=='g') return false;
    if(!ak.nextCombination(a, 3, ak.alphaCompare, 1, 5) || a[0]!=='e' || a[1]!=='b' || a[2]!=='c' || a[5]!=='f' || a[6]!=='g') return false;
    if(!ak.nextCombination(a, 3, ak.alphaCompare, 1, 5) || a[0]!=='e' || a[1]!=='b' || a[2]!=='d' || a[5]!=='f' || a[6]!=='g') return false;
    if(!ak.nextCombination(a, 3, ak.alphaCompare, 1, 5) || a[0]!=='e' || a[1]!=='c' || a[2]!=='d' || a[5]!=='f' || a[6]!=='g') return false;
    if( ak.nextCombination(a, 3, ak.alphaCompare, 1, 5) || a[0]!=='e' || a[1]!=='a' || a[2]!=='b' || a[5]!=='f' || a[6]!=='g') return false;

    return true;
   }

   cycle.add('partial', partial);

   function minimal() {
    var a = ['a', 'b', 'c', 'd'];

    if(!ak.nextCombination(a, 1) || a[0]!=='b') return false;
    if(!ak.nextCombination(a, 1) || a[0]!=='c') return false;
    if(!ak.nextCombination(a, 1) || a[0]!=='d') return false;
    if( ak.nextCombination(a, 1) || a[0]!=='a') return false;

    return true;
   }

   cycle.add('minimal', minimal);

   nextCombination.add(init);
   nextCombination.add(cycle);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   nextCombination.add(load);
  }

  akTest.add(nextCombination);
 }

 ak.using(['Algorithm/NextCombination.js'], define);
})();