"use strict";

(function() {
 function define() {
  var complexCholeskyDecomposition = {
   name: 'matrix.complexCholeskyDecomposition',
   body: [],
   add: function(t) {this.body.push(t);}
  };

  try {
   var eps = 10*ak.EPSILON;
  
   var l0 = ak.matrix([[1, 0, 0],[2, 3, 0],[4, 5, 6]]);
   var l1 = ak.matrix([[1, 0, 0],[2, 0, 0],[4, 5, 6]]);
   var l2 = ak.matrix([[1, 0, 0],[2, -3, 0],[4, -5, 6]]);
   var l3 = ak.complexMatrix([[1, 0, 0],[ak.complex(2, 3), 3, 0],[ak.complex(4, 5), ak.complex(5, 6), 6]]);
   var l4 = ak.complexMatrix([[0, 0, 0],[ak.complex(2, 3), 0, 0],[ak.complex(4, 5), ak.complex(5, 6), 6]]);
   var l5 = ak.complexMatrix([[1, 0, 0],[ak.complex(2, 3), -3, 0],[ak.complex(4, 5), ak.complex(-5, -6), 6]]);
   var l6 = ak.complexMatrix([[1, 0, 0],[ak.complex(2, 3), ak.complex(3, 4), 0],[ak.complex(4, 5), ak.complex(-5, 6), 6]]);
  
   var m0 = ak.mul(l0, ak.transpose(l0));
   var m1 = ak.mul(l1, ak.transpose(l1));
   var m2 = ak.matrix([[1, 2, 3],[2, -5, 6],[3, 6, 7]]);
   var m3 = ak.matrix([[1, 2, 3],[2, 5, 6]]);
   var m4 = ak.matrix([[1, 2, 3],[2, -5, 6]]);
   var m5 = ak.mul(l3, ak.adjoint(l3));
   var m6 = ak.mul(l4, ak.adjoint(l4));
   var m7 = ak.matrix([[1, 2, 3],[2, -5, 6],[3, 6, 7]]);
   var m8 = ak.matrix([[1, 2, 3],[2, 5, 6]]);
   var m9 = ak.matrix([[1, 2, 3],[2, -5, 6]]);
  
   var cm0 = ak.complexCholeskyDecomposition(m0);
   var cm1 = ak.complexCholeskyDecomposition(m5);
  
   var cl0 = ak.complexCholeskyDecomposition(l0);
   var cl1 = ak.complexCholeskyDecomposition(cl0);
   var cl2 = ak.complexCholeskyDecomposition(l2);
   var cl3 = ak.complexCholeskyDecomposition(l3);
   var cl4 = ak.complexCholeskyDecomposition(cl3);
   var cl5 = ak.complexCholeskyDecomposition(l5);
  
   var o0 = {l: l0};
   var o1 = {l: l2};
   var o2 = {l: l1};
   var o3 = {l: m0};
   var o4 = {l: l3};
   var o5 = {l: l5};
   var o6 = {l: l4};
   var o7 = {l: m5};
  
   var co0 = ak.complexCholeskyDecomposition(o0);
   var co1 = ak.complexCholeskyDecomposition(o1);
   var co2 = ak.complexCholeskyDecomposition(o4);
   var co3 = ak.complexCholeskyDecomposition(o5);
  
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
  
   init.add('matrix', function(){return ak.type(cl0)===ak.COMPLEX_CHOLESKY_DECOMPOSITION_T && ak.eq(cl0.l(), l0) && ak.type(cm0)===ak.COMPLEX_CHOLESKY_DECOMPOSITION_T && ak.dist(cm0.l(), l0)<eps*ak.abs(l0) && ak.type(cl2)===ak.COMPLEX_CHOLESKY_DECOMPOSITION_T && ak.eq(cl2.l(), l0);});
  
   init.add('complex matrix', function(){return ak.type(cl3)===ak.COMPLEX_CHOLESKY_DECOMPOSITION_T && ak.eq(cl3.l(), l3) && ak.type(cm1)===ak.COMPLEX_CHOLESKY_DECOMPOSITION_T && ak.dist(cm1.l(), l3)<eps*ak.abs(l3) && ak.type(cl5)===ak.COMPLEX_CHOLESKY_DECOMPOSITION_T && ak.eq(cl5.l(), l3);});
  
   function init_matrix_bad() {
    try {ak.complexCholeskyDecomposition(l1); return false;}
    catch(e){}
  
    try {ak.complexCholeskyDecomposition(m1); return false;}
    catch(e){}
  
    try {ak.complexCholeskyDecomposition(m2); return false;}
    catch(e){}
  
    try {ak.complexCholeskyDecomposition(m3); return false;}
    catch(e){}
  
    return true;
   }
  
   init.add('matrix - bad', init_matrix_bad);
  
   function init_complex_matrix_bad() {
    try {ak.complexCholeskyDecomposition(l4); return false;}
    catch(e){}
  
    try {ak.complexCholeskyDecomposition(m6); return false;}
    catch(e){}
  
    try {ak.complexCholeskyDecomposition(m7); return false;}
    catch(e){}
  
    try {ak.complexCholeskyDecomposition(m8); return false;}
    catch(e){}
  
    return true;
   }
  
   init.add('complex matrix - bad', init_complex_matrix_bad);
  
   init.add('choleskyDecomposition', function(){return ak.type(cl1)===ak.COMPLEX_CHOLESKY_DECOMPOSITION_T && ak.eq(cl1.l(), cl0.l());});
  
   init.add('complexCholeskyDecomposition', function(){return ak.type(cl4)===ak.COMPLEX_CHOLESKY_DECOMPOSITION_T && ak.eq(cl4.l(), cl3.l());});
  
   init.add('object', function(){return ak.type(co0)===ak.COMPLEX_CHOLESKY_DECOMPOSITION_T && ak.eq(co0.l(), l0) && ak.type(co1)===ak.COMPLEX_CHOLESKY_DECOMPOSITION_T && ak.eq(co1.l(), l0);});
  
   function init_object_bad() {
    try {ak.complexCholeskyDecomposition(o2); return false;}
    catch(e){}
  
    try {ak.complexCholeskyDecomposition(o3); return false;}
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
  
   operators.add('det',  function(){return ak.dist(ak.det(cm0), ak.det(m0)) <= 100*eps*ak.abs(m0) && ak.dist(ak.det(cm1), ak.det(m5)) <= 100*eps*ak.abs(m5);});
   operators.add('inv',  function(){return ak.dist(ak.inv(cm0), ak.inv(m0)) <= 100*eps*ak.abs(m0) && ak.dist(ak.inv(cm1), ak.inv(m5)) <= 100*eps*ak.abs(m5);});
  
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
  
   complexCholeskyDecomposition.add(init);
   complexCholeskyDecomposition.add(members);
   complexCholeskyDecomposition.add(operators);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   complexCholeskyDecomposition.add(load);
  }

  akTest.add(complexCholeskyDecomposition);
 }

 ak.using('Matrix/ComplexCholeskyDecomposition.js', define);
})();
