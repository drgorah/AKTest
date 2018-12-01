"use strict";

(function() {
 function define() {
  var gumbel = {
   name: 'distribution.gumbelDistribution',
   body: [],
   add: function(t) {this.body.push(t);}
  };

  try {
   var pdf0 = ak.gumbelPDF();
   var pdf1 = ak.gumbelPDF(2);
   var pdf2 = ak.gumbelPDF(-1, 2);
  
   var cdf0 = ak.gumbelCDF();
   var cdf1 = ak.gumbelCDF(2);
   var cdf2 = ak.gumbelCDF(-1, 2);
  
   var inv_cdf0 = ak.gumbelInvCDF();
   var inv_cdf1 = ak.gumbelInvCDF(2);
   var inv_cdf2 = ak.gumbelInvCDF(-1, 2);
  
   var cf0 = ak.gumbelCF();
   var cf1 = ak.gumbelCF(2);
   var cf2 = ak.gumbelCF(-1, 2);
  
   var rnd0 = ak.gumbelRnd();
   var rnd1 = ak.gumbelRnd(2);
   var rnd2 = ak.gumbelRnd(-1, 2);
  
   var init = {
    name: 'init',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   init.add('pdf', function(){return pdf0.mu()===0 && pdf0.sigma()===1 && pdf1.mu()===0 && pdf1.sigma()===2 && pdf2.mu()===-1 && pdf2.sigma()===2;});
   init.add('cdf', function(){return cdf0.mu()===0 && cdf0.sigma()===1 && cdf1.mu()===0 && cdf1.sigma()===2 && cdf2.mu()===-1 && cdf2.sigma()===2;});
   init.add('inv_cdf', function(){return inv_cdf0.mu()===0 && inv_cdf0.sigma()===1 && inv_cdf1.mu()===0 && inv_cdf1.sigma()===2 && inv_cdf2.mu()===-1 && inv_cdf2.sigma()===2;});
   init.add('cf', function(){return cf0.mu()===0 && cf0.sigma()===1 && cf1.mu()===0 && cf1.sigma()===2 && cf2.mu()===-1 && cf2.sigma()===2;});
   init.add('rnd', function(){return rnd0.mu()===0 && rnd0.sigma()===1 && rnd1.mu()===0 && rnd1.sigma()===2 && rnd2.mu()===-1 && rnd2.sigma()===2;});
  
   var val = {
    name: 'val',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   var rt2pi = Math.sqrt(2*ak.PI);
  
   function testPDF(pdf) {
    var m = pdf.mu();
    var s = pdf.sigma();
    var x, z;
  
    for(x=-4;x<=4;x+=0.1) {
     z = (x-m)/s;
     if(!(ak.dist(pdf(x), Math.exp(-z-Math.exp(-z))/s)<1e-14)) return false;
    }
    return true;
   }
  
   val.add('pdf', function(){return testPDF(pdf0) && testPDF(pdf1) && testPDF(pdf2);});
  
   function testCDF(pdf, cdf) {
    var m = pdf.mu();
    var s = pdf.sigma();
    var d = Math.sqrt(ak.EPSILON);
    var z, x, x0, x1;
  
    for(z=-4;z<=4;z+=0.1) {
     x  = m + s*z;
     x0 = m + s*(z-d);
     x1 = m + s*(z+d);
     if(!(ak.dist(cdf(x1)-cdf(x0), d*pdf(x))<d)) return false;
    }
    return true;
   }
  
   val.add('cdf', function(){return testCDF(pdf0, cdf0) && testCDF(pdf1, cdf1) && testCDF(pdf2, cdf2);});
  
   function testInvCDF(cdf, inv_cdf) {
    var c;
  
    for(c=0.001;c<1;c+=0.001) {
     if(!(ak.dist(c, cdf(inv_cdf(c)))<1e-14)) return false;
    }
    return true;
   }
  
   val.add('inv_cdf', function(){return testInvCDF(cdf0, inv_cdf0) && testInvCDF(cdf1, inv_cdf1) && testInvCDF(cdf2, inv_cdf2);});
  
   function testCF(rnd, cf) {
    var n = 10000;
    var t, i, s;
  
    for(t=-1;t<=3;t+=0.5) {
     s = 0;
     for(i=0;i<n;++i) s = ak.add(s, ak.exp(ak.mul(ak.I, t*rnd())));
     
     if(ak.dist(cf(t), ak.div(s, n))>2.5e-2) return false;
    }
  
    return true;
   }
  
   val.add('cf', function(){return testCF(rnd0, cf0) && testCF(rnd1, cf1) && testCF(rnd2, cf2);});
  
   function testRnd(rnd, cdf) {
    var n  = 1000000;
    var s  = 0;
    var s2 = 0.0;
    var i, x;
  
    for(i=0;i<n;++i) {
     x = cdf(rnd());
     s  += x;
     s2 += x*x;
    }
  
    s  /= n;
    s2 /= n;
    s2 -= s*s;
  
    return ak.dist(s, 0.5)<1e-3 && ak.dist(s2, 1/12)<1e-3;
   }
  
   val.add('rnd', function(){return testRnd(rnd0, cdf0) && testRnd(rnd2, cdf2);});
  
   gumbel.add(init);
   gumbel.add(val);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   gumbel.add(load);
  }

  akTest.add(gumbel);
 }

 ak.using('Distribution/GumbelDistribution.js', define);
})();