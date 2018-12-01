"use strict";

(function() {
 function define() {
  var cubicSplineInterpolate = {
   name: 'approx.cubicSplineInterpolate',
   body: [],
   add: function(t) {this.body.push(t);}
  };

  try {
   function invalidNodes() {
    var result;

    result = false;
    try{ak.cubicSplineInterpolate();}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.cubicSplineInterpolate('a');}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.cubicSplineInterpolate([]);}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.cubicSplineInterpolate([3, 1, 2]);}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.cubicSplineInterpolate([3, 1, 2], [9, 1, 2, 1]);}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.cubicSplineInterpolate([1], [1]);}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.cubicSplineInterpolate([3, 1, 2, 1], [9, 1, 4, 1]);}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.cubicSplineInterpolate([3, 1, 2], [ak.complex(9), 1, 4]);}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.cubicSplineInterpolate([3, 1, 2], ['a', 'a', 'a']);}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.cubicSplineInterpolate([3, 'a', 2], [9, 1, 4]);}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.cubicSplineInterpolate([3, 1, 2, 1], function(x){return x*x;});}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.cubicSplineInterpolate([{x:3,y:9}, {x:1,y:1}, {x:2,y:4}, {x:1,y:1}]);}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.cubicSplineInterpolate([{x:3,y:9}, {x:1,z:1}, {x:2,y:4}]);}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.cubicSplineInterpolate([{x:3,y:9}, {x:1,y:1}, {x:2,y:4}], [9, 1, 4]);}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.cubicSplineInterpolate([{x:3,y:9}, {x:1,y:1}, {x:2,y:4}], function(x){return x*x;});}
    catch(e){result = true;}
    if(!result) return false;

    return true;
   }

   function compareNodes(nodes0, nodes1) {
    var n = nodes0.length;
    var i;
    if(nodes1.length!==n) return false;

    for(i=0;i<n;++i) if(nodes0[i].x!==nodes1[i].x || nodes0[i].y!==nodes1[i].y || nodes0[i].g!==nodes1[i].g) return false;
    return true;
   }

   function fx2(x) {return x*x;}
   function dfx2(x) {return 2*x;}

   function validNodes() {
    return compareNodes(ak.cubicSplineInterpolate([3, 1, 2], [9, 1, 4], [6, 2, 4]).nodes(),
                        [{x:1,y:1,g:2}, {x:2,y:4,g:4}, {x:3,y:9,g:6}])
        && compareNodes(ak.cubicSplineInterpolate([{x:3,y:9,g:6}, {x:1,y:1,g:2}, {x:2,y:4,g:4}]).nodes(),
                        [{x:1,y:1,g:2}, {x:2,y:4,g:4}, {x:3,y:9,g:6}])
        && compareNodes(ak.cubicSplineInterpolate([3, 1, 2], fx2, dfx2).nodes(),
                        [{x:1,y:1,g:2}, {x:2,y:4,g:4}, {x:3,y:9,g:6}])
        && compareNodes(ak.cubicSplineInterpolate([3, 1, 2], [9, 1, 4]).nodes(),
                        [{x:1,y:1,g:3}, {x:2,y:4,g:4}, {x:3,y:9,g:5}])
        && compareNodes(ak.cubicSplineInterpolate([{x:3,y:9,g:6}, {x:1,y:1}, {x:2,y:4}]).nodes(),
                        [{x:1,y:1,g:3}, {x:2,y:4,g:4}, {x:3,y:9,g:6}])
        && compareNodes(ak.cubicSplineInterpolate([3, 1, 2], fx2).nodes(),
                        [{x:1,y:1,g:3}, {x:2,y:4,g:4}, {x:3,y:9,g:5}]);
   }

   var init = {
    name: 'init',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   init.add('invalid', invalidNodes);
   init.add('valid', validNodes);

   var valPair = {
    name: 'eval - pair',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   function valPairRnd() {
    var a = Math.random()*2-1;
    var b = Math.random()*2-1;
    var c = Math.random()*2-1;
    var d = Math.random()*2-1;
    var n0 = {x:-1, y:-a+b-c+d, g: 3*a-2*b+c};
    var n1 = {x: 1, y: a+b+c+d, g: 3*a+2*b+c};
    var f = ak.cubicSplineInterpolate([n0, n1]);
    var i, x, y0, y1;

    for(i=0;i<100;++i) {
     x = Math.random()*4-2;
     y0 = d+x*(c + x*(b + x*a));
     y1 = f(x);

     if(ak.diff(y0, y1)>1e-10) return false;
    }
    return true;
   }

   valPair.add('rnd', valPairRnd);

   var valTriplet = {
    name: 'eval - triplet',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   function valTripletRnd() {
    var a0 = Math.random()*2-1;
    var a1 = Math.random()*2-1;
    var b0 = Math.random()*2-1;
    var b1 = Math.random()*2-1;
    var c = Math.random()*2-1;
    var d = Math.random()*2-1;
    var n0 = {x:-1, y:-a0+b0-c+d, g: 3*a0-2*b0+c};
    var n1 = {x: 0, y: d, g: c};
    var n2 = {x: 1, y: a1+b1+c+d, g: 3*a1+2*b1+c};
    var f = ak.cubicSplineInterpolate([n0, n1, n2]);
    var i, x, y0, y1;

    for(i=0;i<100;++i) {
     x = Math.random()*4-2;
     y0 = x<0 ? d+x*(c + x*(b0 + x*a0)) : d+x*(c + x*(b1 + x*a1));
     y1 = f(x);

     if(ak.diff(y0, y1)>1e-10) return false;
    }
    return true;
   }

   valTriplet.add('rnd', valTripletRnd);

   var valMulti = {
    name: 'eval - multi',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   function makeSplinesAndNodes(n) {
    var result = {splines:new Array(n), nodes:new Array(n+1)};
    var a = Math.random()*2-1;
    var b = Math.random()*2-1;
    var c = Math.random()*2-1;
    var d = Math.random()*2-1;
    var x = -1 + (Math.random()*2-1)/(8*n);
    var y = d+x*(c+x*(b+a*x));
    var dy = c+x*(2*b+3*a*x);
    var i;

    result.splines[0] = {a:a, b:b, c:c, d:d};
    result.nodes[0] = {x:x, y:y, g:dy};

    for(i=1;i<n;++i) {
     x += 2/n + (Math.random()*2-1)/(8*n);
     y = d+x*(c+x*(b+a*x));
     dy = c+x*(2*b+3*a*x);

     a = Math.random()*2-1;
     b = Math.random()*2-1;
     c = dy - x*(2*b+3*a*x);
     d = y - x*(c+x*(b+a*x));

     result.splines[i] = {a:a, b:b, c:c, d:d};
     result.nodes[i] = {x:x, y:y, g:dy};
    }
    x += 2/n + (Math.random()*2-1)/(8*n);
    y = d+x*(c+x*(b+a*x));
    dy = c+x*(2*b+3*a*x);
    result.nodes[n] = {x:x, y:y, d:dy};

    return result;
   }

   function calcSpline(x, splines, nodes) {
    var n = splines.length;
    var i = 0;

    while(i<n-1 && x>nodes[i+1].x) ++i;
    return splines[i].g + x*(splines[i].c + x*(splines[i].b + splines[i].a*x));
   }

   function valMultiFwd() {
    var splinesNodes = makeSplinesAndNodes(10);
    var f = ak.cubicSplineInterpolate(splinesNodes.nodes);
    var x0 = splinesNodes.nodes[0].x - 1;
    var x1 = splinesNodes.nodes[splinesNodes.nodes.length-1].x + 1;
    var dx = 1/32;
    var x, y0, y1;

    for(x=x0;x<x1;x+=dx) {
     y0 = calcSpline(x, splinesNodes.splines, splinesNodes.nodes);
     y1 = f(x);

     if(ak.diff(y0, y1)>1e-10) return false;
    }
    return true;
   }

   function valMultiRev() {
    var splinesNodes = makeSplinesAndNodes(10);
    var f = ak.cubicSplineInterpolate(splinesNodes.nodes);
    var x0 = splinesNodes.nodes[0].x - 1;
    var x1 = splinesNodes.nodes[splinesNodes.nodes.length-1].x + 1;
    var dx = 1/32;
    var x, y0, y1;

    for(x=x1;x>x0;x-=dx) {
     y0 = calcSpline(x, splinesNodes.splines, splinesNodes.nodes);
     y1 = f(x);

     if(ak.diff(y0, y1)>1e-10) return false;
    }
    return true;
   }

   function valMultiRnd() {
    var splinesNodes = makeSplinesAndNodes(10);
    var f = ak.cubicSplineInterpolate(splinesNodes.nodes);
    var i, x, y0, y1;

    for(i=0;i<100;++i) {
     x = Math.random()*4-2;
     y0 = calcSpline(x, splinesNodes.splines, splinesNodes.nodes);
     y1 = f(x);

     if(ak.diff(y0, y1)>1e-10) return false;
    }
    return true;
   }

   valMulti.add('fwd', valMultiFwd);
   valMulti.add('rev', valMultiRev);
   valMulti.add('rnd', valMultiRnd);

   cubicSplineInterpolate.add(init);
   cubicSplineInterpolate.add(valPair);
   cubicSplineInterpolate.add(valTriplet);
   cubicSplineInterpolate.add(valMulti);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   cubicSplineInterpolate.add(load);
  }

  akTest.add(cubicSplineInterpolate);
 }

 ak.using('Approx/CubicSplineInterpolate.js', define);
})();
