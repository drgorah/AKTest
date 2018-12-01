"use strict";

(function() {
 function define() {
  var monoCubicSplineInterpolate = {
   name: 'approx.monoCubicSplineInterpolate',
   body: [],
   add: function(t) {this.body.push(t);}
  };

  try {
   function invalidNodes() {
    var result;

    result = false;
    try{ak.monoCubicSplineInterpolate();}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.monoCubicSplineInterpolate('a');}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.monoCubicSplineInterpolate([]);}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.monoCubicSplineInterpolate([3, 1, 2]);}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.monoCubicSplineInterpolate([3, 1, 2], [9, 1, 2, 1]);}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.monoCubicSplineInterpolate([1], [1]);}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.monoCubicSplineInterpolate([3, 1, 2, 1], [9, 1, 4, 1]);}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.monoCubicSplineInterpolate([3, 1, 2], [ak.complex(9), 1, 4]);}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.monoCubicSplineInterpolate([3, 1, 2], ['a', 'a', 'a']);}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.monoCubicSplineInterpolate([3, 'a', 2], [9, 1, 4]);}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.monoCubicSplineInterpolate([3, 1, 2, 1], function(x){return x*x;});}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.monoCubicSplineInterpolate([{x:3,y:9}, {x:1,y:1}, {x:2,y:4}, {x:1,y:1}]);}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.monoCubicSplineInterpolate([{x:3,y:9}, {x:1,z:1}, {x:2,y:4}]);}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.monoCubicSplineInterpolate([{x:3,y:9}, {x:1,y:1}, {x:2,y:4}], [9, 1, 4]);}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.monoCubicSplineInterpolate([{x:3,y:9}, {x:1,y:1}, {x:2,y:4}], function(x){return x*x;});}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.monoCubicSplineInterpolate(0.5, );}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.monoCubicSplineInterpolate(0.5, 'a');}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.monoCubicSplineInterpolate(0.5, []);}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.monoCubicSplineInterpolate(0.5, [3, 1, 2]);}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.monoCubicSplineInterpolate(0.5, [3, 1, 2], [9, 1, 2, 1]);}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.monoCubicSplineInterpolate(0.5, [1], [1]);}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.monoCubicSplineInterpolate(0.5, [3, 1, 2, 1], [9, 1, 4, 1]);}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.monoCubicSplineInterpolate(0.5, [3, 1, 2], [ak.complex(9), 1, 4]);}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.monoCubicSplineInterpolate(0.5, [3, 1, 2], ['a', 'a', 'a']);}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.monoCubicSplineInterpolate(0.5, [3, 'a', 2], [9, 1, 4]);}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.monoCubicSplineInterpolate(0.5, [3, 1, 2, 1], function(x){return x*x;});}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.monoCubicSplineInterpolate(0.5, [{x:3,y:9}, {x:1,y:1}, {x:2,y:4}, {x:1,y:1}]);}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.monoCubicSplineInterpolate(0.5, [{x:3,y:9}, {x:1,z:1}, {x:2,y:4}]);}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.monoCubicSplineInterpolate(0.5, [{x:3,y:9}, {x:1,y:1}, {x:2,y:4}], [9, 1, 4]);}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.monoCubicSplineInterpolate(0.5, [{x:3,y:9}, {x:1,y:1}, {x:2,y:4}], function(x){return x*x;});}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.monoCubicSplineInterpolate('a', [3, 1, 2], [9, 1, 4], [6, 2, 4]);}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.monoCubicSplineInterpolate(-1, [3, 1, 2], [9, 1, 4], [6, 2, 4]);}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.monoCubicSplineInterpolate(2, [3, 1, 2], [9, 1, 4], [6, 2, 4]);}
    catch(e){result = true;}
    if(!result) return false;

    return true;
   }

   function compareNodes(nodes0, nodes1) {
    var n = nodes0.length;
    var i;
    if(nodes1.length!==n) return false;

    for(i=0;i<n;++i) if(nodes0[i].x!==nodes1[i].x || nodes0[i].y!==nodes1[i].y || ak.diff(nodes0[i].g,nodes1[i].g)>1e-12) return false;
    return true;
   }

   function validNodes() {
    var x  = [0, 1, 2,     3,       4,  5,  6,   7,      8,   9];
    var y  = [0, 1, 4,     9,      16, 16,  9,   4,      1,   0];
    var g1 = [0, 1, 8,     20,      5,  3, -3, -20,     -2,   1];
    var g2 = [0, 1, 8,     2.67*5,  0,  0, -3, -2.67*3, -2,   0];
    var g3 = [0, 1, 1.5*3, 1.50*5,  0,  0, -3, -1.50*3, -1.5, 0];
    var f1 = ak.monoCubicSplineInterpolate(x, y, g1);
    var f2 = ak.monoCubicSplineInterpolate(0.5, x, y, g1);

    return compareNodes(f1.nodes(), ak.cubicSplineInterpolate(x, y, g2).nodes())
        && compareNodes(f2.nodes(), ak.cubicSplineInterpolate(x, y, g3).nodes());
   }

   var init = {
    name: 'init',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   init.add('invalid', invalidNodes);
   init.add('valid', validNodes);

   monoCubicSplineInterpolate.add(init);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   monoCubicSplineInterpolate.add(load);
  }

  akTest.add(monoCubicSplineInterpolate);
 }

 ak.using('Approx/MonoCubicSplineInterpolate.js', define);
})();
