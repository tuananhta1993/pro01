/*
                                    _ooOoo_
                                   o8888888o
                                   88" . "88
                                   (| -_- |)
                                    O\ = /O
                                ____/`---'\____
                              .   ' \\| |// `.
                               / \\||| : |||// \
                             / _||||| -:- |||||- \
                               | | \\\ - /// | |
                             | \_| ''\---/'' | |
                              \ .-\__ `-` ___/-. /
                           ___`. .' /--.--\ `. . __
                        ."" '< `.___\_<|>_/___.' >'"".
                       | | : `- \`.;`\ _ /`;.`/ - ` : | |
                         \ \ `-. \_ __\ /__ _/ .-` / /
                 ======`-.____`-.___\_____/___.-`____.-'======
                                    `=---='
                 .............................................
                      My code is gonna make you cry so hard
                      May the Buddha be with you  ◉︵◉
*/

var express = require('express');
var path = require('path');

var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./app-server/routes/index');
var api = require('./app-api/routes/api');

var app = express();

var connectDB = require('./app-api/ultilities/connectDB');
connectDB(;

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'bower_components')));

app.use('/api', api)
app.use('/', routes);

module.exports = app;
