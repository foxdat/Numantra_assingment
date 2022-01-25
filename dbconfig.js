"use strict";
const sql = require("mssql");

var dbConfig = {
  user:'Shubham',
    password:'Priyanka@1994',
    server:'DESKTOP-TJBHMIM',
    database:'MiriMarket',
    options: {
         trustedconnection: true,
          trustServerCertificate: true,
        enableArithAbort: true,
      //  instancename: 'SQLEXPRESS'
    },
    port: 1433,
    
  }



module.exports = dbConfig;