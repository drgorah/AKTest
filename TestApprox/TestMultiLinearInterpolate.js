"use strict";

(function() {
 function define() {
  var multiLinearInterpolate = {
   name: 'approx.multiLinearInterpolate',
   body: [],
   add: function(t) {this.body.push(t);}
  };

  try {
   var grid1 = ak.grid(2, [1.2, 2.1, 3.5, 4.3]);
   var grid2 = ak.grid([[1.2, 2.1, 3.5], [4.5, 5.1], [6.3, 7.4, 8.1, 39.2]]);

   var values1 = [
    [1.2*1.2,1.2*2.1,1.2*3.5,1.2*4.3],
    [2.1*1.2,2.1*2.1,2.1*3.5,2.1*4.3],
    [3.5*1.2,3.5*2.1,3.5*3.5,3.5*4.3],
    [4.3*1.2,4.3*2.1,4.3*3.5,4.3*4.3]
   ];
   var func1 = function(x) {return x.at(0)*x.at(1);};
   var nodes1 = [
    {x:ak.vector([1.2,1.2]), y:1.2*1.2},
    {x:ak.vector([1.2,2.1]), y:1.2*2.1},
    {x:ak.vector([1.2,3.5]), y:1.2*3.5},
    {x:ak.vector([1.2,4.3]), y:1.2*4.3},
    {x:ak.vector([2.1,1.2]), y:2.1*1.2},
    {x:ak.vector([2.1,2.1]), y:2.1*2.1},
    {x:ak.vector([2.1,3.5]), y:2.1*3.5},
    {x:ak.vector([2.1,4.3]), y:2.1*4.3},
    {x:ak.vector([3.5,1.2]), y:3.5*1.2},
    {x:ak.vector([3.5,2.1]), y:3.5*2.1},
    {x:ak.vector([3.5,3.5]), y:3.5*3.5},
    {x:ak.vector([3.5,4.3]), y:3.5*4.3},
    {x:ak.vector([4.3,1.2]), y:4.3*1.2},
    {x:ak.vector([4.3,2.1]), y:4.3*2.1},
    {x:ak.vector([4.3,3.5]), y:4.3*3.5},
    {x:ak.vector([4.3,4.3]), y:4.3*4.3}
   ];

   var values2 = [
    [
     [
      ak.complex(1.2*4.5,4.5*6.3),
      ak.complex(1.2*4.5,4.5*7.4),
      ak.complex(1.2*4.5,4.5*8.1),
      ak.complex(1.2*4.5,4.5*39.2)
     ],
     [
      ak.complex(1.2*5.1,5.1*6.3),
      ak.complex(1.2*5.1,5.1*7.4),
      ak.complex(1.2*5.1,5.1*8.1),
      ak.complex(1.2*5.1,5.1*39.2)
     ]
    ],
    [
     [
      ak.complex(2.1*4.5,4.5*6.3),
      ak.complex(2.1*4.5,4.5*7.4),
      ak.complex(2.1*4.5,4.5*8.1),
      ak.complex(2.1*4.5,4.5*39.2)
     ],
     [
      ak.complex(2.1*5.1,5.1*6.3),
      ak.complex(2.1*5.1,5.1*7.4),
      ak.complex(2.1*5.1,5.1*8.1),
      ak.complex(2.1*5.1,5.1*39.2)
     ]
    ],
    [
     [
      ak.complex(3.5*4.5,4.5*6.3),
      ak.complex(3.5*4.5,4.5*7.4),
      ak.complex(3.5*4.5,4.5*8.1),
      ak.complex(3.5*4.5,4.5*39.2)
     ],
     [
      ak.complex(3.5*5.1,5.1*6.3),
      ak.complex(3.5*5.1,5.1*7.4),
      ak.complex(3.5*5.1,5.1*8.1),
      ak.complex(3.5*5.1,5.1*39.2)
     ]
    ],
   ];
   var func2 = function(x) {return ak.complex(x.at(0)*x.at(1), x.at(1)*x.at(2));};
   var nodes2 = [
    {x:ak.vector([1.2,4.5,6.3]),  y:ak.complex(1.2*4.5,4.5*6.3)},
    {x:ak.vector([1.2,4.5,7.4]),  y:ak.complex(1.2*4.5,4.5*7.4)},
    {x:ak.vector([1.2,4.5,8.1]),  y:ak.complex(1.2*4.5,4.5*8.1)},
    {x:ak.vector([1.2,4.5,39.2]), y:ak.complex(1.2*4.5,4.5*39.2)},
    {x:ak.vector([1.2,5.1,6.3]),  y:ak.complex(1.2*5.1,5.1*6.3)},
    {x:ak.vector([1.2,5.1,7.4]),  y:ak.complex(1.2*5.1,5.1*7.4)},
    {x:ak.vector([1.2,5.1,8.1]),  y:ak.complex(1.2*5.1,5.1*8.1)},
    {x:ak.vector([1.2,5.1,39.2]), y:ak.complex(1.2*5.1,5.1*39.2)},
    {x:ak.vector([2.1,4.5,6.3]),  y:ak.complex(2.1*4.5,4.5*6.3)},
    {x:ak.vector([2.1,4.5,7.4]),  y:ak.complex(2.1*4.5,4.5*7.4)},
    {x:ak.vector([2.1,4.5,8.1]),  y:ak.complex(2.1*4.5,4.5*8.1)},
    {x:ak.vector([2.1,4.5,39.2]), y:ak.complex(2.1*4.5,4.5*39.2)},
    {x:ak.vector([2.1,5.1,6.3]),  y:ak.complex(2.1*5.1,5.1*6.3)},
    {x:ak.vector([2.1,5.1,7.4]),  y:ak.complex(2.1*5.1,5.1*7.4)},
    {x:ak.vector([2.1,5.1,8.1]),  y:ak.complex(2.1*5.1,5.1*8.1)},
    {x:ak.vector([2.1,5.1,39.2]), y:ak.complex(2.1*5.1,5.1*39.2)},
    {x:ak.vector([3.5,4.5,6.3]),  y:ak.complex(3.5*4.5,4.5*6.3)},
    {x:ak.vector([3.5,4.5,7.4]),  y:ak.complex(3.5*4.5,4.5*7.4)},
    {x:ak.vector([3.5,4.5,8.1]),  y:ak.complex(3.5*4.5,4.5*8.1)},
    {x:ak.vector([3.5,4.5,39.2]), y:ak.complex(3.5*4.5,4.5*39.2)},
    {x:ak.vector([3.5,5.1,6.3]),  y:ak.complex(3.5*5.1,5.1*6.3)},
    {x:ak.vector([3.5,5.1,7.4]),  y:ak.complex(3.5*5.1,5.1*7.4)},
    {x:ak.vector([3.5,5.1,8.1]),  y:ak.complex(3.5*5.1,5.1*8.1)},
    {x:ak.vector([3.5,5.1,39.2]), y:ak.complex(3.5*5.1,5.1*39.2)}
   ];

   function invalidNodes() {
    var result;

    result = false;
    try{ak.multiLinearInterpolate();}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.multiLinearInterpolate('');}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.multiLinearInterpolate(grid1);}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.multiLinearInterpolate(grid1, '');}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.multiLinearInterpolate(grid1, [[1,2,3],[4,5,6],7]);}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.multiLinearInterpolate(grid1, [[1,2,3],[4,5,6],['',7,8]]);}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.multiLinearInterpolate(grid1, [[1,2,3],[4,5],[6,7,8]]);}
    catch(e){result = true;}
    if(!result) return false;

    return true;
   }

   function compareGrid(grid0, grid1) {
    var axes0 = grid0.axes();
    var axes1 = grid1.axes();
    var n = axes0.length;
    var m;

    if(axes1.length!==n) return false;

    while(n-->0) {
     m = axes0[n].length;
     if(axes1[n].length!==m) return false;

     while(m-->0) if(axes1[n][m]!==axes0[n][m]) return false;
    }
    return true;
   }

   function compareValues(values0, values1) {
    var t0 = ak.type(values0);
    var t1 = ak.type(values1);
    var n;

    if(t0!==t1) return false;
    if(t0===ak.ARRAY_T) {
     n = values0.length;
     if(values1.length!==n) return false;
     while(n-->0) if(!compareValues(values0[n], values1[n])) return false;
     return true;
    }
    return ak.eq(values0, values1);
   }

   function compareNodes(nodes0, nodes1) {
    var n = nodes0.length;
    if(nodes1.length!==n) return false;
    while(n-->0) if(!ak.eq(nodes1[n].x, nodes0[n].x) || !ak.eq(nodes1[n].y, nodes0[n].y)) return false;
    return true;
   }

   function validNodes() {
    return compareGrid(ak.multiLinearInterpolate(grid1, values1).grid(), grid1)
        && compareValues(ak.multiLinearInterpolate(grid1, values1).values(), values1)
        && compareNodes(ak.multiLinearInterpolate(grid1, values1).nodes(), nodes1)
        && compareGrid(ak.multiLinearInterpolate(grid1, func1).grid(), grid1)
        && compareValues(ak.multiLinearInterpolate(grid1, func1).values(), values1)
        && compareNodes(ak.multiLinearInterpolate(grid1, func1).nodes(), nodes1)
        && compareGrid(ak.multiLinearInterpolate(grid2, values2).grid(), grid2)
        && compareValues(ak.multiLinearInterpolate(grid2, values2).values(), values2)
        && compareNodes(ak.multiLinearInterpolate(grid2, values2).nodes(), nodes2)
        && compareGrid(ak.multiLinearInterpolate(grid2, func2).grid(), grid2)
        && compareValues(ak.multiLinearInterpolate(grid2, func2).values(), values2)
        && compareNodes(ak.multiLinearInterpolate(grid2, func2).nodes(), nodes2);
   }

   var init = {
    name: 'init',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   init.add('invalid', invalidNodes);
   init.add('valid', validNodes);

   function poly2d(x, y, axes, values) {
    var ix = 0;
    var iy = 0;
    var s = 0;
    var v;

    while(ix<axes[0].length-2 && x>axes[0][ix+1]) ++ix;
    while(iy<axes[1].length-2 && y>axes[1][iy+1]) ++iy;

    v = (axes[0][ix+1]-axes[0][ix+0])*(axes[1][iy+1]-axes[1][iy+0]);

    s = ak.add(s, ak.mul(((x-axes[0][ix+0])*(y-axes[1][iy+0]))/v, values[ix+1][iy+1]));
    s = ak.add(s, ak.mul(((axes[0][ix+1]-x)*(y-axes[1][iy+0]))/v, values[ix+0][iy+1]));
    s = ak.add(s, ak.mul(((x-axes[0][ix+0])*(axes[1][iy+1]-y))/v, values[ix+1][iy+0]));
    s = ak.add(s, ak.mul(((axes[0][ix+1]-x)*(axes[1][iy+1]-y))/v, values[ix+0][iy+0]));

    return s;
   }

   function poly3d(x, y, z, axes, values) {
    var ix = 0;
    var iy = 0;
    var iz = 0;
    var s = 0;
    var v;

    while(ix<axes[0].length-2 && x>axes[0][ix+1]) ++ix;
    while(iy<axes[1].length-2 && y>axes[1][iy+1]) ++iy;
    while(iz<axes[2].length-2 && z>axes[2][iz+1]) ++iz;

    v = (axes[0][ix+1]-axes[0][ix+0])*(axes[1][iy+1]-axes[1][iy+0])*(axes[2][iz+1]-axes[2][iz+0]);

    s = ak.add(s, ak.mul(((x-axes[0][ix+0])*(y-axes[1][iy+0])*(z-axes[2][iz+0]))/v, values[ix+1][iy+1][iz+1]));
    s = ak.add(s, ak.mul(((axes[0][ix+1]-x)*(y-axes[1][iy+0])*(z-axes[2][iz+0]))/v, values[ix+0][iy+1][iz+1]));
    s = ak.add(s, ak.mul(((x-axes[0][ix+0])*(axes[1][iy+1]-y)*(z-axes[2][iz+0]))/v, values[ix+1][iy+0][iz+1]));
    s = ak.add(s, ak.mul(((axes[0][ix+1]-x)*(axes[1][iy+1]-y)*(z-axes[2][iz+0]))/v, values[ix+0][iy+0][iz+1]));
    s = ak.add(s, ak.mul(((x-axes[0][ix+0])*(y-axes[1][iy+0])*(axes[2][iz+1]-z))/v, values[ix+1][iy+1][iz+0]));
    s = ak.add(s, ak.mul(((axes[0][ix+1]-x)*(y-axes[1][iy+0])*(axes[2][iz+1]-z))/v, values[ix+0][iy+1][iz+0]));
    s = ak.add(s, ak.mul(((x-axes[0][ix+0])*(axes[1][iy+1]-y)*(axes[2][iz+1]-z))/v, values[ix+1][iy+0][iz+0]));
    s = ak.add(s, ak.mul(((axes[0][ix+1]-x)*(axes[1][iy+1]-y)*(axes[2][iz+1]-z))/v, values[ix+0][iy+0][iz+0]));

    return s;
   }

   var val = {
    name: 'eval',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   function valNumberFwd() {
    var f = ak.multiLinearInterpolate(grid1, values1);
    var axes1 = grid1.axes();
    var x, y;

    for(x=0;x<5;x+=0.1) {
     for(y=0;y<5;y+=0.1) {
      if(!(ak.diff(f(ak.vector([x,y])), poly2d(x, y, axes1, values1))<1e-10)) return false;
     }
    }
    return true;
   }

   function valNumberRev() {
    var f = ak.multiLinearInterpolate(grid1, values1);
    var axes1 = grid1.axes();
    var x, y;

    for(x=5;x>0;x-=0.1) {
     for(y=5;y>0;y-=0.1) {
      if(!(ak.diff(f(ak.vector([x,y])), poly2d(x, y, axes1, values1))<1e-10)) return false;
     }
    }
    return true;
   }

   function valNumberRnd() {
    var n = 100;
    var f = ak.multiLinearInterpolate(grid1, values1);
    var axes1 = grid1.axes();
    var x, y;

    while(n-->0) {
     x = Math.random()*5;
     y = Math.random()*5;

     if(!(ak.diff(f(ak.vector([x,y])), poly2d(x, y, axes1, values1))<1e-10)) return false;
    }
    return true;
   }

   function valComplexFwd() {
    var f = ak.multiLinearInterpolate(grid2, values2);
    var axes2 = grid2.axes();
    var x, y, z;

    for(x=0;x<4;x+=0.25) {
     for(y=4;y<6;y+=0.25) {
      for(z=34;z<40;z+=0.25) {
       if(!(ak.diff(f(ak.vector([x,y,z])), poly3d(x, y, z, axes2, values2))<1e-10)) return false;
      }
     }
    }
    return true;
   }

   function valComplexRev() {
    var f = ak.multiLinearInterpolate(grid2, values2);
    var axes2 = grid2.axes();
    var x, y, z;

    for(x=4;x>0;x-=0.25) {
     for(y=6;y>4;y-=0.25) {
      for(z=40;z>34;z-=0.25) {
       if(!(ak.diff(f(ak.vector([x,y,z])), poly3d(x, y, z, axes2, values2))<1e-10)) return false;
      }
     }
    }
    return true;
   }

   function valComplexRnd() {
    var n = 100;
    var f = ak.multiLinearInterpolate(grid2, values2);
    var axes2 = grid2.axes();
    var x, y, z;

    while(n-->0) {
     x = Math.random()*4;
     y = Math.random()*2+4;
     z = Math.random()*6+34;

     if(!(ak.diff(f(ak.vector([x,y,z])), poly3d(x, y, z, axes2, values2))<1e-10)) return false;
    }
    return true;
   }

   val.add('number - fwd', valNumberFwd);
   val.add('number - rev', valNumberRev);
   val.add('number - rnd', valNumberRnd);
   val.add('complex - fwd', valComplexFwd);
   val.add('complex - rev', valComplexRev);
   val.add('complex - rnd', valComplexRnd);

   multiLinearInterpolate.add(init);
   multiLinearInterpolate.add(val);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   multiLinearInterpolate.add(load);
  }

  akTest.add(multiLinearInterpolate);
 }

 ak.using(['Approx/MultiLinearInterpolate.js', 'Complex/Complex.js'], define);
})();
