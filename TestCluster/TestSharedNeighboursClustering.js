"use strict";

(function() {
 function define() {
  var sharedNeighboursClustering = {
   name: 'cluster.sharedNeighboursClustering',
   body: [],
   add: function(n, b) {this.body.push({name: n, body: b});}
  };

  try {
   var globular = new Array(300);
   var concentric = new Array(300);
   var i;

   for(i=0;i<200;++i) globular[i]     = ak.vector([-2.0-0.1*Math.random(), -2.0-0.1*Math.random()]);
   for(i=0;i<100;++i) globular[i+200] = ak.vector([ 2.0+0.1*Math.random(),  2.0+0.1*Math.random()]);
   globular = ak.sharedNeighboursClustering(globular, 10, 4);

   for(i=0;i<200;++i) concentric[i]     = ak.vector([2*Math.sin(2*ak.PI*i/200), 2*Math.cos(2*ak.PI*i/200)]);
   for(i=0;i<100;++i) concentric[i+200] = ak.vector([  Math.sin(2*ak.PI*i/100),   Math.cos(2*ak.PI*i/100)]);
   concentric = ak.sharedNeighboursClustering(concentric, 10, 3);

   function checkInvalid() {
    var result;
  
    result = false;
    try{ak.sharedNeightboursClustering();}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.sharedNeightboursClustering('a', 10, 3);}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.sharedNeightboursClustering(new Array(20), 'a', 3);}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.sharedNeightboursClustering(new Array(20), 21, 3);}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.sharedNeightboursClustering(new Array(20), -1, 0);}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.sharedNeightboursClustering(new Array(20), 1.5, 0);}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.sharedNeightboursClustering(new Array(20), ak.NaN, 0);}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.sharedNeightboursClustering(new Array(20), ak.Infinity, 0);}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.sharedNeightboursClustering(new Array(20), 5, 6);}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.sharedNeightboursClustering(new Array(20), 5, -1);}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.sharedNeightboursClustering(new Array(20), 5, 1.5);}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.sharedNeightboursClustering(new Array(20), 5, ak.NaN);}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.sharedNeightboursClustering(new Array(20), 5, ak.Infinity);}
    catch(e){result = true;}
    if(!result) return false;

    result = false;
    try{ak.sharedNeightboursClustering(new Array(20), 5, 3, 'a');}
    catch(e){result = true;}
    if(!result) return false;

    return true;
   }

   function checkClusters(memberships) {
    var i;
    for(i=0;i<200;++i) if(memberships.at(i)!==0) return false;
    for(i=0;i<100;++i) if(memberships.at(i+200)!==1) return false;
    return true;
   }

   sharedNeighboursClustering.add('invalid', checkInvalid);
   sharedNeighboursClustering.add('globular', function() {return checkClusters(globular.memberships);});
   sharedNeighboursClustering.add('concentric', function() {return checkClusters(concentric.memberships);});
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   sharedNeighboursClustering.add(load);
  }

  akTest.add(sharedNeighboursClustering);
 }

 ak.using(['Cluster/SharedNeighboursClustering.js', 'Matrix/Vector.js'], define);
})();
