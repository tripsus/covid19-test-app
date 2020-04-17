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
dotenv.config();
const port = process.env.PORT || "8000";
const client = new Client(process.env.DATABASE_URL);

console.log(process.env.SENDGRID_API_KEY);

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
  console.log("Connecting to database" + process.env.DATABASE_URL);
  client.connect();
  client.query('SELECT version()', (err, results) => {
    console.log(err ? err.stack : results.rows[0].message) // Hello World!
    client.end()
    if(err)
    {
      console.log(err.stack);
      res.status(500).send("Couldn't connect to database.")
    }
    else
    {
      res.status(200).json(results.rows);
    }
  })
})
/**
 * Server Activation
 */
app.listen(port, () => {
    console.log(`Listening to requests on https://localhost:${port}`);
  });