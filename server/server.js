'use strict';

var loopback = require('loopback');
var boot = require('loopback-boot');

var app = module.exports = loopback();

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});
// var _ = require('lodash');
// var path = require('path');
// var fs = require('fs');
// var loopback = require('loopback');

// var outputPath = path.resolve(__dirname, '../common/models');
// var ds = loopback.createDataSource('mysql', require('../server/datasources').local);

// ds.discoverModelDefinitions({ schema: 'YOUR-DB-NAME' }, function (err, models) {

//     var count = models.length;

//   _.each(models, function(model){
//     ds.discoverSchema(model.name, {  associations: true }, function(err, schema){
//       var outputName = outputPath + '/' +schema.name + '.json';
//       fs.writeFile(outputName, JSON.stringify(schema, null, 2), function(err) {
//         if(err) {
//           console.log(err);
//         } else {
//           console.log("JSON saved to " + outputName);
//         }
//       });
//       fs.writeFile(outputPath + '/' + schema.name + '.js', jsFileString(schema.name), function(err) {
//         if (err) throw err;
//         console.log('Created ' + schema.name + '.json file');
//       });
//       count = count - 1;
//       if (count === 0) {
//         console.log("DONE!", count);
//         ds.disconnect();
//         return;
//       }
//     });
//   })
// });
// function capitaliseFirstLetter(string) {
//     return string.charAt(0)
//         .toUpperCase() + string.slice(1);
// }

// function jsFileString(model_name) {
//     return '' + 'module.exports = function(' + capitaliseFirstLetter(model_name) + ') {\n' + '\t\n' + '};';
// }
