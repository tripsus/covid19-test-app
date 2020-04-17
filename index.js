// index.js

/**
 * Required External Modules
 */
const express = require("express");
const path = require("path");
const dotenv = require('dotenv');
const sgMail = require('@sendgrid/mail');
const { Client, Connection } = require('pg');



//
/**
 * App Variables
 */
const app = express();
const port = process.env.PORT || "8000";
const client = new Client(process.env.DATABASE_URL);
/**
 *  App Configuration
 */

/**
 * Routes Definitions
 */

app.get("/", (req, res) => {
  
  res.send("Use \\mail end point to send a test mail");
});
app.get("/mail", (req, res) => {

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    
    const msg = {
        to: 'sushiltripathi72@gmail.com',
        from: 'sushiltripathi72@gmail.com',
        subject: 'Sending with Twilio SendGrid is Fun',
        text: 'and easy to do anywhere, even with Node.js',
        html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    };

    sgMail
    .send(msg)
    .then(() => {},error => {
                  console.error(error);
                  if (error.response) {
                    console.error(error.response.body)
                    res.send("Error occured while sending mail")
                }
    });
    res.status(200)
    res.send("Mail sent. Please check your inbox");
  });

app.get("/db", (req, res) => {
  console.log("Connecting to database")
  client.connect();
  client.query('SELECT version()', ['Hello world!'], (err, res) => {
    console.log(err ? err.stack : res.rows[0].message) // Hello World!
    client.end()
  })
})
/**
 * Server Activation
 */
app.listen(port, () => {
    console.log(`Listening to requests on https://localhost:${port}`);
  });