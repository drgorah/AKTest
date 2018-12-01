"use strict";

(function() {
 function define() {
  var includes = {
   name: 'algorithm.includes',
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
    try {ak.includes(1);} catch(e) {result = true;}
    if(!result) return false;

	result = false;
    try {ak.includes([1, 2, 3, 4], 1);} catch(e) {result = true;}
    if(!result) return false;

	result = false;
    try {ak.includes([1, 2, 3, 4], [1, 2, 3, 4], {});} catch(e) {result = true;}
    if(!result) return false;

	result = false;
    try {ak.includes([1, 2, 3, 4], [1, 2, 3, 4], ak.numberCompare, '1');} catch(e) {result = true;}
    if(!result) return false;

	result = false;
    try {ak.includes([1, 2, 3, 4], [1, 2, 3, 4], ak.numberCompare, 1.5);} catch(e) {result = true;}
    if(!result) return false;

	result = false;
    try {ak.includes([1, 2, 3, 4], [1, 2, 3, 4], ak.numberCompare, 1, 2.5);} catch(e) {result = true;}
    if(!result) return false;

	result = false;
    try {ak.includes([1, 2, 3, 4], [1, 2, 3, 4], ak.numberCompare, 1, 2.5, '1');} catch(e) {result = true;}
    if(!result) return false;

	result = false;
    try {ak.includes([1, 2, 3, 4], [1, 2, 3, 4], ak.numberCompare, 1, 3, 1.5);} catch(e) {result = true;}
    if(!result) return false;

	result = false;
    try {ak.includes([1, 2, 3, 4], [1, 2, 3, 4], ak.numberCompare, 1, 3, 1, 2.5);} catch(e) {result = true;}
    if(!result) return false;

	result = true;
    try {ak.includes([1, 2, 3, 4], [1, 2, 3, 4], ak.numberCompare, 1, 3, 1, 3);} catch(e) {result = false;}
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
    var i, a1, a2, start1, end1, start2, end2, j;

    for(i=0;i<100;++i) {
     a1 = u().toArray();
     for(j=0;j<a1.length;++j) a1[j] = ak.floor(a1[j]);
     start1 = ak.floor(Math.random()*(a1.length+1));
     end1 = ak.floor(Math.random()*(a1.length+1));
     if(start1>end1) {j=start1; start1=end1; end1=j;}

     start2 = ak.floor(start1 + Math.random()*(end1-start1+1));
     end2 = ak.floor(start1 + Math.random()*(end1-start1+1));
     if(start2>end2) {j=start2; start2=end2; end2=j;}

     ak.sort(a1);
     a2 = a1.slice(0);

     if(!ak.includes(a1, a2, ak.alphaCompare, start1, end1, start2, end2)) return false;
     if(start1<end1 && ak.includes(a1, a2, ak.alphaCompare, end1, start1, start2, end2)) return false;
     if(start2<end2 && ak.includes(a1, a2, ak.alphaCompare, start1, end1, end2, start2)) return false;

     if(start2!==end2) {
      a2[ak.floor((start2+end2)/2)] = a1[end1-1]+1;
      if(ak.includes(a1, a2, ak.alphaCompare, start1, end1, start2, end2)) return false;
     }
    }
    return true;
   });

   apply.add('number', function() {
    var u = ak.multiUniformRnd(100, 100);
    var i, a1, a2, start1, end1, start2, end2, j;

    for(i=0;i<100;++i) {
     a1 = u().toArray();
     for(j=0;j<a1.length;++j) a1[j] = ak.floor(a1[j]);
     start1 = ak.floor(Math.random()*(a1.length+1));
     end1 = ak.floor(Math.random()*(a1.length+1));
     if(start1>end1) {j=start1; start1=end1; end1=j;}

     start2 = ak.floor(start1 + Math.random()*(end1-start1+1));
     end2 = ak.floor(start1 + Math.random()*(end1-start1+1));
     if(start2>end2) {j=start2; start2=end2; end2=j;}

     ak.sort(a1, ak.numberCompare);
     a2 = a1.slice(0);

     if(!ak.includes(a1, a2, ak.numberCompare, start1, end1, start2, end2)) return false;
     if(start1<end1 && ak.includes(a1, a2, ak.numberCompare, end1, start1, start2, end2)) return false;
     if(start2<end2 && ak.includes(a1, a2, ak.numberCompare, start1, end1, end2, start2)) return false;

     if(start2!==end2) {
      a2[ak.floor((start2+end2)/2)] = a1[end1-1]+1;
      if(ak.includes(a1, a2, ak.numberCompare, start1, end1, start2, end2)) return false;
     }
    }
    return true;
   });

   includes.add(init);
   includes.add(apply);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   includes.add(load);
  }

  akTest.add(includes);
 }

 ak.using(['Algorithm/Includes.js', 'Algorithm/Compare.js', 'Algorithm/Sort.js', 'Distribution/MultiUniformDistribution.js'], define);
})();