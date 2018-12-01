"use strict";

(function() {
 function define() {
  var simplex = {
   name: 'geometry.simplex',
   body: [],
   add: function(t) {this.body.push(t);}
  };

  try {
   var o2 = ak.vector([1, 2, -1, -2, 0.5, -0.5]);
  
   var simplex0 = ak.simplex(4);
   var simplex1 = ak.simplex(ak.vector(5, 1));
   var simplex2 = ak.simplex(o2, 2);
   var simplex3 = ak.simplex(o2, -2);
  
   function origin(simplex) {
    var n = simplex.length;
    var o = simplex[0];
    var i;
  
    for(i=1;i<n;++i) o = ak.add(o, simplex[i]);
    return ak.div(o, n);
   }
  
   function radius(simplex, r) {
    var n = simplex.length;
    var o = origin(simplex);
    var i;
  
    for(i=0;i<n && ak.diff(ak.dist(simplex[i], o), r)<1e-10;++i);
    return i===n;
   }
  
   function regular(simplex) {
    var n = simplex.length;
    var d = ak.dist(simplex[0], simplex[1]);
    var i, j;
  
    for(i=1;i<n;++i) {
     for(j=0;j<i;++j) {
      if(ak.diff(ak.dist(simplex[i], simplex[j]), d)>=1e-10) return false;
     }
    }
    return true;
   }
  
   var simplexOrigin = {
    name: 'origin',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   simplexOrigin.add('origin0', function(){return ak.dist(origin(simplex0), ak.vector(4, 0))<1e-10;});
   simplexOrigin.add('origin1', function(){return ak.dist(origin(simplex1), ak.vector(5, 1))<1e-10;});
   simplexOrigin.add('origin2', function(){return ak.dist(origin(simplex2), o2)<1e-10;});
   simplexOrigin.add('origin3', function(){return ak.dist(origin(simplex3), o2)<1e-10;});
  
   var simplexRadius = {
    name: 'radius',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   simplexRadius.add('radius0', function(){return radius(simplex0, 1);});
   simplexRadius.add('radius1', function(){return radius(simplex1, 1);});
   simplexRadius.add('radius2', function(){return radius(simplex2, 2);});
   simplexRadius.add('radius3', function(){return radius(simplex3, 2);});
  
   var simplexRegular = {
    name: 'regular',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   simplexRegular.add('regular0', function(){return regular(simplex0);});
   simplexRegular.add('regular1', function(){return regular(simplex1);});
   simplexRegular.add('regular2', function(){return regular(simplex2);});
   simplexRegular.add('regular3', function(){return regular(simplex3);});
  
   simplex.add(simplexOrigin);
   simplex.add(simplexRadius);
   simplex.add(simplexRegular);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   simplex.add(load);
  }

  akTest.add(simplex);
 }

 ak.using('Geometry/Simplex.js', define);

})();
