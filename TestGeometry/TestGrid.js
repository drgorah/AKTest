"use strict";

(function() {
 function define() {
  var grid = {
   name: 'geometry.grid',
   body: [],
   add: function(t) {this.body.push(t);}
  };

  try {
   var grid1 = ak.grid(2, [2.1, 1.2, 3.5]);
   var grid2 = ak.grid([[2.1, 1.2, 3.5], [5.1, 4.5], [9.2, 8.1, 6.3, 7.4]]);
   var grid3 = ak.grid(grid2);

   function invalidGrid() {
    var result;

    result = false;
    try{ak.grid();}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.grid('a');}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.grid(2, []);}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.grid(0, [1, 2, 3]);}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.grid(2, [1, 1, 3]);}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.grid(-1, [1, 2, 3]);}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.grid(1.5, [1, 2, 3]);}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.grid([]);}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.grid([[1,2,3], [], [1,2,3]]);}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.grid([[1,2,3], [1,2,3], [1,'t',3]]);}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.grid([[1,2,3], [1,2,3], [1,1,3]]);}
    catch(e){result = true;}
    if(!result) return false;

    return true;
   }

   var init = {
    name: 'init',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   init.add('invalid', invalidGrid);

   function compareArrays(axis0, axis1) {
    var n = axis0.length;
    if(axis1.length!==n) return false;
    while(n-->0) if(axis1[n]!==axis0[n]) return false;
    return true;
   }

   function compareAxes(axes0, axes1) {
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

   var members = {
    name: 'members',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   members.add('dims', function(){return grid1.dims()===2 && grid2.dims()===3 && grid3.dims()===3;});
   members.add('length', function(){return grid1.length(0)===3 && grid1.length(1)===3
                                        && grid2.length(0)===3 && grid2.length(1)===2 && grid2.length(2)===4
                                        && grid3.length(0)===3 && grid3.length(1)===2 && grid3.length(2)===4;});
   members.add('lengths', function(){return compareArrays(grid1.lengths(), [3,3])
                                         && compareArrays(grid2.lengths(), [3,2,4])
                                         && compareArrays(grid3.lengths(), [3,2,4]);});
   members.add('axis', function(){return compareArrays(grid1.axis(0), [1.2,2.1,3.5])
                                      && compareArrays(grid1.axis(1), [1.2,2.1,3.5])
                                      && compareArrays(grid2.axis(0), [1.2,2.1,3.5])
                                      && compareArrays(grid2.axis(1), [4.5,5.1])
                                      && compareArrays(grid2.axis(2), [6.3,7.4,8.1,9.2])
                                      && compareArrays(grid3.axis(0), [1.2,2.1,3.5])
                                      && compareArrays(grid3.axis(1), [4.5,5.1])
                                      && compareArrays(grid3.axis(2), [6.3,7.4,8.1,9.2]);});
   members.add('axes', function(){return compareAxes(grid1.axes(), [[1.2,2.1,3.5],[1.2,2.1,3.5]])
                                      && compareAxes(grid2.axes(), [[1.2,2.1,3.5],[4.5,5.1],[6.3,7.4,8.1,9.2]])
                                      && compareAxes(grid3.axes(), [[1.2,2.1,3.5],[4.5,5.1],[6.3,7.4,8.1,9.2]]);});
   members.add('at', function(){return grid1.at(0,0)===1.2 && grid1.at(0,1)===2.1 && grid1.at(0,2)===3.5
                                    && grid1.at(1,0)===1.2 && grid1.at(1,1)===2.1 && grid1.at(1,2)===3.5
                                    && grid2.at(0,0)===1.2 && grid2.at(0,1)===2.1 && grid2.at(0,2)===3.5
                                    && grid2.at(1,0)===4.5 && grid2.at(1,1)===5.1
                                    && grid2.at(2,0)===6.3 && grid2.at(2,1)===7.4 && grid2.at(2,2)===8.1 && grid2.at(2,3)===9.2
                                    && grid3.at(0,0)===1.2 && grid3.at(0,1)===2.1 && grid3.at(0,2)===3.5
                                    && grid3.at(1,0)===4.5 && grid3.at(1,1)===5.1
                                    && grid3.at(2,0)===6.3 && grid3.at(2,1)===7.4 && grid3.at(2,2)===8.1 && grid3.at(2,3)===9.2;});
   members.add('map', function(){return ak.eq(grid1.map([0,1]), ak.vector([1.2,2.1]))
                                     && ak.eq(grid1.map([2,0]), ak.vector([3.5,1.2]))
                                     && ak.eq(grid2.map([2,0,3]), ak.vector([3.5,4.5,9.2]))
                                     && ak.eq(grid2.map([1,1,2]), ak.vector([2.1,5.1,8.1]));});

   var convert = {
    name: 'convert',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   convert.add('toArray', function(){return compareAxes(grid1.axes(),grid1.toArray())
                                         && compareAxes(grid2.axes(),grid2.toArray())
                                         && compareAxes(grid3.axes(),grid3.toArray());});
   convert.add('toString', function(){return grid1.toString()==='[[1.2,2.1,3.5],[1.2,2.1,3.5]]'
                                          && grid2.toString()==='[[1.2,2.1,3.5],[4.5,5.1],[6.3,7.4,8.1,9.2]]'
                                          && grid3.toString()==='[[1.2,2.1,3.5],[4.5,5.1],[6.3,7.4,8.1,9.2]]';});
   convert.add('toFixed', function(){return grid1.toFixed(2)==='[[1.20,2.10,3.50],[1.20,2.10,3.50]]'
                                         && grid2.toFixed(2)==='[[1.20,2.10,3.50],[4.50,5.10],[6.30,7.40,8.10,9.20]]'
                                         && grid3.toFixed(2)==='[[1.20,2.10,3.50],[4.50,5.10],[6.30,7.40,8.10,9.20]]';});
   convert.add('toExponential', function(){return grid1.toExponential(2)==='[[1.20e+0,2.10e+0,3.50e+0],[1.20e+0,2.10e+0,3.50e+0]]'
                                               && grid2.toExponential(2)==='[[1.20e+0,2.10e+0,3.50e+0],[4.50e+0,5.10e+0],[6.30e+0,7.40e+0,8.10e+0,9.20e+0]]'
                                               && grid3.toExponential(2)==='[[1.20e+0,2.10e+0,3.50e+0],[4.50e+0,5.10e+0],[6.30e+0,7.40e+0,8.10e+0,9.20e+0]]';});
   convert.add('toPrecision', function(){return grid1.toPrecision(3)==='[[1.20,2.10,3.50],[1.20,2.10,3.50]]'
                                             && grid2.toPrecision(3)==='[[1.20,2.10,3.50],[4.50,5.10],[6.30,7.40,8.10,9.20]]'
                                             && grid3.toPrecision(3)==='[[1.20,2.10,3.50],[4.50,5.10],[6.30,7.40,8.10,9.20]]';});

   grid.add(init);
   grid.add(members);
   grid.add(convert);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   grid.add(load);
  }

  akTest.add(grid);
 }

 ak.using('Geometry/Grid.js', define);

})();
