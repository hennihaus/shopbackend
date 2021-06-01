const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
var cors = require('cors')

const dotenv = require("dotenv");
dotenv.config();
const initDatabaseConnection = require('./dbConnection.js');


const app = express();

const dbHostname = process.env.DB_HOST || 'localhost';
const dbPort = process.env.DB_PORT || 27017;

app.use(cors({
    origin: '*',
    credentials: true
}))


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))
// parse application/json
app.use(bodyParser.json())
app.use(cookieParser());


app.use('/images', express.static(__dirname + '/images'));


initDatabaseConnection(dbHostname, dbPort);


require('./routes/session/session')(app);
require('./routes/shop/routes')(app)

app.listen(4201, () => {
    console.log(`Example app listening at http://localhost:4201`)
});




