const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
var cors = require('cors')

const dotenv = require("dotenv");
dotenv.config();
const initDatabaseConnection = require('./dbConnection.js');


const app = express();

const hostname = process.env.HOST || 'localhost';
const port = process.env.PORT || 3005;
const frontendHostname = process.env.FRONTEND_HOST || 'localhost';
const frontendPort = process.env.FRONTEND_PORT || 3000;
const dbHostname = process.env.DB_HOST || 'localhost';
const dbPort = process.env.DB_PORT || 27017;

app.use(cors({
    origin: `http://${frontendHostname}:${frontendPort}`
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

app.listen(port, hostname, () => {
    console.log(`Example app listening at http://${hostname}:${port}`)
});




