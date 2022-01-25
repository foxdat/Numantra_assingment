const User = require('../modules/user');
const sql = require('mssql');
const dbconfig = require('../dbconfig');
const httpapi = require('../controller/http_controller');
// var dbconfig = require('../dbconnect');

var pool;



async function connectdb()
 {
    try {
        if (pool == null) {
            console.log("connecting to database");
            pool = await sql.connect(dbconfig);
            return pool;
        }
        else {
            console.log("database connected");
            return pool;
        }


    } catch (error) {
        console.log(error);

    }
}


const getUsers = async (req, res, next) => {

    try {
       
        var sqlQuery = "SELECT * FROM tbluser";
        console.log("sqlQuery:  " + sqlQuery);


        var db = await connectdb();

        var users = await db.request().query(sqlQuery);
        let dataSet = users["recordset"];

        if (Object.keys(dataSet).length === 0) {
            res.status(404).send({ "status": "0", "msg": "no match found"});
        } else {
           var dd= httpapi.callExternalApiUsingHttp();
            res.status(200).send({ "status": "200", "data": dd});
        }

    } catch (error) {
        res.status(400).send({ status: "0", "data": error.message });
    }
}

const loginUser = async (req, res, next) => {

    try {
        // todo: email or mobile 
        const email = req.body.email;
        const password = req.body.password;

        // var sqlQuery = "SELECT * FROM tbluser where useremail = '" + email + "' AND userpassword = '" + password + "'";

        var sqlQuery = "exec usp_user_validation '" + email + "','" + password + "'";

        console.log("details:  " + email + "," + password);
        console.log("sqlQuery:  " + sqlQuery);


        var db = await connectdb();

        var users = await db.request().query(sqlQuery);
        let dataSet = users["recordset"];

        if (Object.keys(dataSet).length === 0) {
            res.status(404).send({ "status": "0", "msg": "no match found"});
        } else {

            res.status(200).send(dataSet);
        }

    } catch (error) {
        res.status(400).send({ status: "0", "data": error.message });
    }

}



//  api for from end to get list of all roles
const GetRolesList = async (req, res, next) => {
    try {

        var sqlQuery = "SELECT role_no,role_name FROM tblroles";
        console.log("sqlQuery:  " + sqlQuery);


        var db = await connectdb();

        var role = await db.request().query(sqlQuery);
        let dataSet = role["recordset"];

        if (Object.keys(dataSet).length === 0) {
            res.status(404).send({ "status": "0", "msg": "no match found" });
        } else {
            res.status(200).send({ "status": "1", "data": dataSet });
            console.log(dataSet);

        }

    } catch (error) {
        res.status(400).send({ status: "0", "data": error.message });
    }
}





module.exports = {
    getUsers,
    loginUser,
    GetRolesList

}