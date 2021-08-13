"use strict";

(function() {
 function define() {
  var isCombination = {
   name: 'algorithm.isCombination',
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
   
    result = false;
    try {ak.isCombination(1);} catch(e) {result = true;}
    if(!result) return false;

    result = false;
    try {ak.isCombination([1, 2, 3, 4]);} catch(e) {result = true;}
    if(!result) return false;

    result = false;
    try {ak.isCombination([1, 2, 3, 4], 'a');} catch(e) {result = true;}
    if(!result) return false;

    result = false;
    try {ak.isCombination([1, 2, 3, 4], 2, 'a');} catch(e) {result = true;}
    if(!result) return false;
   
    result = false;
    try {ak.isCombination([1, 2, 3, 4], 2, ak.numberCompare, '1');} catch(e) {result = true;}
    if(!result) return false;
   
    result = false;
    try {ak.isCombination([1, 2, 3, 4], 2, ak.numberCompare, 1.5);} catch(e) {result = true;}
    if(!result) return false;
   
    result = false;
    try {ak.isCombination([1, 2, 3, 4], 2, ak.numberCompare, 1, 2.5);} catch(e) {result = true;}
    if(!result) return false;

    result = true;
    try {ak.isCombination([1, 2, 3, 4], 2, ak.numberCompare, 1, 3);} catch(e) {alert(e.message);result = false;}
    if(!result) return false;

    return true;
   }

   init.add('invalid arguments', invalidInit);

   var passed = {
    name: 'passed',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   function passes() {
    return ak.isCombination([1,2,3,4,5,6,7], 4, ak.numberCompare, 0, 7)
        && ak.isCombination([1,2,3,5,6,7,4], 4, ak.numberCompare, 0, 7)
        && ak.isCombination([1,2,3,4,4,4,5], 4, ak.numberCompare, 0, 7);
   }

   passed.add('apply', passes);

   var failed = {
    name: 'failed',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   function failures() {
    return !ak.isCombination([1,2,3,5,4,6,7], 4, ak.numberCompare, 0, 7)
        && !ak.isCombination([1,3,2,5,6,4,7], 4, ak.numberCompare, 0, 7);
   }

   failed.add('apply', failures);

   isCombination.add(init);
   isCombination.add(passed);
   isCombination.add(failed);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   isCombination.add(load);
  }

  akTest.add(isCombination);
 }

 ak.using(['Algorithm/IsCombination.js'], define);
})();