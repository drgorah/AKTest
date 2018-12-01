"use strict";

(function() {
 function define() {
  var setSymmetricDifference = {
   name: 'algorithm.setSymmetricDifference',
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
    try {ak.setSymmetricDifference(1);} catch(e) {result = true;}
    if(!result) return false;

	result = false;
    try {ak.setSymmetricDifference([1, 2, 3, 4], 1);} catch(e) {result = true;}
    if(!result) return false;

	result = false;
    try {ak.setSymmetricDifference([1, 2, 3, 4], [1, 2, 3, 4], {});} catch(e) {result = true;}
    if(!result) return false;

	result = false;
    try {ak.setSymmetricDifference([1, 2, 3, 4], [1, 2, 3, 4], ak.numberCompare, '1');} catch(e) {result = true;}
    if(!result) return false;

	result = false;
    try {ak.setSymmetricDifference([1, 2, 3, 4], [1, 2, 3, 4], ak.numberCompare, 1.5);} catch(e) {result = true;}
    if(!result) return false;

	result = false;
    try {ak.setSymmetricDifference([1, 2, 3, 4], [1, 2, 3, 4], ak.numberCompare, 1, 2.5);} catch(e) {result = true;}
    if(!result) return false;

	result = false;
    try {ak.setSymmetricDifference([1, 2, 3, 4], [1, 2, 3, 4], ak.numberCompare, 1, 2.5, '1');} catch(e) {result = true;}
    if(!result) return false;

	result = false;
    try {ak.setSymmetricDifference([1, 2, 3, 4], [1, 2, 3, 4], ak.numberCompare, 1, 3, 1.5);} catch(e) {result = true;}
    if(!result) return false;

	result = false;
    try {ak.setSymmetricDifference([1, 2, 3, 4], [1, 2, 3, 4], ak.numberCompare, 1, 3, 1, 2.5);} catch(e) {result = true;}
    if(!result) return false;

	result = true;
    try {ak.setSymmetricDifference([1, 2, 3, 4], [1, 2, 3, 4], ak.numberCompare, 1, 3, 1, 3);} catch(e) {result = false;}
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
    var i, j, a1, a2, a3, a4, a5, start, mid1, mid2, end;

    for(i=0;i<100;++i) {
     a1 = u().toArray();
     for(j=0;j<a1.length;++j) a1[j] = ak.floor(a1[j]);
     start = ak.floor(Math.random()*(a1.length+1));
     end = ak.floor(Math.random()*(a1.length+1));
     if(start>end) {j=start; start=end; end=j;}
     mid1 = start + ak.floor(Math.random()*(end-start));
     mid2 = start + ak.floor(Math.random()*(end-start));
     if(mid1<mid2) {j=mid1; mid1=mid2; mid2=j;}

     a1.sort();
     a2 = ak.setSymmetricDifference(a1, a1, ak.alphaCompare, start, mid1, mid2, end);
     a3 = ak.setUnion(a1, a1, ak.alphaCompare, start, mid1, mid2, end);
     a4 = ak.setIntersection(a1, a1, ak.alphaCompare, start, mid1, mid2, end);
     a5 = ak.setDifference(a3, a4);
     if(ak.lexicographicalCompare(a2, a5)!==0) return false;

     a2 = ak.setSymmetricDifference(a1, a1, ak.alphaCompare, start, mid1, end, mid2);
     if(ak.lexicographicalCompare(a1, a2, ak.alphaCompare, start, mid1)!==0) return false;

     a2 = ak.setSymmetricDifference(a1, a1, ak.alphaCompare, mid1, start, mid2, end);
     if(ak.lexicographicalCompare(a1, a2, ak.alphaCompare, mid2, end)!==0) return false;
    }
    return true;
   });

   apply.add('number', function() {
    var u = ak.multiUniformRnd(100, 100);
    var i, j, a1, a2, a3, a4, a5, start, mid1, mid2, end;

    for(i=0;i<100;++i) {
     a1 = u().toArray();
     for(j=0;j<a1.length;++j) a1[j] = ak.floor(a1[j]);
     start = ak.floor(Math.random()*(a1.length+1));
     end = ak.floor(Math.random()*(a1.length+1));
     if(start>end) {j=start; start=end; end=j;}
     mid1 = start + ak.floor(Math.random()*(end-start));
     mid2 = start + ak.floor(Math.random()*(end-start));
     if(mid1<mid2) {j=mid1; mid1=mid2; mid2=j;}

     a1.sort(ak.numberCompare);
     a2 = ak.setSymmetricDifference(a1, a1, ak.numberCompare, start, mid1, mid2, end);
     a3 = ak.setUnion(a1, a1, ak.numberCompare, start, mid1, mid2, end);
     a4 = ak.setIntersection(a1, a1, ak.numberCompare, start, mid1, mid2, end);
     a5 = ak.setDifference(a3, a4, ak.numberCompare);
     if(ak.lexicographicalCompare(a2, a5, ak.numberCompare)!==0) return false;

     a2 = ak.setSymmetricDifference(a1, a1, ak.numberCompare, start, mid1, end, mid2);
     if(ak.lexicographicalCompare(a1, a2, ak.numberCompare, start, mid1)!==0) return false;

     a2 = ak.setSymmetricDifference(a1, a1, ak.numberCompare, mid1, start, mid2, end);
     if(ak.lexicographicalCompare(a1, a2, ak.numberCompare, mid2, end)!==0) return false;
    }
    return true;
   });

   setSymmetricDifference.add(init);
   setSymmetricDifference.add(apply);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   setSymmetricDifference.add(load);
  }

  akTest.add(setSymmetricDifference);
 }

 ak.using(['Algorithm/SetSymmetricDifference.js', 'Algorithm/SetIntersection.js', 'Algorithm/SetUnion.js', 'Algorithm/SetDifference.js', 'Algorithm/Compare.js', 'Algorithm/Sort.js', 'Algorithm/EqualRange.js', 'Algorithm/LexicographicalCompare.js', 'Distribution/MultiUniformDistribution.js'], define);
})();