"use strict";

(function() {
 function define() {
  var minElement = {
   name: 'algorithm.minElement',
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
    try {ak.minElement(1);} catch(e) {result = true;}
    if(!result) return false;

    result = false;
    try {ak.minElement([1, 2, 3, 4], {});} catch(e) {result = true;}
    if(!result) return false;

    result = false;
    try {ak.minElement([1, 2, 3, 4], ak.numberCompare, '1');} catch(e) {result = true;}
    if(!result) return false;

    result = false;
    try {ak.minElement([1, 2, 3, 4], ak.numberCompare, 1.5);} catch(e) {result = true;}
    if(!result) return false;
   
    result = false;
    try {ak.minElement([1, 2, 3, 4], ak.numberCompare, 1, 2.5);} catch(e) {result = true;}
    if(!result) return false;

    result = true;
    try {ak.minElement([1, 2, 3, 4], ak.numberCompare, 1, 3);} catch(e) {result = false;}
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
    var i, a, start, end, min, val, j;

    for(i=0;i<100;++i) {
     a = u().toArray();
     for(j=0;j<a.length;++j) a[j] = ak.floor(a[j]);
     start = ak.floor(Math.random()*(a.length+1));
     end = ak.floor(Math.random()*(a.length+1));
     if(start>end) {j=start; start=end; end=j;}

     min = ak.minElement(a, ak.alphaCompare, start, end);

     if(start===end) {
      if(min!==-1) return false;
     }
     else {
      for(j=start;j<min;++j) if(a[j].toString()<=a[min].toString()) return false;
      for(j=min+1;j<end;++j) if(a[j].toString()<a[min].toString())  return false;
     }
    }
    return true;
   });

   apply.add('number', function() {
    var u = ak.multiUniformRnd(100, 100);
    var i, a, start, end, min, val, j;

    for(i=0;i<100;++i) {
     a = u().toArray();
     for(j=0;j<a.length;++j) a[j] = ak.floor(a[j]);
     start = ak.floor(Math.random()*(a.length+1));
     end = ak.floor(Math.random()*(a.length+1));
     if(start>end) {j=start; start=end; end=j;}

     min = ak.minElement(a, ak.numberCompare, start, end);

     if(start===end) {
      if(min!==-1) return false;
     }
     else {
      for(j=start;j<min;++j) if(a[j]<=a[min]) return false;
      for(j=min+1;j<end;++j) if(a[j]<a[min])  return false;
     }
    }
    return true;
   });

   minElement.add(init);
   minElement.add(apply);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   minElement.add(load);
  }

  akTest.add(minElement);
 }

 ak.using(['Algorithm/MinElement.js', 'Distribution/MultiUniformDistribution.js'], define);
})();