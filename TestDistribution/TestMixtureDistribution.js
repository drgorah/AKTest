"use strict";

(function() {
 function define() {
  var mixture = {
   name: 'distribution.mixtureDistribution',
   body: [],
   add: function(t) {this.body.push(t);}
  };

  try {
   function rnd() {return Math.random();}

   var normPDF0 = ak.normalPDF(0, 1);
   var normPDF1 = ak.normalPDF(1, 0.5);
   var mixPDF = ak.mixturePDF([normPDF0, normPDF1], [1, 2]);

   var normCDF0 = ak.normalCDF(0, 1);
   var normCDF1 = ak.normalCDF(1, 0.5);
   var mixCDF = ak.mixtureCDF([normCDF0, normCDF1], [1, 2]);

   var mixInvCDF = ak.mixtureInvCDF([normCDF0, normCDF1], [1, 2]);

   var normCF0 = ak.normalCF(0, 1);
   var normCF1 = ak.normalCF(1, 0.5);
   var mixCF = ak.mixtureCF([normCF0, normCF1], [1, 2]);

   var normRnd0 = ak.normalRnd(0, 1);
   var normRnd1 = ak.normalRnd(1, 0.5);
   var mixRnd = ak.mixtureRnd([normRnd0, normRnd1], [1, 2], rnd);

   var binomPMF0 = ak.binomialPMF(5, 0.5);
   var binomPMF1 = ak.binomialPMF(7, 0.25);
   var mixPMF = ak.mixturePMF([binomPMF0, binomPMF1], [1, 2]);

   var s00 = 1;
   var s01 = 0.5;
   var r0 = 0.5;
   var s0 = ak.matrix([[s00*s00, r0*s00*s01],[r0*s00*s01, s01*s01]]);
   var m0 = ak.vector([-1, 0.5]);

   var s10 = 0.25;
   var s11 = 0.75;
   var r1 = -0.5;
   var s1 = ak.matrix([[s10*s10, r1*s10*s11],[r1*s10*s11, s11*s11]]);
   var m1 = ak.vector([0.25, -0.75]);

   var multiNormPDF0 = ak.multiNormalPDF(m0, s0);
   var multiNormPDF1 = ak.multiNormalPDF(m1, s1);
   var multiMixPDF = ak.mixturePDF([multiNormPDF0, multiNormPDF1], [1, 2]);

   var multiNormCDF0 = ak.multiNormalCDF(m0, s0);
   var multiNormCDF1 = ak.multiNormalCDF(m1, s1);
   var multiMixCDF = ak.mixtureCDF([multiNormCDF0, multiNormCDF1], [1, 2]);

   var multiNormCompCDF0 = ak.multiNormalCompCDF(m0, s0);
   var multiNormCompCDF1 = ak.multiNormalCompCDF(m1, s1);
   var multiMixCompCDF = ak.mixtureCompCDF([multiNormCompCDF0, multiNormCompCDF1], [1, 2]);

   var multiNormMap0 = ak.multiNormalMap(m0, s0);
   var multiNormMap1 = ak.multiNormalMap(m1, s1);
   var multiMixMap = ak.mixtureMap([multiNormMap0, multiNormMap1], [1, 2]);

   var multiNormCF0 = ak.multiNormalCF(m0, s0);
   var multiNormCF1 = ak.multiNormalCF(m1, s1);
   var multiMixCF = ak.mixtureCF([multiNormCF0, multiNormCF1], [1, 2]);

   var multiNormRnd0 = ak.multiNormalRnd(m0, s0);
   var multiNormRnd1 = ak.multiNormalRnd(m1, s1);
   var multiMixRnd = ak.mixtureRnd([multiNormRnd0, multiNormRnd1], [1, 2]);

   var init = {
    name: 'init',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   init.add('uni pdf', function(){return mixPDF.pdfs()[0]===normPDF0 && mixPDF.pdfs()[1]===normPDF1 && mixPDF.weights()[0]===1 && mixPDF.weights()[1]===2;});
   init.add('uni cdf', function(){return mixCDF.cdfs()[0]===normCDF0 && mixCDF.cdfs()[1]===normCDF1 && mixCDF.weights()[0]===1 && mixCDF.weights()[1]===2;});
   init.add('uni inv cdf', function(){return mixInvCDF.cdfs()[0]===normCDF0 && mixInvCDF.cdfs()[1]===normCDF1 && mixInvCDF.weights()[0]===1 && mixInvCDF.weights()[1]===2;});
   init.add('uni cf', function(){return mixCF.cfs()[0]===normCF0 && mixCF.cfs()[1]===normCF1 && mixCF.weights()[0]===1 && mixCF.weights()[1]===2;});
   init.add('uni rnd', function(){return mixRnd.rnds()[0]===normRnd0 && mixRnd.rnds()[1]===normRnd1 && mixRnd.weights()[0]===1 && mixRnd.weights()[1]===2 && mixRnd.rnd()===rnd;});
   init.add('uni pmf', function(){return mixPMF.pmfs()[0]===binomPMF0 && mixPMF.pmfs()[1]===binomPMF1 && mixPMF.weights()[0]===1 && mixPMF.weights()[1]===2;});

   init.add('multi pdf', function(){return multiMixPDF.pdfs()[0]===multiNormPDF0 && multiMixPDF.pdfs()[1]===multiNormPDF1 && multiMixPDF.weights()[0]===1 && multiMixPDF.weights()[1]===2;});
   init.add('multi cdf', function(){return multiMixCDF.cdfs()[0]===multiNormCDF0 && multiMixCDF.cdfs()[1]===multiNormCDF1 && multiMixCDF.weights()[0]===1 && multiMixCDF.weights()[1]===2;});
   init.add('multi comp cdf', function(){return multiMixCompCDF.compCDFs()[0]===multiNormCompCDF0 && multiMixCompCDF.compCDFs()[1]===multiNormCompCDF1 && multiMixCompCDF.weights()[0]===1 && multiMixCompCDF.weights()[1]===2;});
   init.add('multi map', function(){return multiMixMap.maps()[0]===multiNormMap0 && multiMixMap.maps()[1]===multiNormMap1 && multiMixMap.weights()[0]===1 && multiMixMap.weights()[1]===2;});
   init.add('multi cf', function(){return multiMixCF.cfs()[0]===multiNormCF0 && multiMixCF.cfs()[1]===multiNormCF1 && multiMixCF.weights()[0]===1 && multiMixCF.weights()[1]===2;});
   init.add('multi rnd', function(){return multiMixRnd.rnds()[0]===multiNormRnd0 && multiMixRnd.rnds()[1]===multiNormRnd1 && multiMixRnd.weights()[0]===1 && multiMixRnd.weights()[1]===2 && multiMixRnd.rnd()===Math.random;});

   function bad() {
    try {ak.mixturePDF(); return false;}
    catch(e){}

    try {ak.mixturePDF([normPDF0, normPDF1]); return false;}
    catch(e){}

    try {ak.mixturePDF(['a', normPDF1], [1, 2]); return false;}
    catch(e){}

    try {ak.mixturePDF([normPDF0, 'a'], [1, 2]); return false;}
    catch(e){}

    try {ak.mixturePDF([normPDF0, normPDF1], ['a', 2]); return false;}
    catch(e){}

    try {ak.mixturePDF([normPDF0, normPDF1], [-1, 2]); return false;}
    catch(e){}

    try {ak.mixturePDF([normPDF0, normPDF1], [1, 'a']); return false;}
    catch(e){}

    try {ak.mixturePDF([normPDF0, normPDF1], [1, -2]); return false;}
    catch(e){}

    try {ak.mixturePDF([normPDF0, normPDF1], [1, ak.INFINITY]); return false;}
    catch(e){}

    try {ak.mixtureInvCdf([normCDF0, normCDF1], [1, 1], 'a'); return false;}
    catch(e){}

    try {ak.mixtureRnd([normRnd0, normRnd1], [1, 2], 'a'); return false;}
    catch(e){}

    return true;
   }

   init.add('invalid arguments', bad);

   var val = {
    name: 'val',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   function uniPDF() {
    var n = 100;
    var i, x, p0, p1;

    for(i=0;i<n;++i) {
     x = mixRnd();
     p0 = mixPDF(x);
     p1 = (normPDF0(x) + 2*normPDF1(x))/3;
     if(ak.diff(p0, p1)>1e-12) return false;
    }
    return true;
   }

   val.add('uni pdf', uniPDF);

   function uniCDF() {
    var n = 100;
    var i, x, c0, c1;

    for(i=0;i<n;++i) {
     x = mixRnd();
     c0 = mixCDF(x);
     c1 = (normCDF0(x) + 2*normCDF1(x))/3;
     if(ak.diff(c0, c1)>1e-12) return false;
    }
    return true;
   }

   val.add('uni cdf', uniCDF);

   function uniInvCDF() {
    var n = 100;
    var i, c0, c1;

    for(i=0;i<n;++i) {
     c0 = Math.random();
     c1 = mixCDF(mixInvCDF(c0));
     if(ak.diff(c0, c1)>1e-10) return false;
    }
    return true;
   }

   val.add('uni inv cdf', uniInvCDF);

   function uniCF() {
    var n = 100;
    var i, x, z0, z1;

    for(i=0;i<n;++i) {
     x = mixRnd();
     z0 = mixCF(x);
     z1 = (normCF0(x) + 2*normCF1(x))/3;
     if(ak.diff(z0, z1)>1e-12) return false;
    }
    return true;
   }

   val.add('uni cf', uniCF);

   function uniRnd() {
    var n = 1000000;
    var sx1 = 0;
    var sx2 = 0;
    var i, x, mu, sigma2;

    for(i=0;i<n;++i) {
     x = mixRnd();
     sx1 += x;
     sx2 += x*x;
    }
    sx1 /= n;
    sx2 /= n;
    sx2 -= sx1*sx1;

    mu = (normRnd0.mu() + 2*normRnd1.mu())/3;
    sigma2 = (normRnd0.sigma()*normRnd0.sigma()+normRnd0.mu()*normRnd0.mu() + 2*normRnd1.sigma()*normRnd1.sigma()+2*normRnd1.mu()*normRnd1.mu())/3 - mu*mu;

    return ak.diff(sx1, mu)<1e-3 && ak.diff(sx2, sigma2)<5e-3;
   }

   val.add('uni rnd', uniRnd);

   function uniPMF() {
    var k, p0, p1;
    for(k=-1;k<10;k+=0.5) {
     p0 = mixPMF(k);
     p1 = (binomPMF0(k) + 2*binomPMF1(k))/3;
     if(ak.diff(p0, p1)>1e-12) return false;
    }
    return true;
   }

   val.add('uni pmf', uniPMF);

   function multiPDF() {
    var n = 100;
    var i, x, p0, p1;

    for(i=0;i<n;++i) {
     x = multiMixRnd();
     p0 = multiMixPDF(x);
     p1 = (multiNormPDF0(x) + 2*multiNormPDF1(x))/3;
     if(ak.diff(p0, p1)>1e-12) return false;
    }
    return true;
   }

   val.add('multi pdf', multiPDF);

   function multiCDF() {
    var n = 100;
    var i, x, c0, c1;

    for(i=0;i<n;++i) {
     x = multiMixRnd();
     c0 = multiMixCDF(x);
     c1 = (multiNormCDF0(x) + 2*multiNormCDF1(x))/3;
     if(ak.diff(c0, c1)>1e-12) return false;
    }
    return true;
   }

   val.add('multi cdf', multiCDF);

   function multiCompCDF() {
    var n = 100;
    var i, x, c0, c1;

    for(i=0;i<n;++i) {
     x = multiMixRnd();
     c0 = multiMixCompCDF(x);
     c1 = (multiNormCompCDF0(x) + 2*multiNormCompCDF1(x))/3;
     if(ak.diff(c0, c1)>1e-12) return false;
    }
    return true;
   }

   val.add('multi comp cdf', multiCompCDF);

   function multiMap() {
    var n = 100;
    var rnd = ak.multiUniformRnd(2);
    var i, u, v, x0, x1;

    for(i=0;i<n;++i) {
     u = Math.random();
     v = rnd();
     x0 = multiMixMap(u, v);
     x1 = u*3<1 ? multiNormMap0(v) : multiNormMap1(v);
     if(ak.diff(x0, x1)>1e-12) return false;
    }
    return true;
   }

   val.add('multi map', multiMap);

   function multiCF() {
    var n = 100;
    var i, x, z0, z1;

    for(i=0;i<n;++i) {
     x = multiMixRnd();
     z0 = multiMixCF(x);
     z1 = (multiNormCF0(x) + 2*multiNormCF1(x))/3;
     if(ak.diff(z0, z1)>1e-12) return false;
    }
    return true;
   }

   val.add('multi cf', multiCDF);

   function multiRnd() {
    var n = 1000000;
    var sx1 = 0;
    var sx2 = 0;
    var sy1 = 0;
    var sy2 = 0;
    var sxy = 0;
    var i, x, mux, muy, sigmaxx, sigmayy, sigmaxy;

    for(i=0;i<n;++i) {
     x = multiMixRnd();
     sx1 += x.at(0);
     sx2 += x.at(0)*x.at(0);
     sy1 += x.at(1);
     sy2 += x.at(1)*x.at(1);
     sxy += x.at(0)*x.at(1);
    }
    sx1 /= n;
    sx2 /= n;
    sy1 /= n;
    sy2 /= n;
    sxy /= n;
    sx2 -= sx1*sx1;
    sy2 -= sy1*sy1;
    sxy -= sx1*sy1;

    mux = (m0.at(0) + 2*m1.at(0))/3;
    muy = (m0.at(1) + 2*m1.at(1))/3;

    sigmaxx = (s0.at(0,0)+m0.at(0)*m0.at(0)+2*s1.at(0,0)+2*m1.at(0)*m1.at(0))/3 - mux*mux;
    sigmayy = (s0.at(1,1)+m0.at(1)*m0.at(1)+2*s1.at(1,1)+2*m1.at(1)*m1.at(1))/3 - muy*muy;
    sigmaxy = (s0.at(0,1)+m0.at(0)*m0.at(1)+2*s1.at(0,1)+2*m1.at(0)*m1.at(1))/3 - mux*muy;

    return ak.diff(sx1, mux)<1e-3 && ak.diff(sy1, muy)<1e-3
        && ak.diff(sx2, sigmaxx)<5e-3 && ak.diff(sy2, sigmayy)<5e-3 && ak.diff(sxy, sigmaxy)<5e-3;
   }

   val.add('multi rnd', multiRnd);
  
   mixture.add(init);
   mixture.add(val);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   mixture.add(load);
  }

  akTest.add(mixture);
 }

 ak.using(['Distribution/MixtureDistribution.js', 'Distribution/NormalDistribution.js', 'Distribution/BinomialDistribution.js', 'Distribution/MultiNormalDistribution.js', 'Distribution/MultiUniformDistribution.js'], define);
})();