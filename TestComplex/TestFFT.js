"use strict";

(function() {
 function define() {
  var fft = {
   name: 'complex.fft',
   body: [],
   add: function(t) {this.body.push(t);}
  };

  try {
   function dft(f) {
    var n = f.length;
    var F = new Array(n);
    var k, j, theta;
  
    for(k=0;k<n;++k) {
     F[k] = ak.complex(0);
     for(j=0;j<n;++j) {
      theta = -2*ak.PI*j*k/n;
      F[k] = ak.add(F[k], ak.mul(f[j], ak.complex(Math.cos(theta), Math.sin(theta))));
     }
    }
    return F;
   }
  
   var consistent = {
    name: 'consistent',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   function dftCmp() {
    var n = 32;
    var f = new Array(n);
    var i, F0, F1;
  
    for(i=0;i<n;++i) f[i] = 0;
    f[ 1] =  2;
    f[ 2] = -1;
    f[31] =  1;
  
    F0 = ak.fft(f);
    F1 = dft(f);
  
    for(i=0;i<n && ak.dist(F0[i], F1[i])<1e-10;++i);
    return i===n;
   }
  
   function oddCmp() {
    var n0 = 32;
    var n1 = 27;
    var x0 = new Array(n0);
    var x1 = new Array(n1);
    var i, F0, F1, f0, f1;
  
    for(i=0;i<n0;++i) x0[i] = 0;
    for(i=0;i<n1;++i) x1[i] = 0;
  
    x0[1] = x1[1] =  2;
    x0[2] = x1[2] = -1;
  
    F0 = ak.fft(x0);
    F1 = ak.fft(x1);
  
    f0 = ak.fftInv(x0);
    f1 = ak.fftInv(x1);
  
    for(i=0;i<n0 && ak.dist(F0[i], F1[i])<1e-10 && ak.dist(f0[i], f1[i])<1e-10;++i);
    return i===n0;
   }
  
   function invCmp() {
    var n  = 32;
    var f0 = new Array(n);
    var i, F0, f1;
  
    for(i=0;i<n;++i) f0[i] = 0;
    f0[ 1] =  2;
    f0[ 2] = -1;
    f0[31] =  1;
  
    F0 = ak.fft(f0);
    f1 = ak.fftInv(F0);
  
    for(i=0;i<n && ak.dist(f0[i], f1[i])<1e-10;++i);
    return i===n;
   }
  
   consistent.add('dft', dftCmp);
   consistent.add('odd', oddCmp);
   consistent.add('inv', invCmp);
  
   fft.add(consistent);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   fft.add(load);
  }

  akTest.add(fft);
 }

 ak.using('Complex/FFT.js', define);
})();
