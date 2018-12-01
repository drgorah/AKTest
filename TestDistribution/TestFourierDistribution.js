"use strict";

(function() {
 function define() {
  var fourier = {
   name: 'distribution.fourierDistribution',
   body: [],
   add: function(t) {this.body.push(t);}
  };

  try {
   function initPDF(a, b) {
    var n    = 4;
    var N    = Math.pow(2, n);
    var x    = (a+b)/2;
    var w    = 2*(b-a);
    var ucf  = ak.uniformCF(a, b);
    var updf = ak.uniformPDF(a, b);
    var fpdf = ak.fourierPDF(ucf, x, w, n);
  
    return fpdf.cf()===ucf && fpdf.x()===x && fpdf.w()===w && fpdf.n()===n;
   }
  
   function initCDF(a, b) {
    var n    = 4;
    var N    = Math.pow(2, n);
    var x    = (a+b)/2;
    var w    = 2*(b-a);
    var ucf  = ak.uniformCF(a, b);
    var ucdf = ak.uniformCDF(a, b);
    var fcdf = ak.fourierCDF(ucf, x, w, n);
  
    return fcdf.cf()===ucf && fcdf.x()===x && fcdf.w()===w && fcdf.n()===n;
   }
  
   function initInvCDF(a, b) {
    var n    = 4;
    var N    = Math.pow(2, n);
    var x    = (a+b)/2;
    var w    = 2*(b-a);
    var ucf  = ak.uniformCF(a, b);
    var uinv = ak.uniformInvCDF(a, b);
    var finv = ak.fourierInvCDF(ucf, x, w, n);
  
    return finv.cf()===ucf && finv.x()===x && finv.w()===w && finv.n()===n;
   }
  
   function initRnd(a, b) {
    var n     = 4;
    var N     = Math.pow(2, n);
    var x     = (a+b)/2;
    var w     = 2*(b-a);
    var rnd   = ak.uniformRnd();
    var ucf   = ak.uniformCF(a, b);
    var frnd1 = ak.fourierRnd(ucf, x, w, n);
    var frnd2 = ak.fourierRnd(ucf, x, w, n, rnd);
  
    return frnd1.cf()===ucf && frnd1.x()===x && frnd1.w()===w && frnd1.n()===n && frnd1.rnd()===Math.random && frnd2.cf()===ucf && frnd2.x()===x && frnd2.w()===w && frnd2.n()===n && frnd2.rnd()===rnd;
   }
  
   var init = {
    name: 'init',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   init.add('pdf', function(){return initPDF(0, 1) && initPDF(2, 4);});
   init.add('cdf', function(){return initCDF(0, 1) && initCDF(2, 4);});
   init.add('invCDF', function(){return initInvCDF(0, 1) && initInvCDF(2, 4);});
   init.add('rnd', function(){return initRnd(0, 1) && initRnd(2, 4);});
  
   function valPDF(a, b) {
    var n    = 10;
    var x    = (a+b)/2;
    var w    = 2*(b-a);
    var ucf  = ak.uniformCF(a, b);
    var updf = ak.uniformPDF(a, b);
    var fpdf = ak.fourierPDF(ucf, x, w, n);
    var ni   = 1000;
    var i, y;
  
    for(i=1;i<ni;++i) {
     y = a + i*(b-a)/ni;
  
     if(!(ak.diff(updf(y), fpdf(y))<1e-1)) return false;
    }
    return true;
   }
  
   function valCDF(a, b) {
    var n    = 10;
    var x    = (a+b)/2;
    var w    = 2*(b-a);
    var ucf  = ak.uniformCF(a, b);
    var ucdf = ak.uniformCDF(a, b);
    var fcdf = ak.fourierCDF(ucf, x, w, n);
    var ni   = 1000;
    var i, y;
  
    for(i=1;i<ni;++i) {
     y = a + i*(b-a)/ni;
     if(!(ak.diff(ucdf(y), fcdf(y))<5e-3)) return false;
    }
    return true;
   }
  
   function valInvCDF(a, b) {
    var n    = 10;
    var x    = (a+b)/2;
    var w    = 2*(b-a);
    var ucf  = ak.uniformCF(a, b);
    var uinv = ak.uniformInvCDF(a, b);
    var finv = ak.fourierInvCDF(ucf, x, w, n);
    var ni   = 1000;
    var i, y;
  
    for(i=1;i<ni;++i) {
     y = i/ni;
     if(!(ak.diff(uinv(y), finv(y))<5e-3)) return false;
    }
    return true;
   }
  
   function valRnd(a, b) {
    var n   = 10;
    var x   = (a+b)/2;
    var w   = 2*(b-a);
    var cf  = ak.uniformCF(a, b);
    var cdf = ak.fourierCDF(cf, x, w, n);
    var rnd = ak.fourierRnd(cf, x, w, n);
    var s   = 0;
    var s2  = 0.0;
    var ni  = 1000000;
    var i, x;
  
    for(i=0;i<ni;++i) {
     x = cdf(rnd());
     s  += x;
     s2 += x*x;
    }
  
    s  /= ni;
    s2 /= ni;
    s2 -= s*s;
  
    return ak.dist(s, 0.5)<1e-3 && ak.dist(s2, 1/12)<1e-3;
   }
  
   var val = {
    name: 'val',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   val.add('pdf', function(){return valPDF(0, 1) && valPDF(2, 4);});
   val.add('cdf', function(){return valCDF(0, 1) && valCDF(2, 4);});
   val.add('invCDF', function(){return valInvCDF(0, 1) && valInvCDF(2, 4);});
   val.add('rnd', function(){return valRnd(0, 1) && valRnd(2, 4);});
  
   fourier.add(init);
   fourier.add(val);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   fourier.add(load);
  }

  akTest.add(fourier);
 }

 ak.using(['Distribution/UniformDistribution.js', 'Distribution/FourierDistribution.js'], define);
})();