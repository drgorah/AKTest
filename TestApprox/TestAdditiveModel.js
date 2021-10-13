"use strict";

(function() {
 function define() {
  var additiveModel = {
   name: 'approx.additiveModel',
   body: [],
   add: function(t) {this.body.push(t);}
  };

  try {
   function bad() {
    var x = [ak.vector([1, 1]), ak.vector([1, -1])];
    var y = [2, 0];
    var f = function(v){return v.at(0)+v.at(1);};
    var node0 = {x:ak.vector([1, 1]), y:2};
    var node1 = {x:ak.vector([1, -1]), y:0};
    var nodes = [node0, node1];
    var phi = ak.normalPDF(1.0);
    var kernel = function(x0, x1) {return phi(x0-x1);};
    var result;

    result = false;
    try{ak.additiveModel('a', y, ak.kernelSmooth, [kernel], 1.0e-5);} catch(e) {result = true;}
    if(!result) return false;

    result = false;
    try{ak.additiveModel([1,2], y, ak.kernelSmooth, [kernel], 1.0e-5);} catch(e) {result = true;}
    if(!result) return false;

    result = false;
    try{ak.additiveModel(x.slice(1), y, ak.kernelSmooth, [kernel], 1.0e-5);} catch(e) {result = true;}
    if(!result) return false;

    result = false;
    try{ak.additiveModel(x, 'a', ak.kernelSmooth, [kernel], 1.0e-5);} catch(e) {result = true;}
    if(!result) return false;

    result = false;
    try{ak.additiveModel(x, ['a', 'b'], ak.kernelSmooth, [kernel], 1.0e-5);} catch(e) {result = true;}
    if(!result) return false;

    result = false;
    try{ak.additiveModel(x, y.slice(1), ak.kernelSmooth, [kernel], 1.0e-5);} catch(e) {result = true;}
    if(!result) return false;

    result = false;
    try{ak.additiveModel(x, y, 'a', [kernel], 1.0e-5);} catch(e) {result = true;}
    if(!result) return false;

    result = false;
    try{ak.additiveModel(x, y, ak.kernelSmooth, [kernel], 'a');} catch(e) {result = true;}
    if(!result) return false;

    result = false;
    try{ak.additiveModel('a', f, ak.kernelSmooth, [kernel], 1.0e-5);} catch(e) {result = true;}
    if(!result) return false;

    result = false;
    try{ak.additiveModel([1,2], f, ak.kernelSmooth, [kernel], 1.0e-5);} catch(e) {result = true;}
    if(!result) return false;

    result = false;
    try{ak.additiveModel(x, 'a', ak.kernelSmooth, [kernel], 1.0e-5);} catch(e) {result = true;}
    if(!result) return false;

    result = false;
    try{ak.additiveModel(x, f, 'a', [kernel], 1.0e-5);} catch(e) {result = true;}
    if(!result) return false;

    result = false;
    try{ak.additiveModel(x, f, ak.kernelSmooth, [kernel], 'a');} catch(e) {result = true;}
    if(!result) return false;

    result = false;
    try{ak.additiveModel('a', ak.kernelSmooth, [kernel], 1.0e-5);} catch(e) {result = true;}
    if(!result) return false;

    result = false;
    try{ak.additiveModel(x, ak.kernelSmooth, [kernel], 1.0e-5);} catch(e) {result = true;}
    if(!result) return false;

    result = false;
    try{ak.additiveModel(nodes, 'a', [kernel], 1.0e-5);} catch(e) {result = true;}
    if(!result) return false;

    result = false;
    try{ak.additiveModel(nodes, ak.kernelSmooth, [kernel], 'a');} catch(e) {result = true;}
    if(!result) return false;

    return true;
   }

   function good() {
    var x = [ak.vector([1, 1]), ak.vector([1, -1])];
    var y = [2, 0];
    var f = function(v){return v.at(0)+v.at(1);};
    var node0 = {x:ak.vector([1, 1]), y:2};
    var node1 = {x:ak.vector([1, -1]), y:0};
    var nodes = [node0, node1];
    var phi = ak.normalPDF(1.0);
    var kernel = function(x0, x1) {return phi(x0-x1);};

    try{ak.additiveModel(x, y, ak.kernelSmooth, [kernel]);} catch(e){return false;}
    try{ak.additiveModel(x, y, ak.kernelSmooth, [kernel], 1.0e-5);} catch(e){return false;}
    try{ak.additiveModel(x, f, ak.kernelSmooth, [kernel]);} catch(e){return false;}
    try{ak.additiveModel(x, f, ak.kernelSmooth, [kernel], 1.0e-5);} catch(e){return false;}
    try{ak.additiveModel(nodes, ak.kernelSmooth, [kernel]);} catch(e){return false;}
    try{ak.additiveModel(nodes, ak.kernelSmooth, [kernel], 1.0e-5);} catch(e){return false;}

    return true;
   }

   var init = {
    name: 'init',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   init.add('bad', bad);
   init.add('good', good);

   function linear() {
    var dims = 3;
    var n = 100;
    var x = new Array(n);
    var f = function(v){return v.at(0)+2*v.at(1)+3*v.at(2);};
    var phi = ak.normalPDF(1.0);
    var kernel = function(x0, x1) {return phi(x0-x1);};
    var u = ak.multiUniformRnd(dims);
    var i, model, err;

    for(i=0;i<n;++i) x[i] = u();
    model = ak.additiveModel(x, f, ak.kernelSmooth, [kernel]);

    err = 0;
    for(i=0;i<n;++i) err += Math.pow(model(x[i])-f(x[i]), 2);
    err = Math.sqrt(err/n);
    return err<1.5;
   }

   function nonlinear() {
    var dims = 3;
    var n = 100;
    var x = new Array(n);
    var f = function(v){return v.at(0)*v.at(0)+Math.exp(-v.at(1))+Math.sqrt(v.at(2));};
    var phi = ak.normalPDF(1.0);
    var kernel = function(x0, x1) {return phi(x0-x1);};
    var u = ak.multiUniformRnd(dims);
    var i, model, err;

    for(i=0;i<n;++i) x[i] = u();
    model = ak.additiveModel(x, f, ak.kernelSmooth, [kernel]);

    err = 0;
    for(i=0;i<n;++i) err += Math.pow(model(x[i])-f(x[i]), 2);
    err = Math.sqrt(err/n);
    return err<1.5;
   }

   var val = {
    name: 'eval',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   val.add('linear', linear);
   val.add('non-linear', nonlinear);

   additiveModel.add(init);
   additiveModel.add(val);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   additiveModel.add(load);
  }

  akTest.add(additiveModel);
 }

 ak.using(['Approx/AdditiveModel.js', 'Approx/KernelSmooth.js', 'Distribution/NormalDistribution.js', 'Distribution/MultiUniformDistribution.js'], define);
})();