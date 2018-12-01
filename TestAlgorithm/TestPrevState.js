"use strict";

(function() {
 function define() {
  var prevState = {
   name: 'algorithm.prevState',
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
    try {ak.nextState();} catch(e) {result = true;}
    if(!result) return false;

    result = false;
    try {ak.nextState('a');} catch(e) {result = true;}
    if(!result) return false;

    result = false;
    try {ak.nextState([1,2,3]);} catch(e) {result = true;}
    if(!result) return false;

    result = false;
    try {ak.nextState([1,2,3], 'a');} catch(e) {result = true;}
    if(!result) return false;

    result = false;
    try {ak.nextState([1,2,3], 10, 'a');} catch(e) {result = true;}
    if(!result) return false;

    result = false;
    try {ak.nextState([1,2,3], 10, 'a');} catch(e) {result = true;}
    if(!result) return false;

    result = false;
    try {ak.nextState([1,2,3], [10,10,10], 'a');} catch(e) {result = true;}
    if(!result) return false;

    return true;
   }

   init.add('invalid arguments', invalidInit);

   function recurse(n, a, l, u) {
    if(n===0) return false;
    if(--a[n-1]>=l[n-1]) return true;
    a[n-1] = u[n-1]-1;
    return recurse(n-1, a, l, u);
   }

   function cycle(a, l, u) {
    var a2 = a.slice(0);
    var n = a.length;
    var l2, u2, i;

    switch(ak.nativeType(l)) {
     case ak.ARRAY_T: l2 = l.slice(0); break;
     case ak.NUMBER_T: l2 = new Array(n); for(i=0;i<n;++i) l2[i] = l; break;
    }

    switch(ak.nativeType(u)) {
     case ak.ARRAY_T: u2 = u.slice(0); break;
     case ak.NUMBER_T: u2 = new Array(n); for(i=0;i<n;++i) u2[i] = u; break;
     case ak.UNDEFINED_T: u2 = l2; l2 = new Array(n); for(i=0;i<n;++i) l2[i] = 0; break;
    }

    while(recurse(n, a2, l2, u2)) {
     ak.prevState(a, l, u);
     for(i=0;i<n;++i) if(a[i]!==a2[i]) return false;
    }
    ak.prevState(a, l, u);
    for(i=0;i<n;++i) if(a[i]!==a2[i]) return false;
    return true;
   }

   var apply = {
    name: 'apply',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   apply.add('array-array', function(){return cycle([3, 4, 5], [1, 2, 3], [4, 5, 6]);});
   apply.add('array-number', function(){return cycle([3, 4, 5], [1, 2, 3], 6);});
   apply.add('array-undefined', function(){return cycle([3, 4, 5], [4, 5, 6]);});
   apply.add('number-array', function(){return cycle([3, 4, 5], 1, [4, 5, 6]);});
   apply.add('number-number', function(){return cycle([3, 4, 5], 1, 6);});
   apply.add('number-undefined', function(){return cycle([3, 4, 5], 6);});

   prevState.add(init);
   prevState.add(apply);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   prevState.add(load);
  }

  akTest.add(prevState);
 }

 ak.using('Algorithm/PrevState.js', define);
})();