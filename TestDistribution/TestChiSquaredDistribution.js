"use strict";

(function() {
 function define() {
  var chiSquared = {
   name: 'distribution.chiSquaredDistribution',
   body: [],
   add: function(t) {this.body.push(t);}
  };

  try {
   function rnd() {return Math.random();}

   var pdf1 = ak.chiSquaredPDF(1);
   var pdf2 = ak.chiSquaredPDF(2);
   var pdf9 = ak.chiSquaredPDF(9);
  
   var cdf1 = ak.chiSquaredCDF(1);
   var cdf2 = ak.chiSquaredCDF(2);
   var cdf9 = ak.chiSquaredCDF(9);
  
   var inv_cdf1 = ak.chiSquaredInvCDF(1);
   var inv_cdf2 = ak.chiSquaredInvCDF(2);
   var inv_cdf9 = ak.chiSquaredInvCDF(9);
  
   var cf1 = ak.chiSquaredCF(1);
   var cf2 = ak.chiSquaredCF(2);
   var cf9 = ak.chiSquaredCF(9);
  
   var rnd01 = ak.chiSquaredRnd(1);
   var rnd02 = ak.chiSquaredRnd(2);
   var rnd09 = ak.chiSquaredRnd(9);
   var rnd11 = ak.chiSquaredRnd(1, rnd);
   var rnd12 = ak.chiSquaredRnd(2, rnd);
   var rnd19 = ak.chiSquaredRnd(9, rnd);
  
   var init = {
    name: 'init',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   function bad() {
    try {ak.chiSquaredPDF(0); return false;} catch(e) {}
    try {ak.chiSquaredPDF(2.5); return false;} catch(e) {}
    try {ak.chiSquaredCDF(0); return false;} catch(e) {}
    try {ak.chiSquaredCDF(2.5); return false;} catch(e) {}
    try {ak.chiSquaredInvCDF(0); return false;} catch(e) {}
    try {ak.chiSquaredInvCDF(2.5); return false;} catch(e) {}
    try {ak.chiSquaredCF(0); return false;} catch(e) {}
    try {ak.chiSquaredCF(2.5); return false;} catch(e) {}
    try {ak.chiSquaredRnd(0); return false;} catch(e) {}
    try {ak.chiSquaredRnd(2.5); return false;} catch(e) {}
    return true;
   }

   init.add('bad', bad);
   init.add('pdf', function(){return pdf1.k()===1 && pdf2.k()===2 && pdf9.k()===9;});
   init.add('cdf', function(){return cdf1.k()===1 && cdf2.k()===2 && cdf9.k()===9;});
   init.add('inv_cdf', function(){return inv_cdf1.k()===1 && inv_cdf2.k()===2 && inv_cdf9.k()===9;});
   init.add('cf', function(){return cf1.k()===1 && cf2.k()===2 && cf9.k()===9;});
   init.add('rnd', function(){return rnd01.k()===1 && rnd01.rnd()===Math.random && rnd02.k()===2 && rnd02.rnd()===Math.random && rnd09.k()===9 && rnd09.rnd()===Math.random
                                  && rnd11.k()===1 && rnd11.rnd()===rnd && rnd12.k()===2 && rnd12.rnd()===rnd && rnd19.k()===9 && rnd19.rnd()===rnd;});

   var val = {
    name: 'val',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   function testPDF(pdf) {
    var k = pdf.k();
    var d = Math.sqrt(ak.EPSILON);
    var x, y;
  
    for(x=0.1;x<=4;x+=0.1) {
     y = (k/2 - 1)*Math.log(x) - x/2 - Math.log(2)*k/2 - ak.logGamma(k/2);
     if(!(ak.dist(pdf(x), Math.exp(y))<d)) return false;
    }
    return true;
   }
  
   val.add('pdf', function(){return testPDF(pdf1) && testPDF(pdf2) && testPDF(pdf9);});

   function testCDF(pdf, cdf) {
    var d = Math.sqrt(ak.EPSILON);
    var x;

    for(x=0.1;x<=4;x+=0.1) {
     if(!(ak.dist(cdf(x+d)-cdf(x-d), 2*d*pdf(x))<d)) return false;
    }
    return true;
   }
  
   val.add('cdf', function(){return testCDF(pdf1, cdf1) && testCDF(pdf2, cdf2) && testCDF(pdf9, cdf9);});

   function testInvCDF(cdf, inv_cdf) {
    var d = Math.sqrt(ak.EPSILON);
    var c;
  
    for(c=0.001;c<1;c+=0.001) {
     if(!(ak.dist(c, cdf(inv_cdf(c)))<d)) return false;
    }
    return true;
   }
  
   val.add('inv_cdf', function(){return testInvCDF(cdf1, inv_cdf1) && testInvCDF(cdf2, inv_cdf2) && testInvCDF(cdf9, inv_cdf9);});

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
  
   val.add('cf', function(){return testCF(rnd01, cf1) && testCF(rnd02, cf2) && testCF(rnd09, cf9);});

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
  
   val.add('rnd', function(){return testRnd(rnd01, cdf1) && testRnd(rnd02, cdf2) && testRnd(rnd09, cdf9);});

   chiSquared.add(init);
   chiSquared.add(val);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   chiSquared.add(load);
  }

  akTest.add(chiSquared);
 }

 ak.using('Distribution/ChiSquaredDistribution.js', define);
})();