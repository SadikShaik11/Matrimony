import express from 'express'
import helmet from 'helmet';
import xss from 'xss-clean'
import mongoSanitize from 'express-mongo-sanitize'
import compression from 'compression'
import cors from 'cors'
// const passport = require('passport');
import httpStatus from 'http-status'
import config from './src/config/config.js'
import morgan from './src/config/morgan.js'
import routes from './src/routes/v1/index.js'


const app = express();

if (config.env !== 'test') {
    app.use(morgan.successHandler);
    app.use(morgan.errorHandler);
}

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());


// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());
app.use(mongoSanitize());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options('*', cors());

// jwt authentication for passport js
// app.use(passport.initialize());
// passport.use('jwt', jwtStrategy);

// limit repeated failed requests to auth endpoints
// if (config.env === 'production') {
//     app.use('/v1/auth', authLimiter);
// }


//v1 api routes
app.use('/v1/api/', routes);

app.use('/', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                text-align: center;
                background-color: black
                padding: 50px;
            }
            h1 {
                color: #4CAF50;
            }
        </style>
    </head>
    <body>
        <h1>Welcome to My Vivaah Vedika!</h1>
        <p>Explore the features and enjoy your stay!</p>
    </body>
    </html>
    `)
})

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
    next(new Error(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
//app.use(errorConverter);

// handle error
//app.use(errorHandler);

export default app;