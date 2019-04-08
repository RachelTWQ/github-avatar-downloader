var request = require('request');
var secret = require('./GITHUB_TOKEN');

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoCountributors(repoOwner, repoName, cb) {
    var options = {
        url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
        headers: {
          'User-Agent': 'request',
          'Authorization': 'token ' + secret.GITHUB_TOKEN
        }
      };
    
    request(options, function (err, res, body) {
        if(err){
            throw err;
        }
        console.log(res.statusCode);
        if (res.statusCode === 200){
            var data = JSON.parse(body);
            var avatarUrl;
            for (let i = 0; i < data.length; i++){
                avatarUrl = data[i]["avatar_url"];
                console.log("avatar_url is ", avatarUrl);
            }
        }
    }
    
    
    );
}

getRepoCountributors("nodejs", "node", function (err, result) {
    console.log("Errors:", err);
    console.log("Result:", result);
});

//User-Agent: curl/7.47.0