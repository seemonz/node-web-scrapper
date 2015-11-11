var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

// gets the html
request('http://substack.net/images/', function(error, response, body) {
  if (!error && response.statusCode == 200) {
    getContent(body);
  }
});

function getContent(body) {
  $ = cheerio.load(body);
  var tables = $('body').find('tr');
  // seed arr with column headers
  var finalArr = [
    ['file permission, absolute path, file type \n']
  ];
  // grab each feild and push into arr, then push that array into finalArr
  tables.each(function() {
    var arr = [];
    arr.push($(this).find('td code').html());
    arr.push('http://substack.net/' + $(this).find('a').html());
    arr.push($(this).find('a').html().split('.')[1] + '\n');
    finalArr.push(arr);
  });
  // Write to file substack-imgs.csv
  var writeArr = [];
  writeArr.push(finalArr.join(''));
  fs.writeFile('substack-imgs.csv', writeArr, function(err) {
    if (err) {
      return console.log(err);
    }
    console.log('The file was saved!');
  });
}
