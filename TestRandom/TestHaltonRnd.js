"use strict";

(function() {
 function define() {
  var haltonRnd = {
   name: 'random.haltonRnd',
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
  
    result = false
    try {ak.haltonRnd(1);} catch(e) {result = true;}
    if(!result) return false;
  
    result = false
    try {ak.haltonRnd(3.5);} catch(e) {result = true;}
    if(!result) return false;
  
    result = false
    try {ak.haltonRnd(ak.INFINITY);} catch(e) {result = true;}
    if(!result) return false;
  
    result = false
    try {ak.haltonRnd('x');} catch(e) {result = true;}
    if(!result) return false;
  
    result = false
    try {ak.haltonRnd(5, {});} catch(e) {result = true;}
    if(!result) return false;
  
    result = false
    try {ak.haltonRnd([1, 5]);} catch(e) {result = true;}
    if(!result) return false;
  
    result = false
    try {ak.haltonRnd([3.5, 5]);} catch(e) {result = true;}
    if(!result) return false;
  
    result = false
    try {ak.haltonRnd([ak.INFINITY, 5]);} catch(e) {result = true;}
    if(!result) return false;
  
    result = false
    try {ak.haltonRnd([5, 1]);} catch(e) {result = true;}
    if(!result) return false;
  
    result = false
    try {ak.haltonRnd([5, 3.5]);} catch(e) {result = true;}
    if(!result) return false;
  
    result = false
    try {ak.haltonRnd([5, ak.INFINITY]);} catch(e) {result = true;}
    if(!result) return false;
  
    result = false
    try {ak.haltonRnd([5, 7], {});} catch(e) {result = true;}
    if(!result) return false;
  
    return true;
   }
  
   init.add('invalid arguments', invalidInit);
  
   var univariate = {
    name: 'univariate',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   function uniCompare() {
    var h1 = ak.haltonRnd(5);
    var h2 = ak.haltonRnd(5, ak.mtRnd());
    var n = 1000000;
    var sx1 = 0.0;
    var sx2 = 0.0;
    var sy1 = 0.0;
    var sy2 = 0.0;
    var sz1 = 0.0;
    var sz2 = 0.0;
    var i, x, y, z;
  
    for(i=0;i<n;++i) {
     x = h1();
     y = h2();
     z = Math.random();
  
     sx1 += x; sx2 += x*x;
     sy1 += y; sy2 += y*y;
     sz1 += z; sz2 += z*z;
    }
    sx1 /= n; sx2 /= n; sx2 -= sx1*sx1;
    sy1 /= n; sy2 /= n; sy2 -= sy1*sy1;
    sz1 /= n; sz2 /= n; sz2 -= sz1*sz1;
  
    if(ak.diff(sx1, 1/2)>1e-5) return false;
    if(ak.diff(sx2, 1/12)>1e-10) return false;
  
    if(ak.diff(sy1, 1/2)>1e-5) return false;
    if(ak.diff(sy2, 1/12)>1e-10) return false;
  
    if(ak.diff(sx1, 1/2)>ak.diff(sz1, 1/2)) return false;
    if(ak.diff(sx2, 1/12)>ak.diff(sz2, 1/12)) return false;
  
    return true;
   }
  
   univariate.add('univariate comparison', uniCompare);
  
   var multivariate = {
    name: 'multivariate',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   function multiCompare() {
    var mt1 = ak.mtRnd(0);
    var mt2 = ak.mtRnd(0);
    var h5  = ak.haltonRnd(5, mt1);
    var h7  = ak.haltonRnd(7, mt1);
    var h57 = ak.haltonRnd([5, 7], mt2);
    var n = 10000;
    var i, a;
  
    for(i=0;i<n;++i) {
     a = h57();
     if(a[0]!==h5()) return false;
     if(a[1]!==h7()) return false;
    }
    return true;
   }
  
   multivariate.add('multivariate comparison', multiCompare);
  
   haltonRnd.add(init);
   haltonRnd.add(univariate);
   haltonRnd.add(multivariate);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   haltonRnd.add(load);
  }

  akTest.add(haltonRnd);
 }

 ak.using(['Random/HaltonRnd.js', 'Random/MTRnd.js'], define);
})();