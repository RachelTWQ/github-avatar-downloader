var request = require('request');
var fs = require('fs');
var secret = require('./GITHUB_TOKEN');

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoCountributors(repoOwner, repoName, cb) {
    var options = {
        url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
        headers: {
          'User-Agent': 'request', //User-Agent: curl/7.47.0
          'Authorization': 'token ' + secret.GITHUB_TOKEN
        }
      };
    
    request(options, function (err, res, body) {
        if(err){
            cb(err, null);
        }
        
        if (res.statusCode === 200){
            var data = JSON.parse(body);
            cb(null, data);
            
        }
        
    });
}

function downloadImageByURL(url, filePath){
    request.get(url)
    .on('error', function(err){
        throw err;
    })
    .on('response', function (response){
        if (response.statusCode === 200){
            console.log('Download started');
        }
    })
    .pipe(fs.createWriteStream(filePath))
    .on('finish', function(){
        console.log("Download completed");
    })
    
}

getRepoCountributors("nodejs", "node", function (err, data) {
    // var avatarUrl = {};
    for (let i = 0; i < data.length; i++){
        //avatarUrl[data[i]["login"]] = data[i]["avatar_url"];
        var url =  data[i]['avatar_url'];
        var filePath = './avatars/' + data[i]['login'];
        downloadImageByURL(url, filePath)
    }
    // return downloadImageByURL(avatarUrl);
});

// downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "./avatars/kvirani.jpg");