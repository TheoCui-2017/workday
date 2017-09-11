module.exports = function(){
    var httpRequest = {};
    var promise = require('promise');

    httpRequest.getData = function(url, method, params, headers){
        var request = require('request');
        var options = {
            url: url, 
            method: method, // get or post
            form: params
        };
        if(headers){
            options.headers = headers;
        }
        return new promise(function(resolve, reject) {
            request(options, function (error, response, body) {
                if (error) {
                    return reject(error);
                }
                else{
                    return resolve(body);
                }   
            });
        });
    }

    httpRequest.getDataBody = function(url, method, params,token){
        var request = require('request');
        var post_options = {
            url: url, 
            method: method, 
            body: params, 
            json:true
        };
        if(token)
            post_options.headers= {'X-ACL-TOKEN': token};
        return new promise(function(resolve, reject) {
            request(post_options, function (error, response, body) {
                if (error) {
                    return reject(error);
                }
                else{
                    return resolve(body);
                }   
            });
        });
    }

    return httpRequest;
}
