"use strict";

(function() {
 function define() {
  var multiNormal = {
   name: 'distribution.multiNormalDistribution',
   body: [],
   add: function(t) {this.body.push(t);}
  };

  try {
   var root = ak.matrix([[0.5, 0, 0], [-0.2, 0.3, 0], [0.1, -0.3, 0.2]]);
   var sigma = ak.mul(root, ak.transpose(root));
   var chol = ak.choleskyDecomposition(sigma);
   var obj = {l: chol.l()};
   var diag = {l: ak.matrix('diagonal', [1, 2, 3])};
  
   var pdf00 = ak.multiNormalPDF();
   var pdf01 = ak.multiNormalPDF(3);
   var pdf02 = ak.multiNormalPDF(3, 2);
   var pdf03 = ak.multiNormalPDF(3, 1, 2);
   var pdf04 = ak.multiNormalPDF(ak.vector([2, 3]));
   var pdf05 = ak.multiNormalPDF(ak.vector([-1, 2]), ak.vector([2, 3]));
   var pdf06 = ak.multiNormalPDF(ak.vector([-1, 2, -3]), root);
   var pdf07 = ak.multiNormalPDF(ak.vector([-1, 2, -3]), sigma);
   var pdf08 = ak.multiNormalPDF(root);
   var pdf09 = ak.multiNormalPDF(sigma);
   var pdf10 = ak.multiNormalPDF(ak.matrix([[2]]));
   var pdf11 = ak.multiNormalPDF(ak.vector([1]), ak.matrix([[2]]));
   var pdf12 = ak.multiNormalPDF(ak.matrix('diagonal', [1, 2, 3]));
   var pdf13 = ak.multiNormalPDF(ak.vector([-1, 2, -3]), ak.matrix('diagonal', [1, 2, 3]));
   var pdf14 = ak.multiNormalPDF(chol);
   var pdf15 = ak.multiNormalPDF(obj);
   var pdf16 = ak.multiNormalPDF(diag);
   var pdf17 = ak.multiNormalPDF(ak.vector([-1, 2, -3]), chol);
   var pdf18 = ak.multiNormalPDF(ak.vector([-1, 2, -3]), obj);
   var pdf19 = ak.multiNormalPDF(ak.vector([-1, 2, -3]), diag);
   var pdf20 = ak.multiNormalPDF(ak.vector(0));
  
   var cf00 = ak.multiNormalCF();
   var cf01 = ak.multiNormalCF(3);
   var cf02 = ak.multiNormalCF(3, 2);
   var cf03 = ak.multiNormalCF(3, 1, 2);
   var cf04 = ak.multiNormalCF(ak.vector([2, 3]));
   var cf05 = ak.multiNormalCF(ak.vector([-1, 2]), ak.vector([2, 3]));
   var cf06 = ak.multiNormalCF(ak.vector([-1, 2, -3]), root);
   var cf07 = ak.multiNormalCF(ak.vector([-1, 2, -3]), sigma);
   var cf08 = ak.multiNormalCF(root);
   var cf09 = ak.multiNormalCF(sigma);
   var cf10 = ak.multiNormalCF(ak.vector(0));
  
   var cdf00 = ak.multiNormalCDF();
   var cdf01 = ak.multiNormalCDF(3);
   var cdf02 = ak.multiNormalCDF(3, 2);
   var cdf03 = ak.multiNormalCDF(3, 1, 2);
   var cdf04 = ak.multiNormalCDF(ak.vector([2, 3]));
   var cdf05 = ak.multiNormalCDF(ak.vector([-1, 2]), ak.vector([2, 3]));
   var cdf06 = ak.multiNormalCDF(ak.vector([-1, 2, -3]), root);
   var cdf07 = ak.multiNormalCDF(ak.vector([-1, 2, -3]), sigma);
   var cdf08 = ak.multiNormalCDF(root);
   var cdf09 = ak.multiNormalCDF(sigma);
   var cdf10 = ak.multiNormalCDF(ak.vector([-1, 2, -3]), sigma, 1e-5, 100000, ak.haltonRnd([3, 5, 13]), ak.mtRnd());
   var cdf11 = ak.multiNormalCDF(sigma, 1e-5, 100000, ak.haltonRnd([3, 5, 13]), ak.mtRnd());
   var cdf12 = ak.multiNormalCDF(ak.matrix([[2]]));
   var cdf13 = ak.multiNormalCDF(ak.vector([1]), ak.matrix([[2]]));
   var cdf14 = ak.multiNormalCDF(ak.matrix('diagonal', [1, 2, 3]));
   var cdf15 = ak.multiNormalCDF(ak.vector([-1, 2, -3]), ak.matrix('diagonal', [1, 2, 3]));
   var cdf16 = ak.multiNormalCDF(chol, 1e-5, 100000, ak.haltonRnd([3, 5, 13]), ak.mtRnd());
   var cdf17 = ak.multiNormalCDF(obj, 1e-5, 100000, ak.haltonRnd([3, 5, 13]), ak.mtRnd());
   var cdf18 = ak.multiNormalCDF(diag, 1e-5, 100000, ak.haltonRnd([3, 5, 13]), ak.mtRnd());
   var cdf19 = ak.multiNormalCDF(ak.vector([-1, 2, -3]), chol, 1e-5, 100000, ak.haltonRnd([3, 5, 13]), ak.mtRnd());
   var cdf20 = ak.multiNormalCDF(ak.vector([-1, 2, -3]), obj, 1e-5, 100000, ak.haltonRnd([3, 5, 13]), ak.mtRnd());
   var cdf21 = ak.multiNormalCDF(ak.vector([-1, 2, -3]), diag, 1e-5, 100000, ak.haltonRnd([3, 5, 13]), ak.mtRnd());
   var cdf22 = ak.multiNormalCDF(ak.vector(0));
   var cdf23 = ak.multiNormalCDF(ak.vector([1, -1]), ak.matrix([[0.5, 0], [-0.2, 0.3]]));
   var cdf24 = ak.multiNormalCDF(ak.matrix([[-0.25, 0], [0.7, 0.4]]));
   var cdf25 = ak.multiNormalCDF(ak.vector([1, -1, 0.5]), ak.matrix([[0.5, 0, 0], [-0.2, 0.3, 0], [0.1, 0.4, 1.5]]));
   var cdf26 = ak.multiNormalCDF(ak.matrix([[1.5, 0, 0], [0.3, 0.7, 0], [-0.1, 0.2, 1.1]]));
   var cdf27 = ak.multiNormalCDF(ak.vector([1, -1, 0.5, 2]), ak.matrix([[0.5, 0, 0, 0], [-0.2, 0.3, 0, 0], [0.1, 0.4, 1.5, 0], [-0.1, 0.2, 0.5, 0.7]]));
   var cdf28 = ak.multiNormalCDF(ak.matrix([[1.5, 0, 0, 0], [0.3, 0.7, 0, 0], [-0.1, 0.2, 1.1, 0], [0.5, -0.4, 0.1, 0.2]]));

   var cdf29 = ak.multiNormalCDF(ak.matrix([[ 1.5, -0.5,  1.0,  0.2,  0.3],
                                            [-0.5,  2.5, -0.2,  0.3,  0.5],
                                            [ 1.0, -0.2,  1.2,  0.2, -0.4],
                                            [ 0.2,  0.3,  0.2,  1.5,  0.1],
                                            [ 0.3,  0.5, -0.4,  0.1,  1.4]]));

   var cdf30 = ak.multiNormalCDF(ak.matrix([[2.5, 0.3],
                                            [0.3, 1.5]]));

   var cdf31 = ak.multiNormalCDF(ak.matrix([[2.5, 0.3,  0.5],
                                            [0.3, 1.5,  0.1],
                                            [0.5, 0.1,  1.4]]));

   var cdf32 = ak.multiNormalCDF(ak.matrix([[ 1.5, 1.0,  0.2,  0.3],
                                            [ 1.0, 1.2,  0.2, -0.4],
                                            [ 0.2, 0.2,  1.5,  0.1],
                                            [ 0.3, -0.4,  0.1,  1.4]]));

   var compCDF00 = ak.multiNormalCompCDF();
   var compCDF01 = ak.multiNormalCompCDF(3);
   var compCDF02 = ak.multiNormalCompCDF(3, 2);
   var compCDF03 = ak.multiNormalCompCDF(3, 1, 2);
   var compCDF04 = ak.multiNormalCompCDF(ak.vector([2, 3]));
   var compCDF05 = ak.multiNormalCompCDF(ak.vector([-1, 2]), ak.vector([2, 3]));
   var compCDF06 = ak.multiNormalCompCDF(ak.vector([-1, 2, -3]), root);
   var compCDF07 = ak.multiNormalCompCDF(ak.vector([-1, 2, -3]), sigma);
   var compCDF08 = ak.multiNormalCompCDF(root);
   var compCDF09 = ak.multiNormalCompCDF(sigma);
   var compCDF10 = ak.multiNormalCompCDF(ak.vector([-1, 2, -3]), sigma, 1e-5, 100000, ak.haltonRnd([3, 5, 13]), ak.mtRnd());
   var compCDF11 = ak.multiNormalCompCDF(sigma, 1e-5, 100000, ak.haltonRnd([3, 5, 13]), ak.mtRnd());
   var compCDF12 = ak.multiNormalCompCDF(ak.matrix([[2]]));
   var compCDF13 = ak.multiNormalCompCDF(ak.vector([1]), ak.matrix([[2]]));
   var compCDF14 = ak.multiNormalCompCDF(ak.matrix('diagonal', [1, 2, 3]));
   var compCDF15 = ak.multiNormalCompCDF(ak.vector([-1, 2, -3]), ak.matrix('diagonal', [1, 2, 3]));
   var compCDF16 = ak.multiNormalCompCDF(chol, 1e-5, 100000, ak.haltonRnd([3, 5, 13]), ak.mtRnd());
   var compCDF17 = ak.multiNormalCompCDF(obj, 1e-5, 100000, ak.haltonRnd([3, 5, 13]), ak.mtRnd());
   var compCDF18 = ak.multiNormalCompCDF(diag, 1e-5, 100000, ak.haltonRnd([3, 5, 13]), ak.mtRnd());
   var compCDF19 = ak.multiNormalCompCDF(ak.vector([-1, 2, -3]), chol, 1e-5, 100000, ak.haltonRnd([3, 5, 13]), ak.mtRnd());
   var compCDF20 = ak.multiNormalCompCDF(ak.vector([-1, 2, -3]), obj, 1e-5, 100000, ak.haltonRnd([3, 5, 13]), ak.mtRnd());
   var compCDF21 = ak.multiNormalCompCDF(ak.vector([-1, 2, -3]), diag, 1e-5, 100000, ak.haltonRnd([3, 5, 13]), ak.mtRnd());
   var compCDF22 = ak.multiNormalCompCDF(ak.vector(0));
   var compCDF23 = ak.multiNormalCompCDF(ak.vector([1, -1]), ak.matrix([[0.5, 0], [-0.2, 0.3]]));
   var compCDF24 = ak.multiNormalCompCDF(ak.matrix([[-0.25, 0], [0.7, 0.4]]));
   var compCDF25 = ak.multiNormalCompCDF(ak.vector([1, -1, 0.5]), ak.matrix([[0.5, 0, 0], [-0.2, 0.3, 0], [0.1, 0.4, 1.5]]));
   var compCDF26 = ak.multiNormalCompCDF(ak.matrix([[1.5, 0, 0], [0.3, 0.7, 0], [-0.1, 0.2, 1.1]]));
   var compCDF27 = ak.multiNormalCompCDF(ak.vector([1, -1, 0.5, 2]), ak.matrix([[0.5, 0, 0, 0], [-0.2, 0.3, 0, 0], [0.1, 0.4, 1.5, 0], [-0.1, 0.2, 0.5, 0.7]]));
   var compCDF28 = ak.multiNormalCompCDF(ak.matrix([[1.5, 0, 0, 0], [0.3, 0.7, 0, 0], [-0.1, 0.2, 1.1, 0], [0.5, -0.4, 0.1, 0.2]]));

   var compCDF29 = ak.multiNormalCompCDF(ak.matrix([[ 1.5, -0.5,  1.0,  0.2,  0.3],
                                            [-0.5,  2.5, -0.2,  0.3,  0.5],
                                            [ 1.0, -0.2,  1.2,  0.2, -0.4],
                                            [ 0.2,  0.3,  0.2,  1.5,  0.1],
                                            [ 0.3,  0.5, -0.4,  0.1,  1.4]]));

   var compCDF30 = ak.multiNormalCompCDF(ak.matrix([[2.5, 0.3],
                                            [0.3, 1.5]]));

   var compCDF31 = ak.multiNormalCompCDF(ak.matrix([[2.5, 0.3,  0.5],
                                            [0.3, 1.5,  0.1],
                                            [0.5, 0.1,  1.4]]));

   var compCDF32 = ak.multiNormalCompCDF(ak.matrix([[ 1.5, 1.0,  0.2,  0.3],
                                            [ 1.0, 1.2,  0.2, -0.4],
                                            [ 0.2, 0.2,  1.5,  0.1],
                                            [ 0.3, -0.4,  0.1,  1.4]]));

   var inf0d = ak.vector(5, ak.INFINITY);
   var inf1d = ak.vector([ak.INFINITY, 1.0, ak.INFINITY, ak.INFINITY, ak.INFINITY]);
   var inf2d = ak.vector([ak.INFINITY, 1.0, ak.INFINITY, 1.0, ak.INFINITY]);
   var inf3d = ak.vector([ak.INFINITY, 1.0, ak.INFINITY, 1.0, 1.0]);
   var inf4d = ak.vector([1.0, ak.INFINITY, 1.0, 1.0, 1.0]);
  
   var map00 = ak.multiNormalMap();
   var map01 = ak.multiNormalMap(3);
   var map02 = ak.multiNormalMap(3, 2);
   var map03 = ak.multiNormalMap(3, 1, 2);
   var map04 = ak.multiNormalMap(ak.vector([2, 3]));
   var map05 = ak.multiNormalMap(ak.vector([-1, 2]), ak.vector([2, 3]));
   var map06 = ak.multiNormalMap(ak.vector([-1, 2, -3]), root);
   var map07 = ak.multiNormalMap(ak.vector([-1, 2, -3]), sigma);
   var map08 = ak.multiNormalMap(root);
   var map09 = ak.multiNormalMap(sigma);
   var map10 = ak.multiNormalMap(ak.vector(0));
  
   var rnd00 = ak.multiNormalRnd();
   var rnd01 = ak.multiNormalRnd(3);
   var rnd02 = ak.multiNormalRnd(3, 2);
   var rnd03 = ak.multiNormalRnd(3, 1, 2);
   var rnd04 = ak.multiNormalRnd(ak.vector([2, 3]));
   var rnd05 = ak.multiNormalRnd(ak.vector([-1, 2]), ak.vector([2, 3]));
   var rnd06 = ak.multiNormalRnd(ak.vector([-1, 2, -3]), root);
   var rnd07 = ak.multiNormalRnd(ak.vector([-1, 2, -3]), sigma);
   var rnd08 = ak.multiNormalRnd(root);
   var rnd09 = ak.multiNormalRnd(sigma);
   var rnd10 = ak.multiNormalRnd(ak.vector([-1, 2, -3]), sigma, ak.mtRnd());
   var rnd11 = ak.multiNormalRnd(ak.vector(0));
  
   var init = {
    name: 'init',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   init.add('pdf', function(){return ak.eq(pdf00.mu(), ak.vector([0])) && ak.eq(pdf00.sigma(), ak.matrix([[1]]))
                                  && ak.eq(pdf01.mu(), ak.vector([0,0,0])) && ak.eq(pdf01.sigma(), ak.matrix('identity', 3))
                                  && ak.eq(pdf02.mu(), ak.vector([0,0,0])) && ak.eq(pdf02.sigma(), ak.matrix('diagonal', 3, 2))
                                  && ak.eq(pdf03.mu(), ak.vector([1,1,1])) && ak.eq(pdf03.sigma(), ak.matrix('diagonal', 3, 2))
                                  && ak.eq(pdf04.mu(), ak.vector([0,0])) && ak.eq(pdf04.sigma(), ak.matrix('diagonal', [2,3]))
                                  && ak.eq(pdf05.mu(), ak.vector([-1,2])) && ak.eq(pdf05.sigma(), ak.matrix('diagonal', [2,3]))
                                  && ak.eq(pdf06.mu(), ak.vector([-1,2,-3])) && ak.eq(pdf06.sigma(), sigma)
                                  && ak.eq(pdf07.mu(), ak.vector([-1,2,-3])) && ak.diff(pdf07.sigma(), sigma)<1e-13
                                  && ak.eq(pdf08.mu(), ak.vector(3, 0)) && ak.eq(pdf08.sigma(), sigma)
                                  && ak.eq(pdf09.mu(), ak.vector(3, 0)) && ak.diff(pdf09.sigma(), sigma)<1e-13
                                  && ak.eq(pdf10.mu(), ak.vector(1, 0)) && ak.diff(pdf10.sigma(), ak.matrix(1, 1, 2))<1e-13
                                  && ak.eq(pdf11.mu(), ak.vector(1, 1)) && ak.diff(pdf11.sigma(), ak.matrix(1, 1, 2))<1e-13
                                  && ak.eq(pdf12.mu(), ak.vector(3, 0)) && ak.eq(pdf12.sigma(), ak.matrix('diagonal', [1, 2, 3]))
                                  && ak.eq(pdf13.mu(), ak.vector([-1,2,-3])) && ak.eq(pdf13.sigma(), ak.matrix('diagonal', [1, 2, 3]))
                                  && ak.eq(pdf14.mu(), ak.vector(3, 0)) && ak.diff(pdf14.sigma(), sigma)<1e-13
                                  && ak.eq(pdf15.mu(), ak.vector(3, 0)) && ak.diff(pdf15.sigma(), sigma)<1e-13
                                  && ak.eq(pdf16.mu(), ak.vector(3, 0)) && ak.diff(pdf16.sigma(), ak.matrix('diagonal', [1,4,9]))<1e-13
                                  && ak.eq(pdf17.mu(), ak.vector([-1,2,-3])) && ak.diff(pdf17.sigma(), sigma)<1e-13
                                  && ak.eq(pdf18.mu(), ak.vector([-1,2,-3])) && ak.diff(pdf18.sigma(), sigma)<1e-13
                                  && ak.eq(pdf19.mu(), ak.vector([-1,2,-3])) && ak.diff(pdf19.sigma(), ak.matrix('diagonal', [1,4,9]))<1e-13
                                  && ak.eq(pdf20.mu(), ak.vector([])) && ak.eq(pdf20.sigma(), ak.matrix([]));
                             });
  
   init.add('cf', function(){return ak.eq(cf00.mu(), ak.vector([0])) && ak.eq(cf00.sigma(), ak.matrix([[1]]))
                                  && ak.eq(cf01.mu(), ak.vector([0,0,0])) && ak.eq(cf01.sigma(), ak.matrix('identity', 3))
                                  && ak.eq(cf02.mu(), ak.vector([0,0,0])) && ak.eq(cf02.sigma(), ak.matrix('diagonal', 3, 2))
                                  && ak.eq(cf03.mu(), ak.vector([1,1,1])) && ak.eq(cf03.sigma(), ak.matrix('diagonal', 3, 2))
                                  && ak.eq(cf04.mu(), ak.vector([0,0])) && ak.eq(cf04.sigma(), ak.matrix('diagonal', [2,3]))
                                  && ak.eq(cf05.mu(), ak.vector([-1,2])) && ak.eq(cf05.sigma(), ak.matrix('diagonal', [2,3]))
                                  && ak.eq(cf06.mu(), ak.vector([-1,2,-3])) && ak.eq(cf06.sigma(), sigma)
                                  && ak.eq(cf07.mu(), ak.vector([-1,2,-3])) && ak.diff(cf07.sigma(), sigma)<1e-13
                                  && ak.eq(cf08.mu(), ak.vector(3, 0)) && ak.eq(cf08.sigma(), sigma)
                                  && ak.eq(cf09.mu(), ak.vector(3, 0)) && ak.diff(cf09.sigma(), sigma)<1e-13
                                  && ak.eq(cf10.mu(), ak.vector([])) && ak.eq(cf10.sigma(), ak.matrix([]));
                             });
  
   init.add('cdf', function(){return ak.eq(cdf00.mu(), ak.vector([0])) && ak.eq(cdf00.sigma(), ak.matrix([[1]]))
                                  && ak.eq(cdf01.mu(), ak.vector([0,0,0])) && ak.eq(cdf01.sigma(), ak.matrix('identity', 3))
                                  && ak.eq(cdf02.mu(), ak.vector([0,0,0])) && ak.eq(cdf02.sigma(), ak.matrix('diagonal', 3, 2))
                                  && ak.eq(cdf03.mu(), ak.vector([1,1,1])) && ak.eq(cdf03.sigma(), ak.matrix('diagonal', 3, 2))
                                  && ak.eq(cdf04.mu(), ak.vector([0,0])) && ak.eq(cdf04.sigma(), ak.matrix('diagonal', [2,3]))
                                  && ak.eq(cdf05.mu(), ak.vector([-1,2])) && ak.eq(cdf05.sigma(), ak.matrix('diagonal', [2,3]))
                                  && ak.eq(cdf06.mu(), ak.vector([-1,2,-3])) && ak.eq(cdf06.sigma(), sigma)
                                  && ak.eq(cdf07.mu(), ak.vector([-1,2,-3])) && ak.diff(cdf07.sigma(), sigma)<1e-13
                                  && ak.eq(cdf08.mu(), ak.vector(3, 0)) && ak.eq(cdf08.sigma(), sigma)
                                  && ak.eq(cdf09.mu(), ak.vector(3, 0)) && ak.diff(cdf09.sigma(), sigma)<1e-13
                                  && ak.eq(cdf10.mu(), ak.vector([-1,2,-3])) && ak.diff(cdf10.sigma(), sigma)<1e-13
                                  && ak.eq(cdf11.mu(), ak.vector(3, 0)) && ak.diff(cdf11.sigma(), sigma)<1e-13
                                  && ak.eq(cdf12.mu(), ak.vector(1, 0)) && ak.diff(cdf12.sigma(), ak.matrix(1, 1, 2))<1e-13
                                  && ak.eq(cdf13.mu(), ak.vector(1, 1)) && ak.diff(cdf13.sigma(), ak.matrix(1, 1, 2))<1e-13
                                  && ak.eq(cdf14.mu(), ak.vector(3, 0)) && ak.eq(cdf14.sigma(), ak.matrix('diagonal', [1, 2, 3]))
                                  && ak.eq(cdf15.mu(), ak.vector([-1,2,-3])) && ak.eq(cdf15.sigma(), ak.matrix('diagonal', [1, 2, 3]))
                                  && ak.eq(cdf16.mu(), ak.vector(3, 0)) && ak.diff(cdf16.sigma(), sigma)<1e-13
                                  && ak.eq(cdf17.mu(), ak.vector(3, 0)) && ak.diff(cdf17.sigma(), sigma)<1e-13
                                  && ak.eq(cdf18.mu(), ak.vector(3, 0)) && ak.diff(cdf18.sigma(), ak.matrix('diagonal', [1,4,9]))<1e-13
                                  && ak.eq(cdf19.mu(), ak.vector([-1,2,-3])) && ak.diff(cdf19.sigma(), sigma)<1e-13
                                  && ak.eq(cdf20.mu(), ak.vector([-1,2,-3])) && ak.diff(cdf20.sigma(), sigma)<1e-13
                                  && ak.eq(cdf21.mu(), ak.vector([-1,2,-3])) && ak.diff(cdf21.sigma(), ak.matrix('diagonal', [1,4,9]))<1e-13
                                  && ak.eq(cdf22.mu(), ak.vector([])) && ak.eq(cdf22.sigma(), ak.matrix([]));
                             });

   init.add('compCDF', function(){return ak.eq(compCDF00.mu(), ak.vector([0])) && ak.eq(compCDF00.sigma(), ak.matrix([[1]]))
                                  && ak.eq(compCDF01.mu(), ak.vector([0,0,0])) && ak.eq(compCDF01.sigma(), ak.matrix('identity', 3))
                                  && ak.eq(compCDF02.mu(), ak.vector([0,0,0])) && ak.eq(compCDF02.sigma(), ak.matrix('diagonal', 3, 2))
                                  && ak.eq(compCDF03.mu(), ak.vector([1,1,1])) && ak.eq(compCDF03.sigma(), ak.matrix('diagonal', 3, 2))
                                  && ak.eq(compCDF04.mu(), ak.vector([0,0])) && ak.eq(compCDF04.sigma(), ak.matrix('diagonal', [2,3]))
                                  && ak.eq(compCDF05.mu(), ak.vector([-1,2])) && ak.eq(compCDF05.sigma(), ak.matrix('diagonal', [2,3]))
                                  && ak.eq(compCDF06.mu(), ak.vector([-1,2,-3])) && ak.eq(compCDF06.sigma(), sigma)
                                  && ak.eq(compCDF07.mu(), ak.vector([-1,2,-3])) && ak.diff(compCDF07.sigma(), sigma)<1e-13
                                  && ak.eq(compCDF08.mu(), ak.vector(3, 0)) && ak.eq(compCDF08.sigma(), sigma)
                                  && ak.eq(compCDF09.mu(), ak.vector(3, 0)) && ak.diff(compCDF09.sigma(), sigma)<1e-13
                                  && ak.eq(compCDF10.mu(), ak.vector([-1,2,-3])) && ak.diff(compCDF10.sigma(), sigma)<1e-13
                                  && ak.eq(compCDF11.mu(), ak.vector(3, 0)) && ak.diff(compCDF11.sigma(), sigma)<1e-13
                                  && ak.eq(compCDF12.mu(), ak.vector(1, 0)) && ak.diff(compCDF12.sigma(), ak.matrix(1, 1, 2))<1e-13
                                  && ak.eq(compCDF13.mu(), ak.vector(1, 1)) && ak.diff(compCDF13.sigma(), ak.matrix(1, 1, 2))<1e-13
                                  && ak.eq(compCDF14.mu(), ak.vector(3, 0)) && ak.eq(compCDF14.sigma(), ak.matrix('diagonal', [1, 2, 3]))
                                  && ak.eq(compCDF15.mu(), ak.vector([-1,2,-3])) && ak.eq(compCDF15.sigma(), ak.matrix('diagonal', [1, 2, 3]))
                                  && ak.eq(compCDF16.mu(), ak.vector(3, 0)) && ak.diff(compCDF16.sigma(), sigma)<1e-13
                                  && ak.eq(compCDF17.mu(), ak.vector(3, 0)) && ak.diff(compCDF17.sigma(), sigma)<1e-13
                                  && ak.eq(compCDF18.mu(), ak.vector(3, 0)) && ak.diff(compCDF18.sigma(), ak.matrix('diagonal', [1,4,9]))<1e-13
                                  && ak.eq(compCDF19.mu(), ak.vector([-1,2,-3])) && ak.diff(compCDF19.sigma(), sigma)<1e-13
                                  && ak.eq(compCDF20.mu(), ak.vector([-1,2,-3])) && ak.diff(compCDF20.sigma(), sigma)<1e-13
                                  && ak.eq(compCDF21.mu(), ak.vector([-1,2,-3])) && ak.diff(compCDF21.sigma(), ak.matrix('diagonal', [1,4,9]))<1e-13
                                  && ak.eq(compCDF22.mu(), ak.vector([])) && ak.eq(compCDF22.sigma(), ak.matrix([]));
                             });
  
   init.add('map', function(){return ak.eq(map00.mu(), ak.vector([0])) && ak.eq(map00.sigma(), ak.matrix([[1]]))
                                  && ak.eq(map01.mu(), ak.vector([0,0,0])) && ak.eq(map01.sigma(), ak.matrix('identity', 3))
                                  && ak.eq(map02.mu(), ak.vector([0,0,0])) && ak.eq(map02.sigma(), ak.matrix('diagonal', 3, 2))
                                  && ak.eq(map03.mu(), ak.vector([1,1,1])) && ak.eq(map03.sigma(), ak.matrix('diagonal', 3, 2))
                                  && ak.eq(map04.mu(), ak.vector([0,0])) && ak.eq(map04.sigma(), ak.matrix('diagonal', [2,3]))
                                  && ak.eq(map05.mu(), ak.vector([-1,2])) && ak.eq(map05.sigma(), ak.matrix('diagonal', [2,3]))
                                  && ak.eq(map06.mu(), ak.vector([-1,2,-3])) && ak.eq(map06.sigma(), sigma)
                                  && ak.eq(map07.mu(), ak.vector([-1,2,-3])) && ak.diff(map07.sigma(), sigma)<1e-13
                                  && ak.eq(map08.mu(), ak.vector(3, 0)) && ak.eq(map08.sigma(), sigma)
                                  && ak.eq(map09.mu(), ak.vector(3, 0)) && ak.diff(map09.sigma(), sigma)<1e-13
                                  && ak.eq(map10.mu(), ak.vector([])) && ak.eq(map10.sigma(), ak.matrix([]));
                             });
  
   init.add('rnd', function(){return ak.eq(rnd00.mu(), ak.vector([0])) && ak.eq(rnd00.sigma(), ak.matrix([[1]]))
                                  && ak.eq(rnd01.mu(), ak.vector([0,0,0])) && ak.eq(rnd01.sigma(), ak.matrix('identity', 3))
                                  && ak.eq(rnd02.mu(), ak.vector([0,0,0])) && ak.eq(rnd02.sigma(), ak.matrix('diagonal', 3, 2))
                                  && ak.eq(rnd03.mu(), ak.vector([1,1,1])) && ak.eq(rnd03.sigma(), ak.matrix('diagonal', 3, 2))
                                  && ak.eq(rnd04.mu(), ak.vector([0,0])) && ak.eq(rnd04.sigma(), ak.matrix('diagonal', [2,3]))
                                  && ak.eq(rnd05.mu(), ak.vector([-1,2])) && ak.eq(rnd05.sigma(), ak.matrix('diagonal', [2,3]))
                                  && ak.eq(rnd06.mu(), ak.vector([-1,2,-3])) && ak.eq(rnd06.sigma(), sigma)
                                  && ak.eq(rnd07.mu(), ak.vector([-1,2,-3])) && ak.diff(rnd07.sigma(), sigma)<1e-13
                                  && ak.eq(rnd08.mu(), ak.vector(3, 0)) && ak.eq(rnd08.sigma(), sigma)
                                  && ak.eq(rnd09.mu(), ak.vector(3, 0)) && ak.diff(rnd09.sigma(), sigma)<1e-13
                                  && ak.eq(rnd10.mu(), ak.vector([-1,2,-3])) && ak.diff(rnd10.sigma(), sigma)<1e-13
                                  && ak.eq(rnd11.mu(), ak.vector([])) && ak.eq(rnd11.sigma(), ak.matrix([]));
                             });
  
   var val = {
    name: 'val',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   function comparePDF(mpdf) {
    var mu = mpdf.mu();
    var sigma = mpdf.sigma();
    var esys = ak.jacobiDecomposition(sigma);
    var basis = ak.transpose(esys.v());
    var lambda = esys.lambda().toArray();
    var rnd = ak.multiNormalRnd(mu, sigma);
    var pdf = ak.normalPDF();
    var d = mu.dims();
    var n = 1000;
    var i, j, x, z, p;
  
    for(j=0;j<d;++j) lambda[j] = 1.0/Math.sqrt(lambda[j]);
  
    for(i=0;i<n;++i) {
     x = rnd();
     z = ak.mul(basis, ak.sub(x, mu));
     p = 1.0;
     for(j=0;j<d;++j) {
      p *= lambda[j] * pdf(lambda[j]*z.at(j));
     }
     if(!(ak.diff(p, mpdf(x))<1e-12)) return false;
    }
    return true;
   }
  
   function compareCF(mcf) {
    var mu = mcf.mu();
    var sigma = mcf.sigma();
    var esys = ak.jacobiDecomposition(sigma);
    var root = ak.sqrt(esys);
    var basis = ak.transpose(esys.v());
    var lambda = esys.lambda().toArray();
    var rnd = ak.multiNormalRnd(sigma);
    var d = mu.dims();
    var n = 1000;
    var i, j, t, u, z;
  
    for(j=0;j<d;++j) lambda[j] = ak.normalCF(Math.sqrt(lambda[j]));
  
    for(i=0;i<n;++i) {
     t = rnd();
     u = ak.mul(basis, t);
  
     z = ak.complex(1);
     for(j=0;j<d;++j) {
      z = ak.mul(z, lambda[j](u.at(j)));
      z = ak.mul(z, ak.exp(ak.complex(0, mu.at(j)*t.at(j))));
     }
     if(!(ak.diff(z, mcf(t))<1e-12)) return false;
    }
    return true;
   }
  
   function compareUncorrCDF(mcdf) {
    var mu = mcdf.mu();
    var sigma = mcdf.sigma();
    var rnd = ak.multiNormalRnd(mu, sigma);
    var cdf = ak.normalCDF();
    var d = mu.dims();
    var n = 1000;
    var i, j, z, c;
  
    for(i=0;i<n;++i) {
     z = rnd();
     c = 1;
     for(j=0;j<d;++j) {
      c *= cdf((z.at(j)-mu.at(j))/Math.sqrt(sigma.at(j, j)));
     }
     if(!(ak.diff(c, mcdf(z))<1e-12)) return false;
    }
    return true;
   }

   function compareCorrCDF(mcdf, n) {
    var m = 25000;
    var mu = mcdf.mu();
    var sigma = mcdf.sigma();
    var rnd = ak.multiNormalRnd(mu, sigma);
    var map = ak.multiNormalMap(mu, sigma);
    var d = mu.dims();
    var base = new Array(d);
    var i, j, k, qrnd, zi, zj, c1, c2, c3;
  
    for(k=0;k<d;++k) base[k] = ak.primeSequence(k);
    qrnd = ak.haltonRnd(base);

    mu = mu.toArray();

    for(i=0;i<n;++i) {
     zi = rnd();
     c1 = mcdf(zi);

     zi = zi.toArray();
     c2 = 0;
     c3 = 0;

     for(j=0;j<m;++j) {
      zj = rnd().toArray();
      for(k=0;k<d && zj[k]<=zi[k];++k);
      if(k===d) ++c2;

      for(k=0;k<d;++k) zj[k] = 2*mu[k]-zj[k];
      for(k=0;k<d && zj[k]<=zi[k];++k);
      if(k===d) ++c2;

      zj = map(ak.vector(qrnd())).toArray();
      for(k=0;k<d && zj[k]<=zi[k];++k);
      if(k===d) ++c3;

      for(k=0;k<d;++k) zj[k] = 2*mu[k]-zj[k];
      for(k=0;k<d && zj[k]<=zi[k];++k);
      if(k===d) ++c3;
     }
     c2 /= 2*m;
     c3 /= 2*m;

     if(!(ak.diff(c1, c2)<5e-3) || !(ak.diff(c1, c3)<1e-3)) return false;
    }
    return true;
   }

   function CompareUncorrCompCDF(mccdf) {
    var mu = mccdf.mu();
    var sigma = mccdf.sigma();
    var rnd = ak.multiNormalRnd(mu, sigma);
    var cdf = ak.normalCDF();
    var d = mu.dims();
    var n = 1000;
    var i, j, z, c;
  
    for(i=0;i<n;++i) {
     z = rnd();
     c = 1;
     for(j=0;j<d;++j) {
      c *= 1 - cdf((z.at(j)-mu.at(j))/Math.sqrt(sigma.at(j, j)));
     }
     if(!(ak.diff(c, mccdf(z))<1e-12)) return false;
    }
    return true;
   }

   function compareCorrCompCDF(mccdf, n) {
    var m = 25000;
    var mu = mccdf.mu();
    var sigma = mccdf.sigma();
    var rnd = ak.multiNormalRnd(mu, sigma);
    var map = ak.multiNormalMap(mu, sigma);
    var d = mu.dims();
    var base = new Array(d);
    var i, j, k, qrnd, zi, zj, c1, c2, c3;
  
    for(k=0;k<d;++k) base[k] = ak.primeSequence(k);
    qrnd = ak.haltonRnd(base);

    mu = mu.toArray();

    for(i=0;i<n;++i) {
     zi = rnd();
     c1 = mccdf(zi);

     zi = zi.toArray();
     c2 = 0;
     c3 = 0;

     for(j=0;j<m;++j) {
      zj = rnd().toArray();
      for(k=0;k<d && zj[k]>zi[k];++k);
      if(k===d) ++c2;

      for(k=0;k<d;++k) zj[k] = 2*mu[k]-zj[k];
      for(k=0;k<d && zj[k]>zi[k];++k);
      if(k===d) ++c2;

      zj = map(ak.vector(qrnd())).toArray();
      for(k=0;k<d && zj[k]>zi[k];++k);
      if(k===d) ++c3;

      for(k=0;k<d;++k) zj[k] = 2*mu[k]-zj[k];
      for(k=0;k<d && zj[k]>zi[k];++k);
      if(k===d) ++c3;
     }
     c2 /= 2*m;
     c3 /= 2*m;

     if(!(ak.diff(c1, c2)<5e-3) || !(ak.diff(c1, c3)<1e-3)) return false;
    }
    return true;
   }
  
   function compareMap(map) {
    var mu = map.mu();
    var sigma = map.sigma();
    var d = mu.dims();
    var m = ak.vector(d, 0);
    var s = ak.matrix(d, d, 0);
    var rnd = ak.multiUniformRnd(d);
    var n = 100000;
    var i, x, z;
  
    for(i=0;i<n;++i) {
     x = map(rnd());
     z = ak.sub(x, mu);
  
     m = ak.add(m, x);
     s = ak.add(s, ak.outerMul(z, z));
    }
    m = ak.div(m, n);
    s = ak.div(s, n);
  
    return ak.diff(mu, m)<1e-2 && ak.diff(sigma, s)<1e-2;
   }
  
   function compareRnd(rnd) {
    var mu = rnd.mu();
    var sigma = rnd.sigma();
    var d = mu.dims();
    var m = ak.vector(d, 0);
    var s = ak.matrix(d, d, 0);
    var n = 100000;
    var i, x, z;
  
    for(i=0;i<n;++i) {
     x = rnd();
     z = ak.sub(x, mu);
  
     m = ak.add(m, x);
     s = ak.add(s, ak.outerMul(z, z));
    }
    m = ak.div(m, n);
    s = ak.div(s, n);
  
    return ak.diff(mu, m)<1e-2 && ak.diff(sigma, s)<1e-2;
   }
  
   val.add('pdf', function(){return comparePDF(pdf00) && comparePDF(pdf01) && comparePDF(pdf02) && comparePDF(pdf03) && comparePDF(pdf04) && comparePDF(pdf05) && comparePDF(pdf06) && comparePDF(pdf07) && comparePDF(pdf08) && comparePDF(pdf09) && comparePDF(pdf10) && comparePDF(pdf11) && comparePDF(pdf12) && comparePDF(pdf13);});
  
   val.add('cf', function(){return compareCF(cf00) && compareCF(cf01) && compareCF(cf02) && compareCF(cf03) && compareCF(cf04) && compareCF(cf05) && compareCF(cf06) && compareCF(cf07) && compareCF(cf08) && compareCF(cf09);});
  
   val.add('uncorr cdf', function(){return compareUncorrCDF(cdf00) && compareUncorrCDF(cdf01) && compareUncorrCDF(cdf02) && compareUncorrCDF(cdf03) && compareUncorrCDF(cdf04) && compareUncorrCDF(cdf05) && compareUncorrCDF(cdf12) && compareUncorrCDF(cdf13) && compareUncorrCDF(cdf14) && compareUncorrCDF(cdf15) && compareUncorrCDF(cdf18) && compareUncorrCDF(cdf21);});

   val.add('uncorr compCDF', function(){return CompareUncorrCompCDF(compCDF00) && CompareUncorrCompCDF(compCDF01) && CompareUncorrCompCDF(compCDF02) && CompareUncorrCompCDF(compCDF03) && CompareUncorrCompCDF(compCDF04) && CompareUncorrCompCDF(compCDF05) && CompareUncorrCompCDF(compCDF12) && CompareUncorrCompCDF(compCDF13) && CompareUncorrCompCDF(compCDF14) && CompareUncorrCompCDF(compCDF15) && CompareUncorrCompCDF(compCDF18) && CompareUncorrCompCDF(compCDF21);});
  
   val.add('2d cdf', function(){return compareCorrCDF(cdf23, 10) && compareCorrCDF(cdf24, 10);});

   val.add('3d cdf', function(){return compareCorrCDF(cdf25, 7) && compareCorrCDF(cdf26, 7);});
  
   val.add('4d cdf', function(){return compareCorrCDF(cdf27, 5) && compareCorrCDF(cdf28, 5);});

   val.add('2d compCDF', function(){return compareCorrCompCDF(compCDF23, 10) && compareCorrCompCDF(compCDF24, 10);});

   val.add('3d compCDF', function(){return compareCorrCompCDF(compCDF25, 7) && compareCorrCompCDF(compCDF26, 7);});
  
   val.add('4d compCDF', function(){return compareCorrCompCDF(compCDF27, 5) && compareCorrCompCDF(compCDF28, 5);});

   val.add('0d marginal cdf', function(){return cdf29(inf0d)===1;});
   val.add('1d marginal cdf', function(){return cdf29(inf1d)===ak.normalCDF(Math.sqrt(2.5))(1);});
   val.add('2d marginal cdf', function(){return cdf29(inf2d)===cdf30(ak.vector([1,1]));});
   val.add('3d marginal cdf', function(){return ak.diff(cdf29(inf3d),cdf31(ak.vector([1,1,1])))<1e-12;});
   val.add('4d marginal cdf', function(){return ak.diff(cdf29(inf4d),cdf32(ak.vector([1,1,1, 1])))<1e-2;});
  
   val.add('map', function(){return compareMap(map03) && compareMap(map07);});
  
   val.add('rnd', function(){return compareRnd(rnd03) && compareRnd(rnd07) && compareRnd(rnd10);});
  
   multiNormal.add(init);
   multiNormal.add(val);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   multiNormal.add(load);
  }

  akTest.add(multiNormal);
 }

 ak.using(['Distribution/MultiNormalDistribution.js', 'Distribution/MultiUniformDistribution.js', 'Random/HaltonRnd.js', 'Sequence/PrimeSequence.js', 'Random/MTRnd.js', 'Matrix/JacobiDecomposition.js'], define);
})();