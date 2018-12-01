"use strict";

(function() {
 function define() {
  var choleskyDecomposition = {
   name: 'matrix.choleskyDecomposition',
   body: [],
   add: function(t) {this.body.push(t);}
  };

  try {
   var eps = 10*ak.EPSILON;
  
   var l0 = ak.matrix([[1, 0, 0],[2, 3, 0],[4, 5, 6]]);
   var l1 = ak.matrix([[1, 0, 0],[2, 0, 0],[4, 5, 6]]);
   var l2 = ak.matrix([[1, 0, 0],[2, -3, 0],[4, -5, 6]]);
  
   var m0 = ak.mul(l0, ak.transpose(l0));
   var m1 = ak.mul(l1, ak.transpose(l1));
   var m2 = ak.matrix([[1, 2, 3],[2, -5, 6],[3, 6, 7]]);
   var m3 = ak.matrix([[1, 2, 3],[2, 5, 6]]);
   var m4 = ak.matrix([[1, 2, 3],[2, -5, 6]]);
  
   var cm0 = ak.choleskyDecomposition(m0);
  
   var cl0 = ak.choleskyDecomposition(l0);
   var cl1 = ak.choleskyDecomposition(cl0);
   var cl2 = ak.choleskyDecomposition(l2);
  
   var o0 = {l: l0};
   var o1 = {l: l2};
   var o2 = {l: l1};
   var o3 = {l: m0};
  
   var co0 = ak.choleskyDecomposition(o0);
   var co1 = ak.choleskyDecomposition(o1);
  
   var v0 = ak.vector([1, 2, 3]);
   var v1 = ak.vector([1, 2]);
  
   var z0 = ak.complexVector([ak.complex(1, 2), ak.complex(2, 3), ak.complex(3, 4)]);
   var z1 = ak.complexVector([ak.complex(1, 2), ak.complex(2, 3)]);
  
   var w0 = ak.complexMatrix([[ak.complex(1, 2), ak.complex(2, 3), ak.complex(3, 4)], [ak.complex(2, 1), ak.complex(4, 3), ak.complex(1, -4)], [ak.complex(-1, 3), ak.complex(2, -3), ak.complex(-2, 4)]]);
   var w1 = ak.complexMatrix([[ak.complex(1, 2), ak.complex(2, 3), ak.complex(3, 4)], [ak.complex(2, 1), ak.complex(4, 3), ak.complex(1, -4)]]);
  
   var init = {
    name: 'init',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   init.add('matrix', function(){return ak.type(cl0)===ak.CHOLESKY_DECOMPOSITION_T && ak.eq(cl0.l(), l0) && ak.type(cm0)===ak.CHOLESKY_DECOMPOSITION_T && ak.dist(cm0.l(), l0)<eps*ak.abs(l0) && ak.type(cl2)===ak.CHOLESKY_DECOMPOSITION_T && ak.eq(cl2.l(), l0);});
  
   function init_matrix_bad() {
    try {ak.choleskyDecomposition(l1); return false;}
    catch(e){}
  
    try {ak.choleskyDecomposition(m1); return false;}
    catch(e){}
  
    try {ak.choleskyDecomposition(m2); return false;}
    catch(e){}
  
    try {ak.choleskyDecomposition(m3); return false;}
    catch(e){}
  
    return true;
   }
  
   init.add('matrix - bad', init_matrix_bad);
  
   init.add('choleskyDecomposition', function(){return ak.type(cl1)===ak.CHOLESKY_DECOMPOSITION_T && ak.eq(cl1.l(), cl0.l());});
  
   init.add('object', function(){return ak.type(co0)===ak.CHOLESKY_DECOMPOSITION_T && ak.eq(co0.l(), l0) && ak.type(co1)===ak.CHOLESKY_DECOMPOSITION_T && ak.eq(co1.l(), l0);});
  
   function init_object_bad() {
    try {ak.choleskyDecomposition(o2); return false;}
    catch(e){}
  
    try {ak.choleskyDecomposition(o3); return false;}
    catch(e){}
  
    return true;
   }
  
   init.add('object - bad', init_object_bad);
  
   var members = {
    name: 'members',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   members.add('toMatrix',      function(){return ak.dist(m0, cm0.toMatrix())<=eps*ak.abs(m0);});
   members.add('toString',      function(){return cm0.toString()==='{l:'+cm0.l().toString()+'}';});
   members.add('toExponential', function(){return cm0.toExponential(2)==='{l:'+cm0.l().toExponential(2)+'}';});
   members.add('toFixed',       function(){return cm0.toFixed(2)==='{l:'+cm0.l().toFixed(2)+'}';});
   members.add('toPrecision',   function(){return cm0.toPrecision(2)==='{l:'+cm0.l().toPrecision(2)+'}';});
   members.add('valueOf',       function(){return isNaN(1 - cm0);});
  
   var operators = {
    name: 'operators',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   operators.add('det',  function(){return ak.dist(ak.det(cm0), ak.det(m0)) <= eps*ak.abs(m0);});
   operators.add('inv',  function(){return ak.dist(ak.inv(cm0), ak.inv(m0)) <= eps*ak.abs(m0);});
  
   operators.add('divMD', function(){return ak.dist(ak.div(m1, cm0), ak.div(m1, m0)) <= 100*eps;});
   operators.add('divRD', function(){return ak.dist(ak.div(2, cm0), ak.div(2, m0)) <= 100*eps;});
   operators.add('divVD', function(){return ak.dist(ak.div(v0, cm0), ak.div(v0, m0)) <= 100*eps;});
  
   operators.add('divMD - bad', function(){try{ak.div(m4, cm0)}catch(e){return true;} return false;});
   operators.add('divVD - bad', function(){try{ak.div(v1, cm0)}catch(e){return true;} return false;});
  
   operators.add('divWD', function(){return ak.dist(ak.div(w0, cm0), ak.div(w0, m0)) <= 100*eps;});
   operators.add('divCD', function(){return ak.dist(ak.div(ak.complex(2, 1), cm0), ak.div(ak.complex(2, 1), m0)) <= 100*eps;});
   operators.add('divZD', function(){return ak.dist(ak.div(z0, cm0), ak.div(z0, m0)) <= 100*eps;});
  
   operators.add('divWD - bad', function(){try{ak.div(w1, cm0)}catch(e){return true;} return false;});
   operators.add('divZD - bad', function(){try{ak.div(z1, cm0)}catch(e){return true;} return false;});
  
   choleskyDecomposition.add(init);
   choleskyDecomposition.add(members);
   choleskyDecomposition.add(operators);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   choleskyDecomposition.add(load);
  }

  akTest.add(choleskyDecomposition);
 }

 ak.using(['Matrix/CholeskyDecomposition.js', 'Matrix/ComplexMatrix.js'], define);
})();
