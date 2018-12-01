"use strict";

(function() {
 function define() {
  var lowerCopula = {
   name: 'copula.lowerCopula',
   body: [],
   add: function(t) {this.body.push(t);}
  };

  try {
   var copula = ak.lowerCopula(2);
   var density = ak.lowerCopulaDensity(2);
   var rnd = ak.lowerCopulaRnd(2);

   var init = {
    name: 'init',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   function bad() {
    try {ak.lowerCopula(); return false;} catch(e) {}
    try {ak.lowerCopula('a'); return false;} catch(e) {}
    try {ak.lowerCopula(1.5); return false;} catch(e) {}
    try {ak.lowerCopula(3); return false;} catch(e) {}
    try {ak.lowerCopula(ak.INFINITY); return false;} catch(e) {}

    try {ak.lowerCopulaDensity(); return false;} catch(e) {}
    try {ak.lowerCopulaDensity('a'); return false;} catch(e) {}
    try {ak.lowerCopulaDensity(1.5); return false;} catch(e) {}
    try {ak.lowerCopulaDensity(3); return false;} catch(e) {}
    try {ak.lowerCopulaDensity(ak.INFINITY); return false;} catch(e) {}

    try {ak.lowerCopulaRnd(); return false;} catch(e) {}
    try {ak.lowerCopulaRnd('a'); return false;} catch(e) {}
    try {ak.lowerCopulaRnd(1.5); return false;} catch(e) {}
    try {ak.lowerCopulaRnd(3); return false;} catch(e) {}
    try {ak.lowerCopulaRnd(ak.INFINITY); return false;} catch(e) {}
    try {ak.lowerCopulaRnd(2, 'a'); return false;} catch(e) {}

    return true;
   }

   init.add('bad', bad);
   init.add('copula', function(){return copula.dims()===2;});
   init.add('density', function(){return density.dims()===2;});
   init.add('rnd', function(){return rnd.dims()===2 && rnd.rnd()===Math.random;});

   var val = {
    name: 'val',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   function testCopula(copula) {
    var i, j, ui, uj, u;
    for(i=0;i<=256;++i) {
     ui = i/256;
     for(j=0;j<=256;++j) {
      uj = j/256;
      u = ak.vector([ui, uj]);
      if(copula(u)!==Math.max(ui+uj-1,0)) return false;
     }
    }
    return true;
   }

   function testDensity(density) {
    var i, j, ui, uj, u;
    for(i=0;i<=256;++i) {
     ui = i/256;
     for(j=0;j<=256;++j) {
      uj = j/256;
      u = ak.vector([ui, uj]);
      if(uj!==1-ui && density(u)!==0) return false;
      if(uj===1-ui && density(u)!==ak.INFINITY) return false;
     }
    }
    return true;
   }

   function testRnd(rnd) {
    var tests = 10;
    var samples = 100000;
    var u, count, sample, x, i;

    while(tests-->0) {
     u = Math.random();
     count = 0;
     for(sample=0;sample<samples;++sample) {
      x = rnd();
      if(x.dims()!==2 || x.at(1)!==1-x.at(0)) return false;
      if(x.at(0)<=u) ++count;
     }
     if(ak.diff(count/samples, u)>5e-2) return false;
    }
    return true;
   }

   function compareRnd(copula, rnd) {
    var tests = 10;
    var samples = 100000;
    var urnd = ak.multiUniformRnd(2, 0.1, 0.9);
    var u, count, sample, x, i;

    while(tests-->0) {
     u = urnd();
     count = 0;
     for(sample=0;sample<samples;++sample) {
      x = rnd();
      i = 0;
      while(i<2 && x.at(i)<=u.at(i)) ++i;
      if(i===2) ++count;
     }
     if(ak.diff(count/samples, copula(u))>5e-2) return false;
    }
    return true;
   }

   val.add('copula', function(){return testCopula(copula);});
   val.add('density', function(){return testDensity(density);});
   val.add('rnd', function(){return testRnd(rnd);});
   val.add('copula versus rnd', function(){return compareRnd(copula, rnd);});

   lowerCopula.add(init);
   lowerCopula.add(val);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   lowerCopula.add(load);
  }

  akTest.add(lowerCopula);
 }

 ak.using('Copula/LowerCopula.js', define);
})();