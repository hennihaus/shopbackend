const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
var cors = require('cors')

const dotenv = require("dotenv");
dotenv.config();

const initDatabaseConnection = require('./dbConnection.js');



const app = express();


app.use(cors({
  origin:"http://localhost:3000",
  credentials:true
}))

//default port if an error occurred
let port =3020;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
app.use(cookieParser());


app.use('/images', express.static(__dirname + '/images'));


initDatabaseConnection(process.argv[2]);


require('./routes/session/session')(app);



switch (process.argv[2]){
  case "shop":
    port =3005;
    require('./routes/shop/routes')(app);
    break;
  case "fastfood":
    port =3010;
    require('./routes/fastfood/routes')(app);
    break;
  case "fitness":
    port =3015;
    require('./routes/fitness/routes')(app);
    break;
  default:
    app.get('/', (req, res) => {
      res.send('something went wrong');
    });
}

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});




