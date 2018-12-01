"use strict";

(function() {
 function define() {
  var setDifference = {
   name: 'algorithm.setDifference',
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
    try {ak.setDifference(1);} catch(e) {result = true;}
    if(!result) return false;

	result = false;
    try {ak.setDifference([1, 2, 3, 4], 1);} catch(e) {result = true;}
    if(!result) return false;

	result = false;
    try {ak.setDifference([1, 2, 3, 4], [1, 2, 3, 4], {});} catch(e) {result = true;}
    if(!result) return false;

	result = false;
    try {ak.setDifference([1, 2, 3, 4], [1, 2, 3, 4], ak.numberCompare, '1');} catch(e) {result = true;}
    if(!result) return false;

	result = false;
    try {ak.setDifference([1, 2, 3, 4], [1, 2, 3, 4], ak.numberCompare, 1.5);} catch(e) {result = true;}
    if(!result) return false;

	result = false;
    try {ak.setDifference([1, 2, 3, 4], [1, 2, 3, 4], ak.numberCompare, 1, 2.5);} catch(e) {result = true;}
    if(!result) return false;

	result = false;
    try {ak.setDifference([1, 2, 3, 4], [1, 2, 3, 4], ak.numberCompare, 1, 2.5, '1');} catch(e) {result = true;}
    if(!result) return false;

	result = false;
    try {ak.setDifference([1, 2, 3, 4], [1, 2, 3, 4], ak.numberCompare, 1, 3, 1.5);} catch(e) {result = true;}
    if(!result) return false;

	result = false;
    try {ak.setDifference([1, 2, 3, 4], [1, 2, 3, 4], ak.numberCompare, 1, 3, 1, 2.5);} catch(e) {result = true;}
    if(!result) return false;

	result = true;
    try {ak.setDifference([1, 2, 3, 4], [1, 2, 3, 4], ak.numberCompare, 1, 3, 1, 3);} catch(e) {result = false;}
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
    var i, j, a1, a2, start, mid1, mid2, end, r11, r12, r2;

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
     a2 = ak.setDifference(a1, a1, ak.alphaCompare, start, mid1, mid2, end);

     for(j=0;j<a2.length;j++) {
      r11 = ak.equalRange(a1, a2[j], ak.alphaCompare, start, mid1);
      r12 = ak.equalRange(a1, a2[j], ak.alphaCompare, mid2, end);
      r2  = ak.equalRange(a2, a2[j]);

      if(r2[1]-r2[0] !== (r11[1]-r11[0])-(r12[1]-r12[0])) return false;
     }

     a2 = ak.setDifference(a1, a1, ak.alphaCompare, start, mid1, end, mid2);
     if(ak.lexicographicalCompare(a1, a2, ak.alphaCompare, start, mid1)!==0) return false;

     a2 = ak.setDifference(a1, a1, ak.alphaCompare, mid1, start, mid2, end);
     if(a2.length!==0) return false;
    }
    return true;
   });

   apply.add('number', function() {
    var u = ak.multiUniformRnd(100, 100);
    var i, j, a1, a2, start, mid1, mid2, end, r11, r12, r2;

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
     a2 = ak.setDifference(a1, a1, ak.numberCompare, start, mid1, mid2, end);

     for(j=0;j<a2.length;j++) {
      r11 = ak.equalRange(a1, a2[j], ak.numberCompare, start, mid1);
      r12 = ak.equalRange(a1, a2[j], ak.numberCompare, mid2, end);
      r2  = ak.equalRange(a2, a2[j], ak.numberCompare);

      if(r2[1]-r2[0] !== (r11[1]-r11[0])-(r12[1]-r12[0])) return false;
     }

     a2 = ak.setDifference(a1, a1, ak.numberCompare, start, mid1, end, mid2);
     if(ak.lexicographicalCompare(a1, a2, ak.numberCompare, start, mid1)!==0) return false;

     a2 = ak.setDifference(a1, a1, ak.numberCompare, mid1, start, mid2, end);
     if(a2.length!==0) return false;
    }
    return true;
   });

   setDifference.add(init);
   setDifference.add(apply);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   setDifference.add(load);
  }

  akTest.add(setDifference);
 }

 ak.using(['Algorithm/SetDifference.js', 'Algorithm/Compare.js', 'Algorithm/Sort.js', 'Algorithm/EqualRange.js', 'Algorithm/LexicographicalCompare.js', 'Distribution/MultiUniformDistribution.js'], define);
})();