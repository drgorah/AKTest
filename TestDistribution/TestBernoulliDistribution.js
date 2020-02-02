"use strict";

(function() {
 function define() {
  var bernoulli = {
   name: 'distribution.bernoulliDistribution',
   body: [],
   add: function(t) {this.body.push(t);}
  };

  try {
   function rnd() {return Math.random();}

   var pmf0 = ak.bernoulliPMF();
   var pmf1 = ak.bernoulliPMF(0.25);

   var cdf0 = ak.bernoulliCDF();
   var cdf1 = ak.bernoulliCDF(0.25);

   var inv_cdf0 = ak.bernoulliInvCDF();
   var inv_cdf1 = ak.bernoulliInvCDF(0.25);

   var cf0 = ak.bernoulliCF();
   var cf1 = ak.bernoulliCF(0.25);

   var rnd0  = ak.bernoulliRnd();
   var rnd1  = ak.bernoulliRnd(0.25);
   var rnd2  = ak.bernoulliRnd(rnd);
   var rnd3  = ak.bernoulliRnd(0.25, rnd);

   var init = {
    name: 'init',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   init.add('pmf', function(){return pmf0.p()===0.5 && pmf1.p()===0.25;});
   init.add('cdf', function(){return cdf0.p()===0.5 && cdf1.p()===0.25;});
   init.add('cf', function(){return cf0.p()===0.5 && cf1.p()===0.25;});
   init.add('inv_cdf', function(){return inv_cdf0.p()===0.5 && inv_cdf1.p()===0.25;});
   init.add('rnd', function(){return rnd0.p()===0.5  && rnd0.rnd()===Math.random
                                  && rnd1.p()===0.25 && rnd1.rnd()===Math.random
                                  && rnd2.p()===0.5  && rnd2.rnd()===rnd
                                  && rnd3.p()===0.25 && rnd3.rnd()===rnd;});
  
   var val = {
    name: 'val',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   function testPMF(pmf) {
    var p = pmf.p();
    return pmf(0)===1-p && pmf(1)===p;
   }
   
   val.add('pmf', function(){return testPMF(pmf0) && testPMF(pmf1);});
  
   function testCDF(cdf) {
    var p = cdf.p();
    return cdf(0)===1-p && cdf(0.5)===1-p && cdf(1)===1;
   }  
   
   val.add('cdf', function(){return testCDF(cdf0) && testCDF(cdf1);});
  
   function testInv(inv, cdf) {
    var c, k;

    for(c=0;c<1;c+=1/32) {
     for(k=0;cdf(k)<c;++k);
     if(inv(c)!==k) return false;
    }

    if(inv(cdf(0))!==0) return false;
    if(inv(cdf(1))!==1) return false;

    return true;
   }
  
   val.add('inv_cdf', function(){return testInv(inv_cdf0, cdf0) && testInv(inv_cdf1, cdf1);});

   function eitx(pmf, t) {
    return ak.add(pmf(0), ak.mul(pmf(1), ak.exp(ak.mul(t, ak.I))));
   }

   function testcf(cf, pmf) {
    var t;
    for(t=-2;t<=2;t+=0.125) {
     if(!(ak.dist(cf(t), eitx(pmf, t))<1e-10)) return false;
    }
    return true;
   }

   val.add('cf', function(){return testcf(cf0, pmf0) && testcf(cf1, pmf1);});
   
   function testRnd(rnd, pmf) {
    var n = 100000;
    var h0 = 0;
    var h1 = 0;
    var i;

    for(i=0;i<n;++i) {
     if(rnd()===0) ++h0;
     else          ++h1;
    }
    return ak.diff(h0/n, pmf(0))<5e-3 && ak.diff(h1/n, pmf(1))<5e-3;
   }

   val.add('rnd', function(){return testRnd(rnd0, pmf0) && testRnd(rnd1, pmf1);});
  
   bernoulli.add(init);
   bernoulli.add(val);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   bernoulli.add(load);
  }

  akTest.add(bernoulli);
 }

 ak.using('Distribution/BernoulliDistribution.js', define);
})();