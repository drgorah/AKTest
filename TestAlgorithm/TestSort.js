"use strict";

(function() {
 function define() {
  var sort = {
   name: 'algorithm.sort',
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
    try {ak.sort(1);} catch(e) {result = true;}
    if(!result) return false;

    result = false;
    try {ak.sort([1, 2, 3, 4], {});} catch(e) {result = true;}
    if(!result) return false;
   
    result = false;
    try {ak.sort([1, 2, 3, 4], ak.numberCompare, '1');} catch(e) {result = true;}
    if(!result) return false;
   
    result = false;
    try {ak.sort([1, 2, 3, 4], ak.numberCompare, 1.5);} catch(e) {result = true;}
    if(!result) return false;
   
    result = false;
    try {ak.sort([1, 2, 3, 4], ak.numberCompare, 1, 2.5);} catch(e) {result = true;}
    if(!result) return false;

    result = true;
    try {ak.sort([1, 2, 3, 4], ak.numberCompare, 1, 3);} catch(e) {result = false;}
    if(!result) return false;

    return true;
   }

   init.add('invalid arguments', invalidInit);

   var fixed = {
    name: 'fixed',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   fixed.add('alpha', function() {
    var a = [5,0,10,4,23,6,31,7,5,6,3,3,4,1];
    var b = [5,0,10,23,3,31,4,5,6,6,7,3,4,1];
    ak.sort(a, ak.alphaCompare, 3, 11);
    return arrayEq(a, b);
   });

   fixed.add('number', function() {
    var a = [5,0,10,4,23,6,31,7,5,6,3,3,4,1];
    var b = [5,0,10,3,4,5,6,6,7,23,31,3,4,1];
    ak.sort(a, ak.numberCompare, 3, 11);
    return arrayEq(a, b);
   });

   var random = {
    name: 'random',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   random.add('alpha', function() {
    var n = 100;
    var d = 20;
    var u = ak.multiUniformRnd(d, 0, 20);
    var i, j, lb, ub, a;

    for(i=0;i<n;++i) {
     lb = ak.floor(Math.random()*d);
     ub = ak.floor(Math.random()*d);
     if(lb>ub) {j=lb; lb=ub; ub=j;}
     a = u().toArray();
     for(j=0;j<d;++j) a[j] = ak.floor(a[j]);
     ak.sort(a, ak.alphaCompare, lb, ub);
     if(!ak.isSorted(a, ak.alphaCompare, lb, ub)) return false;
     ak.sort(a, ak.alphaCompare, ub, lb);
     if(lb!==ub && ak.isSorted(a, ak.alphaCompare, ub, lb)) return false;
    }
    return true;
   });

   random.add('number', function() {
    var n = 100;
    var d = 20;
    var u = ak.multiUniformRnd(d, 0, 20);
    var i, j, lb, ub, a;

    for(i=0;i<n;++i) {
     lb = ak.floor(Math.random()*d);
     ub = ak.floor(Math.random()*d);
     if(lb>ub) {j=lb; lb=ub; ub=j;}
     a = u().toArray();
     for(j=0;j<d;++j) a[j] = ak.floor(a[j]);
     ak.sort(a, ak.numberCompare, lb, ub);
     if(!ak.isSorted(a, ak.numberCompare, lb, ub)) return false;
     ak.sort(a, ak.numberCompare, ub, lb);
     if(lb!==ub && ak.isSorted(a, ak.numberCompare, ub, lb)) return false;
    }
    return true;
   });

   sort.add(init);
   sort.add(fixed);
   sort.add(random);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   sort.add(load);
  }

  akTest.add(sort);
 }

 ak.using(['Algorithm/Sort.js', 'Algorithm/IsSorted.js', 'Distribution/MultiUniformDistribution.js'], define);
})();