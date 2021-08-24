const request = require('request');
const fs = require('fs');
const isValid = require('is-valid-path');

const writeToFile = (saveTo, body) => {
  fs.writeFile(saveTo, body, function(err) {
    if(err) {
        return console.log(err);
    }
    console.log(`Downloaded and saved ${body.length} bytes to ${saveTo}file`);
  }); 
}

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
        const readline = require('readline').createInterface({
          input: process.stdin,
          output: process.stdout
        });
        readline.question('The file already exists. Overwrite? Y/N: ', key => {
          if (key === 'Y') {
            writeToFile(saveTo, body);
          }
          readline.close();
        });   
      } else {
        writeToFile(saveTo, body);
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
    
  

