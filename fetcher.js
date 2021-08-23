const request = require('request');
const fs = require('fs');
const isValid = require('is-valid-path');

const fethcer = (URL,saveTo) => {
  request(URL, (error, response, body) => {
    if (error) {
      console.log('Invalid URL', error);
      return;
    }
    if (response.statusCode !== 200) {
      console.log(`Status Code ${response.statusCode} when fetching ${URL} Response: ${body}`);
      return;
    }
    if (isValid(saveTo)) { 
      if (fs.existsSync(saveTo)) { 
        fs.writeFile(saveTo, body, function(err) {
          if(err) {
              return console.log(err);
          }
          console.log(`Downloaded and saved ${body.length} bytes to ${saveTo}file`);
        }); 
      }
    } else {
      console.log('Failed to write! Given file path is invalid.');
    }
  });

};

const args = process.argv.slice(2);
let URL = args[0];
let saveTo = args[1];
fethcer(URL, saveTo);
    
  

