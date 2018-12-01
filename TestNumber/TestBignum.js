"use strict";

(function() {
 function define() {
  var bignum = {
   name: 'number.bignum',
   body: [],
   add: function(t) {this.body.push(t);}
  };

  try {
   var l00 = ak.mulDec(0, 0);
   var l01 = ak.mulDec(1, 0);
   var l02 = ak.mulDec(0, -1);
   var l03 = ak.mulDec(1, 1);
   var l04 = ak.mulDec( 9999999,  9999999);
   var l05 = ak.mulDec( 9999999, -9999999);
   var l06 = ak.mulDec(-1111111,  1111111);
   var l07 = ak.mulDec( 99999999,  99999999);
   var l08 = ak.mulDec( 99999999, -99999999);
   var l09 = ak.mulDec(-111111111, 111111111);
   var l10 = ak.mulDec( 99999999999999,  99999999999999);
   var l11 = ak.mulDec( 999999999999999,  999999999999999);
   var l12 = ak.mulDec(-999999999999999,  999999999999999);
   var l13 = ak.mulDec( 999999999999999, -999999999999999);
   var l14 = ak.mulDec(1000000000000000, 1);
   var l15 = ak.mulDec(1, 1000000000000000);
   var l16 = ak.mulDec(ak.INFINITY, 1);
   var l17 = ak.mulDec(-1, ak.INFINITY);
   var l18 = ak.mulDec(ak.NaN, 0);
   var l19 = ak.mulDec(1, ak.NaN);
   var l20 = ak.mulDec(0, ak.INFINITY);
  
   var b00 = ak.bignum( 0);
   var b01 = ak.bignum( 1);
   var b02 = ak.bignum(-1);
   var b03 = ak.bignum( ak.DEC_MAX);
   var b04 = ak.bignum(-ak.DEC_MAX);
   var b05 = ak.bignum( ak.INFINITY);
   var b06 = ak.bignum(-ak.INFINITY);
   var b07 = ak.bignum( ak.INT_MAX+1);
   var b08 = ak.bignum(-ak.INT_MAX-1);
   var b09 = ak.bignum( ak.NaN);
   var b10 = ak.bignum([ 123456789012345, 987654321012345]);
   var b11 = ak.bignum([-123456789012345, 987654321012345]);
   var b12 = ak.bignum([ 123456789012345,-987654321012345]);
   var b13 = ak.bignum([ 123456789012345, 9876543210123450]);
   var b14 = ak.bignum([ 123456789012345, ak.INFINITY]);
   var b15 = ak.bignum([ 123456789012345, ak.NaN]);
   var b16 = ak.bignum(' 123,456,789,012,345,987,654,321,012,345');
   var b17 = ak.bignum('-3,456,789,012,345,987,654,321,012,345');
   var b18 = ak.bignum(' 1,234,567,8-0,123,498,765,432,101,234');
   var b19 = ak.bignum(b10);
   var b20 = ak.bignum({size:2, at: function(i){return i===0 ? -123456789012345 : 987654321012345;}});
   var b21 = ak.bignum([0,0,0,123456789012345,987654321012345]);
   var b22 = ak.bignum([ 123456789012345, 987654321012345],  1);
   var b23 = ak.bignum([-123456789012345, 987654321012345], -1);
   var b24 = ak.bignum( ak.INT_MAX);
   var b25 = ak.bignum(-ak.INT_MAX);
   var b26 = ak.bignum([ 246913578024691, 975308642024690]);
   var b27 = ak.bignum([-246913578024691, 975308642024690]);
   var b28 = ak.bignum([ 123456789012345, 987654321012346]);
   var b29 = ak.bignum([-123456789012345, 987654321012344]);
   var b30 = ak.bignum([1, 0]);
   var b31 = ak.bignum([1, 1]);
   var b32 = ak.bignum([ 999999999999998, 1]);
   var b33 = ak.bignum([-999999999999998, 1]);
   var b34 = ak.bignum([ 999999999999999, 999999999999999]);
   var b35 = ak.bignum([-999999999999999, 999999999999999]);
   var b36 = ak.bignum([ 999999999999999, 999999999999998, 0, 1]);
   var b37 = ak.bignum([-999999999999999, 999999999999998, 0, 1]);
   var b38 = ak.bignum(9);
   var b39 = ak.bignum(3);
   var b40 = ak.bignum([333333333333333, 333333333333333]);
   var b41 = ak.bignum([1, 500000000000000]);
   var b42 = ak.bignum([500000000000000]);
   var b43 = ak.bignum([999999999999999]);
   var b44 = ak.bignum([999999999999998, 0]);
   var b45 = ak.bignum([999999999999998]);
   var b46 = ak.bignum( ak.INT_MAX-1);
   var b47 = ak.bignum(-ak.INT_MAX+1);
  
   var free = {
    name: 'free',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   free.add('mulDec - zero',  function(){return l00.sign===0 && l00.hi===0 && l00.lo===0 && l01.sign===0 && l01.hi===0 && l01.lo===0 && l02.sign===0 && l02.hi===0 && l02.lo===0;});
   free.add('mulDec - small', function(){return l03.sign===1 && l03.hi===0 && l03.lo===1 && l04.sign===1 && l04.hi===0 && l04.lo===99999980000001 && l05.sign===-1 && l05.hi===0 && l05.lo===99999980000001 && l06.sign===-1 && l06.hi===0 && l06.lo===1234567654321;});
   free.add('mulDec - mid',   function(){return l07.sign===1 && l07.hi===9 && l07.lo===999999800000001 && l08.sign===-1 && l08.hi===9 && l08.lo===999999800000001 && l09.sign===-1 && l09.hi===12 && l09.lo===345678987654321 && l10.sign===1 && l10.hi===9999999999999 && l10.lo===800000000000001;});
   free.add('mulDec - big',   function(){return l11.sign===1 && l11.hi===999999999999998 && l11.lo===1 && l12.sign===-1 && l12.hi===999999999999998 && l12.lo===1 && l13.sign===-1 && l13.hi===999999999999998 && l13.lo===1;});
   free.add('mulDec - over',  function(){return l14.sign===1 && l14.hi===ak.INFINITY && l14.lo===ak.INFINITY && l15.sign===1 && l15.hi===ak.INFINITY && l15.lo===ak.INFINITY;});
   free.add('mulDec - inf',   function(){return l16.sign===1 && l16.hi===ak.INFINITY && l16.lo===ak.INFINITY && l17.sign===-1 && l17.hi===ak.INFINITY && l17.lo===ak.INFINITY;});
   free.add('mulDec - NaN',   function(){return isNaN(l18.sign) && isNaN(l18.hi) && isNaN(l18.lo) && isNaN(l19.sign) && isNaN(l19.hi) && isNaN(l19.lo) && isNaN(l20.sign) && isNaN(l20.hi) && isNaN(l20.lo);});
  
   var init = {
    name: 'init',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   init.add('number - zero',  function(){return ak.type(b00)===ak.BIGNUM_T && b00.size()===1 && b00.at(0)===0;});
   init.add('number - unit',  function(){return ak.type(b01)===ak.BIGNUM_T && b01.size()===1 && b01.at(0)===1 && ak.type(b02)===ak.BIGNUM_T && b02.size()===1 && b02.at(0)===-1;});
   init.add('number - limit', function(){return ak.type(b03)===ak.BIGNUM_T && b03.size()===1 && b03.at(0)===ak.DEC_MAX && ak.type(b04)===ak.BIGNUM_T && b04.size()===1 && b04.at(0)===-ak.DEC_MAX && ak.type(b24)===ak.BIGNUM_T && b24.size()===2 && b24.at(0)===9 && b24.at(1)===7199254740991 && ak.type(b25)===ak.BIGNUM_T && b25.size()===2 && b25.at(0)===-9 && b25.at(1)===7199254740991 && ak.type(b46)===ak.BIGNUM_T && b46.size()===2 && b46.at(0)===9 && b46.at(1)===7199254740990 && ak.type(b47)===ak.BIGNUM_T && b47.size()===2 && b47.at(0)===-9 && b47.at(1)===7199254740990;});
   init.add('number - inf',   function(){return ak.type(b05)===ak.BIGNUM_T && b05.size()===1 && b05.at(0)===ak.INFINITY && ak.type(b06)===ak.BIGNUM_T && b06.size()===1 && b06.at(0)===-ak.INFINITY;});
   init.add('number - NaN',   function(){return ak.type(b07)===ak.BIGNUM_T && b07.size()===1 && isNaN(b07.at(0)) && ak.type(b08)===ak.BIGNUM_T && b08.size()===1 && isNaN(b08.at(0)) && ak.type(b09)===ak.BIGNUM_T && b09.size()===1 && isNaN(b09.at(0));});
   init.add('array',          function(){return ak.type(b10)===ak.BIGNUM_T && b10.size()===2 && b10.at(0)===123456789012345 && b10.at(1)===987654321012345 && ak.type(b11)===ak.BIGNUM_T && b11.size()===2 && b11.at(0)===-123456789012345 && b11.at(1)===987654321012345;});
   init.add('array - sign',   function(){return ak.type(b22)===ak.BIGNUM_T && b22.size()===2 && b22.at(0)===123456789012345 && b22.at(1)===987654321012345 && ak.type(b23)===ak.BIGNUM_T && b23.size()===2 && b23.at(0)===123456789012345 && b23.at(1)===987654321012345;});
   init.add('array - NaN',    function(){return ak.type(b12)===ak.BIGNUM_T && b12.size()===1 && isNaN(b12.at(0)) && ak.type(b13)===ak.BIGNUM_T && b13.size()===1 && isNaN(b13.at(0)) && ak.type(b14)===ak.BIGNUM_T && b14.size()===1 && isNaN(b14.at(0)) && ak.type(b15)===ak.BIGNUM_T && b15.size()===1 && isNaN(b15.at(0));});
   init.add('string',         function(){return ak.type(b16)===ak.BIGNUM_T && b16.size()===2 && b16.at(0)===123456789012345 && b16.at(1)===987654321012345 && ak.type(b17)===ak.BIGNUM_T && b17.size()===2 && b17.at(0)===-3456789012345 && b17.at(1)===987654321012345;});
   init.add('string - NaN',   function(){return ak.type(b18)===ak.BIGNUM_T && b18.size()===1 && isNaN(b18.at(0));});
   init.add('bignum',         function(){return ak.type(b19)===ak.BIGNUM_T && b19.size()===2 && b19.at(0)===123456789012345 && b19.at(1)===987654321012345;});
   init.add('object',         function(){return ak.type(b20)===ak.BIGNUM_T && b20.size()===2 && b20.at(0)===-123456789012345 && b20.at(1)===987654321012345;});
   init.add('normalise',      function(){return ak.type(b21)===ak.BIGNUM_T && b21.size()===2 && b21.at(0)===123456789012345 && b21.at(1)===987654321012345;});
  
   var members = {
    name: 'members',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   members.add('at',       function(){return b26.size()===b26.toArray().length && b26.at(0)===b26.toArray()[0] && b26.at(1)===b26.toArray()[1];});
   members.add('toArray',  function(){var a=b10.toArray(); return a.length===2 && a[0]===123456789012345 && a[1]===987654321012345;});
   members.add('toNumber', function(){return b10.toNumber()=== 123456789012345980000000000000  && b11.toNumber()=== -123456789012345980000000000000;});
   members.add('toString', function(){return b00.toString()==='0' && b10.toString()==='123456789012345987654321012345' && b11.toString()==='-123456789012345987654321012345' && b30.toString()=='1000000000000000';});
   members.add('valueOf',  function(){return isNaN(1 + b01);});
  
   var operators = {
    name: 'operators',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   operators.add('abs',         function(){return ak.eq(ak.abs(b02), b01) && ak.eq(ak.abs(b11), b10) && isNaN(ak.abs(b09).at(0));});
   operators.add('neg',         function(){return ak.eq(ak.neg(b02), b01) && ak.eq(ak.neg(b11), b10);});
  
   operators.add('add',         function(){return ak.eq(ak.add(b10, b10), b26) && ak.eq(ak.add(b10, b11), b00) && ak.eq(ak.add(b11, b10), b00) && ak.eq(ak.add(b11, b11), b27) && ak.eq(ak.add(b01, b02), b00) && ak.eq(ak.add(b10, b00), b10) && ak.eq(ak.add(b10, b01), b28) && ak.eq(ak.add(b11, b01), b29) && ak.eq(ak.add(b28, b02), b10) && ak.eq(ak.add(b29, b02), b11) && ak.eq(ak.add(b10, b05), b05) && ak.eq(ak.add(b10, b06), b06) && isNaN(ak.add(b10, b09).at(0));});
   operators.add('cmp',         function(){return ak.cmp(b10, b10)===0 && ak.cmp(b11, b10)<0 && ak.cmp(b10, b11)>0 && isNaN(ak.cmp(b09, b01));});
   operators.add('div - zero',  function(){return  ak.eq(ak.div(b00, b10), b00) && ak.eq(ak.div(b10, b05), b00) && ak.eq(ak.div(b10, b34), b00);});
   operators.add('div - unit',  function(){return  ak.eq(ak.div(b32, b01), b32) && ak.eq(ak.div(b32, b02), b33) && ak.eq(ak.div(b33, b02), b32);});
   operators.add('div - inf',   function(){return  ak.eq(ak.div(b32, b00), b05) && ak.eq(ak.div(b05, b33), b06);});
   operators.add('div - NaN',   function(){return  isNaN(ak.div(b00, b00).at(0)) && isNaN(ak.div(b05, b06).at(0)) && isNaN(ak.div(b09, b32).at(0)) && isNaN(ak.div(b32, b09).at(0));});
   operators.add('div - small', function(){return  ak.eq(ak.div(b38, b39), b39);});
   operators.add('div - mid',   function(){return  ak.eq(ak.div(b31, b30), b01) && ak.eq(ak.div(b41, b42), b39) && ak.eq(ak.div(b44, b43), b45);});
   operators.add('div - big',   function(){return  ak.eq(ak.div(b36, b34), b34) && ak.eq(ak.div(b36, b35), b35) && ak.eq(ak.div(b37, b34), b35) && ak.eq(ak.div(b37, b35), b34) && ak.eq(ak.div(b34, b39), b40) && ak.eq(ak.div(b34, b40), b39);});
   operators.add('le',          function(){return  ak.le(b10, b10) &&  ak.le(b11, b10) && !ak.le(b10, b11);});
   operators.add('lt',          function(){return !ak.lt(b10, b10) &&  ak.lt(b11, b10) && !ak.lt(b10, b11);});
   operators.add('eq',          function(){return  ak.eq(b10, b16) && !ak.eq(b01, b10) && !ak.eq(b10, b11);});
   operators.add('ge',          function(){return  ak.ge(b10, b10) && !ak.ge(b11, b10) &&  ak.ge(b10, b11);});
   operators.add('gt',          function(){return !ak.gt(b10, b10) && !ak.gt(b11, b10) &&  ak.gt(b10, b11);});
   operators.add('ne',          function(){return !ak.ne(b10, b16) &&  ak.ne(b01, b10) &&  ak.ne(b10, b11);});
   operators.add('mod',         function(){return  ak.eq(ak.mod(b34, b39), b00) && ak.eq(ak.mod(b35, b39), b00) && ak.eq(ak.mod(b34, b30), b03) && ak.eq(ak.mod(b44, b43), b45);});
   operators.add('mul - zero',  function(){return  ak.eq(ak.mul(b00, b10), b00) && ak.eq(ak.mul(b10, b00), b00)});
   operators.add('mul - unit',  function(){return  ak.eq(ak.mul(b01, b10), b10) && ak.eq(ak.mul(b10, b01), b10) && ak.eq(ak.mul(b02, b10), b11) && ak.eq(ak.mul(b10, b02), b11) && ak.eq(ak.mul(b01, b11), b11) && ak.eq(ak.mul(b11, b01), b11) && ak.eq(ak.mul(b02, b11), b10) && ak.eq(ak.mul(b11, b02), b10)});
   operators.add('mul - inf',   function(){return  ak.eq(ak.mul(b01, b05), b05) && ak.eq(ak.mul(b02, b05), b06) && ak.eq(ak.mul(b01, b06), b06) && ak.eq(ak.mul(b02, b06), b05) && ak.eq(ak.mul(b10, b05), b05) && ak.eq(ak.mul(b11, b05), b06) && ak.eq(ak.mul(b10, b06), b06) && ak.eq(ak.mul(b11, b06), b05) && ak.eq(ak.mul(b05, b05), b05) && ak.eq(ak.mul(b06, b06), b05) && ak.eq(ak.mul(b05, b06), b06) && ak.eq(ak.mul(b06, b05), b06);});
   operators.add('mul - NaN',   function(){return  isNaN(ak.mul(b00, b09).at(0)) && isNaN(ak.mul(b09, b01).at(0)) && isNaN(ak.mul(b00, b05).at(0)) && isNaN(ak.mul(b06, b00).at(0)) && isNaN(ak.mul(b09, b10).at(0)) && isNaN(ak.mul(b11, b09).at(0));});
   operators.add('mul - small', function(){return  ak.eq(ak.mul(b01, b03), b03) && ak.eq(ak.mul(b03, b02), b04);});
   operators.add('mul - mid',   function(){return  ak.eq(ak.mul(b03, b03), b32) && ak.eq(ak.mul(b03, b04), b33) && ak.eq(ak.mul(b04, b04), b32) && ak.eq(ak.mul(b04, b03), b33);});
   operators.add('mul - big',   function(){return  ak.eq(ak.mul(b34, b34), b36) && ak.eq(ak.mul(b35, b35), b36) && ak.eq(ak.mul(b34, b35), b37) && ak.eq(ak.mul(b35, b34), b37);});
   operators.add('sub',         function(){return  ak.eq(ak.sub(b10, b10), b00) && ak.eq(ak.sub(b10, b11), b26) && ak.eq(ak.sub(b11, b10), b27) && ak.eq(ak.sub(b11, b11), b00) && ak.eq(ak.sub(b01, b01), b00) && ak.eq(ak.sub(b10, b00), b10) && ak.eq(ak.sub(b10, b02), b28) && ak.eq(ak.sub(b11, b02), b29) && ak.eq(ak.sub(b28, b01), b10) && ak.eq(ak.sub(b29, b01), b11) && ak.eq(ak.sub(b10, b05), b06) && ak.eq(ak.sub(b10, b06), b05) && ak.eq(ak.sub(b30, b31), b02) && ak.eq(ak.sub(b31, b30), b01) && isNaN(ak.sub(b10, b09).at(0));});
  
   bignum.add(free);
   bignum.add(init);
   bignum.add(members);
   bignum.add(operators);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   bignum.add(load);
  }

  akTest.add(bignum);
 }

 ak.using('Number/Bignum.js', define);
})();