"use strict";

(function() {
 var eigenfaces = {
  name: 'image.eigenfaces',
  body: [],
  add: function(t) {this.body.push(t);}
 };

 var test_faces = [];
 var i;

 for(i=0;i<28;++i) {
  test_faces[i] = document.createElement('img');
  if(i<9) test_faces[i].src = 'TestImage/face0' + (i+1) + '.png';
  else    test_faces[i].src = 'TestImage/face'  + (i+1) + '.png';
 }

 function define() {
  try {
   var test_data = [];
   var test_matrices = [];

   var test_face = document.createElement('canvas');
   var i, test_face, test_ctx, test_mean, end;

   for(i=0;i<28;++i) {
    test_face.width  = test_faces[i].naturalWidth;
    test_face.height = test_faces[i].naturalHeight;
   
    test_ctx = test_face.getContext('2d');
    test_ctx.drawImage(test_faces[i], 0, 0);
    test_data[i] = test_ctx.getImageData(0, 0, test_face.width, test_face.height);
    test_matrices[i] = ak.imageDataToMatrix(test_data[i]);
   }
   
   test_mean = test_matrices[0];
   for(i=1;i<28;++i) test_mean = ak.add(test_mean, test_matrices[i]);
   test_mean = ak.div(test_mean, 28);
   
   function match(eigenfaces, face) {
    var code = eigenfaces.encode(face);
    var decode = eigenfaces.decode(code);
   
    if(ak.type(face)!==ak.MATRIX_T) face = ak.imageDataToMatrix(face);
    return ak.eq(eigenfaces.mean(), test_mean) && ak.diff(decode, face)<0.1;
   }

   var from_data = {
    name: 'from data',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   
   from_data.add('empty', function(){try{ak.eigenfaces(8, []);}catch(e){return true;} return false;});
   from_data.add('too few', function(){try{ak.eigenfaces(1, test_data);}catch(e){return true;} return false;});
   from_data.add('too many', function(){try{ak.eigenfaces(32, test_data);}catch(e){return true;} return false;});
   from_data.add('correct', function(){return ak.eigenfaces(8, test_data).faces()===8;});
   from_data.add('match', function(){return match(ak.eigenfaces(16, test_data), test_data[0]);});
   
   var from_matrices = {
    name: 'from matrices',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   
   from_matrices.add('empty', function(){try{ak.eigenfaces(8, []);}catch(e){return true;} return false;});
   from_matrices.add('too few', function(){try{ak.eigenfaces(1, test_matrices);}catch(e){return true;} return false;});
   from_matrices.add('too many', function(){try{ak.eigenfaces(32, test_matrices);}catch(e){return true;} return false;});
   from_matrices.add('correct', function(){return ak.eigenfaces(8, test_matrices).faces()===8;});
   from_matrices.add('match', function(){return match(ak.eigenfaces(16, test_matrices), test_matrices[0]);});
   
   var from_object = {
    name: 'from object',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   
   from_object.add('correct', function(){return ak.eigenfaces(ak.eigenfaces(8, test_matrices)).faces()===8;});
   from_object.add('match', function(){return match(ak.eigenfaces(ak.eigenfaces(16, test_matrices)), test_matrices[0]);});
   
   eigenfaces.add(from_data);
   eigenfaces.add(from_matrices);
   eigenfaces.add(from_object);
  }
  catch(e) {
   var load = {
    name: 'load',
    body: [],
    add: function(n, b) {this.body.push({name: n, body: b});}
   };
   load.add('failed', function(){throw e;});
   eigenfaces.add(load);
  }

  akTest.add(eigenfaces);
 }

 ak.using(['Image/Eigenfaces.js', 'Image/ImageDataMatrix.js'], define);
})();
