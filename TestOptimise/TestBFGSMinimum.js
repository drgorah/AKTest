"use strict";

(function() {
 function define() {
  var bfgsMinimum = {
   name: 'optimise.bfgsMinimum',
   body: [],
   add: function(t) {this.body.push(t);}
  };

  try {
   function f(x) {
    var l = x.at(1)-x.at(0)*x.at(0);
    var r = 1 - x.at(0);
    return 100*l*l + r*r;
   }

   function df(x) {
    var l = x.at(1)-x.at(0)*x.at(0);
    var r = 1 - x.at(0);
    return ak.vector([-400*l*x.at(0) - 2*r, 200*l]);
   }

   var bfgs_def = ak.bfgsMinimum(f, df);
   var bfgs_lo = ak.bfgsMinimum(f, df, undefined, undefined, 1e-2);
   var bfgs_steps = ak.bfgsMinimum(f, df, undefined, undefined, undefined, 20);
   var bfgs_params = ak.bfgsMinimum(f, df, 1.0e-2, 0.5);

   var init = {
    name: 'init',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   init.add('bad f', function(){try{ak.bfgsMinimum('f1', df, 1.0e-4, 0.9, 1.0e-6, 100); return false;} catch(e){return true;}});
   init.add('bad df', function(){try{ak.bfgsMinimum(f, 'df1', 1.0e-4, 0.9, 1.0e-6, 100); return false;} catch(e){return true;}});
   init.add('bad c1', function(){try{ak.bfgsMinimum(f, df, 'a', 0.9, 1.0e-6, 100); return false;} catch(e){return true;}});
   init.add('low c1', function(){try{ak.bfgsMinimum(f, df, 0.0, 0.9, 1.0e-6, 100); return false;} catch(e){return true;}});
   init.add('high c1', function(){try{ak.bfgsMinimum(f, df, 1.0, 0.9, 1.0e-6, 100); return false;} catch(e){return true;}});
   init.add('bad c2', function(){try{ak.bfgsMinimum(f, df, 1.0e-4, 'a', 1.0e-6, 100); return false;} catch(e){return true;}});
   init.add('low c2', function(){try{ak.bfgsMinimum(f, df, 1.0e-4, 1.0e-5, 1.0e-6, 100); return false;} catch(e){return true;}});
   init.add('high c2', function(){try{ak.bfgsMinimum(f, df, 1.0e-4, 1.0, 1.0e-6, 100); return false;} catch(e){return true;}});
   init.add('bad threshold', function(){try{ak.bfgsMinimum(f, df, 1.0e-4, 0.9, 'a', 100); return false;} catch(e){return true;}});
   init.add('bad steps', function(){try{ak.bfgsMinimum(f, df, 1.0e-4, 0.9, 1.0e-6, 'a'); return false;} catch(e){return true;}});
   init.add('low steps', function(){try{ak.bfgsMinimum(f, df, 1.0e-4, 0.9, 1.0e-6, 0); return false;} catch(e){return true;}});
   init.add('good', function(){try{ak.bfgsMinimum(f, df, 1.0e-4, 0.9, 1.0e-6, 100); return true;} catch(e){return false;}});
   init.add('default c1', function(){try{ak.bfgsMinimum(f, df, undefined, 0.9, 1.0e-6, 100); return true;} catch(e){return false;}});
   init.add('default c2', function(){try{ak.bfgsMinimum(f, df, 1.0e-4, undefined, 1.0e-6, 100); return true;} catch(e){return false;}});
   init.add('default threshold', function(){try{ak.bfgsMinimum(f, df, 1.0e-4, 0.9, undefined, 100); return true;} catch(e){return false;}});
   init.add('default steps', function(){try{ak.bfgsMinimum(f, df, 1.0e-4, 0.9, 1.0e-6); return true;} catch(e){return false;}});

   var apply = {
    name: 'apply',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   apply.add('default threshold', function(){return ak.diff(bfgs_def(ak.vector([-4,-4])), ak.vector([1,1]))<1e-5;});
   apply.add('low threshold', function(){return ak.diff(bfgs_lo(ak.vector([-4,-4])), ak.vector([1,1]))>1e-5;});
   apply.add('low steps', function(){try{bfgs_steps(ak.vector([-4,-4])); return false;} catch(e) {return true;}});
   apply.add('line params', function(){return ak.diff(bfgs_params(ak.vector([-4,-4])), ak.vector([1,1]))<1e-5;});

   bfgsMinimum.add(init);
   bfgsMinimum.add(apply);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   bfgsMinimum.add(load);
  }

  akTest.add(bfgsMinimum);
 }

 ak.using('Optimise/BFGSMinimum.js', define);
})();
