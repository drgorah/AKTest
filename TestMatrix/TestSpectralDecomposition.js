"use strict";

(function() {
 function define() {
  var spectralDecomposition = {
   name: 'matrix.spectralDecomposition',
   body: [],
   add: function(t) {this.body.push(t);}
  };

  try {
   var eps = 10*Math.pow(ak.EPSILON, 0.75);
  
   var v0 = ak.vector([1, 2]);
   var v1 = ak.vector([2, 1, 3]);
  
   var m0 = ak.matrix(3, 3, [1, 2, 5, 2, 4, 8, 3, 1, 2]);
   var m1 = ak.mul(ak.transpose(m0), m0);
   var m2 = ak.div(ak.matrix([[1,1],[1,-1]]), Math.sqrt(2));
   var m3 = ak.mul(ak.mul(m2, ak.matrix('diagonal', v0)), ak.transpose(m2));
  
   var s1 = ak.spectralDecomposition(m1);
   var s2 = ak.spectralDecomposition(m1, 1e-4);
   var s3 = ak.spectralDecomposition(m2, v0);
   var s4 = ak.spectralDecomposition(s3);
   var s5 = ak.spectralDecomposition({v:m2, lambda:v0});
  
   var m4 = ak.mul(m1, s1.v());
   var m5 = ak.matrix(3, 2, [2, 1, 3, 1, -2, 2]);
   var m6 = ak.div(m1, ak.det(m1));
   var m7 = ak.matrix(3, 3, [1/Math.sqrt(6), 2/Math.sqrt(6), 1/Math.sqrt(6), 1/Math.sqrt(3), -1/Math.sqrt(3), 1/Math.sqrt(3), -1/Math.sqrt(2), 0, 1/Math.sqrt(2)]);
  
   var s6 = ak.spectralDecomposition(m6);
   var s7 = ak.spectralDecomposition(ak.transpose(m7), ak.vector([0.4, 0.1, 0.7]));

   var m8 = ak.matrix(6, 6, Math.random); m8 = ak.add(m8, ak.transpose(m8));
   var s8 = ak.spectralDecomposition(m8);
   var j8 = ak.jacobiDecomposition(m8);

   var i;
   var a9 = m8.toArray(); for(i=0;i<5;++i) a9[5][i] = a9[i][5] = 0;
   var m9 = ak.matrix(a9);
   var s9 = ak.spectralDecomposition(m9);
   var j9 = ak.jacobiDecomposition(m9);

   var m10 = ak.matrix(2, 2, Math.random); m10 = ak.add(m10, ak.transpose(m10));
   var s10 = ak.spectralDecomposition(m10);
   var j10 = ak.jacobiDecomposition(m10);

   function versusJacobi(m, sm, jm) {
    var n = m.cols();
    var sa = ak.transpose(sm.v()).toArray();
    var ja = ak.transpose(jm.v()).toArray();
    var sp = new Array(n);
    var jp = new Array(n);
    var i, j, dl, dv, ss, js, sv, jv;

    for(i=0;i<n;++i) sp[i] = jp[i] = i;
    sp.sort(function(i0,i1){return Math.abs(sm.lambda().at(i0))-Math.abs(sm.lambda().at(i1));});
    jp.sort(function(i0,i1){return Math.abs(jm.lambda().at(i0))-Math.abs(jm.lambda().at(i1));});

    for(i=0;i<n;++i) {
     dl = ak.diff(sm.lambda().at(sp[i]), jm.lambda().at(jp[i]));

     if(sm.lambda().at(sp[i])===0) {
      dv = 0.0;
     }
     else {
      for(j=0;j<n && sa[sp[i]][j]===0;++j);
      ss = j<n && sa[sp[i]][j]<0 ? -1 : 1;

      for(j=0;j<n && ja[jp[i]][j]===0;++j);
      js = j<n && ja[jp[i]][j]<0 ? -1 : 1;

      sv = ak.vector(sa[sp[i]]); if(ss===-1) sv = ak.neg(sv);
      jv = ak.vector(ja[jp[i]]); if(js===-1) jv = ak.neg(jv);

      dv = ak.diff(sv, jv);
     }
     if(dl>100*eps || dv>100*eps) return false;
    }
    return true;
   }
  
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
  
   init.add('matrix', function(){return ak.type(s1)==ak.SPECTRAL_DECOMPOSITION_T && ak.dist(m1, s1.toMatrix())<=eps*ak.abs(m1);});
   init.add('matrix - eps', function(){return ak.type(s2)==ak.SPECTRAL_DECOMPOSITION_T && ak.dist(m1, s2.toMatrix())<=1e-4*ak.abs(m1);});
   init.add('matrix - vector', function(){return ak.type(s3)==ak.SPECTRAL_DECOMPOSITION_T && ak.dist(m3, s3.toMatrix())<=eps;});
   init.add('spectralDecomposition', function(){return ak.type(s4)==ak.SPECTRAL_DECOMPOSITION_T && ak.eq(s4.v(), s3.v()) && ak.eq(s4.lambda(), s3.lambda());});
   init.add('object', function(){return ak.type(s5)==ak.SPECTRAL_DECOMPOSITION_T && ak.eq(s5.v(), s3.v()) && ak.eq(s5.lambda(), s3.lambda());});
   init.add('correct', function(){return m4.at(0,0)/s1.v().at(0,0)-m4.at(1,0)/s1.v().at(1,0)<100*eps && m4.at(0,0)/s1.v().at(0,0)-m4.at(2,0)/s1.v().at(2,0)<100*eps
                                      && m4.at(0,1)/s1.v().at(0,1)-m4.at(1,1)/s1.v().at(1,1)<100*eps && m4.at(0,1)/s1.v().at(0,1)-m4.at(2,1)/s1.v().at(2,1)<100*eps
                                      && m4.at(0,2)/s1.v().at(0,2)-m4.at(1,2)/s1.v().at(1,2)<100*eps && m4.at(0,2)/s1.v().at(0,2)-m4.at(2,2)/s1.v().at(2,2)<100*eps;});
   init.add('versus jacobi', function(){return versusJacobi(m8, s8, j8) && versusJacobi(m9, s9, j9) && versusJacobi(m10, s10, j10);});
  
   var members = {
    name: 'members',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   members.add('v',             function(){return ak.eq(s3.v(), m2);});
   members.add('lambda',        function(){return ak.eq(s3.lambda(), v0);});
   members.add('toMatrix',      function(){return ak.dist(m3, s3.toMatrix())<=eps && ak.dist(m8, s8.toMatrix())<=eps && ak.dist(m9, s9.toMatrix())<=eps;});
   members.add('toString',      function(){return s3.toString()==='{v:'+m2.toString()+',lambda:'+v0.toString()+'}';});
   members.add('toExponential', function(){return s3.toExponential(2)==='{v:'+m2.toExponential(2)+',lambda:'+v0.toExponential(2)+'}';});
   members.add('toFixed',       function(){return s3.toFixed(2)==='{v:'+m2.toFixed(2)+',lambda:'+v0.toFixed(2)+'}';});
   members.add('toPrecision',   function(){return s3.toPrecision(2)==='{v:'+m2.toPrecision(2)+',lambda:'+v0.toPrecision(2)+'}';});
   members.add('valueOf',       function(){return isNaN(1 - s3);});
  
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
  
   operators.add('abs',  function(){return ak.dist(ak.abs(s1), ak.abs(m1)) <= 100*eps;});
   operators.add('acos', function(){return testFun(ak.acos, s7);});
   operators.add('asin', function(){return testFun(ak.asin, s7);});
   operators.add('atan', function(){return testFun(ak.atan, s7);});
   operators.add('cos',  function(){return testFun(ak.cos, s7);});
   operators.add('cosh', function(){return testFun(ak.cosh, s7);});
   operators.add('det',  function(){return ak.dist(ak.det(s1), ak.det(m1)) <= 200*eps;});
   operators.add('exp',  function(){return ak.dist(ak.exp(s7), ak.exp(s7.toMatrix())) <= 100*eps;});
   operators.add('inv',  function(){return ak.dist(ak.inv(s1), ak.inv(m1)) <= 100*eps;});
   operators.add('log',  function(){return testFun(ak.log, s7);});
   operators.add('neg',  function(){return ak.dist(ak.neg(s1), ak.neg(m1)) <= 100*eps;});
   operators.add('sin',  function(){return testFun(ak.sin, s7);});
   operators.add('sinh', function(){return testFun(ak.sinh, s7);});
   operators.add('sqrt', function(){return testFun(ak.sqrt, s7);});
   operators.add('tan',  function(){return testFun(ak.tan, s7);});
   operators.add('tanh', function(){return testFun(ak.tanh, s7);});
   operators.add('tr',   function(){return ak.dist(ak.tr(s1), ak.tr(m1))  <= 100*eps;});
  
   operators.add('divDR', function(){return ak.dist(ak.div(s1, 3), ak.div(m1, 3)) <= 100*eps;});
   operators.add('divMD', function(){return ak.dist(ak.div(m5, s1), ak.div(m5, m1)) <= 100*eps;});
   operators.add('divRD', function(){return ak.dist(ak.div(3, s1), ak.div(3, m1)) <= 100*eps;});
   operators.add('divVD', function(){return ak.dist(ak.div(v1, s1), ak.div(v1, m1)) <= 100*eps;});
   operators.add('powDR', function(){return ak.dist(ak.pow(s6, 3), ak.pow(m6, 3)) <= 100*eps;});
   operators.add('powRD', function(){return ak.dist(ak.pow(3, s6), ak.pow(3, m6)) <= 100*eps;});
  
   operators.add('stableInv',   function(){return ak.dist(ak.stableInv(s1, 1e-10), ak.inv(m1)) <= 1e-10;});
   operators.add('stableDivDR', function(){return ak.dist(ak.stableDiv(s1, 3, 1e-10), ak.div(m1, 3)) <= 1e-10;});
   operators.add('stableDivMD', function(){return ak.dist(ak.stableDiv(m5, s1, 1e-10), ak.div(m5, m1)) <= 1e-10;});
   operators.add('stableDivRD', function(){return ak.dist(ak.stableDiv(3, s1, 1e-10), ak.div(3, m1)) <= 1e-10;});
   operators.add('stableDivVD', function(){return ak.dist(ak.stableDiv(v1, s1, 1e-10), ak.div(v1, m1)) <= 1e-10;});
  
   spectralDecomposition.add(init);
   spectralDecomposition.add(members);
   spectralDecomposition.add(operators);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   spectralDecomposition.add(load);
  }

  akTest.add(spectralDecomposition);
 }

 ak.using(['Matrix/SpectralDecomposition.js','Matrix/JacobiDecomposition.js'], define);
})();
