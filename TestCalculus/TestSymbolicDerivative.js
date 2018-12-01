"use strict";

(function() {
 function define() {
  var symbolicDerivative = {
   name: 'calculus.symbolicDerivative',
   body: [],
   add: function(t) {this.body.push(t);}
  };

  try {
   var x0 = ak.varExpr();
   var x1 = ak.varExpr();
   var c0 = ak.intExpr(1);
   var c1 = ak.piExpr();
  
   var number = {
    name: 'number',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   number.add('c0', function(){return ak.symbolicDerivative(c0, x0).approx()===0;});
   number.add('c1', function(){return ak.symbolicDerivative(c1, x0).approx()===0;});
  
   var variable = {
    name: 'variable',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   variable.add('x0', function(){return ak.symbolicDerivative(x0, x0).approx()===1;});
   variable.add('x1', function(){return ak.symbolicDerivative(x1, x0).approx()===0;});
  
   var unary = {
    name: 'unary',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   unary.add('abs', function(){
    var x   = ak.varExpr();
    var f   = ak.abs(x);
    var df1 = ak.symbolicDerivative(f, x);
    var df2 = ak.ridderDerivative(Math.abs);
  
    x.value(ak.approxExpr(0.5));
    if(df1.approx()!==1 || ak.diff(df1.approx(), df2(0.5))>100*ak.EPSILON) return false;
  
    x.value(ak.approxExpr(-0.5));
    if(df1.approx()!==-1 || ak.diff(df1.approx(), df2(-0.5))>100*ak.EPSILON) return false;
  
    return true;
   });
  
   unary.add('acos', function(){
    var x   = ak.varExpr();
    var f   = ak.acos(x);
    var df1 = ak.symbolicDerivative(f, x);
    var df2 = ak.ridderDerivative(Math.acos);
  
    x.value(ak.approxExpr(0.5));
    if(df1.approx()!==-1/Math.sqrt(1-0.5*0.5) || ak.diff(df1.approx(), df2(0.5))>100.0*ak.EPSILON) return false;
  
    x.value(ak.approxExpr(-0.5));
    if(df1.approx()!==-1/Math.sqrt(1-0.5*0.5) || ak.diff(df1.approx(), df2(-0.5))>100.0*ak.EPSILON) return false;
  
    return true;
   });
  
   unary.add('asin', function(){
    var x   = ak.varExpr();
    var f   = ak.asin(x);
    var df1 = ak.symbolicDerivative(f, x);
    var df2 = ak.ridderDerivative(Math.asin);
  
    x.value(ak.approxExpr(0.5));
    if(df1.approx()!==1/Math.sqrt(1-0.5*0.5) || ak.diff(df1.approx(), df2(0.5))>100.0*ak.EPSILON) return false;
  
    x.value(ak.approxExpr(-0.5));
    if(df1.approx()!==1/Math.sqrt(1-0.5*0.5) || ak.diff(df1.approx(), df2(-0.5))>100.0*ak.EPSILON) return false;
  
    return true;
   });
  
   unary.add('atan', function(){
    var x   = ak.varExpr();
    var f   = ak.atan(x);
    var df1 = ak.symbolicDerivative(f, x);
    var df2 = ak.ridderDerivative(Math.atan);
  
    x.value(ak.approxExpr(0.5));
    if(df1.approx()!==1/(1+0.5*0.5) || ak.diff(df1.approx(), df2(0.5))>100.0*ak.EPSILON) return false;
  
    x.value(ak.approxExpr(-0.5));
    if(df1.approx()!==1/(1+0.5*0.5) || ak.diff(df1.approx(), df2(-0.5))>100.0*ak.EPSILON) return false;
  
    return true;
   });
  
   unary.add('cos', function(){
    var x   = ak.varExpr();
    var f   = ak.cos(x);
    var df1 = ak.symbolicDerivative(f, x);
    var df2 = ak.ridderDerivative(Math.cos);
  
    x.value(ak.approxExpr(0.5));
    if(df1.approx()!==-Math.sin(0.5) || ak.diff(df1.approx(), df2(0.5))>100.0*ak.EPSILON) return false;
  
    x.value(ak.approxExpr(-0.5));
    if(df1.approx()!==-Math.sin(-0.5) || ak.diff(df1.approx(), df2(-0.5))>100.0*ak.EPSILON) return false;
  
    return true;
   });
  
   unary.add('cosh', function(){
    var x   = ak.varExpr();
    var f   = ak.cosh(x);
    var df1 = ak.symbolicDerivative(f, x);
    var df2 = ak.ridderDerivative(ak.cosh);
  
    x.value(ak.approxExpr(0.5));
    if(df1.approx()!==ak.sinh(0.5) || ak.diff(df1.approx(), df2(0.5))>100.0*ak.EPSILON) return false;
  
    x.value(ak.approxExpr(-0.5));
    if(df1.approx()!==ak.sinh(-0.5) || ak.diff(df1.approx(), df2(-0.5))>100.0*ak.EPSILON) return false;
  
    return true;
   });
  
   unary.add('exp', function(){
    var x   = ak.varExpr();
    var f   = ak.exp(x);
    var df1 = ak.symbolicDerivative(f, x);
    var df2 = ak.ridderDerivative(Math.exp);
  
    x.value(ak.approxExpr(0.5));
    if(df1.approx()!==Math.exp(0.5) || ak.diff(df1.approx(), df2(0.5))>100.0*ak.EPSILON) return false;
  
    x.value(ak.approxExpr(-0.5));
    if(df1.approx()!==Math.exp(-0.5) || ak.diff(df1.approx(), df2(-0.5))>100.0*ak.EPSILON) return false;
  
    return true;
   });
  
   unary.add('inv', function(){
    var x   = ak.varExpr();
    var f   = ak.inv(x);
    var df1 = ak.symbolicDerivative(f, x);
    var df2 = ak.ridderDerivative(ak.inv);
  
    x.value(ak.approxExpr(0.5));
    if(df1.approx()!==-4 || ak.diff(df1.approx(), df2(0.5))>100.0*ak.EPSILON) return false;
  
    x.value(ak.approxExpr(-0.5));
    if(df1.approx()!==-4 || ak.diff(df1.approx(), df2(-0.5))>100.0*ak.EPSILON) return false;
  
    return true;
   });
  
   unary.add('log', function(){
    var x   = ak.varExpr();
    var f   = ak.log(x);
    var df1 = ak.symbolicDerivative(f, x);
    var df2 = ak.ridderDerivative(Math.log);
  
    x.value(ak.approxExpr(0.5));
    if(df1.approx()!==2 || ak.diff(df1.approx(), df2(0.5))>100.0*ak.EPSILON) return false;
  
    x.value(ak.approxExpr(2));
    if(df1.approx()!==0.5 || ak.diff(df1.approx(), df2(2))>100.0*ak.EPSILON) return false;
  
    return true;
   });
  
   unary.add('neg', function(){
    var x   = ak.varExpr();
    var f   = ak.neg(x);
    var df1 = ak.symbolicDerivative(f, x);
    var df2 = ak.ridderDerivative(ak.neg);
  
    x.value(ak.approxExpr(0.5));
    if(df1.approx()!==-1 || ak.diff(df1.approx(), df2(0.5))>100.0*ak.EPSILON) return false;
  
    x.value(ak.approxExpr(-0.5));
    if(df1.approx()!==-1 || ak.diff(df1.approx(), df2(-0.5))>100.0*ak.EPSILON) return false;
  
    return true;
   });
  
   unary.add('sin', function(){
    var x   = ak.varExpr();
    var f   = ak.sin(x);
    var df1 = ak.symbolicDerivative(f, x);
    var df2 = ak.ridderDerivative(Math.sin);
  
    x.value(ak.approxExpr(0.5));
    if(df1.approx()!==Math.cos(0.5) || ak.diff(df1.approx(), df2(0.5))>100.0*ak.EPSILON) return false;
  
    x.value(ak.approxExpr(-0.5));
    if(df1.approx()!==Math.cos(-0.5) || ak.diff(df1.approx(), df2(-0.5))>100.0*ak.EPSILON) return false;
  
    return true;
   });
  
   unary.add('sinh', function(){
    var x   = ak.varExpr();
    var f   = ak.sinh(x);
    var df1 = ak.symbolicDerivative(f, x);
    var df2 = ak.ridderDerivative(ak.sinh);
  
    x.value(ak.approxExpr(0.5));
    if(df1.approx()!==ak.cosh(0.5) || ak.diff(df1.approx(), df2(0.5))>100.0*ak.EPSILON) return false;
  
    x.value(ak.approxExpr(-0.5));
    if(df1.approx()!==ak.cosh(-0.5) || ak.diff(df1.approx(), df2(-0.5))>100.0*ak.EPSILON) return false;
  
    return true;
   });
  
   unary.add('sqrt', function(){
    var x   = ak.varExpr();
    var f   = ak.sqrt(x);
    var df1 = ak.symbolicDerivative(f, x);
    var df2 = ak.ridderDerivative(Math.sqrt);
  
    x.value(ak.approxExpr(0.5));
    if(df1.approx()!==1/(2*Math.sqrt(0.5)) || ak.diff(df1.approx(), df2(0.5))>100.0*ak.EPSILON) return false;
  
    x.value(ak.approxExpr(2));
    if(df1.approx()!==1/(2*Math.sqrt(2)) || ak.diff(df1.approx(), df2(2))>100.0*ak.EPSILON) return false;
  
    return true;
   });
  
   unary.add('tan', function(){
    var x   = ak.varExpr();
    var f   = ak.tan(x);
    var df1 = ak.symbolicDerivative(f, x);
    var df2 = ak.ridderDerivative(Math.tan);
  
    x.value(ak.approxExpr(0.5));
    if(df1.approx()!==1/(Math.cos(0.5)*Math.cos(0.5)) || ak.diff(df1.approx(), df2(0.5))>100.0*ak.EPSILON) return false;
  
    x.value(ak.approxExpr(-0.5));
    if(df1.approx()!==1/(Math.cos(-0.5)*Math.cos(-0.5)) || ak.diff(df1.approx(), df2(-0.5))>100.0*ak.EPSILON) return false;
  
    return true;
   });
  
   unary.add('tanh', function(){
    var x   = ak.varExpr();
    var f   = ak.tanh(x);
    var df1 = ak.symbolicDerivative(f, x);
    var df2 = ak.ridderDerivative(ak.tanh);
  
    x.value(ak.approxExpr(0.5));
    if(df1.approx()!==1/(ak.cosh(0.5)*ak.cosh(0.5)) || ak.diff(df1.approx(), df2(0.5))>100.0*ak.EPSILON) return false;
  
    x.value(ak.approxExpr(-0.5));
    if(df1.approx()!==1/(ak.cosh(-0.5)*ak.cosh(-0.5)) || ak.diff(df1.approx(), df2(-0.5))>100.0*ak.EPSILON) return false;
  
    return true;
   });
  
   var binary = {
    name: 'binary',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   binary.add('add', function(){
    var x   = ak.varExpr();
    var f   = ak.add(ak.exp(x), ak.sin(x));
    var df1 = ak.symbolicDerivative(f, x);
    var df2 = ak.ridderDerivative(function(x){return Math.exp(x) + Math.sin(x);});
  
    x.value(ak.approxExpr(0.5));
    if(df1.approx()!==Math.exp(0.5)+Math.cos(0.5) || ak.diff(df1.approx(), df2(0.5))>100.0*ak.EPSILON) return false;
  
    x.value(ak.approxExpr(-0.5));
    if(df1.approx()!==Math.exp(-0.5)+Math.cos(-0.5) || ak.diff(df1.approx(), df2(-0.5))>100.0*ak.EPSILON) return false;
  
    return true;
   });
  
   binary.add('dist', function(){
    var x   = ak.varExpr();
    var f   = ak.dist(ak.exp(x), ak.sin(x));
    var df1 = ak.symbolicDerivative(f, x);
    var df2 = ak.ridderDerivative(function(x){return ak.dist(Math.exp(x), Math.sin(x));});
  
    x.value(ak.approxExpr(0.5));
    if(df1.approx()!==((Math.exp(0.5)-Math.sin(0.5))/(Math.abs(Math.exp(0.5)-Math.sin(0.5))))*(Math.exp(0.5)-Math.cos(0.5)) || ak.diff(df1.approx(), df2(0.5))>100.0*ak.EPSILON) return false;
  
    x.value(ak.approxExpr(-0.5));
    if(df1.approx()!==((Math.exp(-0.5)-Math.sin(-0.5))/(Math.abs(Math.exp(-0.5)-Math.sin(-0.5))))*(Math.exp(-0.5)-Math.cos(-0.5)) || ak.diff(df1.approx(), df2(-0.5))>100.0*ak.EPSILON) return false;
  
    return true;
   });
  
   binary.add('div', function(){
    var x   = ak.varExpr();
    var f   = ak.div(ak.exp(x), ak.sin(x));
    var df1 = ak.symbolicDerivative(f, x);
    var df2 = ak.ridderDerivative(function(x){return Math.exp(x) / Math.sin(x);});
  
    x.value(ak.approxExpr(0.5));
    if(df1.approx()!==Math.exp(0.5)/Math.sin(0.5) - (Math.exp(0.5)/Math.pow(Math.sin(0.5), 2))*Math.cos(0.5) || ak.diff(df1.approx(), df2(0.5))>100.0*ak.EPSILON) return false;
  
    x.value(ak.approxExpr(-0.5));
    if(df1.approx()!==Math.exp(-0.5)/Math.sin(-0.5) - (Math.exp(-0.5)/Math.pow(Math.sin(-0.5), 2))*Math.cos(-0.5) || ak.diff(df1.approx(), df2(-0.5))>100.0*ak.EPSILON) return false;
  
    return true;
   });
  
   binary.add('mul', function(){
    var x   = ak.varExpr();
    var f   = ak.mul(ak.exp(x), ak.sin(x));
    var df1 = ak.symbolicDerivative(f, x);
    var df2 = ak.ridderDerivative(function(x){return Math.exp(x) * Math.sin(x);});
  
    x.value(ak.approxExpr(0.5));
    if(df1.approx()!==Math.exp(0.5)*Math.sin(0.5)+Math.exp(0.5)*Math.cos(0.5) || ak.diff(df1.approx(), df2(0.5))>100.0*ak.EPSILON) return false;
  
    x.value(ak.approxExpr(-0.5));
    if(df1.approx()!==Math.exp(-0.5)*Math.sin(-0.5)+Math.exp(-0.5)*Math.cos(-0.5) || ak.diff(df1.approx(), df2(-0.5))>100.0*ak.EPSILON) return false;
  
    return true;
   });
  
   binary.add('pow', function(){
    var x   = ak.varExpr();
    var f   = ak.pow(ak.exp(x), ak.sin(x));
    var df1 = ak.symbolicDerivative(f, x);
    var df2 = ak.ridderDerivative(function(x){return Math.pow(Math.exp(x), Math.sin(x));});
  
    x.value(ak.approxExpr(0.5));
    if(df1.approx()!==Math.pow(Math.exp(0.5), Math.sin(0.5))*(Math.cos(0.5)*Math.log(Math.exp(0.5)) + (Math.sin(0.5)/Math.exp(0.5))*Math.exp(0.5)) || ak.diff(df1.approx(), df2(0.5))>100.0*ak.EPSILON) return false;
  
    x.value(ak.approxExpr(-0.5));
    if(df1.approx()!==Math.pow(Math.exp(-0.5), Math.sin(-0.5))*(Math.cos(-0.5)*Math.log(Math.exp(-0.5)) + (Math.sin(-0.5)/Math.exp(-0.5))*Math.exp(-0.5)) || ak.diff(df1.approx(), df2(-0.5))>100.0*ak.EPSILON) return false;
    return true;
   });
  
   binary.add('sub', function(){
    var x   = ak.varExpr();
    var f   = ak.sub(ak.exp(x), ak.sin(x));
    var df1 = ak.symbolicDerivative(f, x);
    var df2 = ak.ridderDerivative(function(x){return Math.exp(x) - Math.sin(x);});
  
    x.value(ak.approxExpr(0.5));
    if(df1.approx()!==Math.exp(0.5)-Math.cos(0.5) || ak.diff(df1.approx(), df2(0.5))>100.0*ak.EPSILON) return false;
  
    x.value(ak.approxExpr(-0.5));
    if(df1.approx()!==Math.exp(-0.5)-Math.cos(-0.5) || ak.diff(df1.approx(), df2(-0.5))>100.0*ak.EPSILON) return false;
  
    return true;
   });
  
   symbolicDerivative.add(number);
   symbolicDerivative.add(variable);
   symbolicDerivative.add(unary);
   symbolicDerivative.add(binary);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   symbolicDerivative.add(load);
  }

  akTest.add(symbolicDerivative);
 }

 ak.using(['Calculus/SymbolicDerivative.js', 'Calculus/RidderDerivative.js'], define);
})();
