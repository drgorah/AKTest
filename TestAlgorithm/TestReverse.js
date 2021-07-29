"use strict";

(function() {
 function define() {
  var reverse = {
   name: 'algorithm.reverse',
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
    try {ak.reverse(1);} catch(e) {result = true;}
    if(!result) return false;
   
    result = false;
    try {ak.reverse([1, 2, 3, 4], '1');} catch(e) {result = true;}
    if(!result) return false;
   
    result = false;
    try {ak.reverse([1, 2, 3, 4], 1.5);} catch(e) {result = true;}
    if(!result) return false;
   
    result = false;
    try {ak.reverse([1, 2, 3, 4], 1, 2.5);} catch(e) {result = true;}
    if(!result) return false;

    result = true;
    try {ak.reverse([1, 2, 3, 4], 1, 3);} catch(e) {result = false;}
    if(!result) return false;

    return true;
   }

   init.add('invalid arguments', invalidInit);

   var run = {
    name: 'run',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   run.add('full', function() {
    var a = [5,0,10,4,23,6,31,7,5,6,3,3,4,1];
    var b = [1,4,3,3,6,5,7,31,6,23,4,10,0,5];
    ak.reverse(a);
    return arrayEq(a, b);
   });

   run.add('partial', function() {
    var a = [5,0,10,4,23,6,31,7,5,6,3,3,4,1];
    var b = [5,0,10,7,31,6,23,4,5,6,3,3,4,1];
    ak.reverse(a, 3, 8);
    return arrayEq(a, b);
   });

   reverse.add(init);
   reverse.add(run);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   reverse.add(load);
  }

  akTest.add(reverse);
 }

 ak.using(['Algorithm/Reverse.js'], define);
})();