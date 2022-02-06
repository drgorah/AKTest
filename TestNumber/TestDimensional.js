"use strict";

(function() {
 function define() {
  var dimensional = {
   name: 'number.dimensional',
   body: [],
   add: function(t) {this.body.push(t);}
  };

  try {
   var m = ak.dimension('m');
   var s = ak.dimension('s');
   var s2 = ak.dimension('s', 2);
   var sm1 = ak.dimension('s', -1);
   var sm2 = ak.dimension('s', -2);

   var amsm1 = [m, sm1];
   var amsm2 = [m, sm2];

   var o1msm1 = {value:1, dimensions:amsm1};
   var o2msm1 = {value:function(){return 1;}, dimensions:amsm1};
   var o3msm1 = {value:function(){return 1;}, dimensions:function(){return 2;}, dimension:function(i){return amsm1[i];}};

   var dm = ak.dimensional(0.5, m);
   var ds = ak.dimensional(0.5, s);
   var ds2 = ak.dimensional(0.25, s2);
   var dmsm1 = ak.dimensional(1, amsm1);
   var dmsm2 = ak.dimensional(2, amsm2);
   var do1 = ak.dimensional(o1msm1);
   var do2 = ak.dimensional(o2msm1);
   var do3 = ak.dimensional(o3msm1);

   function bad() {
    try{ak.dimension(2, 2); return false;} catch(e){}
    try{ak.dimension('a', ak.INFINITY); return false;} catch(e){}

    try{ak.dimensional('a'); return false;} catch(e){}
    try{ak.dimensional('a', amsm1); return false;} catch(e){}
    try{ak.dimensional(2, 'a'); return false;} catch(e){}
    try{ak.dimensional(2, [m, 'a']); return false;} catch(e){}
    try{ak.dimensional(2, ['a', s]); return false;} catch(e){}
    try{ak.dimensional({value:'a', dimensions:amsm1}); return false;} catch(e){}
    try{ak.dimensional({value:2, dimensions:'a'}); return false;} catch(e){}
    try{ak.dimensional({value:2, dimensions:function(){return 2;}, dimension:'a'}); return false;} catch(e){}

    return true;
   }

   var init = {
    name: 'init',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   init.add('bad', bad);
   init.add('from array vs from object', function(){return ak.eq(dmsm1, do1) && ak.eq(dmsm1, do2) && ak.eq(dmsm1, do3);});
   init.add('copy', function(){return ak.eq(dmsm1, ak.dimensional(do1));});

   var members = {
    name: 'members',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   members.add('value', function(){return ds.value()===0.5 && dmsm2.value()===2;});
   members.add('dims', function(){return ds.dimensions()===1 && dmsm2.dimensions()===2;});
   members.add('dim', function(){return ds.dimension(0).unit==='s' && ds.dimension(0).power===1
                                     && dmsm2.dimension(0).unit==='m' && dmsm2.dimension(0).power===1
                                     && dmsm2.dimension(1).unit==='s' && dmsm2.dimension(1).power===-2;});
   members.add('toString', function(){return ds.toString()==='0.5 s' && dmsm2.toString()==='2 m s^-2';});

   var operators = {
    name: 'operators',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   operators.add('abs', function(){return ak.eq(ak.abs(ak.dimensional(-2, amsm2)), dmsm2);});
   operators.add('inv', function(){return ak.eq(ak.inv(ak.dimensional(0.5, [ak.dimension('m', -1), ak.dimension('s', 2)])), dmsm2);});
   operators.add('neg', function(){return ak.eq(ak.neg(ak.dimensional(-2, amsm2)), dmsm2) && ak.eq(ak.neg(dmsm2), ak.dimensional(-2, amsm2));});
   operators.add('sqrt', function(){return ak.eq(ak.sqrt(ak.dimensional(4, [ak.dimension('m', 2), ak.dimension('s', -4)])), dmsm2);});
   operators.add('add', function(){return ak.eq(ak.add(ak.dimensional(1, [ak.dimension('a', 2), ak.dimension('b', 1)]),
                                                       ak.dimensional(2, [ak.dimension('a', 2), ak.dimension('b', 1)])),
                                                ak.dimensional(3, [ak.dimension('a', 2), ak.dimension('b', 1)]));});
   operators.add('add - bad', function(){try{ak.add(ak.dimensional(1, [ak.dimension('a', 2), ak.dimension('b', 1)]),
                                                    ak.dimensional(2, [ak.dimension('a', 2), ak.dimension('c', 1)])); return false;} catch(e){return true;}});
   operators.add('cmp', function(){return ak.cmp(ak.dimensional(-1, amsm2), ak.dimensional(0, amsm2))<0
                                       && ak.cmp(ak.dimensional( 0, amsm2), ak.dimensional(0, amsm2))===0
                                       && ak.cmp(ak.dimensional( 1, amsm2), ak.dimensional(0, amsm2))>0;});
   operators.add('cmp - bad', function(){try{ak.cmp(ak.dimensional(1, [ak.dimension('a', 2), ak.dimension('b', 1)]),
                                                    ak.dimensional(2, ak.dimension('a', 2))); return false;} catch(e){return true;}});
   operators.add('dist', function(){return ak.eq(ak.dist(ak.dimensional(1.5, amsm2), ak.dimensional(2, amsm2)), ak.dimensional(0.5, amsm2));});
   operators.add('dist - bad', function(){try{ak.dist(ak.dimensional(1, [ak.dimension('a', 2), ak.dimension('b', 1)]),
                                                      ak.dimensional(2, [ak.dimension('a', 2), ak.dimension('c', 1)])); return false;} catch(e){return true;}});
   operators.add('div', function(){return ak.eq(ak.div(ak.dimensional(2, [ak.dimension('a', 2), ak.dimension('b', -1), ak.dimension('c', 3)]), ak.dimensional(4, [ak.dimension('b', 2), ak.dimension('c', -1), ak.dimension('d', 3)])), ak.dimensional(0.5, [ak.dimension('a', 2), ak.dimension('b', -3), ak.dimension('c', 4), ak.dimension('d', -3)]));});
   operators.add('lNumDiv', function(){return ak.eq(ak.div(ak.dimensional(4, [ak.dimension('a', 2), ak.dimension('b', 1)]), 2), ak.dimensional(2, [ak.dimension('a', 2), ak.dimension('b', 1)]));});
   operators.add('rNumDiv', function(){return ak.eq(ak.div(2, ak.dimensional(4, [ak.dimension('a', 2), ak.dimension('b', 1)])), ak.dimensional(0.5, [ak.dimension('a', -2), ak.dimension('b', -1)]));});
   operators.add('eq', function(){return ak.eq(ak.dimensional(1, amsm2), ak.dimensional(1, amsm2)) && !ak.eq(ak.dimensional(1, amsm2), ak.dimensional(2, amsm2)) && !ak.eq(ak.dimensional(1, amsm2), ak.dimensional(1, amsm1));});
   operators.add('ge', function(){return ak.ge(ak.dimensional(1, amsm2), ak.dimensional(0, amsm2)) && ak.ge(ak.dimensional(0, amsm2), ak.dimensional(0, amsm2)) && !ak.ge(ak.dimensional(-1, amsm2), ak.dimensional(0, amsm2));});
   operators.add('ge - bad', function(){try{ak.ge(ak.dimensional(1, [ak.dimension('a', 2), ak.dimension('b', 1)]),
                                                  ak.dimensional(2, ak.dimension('a', 2))); return false;} catch(e){return true;}});
   operators.add('gt', function(){return ak.gt(ak.dimensional(1, amsm2), ak.dimensional(0, amsm2)) && !ak.gt(ak.dimensional(0, amsm2), ak.dimensional(0, amsm2)) && !ak.gt(ak.dimensional(-1, amsm2), ak.dimensional(0, amsm2));});
   operators.add('gt - bad', function(){try{ak.gt(ak.dimensional(1, [ak.dimension('a', 2), ak.dimension('b', 1)]),
                                                  ak.dimensional(2, [ak.dimension('a', 2), ak.dimension('c', 1)])); return false;} catch(e){return true;}});
   operators.add('le', function(){return !ak.le(ak.dimensional(1, amsm2), ak.dimensional(0, amsm2)) && ak.le(ak.dimensional(0, amsm2), ak.dimensional(0, amsm2)) && ak.le(ak.dimensional(-1, amsm2), ak.dimensional(0, amsm2));});
   operators.add('le - bad', function(){try{ak.le(ak.dimensional(1, [ak.dimension('a', 2), ak.dimension('b', 1)]),
                                                  ak.dimensional(2, ak.dimension('a', 2))); return false;} catch(e){return true;}});
   operators.add('lt', function(){return !ak.lt(ak.dimensional(1, amsm2), ak.dimensional(0, amsm2)) && !ak.lt(ak.dimensional(0, amsm2), ak.dimensional(0, amsm2)) && ak.lt(ak.dimensional(-1, amsm2), ak.dimensional(0, amsm2));});
   operators.add('lt - bad', function(){try{ak.lt(ak.dimensional(1, [ak.dimension('a', 2), ak.dimension('b', 1)]),
                                                  ak.dimensional(2, [ak.dimension('a', 2), ak.dimension('c', 1)])); return false;} catch(e){return true;}});
   operators.add('mod', function(){return ak.eq(ak.mod(ak.dimensional(5, [ak.dimension('a', 2), ak.dimension('b', 1)]), 3), ak.dimensional(2, [ak.dimension('a', 2), ak.dimension('b', 1)]));});
   operators.add('mul', function(){return ak.eq(ak.mul(ak.dimensional(2, [ak.dimension('a', 2), ak.dimension('b', -1), ak.dimension('c', 3)]), ak.dimensional(3, [ak.dimension('b', 2), ak.dimension('c', -1), ak.dimension('d', 3)])), ak.dimensional(6, [ak.dimension('a', 2), ak.dimension('b', 1), ak.dimension('c', 2), ak.dimension('d', 3)]));});
   operators.add('lNumMul', function(){return ak.eq(ak.mul(ak.dimensional(4, [ak.dimension('a', 2), ak.dimension('b', 1)]), 2), ak.dimensional(8, [ak.dimension('a', 2), ak.dimension('b', 1)]));});
   operators.add('rNumMul', function(){return ak.eq(ak.mul(2, ak.dimensional(4, [ak.dimension('a', 2), ak.dimension('b', 1)])), ak.dimensional(8, [ak.dimension('a', 2), ak.dimension('b', 1)]));});
   operators.add('ne', function(){return !ak.ne(ak.dimensional(1, amsm2), ak.dimensional(1, amsm2)) && ak.ne(ak.dimensional(1, amsm2), ak.dimensional(2, amsm2)) && ak.ne(ak.dimensional(1, amsm2), ak.dimensional(1, amsm1));});
   operators.add('pow', function(){return ak.eq(ak.pow(ak.dimensional(5, [ak.dimension('a', 2), ak.dimension('b', 1)]), 3), ak.dimensional(125, [ak.dimension('a', 6), ak.dimension('b', 3)]));});
   operators.add('diff', function(){return ak.dimensionalDiff(ak.dimensional(1.5, amsm2), ak.dimensional(2, amsm2))===ak.diff(1.5, 2);});
   operators.add('diff - bad', function(){try{ak.dimensionalDiff(ak.dimensional(1, [ak.dimension('a', 2), ak.dimension('b', 1)]),
                                                                 ak.dimensional(2, ak.dimension('a', 2))); return false;} catch(e){return true;}});
   operators.add('sub', function(){return ak.eq(ak.sub(ak.dimensional(1, [ak.dimension('a', 2), ak.dimension('b', 1)]),
                                                       ak.dimensional(2, [ak.dimension('a', 2), ak.dimension('b', 1)])),
                                                ak.dimensional(-1, [ak.dimension('a', 2), ak.dimension('b', 1)]));});
   operators.add('sub - bad', function(){try{ak.sub(ak.dimensional(1, [ak.dimension('a', 2), ak.dimension('b', 1)]),
                                                    ak.dimensional(2, [ak.dimension('a', 2), ak.dimension('c', 1)])); return false;} catch(e){return true;}});

   dimensional.add(init);
   dimensional.add(members);
   dimensional.add(operators);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   dimensional.add(load);
  }

  akTest.add(dimensional);
 }

 ak.using('Number/Dimensional.js', define);
})();