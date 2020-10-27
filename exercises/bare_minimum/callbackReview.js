/**
 * Implement these functions following the node style callback pattern
 */

var fs = require('fs');
var request = require('request');

// This function should retrieve the first line of the file at `filePath`
var pluckFirstLineFromFile = function (filePath, callback) {
  // TODO
  fs.readFile(filePath, (err, file) => {
    if (err) {
      callback(err, null);
    } else {
      var firstLine = file.toString().split('\n')[0];
      callback(null, firstLine);

    }
  });
};

// This function should retrieve the status code of a GET request to `url`
var getStatusCode = function (url, callback) {

  request(url, (err, info) => {
    if (err) {
      callback(err);
    } else {
      callback(null, info.statusCode);
      info.end();
    }
  });

};

// Export these functions so we can test them and reuse them in later exercises
module.exports = {
  getStatusCode: getStatusCode,
  pluckFirstLineFromFile: pluckFirstLineFromFile
};
