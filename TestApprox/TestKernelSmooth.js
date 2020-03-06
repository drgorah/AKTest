"use strict";

(function() {
 function define() {
  var kernelSmooth = {
   name: 'approx.kernelSmooth',
   body: [],
   add: function(t) {this.body.push(t);}
  };

  try {
   function invalidNodes() {
    var result;

    result = false;
    try{ak.kernelSmooth();}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.kernelSmooth('a');}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.kernelSmooth([1, 2, 3], 'a');}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.kernelSmooth([1, 2, 3], [4, 5, 6], 'a');}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.kernelSmooth([{x:1, y:1}, {x:2, y:2}, {x:3, y:3}], 'a');}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.kernelSmooth([{x:1, y:1}, {x:2, y:2}, 'a'], ak.normnalPDF());}
    catch(e){result = true;}
    if(!result) return false;

    return true;
   }

   function compareNodes(nodes0, nodes1) {
    var n = nodes0.length;
    var i;
    if(nodes1.length!==n) return false;

    for(i=0;i<n;++i) if(ak.ne(nodes0[i].x, nodes1[i].x) || ak.ne(nodes0[i].y, nodes1[i].y)) return false;
    return true;
   }

   function validNodes() {
    var f = ak.normalPDF();
    return compareNodes(ak.kernelSmooth([1, 2, 3], [1, 4, 9], f).nodes(), [{x:1, y:1}, {x:2, y:4}, {x:3, y:9}])
        && compareNodes(ak.kernelSmooth([{x:1,y:1}, {x:2,y:4}, {x:3,y:9}], f).nodes(), [{x:1, y:1}, {x:2, y:4}, {x:3, y:9}]);
   }

   var init = {
    name: 'init',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   init.add('invalid', invalidNodes);
   init.add('valid', validNodes);

   function makeVals(rnd, n) {
    var vals = new Array(n);
    while(n-->0) vals[n] = rnd();
    return vals;
   }

   function compare(f, rndx, rndy, n) {
    var x = makeVals(rndx, n);
    var y = makeVals(rndy, n);
    var s = ak.kernelSmooth(x, y, f);
    var i, j, xi, yi, w, y0, y1;

    for(i=0;i<n;++i) {
     xi = rndx();
     yi = s(xi);
     w = f(ak.sub(x[0], xi));
     y0 = ak.mul(w, y[0]);
     y1 = w;
     for(j=1;j<n;++j) {
      w = f(ak.sub(x[j], xi));
      y0 = ak.add(y0, ak.mul(w, y[j]));
      y1 += w;
     }
     if(ak.diff(yi, ak.div(y0, y1))>1e-10) return false;
    }
    return true;
   }

   var val = {
    name: 'eval',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   val.add('number-number', function() {return compare(ak.normalPDF(), Math.random, Math.random, 100);});
   val.add('number-vector', function() {return compare(ak.normalPDF(), Math.random, ak.multiUniformRnd(), 100);});
   val.add('vector-number', function() {return compare(ak.multiNormalPDF(), ak.multiUniformRnd(), Math.random, 100);});
   val.add('vector-vector', function() {return compare(ak.multiNormalPDF(), ak.multiUniformRnd(), ak.multiUniformRnd(), 100);});

   kernelSmooth.add(init);
   kernelSmooth.add(val);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   kernelSmooth.add(load);
  }

  akTest.add(kernelSmooth);
 }

 ak.using(['Approx/KernelSmooth.js', 'Matrix/Vector.js', 'Distribution/NormalDistribution.js', 'Distribution/MultiNormalDistribution.js', 'Distribution/MultiUniformDistribution.js'], define);
})();
