"use strict";

(function() {
 function define() {
  var borelSet = {
   name: 'borel.borelSet',
   body: [],
   add: function(t) {this.body.push(t);}
  };

  try {
   var b0  = ak.borelBound('(', -1);
   var b1  = ak.borelBound('[', -1);
   var b2  = ak.borelBound(1, ')');
   var b3  = ak.borelBound(1, ']');
   var b4  = ak.borelBound('(', 0);
   var b5  = ak.borelBound('[', 0);
   var b6  = ak.borelBound(0, ')');
   var b7  = ak.borelBound(0, ']');
   var b8  = ak.borelBound('(', -2);
   var b9  = ak.borelBound(2, ')');
   var b10 = ak.borelBound('(', -3);
   var b11 = ak.borelBound(3, ')');
   var b12 = ak.borelBound('[', -3);
   var b13 = ak.borelBound(3, ']');

   var i0  = ak.borelInterval('(', -3, -1, ')');
   var i1  = ak.borelInterval('(', -2,  0, ')');
   var i2  = ak.borelInterval('(', -1,  1, ')');
   var i3  = ak.borelInterval('(',  0,  2, ')');
   var i4  = ak.borelInterval('(',  1,  3, ')');
   var i5  = ak.borelInterval('(', -3,  3, ')');
   var i7  = ak.borelInterval('(', -3,  0, ')');
   var i8  = ak.borelInterval('(',  0,  3, ')');
   var i9  = ak.borelInterval('[', -1,  1, ']');
   var i10 = ak.borelInterval('[', -0.5,  0.5, ']');
   var i11 = ak.borelInterval('[', -3, -1, ']');
   var i12 = ak.borelInterval('[',  1,  3, ']');
   var i13 = ak.borelInterval('[', -ak.INFINITY, -3, ']');
   var i14 = ak.borelInterval('[', 0, 0, ']');
   var i15 = ak.borelInterval('[', 3, ak.INFINITY, ']');

   var s0  = ak.borelSet([i2, i0, i4, i10, i3, i1]);
   var s1  = ak.borelSet([i9, i0, i4]);
   var s2  = ak.borelSet([i3, i1, i0, i4]);
   var s3  = ak.borelSet(s2);
   var s4  = ak.borelSet([i1, i4]);
   var s5  = ak.borelSet([i3, i0]);
   var s6  = ak.borelSet([i13, i14, i15]);
   var s7  = ak.borelSet([]);
   var s8  = ak.borelSet([i5, i13, i15]);
   var s9  = ak.borelSet([i0, i1, i2]);
   var s10 = ak.borelSet([i2, i3, i4]);
   var s11 = ak.borelSet([i2]);

   function invalidSet() {
    var result;

    result = false;
    try{ak.borelSet(i0);}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.borelSet([b0]);}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.borelSet([i0, b0]);}
    catch(e){result = true;}
    if(!result) return false;

    return true;
   }

   var init = {
    name: 'init',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   init.add('full overlap', function(){return s0.intervals()===1 && ak.eq(s0.at(0), i5)
                                           && s1.intervals()===1 && ak.eq(s1.at(0), i5)});

   init.add('part overlap', function(){return s2.intervals()===2 && ak.eq(s2.at(0), i7) && ak.eq(s2.at(1), i8)});

   init.add('copy', function() {return ak.eq(s3, s2) && ak.eq(s2, s3);});

   init.add('invalid', invalidSet);

   var members = {
    name: 'members',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   members.add('contains - number', function() {
    return !s2.contains(-3) && s2.contains(-2) && s2.contains(-1) && !s2.contains(0)
        && !s2.contains( 3) && s2.contains( 2) && s2.contains( 1);
   });

   members.add('contains - bound', function() {
    return !s2.contains(b12) && s2.contains(b10) &&  s2.contains(b8) &&  s2.contains(b0) && s2.contains(b1)
        && !s2.contains(b13) && s2.contains(b11) &&  s2.contains(b9) &&  s2.contains(b2) && s2.contains(b3)
        &&  s2.contains(b4 ) && s2.contains(b6 ) && !s2.contains(b5) && !s2.contains(b7);
   });

   members.add('includes - interval', function() {
    return !s2.includes(i11) && s2.includes(i0) &&  s2.includes(i1) && !s2.includes(i2)
        &&  s2.includes(i3 ) && s2.includes(i4) && !s2.includes(i12);
   });

   members.add('includes - set', function() {
    return s2.includes(s4) && !s4.includes(s2) &&  s2.includes(s3) &&  s3.includes(s2)
        && s2.includes(s5) && !s5.includes(s2) && !s4.includes(s5) && !s5.includes(s4);
   });

   members.add('toString', function() {
    return s0.toString()==='{(-3,3)}'
        && s2.toString()==='{(-3,0)+(0,3)}';
   });

   members.add('toExponential', function() {
    return s0.toExponential(2)==='{(-3.00e+0,3.00e+0)}'
        && s2.toExponential(2)==='{(-3.00e+0,0.00e+0)+(0.00e+0,3.00e+0)}';
   });

   members.add('toFixed', function() {
    return s0.toFixed(2)==='{(-3.00,3.00)}'
        && s2.toFixed(2)==='{(-3.00,0.00)+(0.00,3.00)}';
   });

   members.add('toPrecision', function() {
    return s0.toPrecision(2)==='{(-3.0,3.0)}'
        && s2.toPrecision(2)==='{(-3.0,0.0)+(0.0,3.0)}';
   });

   var operators = {
    name: 'operators',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   operators.add('abs', function() {
    return ak.abs(s5)===ak.abs(i3)+ak.abs(i0);
   });

   operators.add('not', function() {
    return ak.eq(s6, ak.not(s2)) && ak.eq(s2, ak.not(s6))
        && ak.eq(s8, ak.not(s7)) && ak.eq(s7, ak.not(s8));
   });

   operators.add('is/nis - number', function() {
    return ak.nis(-3, s2) && ak.is(-2, s2) && ak.is(-1, s2) && ak.nis(0, s2)
        && ak.nis( 3, s2) && ak.is( 2, s2) && ak.is( 1, s2);
   });

   operators.add('is/nis - bound', function() {
    return ak.nis(b12, s2) && ak.is(b10, s2) && ak.is (b8, s2) && ak.is (b0, s2) && ak.is(b1, s2)
        && ak.nis(b13, s2) && ak.is(b11, s2) && ak.is (b9, s2) && ak.is (b2, s2) && ak.is(b3, s2)
        && ak.is (b4,  s2) && ak.is(b6,  s2) && ak.nis(b5, s2) && ak.nis(b7, s2);
   });

   operators.add('eq', function() {return  ak.eq(s0, s0) &&  ak.eq(s2, s2) && !ak.eq(s0, s2);});

   operators.add('ge', function() {
    return ak.ge(s2, s4) && !ak.ge(s4, s2) &&  ak.ge(s2, s3) &&  ak.ge(s3, s2)
        && ak.ge(s2, s5) && !ak.ge(s5, s2) && !ak.ge(s4, s5) && !ak.ge(s5, s4);
   });

   operators.add('gt', function() {
    return ak.gt(s2, s4) && !ak.gt(s4, s2) && !ak.gt(s2, s3) && !ak.gt(s3, s2)
        && ak.gt(s2, s5) && !ak.gt(s5, s2) && !ak.gt(s4, s5) && !ak.gt(s5, s4);
   });

   operators.add('le', function() {
    return !ak.le(s2, s4) && ak.le(s4, s2) &&  ak.le(s2, s3) &&  ak.le(s3, s2)
        && !ak.le(s2, s5) && ak.le(s5, s2) && !ak.le(s4, s5) && !ak.le(s5, s4);
   });

   operators.add('lt', function() {
    return !ak.lt(s2, s4) && ak.lt(s4, s2) && !ak.lt(s2, s3) && !ak.lt(s3, s2)
        && !ak.lt(s2, s5) && ak.lt(s5, s2) && !ak.lt(s4, s5) && !ak.lt(s5, s4);
   });

   operators.add('ne', function() {return !ak.ne(s0, s0) && !ak.ne(s2, s2) &&  ak.ne(s0, s2);});

   operators.add('add', function() {
    return ak.eq(s2, ak.add(s4, s5));
   });

   operators.add('and', function() {
    return ak.eq(s11, ak.and(s9, s10));
   });

   operators.add('nand', function() {
    return ak.eq(ak.not(s11), ak.nand(s9, s10));
   });

   operators.add('nor', function() {
    return ak.eq(s6, ak.nor(s4, s5));
   });

   operators.add('or', function() {
    return ak.eq(s2, ak.or(s4, s5));
   });

   operators.add('sub', function() {
    var sub45 = ak.sub(s4, s5);
    var sub54 = ak.sub(s5, s4);

    return ak.ne(sub45, sub54) && ak.ne(sub45, s4) && ak.ne(sub54, s5)
        && ak.eq(ak.or(ak.or(sub45, sub54), ak.and(s4, s5)), ak.or(s4, s5))
        && ak.eq(ak.and(sub45, sub54), s7);
   });

   operators.add('xnor', function() {
    return ak.eq(ak.not(ak.xor(s4, s5)), ak.xnor(s4, s5));
   });

   operators.add('xor', function() {
    return ak.ne(ak.xor(s4, s5), ak.or(s4, s5))
        && ak.eq(ak.or(ak.xor(s4, s5), ak.and(s4, s5)), ak.or(s4, s5));
   });

   borelSet.add(init);
   borelSet.add(members);
   borelSet.add(operators);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   borelSet.add(load);
  }

  akTest.add(borelSet);
 }

 ak.using('Borel/BorelSet.js', define);
})();
