"use strict";

(function() {
 function define() {
  var rawClustering = {
   name: 'cluster.rawClustering',
   body: [],
   add: function(t) {this.body.push(t);}
  };

  try {
   var d00 = [];
   var m00 = [];
   var c00 = [];
   var m01 = [];
   var c01 = ak.rawClustering(m01);
   var c02 = ak.rawClustering(m01, d00);
  
   var d10 = ['#0', '#1', '#2', '#3', '#4', '#5'];
   var m10 = [0, 1, 2, 3, 4, 5];
   var c10 = [[0], [1], [2], [3], [4], [5]];
   var m11 = [0, 1, 2, 3, 4, 5];
   var c11 = ak.rawClustering(m11);
   var c12 = ak.rawClustering(m11, d10);
  
   var d20 = ['#0', '#1', '#2', '#3', '#4', '#5'];
   var m20 = [0, 1, 1, 2, 1, 3];
   var c20 = [[0], [1, 2, 4], [3], [5]];
   var m21 = [8, 4, 4, 2, 4, 5];
   var c21 = ak.rawClustering(m21);
   var c22 = ak.rawClustering(m21, d20);

   var d30 = [];
   var m30 = [];
   var c30 = [];
   var c31 = [];
   var m31 = ak.rawClustering(c31);
   var m32 = ak.rawClustering(c31, d30);
  
   var d40 = ['#0', '#1', '#2', '#3', '#4', '#5'];
   var m40 = [0, 1, 2, 3, 4, 5];
   var c40 = [[0], [1], [2], [3], [4], [5]];
   var c41 = [[0], [1], [2], [3], [4], [5]];
   var m41 = ak.rawClustering(c41);
   var m42 = ak.rawClustering(c41, d40);
  
   var d50 = ['#0', '#1', '#2', '#3', '#4', '#5'];
   var m50 = [3, 2, 2, 1, 2, 0];
   var c50 = [[5], [3], [1, 4, 2], [0]];
   var c51 = [[5], [3], [1, 4, 2], [0]];
   var m51 = ak.rawClustering(c51);
   var m52 = ak.rawClustering(c51, d50);

   var m60 = [0, 1, 1, 2, 1, 3];
   var c60 = [[0], [1, 2, 4], [3], [5]];
   var m61 = ak.rawClustering(m51);
   var m62 = ak.rawClustering(m52);

   var m71 = ak.rawClustering({clusters: function(){return m51.clusters;}, memberships: function(){return m51.memberships;}});
   var m72 = ak.rawClustering({clusters: function(){return m52.clusters;}, memberships: function(){return m52.memberships;}, data: function(){return m52.data;}});
  
   var m81 = ak.rawClustering({clusters: m51.clusters});
   var m82 = ak.rawClustering({clusters: m52.clusters, data: m52.data});

   var m91 = ak.rawClustering({clusters: function(){return m51.clusters;}});
   var m92 = ak.rawClustering({clusters: function(){return m52.clusters;}, data: function(){return m52.data;}});
  
   var m101 = ak.rawClustering({memberships: m51.memberships});
   var m102 = ak.rawClustering({memberships: m52.memberships, data: m52.data});
  
   var m111 = ak.rawClustering({memberships: function(){return m51.memberships;}});
   var m112 = ak.rawClustering({memberships: function(){return m52.memberships;}, data: function(){return m52.data;}});
  
   function checkClustering(rawClustering, m, c, d) {
    var m1 = rawClustering.memberships;
    var c1 = rawClustering.clusters;
    var d1, i, j;

    if(rawClustering.SUB!=='raw') return false;

    if(m1.size()!==m.length) return false;
    for(i=0;i<m.length;++i) if(m1.at(i)!==m[i]) return false;
  
    if(c1.size()!==c.length) return false;
    for(i=0;i<c.length;++i) {
     if(c1.at(i).size()!==c[i].length) return false;
     for(j=0;j<c[i].length;++j) if(c1.at(i).at(j)!==c[i][j]) return false;
    }
  
    if(!d && rawClustering.data) return false;
  
    if(d) {
     d1 = rawClustering.data;
     if(d1.size()!==d.length) return false;
     for(i=0;i<d.length;++i) if(d1.at(i)!==d[i]) return false;
    }
  
    return true;
   }
  
   function checkArray(a0, a1) {
    var i;
  
    if(ak.nativeType(a0)!==ak.nativeType(a1)) return false;
    if(ak.nativeType(a0)!==ak.ARRAY_T) return a0===a1;
  
    if(a0.length!==a1.length) return false;
    for(i=0;i<a0.length;++i) if(!checkArray(a0[i], a1[i])) return false;
    return true;
   }
  
   function invalidClustering() {
    var result;
  
    result = false;
    try{ak.rawClustering();}
    catch(e){result = true;}
    if(!result) return false;
  
    result = false;
    try{ak.rawClustering('');}
    catch(e){result = true;}
    if(!result) return false;
  
    result = false;
    try{ak.rawClustering([-1]);}
    catch(e){result = true;}
    if(!result) return false;
  
    result = false;
    try{ak.rawClustering([0, 1, 2, 3, 4, 1.5]);}
    catch(e){result = true;}
    if(!result) return false;
  
    result = false;
    try{ak.rawClustering([0, 1, 2, 3, '', 4]);}
    catch(e){result = true;}
    if(!result) return false;
  
    result = false;
    try{ak.rawClustering([[0], 1, 2, 3, '', 4]);}
    catch(e){result = true;}
    if(!result) return false;
  
    result = false;
    try{ak.rawClustering([0, 1, 2, 3, 4], [0, 1, 2, 3, 4, 5]);}
    catch(e){result = true;}
    if(!result) return false;
  
    result = false;
    try{ak.rawClustering([[0, 1, 2], [3, 4]], [0, 1, 2, 3, 4, 5]);}
    catch(e){result = true;}
    if(!result) return false;
  
    result = false;
    try{ak.rawClustering({memberships: '#', clusters: [[0]]});}
    catch(e){result = true;}
    if(!result) return false;
  
    result = false;
    try{ak.rawClustering({memberships: [0], clusters: '#'});}
    catch(e){result = true;}
    if(!result) return false;
  
    result = false;
    try{ak.rawClustering({memberships: [0], clusters: ['#']});}
    catch(e){result = true;}
    if(!result) return false;
  
    result = false;
    try{ak.rawClustering({memberships: [0, 1], clusters: [[1], [0]]});}
    catch(e){result = true;}
    if(!result) return false;
  
    return true;
   }
  
   var init = {
    name: 'init',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   init.add('empty', function(){return checkClustering(c01, m00, c00) && checkClustering(c02, m00, c00, d00) && checkClustering(m31, m30, c30) && checkClustering(m32, m30, c30, d30);});
   init.add('identity', function(){return checkClustering(c11, m10, c10) && checkClustering(c12, m10, c10, d10) && checkClustering(m41, m40, c40) && checkClustering(m42, m40, c40, d40);});
   init.add('remap', function(){return checkClustering(c21, m20, c20) && checkClustering(c22, m20, c20, d20) && checkClustering(m51, m50, c50) && checkClustering(m52, m50, c50, d50);});
   init.add('object', function(){return checkClustering(m61, m60, c60) && checkClustering(m62, m60, c60, d50) && checkClustering(m71, m60, c60) && checkClustering(m72, m60, c60, d50) && checkClustering(m81, m50, c50) && checkClustering(m82, m50, c50, d50) && checkClustering(m91, m50, c50) && checkClustering(m92, m50, c50, d50) && checkClustering(m101, m60, c60) && checkClustering(m102, m60, c60, d50) && checkClustering(m111, m60, c60) && checkClustering(m112, m60, c60, d50);});
  
   init.add('invalid', invalidClustering);
  
   var members = {
    name: 'members',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   members.add('clusters.toString', function(){return c01.clusters.toString()==='{}' && c11.clusters.toString()==='{{0},{1},{2},{3},{4},{5}}' && c21.clusters.toString()==='{{0},{1,2,4},{3},{5}}';});
   members.add('memberships.toString', function(){return c01.memberships.toString()==='{}' && c11.memberships.toString()==='{0,1,2,3,4,5}' && c21.memberships.toString()==='{0,1,1,2,1,3}';});
   members.add('data.toString', function(){return c02.data.toString()==='{}' && c12.data.toString()==='{#0,#1,#2,#3,#4,#5}' && c22.data.toString()==='{#0,#1,#2,#3,#4,#5}';});
  
   members.add('clusters.toArray', function(){return checkArray(c01.clusters.toArray(), c00) && checkArray(c11.clusters.toArray(), c10) && checkArray(c21.clusters.toArray(), c20);});
   members.add('memberships.toArray', function(){return checkArray(c01.memberships.toArray(), m00) && checkArray(c11.memberships.toArray(), m10) && checkArray(c21.memberships.toArray(), m20);});
   members.add('data.toArray', function(){return checkArray(c02.data.toArray(), d00) && checkArray(c12.data.toArray(), d10) && checkArray(c22.data.toArray(), d20);});
  
   rawClustering.add(init);
   rawClustering.add(members);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   rawClustering.add(load);
  }

  akTest.add(rawClustering);
 }

 ak.using(['Cluster/Clustering.js', 'Cluster/RawClustering.js'], define);
})();
