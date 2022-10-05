// Server generated
const express = require('express');
const fs = require('fs');
const path = require('path')

const index = require("./router/index")
const downloader = require("./router/downloader")

const app = express();

/*
* Developer Note: 
* BodyParser(body-parser) is deprecated so -
* we are using express as body parsing middleware
*/

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.set('views', path.join(__dirname, 'templates'))
app.set('view engine', 'ejs')
app.use(express.static(`${__dirname}/statics`));

app.use("/", index)
app.use("/download", downloader)

const IP = process.env.IP || 'localhost'
const Port = process.env.PORT || 3000;

app.listen(Port, (err) => {
    if (err) {
       console.log(err)
   } else {
       console.log(`Server is Listening at http://${IP}:${Port}`);
    }
});