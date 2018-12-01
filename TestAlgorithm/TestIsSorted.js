"use strict";

(function() {
 function define() {
  var isSorted = {
   name: 'algorithm.isSorted',
   body: [],
   add: function(t) {this.body.push(t);}
  };

  try {
   function alphaRev(l,r){return -ak.alphaCompare(l, r)};
   function numberRev(l,r){return -ak.numberCompare(l, r)};

   var alphaInc = [1, 10, 100, 2, 3, 30, 4, 5];
   var alphaIncPart = [99, 10, 100, 2, 3, 30, 2, 0];
   var alphaDec = [5, 4, 30, 3, 2, 100, 10, 1];
   var alphaDecPart = [0, 2, 30, 3, 2, 100, 10, 99];
   var numberInc = [1, 2, 3, 4, 5, 10, 30, 100];
   var numberIncPart = [99, 10, 3, 4, 5, 10, 2, 0];
   var numberDec = [100, 30, 10, 5, 4, 3, 2, 1];
   var numberDecPart = [0, 2, 10, 5, 4, 3, 10, 99];

   var init = {
    name: 'init',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   
   function invalidInit() {
    var result;

    result = false;
    try {ak.isSorted(1);} catch(e) {result = true;}
    if(!result) return false;

    result = false;
    try {ak.isSorted([1, 2, 3, 4], {});} catch(e) {result = true;}
    if(!result) return false;
   
    result = false;
    try {ak.isSorted([1, 2, 3, 4], ak.numberCompare, '1');} catch(e) {result = true;}
    if(!result) return false;
   
    result = false;
    try {ak.isSorted([1, 2, 3, 4], ak.numberCompare, 1.5);} catch(e) {result = true;}
    if(!result) return false;
   
    result = false;
    try {ak.isSorted([1, 2, 3, 4], ak.numberCompare, 1, 2.5);} catch(e) {result = true;}
    if(!result) return false;

    result = true;
    try {ak.isSorted([1, 2, 3, 4], ak.numberCompare, 1, 3);} catch(e) {result = false;}
    if(!result) return false;

    return true;
   }

   init.add('invalid arguments', invalidInit);

   var alpha = {
    name: 'alpha',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   alpha.add('full increasing', function(){return ak.isSorted(alphaInc)
                                               && !ak.isSorted(alphaDec);});

   alpha.add('part increasing', function(){return ak.isSorted(alphaIncPart, ak.alphaCompare, 1, 6)
                                               && !ak.isSorted(alphaIncPart)
                                               && ak.isSorted(alphaIncPart, ak.alphaCompare, 1, -2)
                                               && !ak.isSorted(alphaIncPart, ak.alphaCompare, 1, -1);});
   
   alpha.add('full decreasing', function(){return ak.isSorted(alphaDec, alphaRev, 0, -1)
                                               && !ak.isSorted(alphaInc, alphaRev, 0, -1);});

   alpha.add('part decreasing', function(){return ak.isSorted(alphaDecPart, alphaRev, 2, 7)
                                               && !ak.isSorted(alphaDecPart, alphaRev, 0, -1)
                                               && ak.isSorted(alphaDecPart, alphaRev, 2, -1)
                                               && !ak.isSorted(alphaDecPart, alphaRev, 2, 8);});

   var number = {
    name: 'number',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   number.add('full increasing', function(){return ak.isSorted(numberInc, ak.numberCompare)
                                               && !ak.isSorted(numberDec, ak.numberCompare);});

   number.add('part increasing', function(){return ak.isSorted(numberIncPart, ak.numberCompare, 2, 6)
                                               && !ak.isSorted(numberIncPart, ak.numberCompare)
                                               && ak.isSorted(numberIncPart, ak.numberCompare, 2, -2)
                                               && !ak.isSorted(numberIncPart, ak.numberCompare, 1, -1);});
   
   number.add('full decreasing', function(){return ak.isSorted(numberDec, numberRev, 0, -1)
                                               && !ak.isSorted(numberInc, numberRev, 0, -1);});

   number.add('part decreasing', function(){return ak.isSorted(numberDecPart, numberRev, 2, 6)
                                               && !ak.isSorted(numberDecPart, numberRev, 0, -1)
                                               && ak.isSorted(numberDecPart, numberRev, 2, -2)
                                               && !ak.isSorted(numberDecPart, numberRev, 2, 8);});

   isSorted.add(init);
   isSorted.add(alpha);
   isSorted.add(number);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   isSorted.add(load);
  }

  akTest.add(isSorted);
 }

 ak.using('Algorithm/IsSorted.js', define);
})();