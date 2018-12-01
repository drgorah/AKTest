"use strict";

(function() {
 function define() {
  var partition = {
   name: 'algorithm.partition',
   body: [],
   add: function(t) {this.body.push(t);}
  };

  function pred(v, compare) {
   if(ak.nativeType(compare)===ak.UNDEFINED_T) compare = ak.alphaCompare;
   return function(x){return compare(x, v)<0;};
  }

  try {
   var init = {
    name: 'init',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   
   function invalidInit() {
    var result;
   
    result = false;
    try {ak.partition(1, pred(0));} catch(e) {result = true;}
    if(!result) return false;

    result = false;
    try {ak.partition([1, 2, 3, 4], {});} catch(e) {result = true;}
    if(!result) return false;
   
    result = false;
    try {ak.partition([1, 2, 3, 4], pred(0), '1');} catch(e) {result = true;}
    if(!result) return false;
   
    result = false;
    try {ak.partition([1, 2, 3, 4], pred(0), 1.5);} catch(e) {result = true;}
    if(!result) return false;
   
    result = false;
    try {ak.partition([1, 2, 3, 4], pred(0), 1, 2.5);} catch(e) {result = true;}
    if(!result) return false;

    result = true;
    try {ak.partition([1, 2, 3, 4], pred(0), 1, 3);} catch(e) {result = false;}
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
    var i, a, value, start, end, j, k;

    for(i=0;i<100;++i) {
     a = u().toArray();
     for(j=0;j<a.length;++j) a[j] = ak.floor(a[j]);
     value = ak.floor(Math.random()*100);
     start = ak.floor(Math.random()*a.length);
     end = ak.floor(Math.random()*a.length);
     if(start>end) {j=start; start=end; end=j;}

     j = ak.partition(a, pred(value), start, end);
     for(k=start;k<j;++k) if(!(ak.alphaCompare(a[k], value)<0)) return false;
     for(k=j;k<end;++k)   if(ak.alphaCompare(a[k], value)<0)    return false;
    }
    return true;
   });

   apply.add('number', function() {
    var u = ak.multiUniformRnd(100, 100);
    var i, a, value, start, end, j, k;

    for(i=0;i<100;++i) {
     a = u().toArray();
     for(j=0;j<a.length;++j) a[j] = ak.floor(a[j]);
     value = ak.floor(Math.random()*100);
     start = ak.floor(Math.random()*a.length);
     end = ak.floor(Math.random()*a.length);
     if(start>end) {j=start; start=end; end=j;}

     j = ak.partition(a, pred(value, ak.numberCompare), start, end);
     for(k=start;k<j;++k) if(!(ak.numberCompare(a[k], value)<0)) return false;
     for(k=j;k<end;++k)   if(ak.numberCompare(a[k], value)<0)    return false;
    }
    return true;
   });

   partition.add(init);
   partition.add(apply);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   partition.add(load);
  }

  akTest.add(partition);
 }

 ak.using(['Algorithm/Partition.js', 'Distribution/MultiUniformDistribution.js'], define);
})();