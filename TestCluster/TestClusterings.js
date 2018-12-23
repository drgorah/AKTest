"use strict";

(function() {
 function define() {
  var clusterings = {
   name: 'cluster.clusterings',
   body: [],
   add: function(t) {this.body.push(t);}
  };

  try {
   var d5 = [0, 1, 2, 3, 4];
   var d6 = [0, 1, 2, 3, 4, 6];
   var D6 = [1, 1, 2, 3, 4, 6];

   var m05 = [0, 0, 1, 2, 3];
   var m06 = [0, 0, 1, 2, 3, 3];

   var m15 = [0, 1, 1, 2, 2];
   var m16 = [0, 1, 1, 2, 2, 3];

   var o05 = {memberships: m05};
   var o06 = {memberships: m06, data: d6};

   var o15 = {memberships: m15, data: 'a'};
   var o16 = {memberships: m16, data: D6};

   var c05 = ak.clustering(m05);
   var c06 = ak.clustering(m06);

   var cd05 = ak.clustering(m05, d5);
   var cd06 = ak.clustering(m06, d6);
   var cD06 = ak.clustering(m06, D6);

   var c15 = ak.clustering(m15);
   var c16 = ak.clustering(m16);

   var cd15 = ak.clustering(m15, d5);
   var cd16 = ak.clustering(m16, d6);
   var cD16 = ak.clustering(m16, D6);
 
   var cs015 = ak.clusterings([c05, c15]);
   var cds015 = ak.clusterings([cd05, cd15]);

   var cs115 = ak.clusterings([m05, m15]);
   var cds115 = ak.clusterings([m05, m15], d5);

   var cs215 = ak.clusterings(cs015);
   var cds215 = ak.clusterings(cds015);

   var cds315 = ak.clusterings(cds015, d5);

   var cds415 = ak.clusterings(cs015, d5);

   function invalid() {
    try {ak.clusterings(); return false;} catch(e) {}
    try {ak.clusterings('a'); return false;} catch(e) {}
    try {ak.clusterings(m05); return false;} catch(e) {}
    try {ak.clusterings([m05, m15], 'a'); return false;} catch(e) {}
    try {ak.clusterings([o05, o15]); return false;} catch(e) {}
    try {ak.clusterings(cs015, 'a'); return false;} catch(e) {}
    try {ak.clusterings(cds015, 'a'); return false;} catch(e) {}
    return true;
   }

   function inconsistent() {
    try {ak.clusterings([m05, m16]); return false;} catch(e) {}
    try {ak.clusterings([c05, c16]); return false;} catch(e) {}
    try {ak.clusterings([c05, m16]); return false;} catch(e) {}
    try {ak.clusterings([m05, c16]); return false;} catch(e) {}
    try {ak.clusterings([cd06, cD06]); return false;} catch(e) {}
    try {ak.clusterings([c06, c16], d5); return false;} catch(e) {}
    try {ak.clusterings([cd06, cd16], d5); return false;} catch(e) {}
    try {ak.clusterings([cd06, cd16], D6); return false;} catch(e) {}
    try {ak.clusterings([o06, o16]); return false;} catch(e) {}
    try {ak.clusterings(cds015, D6); return false;} catch(e) {}
    return true;
   }

   function equalArray(l, r) {
    var n = l.size();
    var i;

    if(r.length!==n) return false;
    for(i=0;i<n && l.at(i)===r[i];++i);
    return i===n;
   }

   function equalElements(l, r) {
    var n = l.size();
    var i;

    if(r.size()!==n) return false;
    for(i=0;i<n && l.at(i)===r.at(i);++i);
    return i===n;
   }

   var init = {
    name: 'init',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };

   init.add('invalid', invalid);
   init.add('inconsistent', inconsistent);
   init.add('consistent', function() {
    return cs015.size()===2 && cs015.at(0).data===cs015.at(1).data && cds015.at(0).data===cds015.at(1).data
        && cs115.size()===2 && cs115.at(0).data===cs115.at(1).data && cds115.at(0).data===cds115.at(1).data;
   });
   init.add('memberships', function() {
    return equalElements(cds015.at(0).memberships, c05.memberships)
        && equalElements(cds015.at(1).memberships, c15.memberships)
        && equalElements(cs215.at(0).memberships,  cs015.at(0).memberships)
        && equalElements(cs215.at(1).memberships,  cs015.at(1).memberships)
        && equalElements(cds215.at(0).memberships, cds015.at(0).memberships)
        && equalElements(cds215.at(1).memberships, cds015.at(1).memberships);
   });
   init.add('data', function() {
    return equalArray(cds015.at(0).data, d5)
        && equalArray(cds015.at(1).data, d5)
        && equalElements(cds015.at(0).data, cd05.data)
        && equalElements(cds015.at(1).data, cd15.data)
        && equalElements(cds215.at(0).data, cds015.at(0).data)
        && equalElements(cds215.at(1).data, cds015.at(1).data)
        && equalElements(cds315.at(0).data, cds015.at(0).data)
        && equalElements(cds315.at(1).data, cds015.at(1).data)
        && equalElements(cds415.at(0).data, cds015.at(0).data)
        && equalElements(cds415.at(1).data, cds015.at(1).data);
   });

   clusterings.add(init);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   clusterings.add(load);
  }

  akTest.add(clusterings);
 }

 ak.using('Cluster/Clusterings.js', define);
})();
