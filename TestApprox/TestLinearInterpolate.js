"use strict";

(function() {
 function define() {
  var linearInterpolate = {
   name: 'approx.linearInterpolate',
   body: [],
   add: function(t) {this.body.push(t);}
  };

  try {
   function invalidNodes() {
    var result;

    result = false;
    try{ak.linearInterpolate();}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.linearInterpolate('');}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.linearInterpolate([]);}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.linearInterpolate([3, 1, 2]);}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.linearInterpolate([3, 1, 2], [9, 1, 2, 1]);}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.linearInterpolate([1], [1]);}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.linearInterpolate([3, 1, 2, 1], [9, 1, 4, 1]);}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.linearInterpolate([3, 1, 2], [ak.complex(9), 1, 4]);}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.linearInterpolate([3, 1, 2], ['', '', '']);}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.linearInterpolate([3, 'a', 2], [9, 1, 4]);}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.linearInterpolate([3, 1, 2, 1], function(x){return x*x;});}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.linearInterpolate([{x:3,y:9}, {x:1,y:1}, {x:2,y:4}, {x:1,y:1}]);}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.linearInterpolate([{x:3,y:9}, {x:1,z:1}, {x:2,y:4}]);}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.linearInterpolate([{x:3,y:9}, {x:1,y:1}, {x:2,y:4}], [9, 1, 4]);}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.linearInterpolate([{x:3,y:9}, {x:1,y:1}, {x:2,y:4}], function(x){return x*x;});}
    catch(e){result = true;}
    if(!result) return false;

    return true;
   }

   function compareNodes(nodes0, nodes1) {
    var n = nodes0.length;
    var i;
    if(nodes1.length!==n) return false;

    for(i=0;i<n;++i) if(nodes0[i].x!==nodes1[i].x || ak.ne(nodes0[i].y, nodes1[i].y)) return false;
    return true;
   }

   function validNodes() {
    return compareNodes(ak.linearInterpolate([3, 1, 2], [9, 1, 4]).nodes(), [{x:1,y:1}, {x:2,y:4}, {x:3,y:9}])
        && compareNodes(ak.linearInterpolate([{x:3,y:9}, {x:1,y:1}, {x:2,y:4}]).nodes(), [{x:1,y:1}, {x:2,y:4}, {x:3,y:9}])
        && compareNodes(ak.linearInterpolate([3, 1, 2], function(x){return x*x;}).nodes(), [{x:1,y:1}, {x:2,y:4}, {x:3,y:9}])
        && compareNodes(ak.linearInterpolate([{x:3,y:ak.complex(9)}, {x:1,y:ak.complex(1)}, {x:2,y:ak.complex(4)}]).nodes(), [{x:1,y:ak.complex(1)}, {x:2,y:ak.complex(4)}, {x:3,y:ak.complex(9)}]);
   }

   var init = {
    name: 'init',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   init.add('invalid', invalidNodes);
   init.add('valid', validNodes);

   var valPair = {
    name: 'eval - pair',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   function valPairNumberRnd() {
    var x0 = 1; var y0 = 1;
    var x1 = 2; var y1 = 4;
    var f = ak.linearInterpolate([x0, x1], [y0, y1]);
    var n = 100;
    var x, y;

    while(n-->0) {
     x = Math.random()*3;
     y = y0 + (y1-y0)*(x-x0)/(x1-x0);
     if(!(ak.diff(f(x), y)<1e-10)) return false;
    }
    return true;
   }

   function valPairComplexRnd() {
    var x0 = 1; var y0r = 1; var y0i = 4;
    var x1 = 2; var y1r = 4; var y1i = 2;
    var f = ak.linearInterpolate([x0, x1], [ak.complex(y0r,y0i), ak.complex(y1r,y1i)]);
    var n = 100;
    var x, yr, yi;

    while(n-->0) {
     x = Math.random()*3;
     yr = y0r + (y1r-y0r)*(x-x0)/(x1-x0);
     yi = y0i + (y1i-y0i)*(x-x0)/(x1-x0);
     if(!(ak.diff(f(x), ak.complex(yr, yi))<1e-10)) return false;
    }
    return true;
   }

   valPair.add('number - rnd', valPairNumberRnd);
   valPair.add('complex - rnd', valPairComplexRnd);

   var valTriplet = {
    name: 'eval - triplet',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   function valTripletNumberRnd() {
    var x0 = 1; var y0 = 1;
    var x1 = 2; var y1 = 4;
    var x2 = 3; var y2 = 9;
    var f = ak.linearInterpolate([x0, x1, x2], [y0, y1, y2]);
    var n = 100;
    var x, y;

    while(n-->0) {
     x = Math.random()*4;
     if(x<x1) y = y0 + (y1-y0)*(x-x0)/(x1-x0);
     else     y = y1 + (y2-y1)*(x-x1)/(x2-x1);
     if(!(ak.diff(f(x), y)<1e-10)) return false;
    }
    return true;
   }

   function valTripletComplexRnd() {
    var x0 = 1; var y0r = 1; var y0i = 4;
    var x1 = 2; var y1r = 4; var y1i = 2;
    var x2 = 3; var y2r = 9; var y2i = 3;
    var f = ak.linearInterpolate([x0, x1, x2], [ak.complex(y0r,y0i), ak.complex(y1r,y1i), ak.complex(y2r,y2i)]);
    var n = 100;
    var x, yr, yi;

    while(n-->0) {
     x = Math.random()*4;
     if(x<x1) {
      yr = y0r + (y1r-y0r)*(x-x0)/(x1-x0);
      yi = y0i + (y1i-y0i)*(x-x0)/(x1-x0);
     }
     else {
      yr = y1r + (y2r-y1r)*(x-x1)/(x2-x1);
      yi = y1i + (y2i-y1i)*(x-x1)/(x2-x1);
     }
     if(!(ak.diff(f(x), ak.complex(yr, yi))<1e-10)) return false;
    }
    return true;
   }

   valTriplet.add('number - rnd', valTripletNumberRnd);
   valTriplet.add('complex - rnd', valTripletComplexRnd);

   var valMulti = {
    name: 'eval - multi',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   function valMultiNumberFwd() {
    var x0 =  1.1; var y0 = 1;
    var x1 = 20.0; var y1 = 4;
    var x2 = 21.7; var y2 = 5;
    var x3 = 22.9; var y3 = 2;
    var f = ak.linearInterpolate([x0, x1, x2, x3], [y0, y1, y2, y3]);
    var x = x0-1;
    var dx = 1/32;
    var y;

    while(x<x1) {
     y = y0 + (y1-y0)*(x-x0)/(x1-x0);
     if(!(ak.diff(f(x), y)<1e-10)) return false;
     x += dx;
    }

    while(x<x2) {
     y = y1 + (y2-y1)*(x-x1)/(x2-x1);
     if(!(ak.diff(f(x), y)<1e-10)) return false;
     x += dx;
    }

    while(x<x3+1) {
     y = y2 + (y3-y2)*(x-x2)/(x3-x2);
     if(!(ak.diff(f(x), y)<1e-10)) return false;
     x += dx;
    }

    return true;
   }

   function valMultiNumberRev() {
    var x0 =  1.1; var y0 = 1;
    var x1 = 20.0; var y1 = 4;
    var x2 = 21.7; var y2 = 5;
    var x3 = 22.9; var y3 = 2;
    var f = ak.linearInterpolate([x0, x1, x2, x3], [y0, y1, y2, y3]);
    var x = x3+1;
    var dx = 1/32;
    var y;

    while(x>x2) {
     y = y2 + (y3-y2)*(x-x2)/(x3-x2);
     if(!(ak.diff(f(x), y)<1e-10)) return false;
     x -= dx;
    }

    while(x>x1) {
     y = y1 + (y2-y1)*(x-x1)/(x2-x1);
     if(!(ak.diff(f(x), y)<1e-10)) return false;
     x -= dx;
    }

    while(x>x0-1) {
     y = y0 + (y1-y0)*(x-x0)/(x1-x0);
     if(!(ak.diff(f(x), y)<1e-10)) return false;
     x -= dx;
    }

    return true;
   }

   function valMultiNumberRnd() {
    var x0 =  1.1; var y0 = 1;
    var x1 = 20.0; var y1 = 4;
    var x2 = 21.7; var y2 = 5;
    var x3 = 22.9; var y3 = 2;
    var f = ak.linearInterpolate([x0, x1, x2, x3], [y0, y1, y2, y3]);
    var n = 100;
    var x, y;

    while(n-->0) {
     x = Math.random()*6;
     if(x<x1)      y = y0 + (y1-y0)*(x-x0)/(x1-x0);
     else if(x<x2) y = y1 + (y2-y1)*(x-x1)/(x2-x1);
     else          y = y2 + (y3-y2)*(x-x2)/(x3-x2);
     if(!(ak.diff(f(x), y)<1e-10)) return false;
    }
    return true;
   }

   function valMultiNumberJump() {
    var x0 = 1.1; var y0 = 1;
    var x1 = 2.0; var y1 = 4;
    var x2 = 3.7; var y2 = 5;
    var x3 = 4.9; var y3 = 2;
    var f = ak.linearInterpolate([x0, x1, x2, x3], [y0, y1, y2, y3]);
    var n = 100;
    var x, y;

    while(n-->0) {
     x = Math.random()*6;
     if(x<x1)      y = y0 + (y1-y0)*(x-x0)/(x1-x0);
     else if(x<x2) y = y1 + (y2-y1)*(x-x1)/(x2-x1);
     else          y = y2 + (y3-y2)*(x-x2)/(x3-x2);
     if(!(ak.diff(f(x), y)<1e-10)) return false;
    }
    return true;
   }

   function valMultiComplexFwd() {
    var x0 =  1.1; var y0r = 1; var y0i = 1.2;
    var x1 = 20.0; var y1r = 4; var y1i = 3.3;
    var x2 = 21.7; var y2r = 5; var y2i = 1.9;
    var x3 = 22.9; var y3r = 2; var y3i = 2.2;
    var f = ak.linearInterpolate([x0, x1, x2, x3], [ak.complex(y0r, y0i), ak.complex(y1r, y1i), ak.complex(y2r, y2i), ak.complex(y3r, y3i)]);
    var x = x0-1;
    var dx = 1/32;
    var yr, yi;

    while(x<x1) {
     yr = y0r + (y1r-y0r)*(x-x0)/(x1-x0);
     yi = y0i + (y1i-y0i)*(x-x0)/(x1-x0);
     if(!(ak.diff(f(x), ak.complex(yr, yi))<1e-10)) return false;
     x += dx;
    }

    while(x<x2) {
     yr = y1r + (y2r-y1r)*(x-x1)/(x2-x1);
     yi = y1i + (y2i-y1i)*(x-x1)/(x2-x1);
     if(!(ak.diff(f(x), ak.complex(yr, yi))<1e-10)) return false;
     x += dx;
    }

    while(x<x3+1) {
     yr = y2r + (y3r-y2r)*(x-x2)/(x3-x2);
     yi = y2i + (y3i-y2i)*(x-x2)/(x3-x2);
     if(!(ak.diff(f(x), ak.complex(yr, yi))<1e-10)) return false;
     x += dx;
    }

    return true;
   }

   function valMultiComplexRev() {
    var x0 =  1.1; var y0r = 1; var y0i = 1.2;
    var x1 = 20.0; var y1r = 4; var y1i = 3.3;
    var x2 = 21.7; var y2r = 5; var y2i = 1.9;
    var x3 = 22.9; var y3r = 2; var y3i = 2.2;
    var f = ak.linearInterpolate([x0, x1, x2, x3], [ak.complex(y0r, y0i), ak.complex(y1r, y1i), ak.complex(y2r, y2i), ak.complex(y3r, y3i)]);
    var x = x3+1;
    var dx = 1/32;
    var yr, yi;

    while(x>x2) {
     yr = y2r + (y3r-y2r)*(x-x2)/(x3-x2);
     yi = y2i + (y3i-y2i)*(x-x2)/(x3-x2);
     if(!(ak.diff(f(x), ak.complex(yr, yi))<1e-10)) return false;
     x -= dx;
    }

    while(x>x1) {
     yr = y1r + (y2r-y1r)*(x-x1)/(x2-x1);
     yi = y1i + (y2i-y1i)*(x-x1)/(x2-x1);
     if(!(ak.diff(f(x), ak.complex(yr, yi))<1e-10)) return false;
     x -= dx;
    }

    while(x>x0-1) {
     yr = y0r + (y1r-y0r)*(x-x0)/(x1-x0);
     yi = y0i + (y1i-y0i)*(x-x0)/(x1-x0);
     if(!(ak.diff(f(x), ak.complex(yr, yi))<1e-10)) return false;
     x -= dx;
    }

    return true;
   }

   function valMultiComplexRnd() {
    var x0 =  1.1; var y0r = 1; var y0i = 1.2;
    var x1 = 20.0; var y1r = 4; var y1i = 3.3;
    var x2 = 21.7; var y2r = 5; var y2i = 1.9;
    var x3 = 22.9; var y3r = 2; var y3i = 2.2;
    var f = ak.linearInterpolate([x0, x1, x2, x3], [ak.complex(y0r, y0i), ak.complex(y1r, y1i), ak.complex(y2r, y2i), ak.complex(y3r, y3i)]);
    var n = 100;
    var x, yr, yi;

    while(n-->0) {
     x = Math.random()*6;
     if(x<x1) {
      yr = y0r + (y1r-y0r)*(x-x0)/(x1-x0);
      yi = y0i + (y1i-y0i)*(x-x0)/(x1-x0);
     }
     else if(x<x2) {
      yr = y1r + (y2r-y1r)*(x-x1)/(x2-x1);
      yi = y1i + (y2i-y1i)*(x-x1)/(x2-x1);
     }
     else {
      yr = y2r + (y3r-y2r)*(x-x2)/(x3-x2);
      yi = y2i + (y3i-y2i)*(x-x2)/(x3-x2);
     }
     if(!(ak.diff(f(x), ak.complex(yr, yi))<1e-10)) return false;
    }
    return true;
   }

   function valMultiComplexJump() {
    var x0 = 1.1; var y0r = 1; var y0i = 1.2;
    var x1 = 2.0; var y1r = 4; var y1i = 3.3;
    var x2 = 3.7; var y2r = 5; var y2i = 1.9;
    var x3 = 4.9; var y3r = 2; var y3i = 2.2;
    var f = ak.linearInterpolate([x0, x1, x2, x3], [ak.complex(y0r, y0i), ak.complex(y1r, y1i), ak.complex(y2r, y2i), ak.complex(y3r, y3i)]);
    var n = 100;
    var x, yr, yi;

    while(n-->0) {
     x = Math.random()*6;
     if(x<x1) {
      yr = y0r + (y1r-y0r)*(x-x0)/(x1-x0);
      yi = y0i + (y1i-y0i)*(x-x0)/(x1-x0);
     }
     else if(x<x2) {
      yr = y1r + (y2r-y1r)*(x-x1)/(x2-x1);
      yi = y1i + (y2i-y1i)*(x-x1)/(x2-x1);
     }
     else {
      yr = y2r + (y3r-y2r)*(x-x2)/(x3-x2);
      yi = y2i + (y3i-y2i)*(x-x2)/(x3-x2);
     }
     if(!(ak.diff(f(x), ak.complex(yr, yi))<1e-10)) return false;
    }
    return true;
   }

   valMulti.add('number - fwd', valMultiNumberFwd);
   valMulti.add('number - rev', valMultiNumberRev);
   valMulti.add('number - rnd', valMultiNumberRnd);
   valMulti.add('number - jump', valMultiNumberJump);
   valMulti.add('complex - fwd', valMultiComplexFwd);
   valMulti.add('complex - rev', valMultiComplexRev);
   valMulti.add('complex - rnd', valMultiComplexRnd);
   valMulti.add('complex - jump', valMultiComplexJump);

   linearInterpolate.add(init);
   linearInterpolate.add(valPair);
   linearInterpolate.add(valTriplet);
   linearInterpolate.add(valMulti);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   linearInterpolate.add(load);
  }

  akTest.add(linearInterpolate);
 }

 ak.using(['Approx/LinearInterpolate.js', 'Complex/Complex.js'], define);
})();
