// We saw why and how asynchronous functions such as readFile,
// and our function breedDetailsFromFile, cannot simply return their data.
// Instead they must use callback functions to pass that data back.

const fs = require('fs');
const breedDetails = require('./syncBreeds');

const breedDetailsFromFile = function(breed, callback) {
  console.log('breedDetailsFromFile: Calling readFile...');
  fs.readFile(`./data/${breed}.txt`, 'utf8', (error, data) => {
    console.log("In readFile's Callback: it has the data.");
    callback(data);
  });
};

const show = (bombay) => console.log('Return Value: ', bombay);
const bombay = breedDetailsFromFile('Bombay', show);

module.exports = breedDetailsFromFile;

// const fs = require('fs');

// const breedDetailsFromFile = function(breed) {
//   console.log('breedDetailsFromFile: Calling readFile...');
//   fs.readFile(`./data/${breed}.txt`, 'utf8', (error, data) => {
//     console.log("In readFile's Callback: it has the data.");
//     // ISSUE: Returning from *inner* callback function, not breedDetailsFromFile.
//     if (!error) return data;
//   });
//   // ISSUE: Attempting to return data out here will also not work.
//   // Currently not returning anything from here,
//   // so breedDetailsFromFile function returns undefined.
// };

// // we try to get the return value
// const bombay = breedDetailsFromFile('Bombay');
// console.log('Return Value: ', bombay);
// => will NOT print out details, instead we will see undefined!

// Our breedDetailsFromFile function does not call the callback if an error occurs from readFile.
// With this behavior, the caller has no way of knowing what happened.
// Instead, it could call its callback with undefined if an error occurs
// when looking for the appropriate text file.
// delete the 'if(!error)'