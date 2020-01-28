"use strict";

(function() {
 function define() {
  var multiUniform = {
   name: 'distribution.multiUniformDistribution',
   body: [],
   add: function(t) {this.body.push(t);}
  };

  try {
   var pdf0 = ak.multiUniformPDF();
   var pdf1 = ak.multiUniformPDF(2);
   var pdf2 = ak.multiUniformPDF(2, 2);
   var pdf3 = ak.multiUniformPDF(3, 1, 5);
   var pdf4 = ak.multiUniformPDF(3, 5, 1);
   var pdf5 = ak.multiUniformPDF(ak.vector([-1, 2]));
   var pdf6 = ak.multiUniformPDF(ak.vector([-1, 2]), ak.vector([3, -2]));
  
   var cdf0 = ak.multiUniformCDF();
   var cdf1 = ak.multiUniformCDF(2);
   var cdf2 = ak.multiUniformCDF(2, 2);
   var cdf3 = ak.multiUniformCDF(3, 1, 5);
   var cdf4 = ak.multiUniformCDF(3, 5, 1);
   var cdf5 = ak.multiUniformCDF(ak.vector([-1, 2]));
   var cdf6 = ak.multiUniformCDF(ak.vector([-1, 2]), ak.vector([3, -2]));

   var compCDF0 = ak.multiUniformCompCDF();
   var compCDF1 = ak.multiUniformCompCDF(2);
   var compCDF2 = ak.multiUniformCompCDF(2, 2);
   var compCDF3 = ak.multiUniformCompCDF(3, 1, 5);
   var compCDF4 = ak.multiUniformCompCDF(3, 5, 1);
   var compCDF5 = ak.multiUniformCompCDF(ak.vector([-1, 2]));
   var compCDF6 = ak.multiUniformCompCDF(ak.vector([-1, 2]), ak.vector([3, -2]));
  
   var cf0 = ak.multiUniformCF();
   var cf1 = ak.multiUniformCF(2);
   var cf2 = ak.multiUniformCF(2, 2);
   var cf3 = ak.multiUniformCF(3, 1, 5);
   var cf4 = ak.multiUniformCF(3, 5, 1);
   var cf5 = ak.multiUniformCF(ak.vector([-1, 2]));
   var cf6 = ak.multiUniformCF(ak.vector([-1, 2]), ak.vector([3, -2]));
  
   var map0 = ak.multiUniformMap();
   var map1 = ak.multiUniformMap(2);
   var map2 = ak.multiUniformMap(2, 2);
   var map3 = ak.multiUniformMap(3, 1, 5);
   var map4 = ak.multiUniformMap(3, 5, 1);
   var map5 = ak.multiUniformMap(ak.vector([-1, 2]));
   var map6 = ak.multiUniformMap(ak.vector([-1, 2]), ak.vector([3, -2]));
  
   var rnd0 = ak.multiUniformRnd();
   var rnd1 = ak.multiUniformRnd(2);
   var rnd2 = ak.multiUniformRnd(2, 2);
   var rnd3 = ak.multiUniformRnd(3, 1, 5);
   var rnd4 = ak.multiUniformRnd(3, 5, 1);
   var rnd5 = ak.multiUniformRnd(ak.vector([-1, 2]));
   var rnd6 = ak.multiUniformRnd(ak.vector([-1, 2]), ak.vector([3, -2]), ak.mtRnd());
  
   var init = {
    name: 'init',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   init.add('pdf', function(){return ak.eq(pdf0.a(), ak.vector([0])) && ak.eq(pdf0.b(), ak.vector([1]))
                                  && ak.eq(pdf1.a(), ak.vector([0,0])) && ak.eq(pdf1.b(), ak.vector([1,1]))
                                  && ak.eq(pdf2.a(), ak.vector([0,0])) && ak.eq(pdf2.b(), ak.vector([2,2]))
                                  && ak.eq(pdf3.a(), ak.vector([1,1,1])) && ak.eq(pdf3.b(), ak.vector([5,5,5]))
                                  && ak.eq(pdf4.a(), ak.vector([1,1,1])) && ak.eq(pdf4.b(), ak.vector([5,5,5]))
                                  && ak.eq(pdf5.a(), ak.vector([-1,0])) && ak.eq(pdf5.b(), ak.vector([0,2]))
                                  && ak.eq(pdf6.a(), ak.vector([-1,-2])) && ak.eq(pdf6.b(), ak.vector([3,2]));});
  
   init.add('cdf', function(){return ak.eq(cdf0.a(), ak.vector([0])) && ak.eq(cdf0.b(), ak.vector([1]))
                                  && ak.eq(cdf1.a(), ak.vector([0,0])) && ak.eq(cdf1.b(), ak.vector([1,1]))
                                  && ak.eq(cdf2.a(), ak.vector([0,0])) && ak.eq(cdf2.b(), ak.vector([2,2]))
                                  && ak.eq(cdf3.a(), ak.vector([1,1,1])) && ak.eq(cdf3.b(), ak.vector([5,5,5]))
                                  && ak.eq(cdf4.a(), ak.vector([1,1,1])) && ak.eq(cdf4.b(), ak.vector([5,5,5]))
                                  && ak.eq(cdf5.a(), ak.vector([-1,0])) && ak.eq(cdf5.b(), ak.vector([0,2]))
                                  && ak.eq(cdf6.a(), ak.vector([-1,-2])) && ak.eq(cdf6.b(), ak.vector([3,2]));});

   init.add('compCDF', function(){return ak.eq(compCDF0.a(), ak.vector([0])) && ak.eq(compCDF0.b(), ak.vector([1]))
                                      && ak.eq(compCDF1.a(), ak.vector([0,0])) && ak.eq(compCDF1.b(), ak.vector([1,1]))
                                      && ak.eq(compCDF2.a(), ak.vector([0,0])) && ak.eq(compCDF2.b(), ak.vector([2,2]))
                                      && ak.eq(compCDF3.a(), ak.vector([1,1,1])) && ak.eq(compCDF3.b(), ak.vector([5,5,5]))
                                      && ak.eq(compCDF4.a(), ak.vector([1,1,1])) && ak.eq(compCDF4.b(), ak.vector([5,5,5]))
                                      && ak.eq(compCDF5.a(), ak.vector([-1,0])) && ak.eq(compCDF5.b(), ak.vector([0,2]))
                                      && ak.eq(compCDF6.a(), ak.vector([-1,-2])) && ak.eq(compCDF6.b(), ak.vector([3,2]));});
  
   init.add('cf', function(){return ak.eq(cf0.a(), ak.vector([0])) && ak.eq(cf0.b(), ak.vector([1]))
                                 && ak.eq(cf1.a(), ak.vector([0,0])) && ak.eq(cf1.b(), ak.vector([1,1]))
                                 && ak.eq(cf2.a(), ak.vector([0,0])) && ak.eq(cf2.b(), ak.vector([2,2]))
                                 && ak.eq(cf3.a(), ak.vector([1,1,1])) && ak.eq(cf3.b(), ak.vector([5,5,5]))
                                 && ak.eq(cf4.a(), ak.vector([1,1,1])) && ak.eq(cf4.b(), ak.vector([5,5,5]))
                                 && ak.eq(cf5.a(), ak.vector([-1,0])) && ak.eq(cf5.b(), ak.vector([0,2]))
                                 && ak.eq(cf6.a(), ak.vector([-1,-2])) && ak.eq(cf6.b(), ak.vector([3,2]));});
  
   init.add('map', function(){return ak.eq(map0.a(), ak.vector([0])) && ak.eq(map0.b(), ak.vector([1]))
                                  && ak.eq(map1.a(), ak.vector([0,0])) && ak.eq(map1.b(), ak.vector([1,1]))
                                  && ak.eq(map2.a(), ak.vector([0,0])) && ak.eq(map2.b(), ak.vector([2,2]))
                                  && ak.eq(map3.a(), ak.vector([1,1,1])) && ak.eq(map3.b(), ak.vector([5,5,5]))
                                  && ak.eq(map4.a(), ak.vector([1,1,1])) && ak.eq(map4.b(), ak.vector([5,5,5]))
                                  && ak.eq(map5.a(), ak.vector([-1,0])) && ak.eq(map5.b(), ak.vector([0,2]))
                                  && ak.eq(map6.a(), ak.vector([-1,-2])) && ak.eq(map6.b(), ak.vector([3,2]));});
  
   init.add('rnd', function(){return ak.eq(rnd0.a(), ak.vector([0])) && ak.eq(rnd0.b(), ak.vector([1]))
                                  && ak.eq(rnd1.a(), ak.vector([0,0])) && ak.eq(rnd1.b(), ak.vector([1,1]))
                                  && ak.eq(rnd2.a(), ak.vector([0,0])) && ak.eq(rnd2.b(), ak.vector([2,2]))
                                  && ak.eq(rnd3.a(), ak.vector([1,1,1])) && ak.eq(rnd3.b(), ak.vector([5,5,5]))
                                  && ak.eq(rnd4.a(), ak.vector([1,1,1])) && ak.eq(rnd4.b(), ak.vector([5,5,5]))
                                  && ak.eq(rnd5.a(), ak.vector([-1,0])) && ak.eq(rnd5.b(), ak.vector([0,2]))
                                  && ak.eq(rnd6.a(), ak.vector([-1,-2])) && ak.eq(rnd6.b(), ak.vector([3,2])) && rnd6.rnd()!==Math.random;});
  
   function comparePDF(mpdf) {
    var d = mpdf.a().dims();
    var rnd = ak.multiUniformRnd(mpdf.a(), mpdf.b());
    var n = 100;
    var x, p, i, pdf;
  
    while(n--) {
     x = rnd();
     p = 1;
  
     for(i=0;i<d;++i) {
      pdf = ak.uniformPDF(mpdf.a().at(i), mpdf.b().at(i));
      p *= pdf(x.at(i));
     }
     if(ak.diff(p, mpdf(x)) > 1e-10) return false;
    }
    return true;
   }
  
   function compareCDF(mcdf) {
    var d = mcdf.a().dims();
    var rnd = ak.multiUniformRnd(mcdf.a(), mcdf.b());
    var n = 100;
    var x, p, i, cdf;
  
    while(n--) {
     x = rnd();
     p = 1;
  
     for(i=0;i<d;++i) {
      cdf = ak.uniformCDF(mcdf.a().at(i), mcdf.b().at(i));
      p *= cdf(x.at(i));
     }
     if(ak.diff(p, mcdf(x)) > 1e-10) return false;
    }
    return true;
   }

   function compareCompCDF(mccdf) {
    var d = mccdf.a().dims();
    var rnd = ak.multiUniformRnd(mccdf.a(), mccdf.b());
    var n = 100;
    var x, p, i, cdf;
  
    while(n--) {
     x = rnd();
     p = 1;
  
     for(i=0;i<d;++i) {
      cdf = ak.uniformCDF(mccdf.a().at(i), mccdf.b().at(i));
      p *= 1.0-cdf(x.at(i));
     }
     if(ak.diff(p, mccdf(x)) > 1e-10) return false;
    }
    return true;
   }
  
   function compareCF(mcf) {
    var d = mcf.a().dims();
    var rnd = ak.multiUniformRnd(mcf.a(), mcf.b());
    var n = 100;
    var x, z, i, cf;
  
    while(n--) {
     x = rnd();
     z = ak.complex(1);
  
     for(i=0;i<d;++i) {
      cf = ak.uniformCF(mcf.a().at(i), mcf.b().at(i));
      z = ak.mul(z, cf(x.at(i)));
     }
     if(ak.diff(z, mcf(x)) > 1e-10) return false;
    }
    return true;
   }
  
   function compareMap(map) {
    var d = map.a().dims();
    var rnd = ak.multiUniformRnd(d);
    var n = 100;
    var x, z, i, cdf;
  
    while(n--) {
     x = rnd();
     z = map(x);
  
     for(i=0;i<d;++i) {
      cdf = ak.uniformCDF(map.a().at(i), map.b().at(i));
      if(ak.diff(x.at(i), cdf(z.at(i))) > 1e-10) return false;
     }
    }
    return true;
   }
  
   function testRnd(rnd) {
    var n = 100000;
    var w = 1/n;
    var d = rnd.a().dims();
    var s1 = new Array(d);
    var s2 = new Array(d);
    var x, i, a, b, e1, e2;
  
    for(i=0;i<d;++i) {
     s1[i] = 0;
     s2[i] = 0;
    }
  
    while(n-->0) {
     x = rnd();
     for(i=0;i<d;++i) {
      s1[i] += x.at(i);
      s2[i] += x.at(i)*x.at(i);
     }
    }
  
    for(i=0;i<d;++i) {
     s1[i] *= w;
     s2[i] *= w;
     s2[i] -= s1[i]*s1[i];
  
     a = rnd.a().at(i);
     b = rnd.b().at(i)
     e1 = (a+b)/2;
     e2 = (b-a)*(b-a)/12;
  
     if(ak.diff(s1[i], e1)>1e-2) return false;
     if(ak.diff(s2[i], e2)>1e-2) return false;
    }
    return true;
   }
  
   var val = {
    name: 'val',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   val.add('pdf', function(){return comparePDF(pdf0) && comparePDF(pdf1) && comparePDF(pdf2) && comparePDF(pdf3) && comparePDF(pdf4) && comparePDF(pdf5) && comparePDF(pdf6);});
   val.add('cdf', function(){return compareCDF(cdf0) && compareCDF(cdf1) && compareCDF(cdf2) && compareCDF(cdf3) && compareCDF(cdf4) && compareCDF(cdf5) && compareCDF(cdf6);});
   val.add('compCDF', function(){return compareCompCDF(compCDF0) && compareCompCDF(compCDF1) && compareCompCDF(compCDF2) && compareCompCDF(compCDF3) && compareCompCDF(compCDF4) && compareCompCDF(compCDF5) && compareCompCDF(compCDF6);});
   val.add('cf', function(){return compareCF(cf0) && compareCF(cf1) && compareCF(cf2) && compareCF(cf3) && compareCF(cf4) && compareCF(cf5) && compareCF(cf6);});
   val.add('map', function(){return compareMap(map0) && compareMap(map1) && compareMap(map2) && compareMap(map3) && compareMap(map4) && compareMap(map5) && compareMap(map6);});
   val.add('rnd', function(){return testRnd(rnd0) && testRnd(rnd1) && testRnd(rnd2) && testRnd(rnd3) && testRnd(rnd4) && testRnd(rnd5) && testRnd(rnd6);});
  
   multiUniform.add(init);
   multiUniform.add(val);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   multiUniform.add(load);
  }

  akTest.add(multiUniform);
 }

 ak.using(['Distribution/MultiUniformDistribution.js', 'Distribution/UniformDistribution.js', 'Random/MTRnd.js'], define);
})();