"use strict";

(function() {
 function define() {
  var minHeap = {
   name: 'container.minHeap',
   body: [],
   add: function(t) {this.body.push(t);}
  };

  try {
   var h0 = ak.minHeap();
   var h1 = ak.minHeap([1], ak.floatCompare);
   var h6 = ak.minHeap(['a', 'f', 'b', 'd', 'b', 'e']);
   var h8 = ak.minHeap([1, 6, 8, 7, 6, 3, 5, 4], ak.floatCompare);

   var init = {
    name: 'init',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   function invalid() {
    try {ak.minHeap('a'); return false;} catch(e) {}
    try {ak.minHeap([], 'a'); return false;} catch(e) {}
    try {ak.minHeap({size:'a'}); return false;} catch(e) {}
    try {ak.minHeap({size:1, at:'a'}); return false;} catch(e) {}
    try {ak.minHeap({size:1, at:function(){}, compare:'a'}); return false;} catch(e) {}
    return true;
   }

   function isHeap(h) {
    var n = h.size();
    var cmp = h.compare();
    var i, c;

    for(i=0;(c=i*2+1)<n;++i) if(cmp(h.at(i), h.at(c))>0) return false;
    for(i=0;(c=i*2+2)<n;++i) if(cmp(h.at(i), h.at(c))>0) return false;
    return true;
   }

   init.add('invalid', invalid);
   init.add('are heaps', function(){return isHeap(h0) && isHeap(h1) && isHeap(h6) && isHeap(h8);});

   var members = {
    name: 'members',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   function checkAt(h) {
    var n = h.size();
    var a = h.toArray();
    var i;

    if(a.length!==n) return false;
    for(i=0;i<n;++i) if(h.at(i)!==a[i]) return false;
    return true;
   }

   function checkIndexOf(h) {
    var n = h.size();
    var a = h.toArray();
    var i, x;

    for(i=0;i<n;++i) {
     x = h.at(i);
     if(h.indexOf(x)!==a.indexOf(x)) return false;
     if(h.lastIndexOf(x)!==a.lastIndexOf(x)) return false;
    }
    return true;
   }

   function checkPop(h, a) {
    var n = h.size();
    var i;

    if(ak.nativeType(a)===ak.UNDEFINED_T) a = h.toArray();

    h = ak.minHeap(h);
    a.sort(h.compare());

    for(i=0;i<n;++i) if(h.pop()!==a.pop()) return false;
    return true;
   }

   function checkShift(h) {
    var n = h.size();
    var a = h.toArray();
    var i;

    h = ak.minHeap(h);
    a.sort(h.compare());

    for(i=0;i<n;++i) if(h.shift()!==a.shift()) return false;
    return true;
   }

   function checkAdd(h, x) {
    if(h.push!==h.add) return false;
    if(h.unshift!==h.add) return false;
    h = ak.minHeap(h);
    h.add(x);
    return isHeap(h) && checkPop(h);
   }

   function checkRemove(h, i) {
    var n = h.size();
    var a = h.toArray();
    var x, j, ca, ch;

    h = ak.minHeap(h);

    x = h.remove(-1);
    if(ak.nativeType(x)!==ak.UNDEFINED_T || h.size()!==n) return false;

    x = h.remove(n);
    if(ak.nativeType(x)!==ak.UNDEFINED_T || h.size()!==n) return false;

    x = h.remove(i);
    if(ak.nativeType(x)!==ak.UNDEFINED_T) {
     if(h.size()!==n-1) return false;

     ca = 0; for(j=0;j<n;++j) if(a[j]===x) ++ca;
     ch = 0; for(j=0;j<n;++j) if(h.at(j)===x) ++ch;
     if(ca!==0 && ch!==ca-1) return false;
    }

    return isHeap(h) && checkPop(h);
   }

   function checkReplace(h, i, x) {
    var n = h.size();
    var a = h.toArray();
    var xi = h.at(i);
    var cx = 0;
    var cxi = 0;
    var i, c;

    for(i=0;i<n;++i) if(a[i]===x)  ++cx;
    for(i=0;i<n;++i) if(a[i]===xi) ++cxi;

    if(i<0 || i>=n) {
     if(ak.nativeType(h.replace(i, x))!==ak.UNDEFINED_T) return false;
     for(i=0;i<=n;++i) if(h.at(i)===x) --cx;
     if(cx!==-1) return false;
    }
    else {
     h = ak.minHeap(h);
     if(h.replace(i, x)!==xi) return false;

     for(i=0;i<n;++i) if(h.at(i)===x)  --cx;
     for(i=0;i<n;++i) if(h.at(i)===xi) --cxi;
     if(x===xi && (cx!==0  || cxi!==0)) return false;
     if(x!==xi && (cx!==-1 || cxi!==1)) return false;
    }
    return isHeap(h) && checkPop(h);
   }

   function checkMerge(h0, h1) {
    var a0 = h0.toArray();
    var a1 = h1.toArray();
    var i;

    h0 = ak.minHeap(h0);
    h1 = ak.minHeap(h1);

    h0.merge(h1);
    for(i=0;i<a1.length;++i) a0.push(a1[i]);
    return isHeap(h0) && checkPop(h0, a0);
   }

   members.add('size', function(){return h0.size()===0 && h1.size()===1 && h6.size()===6 && h8.size()===8;});
   members.add('at/toArray', function(){return checkAt(h0) && checkAt(h1) && checkAt(h6) && checkAt(h8);});
   members.add('min', function(){return h0.min()===undefined && h1.min()===1 && h6.min()==='a' && h8.min()===1;});
   members.add('max', function(){return h0.max()===undefined && h1.max()===1 && h6.max()==='f' && h8.max()===8;});
   members.add('indexOf/lastIndexOf', function(){return checkIndexOf(h0) && checkIndexOf(h1) && checkIndexOf(h6) && checkIndexOf(h8);});
   members.add('add/push/unshift', function(){return checkAdd(h0, 'a') && checkAdd(h1, -1) && checkAdd(h6, 'c') && checkAdd(h8, 4);});
   members.add('pop', function(){return checkPop(h0) && checkPop(h1) && checkPop(h6) && checkPop(h8);});
   members.add('shift', function(){return checkShift(h0) && checkShift(h1) && checkShift(h6) && checkShift(h8);});
   members.add('remove', function(){return checkRemove(h0, 0) && checkRemove(h1, 0) && checkRemove(h6, 3) && checkRemove(h8, 2);});
   members.add('replace', function(){return checkReplace(h0, 0, 'z') && checkReplace(h1, 0, 99) && checkReplace(h6, 3, 'z') && checkReplace(h8, 2, 99) && checkReplace(h8, -1, 99) && checkReplace(h8, 100, 99);});
   members.add('merge', function(){return checkMerge(h0, h6) && checkMerge(h1, h8) && checkMerge(h6, h8) && checkMerge(h6 ,h6) && checkMerge(h8, h8);});
   members.add('toString', function(){return h0.toString()===h0.toArray().toString() && h1.toString()===h1.toArray().toString() && h6.toString()===h6.toArray().toString() && h8.toString()===h8.toArray().toString();});
   members.add('compare', function(){return h0.compare()===ak.alphaCompare && h1.compare()===ak.floatCompare && h6.compare()===ak.alphaCompare && h8.compare()===ak.floatCompare;});

   minHeap.add(init);
   minHeap.add(members);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   minHeap.add(load);
  }

  akTest.add(minHeap);
 }

 ak.using('Container/MinHeap.js', define);
})();