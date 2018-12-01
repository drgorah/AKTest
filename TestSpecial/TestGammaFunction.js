"use strict";

(function() {
 function define() {
  function gammaIntegrand(s) {
   var logGamma = ak.logGamma(s);
   return function(t){return Math.exp((s-1)*Math.log(t) - t - logGamma);};
  }

  try {
   var gamma1  = ak.rombergIntegral(gammaIntegrand(1));
   var gamma2  = ak.rombergIntegral(gammaIntegrand(2));
   var gamma4  = ak.rombergIntegral(gammaIntegrand(4));
   var gamma45 = ak.rombergIntegral(gammaIntegrand(4.5));
  
   var gamma = {
    name: 'special.gammaFunction',
    body: [],
    add: function(t) {this.body.push(t);}
   };
  
   var real = {
    name: 'real',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };  
  
   real.add('-2.0', function(){return ak.gamma(-2.0)>-1e12;});  
   real.add('-1.5', function(){return ak.diff(ak.gamma(-1.5), 4*Math.sqrt(ak.PI)/3)<1e-10;});
   real.add('-1.0', function(){return ak.gamma(-1.0)<-1e12;});
   real.add('-0.5', function(){return ak.diff(ak.gamma(-0.5), -2*Math.sqrt(ak.PI))<1e-10;});
   real.add(' 0.0', function(){return ak.gamma(0.0)>1e12;});
   real.add('+0.5', function(){return ak.diff(ak.gamma(0.5), Math.sqrt(ak.PI))<1e-10;});
   real.add('+1.0', function(){return ak.diff(ak.gamma(1.0), 1.0)<1e-10;});
   real.add('+1.5', function(){return ak.diff(ak.gamma(1.5), Math.sqrt(ak.PI)/2)<1e-10;});
   real.add('+2.0', function(){return ak.diff(ak.gamma(2.0), 1.0)<1e-10;});
   real.add('+2.5', function(){return ak.diff(ak.gamma(2.5), 3*Math.sqrt(ak.PI)/4)<1e-10;});
   real.add('+3.0', function(){return ak.diff(ak.gamma(3.0), 2.0)<1e-10;});
   real.add('+4.0', function(){return ak.diff(ak.gamma(4.0), 6.0)<1e-10;});
  
   var complex = {
    name: 'complex',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   complex.add('-1.5', function(){return ak.diff(ak.gamma(ak.complex(-1.5)).re(), ak.complex(4*Math.sqrt(ak.PI)/3,0))<1e-10;});
   complex.add('+1.5', function(){return ak.diff(ak.gamma(ak.complex(+1.5)).re(), ak.complex(Math.sqrt(ak.PI)/2,0))<1e-10;});
   complex.add('0.5+0.5i', function(){return ak.diff(ak.gamma(ak.complex(0.5,0.5)), ak.complex
   (0.8181639995,-0.7633138287))<1e-10;});
   complex.add('0.5-0.5i', function(){return ak.diff(ak.gamma(ak.complex(0.5,-0.5)), ak.complex(0.8181639995,0.7633138287))<1e-10;});
   complex.add('5+3i', function(){return ak.diff(ak.gamma(ak.complex(5,3)), ak.complex
   (0.0160418827,-9.433293289))<1e-10;});
   complex.add('5-3i', function(){return ak.diff(ak.gamma(ak.complex(5,-3)), ak.complex(0.0160418827,9.433293289))<1e-10;});
   
   var log = {
    name: 'log',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };  
  
   function logFactorial(n) {
    var s = 0;
    var i;
    for(i=2;i<=n;++i) s += Math.log(i);
    return s;
   }
  
   log.add('-1.0', function(){return isNaN(ak.logGamma(-1));});
   log.add(' 0.0', function(){return ak.logGamma(0.0)===ak.INFINITY;});
   log.add('+0.5', function(){return ak.diff(Math.exp(ak.logGamma(+0.5)), Math.sqrt(ak.PI))<1e-10;});
   log.add('+1.0', function(){return ak.diff(Math.exp(ak.logGamma(+1.0)), 1.0)<1e-10;});
   log.add('+1.5', function(){return ak.diff(Math.exp(ak.logGamma(+1.5)), Math.sqrt(ak.PI)/2)<1e-10;});
   log.add('+2.0', function(){return ak.diff(Math.exp(ak.logGamma(+2.0)), 1.0)<1e-10;});
   log.add('+2.5', function(){return ak.diff(Math.exp(ak.logGamma(+2.5)), 3*Math.sqrt(ak.PI)/4)<1e-10;});
   log.add('+3.0', function(){return ak.diff(Math.exp(ak.logGamma(+3.0)), 2.0)<1e-10;});
   log.add('+4.0', function(){return ak.diff(Math.exp(ak.logGamma(+4.0)), 6.0)<1e-10;});
   log.add('1e3', function(){return ak.diff(ak.logGamma(1e3), logFactorial(1e3-1))<1e-10;});
   log.add('1e6', function(){return ak.diff(ak.logGamma(1e6), logFactorial(1e6-1))<1e-10;});
   
   var gammaP = {
    name: 'gammaP',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   
   gammaP.add('-1,-1', function(){return isNaN(ak.gammaP(-1,-1));});
   gammaP.add('-1,1', function(){return isNaN(ak.gammaP(-1,1));});
   gammaP.add('1,-1', function(){return isNaN(ak.gammaP(1,-1));});
   gammaP.add('1,0', function(){return ak.gammaP(1,0)===0;});  
   gammaP.add('1, inf', function(){return ak.gammaP(1,ak.INFINITY)===1;});
   gammaP.add('0,1', function(){return ak.gammaP(0,1)===1;});  
   gammaP.add('inf, 1', function(){return ak.gammaP(ak.INFINITY,1)===0;});
   gammaP.add('1,1', function(){return ak.diff(ak.gammaP(1,1), gamma1(1e-30,1))<1e-10;});
   gammaP.add('1,1.5', function(){return ak.diff(ak.gammaP(1,1.5), gamma1(1e-30,1.5))<1e-10;});
   gammaP.add('1,2', function(){return ak.diff(ak.gammaP(1,2), gamma1(1e-30,2))<1e-10;});
   gammaP.add('1,4', function(){return ak.diff(ak.gammaP(1,4), gamma1(1e-30,4))<1e-10;});
   gammaP.add('2,1', function(){return ak.diff(ak.gammaP(2,1), gamma2(1e-30,1))<1e-10;});
   gammaP.add('2,1.5', function(){return ak.diff(ak.gammaP(2,1.5), gamma2(1e-30,1.5))<1e-10;});
   gammaP.add('2,2', function(){return ak.diff(ak.gammaP(2,2), gamma2(1e-30,2))<1e-10;});
   gammaP.add('2,4', function(){return ak.diff(ak.gammaP(2,4), gamma2(1e-30,4))<1e-10;});
   gammaP.add('4,1', function(){return ak.diff(ak.gammaP(4,1), gamma4(1e-30,1))<1e-10;});
   gammaP.add('4,1.5', function(){return ak.diff(ak.gammaP(4,1.5), gamma4(1e-30,1.5))<1e-10;});
   gammaP.add('4,2', function(){return ak.diff(ak.gammaP(4,2), gamma4(1e-30,2))<1e-10;});
   gammaP.add('4,4', function(){return ak.diff(ak.gammaP(4,4), gamma4(1e-30,4))<1e-10;});  
   gammaP.add('4.5,1', function(){return ak.diff(ak.gammaP(4.5,1), gamma45(1e-30,1))<1e-10;});
   gammaP.add('4.5,1.5', function(){return ak.diff(ak.gammaP(4.5,1.5), gamma45(1e-30,1.5))<1e-10;});
   gammaP.add('4.5,2', function(){return ak.diff(ak.gammaP(4.5,2), gamma45(1e-30,2))<1e-10;});
   gammaP.add('4.5,4', function(){return ak.diff(ak.gammaP(4.5,4), gamma45(1e-30,4))<1e-10;});
   
   var gammaQ = {
    name: 'gammaQ',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   
   gammaQ.add(' -1,  -1', function(){return isNaN(ak.gammaQ(-1,-1));});
   gammaQ.add(' -1,  +1', function(){return isNaN(ak.gammaQ(-1,+1));});
   gammaQ.add(' +1,  -1', function(){return isNaN(ak.gammaQ(+1,-1));});
   gammaQ.add(' +1,   0', function(){return ak.gammaQ(1,0)===1;});
   gammaQ.add(' +1, inf', function(){return ak.gammaQ(1,ak.INFINITY)===0;});
   gammaQ.add('  0,  +1', function(){return ak.gammaQ(0,1)===0;});
   gammaQ.add('inf,  +1', function(){return ak.gammaQ(ak.INFINITY,1)===1;});
   gammaQ.add('1,1', function(){return ak.diff(ak.gammaQ(1,1), 1-gamma1(1e-30,1))<1e-10;});
   gammaQ.add('1,1.5', function(){return ak.diff(ak.gammaQ(1,1.5), 1-gamma1(1e-30,1.5))<1e-10;});
   gammaQ.add('1,2', function(){return ak.diff(ak.gammaQ(1,2), 1-gamma1(1e-30,2))<1e-10;});
   gammaQ.add('1,4', function(){return ak.diff(ak.gammaQ(1,4), 1-gamma1(1e-30,4))<1e-10;});
   gammaQ.add('2,1', function(){return ak.diff(ak.gammaQ(2,1), 1-gamma2(1e-30,1))<1e-10;});
   gammaQ.add('2,1.5', function(){return ak.diff(ak.gammaQ(2,1.5), 1-gamma2(1e-30,1.5))<1e-10;});
   gammaQ.add('2,2', function(){return ak.diff(ak.gammaQ(2,2), 1-gamma2(1e-30,2))<1e-10;});
   gammaQ.add('2,4', function(){return ak.diff(ak.gammaQ(2,4), 1-gamma2(1e-30,4))<1e-10;});
   gammaQ.add('4,1', function(){return ak.diff(ak.gammaQ(4,1), 1-gamma4(1e-30,1))<1e-10;});
   gammaQ.add('4,1.5', function(){return ak.diff(ak.gammaQ(4,1.5), 1-gamma4(1e-30,1.5))<1e-10;});
   gammaQ.add('4,2', function(){return ak.diff(ak.gammaQ(4,2), 1-gamma4(1e-30,2))<1e-10;});
   gammaQ.add('4,4', function(){return ak.diff(ak.gammaQ(4,4), 1-gamma4(1e-30,4))<1e-10;});  
   gammaQ.add('4.5,1', function(){return ak.diff(ak.gammaQ(4.5,1), 1-gamma45(1e-30,1))<1e-10;});
   gammaQ.add('4.5,1.5', function(){return ak.diff(ak.gammaQ(4.5,1.5), 1-gamma45(1e-30,1.5))<1e-10;});
   gammaQ.add('4.5,2', function(){return ak.diff(ak.gammaQ(4.5,2), 1-gamma45(1e-30,2))<1e-10;});
   gammaQ.add('4.5,4', function(){return ak.diff(ak.gammaQ(4.5,4), 1-gamma45(1e-30,4))<1e-10;});
     
   gamma.add(real);
   gamma.add(complex);
   gamma.add(log);
   gamma.add(gammaP);
   gamma.add(gammaQ);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   gamma.add(load);
  }
  
  akTest.add(gamma);
 }

 ak.using(['Special/GammaFunction.js', 'Calculus/RombergIntegral.js'], define);
})();