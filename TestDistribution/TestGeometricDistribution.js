"use strict";

(function() {
 function define() {
  var geometric = {
   name: 'distribution.geometricDistribution',
   body: [],
   add: function(t) {this.body.push(t);}
  };

  try {
   function rnd() {return Math.random();}

   var pmf0 = ak.geometricPMF();
   var pmf1 = ak.geometricPMF(0.25);
  
   var cdf0 = ak.geometricCDF();
   var cdf1 = ak.geometricCDF(0.25);

   var inv_cdf0 = ak.geometricInvCDF();
   var inv_cdf1 = ak.geometricInvCDF(0.25);

   var cf0 = ak.geometricCF();
   var cf1 = ak.geometricCF(0.25);  
  
   var rnd0 = ak.geometricRnd();
   var rnd1 = ak.geometricRnd(0.25);
   var rnd2 = ak.geometricRnd(rnd);
   var rnd3 = ak.geometricRnd(0.25, rnd);
  
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
                                  && rnd3.p()===0.25 && rnd3.rnd()===rnd});
  
   var val = {
    name: 'val',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   function testPMF(pmf) {
    var p = pmf.p();
    var k;

    for(k=0;k<=10;++k) {
     if(!(ak.diff(pmf(k),Math.pow(1-p, k)*p)<1e-10)) return false;
    }
    return true;
   }
   
   val.add('pmf', function(){return testPMF(pmf0) && testPMF(pmf1);});
  
   function testCDF(cdf, pmf) {
    var k, d;
  
    for(k=0;k<=10;++k) {
     if(!(ak.diff((cdf(k)-cdf(k-1)),pmf(k))<1e-10)) return false;
    }
    return true;
   }  
   
   val.add('cdf', function(){return testCDF(cdf0, pmf0) && testCDF(cdf1, pmf1);});
  
   function testInv(inv, cdf) {
    var c, k;

    for(c=0;c<1;c+=1/32) {
     for(k=0;cdf(k)<c;++k);
     if(inv(c)!==k) return false;
    }

    for(k=0;k!==10;++k) {
     if(inv(cdf(k))!==k) return false;
    }

    return true;
   }
  
   val.add('inv_cdf', function(){return testInv(inv_cdf0, cdf0) && testInv(inv_cdf1, cdf1);});

   val.add('cf', function(){return ak.dist(cf0(0), 1)<1e-10
                                && ak.dist(cf0(-1), ak.div(0.5, ak.sub(1, ak.mul(0.5, ak.exp(ak.mul(-1, ak.I))))))<1e-10
                                && ak.dist(cf0(2), ak.div(0.5, ak.sub(1, ak.mul(0.5, ak.exp(ak.mul(2, ak.I))))))<1e-10
                                && ak.dist(cf1(0), 1)<1e-10
                                && ak.dist(cf1(-1), ak.div(0.25, ak.sub(1, ak.mul(0.75, ak.exp(ak.mul(-1, ak.I))))))<1e-10
                                && ak.dist(cf1(2), ak.div(0.25, ak.sub(1, ak.mul(0.75, ak.exp(ak.mul(2, ak.I))))))<1e-10;});
   
   function testRnd(rnd, pmf) {
    var n = 100000;
    var h = ak.vector(17, 0).toArray();
    var i, k;

    for(i=0;i<n;++i) {
     k = rnd();
     if(k<h.length) h[k] += 1;
    }
    return h.every(function(e, k){return ak.diff(e/n, pmf(k))<5e-3;});
   }

   val.add('rnd', function(){return testRnd(rnd0, pmf0) && testRnd(rnd1, pmf1) && testRnd(rnd2, pmf0) && testRnd(rnd3, pmf1);});
  
   geometric.add(init);
   geometric.add(val);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   geometric.add(load);
  }

  akTest.add(geometric);
 }

 ak.using(['Distribution/GeometricDistribution.js', 'Matrix/Vector.js'], define);
})();