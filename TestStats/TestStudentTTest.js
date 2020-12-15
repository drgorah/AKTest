"use strict";

(function() {
 function define() {
  var studentT = {
   name: 'stats.studentTTest',
   body: [],
   add: function(t) {this.body.push(t);}
  };

  try {
   function roll(sides, samples) {
    var result = new Array(samples);
    var i;

    for(i=0;i<samples;++i) result[i] = (ak.floor(Math.random()*sides)+ak.floor(Math.random()*sides)+2)/2;
    return result;
   }

   function addRolls(sample1, sample2) {
    var result = sample1.slice(0);
    var i;

    for(i=0;i<sample1.length;++i) result[i] += sample2[i];
    return result;
   }

   function mean(sample) {
    var s = 0;
    var i;

    for(i=0;i<sample.length;++i) s += sample[i];
    return s/sample.length;
   }

   function dev(sample, mean) {
    var s = 0;
    var i;

    for(i=0;i<sample.length;++i) s += (sample[i]-mean)*(sample[i]-mean);
    return s/(sample.length-1);
   }

   var d41 = roll(4, 20);
   var d42 = roll(4, 20);
   var d43 = roll(4, 25);

   var d61 = roll(6, 20);
   var d62 = roll(6, 20);
   var d63 = roll(6, 25);

   var d6d4 = addRolls(d61, d41);
   var d6d6 = addRolls(d61, d62);

   var m41 = mean(d41);
   var m42 = mean(d42);
   var m43 = mean(d43);

   var m61 = mean(d61);
   var m62 = mean(d62);
   var m63 = mean(d63);

   var s41 = dev(d41, m41);
   var s42 = dev(d42, m42);
   var s43 = dev(d43, m43);

   var s61 = dev(d61, m61);
   var s62 = dev(d62, m62);
   var s63 = dev(d63, m63);

   var statOne = {
    name: 'statOne',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   statOne.add('non-array samples', function(){try{ak.studentTStatOne('a', 1.0);} catch(e){return true;} return false;});
   statOne.add('too few samples', function(){try{ak.studentTStatOne([1], 1.0);} catch(e){return true;} return false;});
   statOne.add('non-number sample', function(){try{ak.studentTStatOne([1, 'a'], 1.0);} catch(e){return true;} return false;});
   statOne.add('NaN sample', function(){try{ak.studentTStatOne([1, ak.NaN], 1.0);} catch(e){return true;} return false;});
   statOne.add('infinite sample', function(){try{ak.studentTStatOne([1, ak.INFINITY], 1.0);} catch(e){return true;} return false;});
   statOne.add('non-number mu', function(){try{ak.studentTStatOne([1, 2], 'a');} catch(e){return true;} return false;});
   statOne.add('NaN mu', function(){try{ak.studentTStatOne([1, 2], ak.NaN);} catch(e){return true;} return false;});
   statOne.add('infinite mu', function(){try{ak.studentTStatOne([1, 2], ak.INFINITY);} catch(e){return true;} return false;});
   statOne.add('failing sample', function(){return ak.diff(ak.studentTStatOne(d41, 2.5), Math.abs(m41-2.5)/Math.sqrt(s41/d41.length))<1e-7;});
   statOne.add('passing sample', function(){return ak.diff(ak.studentTStatOne(d61, 3.5), Math.abs(m61-3.5)/Math.sqrt(s61/d61.length))<1e-7;});

   var testOne = {
    name: 'testOne',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   testOne.add('non-array samples', function(){try{ak.studentTTestOne('a', 1.0);} catch(e){return true;} return false;});
   testOne.add('too few samples', function(){try{ak.studentTTestOne([1], 1.0);} catch(e){return true;} return false;});
   testOne.add('non-number sample', function(){try{ak.studentTTestOne([1, 'a'], 1.0);} catch(e){return true;} return false;});
   testOne.add('NaN sample', function(){try{ak.studentTTestOne([1, ak.NaN], 1.0);} catch(e){return true;} return false;});
   testOne.add('infinite sample', function(){try{ak.studentTTestOne([1, ak.INFINITY], 1.0);} catch(e){return true;} return false;});
   testOne.add('non-number mu', function(){try{ak.studentTTestOne([1, 2], 'a');} catch(e){return true;} return false;});
   testOne.add('NaN mu', function(){try{ak.studentTTestOne([1, 2], ak.NaN);} catch(e){return true;} return false;});
   testOne.add('infinite mu', function(){try{ak.studentTTestOne([1, 2], ak.INFINITY);} catch(e){return true;} return false;});
   testOne.add('failing sample', function(){return ak.studentTTestOne(d41, 3.5)<0.1;});
   testOne.add('passing sample', function(){return ak.studentTTestOne(d61, 3.5)>0.1;});

   var statTwo = {
    name: 'statTwo',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   statTwo.add('non-array first samples', function(){try{ak.studentTStatTwo('a', [1, 2]);} catch(e){return true;} return false;});
   statTwo.add('too few first samples', function(){try{ak.studentTStatTwo([1], [1, 2]);} catch(e){return true;} return false;});
   statTwo.add('non-number first sample', function(){try{ak.studentTStatTwo([1, 'a'], [1, 2]);} catch(e){return true;} return false;});
   statTwo.add('NaN first sample', function(){try{ak.studentTStatTwo([1, ak.NaN], [1, 2]);} catch(e){return true;} return false;});
   statTwo.add('infinite first sample', function(){try{ak.studentTStatTwo([1, ak.INFINITY], [1, 2]);} catch(e){return true;} return false;});
   statTwo.add('non-array second samples', function(){try{ak.studentTStatTwo([1, 2], 'a');} catch(e){return true;} return false;});
   statTwo.add('too few first samples', function(){try{ak.studentTStatTwo([1, 2], [1]);} catch(e){return true;} return false;});
   statTwo.add('non-number second sample', function(){try{ak.studentTStatTwo([1, 2], [1, 'a']);} catch(e){return true;} return false;});
   statTwo.add('NaN second sample', function(){try{ak.studentTStatTwo([1, 2], [1, ak.NaN]);} catch(e){return true;} return false;});
   statTwo.add('infinite second sample', function(){try{ak.studentTStatTwo([1, 2], [1, ak.INFINITY]);} catch(e){return true;} return false;});
   statTwo.add('incompatible deviations - equal sample sizes', function(){try{ak.studentTStatTwo([1, 2], [100, 200]);} catch(e){return true;} return false;});
   statTwo.add('incompatible deviations - unequal sample sizes', function(){try{ak.studentTStatTwo([1, 2], [1, 200, 300]);} catch(e){return true;} return false;});
   statTwo.add('failing sample equal size', function(){return ak.diff(ak.studentTStatTwo(d41, d42), Math.abs(m41-m42)/Math.sqrt((s41+s42)/d41.length))<1e-7;});
   statTwo.add('failing sample unequal size', function(){return ak.diff(ak.studentTStatTwo(d41, d43), Math.abs(m41-m43)/Math.sqrt(((d41.length-1)*s41+(d43.length-1)*s43)/((d41.length+d43.length-2))*(1/d41.length + 1/d43.length)))<1e-7;});
   statTwo.add('passing sample equal size', function(){return ak.diff(ak.studentTStatTwo(d61, d62), Math.abs(m61-m62)/Math.sqrt((s61+s62)/d41.length))<1e-7;});
   statTwo.add('passing sample unequal size', function(){return ak.diff(ak.studentTStatTwo(d61, d63), Math.abs(m61-m63)/Math.sqrt(((d61.length-1)*s61+(d63.length-1)*s63)/((d61.length+d63.length-2))*(1/d61.length + 1/d63.length)))<1e-7;});

   var testTwo = {
    name: 'testTwo',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   testTwo.add('non-array first samples', function(){try{ak.studentTTestTwo('a', [1, 2]);} catch(e){return true;} return false;});
   testTwo.add('too few first samples', function(){try{ak.studentTTestTwo([1], [1, 2]);} catch(e){return true;} return false;});
   testTwo.add('non-number first sample', function(){try{ak.studentTTestTwo([1, 'a'], [1, 2]);} catch(e){return true;} return false;});
   testTwo.add('NaN first sample', function(){try{ak.studentTTestTwo([1, ak.NaN], [1, 2]);} catch(e){return true;} return false;});
   testTwo.add('infinite first sample', function(){try{ak.studentTTestTwo([1, ak.INFINITY], [1, 2]);} catch(e){return true;} return false;});
   testTwo.add('non-array second samples', function(){try{ak.studentTTestTwo([1, 2], 'a');} catch(e){return true;} return false;});
   testTwo.add('too few first samples', function(){try{ak.studentTTestTwo([1, 2], [1]);} catch(e){return true;} return false;});
   testTwo.add('non-number second sample', function(){try{ak.studentTTestTwo([1, 2], [1, 'a']);} catch(e){return true;} return false;});
   testTwo.add('NaN second sample', function(){try{ak.studentTTestTwo([1, 2], [1, ak.NaN]);} catch(e){return true;} return false;});
   testTwo.add('infinite second sample', function(){try{ak.studentTTestTwo([1, 2], [1, ak.INFINITY]);} catch(e){return true;} return false;});
   testTwo.add('incompatible deviations - equal sample sizes', function(){try{ak.studentTTestTwo([1, 2], [100, 200]);} catch(e){return true;} return false;});
   testTwo.add('incompatible deviations - unequal sample sizes', function(){try{ak.studentTTestTwo([1, 2], [1, 200, 300]);} catch(e){return true;} return false;});
   testTwo.add('failing sample equal size', function(){return ak.studentTTestTwo(d61, d42)<0.1;});
   testTwo.add('failing sample unequal size', function(){return ak.studentTTestTwo(d61, d43)<0.1;});
   testTwo.add('passing sample equal size', function(){return ak.studentTTestTwo(d61, d62)>0.1;});
   testTwo.add('passing sample unequal size', function(){return ak.studentTTestTwo(d61, d63)>0.1;});

   var statPaired = {
    name: 'statPaired',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   statPaired.add('non-array initial samples', function(){try{ak.studentTStatPaired('a', [1, 2], 1.0);} catch(e){return true;} return false;});
   statPaired.add('too few initial samples', function(){try{ak.studentTStatPaired([1], [1, 2], 1.0);} catch(e){return true;} return false;});
   statPaired.add('non-number initial sample', function(){try{ak.studentTStatPaired([1, 'a'], [1, 2], 1.0);} catch(e){return true;} return false;});
   statPaired.add('NaN initial sample', function(){try{ak.studentTStatPaired([1, ak.NaN], [1, 2], 1.0);} catch(e){return true;} return false;});
   statPaired.add('infinite initial sample', function(){try{ak.studentTStatPaired([1, ak.INFINITY], [1, 2], 1.0);} catch(e){return true;} return false;});
   statPaired.add('non-array final samples', function(){try{ak.studentTStatPaired([1, 2], 'a', 1.0);} catch(e){return true;} return false;});
   statPaired.add('initial/final size mismatch', function(){try{ak.studentTStatPaired([1, 2, 3], [2, 1], 1.0);} catch(e){return true;} return false;});
   statPaired.add('non-number final sample', function(){try{ak.studentTStatPaired([1, 2], [1, 'a'], 1.0);} catch(e){return true;} return false;});
   statPaired.add('NaN final sample', function(){try{ak.studentTStatPaired([1, 2], [1, ak.NaN], 1.0);} catch(e){return true;} return false;});
   statPaired.add('infinite final sample', function(){try{ak.studentTStatPaired([1, 2], [1, ak.INFINITY], 1.0);} catch(e){return true;} return false;});
   statPaired.add('non-number mu', function(){try{ak.studentTStatPaired([1, 2], [1, 2], 'a');} catch(e){return true;} return false;});
   statPaired.add('NaN mu', function(){try{ak.studentTStatPaired([1, 2], [1, 2], ak.NaN);} catch(e){return true;} return false;});
   statPaired.add('infinite mu', function(){try{ak.studentTStatPaired([1, 2], [1, 2], ak.INFINITY);} catch(e){return true;} return false;});
   statPaired.add('failing sample', function(){return ak.diff(ak.studentTStatPaired(d61, d6d4, 2.5), Math.abs(m41-2.5)/Math.sqrt(s41/d41.length))<1e-7;});
   statPaired.add('passing sample', function(){return ak.diff(ak.studentTStatPaired(d61, d6d6, 3.5), Math.abs(m62-3.5)/Math.sqrt(s62/d62.length))<1e-7;});

   var testPaired = {
    name: 'testPaired',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   testPaired.add('non-array initial samples', function(){try{ak.studentTTestPaired('a', [1, 2], 1.0);} catch(e){return true;} return false;});
   testPaired.add('too few initial samples', function(){try{ak.studentTTestPaired([1], [1, 2], 1.0);} catch(e){return true;} return false;});
   testPaired.add('non-number initial sample', function(){try{ak.studentTTestPaired([1, 'a'], [1, 2], 1.0);} catch(e){return true;} return false;});
   testPaired.add('NaN initial sample', function(){try{ak.studentTTestPaired([1, ak.NaN], [1, 2], 1.0);} catch(e){return true;} return false;});
   testPaired.add('infinite initial sample', function(){try{ak.studentTTestPaired([1, ak.INFINITY], [1, 2], 1.0);} catch(e){return true;} return false;});
   testPaired.add('non-array final samples', function(){try{ak.studentTTestPaired([1, 2], 'a', 1.0);} catch(e){return true;} return false;});
   testPaired.add('initial/final size mismatch', function(){try{ak.studentTTestPaired([1, 2, 3], [2, 1], 1.0);} catch(e){return true;} return false;});
   testPaired.add('non-number final sample', function(){try{ak.studentTTestPaired([1, 2], [1, 'a'], 1.0);} catch(e){return true;} return false;});
   testPaired.add('NaN final sample', function(){try{ak.studentTTestPaired([1, 2], [1, ak.NaN], 1.0);} catch(e){return true;} return false;});
   testPaired.add('infinite final sample', function(){try{ak.studentTTestPaired([1, 2], [1, ak.INFINITY], 1.0);} catch(e){return true;} return false;});
   testPaired.add('non-number mu', function(){try{ak.studentTTestPaired([1, 2], [1, 2], 'a');} catch(e){return true;} return false;});
   testPaired.add('NaN mu', function(){try{ak.studentTTestPaired([1, 2], [1, 2], ak.NaN);} catch(e){return true;} return false;});
   testPaired.add('infinite mu', function(){try{ak.studentTTestPaired([1, 2], [1, 2], ak.INFINITY);} catch(e){return true;} return false;});
   testPaired.add('failing sample', function(){return ak.studentTTestPaired(d61, d6d4, 3.5)<0.1;});
   testPaired.add('passing sample', function(){return ak.studentTTestPaired(d61, d6d6, 3.5)>0.1;});

   studentT.add(statOne);
   studentT.add(testOne);
   studentT.add(statTwo);
   studentT.add(testTwo);
   studentT.add(statPaired);
   studentT.add(testPaired);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   studentT.add(load);
  }

  akTest.add(studentT);
 }

 ak.using('Stats/StudentTTest.js', define);
})();