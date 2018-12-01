"use strict";

(function() {
 function define() {
  var borelMeasure = {
   name: 'borel.borelMeasure',
   body: [],
   add: function(t) {this.body.push(t);}
  };

  try {
   var phi = ak.normalCDF();

   function mass(l, u) {return u-l;}
   function cdf(l, u) {return phi(u)-phi(l);}

   var i0 = ak.borelInterval('(', -3, -1, ')');
   var i1 = ak.borelInterval('[', +1, +2, ']');

   var s = ak.borelSet([i0, i1]);

   function invalidArgs() {
    var result;
  
    result = false;
    try{ak.borelMeasure(1, mass);}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.borelMeasure(s, 1);}
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

   val.add('mass', function() {return ak.borelMeasure(s, mass)===3-3*ak.EPSILON;});
   val.add('cdf', function() {return ak.borelMeasure(s, cdf)===phi(-1)+phi(2)-phi(-3)-phi(1);});

   borelMeasure.add(args);
   borelMeasure.add(val);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   borelMeasure.add(load);
  }

  akTest.add(borelMeasure);
 }

 ak.using(['Borel/BorelMeasure.js', 'Distribution/NormalDistribution.js'], define);
})();
