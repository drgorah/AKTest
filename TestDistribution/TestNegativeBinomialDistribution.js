"use strict";

(function() {
 function define() {
  var negativeBinomial = {
   name: 'distribution.negativeBinomialDistribution',
   body: [],
   add: function(t) {this.body.push(t);}
  };

  try {
   function rnd() {return Math.random();}

   var pmf0 = ak.negativeBinomialPMF();
   var pmf1 = ak.negativeBinomialPMF(5);
   var pmf2 = ak.negativeBinomialPMF(5, 0.25);
   var pmf3 = ak.negativeBinomialPMF(100, 0.25);

   var cdf0 = ak.negativeBinomialCDF();
   var cdf1 = ak.negativeBinomialCDF(5);
   var cdf2 = ak.negativeBinomialCDF(5, 0.25);

   var inv_cdf0 = ak.negativeBinomialInvCDF();
   var inv_cdf1 = ak.negativeBinomialInvCDF(5);
   var inv_cdf2 = ak.negativeBinomialInvCDF(5, 0.25);

   var cf0 = ak.negativeBinomialCF();
   var cf1 = ak.negativeBinomialCF(5);
   var cf2 = ak.negativeBinomialCF(5, 0.25);

   var rnd0 = ak.negativeBinomialRnd();
   var rnd1 = ak.negativeBinomialRnd(5);
   var rnd2 = ak.negativeBinomialRnd(5, 0.25);
   var rnd3 = ak.negativeBinomialRnd(rnd);
   var rnd4 = ak.negativeBinomialRnd(5, rnd);
   var rnd5 = ak.negativeBinomialRnd(5, 0.25, rnd);
   var rnd6 = ak.negativeBinomialRnd(100, 0.25);

   var init = {
    name: 'init',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   init.add('pmf', function(){return pmf0.r()===1 && pmf0.p()===0.5
                                  && pmf1.r()===5 && pmf1.p()===0.5
                                  && pmf2.r()===5 && pmf2.p()===0.25;});

   init.add('cdf', function(){return cdf0.r()===1 && cdf0.p()===0.5
                                  && cdf1.r()===5 && cdf1.p()===0.5
                                  && cdf2.r()===5 && cdf2.p()===0.25;});

   init.add('cf', function(){return cf0.r()===1 && cf0.p()===0.5
                                 && cf1.r()===5 && cf1.p()===0.5
                                 && cf2.r()===5 && cf2.p()===0.25;});

   init.add('inv_cdf', function(){return inv_cdf0.r()===1 && inv_cdf0.p()===0.5
                                      && inv_cdf1.r()===5 && inv_cdf1.p()===0.5
                                      && inv_cdf2.r()===5 && inv_cdf2.p()===0.25;});

   init.add('rnd', function(){return rnd0.r()===1 && rnd0.p()===0.5  && rnd0.rnd()===Math.random
                                  && rnd1.r()===5 && rnd1.p()===0.5  && rnd1.rnd()===Math.random
                                  && rnd2.r()===5 && rnd2.p()===0.25 && rnd2.rnd()===Math.random
                                  && rnd3.r()===1 && rnd3.p()===0.5  && rnd3.rnd()===rnd
                                  && rnd4.r()===5 && rnd4.p()===0.5  && rnd4.rnd()===rnd
                                  && rnd5.r()===5 && rnd5.p()===0.25 && rnd5.rnd()===rnd;});
  
   var val = {
    name: 'val',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   function testPMF(pmf) {
    var r = pmf.r();
    var p = pmf.p();
    var k;
    
    for(k=0;k<=10;++k) {
     if(ak.diff(pmf(k),Math.pow(p, k)*Math.pow(1-p, r)*ak.gamma(k+r)/(ak.gamma(k+1)*ak.gamma(r)))>1e-10) return false;
    }
    return true;
   }
   
   val.add('pmf', function(){return testPMF(pmf0) && testPMF(pmf1) && testPMF(pmf2);});
  
   function testCDF(cdf, pmf) {
    var k;
  
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

   function eitx(pmf, t) {
    var r = pmf.r();
    var p = pmf.p();
    var m = r<=0 ? 0 : ak.floor(p*(r-1)/(1-p));
    var pm = pmf(m);
    var k = 0;
    var pk = pmf(k);
    var s = 0;

    do {
     s = ak.add(s, ak.complex(pk*Math.cos(t*k), pk*Math.sin(t*k)));
     pk = pmf(++k);
    }
    while(k<m || pk>pm*1e-10);

    return s;
   }

   function testcf(cf, pmf) {
    var t;
    for(t=-2;t<=2;t+=0.125) {
     if(!(ak.dist(cf(t), eitx(pmf, t))<1e-10)) return false;
    }
    return true;
   }

   val.add('cf', function(){return testcf(cf0, pmf0) && testcf(cf1, pmf1) && testcf(cf2, pmf2);});
   
   function testRnd(rnd, pmf) {
    var n = 100000;
    var h = ak.vector(1000, 0).toArray();
    var i, k;

    for(i=0;i<n;++i) {
     k = rnd();
     if(k<h.length) h[k] += 1;
    }
    return h.every(function(e, k){return ak.diff(e/n, pmf(k))<5e-3;});
   }

   val.add('rnd', function(){return testRnd(rnd0, pmf0) && testRnd(rnd1, pmf1) && testRnd(rnd2, pmf2)
                                 && testRnd(rnd3, pmf0) && testRnd(rnd4, pmf1) && testRnd(rnd5, pmf2)
                                 && testRnd(rnd6, pmf3);});
  
   negativeBinomial.add(init);
   negativeBinomial.add(val);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   negativeBinomial.add(load);
  }

  akTest.add(negativeBinomial);
 }

 ak.using(['Distribution/NegativeBinomialDistribution.js', 'Matrix/Vector.js'], define);
})();