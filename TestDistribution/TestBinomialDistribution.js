"use strict";

(function() {
 function define() {
  var binomial = {
   name: 'distribution.binomialDistribution',
   body: [],
   add: function(t) {this.body.push(t);}
  };

  try {
   function rnd() {return Math.random();}

   var pmf0 = ak.binomialPMF();
   var pmf1 = ak.binomialPMF(5);
   var pmf2 = ak.binomialPMF(5, 0.25);
   var pmf3 = ak.binomialPMF(32, 0.25);
   var pmf4 = ak.binomialPMF(32, 0.75);
   var pmf5 = ak.binomialPMF(128, 0.25);
   var pmf6 = ak.binomialPMF(128, 0.75);
   var pmf7 = ak.binomialPMF(0);

   var cdf0 = ak.binomialCDF();
   var cdf1 = ak.binomialCDF(5);
   var cdf2 = ak.binomialCDF(5, 0.25);
   var cdf3 = ak.binomialCDF(0);

   var inv_cdf0 = ak.binomialInvCDF();
   var inv_cdf1 = ak.binomialInvCDF(5);
   var inv_cdf2 = ak.binomialInvCDF(5, 0.25);
   var inv_cdf3 = ak.binomialInvCDF(0);

   var cf0 = ak.binomialCF();
   var cf1 = ak.binomialCF(5);
   var cf2 = ak.binomialCF(5, 0.25);
   var cf3 = ak.binomialCF(0);

   var rnd0  = ak.binomialRnd();
   var rnd1  = ak.binomialRnd(5);
   var rnd2  = ak.binomialRnd(5, 0.25);
   var rnd3  = ak.binomialRnd(rnd);
   var rnd4  = ak.binomialRnd(5, rnd);
   var rnd5  = ak.binomialRnd(5, 0.25, rnd);
   var rnd6  = ak.binomialRnd(32, 0.25);
   var rnd7  = ak.binomialRnd(32, 0.75);
   var rnd8  = ak.binomialRnd(128, 0.25);
   var rnd9  = ak.binomialRnd(128, 0.75);
   var rnd10 = ak.binomialRnd(0);

   var init = {
    name: 'init',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   init.add('pmf', function(){return pmf0.n()===1 && pmf0.p()===0.5
                                  && pmf1.n()===5 && pmf1.p()===0.5
                                  && pmf2.n()===5 && pmf2.p()===0.25;});

   init.add('cdf', function(){return cdf0.n()===1 && cdf0.p()===0.5
                                  && cdf1.n()===5 && cdf1.p()===0.5
                                  && cdf2.n()===5 && cdf2.p()===0.25;});

   init.add('cf', function(){return cf0.n()===1 && cf0.p()===0.5
                                 && cf1.n()===5 && cf1.p()===0.5
                                 && cf2.n()===5 && cf2.p()===0.25;});

   init.add('inv_cdf', function(){return inv_cdf0.n()===1 && inv_cdf0.p()===0.5
                                      && inv_cdf1.n()===5 && inv_cdf1.p()===0.5
                                      && inv_cdf2.n()===5 && inv_cdf2.p()===0.25;});

   init.add('rnd', function(){return rnd0.n()===1 && rnd0.p()===0.5  && rnd0.rnd()===Math.random
                                  && rnd1.n()===5 && rnd1.p()===0.5  && rnd1.rnd()===Math.random
                                  && rnd2.n()===5 && rnd2.p()===0.25 && rnd2.rnd()===Math.random
                                  && rnd3.n()===1 && rnd3.p()===0.5  && rnd3.rnd()===rnd
                                  && rnd4.n()===5 && rnd4.p()===0.5  && rnd4.rnd()===rnd
                                  && rnd5.n()===5 && rnd5.p()===0.25 && rnd5.rnd()===rnd;});
  
   var val = {
    name: 'val',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   function fact(n) {
    var f = 1;
    while(n>1) f *= n--;
    return f;
   }

   function testPMF(pmf) {
    var n = pmf.n();
    var p = pmf.p();
    var k;

    for(k=0;k<=n;++k) {
     if(!(ak.diff(pmf(k),Math.pow(p, k)*Math.pow(1-p, n-k) * fact(n) / (fact(k)*fact(n-k)))<1e-10)) return false;
    }
    return true;
   }
   
   val.add('pmf', function(){return testPMF(pmf0) && testPMF(pmf1) && testPMF(pmf2) && testPMF(pmf7);});
  
   function testCDF(cdf, pmf) {
    var k;
  
    for(k=0;k<=10;++k) {
     if(!(ak.diff((cdf(k)-cdf(k-1)),pmf(k))<1e-10)) return false;
    }
    return true;
   }  
   
   val.add('cdf', function(){return testCDF(cdf0, pmf0) && testCDF(cdf1, pmf1) && testCDF(cdf2, pmf2) && testCDF(cdf3, pmf7);});
  
   function testInv(inv, cdf) {
    var n = cdf.n();
    var c, k;

    for(c=0;c<1;c+=1/32) {
     for(k=0;cdf(k)<c;++k);
     if(inv(c)!==k) return false;
    }

    for(k=0;k<=n;++k) {
     if(inv(cdf(k))!==k) return false;
    }

    return true;
   }
  
   val.add('inv_cdf', function(){return testInv(inv_cdf0, cdf0) && testInv(inv_cdf1, cdf1) && testInv(inv_cdf2, cdf2) && testInv(inv_cdf3, cdf3);});

   function eitx(pmf, t) {
    var n = pmf.n();
    var p = pmf.p();
    var e = 0;
    var k;

    for(k=0;k<=n;++k) {
     e = ak.add(e, ak.mul(pmf(k), ak.exp(ak.mul(k*t, ak.I))));
    }
    return e;
   }

   function testcf(cf, pmf) {
    var t;
    for(t=-2;t<=2;t+=0.125) {
     if(!(ak.dist(cf(t), eitx(pmf, t))<1e-10)) return false;
    }
    return true;
   }

   val.add('cf', function(){return testcf(cf0, pmf0) && testcf(cf1, pmf1) && testcf(cf2, pmf2) && testcf(cf3, pmf7);});
   
   function testRnd(rnd, pmf) {
    var n = 100000;
    var h = ak.vector(pmf.n()+1, 0).toArray();
    var i, k;

    for(i=0;i<n;++i) {
     k = rnd();
     h[k] += 1;
    }
    return h.every(function(e, k){return ak.diff(e/n, pmf(k))<5e-3;});
   }

   val.add('rnd', function(){return testRnd(rnd0, pmf0) && testRnd(rnd1, pmf1) && testRnd(rnd2, pmf2)
                                 && testRnd(rnd3, pmf0) && testRnd(rnd4, pmf1) && testRnd(rnd5, pmf2)
                                 && testRnd(rnd6, pmf3) && testRnd(rnd7, pmf4)
                                 && testRnd(rnd8, pmf5) && testRnd(rnd9, pmf6)
                                 && testRnd(rnd10, pmf7);});
  
   binomial.add(init);
   binomial.add(val);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   binomial.add(load);
  }

  akTest.add(binomial);
 }

 ak.using(['Distribution/BinomialDistribution.js', 'Matrix/Vector.js'], define);
})();