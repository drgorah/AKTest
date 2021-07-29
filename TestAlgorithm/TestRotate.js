"use strict";

(function() {
 function define() {
  var rotate = {
   name: 'algorithm.rotate',
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
    try {ak.rotate(1);} catch(e) {result = true;}
    if(!result) return false;

    result = false;
    try {ak.rotate([1, 2, 3, 4]);} catch(e) {result = true;}
    if(!result) return false;
   
    result = false;
    try {ak.rotate([1, 2, 3, 4], '1');} catch(e) {result = true;}
    if(!result) return false;
   
    result = false;
    try {ak.rotate([1, 2, 3, 4], 1.5);} catch(e) {result = true;}
    if(!result) return false;
   
    result = false;
    try {ak.rotate([1, 2, 3, 4], 2, 1.5);} catch(e) {result = true;}
    if(!result) return false;

    result = false;
    try {ak.rotate([1, 2, 3, 4], 2, 1, 2.5);} catch(e) {result = true;}
    if(!result) return false;

    result = true;
    try {ak.rotate([1, 2, 3, 4], 2, 1, 3);} catch(e) {result = false;}
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
    var b = [6,31,7,5,6,3,3,4,1,5,0,10,4,23];
    ak.rotate(a, 5);
    return arrayEq(a, b);
   });

   run.add('partial', function() {
    var a = [5,0,10,4,23,6,31,7,5,6,3,3,4,1];
    var b = [5,0,10,6,31,7,4,23,5,6,3,3,4,1];
    ak.rotate(a, 5, 3, 8);
    return arrayEq(a, b);
   });

   rotate.add(init);
   rotate.add(run);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   rotate.add(load);
  }

  akTest.add(rotate);
 }

 ak.using(['Algorithm/Rotate.js'], define);
})();