"use strict";

(function() {
 var test_png = document.createElement('img');
 test_png.src = 'TestImage/test.png';

 function define() {
  var imageDataMatrix = {
   name: 'image.imageDataMatrix',
   body: [],
   add: function(t) {this.body.push(t);}
  };

  try {
   var to_matrix = {
    name: 'to matrix',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   function test_to_matrix() {
    var canvas = document.createElement('canvas');
    var rows, cols, ctx, m, r, c, x, y;
  
    rows = test_png.naturalHeight;
    cols = test_png.naturalWidth;
  
    canvas.width = cols;
    canvas.height = rows;
    ctx = canvas.getContext('2d');
  
    ctx.drawImage(test_png, 0, 0);
    m = ak.imageDataToMatrix(ctx.getImageData(0, 0, cols, rows));
  
    if(m.rows()!==rows || m.cols()!==cols) return false;
  
    for(r=0;r<rows;++r) {
     for(c=0;c<cols;++c) {
      x = m.at(r, c);
      y = ((r+c)%6)/5;
      if(!(ak.diff(x, y)<1e-12)) return false;
     }
    }
    return true;
   }
  
   to_matrix.add('test.png', test_to_matrix);
  
   var to_data = {
    name: 'to data',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
  
   function test_to_data() {
    var canvas = document.createElement('canvas');
    var arr = [];
    var rows, cols, ctx, data, m, i, r, c, n;
  
    rows = test_png.naturalHeight;
    cols = test_png.naturalWidth;
  
    canvas.width = cols;
    canvas.height = rows;
    ctx = canvas.getContext('2d');
  
    ctx.drawImage(test_png, 0, 0);
    data = ctx.getImageData(0, 0, cols, rows);
  
    i = 0;
    for(r=0;r<rows;++r) {
     for(c=0;c<cols;++c) {
      arr[i++] = ((r+c)%6)/5;
     }
    }
    m = ak.matrix(rows, cols, arr);
    m = ak.matrixToImageData(m);
  
    if(m.height!==data.height || m.width!==data.width) return false;
  
    n = rows*cols*4;
    for(i=0;i<n;++i) {
     if(m.data[i]!=data.data[i]) return false;
    }
  
    return true;
   }
  
   to_data.add('test.png', test_to_data);
  
   imageDataMatrix.add(to_matrix);
   imageDataMatrix.add(to_data);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   imageDataMatrix.add(load);
  }

  akTest.add(imageDataMatrix);
 }

 ak.using('Image/ImageDataMatrix.js', define);
})();
