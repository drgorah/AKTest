"use strict";

(function() {
 function define() {
  var nevilleInterpolate = {
   name: 'approx.nevilleInterpolate',
   body: [],
   add: function(t) {this.body.push(t);}
  };

  try {
   var refine = {
    name: 'refine',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   
   function refineFunc(n, f) {
    var interpolate = ak.nevilleInterpolate(0);
    var i, x, y, d0, d1;
   
    d0 = ak.INFINITY;
   
    for(i=0;i<n;++i) {
     x = 1/(i+1);
     y = f(x);
   
     d1 = Math.abs(interpolate.refine(x, y) - f(0));
     if(d1>d0) return false;
     d0 = d1;
    }
    return true;
   }
   
   refine.add('exp O(5)', function(){return refineFunc(6, Math.exp);});
   
   nevilleInterpolate.add(refine);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   nevilleInterpolate.add(load);
  }

  akTest.add(nevilleInterpolate);
 }

 ak.using('Approx/NevilleInterpolate.js', define);
})();
