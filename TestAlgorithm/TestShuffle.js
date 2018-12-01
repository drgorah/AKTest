"use strict";

(function() {
 function define() {
  var shuffle = {
   name: 'algorithm.shuffle',
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
    try {ak.shuffle(1);} catch(e) {result = true;}
    if(!result) return false;
   
    result = false;
    try {ak.shuffle([1, 2, 3, 4], '1');} catch(e) {result = true;}
    if(!result) return false;
   
    result = false;
    try {ak.shuffle([1, 2, 3, 4], 1.5);} catch(e) {result = true;}
    if(!result) return false;
   
    result = false;
    try {ak.shuffle([1, 2, 3, 4], 1, 2.5);} catch(e) {result = true;}
    if(!result) return false;
   
    result = false;
    try {ak.shuffle([1, 2, 3, 4], 1, 3, {});} catch(e) {result = true;}
    if(!result) return false;

    result = true;
    try {ak.shuffle([1, 2, 3, 4], 1, 3, Math.random);} catch(e) {result = false;}
    if(!result) return false;
   
    return true;
   }
   
   init.add('invalid arguments', invalidInit);
   
   var range = {
    name: 'range',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   
   function rangeCompare(a1, start, end) {
    var n = 100;
    var rnd1 = ak.mtRnd(0);
    var rnd2 = ak.mtRnd(0);
    var a2 = a1.slice(start, end);
    var n = a2.length;
    var i, j, a3;
   
    for(i=0;i<n;++i) {
     ak.shuffle(a1, start, end, rnd1);
     ak.shuffle(a2, 0, n, rnd2);
     a3 = a1.slice(start, end);
   
     for(j=0;j<n;++j) if(a2[j]!==a3[j]) return false;
    }
    return true;
   }
   
   function uniformShuffle() {
    var n = 1000000;
    var l = 4;
    var a = new Array(l);
    var count = new Array(l);
    var i, j, failed;
   
    for(i=0;i<l;++i) {
     a[i] = i;
     count[i] = new Array(l);
     for(j=0;j<l;++j) count[i][j] = 0;
    }
   
    for(i=0;i<n;++i) {
     ak.shuffle(a);
     for(j=0;j<l;++j) count[j][a[j]] += 1;
    }
   
    failed = 0;
    for(i=0;i<l;++i) for(j=0;j<l;++j) if(ak.diff(count[i][j], n/l)>1e-2) ++failed;
    return failed < l;
   }
   
   range.add('empty array', function(){return rangeCompare([], 0, 0) && rangeCompare([], 0, 1) && rangeCompare([], 1, 2) && rangeCompare([], -2, -1);});
   range.add('empty range', function(){return rangeCompare([1, 2, 3, 4], 0, 0) && rangeCompare([1, 2, 3, 4], 1, 1) && rangeCompare([1, 2, 3, 4], 4, 5) && rangeCompare([1, 2, 3, 4], -5, -4);});
   range.add('non-empty range', function(){return rangeCompare([1, 2, 3, 4], 0, 3) && rangeCompare([1, 2, 3, 4], 1, 3) && rangeCompare([1, 2, 3, 4], -3, -1) && rangeCompare([1, 2, 3, 4], 1, 5) && rangeCompare([1, 2, 3, 4], -5, 5);});
   range.add('uniformity', uniformShuffle);
   
   shuffle.add(init);
   shuffle.add(range);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   shuffle.add(load);
  }

  akTest.add(shuffle);
 }

 ak.using(['Algorithm/Shuffle.js', 'Random/MTRnd.js'], define);
})();