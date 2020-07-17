"use strict";

(function() {
 function define() {
  var blendCopula = {
   name: 'copula.blendCopula',
   body: [],
   add: function(t) {this.body.push(t);}
  };

  try {
   var gumbel = ak.gumbelCopula(2, 2);
   var joe = ak.joeCopula(2, 2);

   var element0 = ak.blendCopulaElement(gumbel, [0, 1], [2, 1]);
   var element1 = ak.blendCopulaElement(joe, [1, 2], [1, 2]);

   var copula = ak.blendCopula([element0, element1]);
   var density = ak.blendCopulaDensity([element0, element1]);

   var init = {
    name: 'init',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   function badElement() {
    try {ak.blendCopulaElement(); return false;} catch(e) {}
    try {ak.blendCopulaElement('a', [0, 1], [1, 2]); return false;} catch(e) {}
    try {ak.blendCopulaElement(ak.independentCopula(2), 'a', [1, 2]); return false;} catch(e) {}
    try {ak.blendCopulaElement(ak.independentCopula(2), ['a', 1], [1, 2]); return false;} catch(e) {}
    try {ak.blendCopulaElement(ak.independentCopula(2), [-1, 1], [1, 2]); return false;} catch(e) {}
    try {ak.blendCopulaElement(ak.independentCopula(2), [0, ak.INFINITY], [1, 2]); return false;} catch(e) {}
    try {ak.blendCopulaElement(ak.independentCopula(2), [1, 1], [1, 2]); return false;} catch(e) {}
    try {ak.blendCopulaElement(ak.independentCopula(2), [0, 1], ['a', 2]); return false;} catch(e) {}
    try {ak.blendCopulaElement(ak.independentCopula(2), [0, 1], [-1, 2]); return false;} catch(e) {}
    try {ak.blendCopulaElement(ak.independentCopula(2), [0, 1], [1, ak.INFINITY]); return false;} catch(e) {}
    try {ak.blendCopulaElement(ak.independentCopula(2), [0, 1], [1, 2]);} catch(e) {return false;}
    return true;
   }

   function bad() {
    try {ak.blendCopula(); return false;} catch(e) {}
    try {ak.blendCopula('a'); return false;} catch(e) {}
    try {ak.blendCopula([element0, 'a']); return false;} catch(e) {}
    try {ak.blendCopula([element0, element1]);} catch(e) {return false;}

    try {ak.blendCopulaDensity([element0, element1], 'a'); return false;} catch(e) {}
    try {ak.blendCopulaDensity([element0, element1], -1); return false;} catch(e) {}
    try {ak.blendCopulaDensity([element0, element1]);} catch(e) {return false;}
    try {ak.blendCopulaDensity([element0, element1], 1e-7);} catch(e) {return false;}
    return true;
   }

   init.add('bad element', badElement);
   init.add('bad', bad);
   init.add('element', function(){return element0.copula()===gumbel && element0.args()===2
                                      && element0.id(0)===0 && element0.id(1)===1
                                      && element0.weight(0)===2 && element0.weight(1)===1;});
   init.add('copula', function(){return copula.elements()[0]===element0 && copula.elements()[1]===element1;});
   init.add('density', function(){return density.elements()[0]===element0 && density.elements()[1]===element1;});

   var val = {
    name: 'val',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   function testCopula() {
    var n = 1000;
    var rnd = ak.multiUniformRnd(3);
    var i, u, u0, u1, c, c0, c1;

    for(i=0;i<n;++i) {
     u = rnd();
     u0 = ak.vector([Math.pow(u.at(0), 1), Math.pow(u.at(1), 1/2)]);
     u1 = ak.vector([Math.pow(u.at(1), 1/2), Math.pow(u.at(2), 1)]);

     c = copula(u);
     c0 = gumbel(u0);
     c1 = joe(u1);

     if(!(ak.diff(c, c0*c1)<1e-12)) return false;
    }
    return true;
   }

   function testDensity() {
    var n = 1000;
    var delta = 5e-5;
    var rnd = ak.multiUniformRnd(3, 100*delta, 1-100*delta);
    var i, u, u00, u01, u10, u11, u20, u21;
    var c000, c001, c010, c011, c100, c101, c110, c111, d0, d1;

    for(i=0;i<n;++i) {
     u = rnd();
     u00 = u.at(0)-delta; u01 = u.at(0)+delta;
     u10 = u.at(1)-delta; u11 = u.at(1)+delta;
     u20 = u.at(2)-delta; u21 = u.at(2)+delta;

     c000 = copula(ak.vector([u00,u10,u20]));
     c001 = copula(ak.vector([u00,u10,u21]));
     c010 = copula(ak.vector([u00,u11,u20]));
     c011 = copula(ak.vector([u00,u11,u21]));
     c100 = copula(ak.vector([u01,u10,u20]));
     c101 = copula(ak.vector([u01,u10,u21]));
     c110 = copula(ak.vector([u01,u11,u20]));
     c111 = copula(ak.vector([u01,u11,u21]));

     d0 = (((c111-c110) - (c101-c100)) - ((c011-c010) - (c001-c000)))/(8*delta*delta*delta);
     d1 = density(u);
     if(!(ak.diff(d0, d1)<1e-2)) return false;
    }
    return true;
   }

   val.add('copula', testCopula);
   val.add('density', testDensity);

   blendCopula.add(init);
   blendCopula.add(val);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   blendCopula.add(load);
  }

  akTest.add(blendCopula);
 }

 ak.using(['Copula/BlendCopula.js', 'Copula/IndependentCopula.js', 'Copula/GumbelCopula.js', 'Copula/JoeCopula.js', 'Distribution/MultiUniformDistribution.js'], define);
})();