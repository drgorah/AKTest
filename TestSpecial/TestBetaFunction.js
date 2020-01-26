"use strict";

(function() {
 function define() {
  try {
   function betaIntegrand(a, b) {
    return function(x) {return Math.pow(x, a-1)*Math.pow(1-x, b-1);};
   }

   function betaIntegral(a, b) {
    return ak.simpsonIntegral(betaIntegrand(a, b), 1e-5);
   }

   var beta = {
    name: 'special.betaFunction',
    body: [],
    add: function(t) {this.body.push(t);}
   };
  
   var real = {
    name: 'real',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };  

   real.add('-0.5, -0.75', function(){return ak.diff(ak.beta(-0.5, -0.75), 4.37009592382020)<1.0e-10;});
   real.add('-0.5,  0.75', function(){return ak.diff(ak.beta(-0.5, 0.75), -1.19814023473559)<1.0e-10;});
   real.add('-0.75,  0.5', function(){return ak.diff(ak.beta(-0.75, 0.5),  1.74803836952808)<1.0e-10;});

   real.add('0.5, 0.5', function(){return ak.diff(ak.beta(0.5, 0.5), betaIntegral(0.5, 0.5)(1e-10, 1-1e-10))<1.0e-5;});
   real.add('0.5, 1.5', function(){return ak.diff(ak.beta(0.5, 1.5), betaIntegral(0.5, 1.5)(1e-10, 1-1e-10))<1.0e-5;});
   real.add('1.5, 0.5', function(){return ak.diff(ak.beta(1.5, 0.5), betaIntegral(1.5, 0.5)(1e-10, 1-1e-10))<1.0e-5;});
   real.add('1.5, 1.5', function(){return ak.diff(ak.beta(1.5, 1.5), betaIntegral(1.5, 1.5)(1e-10, 1-1e-10))<1.0e-5;});

   var complex = {
    name: 'complex',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   complex.add('0.5+i, 0.5-i', function(){return ak.diff(ak.beta(ak.complex(0.5, 1), ak.complex(0.5, -1)), ak.div(ak.mul(ak.gamma(ak.complex(0.5, 1)),ak.gamma(ak.complex(0.5, -1))),ak.gamma(1)))<1.0e-10;});

   complex.add('1+0.5i, -1+0.5i', function(){return ak.diff(ak.beta(ak.complex(1, 0.5), ak.complex(-1, 0.5)), ak.div(ak.mul(ak.gamma(ak.complex(1, 0.5)),ak.gamma(ak.complex(-1, 0.5))),ak.gamma(ak.complex(0,1))))<1.0e-10;});

   complex.add('1+0.5i, 1.5-2i', function(){return ak.diff(ak.beta(ak.complex(1, 0.5), ak.complex(1.5, -2)), ak.div(ak.mul(ak.gamma(ak.complex(1, 0.5)),ak.gamma(ak.complex(1.5, -2))),ak.gamma(ak.complex(2.5,-1.5))))<1.0e-10;});

   complex.add('1+0.5i, -1.5-2i', function(){return ak.diff(ak.beta(ak.complex(1, 0.5), ak.complex(-1.5, -2)), ak.div(ak.mul(ak.gamma(ak.complex(1, 0.5)),ak.gamma(ak.complex(-1.5, -2))),ak.gamma(ak.complex(-0.5,-1.5))))<1.0e-10;});

   complex.add('1+0.5i, 2', function(){return ak.diff(ak.beta(ak.complex(1, 0.5), 2), ak.div(ak.mul(ak.gamma(ak.complex(1, 0.5)),ak.gamma(2)),ak.gamma(ak.complex(3,0.5))))<1.0e-10;});

   complex.add('0.25, -1.5-2i', function(){return ak.diff(ak.beta(0.25, ak.complex(-1.5, -2)), ak.div(ak.mul(ak.gamma(0.25),ak.gamma(ak.complex(-1.5, -2))),ak.gamma(ak.complex(-1.25,-2))))<1.0e-10;});

   var log = {
    name: 'log',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };  

   log.add('strings', function(){return isNaN(ak.logBeta('0.5', '0.5'));});
   log.add('-0.5, -0.5', function(){return isNaN(ak.logBeta(-0.5, -0.5));});
   log.add('-0.5,  0.5', function(){return isNaN(ak.logBeta(-0.5,  0.5));});
   log.add(' 0.5, -0.5', function(){return isNaN(ak.logBeta( 0.5, -0.5));});
   log.add(' 0.0,  0.0', function(){return isNaN(ak.logBeta(0, 0));});
   log.add(' 0.0,  0.5', function(){return ak.logBeta(0, 0.5)===ak.INFINITY;});
   log.add(' 0.5,  0.0', function(){return ak.logBeta(0.5, 0)===ak.INFINITY;});
   log.add('0.5, 0.5', function(){return ak.diff(ak.logBeta(0.5, 0.5), Math.log(ak.beta(0.5, 0.5)))<1.0e-10;});
   log.add('0.5, 1.5', function(){return ak.diff(ak.logBeta(0.5, 1.5), Math.log(ak.beta(0.5, 1.5)))<1.0e-10;});
   log.add('1.5, 0.5', function(){return ak.diff(ak.logBeta(1.5, 0.5), Math.log(ak.beta(1.5, 0.5)))<1.0e-10;});
   log.add('1.5, 1.5', function(){return ak.diff(ak.logBeta(1.5, 1.5), Math.log(ak.beta(1.5, 1.5)))<1.0e-10;});
  
   var betaP = {
    name: 'betaP',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   betaP.add('-0.5, -0.5, -0.25', function(){return isNaN(ak.betaP(-0.5, -0.5, -0.25));});
   betaP.add('-0.5, -0.5,  0.25', function(){return isNaN(ak.betaP(-0.5, -0.5,  0.25));});
   betaP.add('-0.5,  0.5, -0.25', function(){return isNaN(ak.betaP(-0.5,  0.5, -0.25));});
   betaP.add('-0.5,  0.5,  0.25', function(){return isNaN(ak.betaP(-0.5,  0.5,  0.25));});
   betaP.add('0.5, -0.5, -0.25', function(){return isNaN(ak.betaP(0.5, -0.5, -0.25));});
   betaP.add('0.5, -0.5,  0.25', function(){return isNaN(ak.betaP(0.5, -0.5,  0.25));});
   betaP.add('0.5,  0.5, -0.25', function(){return isNaN(ak.betaP(0.5,  0.5, -0.25));});

   betaP.add('0.5, 0.5, 0', function(){return ak.betaP(0.5, 0.5, 0)===0;});
   betaP.add('0.5, 0.5, 0.25', function(){return ak.diff(ak.betaP(0.5, 0.5, 0.25)*ak.beta(0.5, 0.5), betaIntegral(0.5, 0.5)(1e-10, 0.25))<1.0e-5;});
   betaP.add('0.5, 0.5, 0.5',  function(){return ak.diff(ak.betaP(0.5, 0.5, 0.5)*ak.beta(0.5, 0.5),  betaIntegral(0.5, 0.5)(1e-10, 0.5)) <1.0e-5;});
   betaP.add('0.5, 0.5, 0.75', function(){return ak.diff(ak.betaP(0.5, 0.5, 0.75)*ak.beta(0.5, 0.5), betaIntegral(0.5, 0.5)(1e-10, 0.75))<1.0e-5;});
   betaP.add('0.5, 0.5, 1', function(){return ak.betaP(0.5, 0.5, 1)===1;});
   betaP.add('0.5, 1.5, 0', function(){return ak.betaP(0.5, 1.5, 0)===0;});
   betaP.add('0.5, 1.5, 0.25', function(){return ak.diff(ak.betaP(0.5, 1.5, 0.25)*ak.beta(0.5, 1.5), betaIntegral(0.5, 1.5)(1e-10, 0.25))<1.0e-5;});
   betaP.add('0.5, 1.5, 0.5',  function(){return ak.diff(ak.betaP(0.5, 1.5, 0.5)*ak.beta(0.5, 1.5),  betaIntegral(0.5, 1.5)(1e-10, 0.5)) <1.0e-5;});
   betaP.add('0.5, 1.5, 0.75', function(){return ak.diff(ak.betaP(0.5, 1.5, 0.75)*ak.beta(0.5, 1.5), betaIntegral(0.5, 1.5)(1e-10, 0.75))<1.0e-5;});
   betaP.add('0.5, 1.5, 1', function(){return ak.betaP(0.5, 1.5, 1)===1;});
   betaP.add('1.5, 0.5, 0', function(){return ak.betaP(1.5, 0.5, 0)===0;});
   betaP.add('1.5, 0.5, 0.25', function(){return ak.diff(ak.betaP(1.5, 0.5, 0.25)*ak.beta(1.5, 0.5), betaIntegral(1.5, 0.5)(1e-10, 0.25))<1.0e-5;});
   betaP.add('1.5, 0.5, 0.5',  function(){return ak.diff(ak.betaP(1.5, 0.5, 0.5)*ak.beta(1.5, 0.5),  betaIntegral(1.5, 0.5)(1e-10, 0.5)) <1.0e-5;});
   betaP.add('1.5, 0.5, 0.75', function(){return ak.diff(ak.betaP(1.5, 0.5, 0.75)*ak.beta(1.5, 0.5), betaIntegral(1.5, 0.5)(1e-10, 0.75))<1.0e-5;});
   betaP.add('1.5, 0.5, 1', function(){return ak.betaP(1.5, 0.5, 1)===1;});
   betaP.add('1.5, 1.5, 0', function(){return ak.betaP(1.5, 1.5, 0)===0;});
   betaP.add('1.5, 1.5, 0.25', function(){return ak.diff(ak.betaP(1.5, 1.5, 0.25)*ak.beta(1.5, 1.5), betaIntegral(1.5, 1.5)(1e-10, 0.25))<1.0e-5;});
   betaP.add('1.5, 1.5, 0.5',  function(){return ak.diff(ak.betaP(1.5, 1.5, 0.5)*ak.beta(1.5, 1.5),  betaIntegral(1.5, 1.5)(1e-10, 0.5)) <1.0e-5;});
   betaP.add('1.5, 1.5, 0.75', function(){return ak.diff(ak.betaP(1.5, 1.5, 0.75)*ak.beta(1.5, 1.5), betaIntegral(1.5, 1.5)(1e-10, 0.75))<1.0e-5;});
   betaP.add('1.5, 1.5, 1', function(){return ak.betaP(1.5, 1.5, 1)===1;});

   var betaQ = {
    name: 'betaQ',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   betaQ.add('-0.5, -0.5, -0.25', function(){return isNaN(ak.betaQ(-0.5, -0.5, -0.25));});
   betaQ.add('-0.5, -0.5,  0.25', function(){return isNaN(ak.betaQ(-0.5, -0.5,  0.25));});
   betaQ.add('-0.5,  0.5, -0.25', function(){return isNaN(ak.betaQ(-0.5,  0.5, -0.25));});
   betaQ.add('-0.5,  0.5,  0.25', function(){return isNaN(ak.betaQ(-0.5,  0.5,  0.25));});
   betaQ.add('0.5, -0.5, -0.25', function(){return isNaN(ak.betaQ(0.5, -0.5, -0.25));});
   betaQ.add('0.5, -0.5,  0.25', function(){return isNaN(ak.betaQ(0.5, -0.5,  0.25));});
   betaQ.add('0.5,  0.5, -0.25', function(){return isNaN(ak.betaQ(0.5,  0.5, -0.25));});

   betaQ.add('0.5, 0.5, 0', function(){return ak.betaQ(0.5, 0.5, 0)===1;});
   betaQ.add('0.5, 0.5, 0.25', function(){return ak.diff(ak.betaQ(0.5, 0.5, 0.25)*ak.beta(0.5, 0.5), betaIntegral(0.5, 0.5)(0.25, 1-1e-10))<1.0e-5;});
   betaQ.add('0.5, 0.5, 0.5',  function(){return ak.diff(ak.betaQ(0.5, 0.5, 0.5)*ak.beta(0.5, 0.5),  betaIntegral(0.5, 0.5)(0.5, 1-1e-10)) <1.0e-5;});
   betaQ.add('0.5, 0.5, 0.75', function(){return ak.diff(ak.betaQ(0.5, 0.5, 0.75)*ak.beta(0.5, 0.5), betaIntegral(0.5, 0.5)(0.75, 1-1e-10))<1.0e-5;});
   betaQ.add('0.5, 0.5, 1', function(){return ak.betaQ(0.5, 0.5, 1)===0;});
   betaQ.add('0.5, 1.5, 0', function(){return ak.betaQ(0.5, 1.5, 0)===1;});
   betaQ.add('0.5, 1.5, 0.25', function(){return ak.diff(ak.betaQ(0.5, 1.5, 0.25)*ak.beta(0.5, 1.5), betaIntegral(0.5, 1.5)(0.25, 1-1e-10))<1.0e-5;});
   betaQ.add('0.5, 1.5, 0.5',  function(){return ak.diff(ak.betaQ(0.5, 1.5, 0.5)*ak.beta(0.5, 1.5),  betaIntegral(0.5, 1.5)(0.5, 1-1e-10)) <1.0e-5;});
   betaQ.add('0.5, 1.5, 0.75', function(){return ak.diff(ak.betaQ(0.5, 1.5, 0.75)*ak.beta(0.5, 1.5), betaIntegral(0.5, 1.5)(0.75, 1-1e-10))<1.0e-5;});
   betaQ.add('0.5, 1.5, 1', function(){return ak.betaQ(0.5, 1.5, 1)===0;});
   betaQ.add('1.5, 0.5, 0', function(){return ak.betaQ(1.5, 0.5, 0)===1;});
   betaQ.add('1.5, 0.5, 0.25', function(){return ak.diff(ak.betaQ(1.5, 0.5, 0.25)*ak.beta(1.5, 0.5), betaIntegral(1.5, 0.5)(0.25, 1-1e-10))<1.0e-5;});
   betaQ.add('1.5, 0.5, 0.5',  function(){return ak.diff(ak.betaQ(1.5, 0.5, 0.5)*ak.beta(1.5, 0.5),  betaIntegral(1.5, 0.5)(0.5, 1-1e-10)) <1.0e-5;});
   betaQ.add('1.5, 0.5, 0.75', function(){return ak.diff(ak.betaQ(1.5, 0.5, 0.75)*ak.beta(1.5, 0.5), betaIntegral(1.5, 0.5)(0.75, 1-1e-10))<1.0e-5;});
   betaQ.add('1.5, 0.5, 1', function(){return ak.betaQ(1.5, 0.5, 1)===0;});
   betaQ.add('1.5, 1.5, 0', function(){return ak.betaQ(1.5, 1.5, 0)===1;});
   betaQ.add('1.5, 1.5, 0.25', function(){return ak.diff(ak.betaQ(1.5, 1.5, 0.25)*ak.beta(1.5, 1.5), betaIntegral(1.5, 1.5)(0.25, 1-1e-10))<1.0e-5;});
   betaQ.add('1.5, 1.5, 0.5',  function(){return ak.diff(ak.betaQ(1.5, 1.5, 0.5)*ak.beta(1.5, 1.5),  betaIntegral(1.5, 1.5)(0.5, 1-1e-10)) <1.0e-5;});
   betaQ.add('1.5, 1.5, 0.75', function(){return ak.diff(ak.betaQ(1.5, 1.5, 0.75)*ak.beta(1.5, 1.5), betaIntegral(1.5, 1.5)(0.75, 1-1e-10))<1.0e-5;});
   betaQ.add('1.5, 1.5, 1', function(){return ak.betaQ(1.5, 1.5, 1)===0;});

   beta.add(real);
   beta.add(complex);
   beta.add(log);
   beta.add(betaP);
   beta.add(betaQ);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   beta.add(load);
  }
  
  akTest.add(beta);
 }

 ak.using(['Special/BetaFunction.js', 'Calculus/SimpsonIntegral.js'], define);
})();