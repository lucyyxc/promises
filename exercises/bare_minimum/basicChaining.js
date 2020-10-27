/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');
var db = Promise.promisifyAll(require('./promiseConstructor'));
var prom = Promise.promisifyAll(require('./promisification'));
Promise.promisifyAll(fs);



var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  // TODO
  return db.pluckFirstLineFromFileAsync(readFilePath)
    .then((username) => {
      return prom.getGitHubProfileAsync(username)
        .then((body) => {
          var data = JSON.stringify(body);
          // console.log(JSON.stringify(body));
          return fs.writeFileAsync(writeFilePath, data)
            .then(() => {
              // console.log('the file has been saved!');
            })
            .catch((err) => {
              console.log('err', err.message);
            });
        })
        .catch((err) => {
          console.log('err', err.message);
        });
    })
    .catch((err) => {
      console.log('err', err.message);
    });






  // exports.getStatusCodeAsync(url);
  // exports.generateRandomTokenAsync();
  // exports.readFileAndMakeItFunnyAsync();
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};

// addNewUserToDatabaseAsync({ name: 'Dan', password: 'chickennuggets' })
//   .then(function(savedUser) {
//     console.log('All done!');
//   })
//   .catch(function(err) {
//     // Will catch any promise rejections or thrown errors in the chain!
//     console.log('Oops, caught an error: ', err.message);
//   });