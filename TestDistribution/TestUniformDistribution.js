"use strict";

(function() {
 function define() {
  var uniform = {
   name: 'distribution.uniformDistribution',
   body: [],
   add: function(t) {this.body.push(t);}
  };

  try {
   function rnd() {return Math.random();}

   var pdf0 = ak.uniformPDF();
   var pdf1 = ak.uniformPDF(2);
   var pdf2 = ak.uniformPDF(-2);
   var pdf3 = ak.uniformPDF(2, 3);
   var pdf4 = ak.uniformPDF(5, 4);
  
   var cdf0 = ak.uniformCDF();
   var cdf1 = ak.uniformCDF(2);
   var cdf2 = ak.uniformCDF(-2);
   var cdf3 = ak.uniformCDF(2, 3);
   var cdf4 = ak.uniformCDF(5, 4);
  
   var inv_cdf0 = ak.uniformInvCDF();
   var inv_cdf1 = ak.uniformInvCDF(2);
   var inv_cdf2 = ak.uniformInvCDF(-2);
   var inv_cdf3 = ak.uniformInvCDF(2, 3);
   var inv_cdf4 = ak.uniformInvCDF(5, 4);
  
   var cf0 = ak.uniformCF();
   var cf1 = ak.uniformCF(2);
   var cf2 = ak.uniformCF(-2);
   var cf3 = ak.uniformCF(2, 3);
   var cf4 = ak.uniformCF(5, 4);
  
   var rnd0 = ak.uniformRnd();
   var rnd1 = ak.uniformRnd(2);
   var rnd2 = ak.uniformRnd(-2);
   var rnd3 = ak.uniformRnd(2, 3, rnd);
   var rnd4 = ak.uniformRnd(5, 4);
  
   var init = {
    name: 'init',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   init.add('pdf', function(){return pdf0.a()===0 && pdf0.b()===1 && pdf1.a()===0 && pdf1.b()===2 && pdf2.a()===-2 && pdf2.b()===0 && pdf3.a()===2 && pdf3.b()===3 && pdf4.a()===4 && pdf4.b()===5;});
   init.add('cdf', function(){return cdf0.a()===0 && cdf0.b()===1 && cdf1.a()===0 && cdf1.b()===2 && cdf2.a()===-2 && cdf2.b()===0 && cdf3.a()===2 && cdf3.b()===3 && cdf4.a()===4 && cdf4.b()===5;});
   init.add('inv_cdf', function(){return inv_cdf0.a()===0 && inv_cdf0.b()===1 && inv_cdf1.a()===0 && inv_cdf1.b()===2 && inv_cdf2.a()===-2 && inv_cdf2.b()===0 && inv_cdf3.a()===2 && inv_cdf3.b()===3 && inv_cdf4.a()===4 && inv_cdf4.b()===5;});
   init.add('cf', function(){return cf0.a()===0 && cf0.b()===1 && cf1.a()===0 && cf1.b()===2 && cf2.a()===-2 && cf2.b()===0 && cf3.a()===2 && cf3.b()===3 && cf4.a()===4 && cf4.b()===5;});
   init.add('rnd', function(){return rnd0.a()===0  && rnd0.b()===1 && rnd0.rnd()===Math.random
                                  && rnd1.a()===0  && rnd1.b()===2 && rnd1.rnd()===Math.random
                                  && rnd2.a()===-2 && rnd2.b()===0 && rnd2.rnd()===Math.random
                                  && rnd3.a()===2  && rnd3.b()===3 && rnd3.rnd()===rnd
                                  && rnd4.a()===4  && rnd4.b()===5 && rnd4.rnd()===Math.random;});
  
   var val = {
    name: 'val',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   val.add('pdf', function(){return pdf0(-1)===0 && pdf0(2)===0 && pdf0(0.5)===1 && pdf1(-1)===0 && pdf1(3)===0 && pdf1(1)===0.5;});
   val.add('cdf', function(){return cdf0(-1)===0 && cdf0(2)===1 && cdf0(0.5)===0.5 && cdf1(-1)===0 && cdf1(3)===1 && cdf1(1)===0.5;});
   val.add('inv_cdf', function(){return inv_cdf0(0)===0 && inv_cdf0(1)===1 && inv_cdf0(0.5)===0.5 && inv_cdf1(0)===0 && inv_cdf1(1)===2 && inv_cdf1(0.5)===1;});
   val.add('cf', function(){return ak.eq(cf3(0), 1) && ak.dist(cf3(-1), ak.div(ak.sub(ak.exp(ak.complex(0,-3)), ak.exp(ak.complex(0,-2))), ak.complex(0,-1)))<1e-10 && ak.dist(cf3(2), ak.div(ak.sub(ak.exp(ak.complex(0,6)), ak.exp(ak.complex(0,4))), ak.complex(0,2)))<1e-10;});
  
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
  
   val.add('rnd', function(){return testRnd(rnd0, cdf0) && testRnd(rnd3, cdf3);});
  
   uniform.add(init);
   uniform.add(val);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   uniform.add(load);
  }

  akTest.add(uniform);
 }

 ak.using('Distribution/UniformDistribution.js', define);
})();