"use strict";

(function() {
 function define() {
  var complexMatrix = {
   name: 'matrix.complexMatrix',
   body: [],
   add: function(t) {this.body.push(t);}
  };

  try {
   var eps = 2*ak.EPSILON;
  
   var z0 = ak.complex(1.0, -2.0);
  
   var v0 = ak.vector([5, 6]);
   var v1 = ak.vector([7, 8, 9]);
  
   var cv0 = ak.complexVector([ak.complex(1, 4), ak.complex(2, 5), ak.complex(3, 6)]);
   var cv1 = ak.complexVector([ak.complex(-1, -2), ak.complex(3, 4)]);
   var cv2 = ak.complexVector([ak.complex(23, 67), ak.complex(34, 78)]);
   var cv3 = ak.complexVector([ak.complex(17, 61), ak.complex(39, 83)]);
   var cv4 = ak.complexVector([ak.complex(-10, 26), ak.complex(-10, 30)]);
   var cv5 = ak.complexVector([ak.complex(-9, 19), ak.complex(-9, 27)]);
  
   var m0 = ak.matrix([[1, 2], [3, 4]]);
   var m1 = ak.matrix([[5, 6], [7, 8]]);
   var m2 = ak.matrix([[1, 2], [2, 3]]);
  
   var d2 = ak.jacobiDecomposition(m2);
  
   var cm0  = ak.complexMatrix([[1, 2], [3, 4]]);
   var cm1  = ak.complexMatrix([[ak.complex(1, 5), ak.complex(2, 6)], [ak.complex(3, 7), ak.complex(4, 8)]]);
   var cm2  = ak.complexMatrix([[1, 2], [3, 4]], [[5, 6], [7, 8]]);
   var cm3  = ak.complexMatrix(2, 3, [1, 2, 3, 4, 5, 6]);
   var cm4  = ak.complexMatrix(2, 3, [ak.complex(1, 7), ak.complex(2, 8), ak.complex(3, 9), ak.complex(4, 10), ak.complex(5, 11), ak.complex(6, 12)]);
   var cm5  = ak.complexMatrix(2, 3, [1, 2, 3, 4, 5, 6], [7, 8, 9, 10, 11, 12]);
   var cm6  = ak.complexMatrix(3, 2, function(r, c){return r+c;});
   var cm7  = ak.complexMatrix(3, 2, function(r, c){return ak.complex(r+c, r+2*c);});
   var cm8  = ak.complexMatrix(2, 2);
   var cm9  = ak.complexMatrix(2, 2, 1);
   var cm10 = ak.complexMatrix(2, 2, ak.complex(1, 2));
   var cm11 = ak.complexMatrix(2, 2, 1, 2);
   var cm12 = ak.complexMatrix({rows: 3, cols: 2, at: function(r, c){return ak.complex(r+c, r+2*c);}});
   var cm13 = ak.complexMatrix({rows: 3, cols: 2, at: function(r, c){return r+c;}}, {rows: 3, cols: 2, at: function(r, c){return r+2*c;}});
   var cm14 = ak.complexMatrix(cm12);
   var cm15 = ak.complexMatrix(m0, m1);
   var cm16 = ak.complexMatrix('identity', 2);
   var cm17 = ak.complexMatrix('diagonal', [1, 2, 3], [4, 5, 6]);
   var cm18 = ak.complexMatrix('diagonal', [ak.complex(1, 4), ak.complex(2, 5), ak.complex(3, 6)]);
   var cm19 = ak.complexMatrix([[ak.complex(1.2346,0.435), ak.complex(445.4343,1.67543)],[ak.complex(0.005512346,143.756), ak.complex(23.7676,0.004534)]]);
   var cm20 = ak.complexMatrix([[ak.complex(-1, -5), ak.complex(-2, -6)], [ak.complex(-3, -7), ak.complex(-4, -8)]]);
   var cm21 = ak.complexMatrix(2, 3, function(r, c){return ak.complex(r+c, 2*r+c);});
   var cm22 = ak.complexMatrix([[ak.complex(2, 7), ak.complex(3, 8)], [ak.complex(4, 9), ak.complex(5, 10)]]);
   var cm23 = ak.complexMatrix([[ak.complex(2, 5), ak.complex(4, 6)], [ak.complex(6, 7), ak.complex(8, 8)]]);
   var cm24 = ak.complexMatrix([[ak.complex(0, 3), ak.complex(1, 4)], [ak.complex(2, 5), ak.complex(3, 6)]]);
   var cm25 = ak.complexMatrix([[ak.complex(4, -5), ak.complex(4, -6)], [ak.complex(4, -7), ak.complex(4, -8)]]);
   var cm26 = ak.complexMatrix([[ak.complex(1, -5), ak.complex(2, -6)], [ak.complex(3, -7), ak.complex(4, -8)]]);
   var cm27 = ak.complexMatrix([[ak.complex(7, -6), ak.complex(-13, 16)], [ak.complex(8, -9), ak.complex(-14, 23)], [ak.complex(9, -12), ak.complex(-15, 30)]]);
   var cm28 = ak.complexMatrix([[ak.complex(-5, -10), ak.complex(15, 20)], [ak.complex(-6, -12), ak.complex(18, 24)]]);
   var cm29 = ak.complexMatrix([[ak.complex(5, 20), ak.complex(6, 24)], [ak.complex(10, 25), ak.complex(12, 30)], [ak.complex(15, 30), ak.complex(18, 36)]]);
   var cm30 = ak.complexMatrix(2, 3, [ak.complex(-86,56), ak.complex(-94, 70), ak.complex(-102, 84), ak.complex(-110,100), ak.complex(-118,122), ak.complex(-126, 144)]);
   var cm31 = ak.complexMatrix(2, 2, [ak.complex(7, 19), ak.complex(10, 22), ak.complex(15, 43), ak.complex(22, 50)]);
   var cm32 = ak.complexMatrix(2, 2, [ak.complex(19, 67), ak.complex(22, 78), ak.complex(43, 91), ak.complex(50, 106)]);
   var cm33 = ak.complexMatrix([[ak.complex(-11, -3), ak.complex(-14, -2)], [ak.complex(-17, -1), ak.complex(-20, 0)]]);
   var cm34 = ak.complexMatrix([[ak.complex(-5, 10), ak.complex(-6, 12)], [ak.complex(-7, 14), ak.complex(-8, 16)]]);
   var cm35 = ak.complexMatrix([[ak.complex(3, 15), ak.complex(6, 18)], [ak.complex(9, 21), ak.complex(12, 24)]]);
   var cm36 = ak.complexMatrix(2, 3, [ak.complex(0.5, 3.5), ak.complex(1, 4), ak.complex(1.5, 4.5), ak.complex(2, 5), ak.complex(2.5, 5.5), ak.complex(3, 6)]);
   var cm37 = ak.complexMatrix(2, 3, [ak.complex(-3, 4), ak.complex(-3, 5), ak.complex(-3, 6), ak.complex(-3, 7), ak.complex(-3, 8), ak.complex(-3, 9)]);
   var cm38 = ak.complexMatrix([[ak.complex(0.5, 0.5), ak.complex(1, 1)], [ak.complex(1.5, 1.5), ak.complex(2, 2)]]);
   var cm39 = ak.complexMatrix([[ak.complex(0), ak.complex(1,1), ak.complex(2,-1)], [ak.complex(0), ak.complex(0), ak.complex(3,2)], [ak.complex(0), ak.complex(0), ak.complex(0)]]);
   var cm40 = ak.complexMatrix([[ak.complex(1), ak.complex(1,1), ak.complex(2.5,1.5)], [ak.complex(0), ak.complex(1), ak.complex(3,2)], [ak.complex(0), ak.complex(0), ak.complex(1)]]);
   var cm41 = ak.complexMatrix([[ak.complex(2, 7), ak.complex(3, 8)], [ak.complex(4, 14), ak.complex(6, 16)]]);
   var cm42 = ak.complexMatrix([[0, ak.I], [1, 1]]);
   var cm43 = ak.complexMatrix([[ak.complex(0, 1), ak.complex(-1, 1)], [ak.complex(1, 1), ak.complex(1, 2)]]);
  
   var init = {
    name: 'init',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   init.add('arrays', function(){return ak.type(cm0)==ak.COMPLEX_MATRIX_T && cm0.rows()===2 && cm0.cols()===2 &&
                                        ak.type(cm0.at(0, 0))===ak.COMPLEX_T && ak.eq(cm0.at(0, 0), 1) &&
                                        ak.type(cm0.at(0, 1))===ak.COMPLEX_T && ak.eq(cm0.at(0, 1), 2) &&
                                        ak.type(cm0.at(1, 0))===ak.COMPLEX_T && ak.eq(cm0.at(1, 0), 3) &&
                                        ak.type(cm0.at(1, 1))===ak.COMPLEX_T && ak.eq(cm0.at(1, 1), 4) &&
                                        ak.type(cm1)==ak.COMPLEX_MATRIX_T && cm1.rows()===2 && cm1.cols()===2 &&
                                        ak.type(cm1.at(0, 0))===ak.COMPLEX_T && ak.eq(cm1.at(0, 0), ak.complex(1, 5)) &&
                                        ak.type(cm1.at(0, 1))===ak.COMPLEX_T && ak.eq(cm1.at(0, 1), ak.complex(2, 6)) &&
                                        ak.type(cm1.at(1, 0))===ak.COMPLEX_T && ak.eq(cm1.at(1, 0), ak.complex(3, 7)) &&
                                        ak.type(cm1.at(1, 1))===ak.COMPLEX_T && ak.eq(cm1.at(1, 1), ak.complex(4, 8)) &&
                                        ak.type(cm2)==ak.COMPLEX_MATRIX_T && cm2.rows()===2 && cm2.cols()===2 &&
                                        ak.type(cm2.at(0, 0))===ak.COMPLEX_T && ak.eq(cm2.at(0, 0), ak.complex(1, 5)) &&
                                        ak.type(cm2.at(0, 1))===ak.COMPLEX_T && ak.eq(cm2.at(0, 1), ak.complex(2, 6)) &&
                                        ak.type(cm2.at(1, 0))===ak.COMPLEX_T && ak.eq(cm2.at(1, 0), ak.complex(3, 7)) &&
                                        ak.type(cm2.at(1, 1))===ak.COMPLEX_T && ak.eq(cm2.at(1, 1), ak.complex(4, 8));});
  
   init.add('array', function(){return ak.type(cm3)==ak.COMPLEX_MATRIX_T && cm3.rows()===2 && cm3.cols()===3 &&
                                       ak.type(cm3.at(0, 0))===ak.COMPLEX_T && ak.eq(cm3.at(0, 0), 1) &&
                                       ak.type(cm3.at(0, 1))===ak.COMPLEX_T && ak.eq(cm3.at(0, 1), 2) &&
                                       ak.type(cm3.at(0, 2))===ak.COMPLEX_T && ak.eq(cm3.at(0, 2), 3) &&
                                       ak.type(cm3.at(1, 0))===ak.COMPLEX_T && ak.eq(cm3.at(1, 0), 4) &&
                                       ak.type(cm3.at(1, 1))===ak.COMPLEX_T && ak.eq(cm3.at(1, 1), 5) &&
                                       ak.type(cm3.at(1, 2))===ak.COMPLEX_T && ak.eq(cm3.at(1, 2), 6) &&
                                       ak.type(cm4)==ak.COMPLEX_MATRIX_T && cm4.rows()===2 && cm4.cols()===3 &&
                                       ak.type(cm4.at(0, 0))===ak.COMPLEX_T && ak.eq(cm4.at(0, 0), ak.complex(1, 7)) &&
                                       ak.type(cm4.at(0, 1))===ak.COMPLEX_T && ak.eq(cm4.at(0, 1), ak.complex(2, 8)) &&
                                       ak.type(cm4.at(0, 2))===ak.COMPLEX_T && ak.eq(cm4.at(0, 2), ak.complex(3, 9)) &&
                                       ak.type(cm4.at(1, 0))===ak.COMPLEX_T && ak.eq(cm4.at(1, 0), ak.complex(4, 10)) &&
                                       ak.type(cm4.at(1, 1))===ak.COMPLEX_T && ak.eq(cm4.at(1, 1), ak.complex(5, 11)) &&
                                       ak.type(cm4.at(1, 2))===ak.COMPLEX_T && ak.eq(cm4.at(1, 2), ak.complex(6, 12)) &&
                                       ak.type(cm5)==ak.COMPLEX_MATRIX_T && cm5.rows()===2 && cm5.cols()===3 &&
                                       ak.type(cm5.at(0, 0))===ak.COMPLEX_T && ak.eq(cm5.at(0, 0), ak.complex(1, 7)) &&
                                       ak.type(cm5.at(0, 1))===ak.COMPLEX_T && ak.eq(cm5.at(0, 1), ak.complex(2, 8)) &&
                                       ak.type(cm5.at(0, 2))===ak.COMPLEX_T && ak.eq(cm5.at(0, 2), ak.complex(3, 9)) &&
                                       ak.type(cm5.at(1, 0))===ak.COMPLEX_T && ak.eq(cm5.at(1, 0), ak.complex(4, 10)) &&
                                       ak.type(cm5.at(1, 1))===ak.COMPLEX_T && ak.eq(cm5.at(1, 1), ak.complex(5, 11)) &&
                                       ak.type(cm5.at(1, 2))===ak.COMPLEX_T && ak.eq(cm5.at(1, 2), ak.complex(6, 12));});
  
   init.add('function', function(){return ak.type(cm6)==ak.COMPLEX_MATRIX_T && cm6.rows()===3 && cm6.cols()===2 &&
                                          ak.type(cm6.at(0, 0))===ak.COMPLEX_T && ak.eq(cm6.at(0, 0), 0) &&
                                          ak.type(cm6.at(0, 1))===ak.COMPLEX_T && ak.eq(cm6.at(0, 1), 1) &&
                                          ak.type(cm6.at(0, 2))===ak.COMPLEX_T && ak.eq(cm6.at(1, 0), 1) &&
                                          ak.type(cm6.at(1, 0))===ak.COMPLEX_T && ak.eq(cm6.at(1, 1), 2) &&
                                          ak.type(cm6.at(1, 1))===ak.COMPLEX_T && ak.eq(cm6.at(2, 0), 2) &&
                                          ak.type(cm6.at(1, 2))===ak.COMPLEX_T && ak.eq(cm6.at(2, 1), 3) &&
                                          ak.type(cm7)==ak.COMPLEX_MATRIX_T && cm7.rows()===3 && cm7.cols()===2 &&
                                          ak.type(cm7.at(0, 0))===ak.COMPLEX_T && ak.eq(cm7.at(0, 0), ak.complex(0, 0)) &&
                                          ak.type(cm7.at(0, 1))===ak.COMPLEX_T && ak.eq(cm7.at(0, 1), ak.complex(1, 2)) &&
                                          ak.type(cm7.at(0, 2))===ak.COMPLEX_T && ak.eq(cm7.at(1, 0), ak.complex(1, 1)) &&
                                          ak.type(cm7.at(1, 0))===ak.COMPLEX_T && ak.eq(cm7.at(1, 1), ak.complex(2, 3)) &&
                                          ak.type(cm7.at(1, 1))===ak.COMPLEX_T && ak.eq(cm7.at(2, 0), ak.complex(2, 2)) &&
                                          ak.type(cm7.at(1, 2))===ak.COMPLEX_T && ak.eq(cm7.at(2, 1), ak.complex(3, 4));});
  
   init.add('zero', function(){return ak.type(cm8)==ak.COMPLEX_MATRIX_T && cm8.rows()===2 && cm8.cols()===2 &&
                                      ak.type(cm8.at(0, 0))===ak.COMPLEX_T && ak.eq(cm8.at(0, 0), 0) &&
                                      ak.type(cm8.at(0, 1))===ak.COMPLEX_T && ak.eq(cm8.at(0, 1), 0) &&
                                      ak.type(cm8.at(1, 0))===ak.COMPLEX_T && ak.eq(cm8.at(1, 0), 0) &&
                                      ak.type(cm8.at(1, 1))===ak.COMPLEX_T && ak.eq(cm8.at(1, 1), 0);});
  
   init.add('number', function(){return ak.type(cm9)==ak.COMPLEX_MATRIX_T && cm9.rows()===2 && cm9.cols()===2 &&
                                        ak.type(cm9.at(0, 0))===ak.COMPLEX_T && ak.eq(cm9.at(0, 0), 1) &&
                                        ak.type(cm9.at(0, 1))===ak.COMPLEX_T && ak.eq(cm9.at(0, 1), 1) &&
                                        ak.type(cm9.at(1, 0))===ak.COMPLEX_T && ak.eq(cm9.at(1, 0), 1) &&
                                        ak.type(cm9.at(1, 1))===ak.COMPLEX_T && ak.eq(cm9.at(1, 1), 1) &&
                                        ak.type(cm10)==ak.COMPLEX_MATRIX_T && cm10.rows()===2 && cm10.cols()===2 &&
                                        ak.type(cm10.at(0, 0))===ak.COMPLEX_T && ak.eq(cm10.at(0, 0), ak.complex(1, 2)) &&
                                        ak.type(cm10.at(0, 1))===ak.COMPLEX_T && ak.eq(cm10.at(0, 1), ak.complex(1, 2)) &&
                                        ak.type(cm10.at(1, 0))===ak.COMPLEX_T && ak.eq(cm10.at(1, 0), ak.complex(1, 2)) &&
                                        ak.type(cm10.at(1, 1))===ak.COMPLEX_T && ak.eq(cm10.at(1, 1), ak.complex(1, 2)) &&
                                        ak.type(cm11)==ak.COMPLEX_MATRIX_T && cm11.rows()===2 && cm11.cols()===2 &&
                                        ak.type(cm11.at(0, 0))===ak.COMPLEX_T && ak.eq(cm11.at(0, 0), ak.complex(1, 2)) &&
                                        ak.type(cm11.at(0, 1))===ak.COMPLEX_T && ak.eq(cm11.at(0, 1), ak.complex(1, 2)) &&
                                        ak.type(cm11.at(1, 0))===ak.COMPLEX_T && ak.eq(cm11.at(1, 0), ak.complex(1, 2)) &&
                                        ak.type(cm11.at(1, 1))===ak.COMPLEX_T && ak.eq(cm11.at(1, 1), ak.complex(1, 2));});
  
   init.add('object', function(){return ak.type(cm12)==ak.COMPLEX_MATRIX_T && cm12.rows()===3 && cm12.cols()===2 &&
                                        ak.type(cm12.at(0, 0))===ak.COMPLEX_T && ak.eq(cm12.at(0, 0), ak.complex(0, 0)) &&
                                        ak.type(cm12.at(0, 1))===ak.COMPLEX_T && ak.eq(cm12.at(0, 1), ak.complex(1, 2)) &&
                                        ak.type(cm12.at(0, 2))===ak.COMPLEX_T && ak.eq(cm12.at(1, 0), ak.complex(1, 1)) &&
                                        ak.type(cm12.at(1, 0))===ak.COMPLEX_T && ak.eq(cm12.at(1, 1), ak.complex(2, 3)) &&
                                        ak.type(cm12.at(1, 1))===ak.COMPLEX_T && ak.eq(cm12.at(2, 0), ak.complex(2, 2)) &&
                                        ak.type(cm12.at(1, 2))===ak.COMPLEX_T && ak.eq(cm12.at(2, 1), ak.complex(3, 4));});
  
   init.add('objects', function(){return ak.type(cm13)==ak.COMPLEX_MATRIX_T && cm13.rows()===3 && cm13.cols()===2 &&
                                         ak.type(cm13.at(0, 0))===ak.COMPLEX_T && ak.eq(cm13.at(0, 0), ak.complex(0, 0)) &&
                                         ak.type(cm13.at(0, 1))===ak.COMPLEX_T && ak.eq(cm13.at(0, 1), ak.complex(1, 2)) &&
                                         ak.type(cm13.at(0, 2))===ak.COMPLEX_T && ak.eq(cm13.at(1, 0), ak.complex(1, 1)) &&
                                         ak.type(cm13.at(1, 0))===ak.COMPLEX_T && ak.eq(cm13.at(1, 1), ak.complex(2, 3)) &&
                                         ak.type(cm13.at(1, 1))===ak.COMPLEX_T && ak.eq(cm13.at(2, 0), ak.complex(2, 2)) &&
                                         ak.type(cm13.at(1, 2))===ak.COMPLEX_T && ak.eq(cm13.at(2, 1), ak.complex(3, 4));});
  
   init.add('copy', function(){return ak.type(cm14)==ak.COMPLEX_MATRIX_T && cm14.rows()===3 && cm14.cols()===2 &&
                                      ak.type(cm14.at(0, 0))===ak.COMPLEX_T && ak.eq(cm14.at(0, 0), ak.complex(0, 0)) &&
                                      ak.type(cm14.at(0, 1))===ak.COMPLEX_T && ak.eq(cm14.at(0, 1), ak.complex(1, 2)) &&
                                      ak.type(cm14.at(0, 2))===ak.COMPLEX_T && ak.eq(cm14.at(1, 0), ak.complex(1, 1)) &&
                                      ak.type(cm14.at(1, 0))===ak.COMPLEX_T && ak.eq(cm14.at(1, 1), ak.complex(2, 3)) &&
                                      ak.type(cm14.at(1, 1))===ak.COMPLEX_T && ak.eq(cm14.at(2, 0), ak.complex(2, 2)) &&
                                      ak.type(cm14.at(1, 2))===ak.COMPLEX_T && ak.eq(cm14.at(2, 1), ak.complex(3, 4));});
  
   init.add('matrices', function(){return ak.type(cm15)==ak.COMPLEX_MATRIX_T && cm15.rows()===2 && cm15.cols()===2 &&
                                          ak.type(cm15.at(0, 0))===ak.COMPLEX_T && ak.eq(cm15.at(0, 0), ak.complex(1, 5)) &&
                                          ak.type(cm15.at(0, 1))===ak.COMPLEX_T && ak.eq(cm15.at(0, 1), ak.complex(2, 6)) &&
                                          ak.type(cm15.at(1, 0))===ak.COMPLEX_T && ak.eq(cm15.at(1, 0), ak.complex(3, 7)) &&
                                          ak.type(cm15.at(1, 1))===ak.COMPLEX_T && ak.eq(cm15.at(1, 1), ak.complex(4, 8));});
  
   init.add('identity', function(){return ak.type(cm16)==ak.COMPLEX_MATRIX_T && cm16.rows()===2 && cm16.cols()===2 &&
                                          ak.type(cm16.at(0, 0))===ak.COMPLEX_T && ak.eq(cm16.at(0, 0), 1) &&
                                          ak.type(cm16.at(0, 1))===ak.COMPLEX_T && ak.eq(cm16.at(0, 1), 0) &&
                                          ak.type(cm16.at(1, 0))===ak.COMPLEX_T && ak.eq(cm16.at(1, 0), 0) &&
                                          ak.type(cm16.at(1, 1))===ak.COMPLEX_T && ak.eq(cm16.at(1, 1), 1);});
  
   init.add('diagonal', function(){return ak.type(cm17)==ak.COMPLEX_MATRIX_T && cm17.rows()===3 && cm17.cols()===3 &&
                                          ak.type(cm17.at(0, 0))===ak.COMPLEX_T && ak.eq(cm17.at(0, 0), ak.complex(1, 4)) &&
                                          ak.type(cm17.at(0, 1))===ak.COMPLEX_T && ak.eq(cm17.at(0, 1), 0) &&
                                          ak.type(cm17.at(0, 2))===ak.COMPLEX_T && ak.eq(cm17.at(0, 2), 0) &&
                                          ak.type(cm17.at(1, 0))===ak.COMPLEX_T && ak.eq(cm17.at(1, 0), 0) &&
                                          ak.type(cm17.at(1, 1))===ak.COMPLEX_T && ak.eq(cm17.at(1, 1), ak.complex(2, 5)) &&
                                          ak.type(cm17.at(1, 2))===ak.COMPLEX_T && ak.eq(cm17.at(1, 2), 0) &&
                                          ak.type(cm17.at(1, 0))===ak.COMPLEX_T && ak.eq(cm17.at(2, 0), 0) &&
                                          ak.type(cm17.at(1, 1))===ak.COMPLEX_T && ak.eq(cm17.at(2, 1), 0) &&
                                          ak.type(cm17.at(1, 2))===ak.COMPLEX_T && ak.eq(cm17.at(2, 2), ak.complex(3, 6)) &&
                                          ak.type(cm18)==ak.COMPLEX_MATRIX_T && cm18.rows()===3 && cm18.cols()===3 &&
                                          ak.type(cm18.at(0, 0))===ak.COMPLEX_T && ak.eq(cm18.at(0, 0), ak.complex(1, 4)) &&
                                          ak.type(cm18.at(0, 1))===ak.COMPLEX_T && ak.eq(cm18.at(0, 1), 0) &&
                                          ak.type(cm18.at(0, 2))===ak.COMPLEX_T && ak.eq(cm18.at(0, 2), 0) &&
                                          ak.type(cm18.at(1, 0))===ak.COMPLEX_T && ak.eq(cm18.at(1, 0), 0) &&
                                          ak.type(cm18.at(1, 1))===ak.COMPLEX_T && ak.eq(cm18.at(1, 1), ak.complex(2, 5)) &&
                                          ak.type(cm18.at(1, 2))===ak.COMPLEX_T && ak.eq(cm18.at(1, 2), 0) &&
                                          ak.type(cm18.at(1, 0))===ak.COMPLEX_T && ak.eq(cm18.at(2, 0), 0) &&
                                          ak.type(cm18.at(1, 1))===ak.COMPLEX_T && ak.eq(cm18.at(2, 1), 0) &&
                                          ak.type(cm18.at(1, 2))===ak.COMPLEX_T && ak.eq(cm18.at(2, 2), ak.complex(3, 6));});
  
   var members = {
    name: 'members',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   members.add('at', function(){return ak.type(cm1)==ak.COMPLEX_MATRIX_T && cm1.rows()===2 && cm1.cols()===2 &&
                                       ak.type(cm1.at(0, 0))===ak.COMPLEX_T && ak.eq(cm1.at(0, 0), ak.complex(1, 5)) &&
                                       ak.type(cm1.at(0, 1))===ak.COMPLEX_T && ak.eq(cm1.at(0, 1), ak.complex(2, 6)) &&
                                       ak.type(cm1.at(1, 0))===ak.COMPLEX_T && ak.eq(cm1.at(1, 0), ak.complex(3, 7)) &&
                                       ak.type(cm1.at(1, 1))===ak.COMPLEX_T && ak.eq(cm1.at(1, 1), ak.complex(4, 8));});
  
   members.add('at - bad', function(){return ak.type(cm1.at(-1, 0))===ak.UNDEFINED_T && ak.type(cm1.at(0, -1))===ak.UNDEFINED_T &&
                                             ak.type(cm1.at(0.3, 0))===ak.UNDEFINED_T && ak.type(cm1.at(0, 0.3))===ak.UNDEFINED_T &&
                                             ak.type(cm1.at(2, 2))===ak.UNDEFINED_T &&
                                             ak.type(cm1.at(0, 'a'))===ak.UNDEFINED_T && ak.type(cm1.at('a', 0))===ak.UNDEFINED_T;});
  
   members.add('dims', function(){return cm3.rows()===2 && cm3.cols()===3;});
  
   members.add('re', function(){return ak.eq(cm1.re(), m0);});
   members.add('im', function(){return ak.eq(cm1.im(), m1);});
  
   members.add('toArray', function(){var cm = cm1.toArray();
                                     return ak.type(cm)===ak.ARRAY_T &&
                                            ak.eq(cm[0][0], ak.complex(1, 5)) &&
                                            ak.eq(cm[0][1], ak.complex(2, 6)) &&
                                            ak.eq(cm[1][0], ak.complex(3, 7)) &&
                                            ak.eq(cm[1][1], ak.complex(4, 8));});
  
   members.add('toString', function(){return cm1.toString()==='[[(1,5i),(2,6i)],[(3,7i),(4,8i)]]';});
  
   members.add('toExponential', function(){return cm19.toExponential(2)==='[[(1.23e+0,4.35e-1i),(4.45e+2,1.68e+0i)],[(5.51e-3,1.44e+2i),(2.38e+1,4.53e-3i)]]';});
   members.add('toFixed', function(){return cm19.toFixed(3)==='[[(1.235,0.435i),(445.434,1.675i)],[(0.006,143.756i),(23.768,0.005i)]]';});
   members.add('toPrecision', function(){return cm19.toPrecision(3)==='[[(1.23,0.435i),(445,1.68i)],[(0.00551,144i),(23.8,0.00453i)]]';});
  
   members.add('valueOf', function(){return isNaN(1 - cm0);});
  
   var operators = {
    name: 'operators',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   operators.add('diff',       function(){return ak.diff(cm1, cm26)>eps && ak.diff(cm12, cm14)<eps;});
   operators.add('diffMW',     function(){return ak.diff(m1, cm0)>eps && ak.diff(m0, cm0)<eps;});
   operators.add('diffWM',     function(){return ak.diff(cm0, m1)>eps && ak.diff(cm0, m0)<eps;});
   operators.add('diffRW',     function(){try{ak.diff(1, m0);}catch(e){return true;} return false;});
   operators.add('diffWR',     function(){try{ak.diff(m0, 1);}catch(e){return true;} return false;});
   operators.add('diff - mis', function(){try{ak.diff(m0, m9);}catch(e){return true;} return false;});
  
   operators.add('abs',            function(){return ak.diff(ak.abs(cm1), Math.sqrt(204))<eps;});
   operators.add('adjoint',        function(){return ak.eq(ak.adjoint(cm1), ak.transpose(cm26));});
   operators.add('adjointM',       function(){return ak.eq(ak.adjoint(m1), ak.transpose(m1));});
   operators.add('conj',           function(){return ak.eq(ak.conj(cm1), cm26);});
   operators.add('conjM',          function(){return ak.eq(ak.conj(m1), m1);});
   operators.add('det',            function(){return ak.diff(ak.det(cm43), ak.I)<Math.sqrt(eps);});
   operators.add('det - mis',      function(){try{ak.det(cm4);}catch(e){return true;} return false;});
   operators.add('exp',            function(){return ak.diff(ak.exp(cm39), cm40)<Math.sqrt(eps);});
   operators.add('inv',            function(){return ak.diff(ak.mul(cm2, ak.inv(cm2)), ak.complexMatrix('identity', 2))<Math.sqrt(eps) && ak.diff(ak.mul(ak.inv(cm2), cm2), ak.complexMatrix('identity', 2))<Math.sqrt(eps);});
   operators.add('inv - mis',      function(){try{ak.inv(cm4);}catch(e){return true;} return false;});
   operators.add('inv - sing',     function(){try{ak.inv(cm41);}catch(e){return true;} return false;});
   operators.add('leftInv',        function(){return ak.diff(ak.mul(ak.leftInv(cm7), cm7), ak.complexMatrix('identity', 2))<Math.sqrt(eps) && ak.eq(ak.leftInv(cm2), ak.inv(cm2));});
   operators.add('leftInv - mis',  function(){try{ak.leftInv(cm4);}catch(e){return true;} return false;});
   operators.add('neg',            function(){return ak.eq(ak.neg(cm1), cm20);});
   operators.add('rightInv',       function(){return ak.diff(ak.mul(cm4, ak.rightInv(cm4)), ak.matrix('identity', 2))<Math.sqrt(eps) && ak.eq(ak.rightInv(cm2), ak.inv(cm2));});
   operators.add('rightInv - mis', function(){try{ak.rightInv(cm7);}catch(e){return true;} return false;});
   operators.add('tr',             function(){return ak.diff(ak.tr(cm1), ak.complex(5, 13))<eps;});
   operators.add('transpose',      function(){return ak.eq(ak.transpose(cm7), cm21);});
  
   operators.add('add',         function(){return ak.eq(ak.add(cm1, cm10), cm22);});
   operators.add('addMW',       function(){return ak.eq(ak.add(cm1, m0), cm23);});
   operators.add('addWM',       function(){return ak.eq(ak.add(m0, cm1), cm23);});
   operators.add('addRW',       function(){try{ak.add(1, cm1);}catch(e){return true;} return false;});
   operators.add('addWR',       function(){try{ak.add(cm1, 1);}catch(e){return true;} return false;});
   operators.add('add - mis',   function(){try{ak.add(cm1, cm4);}catch(e){return true;} return false;});
   operators.add('dist',        function(){return ak.diff(ak.dist(cm1, cm10), ak.abs(cm24))<eps;});
   operators.add('distMW',      function(){return ak.diff(ak.dist(cm1, m1), ak.abs(cm25))<eps;});
   operators.add('distWM',      function(){return ak.diff(ak.dist(m1, cm1), ak.abs(cm25))<eps;});
   operators.add('distRW',      function(){try{ak.dist(1, cm1);}catch(e){return true;} return false;});
   operators.add('distWR',      function(){try{ak.dist(cm1, 1);}catch(e){return true;} return false;});
   operators.add('dist - mis',  function(){try{ak.dist(cm1, cm4);}catch(e){return true;} return false;});
   operators.add('div',         function(){return ak.eq(ak.div(cm5, cm1), ak.mul(ak.inv(cm1), cm5));});
   operators.add('divWM',       function(){return ak.eq(ak.div(cm5, m0), ak.mul(ak.inv(m0), cm5));});
   operators.add('divMW',       function(){return ak.eq(ak.div(m0, cm1), ak.mul(ak.inv(cm1), m0));});
   operators.add('divZW',       function(){return ak.eq(ak.div(cv1, cm4), ak.mul(ak.rightInv(cm4), cv1));});
   operators.add('divVW',       function(){return ak.eq(ak.div(v0, cm4), ak.mul(ak.rightInv(cm4), v0));});
   operators.add('divCW',       function(){return ak.eq(ak.div(ak.complex(1, 2), cm4), ak.mul(ak.rightInv(cm4), ak.complex(1, 2)));});
   operators.add('divCM',       function(){return ak.eq(ak.div(ak.complex(1, 2), m0), ak.mul(ak.rightInv(m0), ak.complex(1, 2)));});
   operators.add('divRW',       function(){return ak.eq(ak.div(2, cm4), ak.mul(ak.rightInv(cm4), 2));});
   operators.add('divWC',       function(){return ak.eq(ak.div(cm4, ak.complex(1, -1)), cm37);});
   operators.add('divMC',       function(){return ak.eq(ak.div(m0, ak.complex(1, -1)), cm38);});
   operators.add('divWR',       function(){return ak.eq(ak.div(cm4, 2), cm36);});
   operators.add('eq',          function(){return ak.eq(cm1, cm1) && !ak.eq(cm1, cm4) && !ak.eq(cm1, cm10);});
   operators.add('mul',         function(){return ak.eq(ak.mul(cm1, cm4), cm30);});
   operators.add('mulMW',       function(){return ak.eq(ak.mul(m0, cm1), cm31);});
   operators.add('mulWM',       function(){return ak.eq(ak.mul(cm1, m1), cm32);});
   operators.add('mulVW',       function(){return ak.eq(ak.mul(v0, cm1), cv2);});
   operators.add('mulWV',       function(){return ak.eq(ak.mul(cm1, v0), cv3);});
   operators.add('mulZW',       function(){return ak.eq(ak.mul(cv1, cm1), cv4);});
   operators.add('mulWZ',       function(){return ak.eq(ak.mul(cm1, cv1), cv5);});
   operators.add('mulCW',       function(){return ak.eq(ak.mul(ak.complex(-1,2), cm1), cm33);});
   operators.add('mulWC',       function(){return ak.eq(ak.mul(cm1, ak.complex(-1,2)), cm33);});
   operators.add('mulCM',       function(){return ak.eq(ak.mul(ak.complex(-1,2), m1), cm34);});
   operators.add('mulMC',       function(){return ak.eq(ak.mul(m1, ak.complex(-1,2)), cm34);});
   operators.add('mulRW',       function(){return ak.eq(ak.mul(3, cm1), cm35);});
   operators.add('mulWR',       function(){return ak.eq(ak.mul(cm1, 3), cm35);});
   operators.add('mul - mis',   function(){try{ak.dist(cm5, cm1);}catch(e){return true;} return false;});
   operators.add('mulVW - mis', function(){try{ak.dist(v1, cm5);}catch(e){return true;} return false;});
   operators.add('mulWV - mis', function(){try{ak.dist(cm5, v0);}catch(e){return true;} return false;});
   operators.add('mulZW - mis', function(){try{ak.dist(cv0, cm1);}catch(e){return true;} return false;});
   operators.add('mulWZ - mis', function(){try{ak.dist(cm1, cv0);}catch(e){return true;} return false;});
   operators.add('mulMW - mis', function(){try{ak.dist(m0, cm6);}catch(e){return true;} return false;});
   operators.add('mulWM - mis', function(){try{ak.dist(cm3, m0);}catch(e){return true;} return false;});
   operators.add('ne',          function(){return !ak.ne(cm1, cm1) && ak.ne(cm1, cm4) && ak.ne(cm1, cm10);});
   operators.add('powWR',       function(){return ak.eq(ak.pow(cm42, 3), cm43) && ak.diff(ak.pow(cm42, -3), ak.inv(cm43))<Math.sqrt(eps);});
   operators.add('powCW',       function(){return ak.diff(ak.pow(ak.complex(1, 2), cm1), ak.exp(ak.mul(cm1, ak.log(ak.complex(1, 2)))))<Math.sqrt(eps);});
   operators.add('powRW',       function(){return ak.diff(ak.pow(3, cm1), ak.exp(ak.mul(cm1, Math.log(3))))<Math.sqrt(eps);});
   operators.add('powCM',       function(){return ak.diff(ak.pow(ak.complex(1, 2), m1), ak.exp(ak.mul(m1, ak.log(ak.complex(1, 2)))))<Math.sqrt(eps);});
   operators.add('sub',         function(){return ak.eq(ak.sub(cm1, cm10), cm24);});
   operators.add('subMW',       function(){return ak.eq(ak.sub(m1, cm1), cm25);});
   operators.add('subWM',       function(){return ak.eq(ak.sub(cm1, m1), ak.neg(cm25));});
   operators.add('subRW',       function(){try{ak.sub(1, cm1);}catch(e){return true;} return false;});
   operators.add('subWR',       function(){try{ak.sub(cm1, 1);}catch(e){return true;} return false;});
   operators.add('sub - mis',   function(){try{ak.sub(cm1, cm4);}catch(e){return true;} return false;});
  
   operators.add('outerMul',    function(){return ak.eq(ak.outerMul(cv0,cv1),cm27);});
   operators.add('outerMulVZ',  function(){return ak.eq(ak.outerMul(v0,cv1),cm28);});
   operators.add('outerMulZV',  function(){return ak.eq(ak.outerMul(cv0,v0),cm29);});
  
   operators.add('divCD',       function(){return ak.dist(ak.div(z0, d2), ak.mul(z0, ak.inv(d2))) < Math.sqrt(eps);});
   operators.add('stableDivCD', function(){return ak.dist(ak.stableDiv(z0, d2, 1e-10), ak.mul(z0, ak.stableInv(d2, 1e-10))) < Math.sqrt(eps);});
  
   operators.add('divWD',       function(){return ak.dist(ak.mul(m2, ak.div(cm1, d2)), cm1) < Math.sqrt(eps);});
   operators.add('stableDivWD', function(){return ak.dist(ak.mul(m2, ak.stableDiv(cm1, d2, 1e-10)), cm1) < Math.sqrt(eps);});
  
   complexMatrix.add(init);
   complexMatrix.add(members);
   complexMatrix.add(operators);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   complexMatrix.add(load);
  }

  akTest.add(complexMatrix);
 }

 ak.using(['Matrix/ComplexMatrix.js', 'Matrix/JacobiDecomposition.js'], define);
})();
