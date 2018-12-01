"use strict";

(function() {
 function define() {
  var complexVector = {
   name: 'matrix.complexVector',
   body: [],
   add: function(t) {this.body.push(t);}
  };

  try {
   var eps = 2*ak.EPSILON;
  
   var cv0  = ak.complexVector([1, 2, 3]);
   var cv1  = ak.complexVector([1, 2, 3], [4, 5, 6]);
   var cv2  = ak.complexVector(ak.vector([1, 2, 3]));
   var cv3  = ak.complexVector(ak.vector([1, 2, 3]), ak.vector([4, 5, 6]));
   var cv4  = ak.complexVector({dims: 3, at: function(i){return i;}});
   var cv5  = ak.complexVector({dims: 3, at: function(i){return ak.complex(i, 2*i);}});
   var cv6  = ak.complexVector(3, function(i){return i*i;});
   var cv7  = ak.complexVector(3, function(i){return ak.complex(i*i, 2*i*i);});
   var cv8  = ak.complexVector(3, 1);
   var cv9  = ak.complexVector(3, 1, 2);
   var cv10 = ak.complexVector(3, ak.complex(3, 4));
   var cv11 = ak.complexVector(4);
   var cv12 = ak.complexVector(cv1);
   var cv13 = ak.complexVector([123.456789, 0.00987654], [0.0315432, 24321.342]);
   var cv14 = ak.complexVector([ak.complex(1, 4), ak.complex(2, 5), ak.complex(3, 6)]);
  
   var m0 = ak.matrix([[1, 2, 3], [2, 3, 4], [4, 5, 6]]);
   var m1 = ak.matrix([[1, 2, 3], [2, 4, 5], [3, 5, 6]]);
  
   var d1 = ak.jacobiDecomposition(m1);
   
   var init = {
    name: 'init',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   init.add('array', function(){return ak.type(cv0)===ak.COMPLEX_VECTOR_T && cv0.dims()===3 &&
                                       ak.type(cv0.at(0))===ak.COMPLEX_T && ak.eq(cv0.at(0), 1) &&
                                       ak.type(cv0.at(1))===ak.COMPLEX_T && ak.eq(cv0.at(1), 2) &&
                                       ak.type(cv0.at(2))===ak.COMPLEX_T && ak.eq(cv0.at(2), 3) &&
                                       ak.type(cv1)===ak.COMPLEX_VECTOR_T && cv1.dims()===3 &&
                                       ak.type(cv1.at(0))===ak.COMPLEX_T && ak.eq(cv1.at(0), ak.complex(1, 4)) &&
                                       ak.type(cv1.at(1))===ak.COMPLEX_T && ak.eq(cv1.at(1), ak.complex(2, 5)) &&
                                       ak.type(cv1.at(2))===ak.COMPLEX_T && ak.eq(cv1.at(2), ak.complex(3, 6)) &&
                                       ak.eq(cv1, cv14);});
  
   init.add('array - mis', function(){try{ak.complexVector([1,2], [1,2,3]);}catch(e){return true;} return false;});
  
   init.add('vector', function(){return ak.type(cv2)===ak.COMPLEX_VECTOR_T && cv2.dims()===3 &&
                                        ak.type(cv2.at(0))===ak.COMPLEX_T && ak.eq(cv2.at(0), 1) &&
                                        ak.type(cv2.at(1))===ak.COMPLEX_T && ak.eq(cv2.at(1), 2) &&
                                        ak.type(cv2.at(2))===ak.COMPLEX_T && ak.eq(cv2.at(2), 3) &&
                                        ak.type(cv3)===ak.COMPLEX_VECTOR_T && cv3.dims()===3 &&
                                        ak.type(cv3.at(0))===ak.COMPLEX_T && ak.eq(cv3.at(0), ak.complex(1, 4)) &&
                                        ak.type(cv3.at(1))===ak.COMPLEX_T && ak.eq(cv3.at(1), ak.complex(2, 5)) &&
                                        ak.type(cv3.at(2))===ak.COMPLEX_T && ak.eq(cv3.at(2), ak.complex(3, 6));});
  
   init.add('vector - mis', function(){try{ak.complexVector(ak.vector([1,2]), ak.vector([1,2,3]));}catch(e){return true;} return false;});
  
   init.add('object', function(){return ak.type(cv4)===ak.COMPLEX_VECTOR_T && cv4.dims()===3 &&
                                        ak.type(cv4.at(0))===ak.COMPLEX_T && ak.eq(cv4.at(0), 0) &&
                                        ak.type(cv4.at(1))===ak.COMPLEX_T && ak.eq(cv4.at(1), 1) &&
                                        ak.type(cv4.at(2))===ak.COMPLEX_T && ak.eq(cv4.at(2), 2) &&
                                        ak.type(cv5)===ak.COMPLEX_VECTOR_T && cv5.dims()===3 &&
                                        ak.type(cv5.at(0))===ak.COMPLEX_T && ak.eq(cv5.at(0), ak.complex(0, 0)) &&
                                        ak.type(cv5.at(1))===ak.COMPLEX_T && ak.eq(cv5.at(1), ak.complex(1, 2)) &&
                                        ak.type(cv5.at(2))===ak.COMPLEX_T && ak.eq(cv5.at(2), ak.complex(2, 4));});
  
   init.add('function', function(){return ak.type(cv6)===ak.COMPLEX_VECTOR_T && cv6.dims()===3 &&
                                          ak.type(cv6.at(0))===ak.COMPLEX_T && ak.eq(cv6.at(0), 0) &&
                                          ak.type(cv6.at(1))===ak.COMPLEX_T && ak.eq(cv6.at(1), 1) &&
                                          ak.type(cv6.at(2))===ak.COMPLEX_T && ak.eq(cv6.at(2), 4) &&
                                          ak.type(cv7)===ak.COMPLEX_VECTOR_T && cv7.dims()===3 &&
                                          ak.type(cv7.at(0))===ak.COMPLEX_T && ak.eq(cv7.at(0), ak.complex(0, 0)) &&
                                          ak.type(cv7.at(1))===ak.COMPLEX_T && ak.eq(cv7.at(1), ak.complex(1, 2)) &&
                                          ak.type(cv7.at(2))===ak.COMPLEX_T && ak.eq(cv7.at(2), ak.complex(4, 8));});
  
   init.add('number', function(){return ak.type(cv8)===ak.COMPLEX_VECTOR_T && cv8.dims()===3 &&
                                        ak.type(cv8.at(0))===ak.COMPLEX_T && ak.eq(cv8.at(0), 1) &&
                                        ak.type(cv8.at(1))===ak.COMPLEX_T && ak.eq(cv8.at(1), 1) &&
                                        ak.type(cv8.at(2))===ak.COMPLEX_T && ak.eq(cv8.at(2), 1) &&
                                        ak.type(cv9)===ak.COMPLEX_VECTOR_T && cv9.dims()===3 &&
                                        ak.type(cv9.at(0))===ak.COMPLEX_T && ak.eq(cv9.at(0), ak.complex(1, 2)) &&
                                        ak.type(cv9.at(1))===ak.COMPLEX_T && ak.eq(cv9.at(1), ak.complex(1, 2)) &&
                                        ak.type(cv9.at(2))===ak.COMPLEX_T && ak.eq(cv9.at(2), ak.complex(1, 2)) &&
                                        ak.type(cv10)===ak.COMPLEX_VECTOR_T && cv10.dims()===3 &&
                                        ak.type(cv10.at(0))===ak.COMPLEX_T && ak.eq(cv10.at(0), ak.complex(3, 4)) &&
                                        ak.type(cv10.at(1))===ak.COMPLEX_T && ak.eq(cv10.at(1), ak.complex(3, 4)) &&
                                        ak.type(cv10.at(2))===ak.COMPLEX_T && ak.eq(cv10.at(2), ak.complex(3, 4));});
  
   init.add('zero', function(){return ak.type(cv11)===ak.COMPLEX_VECTOR_T && cv11.dims()===4 &&
                                      ak.type(cv11.at(0))===ak.COMPLEX_T && ak.eq(cv11.at(0), 0) &&
                                      ak.type(cv11.at(1))===ak.COMPLEX_T && ak.eq(cv11.at(1), 0) &&
                                      ak.type(cv11.at(2))===ak.COMPLEX_T && ak.eq(cv11.at(2), 0) &&
                                      ak.type(cv11.at(3))===ak.COMPLEX_T && ak.eq(cv11.at(2), 0);});
  
   init.add('copy', function(){return ak.type(cv12)===ak.COMPLEX_VECTOR_T && cv12.dims()===3 &&
                                      ak.type(cv12.at(0))===ak.COMPLEX_T && ak.eq(cv12.at(0), ak.complex(1, 4)) &&
                                      ak.type(cv12.at(1))===ak.COMPLEX_T && ak.eq(cv12.at(1), ak.complex(2, 5)) &&
                                      ak.type(cv12.at(2))===ak.COMPLEX_T && ak.eq(cv12.at(2), ak.complex(3, 6));});
  
   var members = {
    name: 'members',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   members.add('at', function(){return ak.type(cv0.at(0))===ak.COMPLEX_T && ak.eq(cv0.at(0), 1) &&
                                       ak.type(cv0.at(1))===ak.COMPLEX_T && ak.eq(cv0.at(1), 2) &&
                                       ak.type(cv0.at(2))===ak.COMPLEX_T && ak.eq(cv0.at(2), 3);});
  
   members.add('at - bad', function(){return ak.type(cv0.at(-1))===ak.UNDEFINED_T &&
                                             ak.type(cv0.at(1.5))===ak.UNDEFINED_T &&
                                             ak.type(cv0.at(3))===ak.UNDEFINED_T &&
                                             ak.type(cv0.at('pop'))===ak.UNDEFINED_T;});
  
   members.add('dims', function(){return cv0.dims()===3;});
  
   members.add('re', function(){return ak.eq(cv1.re(), ak.vector([1,2,3]));});
   members.add('im', function(){return ak.eq(cv1.im(), ak.vector([4,5,6]));});
  
   members.add('toArray', function(){var a = cv1.toArray();
                                     return ak.type(a)===ak.ARRAY_T && a.length===3 &&
                                            ak.type(a[0])===ak.COMPLEX_T && ak.eq(a[0], ak.complex(1, 4)) &&
                                            ak.type(a[1])===ak.COMPLEX_T && ak.eq(a[1], ak.complex(2, 5)) &&
                                            ak.type(a[2])===ak.COMPLEX_T && ak.eq(a[2], ak.complex(3, 6));});
  
   members.add('toString', function(){return cv1.toString()==='[(1,4i),(2,5i),(3,6i)]';});
   members.add('toExponential', function(){return cv13.toExponential(2)==='[(1.23e+2,3.15e-2i),(9.88e-3,2.43e+4i)]';});
   members.add('toFixed', function(){return cv13.toFixed(3)==='[(123.457,0.032i),(0.010,24321.342i)]';});
   members.add('toPrecision', function(){return cv13.toPrecision(3)==='[(123,0.0315i),(0.00988,2.43e+4i)]';});
   members.add('valueOf',  function(){return isNaN(1 - cv0);});
  
   var operators = {
    name: 'operators',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   operators.add('diff',       function(){return ak.diff(cv1, cv2)>eps && ak.diff(cv1, cv3)<eps;});
   operators.add('diffRV',     function(){try{ak.diff(1, cv1);}catch(e){return true;} return false;});
   operators.add('diffVR',     function(){try{ak.diff(cv1, 1);}catch(e){return true;} return false;});
   operators.add('diff - mis', function(){try{ak.diff(cv1, cv13);}catch(e){return true;} return false;});
   operators.add('abs',        function(){return ak.diff(ak.abs(cv1), Math.sqrt(91))<eps;});
   operators.add('conj',       function(){return ak.eq(ak.conj(cv1), ak.complexVector([1, 2, 3], [-4, -5, -6]));});
   operators.add('conjV',      function(){return ak.eq(ak.conj(cv1.re()), ak.vector([1, 2, 3]));});
   operators.add('neg',        function(){return ak.eq(ak.neg(cv1), ak.complexVector([-1, -2, -3], [-4, -5, -6]));});
   operators.add('add',        function(){return ak.eq(ak.add(cv1,cv5), ak.complexVector([1, 3, 5], [4, 7, 10]));});
   operators.add('addVZ',      function(){return ak.eq(ak.add(cv1.re(),cv5), ak.complexVector([1, 3, 5], [0, 2, 4]));});
   operators.add('addZV',      function(){return ak.eq(ak.add(cv1,cv5.re()), ak.complexVector([1, 3, 5], [4, 5, 6]));});
   operators.add('addRZ',      function(){try{ak.add(1, cv1);}catch(e){return true;} return false;});
   operators.add('addZR',      function(){try{ak.add(cv1, 1);}catch(e){return true;} return false;});
   operators.add('add - mis',  function(){try{ak.add(cv1, cv13);}catch(e){return true;} return false;});
   operators.add('dist',       function(){return ak.diff(ak.dist(cv1,cv5), Math.sqrt(32))<eps;});
   operators.add('distVZ',     function(){return ak.diff(ak.dist(cv1.re(),cv5), Math.sqrt(23))<eps;});
   operators.add('distZV',     function(){return ak.diff(ak.dist(cv1,cv5.re()), Math.sqrt(80))<eps;});
   operators.add('distRZ',     function(){try{ak.dist(1, cv1);}catch(e){return true;} return false;});
   operators.add('distZR',     function(){try{ak.dist(cv1, 1);}catch(e){return true;} return false;});
   operators.add('dist - mis', function(){try{ak.dist(cv1, cv13);}catch(e){return true;} return false;});
   operators.add('divZC',      function(){return ak.diff(ak.mul(ak.div(cv1, ak.complex(2, -1)), ak.complex(2, -1)), cv1)<4*eps;});
   operators.add('divZR',      function(){return ak.diff(ak.mul(ak.div(cv1, 3), 3), cv1)<4*eps;});
   operators.add('divVC',      function(){return ak.diff(ak.mul(ak.div(cv1.re(), ak.complex(2, -1)), ak.complex(2, -1)), cv1.re())<4*eps;});
   operators.add('divZM',      function(){return ak.diff(ak.mul(m1, ak.div(cv1, m1)), cv1)<4*eps;});
   operators.add('divZD',      function(){return ak.diff(ak.mul(m1, ak.div(cv1, d1)), cv1)<4*eps && ak.diff(ak.mul(m1, ak.stableDiv(cv1, d1, 8*eps)), cv1)<10*eps;});
   operators.add('eq',         function(){return ak.eq(cv1, cv3) && !ak.eq(cv1, cv5) && !ak.eq(cv1, cv13);});
   operators.add('eqVZ',       function(){return ak.eq(ak.vector([1,2,3]), cv0) && !ak.eq(ak.vector([1,2,3]), cv5) && !ak.eq(ak.vector([1,2,3]), cv13);});
   operators.add('eqZV',       function(){return ak.eq(cv0, ak.vector([1,2,3])) && !ak.eq(cv1, ak.vector([1,2,3])) && !ak.eq(cv1, ak.vector([1,2,3,4]));});
   operators.add('mul',        function(){return ak.eq(ak.mul(cv1,cv5), ak.complex(-26, 33));});
   operators.add('mulVZ',      function(){return ak.eq(ak.mul(cv1.re(),cv5), ak.complex(8, 16));});
   operators.add('mulZV',      function(){return ak.eq(ak.mul(cv1,cv5.re()), ak.complex(8, 17));});
   operators.add('mulRZ',      function(){return ak.eq(ak.mul(2,cv5), ak.complexVector([0, 2, 4], [0, 4, 8]));});
   operators.add('mulZR',      function(){return ak.eq(ak.mul(cv1,3), ak.complexVector([3, 6, 9], [12, 15, 18]));});
   operators.add('mulCV',      function(){return ak.eq(ak.mul(ak.complex(3, 2), cv5.re()), ak.complexVector([0, 3, 6], [0, 2, 4]));});
   operators.add('mulVC',      function(){return ak.eq(ak.mul(cv1.re(), ak.complex(-1, 2)), ak.complexVector([-1, -2, -3], [2, 4, 6]));});
   operators.add('mulCZ',      function(){return ak.eq(ak.mul(ak.complex(3, 2), cv5), ak.complexVector([0, -1, -2], [0, 8, 16]));});
   operators.add('mulZC',      function(){return ak.eq(ak.mul(cv1, ak.complex(-1, 2)), ak.complexVector([-9, -12, -15], [-2, -1, 0]));});
   operators.add('mulMZ',      function(){return ak.eq(ak.mul(m0, cv1), ak.complexVector([14, 20, 32], [32, 47, 77]));});
   operators.add('mulZM',      function(){return ak.eq(ak.mul(cv1, m0), ak.complexVector([17, 23, 29], [38, 53, 68]));});
   operators.add('mul - mis',  function(){try{ak.mul(cv0, cv13);}catch(e){return true;} return false;});
   operators.add('ne',         function(){return !ak.ne(cv1, cv3) && ak.ne(cv1, cv5) && ak.ne(cv1, cv13);});
   operators.add('neVZ',       function(){return !ak.ne(ak.vector([1,2,3]), cv0) && ak.ne(ak.vector([1,2,3]), cv5) && ak.ne(ak.vector([1,2,3]), cv13);});
   operators.add('neZV',       function(){return !ak.ne(cv0, ak.vector([1,2,3])) && ak.ne(cv1, ak.vector([1,2,3])) && ak.ne(cv1, ak.vector([1,2,3,4]));});
   operators.add('sub',        function(){return ak.eq(ak.sub(cv1,cv5), ak.complexVector([1, 1, 1], [4, 3, 2]));});
   operators.add('subVZ',      function(){return ak.eq(ak.sub(cv1.re(),cv5), ak.complexVector([1, 1, 1], [0, -2, -4]));});
   operators.add('subZV',      function(){return ak.eq(ak.sub(cv1,cv5.re()), ak.complexVector([1, 1, 1], [4, 5, 6]));});
   operators.add('subRZ',      function(){try{ak.sub(1, cv1);}catch(e){return true;} return false;});
   operators.add('subZR',      function(){try{ak.sub(cv1, 1);}catch(e){return true;} return false;});
   operators.add('sub - mis',  function(){try{ak.sub(cv0, cv13);}catch(e){return true;} return false;});
  
   complexVector.add(init);
   complexVector.add(members);
   complexVector.add(operators);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   complexVector.add(load);
  }

  akTest.add(complexVector);
 }

 ak.using(['Matrix/ComplexVector.js', 'Matrix/JacobiDecomposition.js'], define);
})();
