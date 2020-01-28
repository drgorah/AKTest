"use strict";

(function() {
 function define() {
  var gamma = {
   name: 'distribution.gammaDistribution',
   body: [],
   add: function(t) {this.body.push(t);}
  };
  
  try {
   function rnd() {return Math.random();}

   var pdf0 = ak.gammaPDF();
   var pdf1 = ak.gammaPDF(2);
   var pdf2 = ak.gammaPDF(0.5);
   var pdf3 = ak.gammaPDF(2, 0.5);
   var pdf4 = ak.gammaPDF(0.5, 2);
  
   var cdf0 = ak.gammaCDF();
   var cdf1 = ak.gammaCDF(2);
   var cdf2 = ak.gammaCDF(0.5);
   var cdf3 = ak.gammaCDF(2, 0.5);
   var cdf4 = ak.gammaCDF(0.5, 2);
   var cdf5 = ak.gammaCDF(2.5, 2);
   var cdf6 = ak.gammaCDF(7.25, 2.5);
   var cdf7 = ak.gammaCDF(100000, 100000);
  
   var inv_cdf0 = ak.gammaInvCDF();
   var inv_cdf1 = ak.gammaInvCDF(2);
   var inv_cdf2 = ak.gammaInvCDF(0.5);
   var inv_cdf3 = ak.gammaInvCDF(2, 0.5);
   var inv_cdf4 = ak.gammaInvCDF(0.5, 2);
  
   var cf0 = ak.gammaCF();
   var cf1 = ak.gammaCF(2);
   var cf2 = ak.gammaCF(0.5);
   var cf3 = ak.gammaCF(2, 0.5);
   var cf4 = ak.gammaCF(0.5, 2);
  
   var rnd0  = ak.gammaRnd();
   var rnd1  = ak.gammaRnd(2);
   var rnd2  = ak.gammaRnd(0.5);
   var rnd3  = ak.gammaRnd(2, 0.5);
   var rnd4  = ak.gammaRnd(0.5, 2);
   var rnd5  = ak.gammaRnd(rnd);
   var rnd6  = ak.gammaRnd(0.5, rnd);
   var rnd7  = ak.gammaRnd(0.5, 2, rnd);
   var rnd8  = ak.gammaRnd(2.5, 2, rnd);
   var rnd9  = ak.gammaRnd(7.25, 2.5);
   var rnd10 = ak.gammaRnd(100000, 100000);
  
   var init = {
    name: 'init',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   init.add('pdf', function(){return pdf0.k()===1 && pdf0.lambda()===1 && pdf1.k()===2 && pdf1.lambda()===1 && pdf2.k()===0.5 && pdf2.lambda()===1 && pdf3.k()===2 && pdf3.lambda()===0.5 && pdf4.k()===0.5 && pdf4.lambda()===2;});
   init.add('cdf', function(){return cdf0.k()===1 && cdf0.lambda()===1 && cdf1.k()===2 && cdf1.lambda()===1 && cdf2.k()===0.5 && cdf2.lambda()===1 && cdf3.k()===2 && cdf3.lambda()===0.5 && cdf4.k()===0.5 && cdf4.lambda()===2;});
   init.add('inv_cdf', function(){return inv_cdf0.k()===1 && inv_cdf0.lambda()===1 && inv_cdf1.k()===2 &&
   inv_cdf1.lambda()===1 && inv_cdf2.k()===0.5 && inv_cdf2.lambda()===1 && inv_cdf3.k()===2 && inv_cdf3.lambda()===0.5 && inv_cdf4.k()===0.5 && inv_cdf4.lambda()===2;});
   init.add('cf', function(){return cf0.k()===1 && cf0.lambda()===1 && cf1.k()===2 &&
   cf1.lambda()===1 && cf2.k()===0.5 && cf2.lambda()===1 && cf3.k()===2 && cf3.lambda()===0.5 && cf4.k()===0.5 && cf4.lambda()===2;});
   init.add('rnd', function(){return rnd0.k()===1   && rnd0.lambda()===1   && rnd0.rnd()===Math.random
                                  && rnd1.k()===2   && rnd1.lambda()===1   && rnd1.rnd()===Math.random
                                  && rnd2.k()===0.5 && rnd2.lambda()===1   && rnd2.rnd()===Math.random
                                  && rnd3.k()===2   && rnd3.lambda()===0.5 && rnd3.rnd()===Math.random
                                  && rnd4.k()===0.5 && rnd4.lambda()===2   && rnd4.rnd()===Math.random
                                  && rnd5.k()===1   && rnd5.lambda()===1   && rnd5.rnd()===rnd
                                  && rnd6.k()===0.5 && rnd6.lambda()===1   && rnd6.rnd()===rnd
                                  && rnd7.k()===0.5 && rnd7.lambda()===2   && rnd7.rnd()===rnd
                                  && rnd8.k()===2.5 && rnd8.lambda()===2   && rnd8.rnd()===rnd;});
   
   var val = {
    name: 'val',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   function testPDF(pdf) {
    var k = pdf.k();
    var l = pdf.lambda();
    var lk = Math.pow(l, k);
    var gk = ak.gamma(k);
    var x, p;
    
    for(x=0.1;x<2;x*=2) {
     p = lk * Math.pow(x, k-1) * Math.exp(-l*x) / gk;
     if(ak.dist(pdf(x),p)>1e-10) return false;
    }
    return true;
   }
   
   val.add('pdf', function(){return testPDF(pdf0) && testPDF(pdf1) && testPDF(pdf2) && testPDF(pdf3) && testPDF(pdf4);});
  
   function testCDF(cdf, pdf) {
    var e = 1e-5;
    var x, d;
    for(x=0.1;x<2;x*=2) {
     d = x*e;
     if(ak.dist((cdf(x+d)-cdf(x-d))/(2*d),pdf(x))>1e-10) return false;
    }
    return true;
   }  
   
   val.add('cdf', function(){return testCDF(cdf0, pdf0) && testCDF(cdf1, pdf1) && testCDF(cdf2, pdf2) && testCDF(cdf3, pdf3) && testCDF(cdf4, pdf4);});
   
   function testInv(inv, cdf) {
    var c;
    for(c=0;c<1;c+=1/32) {
     if(ak.dist(cdf(inv(c)),c)>1e-10) return false;
    }
    return true;
   }
  
   val.add('inv_cdf', function(){return testInv(inv_cdf0, cdf0) && testInv(inv_cdf1, cdf1) && testInv(inv_cdf2, cdf2) && testInv(inv_cdf3, cdf3) && testInv(inv_cdf4, cdf4);});
   
   val.add('cf', function(){return ak.dist(cf0(0), 1)<1e-10 && ak.dist(cf0(-1), ak.inv(ak.complex(1, 1)))<1e-10 && ak.dist(cf0(2), ak.inv(ak.complex(1, -2)))<1e-10 && ak.dist(cf3(0), 1)<1e-10 && ak.dist(cf3(-1), ak.pow(ak.complex(1, 2), -2))<1e-10 && ak.dist(cf3(2), ak.pow(ak.complex(1, -4), -2))<1e-10 && ak.dist(cf4(0), 1)<1e-10 && ak.dist(cf4(-1), ak.pow(ak.complex(1, 0.5), -0.5))<1e-10 && ak.dist(cf4(2), ak.pow(ak.complex(1, -1), -0.5))<1e-10;});
   
   function testRnd(rnd, cdf) {
    var n  = 10000;
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
  
    return ak.dist(s, 0.5)<1e-2 && ak.dist(s2, 1/12)<1e-2;
   }
  
   val.add('rnd', function(){return testRnd(rnd0, cdf0) && testRnd(rnd7, cdf4) && testRnd(rnd8, cdf5) && testRnd(rnd9, cdf6) && testRnd(rnd10, cdf7);});
  
   gamma.add(init);
   gamma.add(val);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   gamma.add(load);
  }

  akTest.add(gamma);
 }

 ak.using('Distribution/GammaDistribution.js', define);
})();