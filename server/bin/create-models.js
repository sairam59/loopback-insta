'use strict';
var path = require('path');
var fs = require('fs');
// var loopback = require('loopback');
var outputPath = path.resolve(__dirname, '../../common/models');
console.log('creating Models...');
var connectorMysql = require('loopback-connector-mysql');
var DataSource = require('loopback-datasource-juggler').DataSource;

var ds = new DataSource(connectorMysql, {
  host: 'localhost',
  port: 3306,
  database: 'insta_sai',
  username: 'root',
  password: '123Root@',
});
console.log('ds' + ds);
// var ds = loopback.createDatasource({
//   connector: require('loopback-connector-mysql'),
//   host: 'localhost',
//   port: 3306,
//   database: 'insta_sai',
//   username: 'root',
//   password: '123Root@',
// });

function schemaCB(err, schema) {
  console.log('Inside Callback');
  if (err) {
    return err;
  }
  if (schema) {
    var cnt = 0;
    console.log(schema + 'schema');
    for (var key in schema.properties) {
      if (cnt === 0) {
        var obj = schema.properties[key];
        obj.id = true;
        obj.required = false;
      }
      cnt++;
    }
    var outputName = outputPath + '/' + schema.name + '.json';
    console.log(outputName + 'outputName');
    fs.writeFile(outputName, JSON.stringify(schema), function(err) {
      if (err) {
        console.log('Biscuit rey' + err);
      } else {
        console.log('model saved at' + outputName);
      }
    });
  }
  return;
}

// table name and schema name
ds.discoverSchema('customers', {schema: 'insta_sai'}, schemaCB);
ds.discoverSchema('posts', {schema: 'insta_sai'}, schemaCB);
ds.discoverSchema('comments', {schema: 'insta_sai'}, schemaCB);
ds.discoverSchema('likes', {schema: 'insta_sai'}, schemaCB);
