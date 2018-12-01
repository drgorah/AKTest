"use strict";

(function() {
 function define() {
  var linearRegression = {
   name: 'approx.linearRegression',
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
    try{ak.linearRegression();}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.linearRegression('a');}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.linearRegression([1, 2, 3], 'a');}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.linearRegression([1, 2, 3], [1, 2]);}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.linearRegression([1, 2, 3], [1, 2, 3]);}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.linearRegression([1, 2, 3], [1, 2, 3], 'a');}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.linearRegression([1, 2, 3], [1, 2, 3], [x0, x1, x2, x3]);}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.linearRegression([1, 2, 3], [1, 2, 3], [x0, x1, 'a']);}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.linearRegression([1, 2, 3], [1, 2, 3], [1, 2, 3]);}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.linearRegression([1, 2, 3], Math.sqrt, 'a');}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.linearRegression([1, 2, -3], Math.sqrt, [x0, x1, x2]);}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.linearRegression([{x:1, y:1}, {x:2, y:2}, {x:3, y:3}], 'a');}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.linearRegression([{x:1, y:1}, {x:2, y:2}, {x:3, y:3}], [x0, x1, x2, x3]);}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.linearRegression([{x:1, y:1}, {x:2, y:2}, {x:3, y:3}], [x0, x1, 'a']);}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.linearRegression([{x:1, y:1}, {x:2, y:2}, {x:3, z:3}], [x0, x1, x2]);}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.linearRegression([{x:1, y:1}, {x:2, y:2}, 'a'], [x0, x1, x2]);}
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
    return compareNodes(ak.linearRegression([1, 2, 3], [1, 4, 9], [x0, x1, x2]).nodes(), [{x:1, y:1}, {x:2, y:4}, {x:3, y:9}])
        && compareNodes(ak.linearRegression([1, 2, 3], x2, [x0, x1, x2]).nodes(), [{x:1, y:1}, {x:2, y:4}, {x:3, y:9}])
        && compareNodes(ak.linearRegression([{x:1,y:1}, {x:2,y:4}, {x:3,y:9}], [x0, x1, x2]).nodes(), [{x:1, y:1}, {x:2, y:4}, {x:3, y:9}])
        && compareNodes(ak.linearRegression([1, 2, 3], [1, 4, 9], [x0, x1]).nodes(), [{x:1, y:1}, {x:2, y:4}, {x:3, y:9}])
        && compareNodes(ak.linearRegression([1, 2, 3], x2, [x0, x1]).nodes(), [{x:1, y:1}, {x:2, y:4}, {x:3, y:9}])
        && compareNodes(ak.linearRegression([{x:1,y:1}, {x:2,y:4}, {x:3,y:9}], [x0, x1]).nodes(), [{x:1, y:1}, {x:2, y:4}, {x:3, y:9}]);
   }

   var init = {
    name: 'init',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   init.add('invalid', invalidNodes);
   init.add('valid', validNodes);

   function invalidRegressors() {
    var result;

    result = false;
    try{ak.linearRegressors('a');}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.linearRegressors([1,2]);}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.linearRegressors(1.5);}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.linearRegressors(-5);}
    catch(e){result = true;}
    if(!result) return false;

    return true;
   }

   function validRegressors() {
    var uni = ak.linearRegressors();
    var multi = ak.linearRegressors(2);
    var rnd = ak.multiUniformRnd(2);
    var n = 100;
    var i, x;

    if(uni.length!==2) return false;
    if(multi.length!==3) return false;

    for(i=0;i<n;++i) {
     x = Math.random();
     if(uni[0](x)!==1) return false;
     if(uni[1](x)!==x) return false;

     x = rnd();
     if(multi[0](x)!==1) return false;
     if(multi[1](x)!==x.at(0)) return false;
     if(multi[2](x)!==x.at(1)) return false;
    }

    return true;
   }

   var regressors = {
    name: 'regressors',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   regressors.add('invalid', invalidRegressors);
   regressors.add('valid', validRegressors);

   var val = {
    name: 'eval',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   function exactNumber(a, b, c) {
    function f(x) {return a*x*x + b*x + c;}
    var regressors = [function(x){return 1;}, function(x){return x;}, function(x){return x*x;}];
    var g = ak.linearRegression([1, 2, 3], f, regressors);
    var i, x;

    for(i=0;i<100;++i) {
     x = Math.random()*4;
     if(ak.diff(f(x), g(x))>1e-10) return false;
    }
    return true;
   }

   function exactComplex(a, b, c) {
    function f(z) {var x=ak.abs(z); return a*x*x + b*x + c;}
    var regressors = [function(z){return 1;}, function(z){return ak.abs(z);}, function(z){return Math.pow(ak.abs(z),2);}];
    var g = ak.basisFunctionInterpolate([ak.complex(1, 2), ak.complex(2, 3), ak.complex(3, 1)], f, regressors);
    var i, z;

    for(i=0;i<100;++i) {
     z = ak.complex(Math.random()*4, Math.random()*4);
     if(ak.diff(f(z), g(z))>1e-10) return false;
    }
    return true;
   }

   function exactVector(a, b, c, d) {
    function f(x) {return a*x.at(0) + b*x.at(1) + c*x.at(2) + d;}
    var regressors = [function(x){return 1;}, function(x){return x.at(0);}, function(x){return x.at(1);}, function(x){return x.at(2);}];
    var g = ak.basisFunctionInterpolate([ak.vector([1,0.5,3]), ak.vector([2,3,0.5]), ak.vector([2.5,1,3]), ak.vector([0.5,1,2])], f, regressors);
    var rnd = ak.multiUniformRnd(4, 0, 4);
    var i, x;

    for(i=0;i<100;++i) {
     x = rnd();
     if(ak.diff(f(x), g(x))>1e-10) return false;
    }
    return true;
   }

   val.add('number - exact', function(){return exactNumber(1, 2, 3) && exactNumber(1/2, -1/3, 1/4);});
   val.add('complex - exact', function(){return exactComplex(1, 2, 3) && exactComplex(1/2, -1/3, 1/4);});
   val.add('vector - exact', function(){return exactVector(1, 2, 3, 4) && exactComplex(1/2, -1/3, 1/4, -1/5);});

   function approxNumber(a, b, c) {
    function f(x) {return a*x*x + b*x + c;}
    function r(x) {return f(x) + Math.random()*0.25-0.125;}
    var regressors = [function(x){return 1;}, function(x){return x;}, function(x){return x*x;}];
    var g = ak.linearRegression([1, 2, 3, 4, 5], r, regressors);
    var w = g.weights();
    var i, x, fx, j;

    for(i=0;i<100;++i) {
     x = Math.random()*4;
     fx = 0;
     for(j=0;j<regressors.length;++j) fx += w[j]*regressors[j](x);
     if(ak.diff(fx, g(x))>1e-10 || ak.diff(f(x), g(x))>1) return false;
    }
    return true;
   }

   function approxComplex(a, b, c) {
    function f(z) {var x=ak.abs(z); return a*x*x + b*x + c;}
    function r(z) {return f(z) + Math.random()*0.25-0.125;}
    var regressors = [function(z){return 1;}, function(z){return ak.abs(z);}, function(z){return Math.pow(ak.abs(z),2);}];
    var g = ak.linearRegression([ak.complex(1, 2), ak.complex(2, 3), ak.complex(3, 1), ak.complex(0.5, 1.5), ak.complex(1.5, 2)], r, regressors);
    var w = g.weights();
    var i, z, fz, j;

    for(i=0;i<100;++i) {
     z = ak.complex(Math.random()*4, Math.random()*4);
     fz = 0;
     for(j=0;j<regressors.length;++j) fz += w[j]*regressors[j](z);
     if(ak.diff(fz, g(z))>1e-10 || ak.diff(f(z), g(z))>1) return false;
    }
    return true;
   }

   function approxVector(a, b, c, d) {
    function f(x) {return a*x.at(0) + b*x.at(1) + c*x.at(2) + d;}
    function r(z) {return f(z) + Math.random()*0.25-0.125;}
    var regressors = [function(x){return 1;}, function(x){return x.at(0);}, function(x){return x.at(1);}, function(x){return x.at(2);}];
    var g = ak.linearRegression([ak.vector([1,0.5,3]), ak.vector([2,3,0.5]), ak.vector([2.5,1,3]), ak.vector([0.5,1,2]), ak.vector([1.5,2,2]), ak.vector([2.5,1,1.5]), ak.vector([0.5,1,2])], r, regressors);
    var w = g.weights();
    var rnd = ak.multiUniformRnd(4, 0, 4);
    var i, x, fx, j;

    for(i=0;i<100;++i) {
     x = rnd();
     fx = 0;
     for(j=0;j<regressors.length;++j) fx += w[j]*regressors[j](x);
     if(ak.diff(fx, g(x))>1e-10 || ak.diff(f(x), g(x))>1) return false;
    }
    return true;
   }

   val.add('number - approx', function(){return approxNumber(1, 2, 3) && approxNumber(1/2, -1/3, 1/4);});
   val.add('complex - approx', function(){return approxComplex(1, 2, 3) && approxComplex(1/2, -1/3, 1/4);});
   val.add('vector - approx', function(){return approxVector(1, 2, 3, 4) && approxComplex(1/2, -1/3, 1/4, -1/5);});

   linearRegression.add(init);
   linearRegression.add(regressors);
   linearRegression.add(val);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   linearRegression.add(load);
  }

  akTest.add(linearRegression);
 }

 ak.using(['Approx/LinearRegression.js', 'Complex/Complex.js', 'Matrix/Vector.js', 'Distribution/MultiUniformDistribution.js'], define);
})();
