"use strict";

(function() {
 function define() {
  var medianSmooth = {
   name: 'approx.medianSmooth',
   body: [],
   add: function(t) {this.body.push(t);}
  };

  try {
   function invalidNodes() {
    var result;

    result = false;
    try{ak.medianSmooth();}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.medianSmooth('a');}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.medianSmooth([1, 2, 3], 'a');}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.medianSmooth([1, 2, 3], [4, 5, 6], 'a');}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.medianSmooth([1, 2, 3], [4, 'a', 6], 2);}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.medianSmooth([{x:1, y:1}, {x:2, y:2}, {x:3, y:3}], 'a');}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.medianSmooth([{x:1, y:1}, {x:2, y:2}, 'a'], 2);}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.medianSmooth([{x:1, y:1}, {x:2, y:2}, {x:3, y:'a'}], 2);}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.medianSmooth([{x:1, y:1}, {x:2, y:2}, {x:3, y:3}], 0);}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.medianSmooth([{x:1, y:1}, {x:2, y:2}, {x:3, y:3}], 1.5);}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.medianSmooth([{x:1, y:1}, {x:2, y:2}, {x:3, y:3}], ak.INFINITY);}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.medianSmooth([{x:1, y:1}, {x:2, y:2}, {x:3, y:3}], ak.NaN);}
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
    return compareNodes(ak.medianSmooth([1, 2, 3], [1, 4, 9], 2).nodes(), [{x:1, y:1}, {x:2, y:4}, {x:3, y:9}])
        && compareNodes(ak.medianSmooth([{x:1,y:1}, {x:2,y:4}, {x:3,y:9}], 2).nodes(), [{x:1, y:1}, {x:2, y:4}, {x:3, y:9}]);
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

   function compare(rndx, rndy, n, k) {
    var x = makeVals(rndx, n);
    var y = makeVals(rndy, n);
    var s = ak.medianSmooth(x, y, k);
    var nodes = s.nodes();
    var i, j, xi, yi;

    for(i=0;i<n;++i) {
     xi = rndx();
     yi = s(xi);

     ak.partialSort(nodes, k, function(x0, x1){return ak.dist(x0.x, xi)-ak.dist(x1.x, xi);});
     ak.sort(nodes, function(x0, x1){return x0.y-x1.y;}, 0, k);

     if(k%2===0 && 0.5*(nodes[k/2].y + nodes[k/2+1].y)!==yi) return false;
     if(k%2===1 && nodes[(k-1)/2].y!==yi) return false;
    }
    return true;
   }

   var val = {
    name: 'eval',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   val.add('number', function() {return compare(Math.random, Math.random, 100, 5);});
   val.add('vector', function() {return compare(ak.multiUniformRnd(), Math.random, 100, 5);});

   medianSmooth.add(init);
   medianSmooth.add(val);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   medianSmooth.add(load);
  }

  akTest.add(medianSmooth);
 }

 ak.using(['Approx/MedianSmooth.js', 'Matrix/Vector.js', 'Distribution/MultiUniformDistribution.js', 'Algorithm/Sort.js', 'Algorithm/PartialSort.js'], define);
})();
