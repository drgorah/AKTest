"use strict";

(function() {
 function define() {
  var matrix = {
   name: 'matrix.matrix',
   body: [],
   add: function(t) {this.body.push(t);}
  };

  try {
   var eps = 2*ak.EPSILON;
  
   var m0  = ak.matrix(2, 3, [1, 2, 3, 4, 5, 6]);
   var m1  = ak.matrix(m0);
   var m2  = ak.matrix({rows: 3, cols: 2, at: function(r, c){return r+c;}});
   var m3  = ak.matrix(3, 2, function(r, c){return r+c;});
   var m4  = ak.matrix(2, 2, 1);
   var m5  = ak.matrix(2, 2);
   var m6  = ak.matrix([[1, 0], [0, 1]]);
   var m7  = ak.matrix([[1.1111, 0.022222], [333.33, 4.4444]]);
   var m8  = ak.matrix({rows: 2, cols: 3, at: function(r, c){return r+c;}});
   var m9  = ak.matrix(3, 3, [1, 2, 3, 4, 5, 6, 7, 8, 10]);
   var m10 = ak.matrix(3, 3, [1, 0, 0, 0, 1, 0, 0, 0, 1]);
   var m11 = ak.matrix([[0,1],[1,1]]);
   var m12 = ak.matrix([[1,0,0],[0,1,0],[0,0,1]]);
   var m13 = ak.matrix([[1,2],[2,3]]);
   var m14 = ak.matrix([[-3,2],[2,-1]]);
   var m15 = ak.matrix([[0,1,2],[0,0,-1],[0,0,0]]);
   var m16 = ak.matrix([[1,1,1.5],[0,1,-1],[0,0,1]]);
   var m17 = ak.matrix([[1,2],[2,4],[3,6]]);
   var m18 = ak.matrix([[1,0,0],[0,2,0],[0,0,3]]);
   var m19  = ak.matrix([[1, 2], [2, 4]]);
  
   var v0  = ak.vector([1, 2, 3]);
   var v1  = ak.vector([1, 2]);
  
   var init = {
    name: 'init',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   init.add('array',    function(){return ak.type(m0)==ak.MATRIX_T && m0.rows()===2 && m0.cols()===3 && m0.at(0, 0)===1 && m0.at(0, 1)===2 && m0.at(0, 2)===3 && m0.at(1, 0)===4 && m0.at(1, 1)===5 && m0.at(1, 2)===6;});
   init.add('matrix',   function(){return ak.type(m1)==ak.MATRIX_T && m1.rows()===2 && m1.cols()===3 && m1.at(0, 0)===1 && m1.at(0, 1)===2 && m1.at(0, 2)===3 && m1.at(1, 0)===4 && m1.at(1, 1)===5 && m1.at(1, 2)===6;});
   init.add('object',   function(){return ak.type(m2)==ak.MATRIX_T && m2.rows()===3 && m2.cols()===2 && m2.at(0, 0)===0 && m2.at(0, 1)===1 && m2.at(1, 0)===1 && m2.at(1, 1)===2 && m2.at(2, 0)===2 && m2.at(2, 1)===3;});
   init.add('function', function(){return ak.type(m3)==ak.MATRIX_T && m3.rows()===3 && m3.cols()===2 && m3.at(0, 0)===0 && m3.at(0, 1)===1 && m3.at(1, 0)===1 && m3.at(1, 1)===2 && m3.at(2, 0)===2 && m3.at(2, 1)===3;});
   init.add('number',   function(){return ak.type(m4)==ak.MATRIX_T && m4.rows()===2 && m4.cols()===2 && m4.at(0, 0)===1 && m4.at(0, 1)===1 && m4.at(1, 0)===1 && m4.at(1, 1)===1;});
   init.add('zero',     function(){return ak.type(m5)==ak.MATRIX_T && m5.rows()===2 && m5.cols()===2 && m5.at(0, 0)===0 && m5.at(0, 1)===0 && m5.at(1, 0)===0 && m5.at(1, 1)===0;});
   init.add('arrays',   function(){return ak.type(m6)==ak.MATRIX_T && m6.rows()===2 && m6.cols()===2 && m6.at(0, 0)===1 && m6.at(0, 1)===0 && m6.at(1, 0)===0 && m6.at(1, 1)===1;});
   init.add('identity', function(){return ak.eq(ak.matrix('identity', 3), m12);});
   init.add('diagonal', function(){return ak.eq(ak.matrix('diagonal', v0), m18) && ak.eq(ak.matrix('diagonal', 3, 1), m12);});
  
   var members = {
    name: 'members',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   members.add('at',            function(){return m0.at(0, 0)===1 && m0.at(0, 1)===2 && m0.at(0, 2)===3 && m0.at(1, 0)===4 && m0.at(1, 1)===5 && m0.at(1, 2)===6;});
   members.add('at - bad',      function(){return isNaN(m0.at(-1, -1)) && isNaN(m0.at(1.5, 1.5)) && isNaN(m0.at(4, 4)) && isNaN(m0.at('a', 'b'));});
   members.add('dims',          function(){return m0.rows()===2 && m0.cols()===3;});
   members.add('toArray',       function(){var m = m0.toArray(); return ak.type(m)===ak.ARRAY_T && m[0][0]===1 && m[0][1]===2 && m[0][2]===3 && m[1][0]===4 && m[1][1]===5 && m[1][2]===6;});
   members.add('toString',      function(){return m0.toString()==='[[1,2,3],[4,5,6]]';});
   members.add('toExponential', function(){return m7.toExponential(2)==='[[1.11e+0,2.22e-2],[3.33e+2,4.44e+0]]';});
   members.add('toFixed',       function(){return m7.toFixed(3)==='[[1.111,0.022],[333.330,4.444]]';});
   members.add('toPrecision',   function(){return m7.toPrecision(3)==='[[1.11,0.0222],[333,4.44]]';});
   members.add('valueOf',       function(){return isNaN(1 - m0);});
  
   var operators = {
    name: 'operators',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   operators.add('diff',       function(){return ak.diff(m0, m8)>eps && ak.diff(m0, m1)<eps;});
   operators.add('diffRM',     function(){try{ak.diff(1, m0);}catch(e){return true;} return false;});
   operators.add('diffMR',     function(){try{ak.diff(m0, 1);}catch(e){return true;} return false;});
   operators.add('diff - mis', function(){try{ak.diff(m0, m9);}catch(e){return true;} return false;});
  
   operators.add('abs',            function(){return ak.diff(ak.abs(m0), Math.sqrt(91))<eps;});
   operators.add('det',            function(){return ak.diff(ak.det(m9), -3)<Math.sqrt(eps);});
   operators.add('det - mis',      function(){try{ak.det(m0);}catch(e){return true;} return false;});
   operators.add('exp',            function(){return ak.diff(ak.exp(m15), m16)<Math.sqrt(eps);});
   operators.add('inv',            function(){return ak.diff(ak.mul(m9, ak.inv(m9)), m10)<Math.sqrt(eps) && ak.diff(ak.inv(m11), ak.matrix([[-1,1],[1,0]]))<Math.sqrt(eps);});
   operators.add('inv - mis',      function(){try{ak.inv(m0);}catch(e){return true;} return false;});
   operators.add('inv - sing',     function(){try{ak.inv(m19);}catch(e){return true;} return false;});
   operators.add('leftInv',        function(){return ak.diff(ak.mul(ak.leftInv(m3), m3), ak.matrix('identity', 2))<Math.sqrt(eps) && ak.eq(ak.leftInv(m9), ak.inv(m9));});
   operators.add('leftInv - mis',  function(){try{ak.leftInv(m0);}catch(e){return true;} return false;});
   operators.add('neg',            function(){return ak.eq(ak.neg(m0), ak.matrix([[-1, -2, -3], [-4, -5, -6]]));});
   operators.add('rightInv',       function(){return ak.diff(ak.mul(m0, ak.rightInv(m0)), ak.matrix('identity', 2))<Math.sqrt(eps) && ak.eq(ak.rightInv(m9), ak.inv(m9));});
   operators.add('rightInv - mis', function(){try{ak.rightInv(m3);}catch(e){return true;} return false;});
   operators.add('tr',             function(){return ak.diff(ak.tr(m9), 16)<eps;});
   operators.add('transpose',      function(){return ak.eq(ak.transpose(m0), ak.matrix([[1, 4], [2, 5], [3, 6]]));});
  
   operators.add('add',         function(){return ak.eq(ak.add(m4,m6), ak.matrix([[2,1],[1,2]]));});
   operators.add('addRM',       function(){try{ak.add(1, m0);}catch(e){return true;} return false;});
   operators.add('addMR',       function(){try{ak.add(m0, 1);}catch(e){return true;} return false;});
   operators.add('add - mis',   function(){try{ak.add(m0, m9);}catch(e){return true;} return false;});
   operators.add('dist',        function(){return ak.diff(ak.dist(m0, m8), Math.sqrt(30))<eps;});
   operators.add('distRM',      function(){try{ak.dist(1, m0);}catch(e){return true;} return false;});
   operators.add('distMR',      function(){try{ak.dist(m0, 1);}catch(e){return true;} return false;});
   operators.add('dist - mis',  function(){try{ak.dist(m0, m9);}catch(e){return true;} return false;});
   operators.add('div',         function(){return ak.diff(ak.div(ak.mul(m10, 2), m9), ak.mul(ak.inv(m9), ak.mul(m10, 2)))<Math.sqrt(eps) && ak.diff(ak.div(m4, m0), ak.mul(ak.rightInv(m0), m4))<Math.sqrt(eps);});
   operators.add('divRM',       function(){return ak.diff(ak.div(2, m9), ak.mul(2, ak.inv(m9)))<Math.sqrt(eps) && ak.diff(ak.div(2, m0), ak.mul(2, ak.rightInv(m0)))<Math.sqrt(eps);});
   operators.add('divMR',       function(){return ak.eq(ak.div(m0, 2), ak.matrix(2, 3, [0.5, 1, 1.5, 2, 2.5, 3]));});
   operators.add('divVM',       function(){return ak.diff(ak.div(v0, m9), ak.mul(ak.inv(m9), v0))<Math.sqrt(eps) && ak.diff(ak.div(v1, m0), ak.mul(ak.rightInv(m0), v1))<Math.sqrt(eps);});
   operators.add('eq',          function(){return ak.eq(m9, m9) && !ak.eq(m9, m10) && !ak.eq(m0, m10);});
   operators.add('mul',         function(){return ak.eq(ak.mul(m0, m3), ak.matrix([[8, 14], [17, 32]]));});
   operators.add('mulRM',       function(){return ak.eq(ak.mul(2, m0), ak.matrix(2, 3, [2, 4, 6, 8, 10, 12]));});
   operators.add('mulMR',       function(){return ak.eq(ak.mul(m0, 2), ak.matrix(2, 3, [2, 4, 6, 8, 10, 12]));});
   operators.add('mulVM',       function(){return ak.eq(ak.mul(v1, m0), ak.vector([9, 12, 15]));});
   operators.add('mulMV',       function(){return ak.eq(ak.mul(m0, v0), ak.vector([14, 32]));});
   operators.add('mul - mis',   function(){try{ak.dist(m0, m4);}catch(e){return true;} return false;});
   operators.add('mulVM - mis', function(){try{ak.dist(v0, m0);}catch(e){return true;} return false;});
   operators.add('mulMV - mis', function(){try{ak.dist(m0, v1);}catch(e){return true;} return false;});
   operators.add('ne',          function(){return !ak.ne(m9, m9) && ak.ne(m9, m10) && ak.ne(m0, m10);});
   operators.add('powMR',       function(){return ak.eq(ak.pow(m11, 3), m13) && ak.eq(ak.pow(m11, -3), m14);});
   operators.add('powRM',       function(){return ak.diff(ak.pow(3, m15), ak.exp(ak.mul(m15, Math.log(3))))<Math.sqrt(eps);});
   operators.add('sub',         function(){return ak.eq(ak.sub(m4,m6), ak.matrix([[0,1],[1,0]]));});
   operators.add('subRM',       function(){try{ak.sub(1, m0);}catch(e){return true;} return false;});
   operators.add('subMR',       function(){try{ak.sub(m0, 1);}catch(e){return true;} return false;});
   operators.add('sub - mis',   function(){try{ak.sub(m0, m9);}catch(e){return true;} return false;});
  
   operators.add('outerMul',   function(){return ak.eq(ak.outerMul(v0,v1),m17);});
  
   matrix.add(init);
   matrix.add(members);
   matrix.add(operators);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   matrix.add(load);
  }

  akTest.add(matrix);
 }

 ak.using('Matrix/Matrix.js', define);
})();
