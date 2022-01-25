'use strict';
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRouters = require('./routes/route');
const port = process.env.PORT || 8060;



const app=express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.get('/',(req, res) => {
    res.send("Welcome")
})

app.use('/api', userRouters.routes);


//const Asign_Routes = require('./routes/route_21');

//app.use('/api', Asign_Routes.router_21);


app.listen(port, ()=>{console.log('listening '+"http://localhost:"+port)});