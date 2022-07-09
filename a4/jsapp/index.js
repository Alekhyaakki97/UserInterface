const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./server/routes/user.routes');
const articleRoutes = require('./server/routes/article.routes');
dotenv.config();

const port = process.env.PORT || 8000;
const dbConnectionString = process.env.DB_CONNECTION_STRING

const app = express();
app.use(express.json());
app.use(express.static(__dirname + '/static'))

//set CORS headers
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}


app.use(cors());

mongoose
  .connect(dbConnectionString)
  .then(() => console.log('Db connection success'))
  .catch((err) => console.log('Failed to connect to db reason:', err));

app.get('/', function (req, res, next) {
    res.sendFile(path.join(__dirname, "/static/index.html"));
});

app.use('/users', userRoutes);
app.use('/articles', articleRoutes);



app.listen(port, function () {
  console.log('Server is listening on port:', port);
});
