"use strict";

(function() {
 function define() {
  var gaussianCopula = {
   name: 'copula.gaussianCopula',
   body: [],
   add: function(t) {this.body.push(t);}
  };

  try {
   function validateRho(rho, sigma) {
    var n = rho.rows();
    var i, j, s;

    for(i=0;i<n;++i) {
     for(j=0;j<n;++j) {
      s = rho.at(i,j) * Math.sqrt(sigma.at(i,i)*sigma.at(j,j));
      if(ak.diff(s, sigma.at(i,j))>1e-12) return false;
     }
    }
    return true;
   }

   var root = ak.matrix([[0.5, 0, 0], [-0.2, 0.3, 0], [0.1, -0.3, 0.2]]);
   var sigma = ak.mul(root, ak.transpose(root));

   var copula = ak.gaussianCopula(sigma);
   var density = ak.gaussianCopulaDensity(sigma);
   var rnd = ak.gaussianCopulaRnd(sigma);

   var init = {
    name: 'init',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   init.add('copula', function(){return validateRho(copula.rho(), sigma);});
   init.add('density', function(){return validateRho(copula.rho(), sigma);});
   init.add('rnd', function(){return validateRho(copula.rho(), sigma);});

   function compareDensity(copula, density) {
    var tests = 10;
    var n = copula.rho().rows();
    var urnd = ak.multiUniformRnd(n, 0.1, 0.9);
    var zero = ak.vector(n, 0);
    var integral = ak.quasiRandomIntegral(density);
    var u;

    while(tests-->0) {
     u = urnd();
     if(ak.diff(copula(u), integral(zero, u))>5e-4) return false;
    }
    return true;
   }

   function compareRnd(copula, rnd) {
    var tests = 10;
    var samples = 100000;
    var n = copula.rho().rows();
    var urnd = ak.multiUniformRnd(n, 0.1, 0.9);
    var u, count, sample, x, i;

    while(tests-->0) {
     u = urnd();
     count = 0;
     for(sample=0;sample<samples;++sample) {
      x = rnd();
      i = 0;
      while(i<n && x.at(i)<=u.at(i)) ++i;
      if(i===n) ++count;
     }
     if(ak.diff(count/samples, copula(u))>5e-2) return false;
    }
    return true;
   }

   var val = {
    name: 'val',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   val.add('copula versus density', function(){return compareDensity(copula, density);});
   val.add('copula versus rnd', function(){return compareRnd(copula, rnd);});

   gaussianCopula.add(init);
   gaussianCopula.add(val);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   gaussianCopula.add(load);
  }

  akTest.add(gaussianCopula);
 }

 ak.using(['Copula/GaussianCopula.js', 'Distribution/MultiUniformDistribution.js', 'Calculus/QuasiRandomIntegral.js'], define);
})();