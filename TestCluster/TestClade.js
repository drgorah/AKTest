"use strict";

(function() {
 function define() {
  var clade = {
   name: 'cluster.clade',
   body: [],
   add: function(t) {this.body.push(t);}
  };

  try {
   var scalars = [17, 2, 8, 4, 5, 14, 10, 1];

   var ss0 = [0, 1, 2, 3, 4, 5, 6, 7];
   var ss1 = [2, 0, 3, 1, 1, 4, 5, 0];
   var ss2 = [2, 0, 1, 0, 0, 3, 1, 0];
   var ss3 = [1, 0, 0, 0, 0, 1, 0, 0];
   var ss4 = [0, 0, 0, 0, 0, 0, 0, 0];
   var ss = [ss0, ss1, ss2, ss3, ss4];
   var cs = ak.clusterings(ss, scalars);
   var ts = ak.clade(cs);
   var as = [[[[[1],[7]],[[3],[4]]],[[[2]],[[6]]]],[[[[0]]],[[[5]]]]];
   var bs = '{{{{{1},{7}},{{3},{4}}},{{{2}},{{6}}}},{{{{0}}},{{{5}}}}}';

   var sc0 = [0, 1, 2, 3, 4, 5, 6, 7];
   var sc1 = [2, 0, 3, 1, 1, 4, 5, 0];
   var sc2 = [3, 0, 1, 2, 2, 4, 1, 0];
   var sc3 = [0, 1, 2, 3, 3, 0, 2, 1];
   var sc4 = [1, 0, 2, 0, 0, 1, 2, 0];
   var sc5 = [0, 0, 0, 0, 0, 0, 0, 0];
   var sc = [sc0, sc1, sc2, sc3, sc4, sc5];
   var cc = ak.clusterings(sc);
   var tc = ak.clade(cc);
   var ac = [[[[[[1],[7]]]],[[[[3],[4]]]]],[[[[[0]]],[[[5]]]]],[[[[[2]],[[6]]]]]];
   var bc = '{{{{{{1},{7}}}},{{{{3},{4}}}}},{{{{{0}}},{{{5}}}}},{{{{{2}},{{6}}}}}}';

   var sb0 = [sc0, sc1, sc2, sc3, sc4];
   var cb0 = ak.clusterings(sb0, scalars);

   var sb1 = [sc0, sc1, sc3, sc2, sc4, sc5];
   var cb1 = ak.clusterings(sb1, scalars);

   function invalidClade() {
    var result;
  
    result = false;
    try{ak.clade();}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.clade(ss);}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.clade(cb0);}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.clade(cb1);}
    catch(e){result = true;}
    if(!result) return false;

    return true;
   }

   function checkTypes(clade) {
    var children = clade.children;
    var n, i;

    if(ak.type(clade)!==ak.CLADE_T) return false;
    if(ak.nativeType(children)===ak.UNDEFINED_T) return true;
    if(ak.type(children)!==ak.CLADES_T) return false;

    n = children.size();
    i = 0;
    while(i<n && checkTypes(children.at(i))) ++i;
    return i===n;
   }

   function checkParent(clade, parent) {
    var children = clade.children;
    var n, i;

    if(clade.parent!==parent) return false;
    if(ak.nativeType(children)===ak.UNDEFINED_T) return true;

    n = children.size();
    i = 0;
    while(i<n && checkParent(children.at(i), clade)) ++i;
    return i===n;
   }

   function checkClusters(clade, clusterings, level) {
    var clustering = clusterings.at(level);
    var clusters = clustering.clusters;
    var memberships = clustering.memberships;
    var children, n, i;

    if(clade.cluster!==clusters.at(memberships.at(clade.cluster.at(0)))) return false;
    if(level===0) return true;

    children = clade.children;
    n = children.size();
    i = 0;
    while(i<n && checkClusters(children.at(i), clusterings, level-1)) ++i;
    return i===n;
   }

   function checkData(clade, data) {
    var n, i;
    if(clade.data!==data) return false;
    if(ak.nativeType(clade.children)===ak.UNDEFINED_T) return true;
    n = clade.children.size();
    i = 0;
    while(i<n && checkData(clade.children.at(i), data)) ++i;
    return i===n;
   }

   var init = {
    name: 'init',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   init.add('invalid', invalidClade);
   init.add('types', function() {return checkTypes(ts) && checkTypes(tc);});
   init.add('parent', function() {return checkParent(ts) && checkParent(tc);});
   init.add('cluster', function() {return checkClusters(ts, cs, cs.size()-1) && checkClusters(tc, cc, cc.size()-1);});
   init.add('data', function() {return checkData(ts, cs.at(0).data) && checkData(tc, cc.at(0).data);});

   function equalArray(a0, a1) {
    var t0 = ak.nativeType(a0);
    var t1 = ak.nativeType(a1);
    var n, i;

    if(t0!==t1) return false;
    if(t0!==ak.ARRAY_T) return a0===a1;

    n = a0.length;
    if(a1.length!==n) return false;

    i = 0;
    while(i<n && equalArray(a0[i], a1[i])) ++i;
    return i===n;
   }

   var members = {
    name: 'members',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   members.add('toArray', function() {return equalArray(ts.toArray(), as) && equalArray(tc.toArray(), ac);});
   members.add('toString', function() {return ts.toString()===bs && tc.toString()===bc;});

   clade.add(init);
   clade.add(members);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   clade.add(load);
  }

  akTest.add(clade);
 }

 ak.using('Cluster/Clade.js', define);
})();
