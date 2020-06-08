"use strict";

(function() {
 function define() {
  var wolfeLineSearch = {
   name: 'optimise.wolfeLineSearch',
   body: [],
   add: function(t) {this.body.push(t);}
  };

  try {
   var c1 = 0.1;
   var c2 = 0.2;

   function f1(x) {
    return 3*x*x*x*x - x*x*x + 4*x*x + 2*x - 1;
   }

   function df1(x) {
    return 12*x*x*x - 3*x*x + 8*x + 2;
   }

   var wolfe1 = ak.wolfeLineSearch(f1, df1, c1, c2);

   function f2(x) {
    var l = x.at(1)-x.at(0)*x.at(0);
    var r = 1 - x.at(0);
    return 100*l*l + r*r;
   }

   function df2(x) {
    var l = x.at(1)-x.at(0)*x.at(0);
    var r = 1 - x.at(0);
    return ak.vector([-400*l*x.at(0) - 2*r, 200*l]);
   }

   var wolfe2 = ak.wolfeLineSearch(f2, df2, c1, c2);

   var init = {
    name: 'init',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   init.add('bad f', function(){try{ak.wolfeLineSearch('f1', df1, 1e-4, 0.9, 100); return false;} catch(e){return true;}});
   init.add('bad df', function(){try{ak.wolfeLineSearch(f1, 'df1', 1e-4, 0.9, 100); return false;} catch(e){return true;}});
   init.add('bad c1', function(){try{ak.wolfeLineSearch(f1, df1, 'a', 0.9, 100); return false;} catch(e){return true;}});
   init.add('low c1', function(){try{ak.wolfeLineSearch(f1, df1, -0.1, 0.9, 100); return false;} catch(e){return true;}});
   init.add('high c1', function(){try{ak.wolfeLineSearch(f1, df1, 1.1, 0.9, 100); return false;} catch(e){return true;}});
   init.add('bad c2', function(){try{ak.wolfeLineSearch(f1, df1, 1e-4, 'a', 100); return false;} catch(e){return true;}});
   init.add('low c2', function(){try{ak.wolfeLineSearch(f1, df1, 1e-4, 1e-5, 100); return false;} catch(e){return true;}});
   init.add('high c2', function(){try{ak.wolfeLineSearch(f1, df1, 1e-4, 1.1, 100); return false;} catch(e){return true;}});
   init.add('bad steps', function(){try{ak.wolfeLineSearch(f1, df1, 1e-4, 0.9, 'a'); return false;} catch(e){return true;}});
   init.add('low steps', function(){try{ak.wolfeLineSearch(f1, df1, 1e-4, 0.9, 0); return false;} catch(e){return true;}});
   init.add('good', function(){try{ak.wolfeLineSearch(f1, df1, 1e-4, 0.9, 100); return true;} catch(e){return false;}});
   init.add('default steps', function(){try{ak.wolfeLineSearch(f1, df1, 1e-4, 0.9); return true;} catch(e){return false;}});

   function apply(wolfe, x, dx, f, df) {
    var result = wolfe(x, dx);
    var dxdfx = ak.mul(dx, df(x));

    if(dxdfx>0) {
     dx = ak.neg(dx);
     dxdfx = -dxdfx;
    }

    return result.fx<f(x)
        && ak.mul(dx, result.dfx) > c2*dxdfx
        && result.fx===f(result.x)
        && ak.eq(result.dfx, df(result.x));
   }

   function apply0dx(wolfe, x, f, df) {
    var dx = ak.mul(x, 0);
    var result = wolfe(x, dx);
    return ak.eq(result.x, x) && ak.eq(result.fx, f(x)) && ak.eq(result.dfx, df(x));
   }

   function apply0dfx(wolfe, x, f, df) {
    var dx = df(x);
    var dfx = ak.mul(x, 0);
    var result = wolfe(x, dx, undefined, dfx);
    return ak.eq(result.x, x) && ak.eq(result.fx, f(x)) && ak.eq(result.dfx, dfx);
   }

   var uni = {
    name: 'uni',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   uni.add('apply big dx', function(){return apply(wolfe1, 0, df1(0), f1, df1);});
   uni.add('apply small dx', function(){return apply(wolfe1, 0, 1e-4*df1(0), f1, df1);});
   uni.add('apply zero dx', function(){return apply0dx(wolfe1, 0, f1, df1);});
   uni.add('apply zero dfx', function(){return apply0dfx(wolfe1, 0, f1, df1);});

   var multi = {
    name: 'multi',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   multi.add('apply big dx', function(){return apply(wolfe2, ak.vector(2, 0), df2(ak.vector(2, 0)), f2, df2);});
   multi.add('apply small dx', function(){return apply(wolfe2, ak.vector(2, 0), ak.mul(1e-4, df2(ak.vector(2, 0))), f2, df2);});
   multi.add('apply zero dx', function(){return apply0dx(wolfe2, ak.vector(2, 0), f2, df2);});
   multi.add('apply zero dfx', function(){return apply0dfx(wolfe2, ak.vector(2, 0), f2, df2);});

   wolfeLineSearch.add(init);
   wolfeLineSearch.add(uni);
   wolfeLineSearch.add(multi);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   wolfeLineSearch.add(load);
  }

  akTest.add(wolfeLineSearch);
 }

 ak.using('Optimise/WolfeLineSearch.js', define);
})();
