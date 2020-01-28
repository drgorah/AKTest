"use strict";

(function() {
 function define() {
  var poisson = {
   name: 'distribution.poissonDistribution',
   body: [],
   add: function(t) {this.body.push(t);}
  };

  try {
   function rnd() {return Math.random();}

   var pmf0 = ak.poissonPMF();
   var pmf1 = ak.poissonPMF(2);
   var pmf2 = ak.poissonPMF(0.5);
  
   var cdf0 = ak.poissonCDF();
   var cdf1 = ak.poissonCDF(2);
   var cdf2 = ak.poissonCDF(0.5);
   var cdf3 = ak.poissonCDF(5);
   var cdf4 = ak.poissonCDF(100);
   var cdf5 = ak.poissonCDF(10000);
  
   var inv_cdf0 = ak.poissonInvCDF();
   var inv_cdf1 = ak.poissonInvCDF(2);
   var inv_cdf2 = ak.poissonInvCDF(0.5);
  
   var cf0 = ak.poissonCF();
   var cf1 = ak.poissonCF(2);
   var cf2 = ak.poissonCF(0.5);
  
   var rnd0 = ak.poissonRnd();
   var rnd1 = ak.poissonRnd(2);
   var rnd2 = ak.poissonRnd(0.5);
   var rnd3 = ak.poissonRnd(rnd);
   var rnd4 = ak.poissonRnd(0.5, rnd);
   var rnd5 = ak.poissonRnd(5);
   var rnd6 = ak.poissonRnd(100);
   var rnd7 = ak.poissonRnd(10000);
  
   var init = {
    name: 'init',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   init.add('pmf', function(){return pmf0.lambda()===1 && pmf1.lambda()===2 && pmf2.lambda()===0.5;});
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
  
   function testPMF(pmf) {
    var l = pmf.lambda();
    var e = Math.exp(-l);
    var lk = 1;
    var f = 1;
    var k, p;
    
    for(k=0;k<=10;++k) {
     p = lk*e/f;
     if(ak.diff(pmf(k),p)>1e-10) return false;
  
     f  *= k+1;
     lk *= l;
    }
    return true;
   }
   
   val.add('pmf', function(){return testPMF(pmf0) && testPMF(pmf1) && testPMF(pmf2);});
  
   function testCDF(cdf, pmf) {
    var k, d;
  
    for(k=0;k<=10;++k) {
     if(ak.diff((cdf(k)-cdf(k-1)),pmf(k))>1e-10) return false;
    }
    return true;
   }  
   
   val.add('cdf', function(){return testCDF(cdf0, pmf0) && testCDF(cdf1, pmf1) && testCDF(cdf2, pmf2);});
  
   function testInv(inv, cdf) {
    var c, k;
  
    for(c=0;c<1;c+=1/32) {
     for(k=0;cdf(k)<c;++k);
     if(inv(c)!==k) return false;
    }
  
    for(k=0;k!=10;++k) {
     if(inv(cdf(k))!==k) return false;
    }
  
    return true;
   }
  
   val.add('inv_cdf', function(){return testInv(inv_cdf0, cdf0) && testInv(inv_cdf1, cdf1) && testInv(inv_cdf2, cdf2);});
  
   val.add('cf', function(){return ak.dist(cf0(0), 1)<1e-10 && ak.dist(cf0(-1), ak.exp(ak.sub(ak.mul(1, ak.exp(ak.mul(-1, ak.I))), 1)))<1e-10 && ak.dist(cf0(2), ak.exp(ak.sub(ak.mul(1, ak.exp(ak.mul(2, ak.I))), 1)))<1e-10 && ak.dist(cf1(0), 1)<1e-10 && ak.dist(cf1(-1), ak.exp(ak.sub(ak.mul(2, ak.exp(ak.mul(-1, ak.I))), 2)))<1e-10 && ak.dist(cf1(2), ak.exp(ak.sub(ak.mul(2, ak.exp(ak.mul(2, ak.I))), 2)))<1e-10 && ak.dist(cf2(0), 1)<1e-10 && ak.dist(cf2(-1), ak.exp(ak.sub(ak.mul(0.5, ak.exp(ak.mul(-1, ak.I))), 0.5)))<1e-10 && ak.dist(cf2(2), ak.exp(ak.sub(ak.mul(0.5, ak.exp(ak.mul(2, ak.I))), 0.5)))<1e-10;});
   
   function testRnd(rnd, cdf) {
    var n = 100000;
    var h = ak.vector(17, 0).toArray();
    var d = Math.max(ak.floor(Math.sqrt(rnd.lambda())/4), 1);
    var l = ak.floor(rnd.lambda())-8*d;
    var u = ak.floor(rnd.lambda())+9*d;
    var i, k;
  
    for(i=0;i<n;++i) {
     k = rnd();
     if(k>=l && k<u) h[ak.floor((k-l)/d)] += 1;
    }
  
    return h.every(function(e, k){return ak.diff(e/n, cdf(l+k*d+d-1)-cdf(l+k*d-1))<5e-3;});
   }
  
   val.add('rnd', function(){return testRnd(rnd0, cdf0) && testRnd(rnd1, cdf1) && testRnd(rnd4, cdf2) && testRnd(rnd5, cdf3) && testRnd(rnd6, cdf4) && testRnd(rnd7, cdf5);});
  
   poisson.add(init);
   poisson.add(val);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   poisson.add(load);
  }

  akTest.add(poisson);
 }

 ak.using(['Distribution/PoissonDistribution.js', 'Matrix/Vector.js'], define);
})();