// Some cool tests to set up
// Set up connect - DONE
// Set up express - DONE
// Set up asset-rack - DONE
// Set up connect-assets - DONE
// Set up stylus (connect assets and asset-rack) - DONE
// Set up browserify (browserify-middleware and asset-rack) - DONE
// Set up and test npm start - scripts in package.json - DONE
// Set up coffeescript (connect-assets and asset-rack) - DONE
// Set up snockets (asset-rack etc) - Just a javascript/Coffescript concat tool, ie no need if using browserify
// Set up styl - DONE
// Set up rework - DONE
// Set up libsass - DONE
// Set up nconf - DONE
// Set up Dynamo - DONE
// Set up Redis?? - Cache Cluster (ElasticCache) set up on AWS -
// Set up broccoli - working with style files and coffee script (imports on both) - DONE
// Set up browserify with beefy live reload (can we setup in direct for testing)
// Set up watchify for fast reloading of browserified assets (can we setup in direct for testing)
// Set up debowerify to include bower modules with browserify (work out what modules we can handle with this)
// Set up decomponentify to include component modules with browserify (work out what modules we can handle with this)
// Set up paginated example with Redis and dynamo
// Set up brunch
// Set up gulp
// Checkout Harp
// Checkout Mimosa
// Set up rebuilding (brocolli/supervisor/livereload etc)
// Set up lodash/underscore
// Set up debugging scrips of app in chrome
// Set up source maps for stylus and then be able to save back files in chrome

// Set up sample jadified/html templates bundle for caching

var express = require('express');
var fs = require('fs')
var connectAssets = require('connect-assets')
var rack = require('asset-rack')
var browserify = require('browserify-middleware')
var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

assets = new rack.Rack([
    new rack.Asset({
        url: '/hello.txt',
        contents: 'hello world'
    }),
    new rack.StylusAsset({
        url: '/style.css',
        filename: __dirname + '/assets/css/style.styl'
    })

//    new rack.DyanmicAssets({
//        type: LessAsset,
//        urlPrefix: '/style',
//        dirname: './style'
//    })
])

//app.use('/js', browserify('./public/javascripts'));

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
app.use(assets);
app.use(new rack.DynamicAssets({
    type: rack.BrowserifyAsset,
    urlPrefix: '/js',
    dirname: __dirname + '/public/javascripts'
}));

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
