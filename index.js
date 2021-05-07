const http = require('https');
const AWS = require('aws-sdk');

exports.handler = async (event) => {
    
    let object_get_context = event["getObjectContext"]
    let request_route = object_get_context["outputRoute"]
    let request_token = object_get_context["outputToken"]
    let s3_url = object_get_context["inputS3Url"]
    
    let response = await httprequest(s3_url);
    let original_object = response;
    
    let transformed_object = original_object.toUpperCase();
    let s3 = new AWS.S3();
    await s3.writeGetObjectResponse({
        Body:transformed_object,
        RequestRoute:request_route,
        RequestToken:request_token
    }).promise();
    
    return {'status_code': 200}
    
};

function httprequest(url) {
     return new Promise((resolve, reject) => {
         
         http.get(url, res => {
            let data = "";

            res.on("data", d => {
                data += d;
            });
            res.on("end", () => {
                resolve(data);
            });
        }); 
    });
}