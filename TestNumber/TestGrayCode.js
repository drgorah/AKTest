"use strict";

(function() {
 function define() {
  var grayCode = {
   name: 'number.grayCode',
   body: [],
   add: function(t) {this.body.push(t);}
  };

  try {
   var toGray = {
    name: 'toGray',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   toGray.add('apply',
    function() {
     if(ak.toGray(0x0000) !== 0x0000) return false;
     if(ak.toGray(0x0001) !== 0x0001) return false;
     if(ak.toGray(0x0002) !== 0x0003) return false;
     if(ak.toGray(0x0003) !== 0x0002) return false;
     if(ak.toGray(0x0004) !== 0x0006) return false;
     if(ak.toGray(0x0005) !== 0x0007) return false;
     if(ak.toGray(0x0006) !== 0x0005) return false;
     if(ak.toGray(0x0007) !== 0x0004) return false;
     if(ak.toGray(0x0008) !== 0x000c) return false;
     if(ak.toGray(0x0009) !== 0x000d) return false;
     if(ak.toGray(0x000a) !== 0x000f) return false;
     if(ak.toGray(0x000b) !== 0x000e) return false;
     if(ak.toGray(0x000c) !== 0x000a) return false;
     if(ak.toGray(0x000d) !== 0x000b) return false;
     if(ak.toGray(0x000e) !== 0x0009) return false;
     if(ak.toGray(0x000f) !== 0x0008) return false;
     if(ak.toGray(0x0010) !== 0x0018) return false;
     if(ak.toGray(0x0011) !== 0x0019) return false;
     if(ak.toGray(0x0012) !== 0x001b) return false;
     if(ak.toGray(0x0013) !== 0x001a) return false;
     if(ak.toGray(0x0014) !== 0x001e) return false;
     if(ak.toGray(0x0015) !== 0x001f) return false;
     if(ak.toGray(0x0016) !== 0x001d) return false;
     if(ak.toGray(0x0017) !== 0x001c) return false;
     if(ak.toGray(0x0018) !== 0x0014) return false;
     if(ak.toGray(0x0019) !== 0x0015) return false;
     if(ak.toGray(0x001a) !== 0x0017) return false;
     if(ak.toGray(0x001b) !== 0x0016) return false;
     if(ak.toGray(0x001c) !== 0x0012) return false;
     if(ak.toGray(0x001d) !== 0x0013) return false;
     if(ak.toGray(0x001e) !== 0x0011) return false;
     if(ak.toGray(0x001f) !== 0x0010) return false;
     if(ak.toGray(0x0020) !== 0x0030) return false;
     if(ak.toGray(0x0021) !== 0x0031) return false;
     if(ak.toGray(0x0022) !== 0x0033) return false;
     if(ak.toGray(0x0023) !== 0x0032) return false;
     if(ak.toGray(0x0024) !== 0x0036) return false;
     if(ak.toGray(0x0025) !== 0x0037) return false;
     if(ak.toGray(0x0026) !== 0x0035) return false;
     if(ak.toGray(0x0027) !== 0x0034) return false;
     if(ak.toGray(0x0028) !== 0x003c) return false;
     if(ak.toGray(0x0029) !== 0x003d) return false;
     if(ak.toGray(0x002a) !== 0x003f) return false;
     if(ak.toGray(0x002b) !== 0x003e) return false;
     if(ak.toGray(0x002c) !== 0x003a) return false;
     if(ak.toGray(0x002d) !== 0x003b) return false;
     if(ak.toGray(0x002e) !== 0x0039) return false;
     if(ak.toGray(0x002f) !== 0x0038) return false;
     if(ak.toGray(0x0030) !== 0x0028) return false;
     if(ak.toGray(0x0031) !== 0x0029) return false;
     if(ak.toGray(0x0032) !== 0x002b) return false;
     if(ak.toGray(0x0033) !== 0x002a) return false;
     if(ak.toGray(0x0034) !== 0x002e) return false;
     if(ak.toGray(0x0035) !== 0x002f) return false;
     if(ak.toGray(0x0036) !== 0x002d) return false;
     if(ak.toGray(0x0037) !== 0x002c) return false;
     if(ak.toGray(0x0038) !== 0x0024) return false;
     if(ak.toGray(0x0039) !== 0x0025) return false;
     if(ak.toGray(0x003a) !== 0x0027) return false;
     if(ak.toGray(0x003b) !== 0x0026) return false;
     return true;
    }
   );

   var fromGray = {
    name: 'fromGray',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   fromGray.add('apply',
    function() {
     if(ak.fromGray(0x0000) !== 0x0000) return false;
     if(ak.fromGray(0x0001) !== 0x0001) return false;
     if(ak.fromGray(0x0003) !== 0x0002) return false;
     if(ak.fromGray(0x0002) !== 0x0003) return false;
     if(ak.fromGray(0x0006) !== 0x0004) return false;
     if(ak.fromGray(0x0007) !== 0x0005) return false;
     if(ak.fromGray(0x0005) !== 0x0006) return false;
     if(ak.fromGray(0x0004) !== 0x0007) return false;
     if(ak.fromGray(0x000c) !== 0x0008) return false;
     if(ak.fromGray(0x000d) !== 0x0009) return false;
     if(ak.fromGray(0x000f) !== 0x000a) return false;
     if(ak.fromGray(0x000e) !== 0x000b) return false;
     if(ak.fromGray(0x000a) !== 0x000c) return false;
     if(ak.fromGray(0x000b) !== 0x000d) return false;
     if(ak.fromGray(0x0009) !== 0x000e) return false;
     if(ak.fromGray(0x0008) !== 0x000f) return false;
     if(ak.fromGray(0x0018) !== 0x0010) return false;
     if(ak.fromGray(0x0019) !== 0x0011) return false;
     if(ak.fromGray(0x001b) !== 0x0012) return false;
     if(ak.fromGray(0x001a) !== 0x0013) return false;
     if(ak.fromGray(0x001e) !== 0x0014) return false;
     if(ak.fromGray(0x001f) !== 0x0015) return false;
     if(ak.fromGray(0x001d) !== 0x0016) return false;
     if(ak.fromGray(0x001c) !== 0x0017) return false;
     if(ak.fromGray(0x0014) !== 0x0018) return false;
     if(ak.fromGray(0x0015) !== 0x0019) return false;
     if(ak.fromGray(0x0017) !== 0x001a) return false;
     if(ak.fromGray(0x0016) !== 0x001b) return false;
     if(ak.fromGray(0x0012) !== 0x001c) return false;
     if(ak.fromGray(0x0013) !== 0x001d) return false;
     if(ak.fromGray(0x0011) !== 0x001e) return false;
     if(ak.fromGray(0x0010) !== 0x001f) return false;
     if(ak.fromGray(0x0030) !== 0x0020) return false;
     if(ak.fromGray(0x0031) !== 0x0021) return false;
     if(ak.fromGray(0x0033) !== 0x0022) return false;
     if(ak.fromGray(0x0032) !== 0x0023) return false;
     if(ak.fromGray(0x0036) !== 0x0024) return false;
     if(ak.fromGray(0x0037) !== 0x0025) return false;
     if(ak.fromGray(0x0035) !== 0x0026) return false;
     if(ak.fromGray(0x0034) !== 0x0027) return false;
     if(ak.fromGray(0x003c) !== 0x0028) return false;
     if(ak.fromGray(0x003d) !== 0x0029) return false;
     if(ak.fromGray(0x003f) !== 0x002a) return false;
     if(ak.fromGray(0x003e) !== 0x002b) return false;
     if(ak.fromGray(0x003a) !== 0x002c) return false;
     if(ak.fromGray(0x003b) !== 0x002d) return false;
     if(ak.fromGray(0x0039) !== 0x002e) return false;
     if(ak.fromGray(0x0038) !== 0x002f) return false;
     if(ak.fromGray(0x0028) !== 0x0030) return false;
     if(ak.fromGray(0x0029) !== 0x0031) return false;
     if(ak.fromGray(0x002b) !== 0x0032) return false;
     if(ak.fromGray(0x002a) !== 0x0033) return false;
     if(ak.fromGray(0x002e) !== 0x0034) return false;
     if(ak.fromGray(0x002f) !== 0x0035) return false;
     if(ak.fromGray(0x002d) !== 0x0036) return false;
     if(ak.fromGray(0x002c) !== 0x0037) return false;
     if(ak.fromGray(0x0024) !== 0x0038) return false;
     if(ak.fromGray(0x0025) !== 0x0039) return false;
     if(ak.fromGray(0x0027) !== 0x003a) return false;
     if(ak.fromGray(0x0026) !== 0x003b) return false;
     return true;
    }
   );

   var random = {
    name: 'random',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   random.add('apply',
    function() {
     var n = 10000;
     var u = Math.pow(2, 31);
     var i, j;

     for(i=0;i<n;++i) {
      j = ak.floor(Math.random()*u);
      if(ak.fromGray(ak.toGray(j)) !== j) return false;
      if(ak.toGray(ak.fromGray(j)) !== j) return false;
     }
     return true;
    }
   );

   grayCode.add(toGray);
   grayCode.add(fromGray);
   grayCode.add(random);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   grayCode.add(load);
  }

  akTest.add(grayCode);
 }

 ak.using('Number/GrayCode.js', define);
})();