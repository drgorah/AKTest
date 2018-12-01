"use strict";

(function() {
 function define() {
  var copulaDistribution = {
   name: 'distribution.copulaDistribution',
   body: [],
   add: function(t) {this.body.push(t);}
  };

  try {
   var root = ak.matrix([[0.5, 0, 0], [-0.2, 0.3, 0], [0.1, -0.3, 0.2]]);
   var sigma = ak.mul(root, ak.transpose(root));
   var mu = ak.vector([1, -2, 3]);

   var s0 = Math.sqrt(sigma.at(0, 0));
   var s1 = Math.sqrt(sigma.at(1, 1));
   var s2 = Math.sqrt(sigma.at(2, 2));

   var m0 = mu.at(0);
   var m1 = mu.at(1);
   var m2 = mu.at(2);

   var cdfs = [ak.normalCDF(m0, s0), ak.normalCDF(m1, s1), ak.normalCDF(m2, s2)];
   var pdfs = [ak.normalPDF(m0, s0), ak.normalPDF(m1, s1), ak.normalPDF(m2, s2)];
   var invs = [ak.normalInvCDF(m0, s0), ak.normalInvCDF(m1, s1), ak.normalInvCDF(m2, s2)];

   var copulaCDF = ak.copulaCDF(ak.gaussianCopula(sigma), cdfs);
   var copulaPDF = ak.copulaPDF(ak.gaussianCopulaDensity(sigma), cdfs, pdfs);
   var copulaRnd = ak.copulaRnd(ak.gaussianCopulaRnd(sigma), invs);

   var multiCDF = ak.multiNormalCDF(mu, sigma);
   var multiPDF = ak.multiNormalPDF(mu, sigma);
   var multiRnd = ak.multiNormalRnd(mu, sigma);

   function compareCDF(copulaCDF, multiCDF, multiRnd) {
    var tests = 1000;
    var z;

    while(tests-->0) {
     z = multiRnd();
     if(ak.diff(copulaCDF(z), multiCDF(z))>1e-10) return false;
    }
    return true;
   }

   function comparePDF(copulaPDF, multiPDF, multiRnd) {
    var tests = 1000;
    var z;

    while(tests-->0) {
     z = multiRnd();
     if(ak.diff(copulaPDF(z), multiPDF(z))>1e-10) return false;
    }
    return true;
   }

   function compareRnd(copulaRnd, multiCDF, multiRnd) {
    var tests = 10;
    var samples = 100000;
    var n = multiCDF.mu().dims();
    var z, count, sample, x, i;

    while(tests-->0) {
     z = multiRnd();
     count = 0;
     for(sample=0;sample<samples;++sample) {
      x = copulaRnd();
      i = 0;
      while(i<n && x.at(i)<=z.at(i)) ++i;
      if(i===n) ++count;
     }
     if(ak.diff(count/samples, multiCDF(z))>5e-2) return false;
    }
    return true;
   }

   var val = {
    name: 'val',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   val.add('CDF', function(){return compareCDF(copulaCDF, multiCDF, multiRnd);});
   val.add('PDF', function(){return comparePDF(copulaPDF, multiPDF, multiRnd);});
   val.add('Rnd', function(){return compareRnd(copulaRnd, multiCDF, multiRnd);});

   copulaDistribution.add(val);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   copulaDistribution.add(load);
  }

  akTest.add(copulaDistribution);
 }

 ak.using(['Copula/GaussianCopula.js', 'Distribution/CopulaDistribution.js', 'Distribution/NormalDistribution.js', 'Distribution/MultiNormalDistribution.js'], define);
})();