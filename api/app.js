/*
 * Description: A script
 * Version: 0.1
 * Author: Daniel Andrade
 * Date: 22/06/2017
 * This code may not be reused without proper permission from its creator.
 */
import "../shared/base/extend";

let express = require('express');
let path = require('path');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let session = require('express-session');

// APP
let app = express();

/// MIDDLEWARE
/// =CORS
let cors = require('cors');

let whitelist = ['http://localhost:3000'];
let corsOptionsDelegate = function (req, callback) {
    var corsOptions;


    if (whitelist.indexOf(req.header('Origin')) !== -1) {
        corsOptions = {
            origin: true,
            credentials: true
        };
    } else {
        corsOptions = { origin: false };
    }


    callback(null, corsOptions) // callback expects two parameters: error and options
};

app.use(cors(corsOptionsDelegate));

app.options('*', cors());

/// =SESSION
let cookieSecret = 'keyboard cat';
app.use(session({
    secret: cookieSecret,
    saveUninitialized: true,
    resave: true,
    cookie: {
        maxAge: 60000,
        httpOnly: true
    }
}));

// uncomment after placing your favicon in /public
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser(cookieSecret));
app.use(express.static(path.join(__dirname, 'static')));
// app.use(express.static(path.join(__dirname, 'shared')));

// Load all routes
let glob = require('glob');
let pattern = path.join(__dirname, 'routes', '*.js');
let routeFiles = glob.sync(pattern);

for (let file of routeFiles) {
    let route = require(file);
    app.use(route.path, route.router);
}

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);

    res.send(`error ${err.status}: ${err.message}`);
});

module.exports = app;