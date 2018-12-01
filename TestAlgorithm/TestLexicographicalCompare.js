"use strict";

(function() {
 function define() {
  var lexicographicalCompare = {
   name: 'algorithm.lexicographicalCompare',
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
    try {ak.lexicographicalCompare(1);} catch(e) {result = true;}
    if(!result) return false;

	result = false;
    try {ak.lexicographicalCompare([1, 2, 3, 4], 1);} catch(e) {result = true;}
    if(!result) return false;

	result = false;
    try {ak.lexicographicalCompare([1, 2, 3, 4], [1, 2, 3, 4], {});} catch(e) {result = true;}
    if(!result) return false;

	result = false;
    try {ak.lexicographicalCompare([1, 2, 3, 4], [1, 2, 3, 4], ak.numberCompare, '1');} catch(e) {result = true;}
    if(!result) return false;

	result = false;
    try {ak.lexicographicalCompare([1, 2, 3, 4], [1, 2, 3, 4], ak.numberCompare, 1.5);} catch(e) {result = true;}
    if(!result) return false;

	result = false;
    try {ak.lexicographicalCompare([1, 2, 3, 4], [1, 2, 3, 4], ak.numberCompare, 1, 2.5);} catch(e) {result = true;}
    if(!result) return false;

	result = false;
    try {ak.lexicographicalCompare([1, 2, 3, 4], [1, 2, 3, 4], ak.numberCompare, 1, 2.5, '1');} catch(e) {result = true;}
    if(!result) return false;

	result = false;
    try {ak.lexicographicalCompare([1, 2, 3, 4], [1, 2, 3, 4], ak.numberCompare, 1, 3, 1.5);} catch(e) {result = true;}
    if(!result) return false;

	result = false;
    try {ak.lexicographicalCompare([1, 2, 3, 4], [1, 2, 3, 4], ak.numberCompare, 1, 3, 1, 2.5);} catch(e) {result = true;}
    if(!result) return false;

	result = true;
    try {ak.lexicographicalCompare([1, 2, 3, 4], [1, 2, 3, 4], ak.numberCompare, 1, 3, 1, 3);} catch(e) {result = false;}
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
    var i, a1, a2, start, end, j, min, max;

    for(i=0;i<100;++i) {
     a1 = u().toArray();
     for(j=0;j<a1.length;++j) a1[j] = ak.floor(a1[j]);
     start = ak.floor(Math.random()*(a1.length+1));
     end = ak.floor(Math.random()*(a1.length+1));
     if(start>end) {j=start; start=end; end=j;}

     ak.sort(a1);
     a2 = a1.slice(0);

     if(ak.lexicographicalCompare(a1, a2, ak.alphaCompare, start, end, start, end)!==0) return false;

     if(start<end) {
      if(!isNaN(ak.lexicographicalCompare(a1, a2, ak.alphaCompare, end, start, start, end))) return false;
      if(!isNaN(ak.lexicographicalCompare(a1, a2, ak.alphaCompare, start, end, end, start))) return false;
      if(ak.lexicographicalCompare(a1, a2, ak.alphaCompare, start, end-1, start, end)>=0) return false;
      if(ak.lexicographicalCompare(a1, a2, ak.alphaCompare, start, end, start, end-1)<=0) return false;

      min = a1[ak.floor((start+end)/2)];
      max = min + 1;
      if(ak.alphaCompare(min, max)>0) {j=min;min=max;max=j;}

      a1[ak.floor((start+end)/2)] = min;
      a2[ak.floor((start+end)/2)] = max;
      if(ak.lexicographicalCompare(a1, a2, ak.alphaCompare, start, end, start, end)>=0) return false;

      a1[ak.floor((start+end)/2)] = max;
      a2[ak.floor((start+end)/2)] = min;
      if(ak.lexicographicalCompare(a1, a2, ak.alphaCompare, start, end, start, end)<=0) return false;
     }
    }
    return true;
   });

   apply.add('number', function() {
    var u = ak.multiUniformRnd(100, 100);
    var i, a1, a2, start, end, j, min, max;

    for(i=0;i<100;++i) {
     a1 = u().toArray();
     for(j=0;j<a1.length;++j) a1[j] = ak.floor(a1[j]);
     start = ak.floor(Math.random()*(a1.length+1));
     end = ak.floor(Math.random()*(a1.length+1));
     if(start>end) {j=start; start=end; end=j;}

     ak.sort(a1, ak.numberCompare);
     a2 = a1.slice(0);

     if(ak.lexicographicalCompare(a1, a2, ak.numberCompare, start, end, start, end)!==0) return false;

     if(start<end) {
      if(!isNaN(ak.lexicographicalCompare(a1, a2, ak.numberCompare, end, start, start, end))) return false;
      if(!isNaN(ak.lexicographicalCompare(a1, a2, ak.numberCompare, start, end, end, start))) return false;
      if(ak.lexicographicalCompare(a1, a2, ak.numberCompare, start, end-1, start, end)>=0) return false;
      if(ak.lexicographicalCompare(a1, a2, ak.numberCompare, start, end, start, end-1)<=0) return false;

      min = a1[ak.floor((start+end)/2)];
      max = min + 1;
      if(ak.numberCompare(min, max)>0) {j=min;min=max;max=j;}

      a1[ak.floor((start+end)/2)] = min;
      a2[ak.floor((start+end)/2)] = max;
      if(ak.lexicographicalCompare(a1, a2, ak.numberCompare, start, end, start, end)>=0) return false;

      a1[ak.floor((start+end)/2)] = max;
      a2[ak.floor((start+end)/2)] = min;
      if(ak.lexicographicalCompare(a1, a2, ak.numberCompare, start, end, start, end)<=0) return false;
     }
    }
    return true;
   });

   lexicographicalCompare.add(init);
   lexicographicalCompare.add(apply);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   lexicographicalCompare.add(load);
  }

  akTest.add(lexicographicalCompare);
 }

 ak.using(['Algorithm/LexicographicalCompare.js', 'Algorithm/Compare.js', 'Algorithm/Sort.js', 'Distribution/MultiUniformDistribution.js'], define);
})();