'use strict'

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
const url = `mongodb://sukmahd:vongola12@cluster0-shard-00-00-h9kzb.mongodb.net:27017,cluster0-shard-00-01-h9kzb.mongodb.net:27017,cluster0-shard-00-02-h9kzb.mongodb.net:27017/halal-mart?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin`
mongoose.connect(url)

var index = require('./routes/index');
var barang = require('./routes/barang');
var transaksi = require('./routes/transaksi');
var users = require('./routes/users')



var app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/barang', barang)
app.use('/transaksi', transaksi)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
