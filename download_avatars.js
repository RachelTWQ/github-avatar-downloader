var request = require('request');
var fs = require('fs');
var secret = require('./GITHUB_TOKEN');

var owner = process.argv[2];
var name = process.argv[3];

console.log('Welcome to the GitHub Avatar Downloader!');

if (owner == null || name == null){
    console.log('Please provide valid repoOwner and repoName.')
} else {
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
            // type = response.headers['content-type'].split('/')[1];
            // console.log('Type is: ', type);
        }  
    })
    .pipe(fs.createWriteStream(filePath))
    .on('finish', function(){
         console.log("Download completed")
     });
    
}

getRepoCountributors(owner, name, function (err, result) {
    // var avatarUrl = {};
    for (let i = 0; i < result.length; i++){
        //avatarUrl[data[i]["login"]] = data[i]["avatar_url"];
        var url =  result[i]['avatar_url'];
        var filePath = './avatars/' + result[i]['login'] + '.jpg';
        downloadImageByURL(url, filePath);
    }
    // return downloadImageByURL(avatarUrl);
});
}

