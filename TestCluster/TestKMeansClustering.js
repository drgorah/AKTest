"use strict";

(function() {
 function define() {
  var kMeansClustering = {
   name: 'cluster.kMeansClustering',
   body: [],
   add: function(n, b) {this.body.push({name: n, body: b});}
  };

  try {
   var mt = ak.mtRnd(5);

   function makeCluster(x, y, r, n) {
    var rnd = ak.normalRnd(mt);
    var c = [];
    var i;
  
    for(i=0;i<n;++i) c.push(ak.vector([x+r*rnd(), y+r*rnd()]));
    return c;
   }
  
   function makeComplexCluster(x, r, n) {
    var rnd = ak.normalRnd(mt);
    var c = [];
    var i;
  
    for(i=0;i<n;++i) {
     if(rnd()<0) c.push(ak.complex(x+r*rnd(), r*rnd()));
     else        c.push(x+r*rnd());
    }
    return c;
   }
  
   var d0 = [];
  
   var d2 = [];
   d2.push.apply(d2, makeCluster(-1, -1, 0.1, 10));
   d2.push.apply(d2, makeCluster(+1, +1, 0.1, 9));
  
   var d4 = [];
   d4.push.apply(d4, makeCluster(-1, -1, 0.1, 10));
   d4.push.apply(d4, makeCluster(-1, +1, 0.1, 9));
   d4.push.apply(d4, makeCluster(+1, -1, 0.1, 8));
   d4.push.apply(d4, makeCluster(+1, +1, 0.1, 7));
  
   var d5 = d4.slice(0);
   d5.push(ak.vector(2, ak.NaN));
  
   var d6 = [];
   d6.push.apply(d6, makeComplexCluster(-1, 0.1, 10));
   d6.push.apply(d6, makeComplexCluster(+1, 0.1, 9));
  
   var d7 = [];
   d7.push.apply(d7, makeCluster(-1, 0.0, 0.1, 10));
   d7.push.apply(d7, makeComplexCluster(+1, 0.1, 9));
  
   var a00 = ak.kMeansClustering(d0, 0, mt).memberships.toArray();
   var a04 = ak.kMeansClustering(d0, 4, mt).memberships.toArray();
   var a20 = ak.kMeansClustering(d2, 0, mt).memberships.toArray();
   var a21 = ak.kMeansClustering(d2, 1, mt).memberships.toArray();
   var a22 = ak.kMeansClustering(d2, 2, mt).memberships.toArray();
   var a40 = ak.kMeansClustering(d4, 0, mt).memberships.toArray();
   var a41 = ak.kMeansClustering(d4, 1, mt).memberships.toArray();
   var a44 = ak.kMeansClustering(d4, 4, mt).memberships.toArray();
   var a50 = ak.kMeansClustering(d5, 0, mt).memberships.toArray();
   var a51 = ak.kMeansClustering(d5, 1, mt).memberships.toArray();
   var a54 = ak.kMeansClustering(d5, 4, mt, Math.random).memberships.toArray();
   var a60 = ak.kMeansClustering(d6, 0, mt).memberships.toArray();
   var a61 = ak.kMeansClustering(d6, 1, mt).memberships.toArray();
   var a62 = ak.kMeansClustering(d6, 2, mt).memberships.toArray();
  
   function checkAuto() {
    var i;
  
    if(ak.nativeType(a00)!==ak.ARRAY_T || a00.length!==0)  return false;
    for(i=0;i<19;++i) if(a20[i]!==0) return false;
    for(i=0;i<34;++i) if(a40[i]!==0) return false;
    for(i=0;i<35;++i) if(a50[i]!==0) return false;
    for(i=0;i<19;++i) if(a60[i]!==0) return false;
  
    for(i=0;i<19;++i) if(a21[i]!==0) return false;
    for(i=0;i<34;++i) if(a41[i]!==0) return false;
    for(i=0;i<34;++i) if(a51[i]!==0) return false;
    if(a51[34]!==1) return false;
    for(i=0;i<19;++i) if(a61[i]!==0) return false;
  
    for(i=0;i<10;++i)  if(a22[i]!==a22[0]  || a22[i]===a22[10]) return false;
    for(i=10;i<19;++i) if(a22[i]!==a22[10] || a22[i]===a22[0])  return false;
  
    if(ak.nativeType(a04)!==ak.ARRAY_T || a04.length!==0)  return false;
  
    for(i=0;i<10;++i)  if(a44[i]!==a44[0]  || a44[i]===a44[10] || a44[i]===a44[19] || a44[i]===a44[27]) return false;
    for(i=10;i<19;++i) if(a44[i]!==a44[10] || a44[i]===a44[0]  || a44[i]===a44[19] || a44[i]===a44[27]) return false;
    for(i=19;i<27;++i) if(a44[i]!==a44[19] || a44[i]===a44[0]  || a44[i]===a44[10] || a44[i]===a44[27]) return false;
    for(i=27;i<34;++i) if(a44[i]!==a44[27] || a44[i]===a44[0]  || a44[i]===a44[10] || a44[i]===a44[19]) return false;
  
    for(i=0;i<10;++i)  if(a54[i]!==a54[0]  || a54[i]===a54[10] || a54[i]===a54[19] || a54[i]===a54[27]) return false;
    for(i=10;i<19;++i) if(a54[i]!==a54[10] || a54[i]===a54[0]  || a54[i]===a54[19] || a54[i]===a54[27]) return false;
    for(i=19;i<27;++i) if(a54[i]!==a54[19] || a54[i]===a54[0]  || a54[i]===a54[10] || a54[i]===a54[27]) return false;
    for(i=27;i<34;++i) if(a54[i]!==a54[27] || a54[i]===a54[0]  || a54[i]===a54[10] || a54[i]===a54[19]) return false;
    if(a54[34]!==4) return false;
  
    for(i=0;i<10;++i)  if(a62[i]!==a62[0]  || a62[i]===a62[10]) return false;
    for(i=10;i<19;++i) if(a62[i]!==a62[10] || a62[i]===a62[0])  return false;
  
    return true;
   }
  
   var m00 = ak.kMeansClustering(d0, []).memberships.toArray();
   var m20 = ak.kMeansClustering(d2, []).memberships.toArray();
   var m21 = ak.kMeansClustering(d2, [ak.vector([-1,-1])]).memberships.toArray();
   var m22 = ak.kMeansClustering(d2, [ak.vector([-1,-1]), ak.vector([+1,+1])]).memberships.toArray();
   var m41 = ak.kMeansClustering(d4, [ak.vector([-1,-1])]).memberships.toArray();
   var m44 = ak.kMeansClustering(d4, [ak.vector([-1,-1]), ak.vector([-1,+1]), ak.vector([+1,-1]), ak.vector([+1,+1])]).memberships.toArray();
   var m45 = ak.kMeansClustering(d4, [ak.vector([-1,-1]), ak.vector(2, ak.NaN), ak.vector([-1,+1]), ak.vector([+1,-1]), ak.vector([+1,+1])]).memberships.toArray();
   var m60 = ak.kMeansClustering(d6, []).memberships.toArray();
   var m61 = ak.kMeansClustering(d6, [ak.complex(0,0)]).memberships.toArray();
   var m62 = ak.kMeansClustering(d6, [-1, ak.complex(1,0)]).memberships.toArray();
  
   function checkManual() {
    var i;
  
    if(ak.nativeType(m00)!==ak.ARRAY_T || m00.length!==0) return false;
  
    for(i=0;i<19;++i) if(m20[i]!==0) return false;
    for(i=0;i<19;++i) if(m60[i]!==0) return false;
  
    for(i=0;i<19;++i) if(m21[i]!==0) return false;
    for(i=0;i<34;++i) if(m41[i]!==0) return false;
    for(i=0;i<19;++i) if(m61[i]!==0) return false;
  
    for(i=0;i<10;++i)  if(m22[i]!==m22[0]  || m22[i]===m22[10]) return false;
    for(i=10;i<19;++i) if(m22[i]!==m22[10] || m22[i]===m22[0])  return false;
  
    for(i=0;i<10;++i)  if(m44[i]!==m44[0]  || m44[i]===m44[10] || m44[i]===m44[19] || m44[i]===m44[27]) return false;
    for(i=10;i<19;++i) if(m44[i]!==m44[10] || m44[i]===m44[0]  || m44[i]===m44[19] || m44[i]===m44[27]) return false;
    for(i=19;i<27;++i) if(m44[i]!==m44[19] || m44[i]===m44[0]  || m44[i]===m44[10] || m44[i]===m44[27]) return false;
    for(i=27;i<34;++i) if(m44[i]!==m44[27] || m44[i]===m44[0]  || m44[i]===m44[10] || m44[i]===m44[19]) return false;
  
    for(i=0;i<10;++i)  if(m45[i]!==m45[0]  || m45[i]===m45[10] || m45[i]===m45[19] || m45[i]===m45[27]) return false;
    for(i=10;i<19;++i) if(m45[i]!==m45[10] || m45[i]===m45[0]  || m45[i]===m45[19] || m45[i]===m45[27]) return false;
    for(i=19;i<27;++i) if(m45[i]!==m45[19] || m45[i]===m45[0]  || m45[i]===m45[10] || m45[i]===m45[27]) return false;
    for(i=27;i<34;++i) if(m45[i]!==m45[27] || m45[i]===m45[0]  || m45[i]===m45[10] || m45[i]===m45[19]) return false;
  
    for(i=0;i<10;++i)  if(m62[i]!==m62[0]  || m62[i]===m62[10]) return false;
    for(i=10;i<19;++i) if(m62[i]!==m62[10] || m62[i]===m62[0])  return false;
  
    return true;
   }
  
   function checkInvalid() {
    var result;
  
    result = false;
    try{ak.kMeansClustering(d7, 2);}
    catch(e){result = true;}
    if(!result) return false;
  
    result = false;
    try{ak.kMeansClustering();}
    catch(e){result = true;}
    if(!result) return false;
  
    result = false;
    try{ak.kMeansClustering(d2, -1);}
    catch(e){result = true;}
    if(!result) return false;
  
    result = false;
    try{ak.kMeansClustering(d2, 2.5);}
    catch(e){result = true;}
    if(!result) return false;
  
    result = false;
    try{ak.kMeansClustering(d2, {});}
    catch(e){result = true;}
    if(!result) return false;
  
    result = false;
    try{ak.kMeansClustering({}, 2);}
    catch(e){result = true;}
    if(!result) return false;
  
    result = false;
    try{ak.kMeansClustering([[],[]], 2);}
    catch(e){result = true;}
    if(!result) return false;
  
    result = false;
    try{ak.kMeansClustering(d2, [[],[]]);}
    catch(e){result = true;}
    if(!result) return false;
  
    result = false;
    try{ak.kMeansClustering(d4, 4, 1)}
    catch(e){result = true;}
    if(!result) return false;
  
    result = false;
    try{ak.kMeansClustering(d4, 4, ak.uniformRnd(1, 2))}
    catch(e){result = true;}
    if(!result) return false;
  
    result = false;
    try{ak.kMeansClustering(d4, 4, ak.uniformRnd(-1, 0))}
    catch(e){result = true;}
    if(!result) return false;
  
    result = false;
    try{ak.kMeansClustering(d4, 4, function(){return 'oops!';})}
    catch(e){result = true;}
    if(!result) return false;
  
    return true;
   }
  
   kMeansClustering.add('auto', checkAuto);
   kMeansClustering.add('manual', checkManual);
   kMeansClustering.add('invalid', checkInvalid);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   kMeansClustering.add(load);
  }

  akTest.add(kMeansClustering);
 }

 ak.using(['Cluster/KMeansClustering.js', 'Distribution/NormalDistribution.js', 'Distribution/UniformDistribution.js', 'Matrix/Vector.js', 'Complex/Complex.js', 'Random/MTRnd.js'], define);
})();
