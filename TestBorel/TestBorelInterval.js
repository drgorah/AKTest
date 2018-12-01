"use strict";

(function() {
 function define() {
  var borelInterval = {
   name: 'borel.borelInterval',
   body: [],
   add: function(t) {this.body.push(t);}
  };

  try {
   var b0 = ak.borelBound('(', -1);
   var b1 = ak.borelBound('[', -1);
   var b2 = ak.borelBound(1, ')');
   var b3 = ak.borelBound(1, ']');
   var b4 = ak.borelBound('(', 0);
   var b5 = ak.borelBound('[', 0);
   var b6 = ak.borelBound(0, ')');
   var b7 = ak.borelBound(0, ']');
   var b8 = ak.borelBound('(', -2);
   var b9 = ak.borelBound(2, ')');

   var i02 = ak.borelInterval(b0, b2);
   var i03 = ak.borelInterval(b0, b3);
   var i12 = ak.borelInterval(b1, b2);
   var i13 = ak.borelInterval(b1, b3);

   var i2 = ak.borelInterval('(', -1, 1, ')');
   var i3 = ak.borelInterval('[', -1, 1, ')');
   var i4 = ak.borelInterval('(', -1, 1, ']');
   var i5 = ak.borelInterval('[', -1, 1, ']');
   var i6 = ak.borelInterval('[',  1, 1, ']');
   var i7 = ak.borelInterval(1);
   var i8 = ak.borelInterval(i2);
   var i9 = ak.borelInterval(i5);

   var o0  = ak.borelInterval('(', -2, 0, ')');
   var o1  = ak.borelInterval('[', -2, 0, ')');
   var o2  = ak.borelInterval('(', -2, 0, ']');
   var o3  = ak.borelInterval('[', -2, 0, ']');
   var o4  = ak.borelInterval('(',  0, 2, ')');
   var o5  = ak.borelInterval('[',  0, 2, ')');
   var o6  = ak.borelInterval('(',  0, 2, ']');
   var o7  = ak.borelInterval('[',  0, 2, ']');
   var o8  = ak.borelInterval('(', -0.5, 0.5, ')');
   var o9  = ak.borelInterval('[', -0.5, 0.5, ')');
   var o10 = ak.borelInterval('(', -0.5, 0.5, ']');
   var o11 = ak.borelInterval('[', -0.5, 0.5, ']');

   var e0 = ak.borelInterval();
   var e1 = ak.borelInterval('(', 1, 1, ')');
   var e2 = ak.borelInterval('[', 1, 1, ')');
   var e3 = ak.borelInterval('(', 1, 1, ']');
   var e4 = ak.borelInterval('(', 2, 1, ')');
   var e5 = ak.borelInterval('[', 2, 1, ')');
   var e6 = ak.borelInterval('(', 2, 1, ']');
   var e7 = ak.borelInterval('[', 2, 1, ']');

   function invalidInterval() {
    var result;
  
    result = false;
    try{ak.borelInterval(b0);}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.borelInterval(b2, b0);}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.borelInterval('[', -1);}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.borelInterval('[', -1, 1);}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.borelInterval('{', -1, 1, ']');}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.borelInterval('[', -1, 1, '}');}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.borelInterval('[', ak.NaN, 1, ']');}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.borelInterval('[', -1, ak.NaN, ']');}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.borelInterval({});}
    catch(e){result = true;}
    if(!result) return false;

    return true;
   }

   var init = {
    name: 'init',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   init.add('singleton', function() {return i7.lb().value()===1 && i7.ub().value()===1 && i7.lb().closed() && i7.ub().closed();});

   init.add('empty', function() {
    return e0.lb().value()===0 && e0.ub().value()===0 && e0.lb().open() && e0.ub().open()
           ak.eq(e1, e0) && ak.eq(e2, e0) && ak.eq(e3, e0) && ak.eq(e3, e0)
        && ak.eq(e4, e0) && ak.eq(e5, e0) && ak.eq(e6, e0) && ak.eq(e7, e0);
   });

   init.add('copy', function() {return ak.eq(i8, i2) && ak.eq(i9, i5);});
   init.add('invalid', invalidInterval);
  
   var members = {
    name: 'members',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   members.add('contains - number', function() {
    return !i2.contains(-2) && !i2.contains(-1) && i2.contains(0) && !i2.contains(1) && !i2.contains(2)
        && !i3.contains(-2) &&  i3.contains(-1) && i3.contains(0) && !i3.contains(1) && !i3.contains(2)
        && !i4.contains(-2) && !i4.contains(-1) && i4.contains(0) &&  i4.contains(1) && !i4.contains(2)
        && !i5.contains(-2) &&  i5.contains(-1) && i5.contains(0) &&  i5.contains(1) && !i5.contains(2);
   });

   members.add('contains - bound', function() {
    return !i2.contains(b8) && !i2.contains(b1) &&  i2.contains(b0)
        &&  i2.contains(b4) &&  i2.contains(b5) &&  i2.contains(b6) &&  i2.contains(b7) 
        &&  i2.contains(b2) && !i2.contains(b3) && !i2.contains(b9)

        && !i3.contains(b8) &&  i3.contains(b1) &&  i3.contains(b0)
        &&  i3.contains(b4) &&  i3.contains(b5) &&  i3.contains(b6) &&  i3.contains(b7) 
        &&  i3.contains(b2) && !i3.contains(b3) && !i3.contains(b9)

        && !i4.contains(b8) && !i4.contains(b1) &&  i4.contains(b0)
        &&  i4.contains(b4) &&  i4.contains(b5) &&  i4.contains(b6) &&  i4.contains(b7) 
        &&  i4.contains(b2) &&  i4.contains(b3) && !i4.contains(b9)

        && !i5.contains(b8) &&  i5.contains(b1) &&  i5.contains(b0)
        &&  i5.contains(b4) &&  i5.contains(b5) &&  i5.contains(b6) &&  i5.contains(b7) 
        &&  i5.contains(b2) &&  i5.contains(b3) && !i5.contains(b9);
   });

   members.add('includes - interval', function() {
    return  i2.includes(i2) && !i2.includes(i3) && !i2.includes(i4)  && !i2.includes(i5)
        &&  i2.includes(o8) &&  i2.includes(o9) &&  i2.includes(o10) &&  i2.includes(o11)
        && !i2.includes(o0) && !i2.includes(o1) && !i2.includes(o2)  && !i2.includes(o3)
        && !i2.includes(o4) && !i2.includes(o5) && !i2.includes(o6)  && !i2.includes(o7)
        &&  i5.includes(i2) &&  i5.includes(i3) &&  i5.includes(i4)  &&  i5.includes(i5)
        &&  i5.includes(o8) &&  i5.includes(o9) &&  i5.includes(o10) &&  i5.includes(o11)
        && !i5.includes(o0) && !i5.includes(o1) && !i5.includes(o2)  && !i5.includes(o3)
        && !i5.includes(o4) && !i5.includes(o5) && !i5.includes(o6)  && !i5.includes(o7)
        &&  i2.includes(e7) && !e7.includes(i2) &&  e7.includes(e6);
   });

   members.add('toString', function() {
    return i2.toString()==='(-1,1)' && i3.toString()==='[-1,1)'
        && i4.toString()==='(-1,1]' && i5.toString()==='[-1,1]';
   });

   members.add('toExponential', function() {
    return i2.toExponential(2)==='(-1.00e+0,1.00e+0)' && i3.toExponential(2)==='[-1.00e+0,1.00e+0)'
        && i4.toExponential(2)==='(-1.00e+0,1.00e+0]' && i5.toExponential(2)==='[-1.00e+0,1.00e+0]';
   });

   members.add('toFixed', function() {
    return i2.toFixed(2)==='(-1.00,1.00)' && i3.toFixed(2)==='[-1.00,1.00)'
        && i4.toFixed(2)==='(-1.00,1.00]' && i5.toFixed(2)==='[-1.00,1.00]';
   });

   members.add('toPrecision', function() {
    return i2.toPrecision(2)==='(-1.0,1.0)' && i3.toPrecision(2)==='[-1.0,1.0)'
        && i4.toPrecision(2)==='(-1.0,1.0]' && i5.toPrecision(2)==='[-1.0,1.0]';
   });

   var operators = {
    name: 'operators',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   operators.add('abs', function() {
    return ak.abs(i2)===2 && ak.abs(i3)===2 && ak.abs(i4)===2 && ak.abs(i5)===2;
   });

   operators.add('is/nis - number', function() {
    return ak.nis(-2, i2) && ak.nis(-1, i2) && ak.is(0, i2) && ak.nis(1, i2) && ak.nis(2, i2)
        && ak.nis(-2, i3) && ak.is (-1, i3) && ak.is(0, i3) && ak.nis(1, i3) && ak.nis(2, i3)
        && ak.nis(-2, i4) && ak.nis(-1, i4) && ak.is(0, i4) && ak.is (1, i4) && ak.nis(2, i4)
        && ak.nis(-2, i5) && ak.is (-1, i5) && ak.is(0, i5) && ak.is (1, i5) && ak.nis(2, i5);
   });

   operators.add('is/nis - bound', function() {
    return ak.nis(b8, i2) && ak.nis(b1, i2) && ak.is (b0, i2)
        && ak.is (b4, i2) && ak.is (b5, i2) && ak.is (b6, i2) && ak.is (b7, i2)
        && ak.is (b2, i2) && ak.nis(b3, i2) && ak.nis(b9, i2)

        && ak.nis(b8, i3) && ak.is (b1, i3) && ak.is (b0, i3)
        && ak.is (b4, i3) && ak.is (b5, i3) && ak.is (b6, i3) && ak.is (b7, i3)
        && ak.is (b2, i3) && ak.nis(b3, i3) && ak.nis(b9, i3)

        && ak.nis(b8, i4) && ak.nis(b1, i4) && ak.is (b0, i4)
        && ak.is (b4, i4) && ak.is (b5, i4) && ak.is (b6, i4) && ak.is (b7, i4)
        && ak.is (b2, i4) && ak.is (b3, i4) && ak.nis(b9, i4)

        && ak.nis(b8, i5) && ak.is (b1, i5) && ak.is (b0, i5)
        && ak.is (b4, i5) && ak.is (b5, i5) && ak.is (b6, i5) && ak.is (b7, i5)
        && ak.is (b2, i5) && ak.is (b3, i5) && ak.nis(b9, i5);
   });

   operators.add('eq', function() {
    return  ak.eq(i2, i2) &&  ak.eq(i3, i3) &&  ak.eq(i4, i4) &&  ak.eq(i5, i5) &&  ak.eq(i6, i6)
        && !ak.eq(i2, i3) && !ak.eq(i3, i4) && !ak.eq(i4, i5) && !ak.eq(i5, i6) && !ak.eq(i6, i2);
   });

   operators.add('ge', function() {
    return  ak.ge(i2, i2) && !ak.ge(i2, i3) && !ak.ge(i2, i4)  && !ak.ge(i2, i5)
        &&  ak.ge(i2, o8) &&  ak.ge(i2, o9) &&  ak.ge(i2, o10) &&  ak.ge(i2, o11)
        && !ak.ge(i2, o0) && !ak.ge(i2, o1) && !ak.ge(i2, o2)  && !ak.ge(i2, o3)
        && !ak.ge(i2, o4) && !ak.ge(i2, o5) && !ak.ge(i2, o6)  && !ak.ge(i2, o7)
        &&  ak.ge(i5, i2) &&  ak.ge(i5, i3) &&  ak.ge(i5, i4)  &&  ak.ge(i5, i5)
        &&  ak.ge(i5, o8) &&  ak.ge(i5, o9) &&  ak.ge(i5, o10) &&  ak.ge(i5, o11)
        && !ak.ge(i5, o0) && !ak.ge(i5, o1) && !ak.ge(i5, o2)  && !ak.ge(i5, o3)
        && !ak.ge(i5, o4) && !ak.ge(i5, o5) && !ak.ge(i5, o6)  && !ak.ge(i5, o7)
        &&  ak.ge(i2, e7) && !ak.ge(e7, i2) &&  ak.ge(e7, e6);
   });

   operators.add('gt', function() {
    return !ak.gt(i2, i2) && !ak.gt(i2, i3) && !ak.gt(i2, i4)  && !ak.gt(i2, i5)
        &&  ak.gt(i2, o8) &&  ak.gt(i2, o9) &&  ak.gt(i2, o10) &&  ak.gt(i2, o11)
        && !ak.gt(i2, o0) && !ak.gt(i2, o1) && !ak.gt(i2, o2)  && !ak.gt(i2, o3)
        && !ak.gt(i2, o4) && !ak.gt(i2, o5) && !ak.gt(i2, o6)  && !ak.gt(i2, o7)
        &&  ak.gt(i5, i2) &&  ak.gt(i5, i3) &&  ak.gt(i5, i4)  && !ak.gt(i5, i5)
        &&  ak.gt(i5, o8) &&  ak.gt(i5, o9) &&  ak.gt(i5, o10) &&  ak.gt(i5, o11)
        && !ak.gt(i5, o0) && !ak.gt(i5, o1) && !ak.gt(i5, o2)  && !ak.gt(i5, o3)
        && !ak.gt(i5, o4) && !ak.gt(i5, o5) && !ak.gt(i5, o6)  && !ak.gt(i5, o7)
        &&  ak.gt(i2, e7) && !ak.gt(e7, i2) && !ak.gt(e7, e6);
   });

   operators.add('le', function() {
    return  ak.le(i2, i2) && !ak.le(i3, i2) && !ak.le(i4,  i2) && !ak.le(i5,  i2)
        &&  ak.le(o8, i2) &&  ak.le(o9, i2) &&  ak.le(o10, i2) &&  ak.le(o11, i2)
        && !ak.le(o0, i2) && !ak.le(o1, i2) && !ak.le(o2,  i2) && !ak.le(o3 , i2)
        && !ak.le(o4, i2) && !ak.le(o5, i2) && !ak.le(o6,  i2) && !ak.le(o7,  i2)
        &&  ak.le(i2, i5) &&  ak.le(i3, i5) &&  ak.le(i4,  i5) &&  ak.le(i5,  i5)
        &&  ak.le(o8, i5) &&  ak.le(o9, i5) &&  ak.le(o10, i5) &&  ak.le(o11, i5)
        && !ak.le(o0, i5) && !ak.le(o1, i5) && !ak.le(o2,  i5) && !ak.le(o3,  i5)
        && !ak.le(o4, i5) && !ak.le(o5, i5) && !ak.le(o6,  i5) && !ak.le(o7,  i5)
        &&  ak.le(e7, i2) && !ak.le(i2, e7) &&  ak.le(e6,  e7);
   });

   operators.add('lt', function() {
    return !ak.lt(i2, i2) && !ak.lt(i3, i2) && !ak.lt(i4,  i2) && !ak.lt(i5,  i2)
        &&  ak.lt(o8, i2) &&  ak.lt(o9, i2) &&  ak.lt(o10, i2) &&  ak.lt(o11, i2)
        && !ak.lt(o0, i2) && !ak.lt(o1, i2) && !ak.lt(o2,  i2) && !ak.lt(o3 , i2)
        && !ak.lt(o4, i2) && !ak.lt(o5, i2) && !ak.lt(o6,  i2) && !ak.lt(o7,  i2)
        &&  ak.lt(i2, i5) &&  ak.lt(i3, i5) &&  ak.lt(i4,  i5) && !ak.lt(i5,  i5)
        &&  ak.lt(o8, i5) &&  ak.lt(o9, i5) &&  ak.lt(o10, i5) &&  ak.lt(o11, i5)
        && !ak.lt(o0, i5) && !ak.lt(o1, i5) && !ak.lt(o2,  i5) && !ak.lt(o3,  i5)
        && !ak.lt(o4, i5) && !ak.lt(o5, i5) && !ak.lt(o6,  i5) && !ak.lt(o7,  i5)
        &&  ak.lt(e7, i2) && !ak.lt(i2, e7) && !ak.lt(e6,  e7);
   });

   operators.add('ne', function() {
    return !ak.ne(i2, i2) && !ak.ne(i3, i3) && !ak.ne(i4, i4) && !ak.ne(i5, i5) && !ak.ne(i6, i6)
        &&  ak.ne(i2, i3) &&  ak.ne(i3, i4) &&  ak.ne(i4, i5) &&  ak.ne(i5, i6) &&  ak.ne(i6, i2);
   });

   borelInterval.add(init);
   borelInterval.add(members);
   borelInterval.add(operators);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   borelInterval.add(load);
  }

  akTest.add(borelInterval);
 }

 ak.using('Borel/BorelInterval.js', define);
})();
