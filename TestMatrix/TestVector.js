"use strict";

(function() {
 function define() {
  var vector = {
   name: 'matrix.vector',
   body: [],
   add: function(t) {this.body.push(t);}
  };

  try {
   var eps = 2*ak.EPSILON;
  
   var v0 = ak.vector([1, 2, 3]);
   var v1 = ak.vector(v0);
   var v2 = ak.vector({dims: 3, at: function(i){return i;}});
   var v3 = ak.vector(3, function(i){return i*i;});
   var v4 = ak.vector(3, 1);
   var v5 = ak.vector(4);
   var v6 = ak.vector([123.456789, 0.00987654]);
  
   var init = {
    name: 'init',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   init.add('array',    function(){return ak.type(v0)==ak.VECTOR_T && v0.dims()===3 && v0.at(0)===1 && v0.at(1)===2 && v0.at(2)===3;});
   init.add('vector',   function(){return ak.type(v1)==ak.VECTOR_T && v1.dims()===3 && v1.at(0)===1 && v1.at(1)===2 && v1.at(2)===3;});
   init.add('object',   function(){return ak.type(v2)==ak.VECTOR_T && v2.dims()===3 && v2.at(0)===0 && v2.at(1)===1 && v2.at(2)===2;});
   init.add('function', function(){return ak.type(v3)==ak.VECTOR_T && v3.dims()===3 && v3.at(0)===0 && v3.at(1)===1 && v3.at(2)===4;});
   init.add('number',   function(){return ak.type(v4)==ak.VECTOR_T && v4.dims()===3 && v4.at(0)===1 && v4.at(1)===1 && v4.at(2)===1;});
   init.add('zero',     function(){return ak.type(v5)==ak.VECTOR_T && v5.dims()===4 && v5.at(0)===0 && v5.at(1)===0 && v5.at(2)===0 && v5.at(3)===0;});
  
   var members = {
    name: 'members',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   members.add('at',            function(){return v0.at(0)===1 && v0.at(1)===2 && v0.at(2)===3;});
   members.add('at - bad',      function(){return isNaN(v0.at(-1)) && isNaN(v0.at(1.5)) && isNaN(v0.at(3)) && isNaN(v0.at('pop'));});
   members.add('dims',          function(){return v0.dims()===3;});
   members.add('toArray',       function(){var v = v0.toArray(); return ak.type(v)===ak.ARRAY_T && v[0]===1 && v[1]===2 && v[2]===3;});
   members.add('toString',      function(){return v0.toString()==='[1,2,3]';});
   members.add('toExponential', function(){return v6.toExponential(2)==='[1.23e+2,9.88e-3]';});
   members.add('toFixed',       function(){return v6.toFixed(3)==='[123.457,0.010]';});
   members.add('toPrecision',   function(){return v6.toPrecision(3)==='[123,0.00988]';});
   members.add('valueOf',  function(){return isNaN(1 - v0);});
  
   var operators = {
    name: 'operators',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   operators.add('diff',       function(){return ak.diff(v0, v2)>eps && ak.diff(v0, v1)<eps;});
   operators.add('diffRV',     function(){try{ak.diff(1, v0);}catch(e){return true;} return false;});
   operators.add('diffVR',     function(){try{ak.diff(v0, 1);}catch(e){return true;} return false;});
   operators.add('diff - mis', function(){try{ak.diff(v0, v5);}catch(e){return true;} return false;});
  
   operators.add('abs',        function(){return ak.diff(ak.abs(v0), Math.sqrt(14))<eps;});
   operators.add('neg',        function(){return ak.eq(ak.neg(v0), ak.vector([-1, -2, -3]));});
  
   operators.add('add',        function(){return ak.eq(ak.add(v0,v2), ak.vector([1, 3, 5]));});
   operators.add('addRV',      function(){try{ak.add(1, v0);}catch(e){return true;} return false;});
   operators.add('addVR',      function(){try{ak.add(v0, 1);}catch(e){return true;} return false;});
   operators.add('add - mis',  function(){try{ak.add(v0, v5);}catch(e){return true;} return false;});
   operators.add('dist',       function(){return ak.diff(ak.dist(v2,v3), 2)<eps;});
   operators.add('distRV',     function(){try{ak.dist(1, v0);}catch(e){return true;} return false;});
   operators.add('distVR',     function(){try{ak.dist(v0, 1);}catch(e){return true;} return false;});
   operators.add('dist - mis', function(){try{ak.dist(v0, v5);}catch(e){return true;} return false;});
   operators.add('div',        function(){return ak.eq(ak.div(v0, 2), ak.vector([0.5, 1, 1.5]));});
   operators.add('eq',         function(){return ak.eq(v0, v1) && !ak.eq(v0, v2) && !ak.eq(v0, v5);});
   operators.add('mul',        function(){return ak.eq(ak.mul(v0, v2), 8);});
   operators.add('mulRV',      function(){return ak.eq(ak.mul(2, v2), ak.vector([0, 2, 4]));});
   operators.add('mulVR',      function(){return ak.eq(ak.mul(v2, 2), ak.vector([0, 2, 4]));});
   operators.add('mul - mis',  function(){try{ak.mul(v0, v5);}catch(e){return true;} return false;});
   operators.add('ne',         function(){return !ak.ne(v0, v1) && ak.ne(v0, v2) && ak.ne(v0, v5);});
   operators.add('sub',        function(){return ak.eq(ak.sub(v0, v3), ak.vector([1, 1, -1]));});
   operators.add('subRV',      function(){try{ak.sub(1, v0);}catch(e){return true;} return false;});
   operators.add('subVR',      function(){try{ak.sub(v0, 1);}catch(e){return true;} return false;});
   operators.add('sub - mis',  function(){try{ak.sub(v0, v5);}catch(e){return true;} return false;});
  
   vector.add(init);
   vector.add(members);
   vector.add(operators);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   vector.add(load);
  }

  akTest.add(vector);
 }

 ak.using('Matrix/Vector.js', define);
})();
