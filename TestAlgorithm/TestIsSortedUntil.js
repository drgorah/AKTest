"use strict";

(function() {
 function define() {
  var isSortedUntil = {
   name: 'algorithm.isSortedUntil',
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
    try {ak.isSortedUntil(1);} catch(e) {result = true;}
    if(!result) return false;

    result = false;
    try {ak.isSortedUntil([1, 2, 3, 4], {});} catch(e) {result = true;}
    if(!result) return false;
   
    result = false;
    try {ak.isSortedUntil([1, 2, 3, 4], ak.numberCompare, '1');} catch(e) {result = true;}
    if(!result) return false;
   
    result = false;
    try {ak.isSortedUntil([1, 2, 3, 4], ak.numberCompare, 1.5);} catch(e) {result = true;}
    if(!result) return false;
   
    result = false;
    try {ak.isSortedUntil([1, 2, 3, 4], ak.numberCompare, 1, 2.5);} catch(e) {result = true;}
    if(!result) return false;

    result = true;
    try {ak.isSortedUntil([1, 2, 3, 4], ak.numberCompare, 1, 3);} catch(e) {result = false;}
    if(!result) return false;

    return true;
   }

   init.add('invalid arguments', invalidInit);

   var apply = {
    name: 'apply',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   apply.add('alpha', function() {
    var u = ak.multiUniformRnd(10, 100);
    var i, a, start, end, mid, j;

    for(i=0;i<100;++i) {
     a = u().toArray();
     for(j=0;j<a.length;++j) a[j] = ak.floor(a[j]);
     start = ak.floor(Math.random()*(a.length+1));
     end = ak.floor(Math.random()*(a.length+1));
     if(start>end) {j=start; start=end; end=j;}
     mid = start+ak.floor(Math.random()*(end-start));

     ak.partialSort(a, mid, ak.alphaCompare, start, end);
     j = ak.isSortedUntil(a, ak.alphaCompare, start, end);
     if(!ak.isSorted(a, ak.alphaCompare, start, j)) return false;
     if(j<end && ak.alphaCompare(a[j-1], a[j])<0) return false;
    }
    return true;
   });

   apply.add('number', function() {
    var u = ak.multiUniformRnd(100, 100);
    var i, a, start, end, mid, j;

    for(i=0;i<100;++i) {
     a = u().toArray();
     for(j=0;j<a.length;++j) a[j] = ak.floor(a[j]);
     start = ak.floor(Math.random()*(a.length+1));
     end = ak.floor(Math.random()*(a.length+1));
     if(start>end) {j=start; start=end; end=j;}
     mid = start+ak.floor(Math.random()*(end-start));

     ak.partialSort(a, mid, ak.numberCompare, start, end);
     j = ak.isSortedUntil(a, ak.numberCompare, start, end);
     if(!ak.isSorted(a, ak.numberCompare, start, j)) return false;
     if(j<end && ak.numberCompare(a[j-1], a[j])<0) return false;
    }
    return true;
   });

   isSortedUntil.add(init);
   isSortedUntil.add(apply);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   isSortedUntil.add(load);
  }

  akTest.add(isSortedUntil);
 }

 ak.using(['Algorithm/PartialSort.js', 'Algorithm/IsSorted.js', 'Algorithm/IsSortedUntil.js'], define);
})();