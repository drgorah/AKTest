"use strict";

(function() {
 function define() {
  var borelBound = {
   name: 'borel.borelBound',
   body: [],
   add: function(t) {this.body.push(t);}
  };

  try {
   var b0 = ak.borelBound('(', 0);
   var b1 = ak.borelBound('[', 0);
   var b2 = ak.borelBound(0, ')');
   var b3 = ak.borelBound(0, ']');
   var b4 = ak.borelBound('(', ak.INFINITY);
   var b5 = ak.borelBound('[', ak.INFINITY);
   var b6 = ak.borelBound(ak.INFINITY, ')');
   var b7 = ak.borelBound(ak.INFINITY, ']');
   var b8 = ak.borelBound(b0);
   var b9 = ak.borelBound(b3);

   function invalidBound() {
    var result;
  
    result = false;
    try{ak.borelBound();}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.borelBound(1, 2);}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.borelBound('[', ']');}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.borelBound('(', ')');}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.borelBound(']', 1);}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.borelBound(2, '[');}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.borelBound(')', 1);}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.borelBound(2, '(');}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.borelBound('{', 1);}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.borelBound(2, '}');}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.borelBound('(', ak.NaN);}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.borelBound(ak.NaN, ']');}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.borelBound({});}
    catch(e){result = true;}
    if(!result) return false;

    return true;
   }

   var init = {
    name: 'init',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   init.add('lower open', function() {
    return b0.value()===0 && b0.type()==='(' && b0.lower() && !b0.upper() && b0.open() && !b0.closed()
        && b4.value()===ak.INFINITY && b4.type()==='(' && b4.lower() && !b4.upper() && b4.open() && !b4.closed();
   });

   init.add('lower closed', function() {
    return b1.value()===0 && b1.type()==='[' && b1.lower() && !b1.upper() && !b1.open() && b1.closed()
        && b5.value()===ak.INFINITY && b5.type()==='[' && b5.lower() && !b5.upper() && !b5.open() && b5.closed();
   });

   init.add('upper open', function() {
    return b2.value()===0 && b2.type()===')' && !b2.lower() && b2.upper() && b2.open() && !b2.closed()
        && b6.value()===ak.INFINITY && b6.type()===')' && !b6.lower() && b6.upper() && b6.open() && !b6.closed();
   });

   init.add('upper closed', function() {
    return b3.value()===0 && b3.type()===']' && !b3.lower() && b3.upper() && !b3.open() && b3.closed()
        && b7.value()===ak.INFINITY && b7.type()===']' && !b7.lower() && b7.upper() && !b7.open() && b7.closed();
   });

   init.add('copy', function() {return ak.eq(b8, b0) && ak.eq(b9, b3);});
   init.add('invalid', invalidBound);
  
   var members = {
    name: 'members',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   members.add('toString', function() {
    return b0.toString()==='(0' && b1.toString()==='[0' && b2.toString()==='0)' && b3.toString()==='0]'
        && b4.toString()==='(Infinity' && b5.toString()==='[Infinity' && b6.toString()==='Infinity)' && b7.toString()==='Infinity]';
   });

   members.add('toExponential', function() {
    return b0.toExponential(2)==='(0.00e+0' && b1.toExponential(2)==='[0.00e+0' && b2.toExponential(2)==='0.00e+0)' && b3.toExponential(2)==='0.00e+0]'
        && b4.toExponential(2)==='(Infinity' && b5.toExponential(2)==='[Infinity' && b6.toExponential(2)==='Infinity)' && b7.toExponential(2)==='Infinity]';
   });

   members.add('toFixed', function() {
    return b0.toFixed(2)==='(0.00' && b1.toFixed(2)==='[0.00' && b2.toFixed(2)==='0.00)' && b3.toFixed(2)==='0.00]'
        && b4.toFixed(2)==='(Infinity' && b5.toFixed(2)==='[Infinity' && b6.toFixed(2)==='Infinity)' && b7.toFixed(2)==='Infinity]';
   });

   members.add('toPrecision', function() {
    return b0.toPrecision(2)==='(0.0' && b1.toPrecision(2)==='[0.0' && b2.toPrecision(2)==='0.0)' && b3.toPrecision(2)==='0.0]'
        && b4.toPrecision(2)==='(Infinity' && b5.toPrecision(2)==='[Infinity' && b6.toPrecision(2)==='Infinity)' && b7.toPrecision(2)==='Infinity]';
   });

   var operators = {
    name: 'operators',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   operators.add('eq', function() {
    return  ak.eq(b0, b0) &&  ak.eq(b1, b1) &&  ak.eq(b2, b2) &&  ak.eq(b3, b3)
        && !ak.eq(b0, b1) && !ak.eq(b1, b2) && !ak.eq(b2, b3) && !ak.eq(b3, b0);
   });

   operators.add('ne', function() {
    return !ak.ne(b0, b0) && !ak.ne(b1, b1) && !ak.ne(b2, b2) && !ak.ne(b3, b3)
        &&  ak.ne(b0, b1) &&  ak.ne(b1, b2) &&  ak.ne(b2, b3) &&  ak.ne(b3, b0);
   });
  
   borelBound.add(init);
   borelBound.add(members);
   borelBound.add(operators);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   borelBound.add(load);
  }

  akTest.add(borelBound);
 }

 ak.using('Borel/BorelBound.js', define);
})();
