// Some cool tests to set up
// Set up connect
// Set up express
// Set up asset-rack
// Set up connect-assets
// Set up stylus
// Set up browserify
// Set up coffeescript
// Set up stylus (done)
// Set up styl
// Set up rework
// Set up libsass
// Set up Dynamo
// Set up Redis??
// Set up broccoli
// Set up brunch
// Set up gulp
// Set up lodash/underscore
// Set up nconf

// Set up sample jadified/html templates bundle for caching

var express = require('express');
var fs = require('fs')
var connectAssets = require('connect-assets')
var rack = require('asset-rack')
var browserify = require('browserify-middleware')
var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

//assets = new rack.Rack([
//    new rack.Asset({
//        url: '/hello.txt',
//        contents: 'hello world'
//    }),
//    new rack.StylusAsset({
//        url: '/style.css',
//        filename: __dirname + '/assets/css/style.styl'
//    })
//])

app.use('/js', browserify('./public/javascripts'));

//styleAsset = new rack.StylusAsset({
//    url: '/style.css',
//    filename: __dirname + '/assets/css/style.styl'
//});

//imageAsset = new rack.ImageAsset({
//    url: '/logo.png',
//    filename: __dirname + '/public/images/logo02.png'
//});
//connectAssets.cssCompilers.styl.compress = nconf.get 'connectAssets:compressStylus'
//app.use('/assets', connectAssets({
//    "build": true,
//    "detectChanges": false,
//    "compressStylus": true,
//    "servePath": "/assets"
//  }));

app.get('/test', function(req, res, next) {
    res.render('index')
});
//app.use(require('connect-assets')())
app.use(assets)
//app.use(styleAsset)
//app.use(app.router)

//app.get('/', function (req, res) {
//    res.send('You are a stupid head');
//});
//
//app.get('/dog/cat/:id1/:id2', function (req, res) {
//    res.send('You are a stupid head' + req.params.id1 + ' and you ' + req.params.id2);
//});
//
//var middleware = function (req, res, next) {
//    fs.readFile(__dirname + '/test.txt', function (err, data) {
//        req.name = data;
//        next();
//    })
//}
//
//app.get('/cat', middleware, function (req, res) {
//   res.send('I dont say Hello to you you stinking poophead ' + req.name + ', if that is your real name!!!!');
//});
//
//app.use(function (req, res) {
//    res.writeHead(200, {'Content-Type': 'text/html'});
//    res.end('<h1>Hello, middleware</h1>')
//})

app.listen('3005');
