"use strict";

(function() {
 function define() {
  var isPartitioned = {
   name: 'algorithm.isPartitioned',
   body: [],
   add: function(t) {this.body.push(t);}
  };

  function pred(v, compare) {
   if(ak.nativeType(compare)===ak.UNDEFINED_T) compare = ak.alphaCompare;
   return function(x){return compare(x, v)<0;};
  }

  try {
   function alphaRev(l,r){return -ak.alphaCompare(l, r)};
   function numberRev(l,r){return -ak.numberCompare(l, r)};

   var alphaFull = [1, 2, 100, 10, 30, 4, 3, 5];
   var alphaPart = [99, 100, 2, 10, 2, 3, 10, 0];
   var numberFull = [1, 5, 2, 4, 3, 30, 10, 100];
   var numberPart = [99, 10, 3, 4, 5, 10, 2, 0];

   var init = {
    name: 'init',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   
   function invalidInit() {
    var result;

    result = false;
    try {ak.isPartitioned(1, pred(0));} catch(e) {result = true;}
    if(!result) return false;

    result = false;
    try {ak.isPartitioned([1, 2, 3, 4], {});} catch(e) {result = true;}
    if(!result) return false;
   
    result = false;
    try {ak.isPartitioned([1, 2, 3, 4], pred(0), '1');} catch(e) {result = true;}
    if(!result) return false;
   
    result = false;
    try {ak.isPartitioned([1, 2, 3, 4], pred(0), 1.5);} catch(e) {result = true;}
    if(!result) return false;
   
    result = false;
    try {ak.isPartitioned([1, 2, 3, 4], pred(0), 1, 2.5);} catch(e) {result = true;}
    if(!result) return false;

    result = true;
    try {ak.isPartitioned([1, 2, 3, 4], pred(0), 1, 3);} catch(e) {result = false;}
    if(!result) return false;

    return true;
   }

   init.add('invalid arguments', invalidInit);

   var alpha = {
    name: 'alpha',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   alpha.add('full', function(){return ak.isPartitioned(alphaFull, pred(20))
                                    && !ak.isPartitioned(alphaFull, pred(100));});

   alpha.add('part', function(){return ak.isPartitioned(alphaPart, pred(20), 1, 6)
                                    && !ak.isPartitioned(alphaPart, pred(20))
                                    && ak.isPartitioned(alphaPart, pred(20), 1, -3)
                                    && !ak.isPartitioned(alphaPart, pred(20), 1, -1);});

   var number = {
    name: 'number',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   number.add('full', function(){return ak.isPartitioned(numberFull, pred(6, ak.numberCompare))
                                     && !ak.isPartitioned(numberFull, pred(11, ak.numberCompare));});

   number.add('part', function(){return ak.isPartitioned(numberPart, pred(6, ak.numberCompare), 2, 6)
                                     && !ak.isPartitioned(numberPart, pred(6, ak.numberCompare))
                                     && ak.isPartitioned(numberPart, pred(6, ak.numberCompare), 2, -3)
                                     && !ak.isPartitioned(numberPart, pred(6, ak.numberCompare), 1, -1);});

   isPartitioned.add(init);
   isPartitioned.add(alpha);
   isPartitioned.add(number);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   isPartitioned.add(load);
  }

  akTest.add(isPartitioned);
 }

 ak.using('Algorithm/IsPartitioned.js', define);
})();