const sql = require('mssql');
const dbconfig = require('../dbconfig');
var request = require('request');



const remove_duplicate =  async (req, res, next) => {
    var arr = [ 12,21,23,67,90,67,56,21,12,44,88,34];
    uniqueArray = arr.filter(function(elem, pos) {
        return arr.indexOf(elem) == pos;
    })

   
        res.status(200).send({ "status": "1", "data": uniqueArray });
        console.log(uniqueArray);

    

}


const git_Api = async (req, res, next) => 
    
{
   try {

          var options = {
            'method': 'GET',
            'url': 'https://reqres.in/api/unknown',
            'headers': {
            }
          };

       
          request(options, function (error, response) {
            if (error){
                res.status(404).send({ "status": "0", "msg": error });
                };
                console.log(response.body)
                var temp = JSON.parse(response.body);   
                var id_count = temp.data;
                var avg = 0;
                id_count.forEach(element => { 
                    avg += element.year;
                });
                var  result = { "status": "1",
                             "data":{"avg":Math.round(avg / id_count.length ),
                                      "total": id_count.length }};
            res.status(200).send(result);
          });

        

    } catch (error) {
        res.status(400).send({ status: "0", "data": error.message });
    }
}



module.exports = {
    remove_duplicate,
    git_Api

}