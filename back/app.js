const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const request = require('request');
const querystring = require('querystring');
const cheerio = require('cheerio');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "https://paktusin.github.io");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const API_URL = 'https://www.rottentomatoes.com/api/private/v2.0/browse?';

app.get('/', (req, res, next) => {
    const params = Object.assign(require('../front/src/filter'), req.query);
    request(API_URL + querystring.stringify(params), {
        json: true,
    }, (err, result, body) => {
        if (err) res.json(err);
        res.send(body);
    })
});

app.get('/find/:path', (req, res, next) => {
    request('https://www.rottentomatoes.com/m/' + req.params.path, (err, result, body) => {
        try {
            const $ = cheerio.load(body);
            const imageEl = $('.heroImage.movie');
            const image = imageEl.data('bg-srcset').split(', ').slice(-1)[0];
            res.json({
                image
            });
        } catch (e) {
            return next();
        }
    });
});

app.use(function (req, res, next) {
    next(createError(404));
});

app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.json(err);
});

module.exports = app;
