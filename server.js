// Example of using ExpressJS to expose your service as a REST API server;
// NOTE: This is the most basic structure for demonstration purpose. Everything is in a single js file. 
// For more complex use case, you need to modularize your code :) 

//express to serve the webpage as OIP service
const express = require('express');

//axios to make HTTP request to OIP
const axios = require('axios');
const app = express();
const http = require('http');
const server = http.createServer(app);
const port = 3000;
let data;

// When client requesting GET http://localhost:3000 it will be handled here.
app.get('/', (req, res) => {
    res.status(200).send('Hello World');
})

// When client is requesting GET http://localhost:3000/corona-data it will be handled here
app.get('/corona-data', (req, res) => {

    axios({
        method: 'GET',
        url: 'https://api.oip.tmrnd.com.my/app/t/opendata.oip.tm.com.my/covid19kkm/1.0.0/base',
        // params: {
        //     startDate: '2020-08-20',
        //     endDate: '2020-08-27',
        //     countryCode: 'MY'
        // },
        headers: {
            Authorization: 'Bearer 0a275fe6-03dd-3ee4-9039-97ef4e17023a'
        }
    }).then((result) => {
        // console.log(result.data);
        data = result.data;

        return res.status(200).json(result.data);

    }).catch(error => {
        console.error('Error Has Occured');
        console.log(error);
        return res.status(500).json(error.message);
    });
});

// Start the service
server.listen(port, () => {
    console.log('Server is listening to port ' + port);
})

