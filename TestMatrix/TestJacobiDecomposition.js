"use strict";

(function() {
 function define() {
  var jacobiDecomposition = {
   name: 'matrix.jacobiDecomposition',
   body: [],
   add: function(t) {this.body.push(t);}
  };

  try {
   var eps = 10*ak.EPSILON;
  
   var v0 = ak.vector([1, 2]);
   var v1 = ak.vector([2, 1, 3]);
  
   var m0 = ak.matrix(3, 3, [1, 2, 5, 2, 4, 8, 3, 1, 2]);
   var m1 = ak.mul(ak.transpose(m0), m0);
   var m2 = ak.div(ak.matrix([[1,1],[1,-1]]), Math.sqrt(2));
   var m3 = ak.mul(ak.mul(m2, ak.matrix('diagonal', v0)), ak.transpose(m2));
  
   var j1 = ak.jacobiDecomposition(m1);
   var j2 = ak.jacobiDecomposition(m1, 1e-4);
   var j3 = ak.jacobiDecomposition(m2, v0);
   var j4 = ak.jacobiDecomposition(j3);
   var j5 = ak.jacobiDecomposition({v:m2, lambda:v0});
  
   var m4 = ak.mul(m1, j1.v());
   var m5 = ak.matrix(3, 2, [2, 1, 3, 1, -2, 2]);
   var m6 = ak.div(m1, ak.det(m1));
   var m7 = ak.matrix(3, 3, [1/Math.sqrt(6), 2/Math.sqrt(6), 1/Math.sqrt(6), 1/Math.sqrt(3), -1/Math.sqrt(3), 1/Math.sqrt(3), -1/Math.sqrt(2), 0, 1/Math.sqrt(2)]);
  
   var j6 = ak.jacobiDecomposition(m6);
   var j7 = ak.jacobiDecomposition(ak.transpose(m7), ak.vector([0.4, 0.1, 0.7]));
  
   function apply(f, v, l) {
    var i;
    l = l.toArray();
    for(i=0;i<v.length;++i) l[i] = f(l[i]);
    l = ak.matrix('diagonal', l);
    return ak.mul(ak.mul(v, l), ak.transpose(v));
   }
  
   var init = {
    name: 'init',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   init.add('matrix', function(){return ak.type(j1)==ak.JACOBI_DECOMPOSITION_T && ak.dist(m1, j1.toMatrix())<=eps*ak.abs(m1);});
   init.add('matrix - eps', function(){return ak.type(j2)==ak.JACOBI_DECOMPOSITION_T && ak.dist(m1, j2.toMatrix())<=1e-4*ak.abs(m1) && ak.dist(m1, j2.toMatrix())>1e-8*ak.abs(m1);});
   init.add('matrix - vector', function(){return ak.type(j3)==ak.JACOBI_DECOMPOSITION_T && ak.dist(m3, j3.toMatrix())<=eps;});
   init.add('jacobiDecomposition', function(){return ak.type(j4)==ak.JACOBI_DECOMPOSITION_T && ak.eq(j4.v(), j3.v()) && ak.eq(j4.lambda(), j3.lambda());});
   init.add('object', function(){return ak.type(j5)==ak.JACOBI_DECOMPOSITION_T && ak.eq(j5.v(), j3.v()) && ak.eq(j5.lambda(), j3.lambda());});
   init.add('correct', function(){return m4.at(0,0)/j1.v().at(0,0)-m4.at(1,0)/j1.v().at(1,0)<100*eps && m4.at(0,0)/j1.v().at(0,0)-m4.at(2,0)/j1.v().at(2,0)<100*eps
                                      && m4.at(0,1)/j1.v().at(0,1)-m4.at(1,1)/j1.v().at(1,1)<100*eps && m4.at(0,1)/j1.v().at(0,1)-m4.at(2,1)/j1.v().at(2,1)<100*eps
                                      && m4.at(0,2)/j1.v().at(0,2)-m4.at(1,2)/j1.v().at(1,2)<100*eps && m4.at(0,2)/j1.v().at(0,2)-m4.at(2,2)/j1.v().at(2,2)<100*eps;});
  
   var members = {
    name: 'members',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   members.add('v',             function(){return ak.eq(j3.v(), m2);});
   members.add('lambda',        function(){return ak.eq(j3.lambda(), v0);});
   members.add('toMatrix',      function(){return ak.dist(m3, j3.toMatrix())<=eps;});
   members.add('toString',      function(){return j3.toString()==='{v:'+m2.toString()+',lambda:'+v0.toString()+'}';});
   members.add('toExponential', function(){return j3.toExponential(2)==='{v:'+m2.toExponential(2)+',lambda:'+v0.toExponential(2)+'}';});
   members.add('toFixed',       function(){return j3.toFixed(2)==='{v:'+m2.toFixed(2)+',lambda:'+v0.toFixed(2)+'}';});
   members.add('toPrecision',   function(){return j3.toPrecision(2)==='{v:'+m2.toPrecision(2)+',lambda:'+v0.toPrecision(2)+'}';});
   members.add('valueOf',       function(){return isNaN(1 - j3);});
  
   var operators = {
    name: 'operators',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   function testFun(f, j) {
    var m0 = f(j);
    var l = j.lambda().toArray();
    var n = l.length;
    var i, m1;
  
    for(i=0;i<n;++i) l[i] = f(l[i]);
    m1 = ak.mul(j.v(), ak.mul(ak.matrix('diagonal', l), ak.transpose(j.v())));
  
    return ak.dist(m0, m1)<100*eps;
   }
  
   operators.add('abs',  function(){return ak.dist(ak.abs(j1), ak.abs(m1)) <= 100*eps;});
   operators.add('acos', function(){return testFun(ak.acos, j7);});
   operators.add('asin', function(){return testFun(ak.asin, j7);});
   operators.add('atan', function(){return testFun(ak.atan, j7);});
   operators.add('cos',  function(){return testFun(ak.cos, j7);});
   operators.add('cosh', function(){return testFun(ak.cosh, j7);});
   operators.add('det',  function(){return ak.dist(ak.det(j1), ak.det(m1)) <= 100*eps;});
   operators.add('exp',  function(){return ak.dist(ak.exp(j7), ak.exp(j7.toMatrix())) <= 100*eps;});
   operators.add('inv',  function(){return ak.dist(ak.inv(j1), ak.inv(m1)) <= 100*eps;});
   operators.add('log',  function(){return testFun(ak.log, j7);});
   operators.add('neg',  function(){return ak.dist(ak.neg(j1), ak.neg(m1)) <= 100*eps;});
   operators.add('sin',  function(){return testFun(ak.sin, j7);});
   operators.add('sinh', function(){return testFun(ak.sinh, j7);});
   operators.add('sqrt', function(){return testFun(ak.sqrt, j7);});
   operators.add('tan',  function(){return testFun(ak.tan, j7);});
   operators.add('tanh', function(){return testFun(ak.tanh, j7);});
   operators.add('tr',   function(){return ak.dist(ak.tr(j1), ak.tr(m1))  <= 100*eps;});
  
   operators.add('divDR', function(){return ak.dist(ak.div(j1, 3), ak.div(m1, 3)) <= 100*eps;});
   operators.add('divMD', function(){return ak.dist(ak.div(m5, j1), ak.div(m5, m1)) <= 100*eps;});
   operators.add('divRD', function(){return ak.dist(ak.div(3, j1), ak.div(3, m1)) <= 100*eps;});
   operators.add('divVD', function(){return ak.dist(ak.div(v1, j1), ak.div(v1, m1)) <= 100*eps;});
   operators.add('powDR', function(){return ak.dist(ak.pow(j6, 3), ak.pow(m6, 3)) <= 100*eps;});
   operators.add('powRD', function(){return ak.dist(ak.pow(3, j6), ak.pow(3, m6)) <= 100*eps;});
  
   operators.add('stableInv',   function(){return ak.dist(ak.stableInv(j1, 1e-10), ak.inv(m1)) <= 1e-10;});
   operators.add('stableDivDR', function(){return ak.dist(ak.stableDiv(j1, 3, 1e-10), ak.div(m1, 3)) <= 1e-10;});
   operators.add('stableDivMD', function(){return ak.dist(ak.stableDiv(m5, j1, 1e-10), ak.div(m5, m1)) <= 1e-10;});
   operators.add('stableDivRD', function(){return ak.dist(ak.stableDiv(3, j1, 1e-10), ak.div(3, m1)) <= 1e-10;});
   operators.add('stableDivVD', function(){return ak.dist(ak.stableDiv(v1, j1, 1e-10), ak.div(v1, m1)) <= 1e-10;});
  
   jacobiDecomposition.add(init);
   jacobiDecomposition.add(members);
   jacobiDecomposition.add(operators);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   jacobiDecomposition.add(load);
  }

  akTest.add(jacobiDecomposition);
 }

 ak.using('Matrix/JacobiDecomposition.js', define);
})();
