"use strict";

(function() {
 function define() {
  var arrayIndex = {
   name: 'algorithm.arrayIndex',
   body: [],
   add: function(t) {this.body.push(t);}
  };

  try {
   var args = {
    name: 'args',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   function invalidArgs() {
    var result;

    result = false;
    try {ak.arrayIndex({});} catch(e) {result = true;}
    if(!result) return false;

    result = false;
    try {ak.arrayIndex([], 1.5);} catch(e) {result = true;}
    if(!result) return false;

    result = false;
    try {ak.arrayIndex([], {});} catch(e) {result = true;}
    if(!result) return false;

    result = true;
    try {ak.arrayIndex([], 1);} catch(e) {result = false;}
    return result;
   }

   args.add('invalid arguments', invalidArgs);

   var bounds = {
    name: 'bounds',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   bounds.add('undefined', function(){return ak.nativeType(ak.arrayIndex([1,2,3,4]))===ak.UNDEFINED_T;});
   bounds.add('positive', function(){return ak.arrayIndex([1,2,3,4], 1)===1;});
   bounds.add('negative', function(){return ak.arrayIndex([1,2,3,4], -1)===3;});
   bounds.add('over', function(){return ak.arrayIndex([1,2,3,4], 6)===4;});
   bounds.add('under', function(){return ak.arrayIndex([1,2,3,4], -6)===0;});

   arrayIndex.add(args);
   arrayIndex.add(bounds);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   arrayIndex.add(load);
  }

  akTest.add(arrayIndex);
 }

 ak.using('Algorithm/ArrayIndex.js', define);
})();