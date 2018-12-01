"use strict";

(function() {
 function define() {
  var basisFunctionInterpolate = {
   name: 'approx.basisFunctionInterpolate',
   body: [],
   add: function(t) {this.body.push(t);}
  };

  function x0(x) {return 1;}
  function x1(x) {return x;}
  function x2(x) {return x*x;}
  function x3(x) {return x*x*x;}

  try {
   function invalidNodes() {
    var result;

    result = false;
    try{ak.basisFunctionInterpolate();}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.basisFunctionInterpolate('a');}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.basisFunctionInterpolate([1, 2, 3], 'a');}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.basisFunctionInterpolate([1, 2, 3], [1, 2]);}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.basisFunctionInterpolate([1, 2, 3], [1, 2, 3]);}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.basisFunctionInterpolate([1, 2, 3], [1, 2, 3], 'a');}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.basisFunctionInterpolate([1, 2, 3], [1, 2, 3], [x0, x1]);}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.basisFunctionInterpolate([1, 2, 3], [1, 2, 3], [x0, x1, x2, x3]);}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.basisFunctionInterpolate([1, 2, 3], [1, 2, 3], [x0, x1, 'a']);}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.basisFunctionInterpolate([1, 2, 3], [1, 2, 3], [1, 2, 3]);}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.basisFunctionInterpolate([1, 2, 3], Math.sqrt, 'a');}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.basisFunctionInterpolate([1, 2, -3], Math.sqrt, [x0, x1, x2]);}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.basisFunctionInterpolate([{x:1, y:1}, {x:2, y:2}, {x:3, y:3}], 'a');}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.basisFunctionInterpolate([{x:1, y:1}, {x:2, y:2}, {x:3, y:3}], [x0, x1]);}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.basisFunctionInterpolate([{x:1, y:1}, {x:2, y:2}, {x:3, y:3}], [x0, x1, x2, x3]);}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.basisFunctionInterpolate([{x:1, y:1}, {x:2, y:2}, {x:3, y:3}], [x0, x1, 'a']);}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.basisFunctionInterpolate([{x:1, y:1}, {x:2, y:2}, {x:3, z:3}], [x0, x1, x2]);}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.basisFunctionInterpolate([{x:1, y:1}, {x:2, y:2}, 'a'], [x0, x1, x2]);}
    catch(e){result = true;}
    if(!result) return false;

    return true;
   }

   function compareNodes(nodes0, nodes1) {
    var n = nodes0.length;
    var i;
    if(nodes1.length!==n) return false;

    for(i=0;i<n;++i) if(nodes0[i].x!==nodes1[i].x || ak.ne(nodes0[i].y, nodes1[i].y)) return false;
    return true;
   }

   function validNodes() {
    return compareNodes(ak.basisFunctionInterpolate([1, 2, 3], [1, 4, 9], [x0, x1, x2]).nodes(), [{x:1, y:1}, {x:2, y:4}, {x:3, y:9}])
        && compareNodes(ak.basisFunctionInterpolate([1, 2, 3], x2, [x0, x1, x2]).nodes(), [{x:1, y:1}, {x:2, y:4}, {x:3, y:9}])
        && compareNodes(ak.basisFunctionInterpolate([{x:1,y:1}, {x:2,y:4}, {x:3,y:9}], [x0, x1, x2]).nodes(), [{x:1, y:1}, {x:2, y:4}, {x:3, y:9}]);
   }

   var init = {
    name: 'init',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   init.add('invalid', invalidNodes);
   init.add('valid', validNodes);

   var val = {
    name: 'eval',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   function valNumber(a, b, c) {
    function f(x) {return a*x*x + b*x + c;}
    var bases = [function(x){return 1;}, function(x){return x;}, function(x){return x*x;}];
    var g = ak.basisFunctionInterpolate([1, 2, 3], f, bases);
    var i, x;

    for(i=0;i<100;++i) {
     x = Math.random()*4;
     if(ak.diff(f(x), g(x))>1e-10) return false;
    }
    return true;
   }

   function valComplex(a, b, c) {
    function f(z) {var x=ak.abs(z); return a*x*x + b*x + c;}
    var bases = [function(z){return 1;}, function(z){return ak.abs(z);}, function(z){return Math.pow(ak.abs(z),2);}];
    var g = ak.basisFunctionInterpolate([ak.complex(1, 2), ak.complex(2, 3), ak.complex(3, 1)], f, bases);
    var i, z;

    for(i=0;i<100;++i) {
     z = ak.complex(Math.random()*4, Math.random()*4);
     if(ak.diff(f(z), g(z))>1e-10) return false;
    }
    return true;
   }

   function valVector(a, b, c, d) {
    function f(x) {return a*x.at(0) + b*x.at(1) + c*x.at(2) + d;}
    var bases = [function(x){return 1;}, function(x){return x.at(0);}, function(x){return x.at(1);}, function(x){return x.at(2);}];
    var g = ak.basisFunctionInterpolate([ak.vector([1,0.5,3]), ak.vector([2,3,0.5]), ak.vector([2.5,1,3]), ak.vector([0.5,1,2])], f, bases);
    var rnd = ak.multiUniformRnd(4, 0, 4);
    var i, x;

    for(i=0;i<100;++i) {
     x = rnd();
     if(ak.diff(f(x), g(x))>1e-10) return false;
    }
    return true;
   }

   val.add('number', function(){return valNumber(1, 2, 3) && valNumber(1/2, -1/3, 1/4);});
   val.add('complex', function(){return valComplex(1, 2, 3) && valComplex(1/2, -1/3, 1/4);});
   val.add('vector', function(){return valVector(1, 2, 3, 4) && valComplex(1/2, -1/3, 1/4, -1/5);});

   basisFunctionInterpolate.add(init);
   basisFunctionInterpolate.add(val);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   basisFunctionInterpolate.add(load);
  }

  akTest.add(basisFunctionInterpolate);
 }

 ak.using(['Approx/BasisFunctionInterpolate.js', 'Complex/Complex.js', 'Matrix/Vector.js', 'Distribution/MultiUniformDistribution.js'], define);
})();
