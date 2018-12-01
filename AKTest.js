"use strict";

var akTest = {
 name: 'ak',
 body: [],
 add: function(t) {
  this.body.push(t);
  var div = document.createElement('div');
  div.innerHTML = 'added ' + t.name;
  document.body.appendChild(div);
  window.scrollTo(0, document.documentElement.offsetHeight - window.innerHeight);
 },
 run: function() {
  var failures = [];
  var libs = [];
  var schedule = [];

  function write(text) {
   var div = document.createElement('div');
   div.innerHTML = text;
   document.body.appendChild(div);

   window.scrollTo(0, document.documentElement.offsetHeight - window.innerHeight);
  }

  function scheduleTest(t, n, c) {
   var h = (n<1) ? 1 : (n>6) ? 6 : n;
   var i, indent;

   if(n===2) libs.push(c+t.name);

   indent = '';
   for(i=1;i<n;++i) indent = indent + '&nbsp;&nbsp;';

   if(ak.nativeType(t.body)===ak.ARRAY_T) {
    if(n===2) schedule.push(function(){write('<h' + h + ' id="' + c+t.name + '">' + indent + c + t.name + '</h' + h + '>');});
    else      schedule.push(function(){write('<h' + h + '>' + indent + c + t.name + '</h' + h + '>');});

    for(i=0;i<t.body.length;++i) scheduleTest(t.body[i], h+1, c + t.name + '.');
   }
   else {
    schedule.push(function() {
     var res, err;

     try     {res = t.body();}
     catch(e){err = e;}

     if(err || !res) failures.push(c+t.name);

     if(err)       write(indent + t.name + ': <font color="red"><b>exception</b></font> (' + err.name + ': ' + err.message + ')');
     else if(!res) write(indent + t.name + ': <font color="red"><b>failed</b></font>');
     else          write(indent + t.name + ': <font color="green"><b>passed</b></font>');
    });
   }
  }

  function scheduleTests(t) {
   scheduleTest(t, 1, '');
  }

  function runTest(body, end) {
   if(body()) setTimeout(function(){runTest(body, end);}, 0);
   else       end();
  };

  function runTests() {
   var i = 0;
   runTest(
    function body() {
     schedule[i]();
     return ++i<schedule.length;
    },
    function end() {
     write('<h2><u>Tested</u></h2>');
     for(i=0;i<libs.length;++i) write('<b><a href="#' + libs[i] + '">' + libs[i] + '</a></b>');

     if(failures.length===0) write('<font color="green"><h1><u>Passed</u></h1></font>');
     else                    write('<font color="red"><h1><u>Failed</u></h1></font>');

     for(i=0;i<failures.length;++i) write(failures[i]);
    }
   );
  };

  scheduleTests(this);
  runTests();
 }
};
