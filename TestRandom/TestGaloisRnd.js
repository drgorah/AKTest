"use strict";

(function() {
 function define() {
  var galoisRnd = {
   name: 'random.galoisRnd',
   body: [],
   add: function(t) {this.body.push(t);}
  };

  try {
   var init = {
    name: 'init',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   function invalidInit() {
    var result;
  
    result = false
    try {ak.galoisRnd('', [1, 2, 3]);} catch(e) {result = true;}
    if(!result) return false;
  
    result = false
    try {ak.galoisRnd(1, [1, 2, 3]);} catch(e) {result = true;}
    if(!result) return false;
  
    result = false
    try {ak.galoisRnd(1.5, [1, 2, 3]);} catch(e) {result = true;}
    if(!result) return false;
  
    result = false
    try {ak.galoisRnd(ak.NaN, [1, 2, 3]);} catch(e) {result = true;}
    if(!result) return false;
  
    result = false
    try {ak.galoisRnd(32, []);} catch(e) {result = true;}
    if(!result) return false;
  
    result = false
    try {ak.galoisRnd(32, '');} catch(e) {result = true;}
    if(!result) return false;
  
    result = false
    try {ak.galoisRnd(32, [-1, 2, 3]);} catch(e) {result = true;}
    if(!result) return false;
  
    result = false
    try {ak.galoisRnd(32, [1, '', 3]);} catch(e) {result = true;}
    if(!result) return false;
  
    result = false
    try {ak.galoisRnd(32, [1, 2, ak.NaN]);} catch(e) {result = true;}
    if(!result) return false;
  
    result = false
    try {ak.galoisRnd(32, [1, 2, 0]);} catch(e) {result = true;}
    if(!result) return false;
  
    result = false
    try {ak.galoisRnd(32, [1, 2, 64]);} catch(e) {result = true;}
    if(!result) return false;
  
    result = false
    try {ak.galoisRnd(32, [1, 2, 2]);} catch(e) {result = true;}
    if(!result) return false;
  
    return true;
   }
  
   init.add('invalid arguments', invalidInit);
  
   function countRuns(rnd) {
    var n = 1000000;
    var runs = [0, 0, 0, 0];
    var err = 0;
    var i, x0, run;
  
    for(i=0;i<n;++i) {
     x0 = rnd();
     run = 0;
     while(rnd()===x0) ++run;
     if(run<runs.length) runs[run] += 1;
    }
    for(i=0;i<runs.length;++i) err += ak.diff(runs[i]/n, Math.pow(0.5, i+1));
    return err/runs.length < 1e-3;
   }
  
   var sequence = {
    name: 'sequence',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   sequence.add('small runs', function(){return countRuns(ak.galoisRnd(30, [24, 26, 29]));});
   sequence.add('mid runs', function(){return countRuns(ak.galoisRnd(62, [56, 57, 59]));});
   sequence.add('big runs', function(){return countRuns(ak.galoisRnd(65, 47));});
  
   galoisRnd.add(init);
   galoisRnd.add(sequence);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   galoisRnd.add(load);
  }

  akTest.add(galoisRnd);
 }

 ak.using('Random/GaloisRnd.js', define);
})();