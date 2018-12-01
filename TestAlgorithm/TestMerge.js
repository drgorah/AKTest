"use strict";

(function() {
 function define() {
  var merge = {
   name: 'algorithm.merge',
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
    try {ak.merge(1);} catch(e) {result = true;}
    if(!result) return false;

	result = false;
    try {ak.merge([1, 2, 3, 4], 1);} catch(e) {result = true;}
    if(!result) return false;

	result = false;
    try {ak.merge([1, 2, 3, 4], [1, 2, 3, 4], {});} catch(e) {result = true;}
    if(!result) return false;

	result = false;
    try {ak.merge([1, 2, 3, 4], [1, 2, 3, 4], ak.numberCompare, '1');} catch(e) {result = true;}
    if(!result) return false;

	result = false;
    try {ak.merge([1, 2, 3, 4], [1, 2, 3, 4], ak.numberCompare, 1.5);} catch(e) {result = true;}
    if(!result) return false;

	result = false;
    try {ak.merge([1, 2, 3, 4], [1, 2, 3, 4], ak.numberCompare, 1, 2.5);} catch(e) {result = true;}
    if(!result) return false;

	result = false;
    try {ak.merge([1, 2, 3, 4], [1, 2, 3, 4], ak.numberCompare, 1, 2.5, '1');} catch(e) {result = true;}
    if(!result) return false;

	result = false;
    try {ak.merge([1, 2, 3, 4], [1, 2, 3, 4], ak.numberCompare, 1, 3, 1.5);} catch(e) {result = true;}
    if(!result) return false;

	result = false;
    try {ak.merge([1, 2, 3, 4], [1, 2, 3, 4], ak.numberCompare, 1, 3, 1, 2.5);} catch(e) {result = true;}
    if(!result) return false;

	result = true;
    try {ak.merge([1, 2, 3, 4], [1, 2, 3, 4], ak.numberCompare, 1, 3, 1, 3);} catch(e) {result = false;}
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
    var u = ak.multiUniformRnd(100, 100);
    var i, j, a1, a2, a3, a4, start, mid, end;

    for(i=0;i<100;++i) {
     a1 = u().toArray();
     for(j=0;j<a1.length;++j) a1[j] = ak.floor(a1[j]);
     start = ak.floor(Math.random()*(a1.length+1));
     end = ak.floor(Math.random()*(a1.length+1));
     if(start>end) {j=start; start=end; end=j;}
     mid = start + ak.floor(Math.random()*(end-start));

     a3 = a1.slice(0); ak.sort(a3, ak.alphaCompare, mid, end);
     a2 = a1.slice(0); ak.sort(a2, ak.alphaCompare, start, mid);
     ak.sort(a1, ak.alphaCompare, start, end);

     a4 = ak.merge(a2, a3, ak.alphaCompare, start, mid, mid, end);
     if(ak.lexicographicalCompare(a1, a4, ak.alphaCompare, start, end)!==0) return false;

     if(start<mid && ak.lexicographicalCompare(a3, ak.merge(a2, a3, ak.alphaCompare, mid, start, mid, end), ak.alphaCompare, mid, end)!==0) return false;

     if(mid<end && ak.lexicographicalCompare(a2, ak.merge(a2, a3, ak.alphaCompare, start, mid, end, mid), ak.alphaCompare, start, mid)!==0) return false;
    }
    return true;
   });

   apply.add('number', function() {
    var u = ak.multiUniformRnd(100, 100);
    var i, j, a1, a2, a3, start, mid, end;

    for(i=0;i<100;++i) {
     a1 = u().toArray();
     for(j=0;j<a1.length;++j) a1[j] = ak.floor(a1[j]);
     start = ak.floor(Math.random()*(a1.length+1));
     end = ak.floor(Math.random()*(a1.length+1));
     if(start>end) {j=start; start=end; end=j;}
     mid = start + ak.floor(Math.random()*(end-start));

     a3 = a1.slice(0); ak.sort(a3, ak.numberCompare, mid, end);
     a2 = a1.slice(0); ak.sort(a2, ak.numberCompare, start, mid);
     ak.sort(a1, ak.numberCompare, start, end);

     if(ak.lexicographicalCompare(a1, ak.merge(a2, a3, ak.numberCompare, start, mid, mid, end), ak.numberCompare, start, end)!==0) return false;

     if(start<mid && ak.lexicographicalCompare(a3, ak.merge(a2, a3, ak.numberCompare, mid, start, mid, end), ak.numberCompare, mid, end)!==0) return false;

     if(mid<end && ak.lexicographicalCompare(a2, ak.merge(a2, a3, ak.numberCompare, start, mid, end, mid), ak.numberCompare, start, mid)!==0) return false;
    }
    return true;
   });

   merge.add(init);
   merge.add(apply);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   merge.add(load);
  }

  akTest.add(merge);
 }

 ak.using(['Algorithm/Merge.js', 'Algorithm/Compare.js', 'Algorithm/Sort.js', 'Algorithm/LexicographicalCompare.js', 'Distribution/MultiUniformDistribution.js'], define);
})();