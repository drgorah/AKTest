"use strict";

(function() {
 function define() {
  var median = {
   name: 'algorithm.median',
   body: [],
   add: function(t) {this.body.push(t);}
  };

  var a1 = [3, 1, 4, 1, 5, 9];
  var a2 = [3, 1, 4, 1, 5, 9, 2];

  try {
   var init = {
    name: 'init',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   
   function invalidInit() {
    var result;
   
    result = false;
    try {ak.median(1, 0);} catch(e) {result = true;}
    if(!result) return false;

    result = false;
    try {ak.median([1, 2, 3, 4], '1');} catch(e) {result = true;}
    if(!result) return false;

    result = false;
    try {ak.median([1, 2, 3, 4], 1.5);} catch(e) {result = true;}
    if(!result) return false;

    result = false;
    try {ak.median([1, 2, 3, 4], {});} catch(e) {result = true;}
    if(!result) return false;
   
    result = false;
    try {ak.median([1, 2, 3, 4], ak.numberCompare, '1');} catch(e) {result = true;}
    if(!result) return false;
   
    result = false;
    try {ak.median([1, 2, 3, 4], ak.numberCompare, 1.5);} catch(e) {result = true;}
    if(!result) return false;
   
    result = false;
    try {ak.median([1, 2, 3, 4], ak.numberCompare, 1, 2.5);} catch(e) {result = true;}
    if(!result) return false;

    result = true;
    try {ak.median([1, 2, 3, 4], ak.numberCompare, 1, 3);} catch(e) {result = false;}
    if(!result) return false;

    return true;
   }

   init.add('invalid arguments', invalidInit);

   var apply = {
    name: 'apply',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   apply.add('non-empty', function(){
    var m1 = ak.median(a1, ak.numberCompare);
    var m2 = ak.median(a2, ak.numberCompare);
    return m1[0]===3 && m1[1]===4 && m2[0]===3 && m2[1]===3;
   });

   apply.add('empty', function(){
    var m = ak.median(a1, ak.numberCompare, 5, 3);
    return m.length===0;
   });

   median.add(init);
   median.add(apply);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   median.add(load);
  }

  akTest.add(median);
 }

 ak.using(['Algorithm/Median.js'], define);
})();