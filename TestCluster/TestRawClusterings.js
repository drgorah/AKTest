"use strict";

(function() {
 function define() {
  var rawClusterings = {
   name: 'cluster.rawClusterings',
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

   var c05 = ak.rawClustering(m05);
   var c06 = ak.rawClustering(m06);

   var cd05 = ak.rawClustering(m05, d5);
   var cd06 = ak.rawClustering(m06, d6);
   var cD06 = ak.rawClustering(m06, D6);

   var c15 = ak.rawClustering(m15);
   var c16 = ak.rawClustering(m16);

   var cd15 = ak.rawClustering(m15, d5);
   var cd16 = ak.rawClustering(m16, d6);
   var cD16 = ak.rawClustering(m16, D6);
 
   var cs015 = ak.rawClusterings([c05, c15]);
   var cds015 = ak.rawClusterings([cd05, cd15]);

   var cs115 = ak.rawClusterings([m05, m15]);
   var cds115 = ak.rawClusterings([m05, m15], d5);

   var cs215 = ak.rawClusterings(cs015);
   var cds215 = ak.rawClusterings(cds015);

   var cds315 = ak.rawClusterings(cds015, d5);

   var cds415 = ak.rawClusterings(cs015, d5);

   function invalid() {
    try {ak.rawClusterings(); return false;} catch(e) {}
    try {ak.rawClusterings('a'); return false;} catch(e) {}
    try {ak.rawClusterings(m05); return false;} catch(e) {}
    try {ak.rawClusterings([m05, m15], 'a'); return false;} catch(e) {}
    try {ak.rawClusterings(cs015, 'a'); return false;} catch(e) {}
    try {ak.rawClusterings(cds015, 'a'); return false;} catch(e) {}
    return true;
   }

   function inconsistent() {
    try {ak.rawClusterings([m05, m16]); return false;} catch(e) {}
    try {ak.rawClusterings([c05, c16]); return false;} catch(e) {}
    try {ak.rawClusterings([c05, m16]); return false;} catch(e) {}
    try {ak.rawClusterings([m05, c16]); return false;} catch(e) {}
    try {ak.rawClusterings([cd06, cD06]); return false;} catch(e) {}
    try {ak.rawClusterings([c06, c16], d5); return false;} catch(e) {}
    try {ak.rawClusterings([cd06, cd16], d5); return false;} catch(e) {}
    try {ak.rawClusterings([cd06, cd16], D6); return false;} catch(e) {}
    try {ak.rawClusterings(cds015, D6); return false;} catch(e) {}
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

   rawClusterings.add(init);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   rawClusterings.add(load);
  }

  akTest.add(rawClusterings);
 }

 ak.using('Cluster/RawClusterings.js', define);
})();
