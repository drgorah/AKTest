"use strict";

(function() {
 function define() {
  var borelIntegral = {
   name: 'borel.borelIntegral',
   body: [],
   add: function(t) {this.body.push(t);}
  };

  try {
   var pdf = ak.normalPDF();
   var phi = ak.normalCDF();
   function unit(x) {return 1;}
   function ident(x) {return x;}
   function mass(l, u) {return u-l;}
   function cdf(l, u) {return phi(u)-phi(l);}

   var i0 = ak.borelInterval('(', -3, -1, ')');
   var i1 = ak.borelInterval('[', +1, +2, ']');
   var i2 = ak.borelInterval('[', -ak.INFINITY, +ak.INFINITY, ']');
   var i3 = ak.borelInterval('[', +ak.INFINITY, +ak.INFINITY, ']');

   var s = ak.borelSet([i0, i1]);
   var u = ak.borelSet([i2]);
   var o = ak.borelSet([i3]);

   function invalidArgs() {
    var result;
  
    result = false;
    try{ak.borelIntegral(1, mass);}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.borelIntegral(s, 1);}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.borelIntegral(s, mass, 1);}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.borelIntegral(s, mass, ak.rombergIntegral, mass);}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.borelIntegral(s, mass, ak.rombergIntegral, 1e-7, mass);}
    catch(e){result = true;}
    if(!result) return false;

    return true;
   }

   var args = {
    name: 'args',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   args.add('invalid', invalidArgs);

   var val = {
    name: 'val',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   val.add('mass', function() {return ak.diff(ak.borelIntegral(s, unit), ak.borelMeasure(s, mass))<1e-14;});
   val.add('cdf', function() {return ak.diff(ak.borelIntegral(s, pdf), ak.borelMeasure(s, cdf))<1e-14 && ak.diff(ak.borelIntegral(u, pdf), ak.borelMeasure(u, cdf))<1e-14;});
   val.add('empty', function() {return ak.borelIntegral(o, ident)===0;});

   borelIntegral.add(args);
   borelIntegral.add(val);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   borelIntegral.add(load);
  }

  akTest.add(borelIntegral);
 }

 ak.using(['Borel/BorelIntegral.js', 'Borel/BorelMeasure.js', 'Distribution/NormalDistribution.js'], define);
})();
