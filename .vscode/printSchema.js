const { printSchema } = require('graphql');
const { schema } = require('../lib/index.js');
const { writeFile } = require('fs');
const { join } = require('path');

writeFile(join(__dirname, '../schema.graphql'), printSchema(schema), (err) => {
  if (err) throw err;
  console.log('Done.');
});
