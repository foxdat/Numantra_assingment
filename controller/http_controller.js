const https = require('http');
 
_EXTERNAL_URL = "http://localhost:8080/api/userapproval";


const callExternalApiUsingHttp = (callback) => {
    https.get(_EXTERNAL_URL, (resp) => {
    let data = '';
    
    // A chunk of data has been recieved.
    resp.on('data', (chunk) => {
        data += chunk;
    });
    
    // The whole response has been received. Print out the result.
    resp.on('end', () => {
        return callback(data);
       // console.log(JSON.stringify(data));
    });
    
    }).on("error", (err) => {
       
    console.log("Error: " + err.message);
    });
}


const httpRequest = async (req, res, next) => {

    try {
        https.get(_EXTERNAL_URL, (resp) => {
            let data = '';
            
            // A chunk of data has been recieved.
            resp.on('data', (chunk) => {
                data += chunk;
            });
            
            // The whole response has been received. Print out the result.
            resp.on('end', () => {
                res.status(200).send(data);
               // console.log(JSON.stringify(data));
            });
            
            }).on("error", (err) => {
               
            console.log("Error: " + err.message);
            res.status(200).send(err.messag);
            });
       
           
     

    } catch (error) {
        res.status(400).send({ status: "0", "data": error.message });
    }

}



const httpPostRequest = async (req, res, next) => {

    try {
        
        const data = JSON.stringify({
            user_id: req.body.user_id
        })
        
        const options = {
          hostname: 'localhost',
          port: 8080,
          path: 'api/userapproval',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length
          }
        }
        
        const req = https.request(options, res => {
          console.log(`statusCode: ${res.statusCode}`)
        
          res.on('data', d => {
            res.status(200).send(d);
          })
        })
        
        req.on('error', error => {
          console.error(error)
        })
        
        req.write(data)
        req.end()
        
     

    } catch (error) {
        res.status(400).send({ status: "0", "data": error.message });
    }

}



module.exports = {
    httpRequest,
    httpPostRequest,
    callExternalApiUsingHttp 


}


