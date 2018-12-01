"use strict";

(function() {
 function define() {
  var nthElement = {
   name: 'algorithm.nthElement',
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
    try {ak.nthElement(1, 0);} catch(e) {result = true;}
    if(!result) return false;

    result = false;
    try {ak.nthElement([1, 2, 3, 4], '1');} catch(e) {result = true;}
    if(!result) return false;

    result = false;
    try {ak.nthElement([1, 2, 3, 4], 1.5);} catch(e) {result = true;}
    if(!result) return false;

    result = false;
    try {ak.nthElement([1, 2, 3, 4], 0, {});} catch(e) {result = true;}
    if(!result) return false;
   
    result = false;
    try {ak.nthElement([1, 2, 3, 4], 0, ak.numberCompare, '1');} catch(e) {result = true;}
    if(!result) return false;
   
    result = false;
    try {ak.nthElement([1, 2, 3, 4], 0, ak.numberCompare, 1.5);} catch(e) {result = true;}
    if(!result) return false;
   
    result = false;
    try {ak.nthElement([1, 2, 3, 4], 0, ak.numberCompare, 1, 2.5);} catch(e) {result = true;}
    if(!result) return false;

    result = true;
    try {ak.nthElement([1, 2, 3, 4], 0, ak.numberCompare, 1, 3);} catch(e) {result = false;}
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
    var i, a, start, end, mid, val, j, k;

    for(i=0;i<100;++i) {
     a = u().toArray();
     for(j=0;j<a.length;++j) a[j] = ak.floor(a[j]);
     start = ak.floor(Math.random()*(a.length+1));
     end = ak.floor(Math.random()*(a.length+1));
     if(start>end) {j=start; start=end; end=j;}
     mid = start+ak.floor(Math.random()*(end-start));

     val = ak.nthElement(a, mid, ak.alphaCompare, start, end);
     if(mid<end && val!==a[mid]) return false;
     else if(mid===end && val!==undefined) return false;

     for(k=start;k<mid;++k) if(!(ak.alphaCompare(a[k], val)<=0)) return false;
     for(k=mid+1;k<end;++k) if(ak.alphaCompare(a[k], val)<0)     return false;
    }
    return true;
   });

   apply.add('number', function() {
    var u = ak.multiUniformRnd(100, 100);
    var i, a, start, end, mid, val, j, k;

    for(i=0;i<100;++i) {
     a = u().toArray();
     for(j=0;j<a.length;++j) a[j] = ak.floor(a[j]);
     start = ak.floor(Math.random()*(a.length+1));
     end = ak.floor(Math.random()*(a.length+1));
     if(start>end) {j=start; start=end; end=j;}
     mid = start+ak.floor(Math.random()*(end-start));

     val = ak.nthElement(a, mid, ak.numberCompare, start, end);
     if(mid<end && val!==a[mid]) return false;
     else if(mid===end && val!==undefined) return false;

     for(k=start;k<mid;++k) if(!(ak.numberCompare(a[k], val)<=0)) return false;
     for(k=mid+1;k<end;++k)   if(ak.numberCompare(a[k], val)<0)     return false;
    }
    return true;
   });

   nthElement.add(init);
   nthElement.add(apply);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   nthElement.add(load);
  }

  akTest.add(nthElement);
 }

 ak.using(['Algorithm/NthElement.js', 'Distribution/MultiUniformDistribution.js'], define);
})();