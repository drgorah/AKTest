"use strict";

(function() {
 function define() {
  var exponential = {
   name: 'distribution.exponentialDistribution',
   body: [],
   add: function(t) {this.body.push(t);}
  };

  try {
   function rnd() {return Math.random();}

   var pdf0 = ak.exponentialPDF();
   var pdf1 = ak.exponentialPDF(2);
   var pdf2 = ak.exponentialPDF(0.5);
  
   var cdf0 = ak.exponentialCDF();
   var cdf1 = ak.exponentialCDF(2);
   var cdf2 = ak.exponentialCDF(0.5);
  
   var inv_cdf0 = ak.exponentialInvCDF();
   var inv_cdf1 = ak.exponentialInvCDF(2);
   var inv_cdf2 = ak.exponentialInvCDF(0.5);
  
   var cf0 = ak.exponentialCF();
   var cf1 = ak.exponentialCF(2);
   var cf2 = ak.exponentialCF(0.5);
  
   var rnd0 = ak.exponentialRnd();
   var rnd1 = ak.exponentialRnd(2);
   var rnd2 = ak.exponentialRnd(0.5);
   var rnd3 = ak.exponentialRnd(rnd);
   var rnd4 = ak.exponentialRnd(0.5, rnd);
  
   var init = {
    name: 'init',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   init.add('pdf', function(){return pdf0.lambda()===1 && pdf1.lambda()===2 && pdf2.lambda()===0.5;});
   init.add('cdf', function(){return cdf0.lambda()===1 && cdf1.lambda()===2 && cdf2.lambda()===0.5;});
   init.add('inv_cdf', function(){return inv_cdf0.lambda()===1 && inv_cdf1.lambda()===2 && inv_cdf2.lambda()===0.5;});
   init.add('cf', function(){return cf0.lambda()===1 && cf1.lambda()===2 && cf2.lambda()===0.5;});
   init.add('rnd', function(){return rnd0.lambda()===1   && rnd0.rnd()===Math.random
                                  && rnd1.lambda()===2   && rnd1.rnd()===Math.random
                                  && rnd2.lambda()===0.5 && rnd2.rnd()===Math.random
                                  && rnd3.lambda()===1   && rnd3.rnd()===rnd
                                  && rnd4.lambda()===0.5 && rnd4.rnd()===rnd;});
  
   var val = {
    name: 'val',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   val.add('pdf', function(){return pdf0(-1)===0 && pdf0(0.5)===Math.exp(-0.5) && pdf0(1)===Math.exp(-1) && pdf1(-1)===0 && pdf1(0.5)===2*Math.exp(-1) && pdf1(1)===2*Math.exp(-2);});
   val.add('cdf', function(){return cdf0(-1)===0 && cdf0(0.5)===1-Math.exp(-0.5) && cdf0(1)===1-Math.exp(-1) && cdf1(-1)===0 && cdf1(0.5)===1-Math.exp(-1) && cdf1(1)===1-Math.exp(-2);});
   val.add('inv_cdf', function(){return inv_cdf0(0)===0 && inv_cdf0(1)===ak.INFINITY && ak.dist(inv_cdf0(1-Math.exp(-0.5)), 0.5)<1e-10 && ak.dist(inv_cdf1(1-Math.exp(-1)), 0.5)<1e-10;});
   
   val.add('cf', function(){return ak.dist(cf0(0), 1)<1e-10 && ak.dist(cf0(-1), ak.inv(ak.complex(1, 1)))<1e-10 && ak.dist(cf0(2), ak.inv(ak.complex(1, -2)))<1e-10 && ak.dist(cf1(0), 1)<1e-10 && ak.dist(cf1(-1), ak.inv(ak.complex(1, 0.5)))<1e-10 && ak.dist(cf1(2), ak.inv(ak.complex(1, -1)))<1e-10;});
  
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
  
   val.add('rnd', function(){return testRnd(rnd0, cdf0) && testRnd(rnd4, cdf2);});
  
   exponential.add(init);
   exponential.add(val);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   exponential.add(load);
  }

  akTest.add(exponential);
 }

 ak.using('Distribution/ExponentialDistribution.js', define);
})();