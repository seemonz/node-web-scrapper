var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');


// gets the html
request('http://substack.net/images/', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    getContent(body);
  };
});

function getContent(body, callback) {
  $ = cheerio.load(body);
  // console.log($('tr td'));
  var tables = $('body').find('tr');
  var finalArr = [['file permission, absolute path, file type \n']];
  tables.each(function(i, elem){
    var arr = [];
    arr.push($(this).find('td code').html());
    arr.push('http://substack.net/' + $(this).find('a').html());
    arr.push($(this).find('a').html().split('.')[1] + '\n');
    finalArr.push(arr);
  });
  var writeArr = [];
  // console.log(finalArr);
  writeArr.push(finalArr.join(''));
  fs.writeFile("paths.csv", writeArr, function(err) {
      if(err) {
          return console.log(err);
      }

      console.log("The file was saved!");
  });
};
