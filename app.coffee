# Some cool tests to set up
# Set up connect - DONE
# Set up express - DONE
# Set up asset-rack - DONE
# Set up connect-assets - DONE
# Set up stylus(connect assets and asset-rack) - DONE
# Set up browserify(browserify-middleware and asset-rack) - DONE
# Set up and test npm start - scripts in package.json - DONE
# Set up coffeescript (connect-assets and asset-rack) - DONE
# Set up snockets(asset-rack etc) - Just a javascript/Coffescript concat tool, ie no need if using browserify
# Set up styl - DONE
# Set up rework - DONE
# Set up libsass - DONE
# Set up nconf DONE
# Set up Dynamo
# Set up Redis??
# Set up broccoli
# Set up brunch
# Set up gulp
# Checkout Harp
# Checkout Mimosa
# Set up rebuilding (brocolli/supervisor/livereload etc)
# Set up lodash/underscore
# Set up debugging scrips of app in chrome
# Set up source maps for stylus and then be able to save back files in chrome

# Set up sample jadified/html templates bundle for caching
nconf = require 'nconf'
express = require 'express'
fs = require 'fs'
coffeeScript = require 'coffee-script'
connectAssets = require 'connect-assets'
rack = require 'asset-rack'
browserify = require 'browserify-middleware'

reworkInline = require 'rework-inline'
rework = require 'rework'
reworkNpm = require 'rework-npm'
reworkImporter = require 'rework-importer'
reworkVariables = require 'rework-variant'
styl = require 'styl'
sass = require 'node-sass'
dynamoTable = require 'dynamo-table'

# Rework/Styl testing
#fs.readFile __dirname + '/assets/css/test.styl', (err, data) ->
#  testCss =
#    styl(data.toString(),
#      whitespace: true
#    )
#    .use(reworkImporter
#      path: 'test.styl'
#      base: __dirname + '/assets/css/'
#      whitespace: true
#    )
#    .use(reworkVariables())
#    .toString()
#
#  fs.writeFile __dirname + '/public/stylesheets/styl.css', testCss, (err) ->
#    if(err) then console.log(err) else console.log("The file was saved!")

# Setting and testing nconf
nconf.file __dirname + '/config.json'
console.log nconf.get 'test'


app = express()
app.set 'views', __dirname + '/views'
app.set 'view engine', 'jade'
# Serves all SCSS files from /assets/css/ to /public/css/ when they are requested
app.use(
  sass.middleware(
    src: __dirname + '/assets'
    dest: __dirname + '/public'
    debug: true
    outputStyle: 'compressed'
  )
)
# This step is required to serve static files from a particular dir, with express
app.use('/css', express.static(__dirname + '/public/css'))

#assets = new rack.Rack([
#  new rack.Asset(
#    url: '/hello.txt'
#    contents: 'hello world'
#  ),
#  new rack.StylusAsset(
#    url: '/style.css'
#    filename: __dirname + '/assets/css/style.styl'
#  )
##  new rack.DyanmicAssets(
##    type: LessAsset
##    urlPrefix: '/style'
##    dirname: './style'
##  )
#])
#app.use '/js', browserify('./public/javascripts')
#styleAsset = new rack.StylusAsset(
#  url: '/style.css'
#  filename: __dirname + '/assets/css/style.styl'
#)
#imageAsset = new rack.ImageAsset(
#  url: '/logo.png'
#  filename: __dirname + '/public/images/logo02.png'
#)
#
##connectAssets.cssCompilers.styl.compress = nconf.get 'connectAssets:compressStylus'
#app.use '/assets', connectAssets(
#  build: true
#  detectChanges: true
#  compressStylus: true
#  servePath: '/assets'
#)
app.get '/test', (req, res, next) ->
  res.render 'index'


#app.use assets
#app.use new rack.DynamicAssets(
#  type: rack.BrowserifyAsset
#  urlPrefix: '/js'
#  dirname: __dirname + '/public/javascripts'
#  filter: 'coffee'
#)
#app.use styleAsset
#app.use app.router
#app.get '/', (req, res) ->
#  res.send 'You are a stupid head'
#  return
#
#app.get '/dog/cat/:id1/:id2', (req, res) ->
#  res.send 'You are a stupid head' + req.params.id1 + ' and you ' + req.params.id2
#  return
#
#middleware = (req, res, next) ->
#  fs.readFile __dirname + '/test.txt', (err, data) ->
#    req.name = data
#    next()
#    return
#
#  return
#
#app.get '/cat', middleware, (req, res) ->
#  res.send 'I dont say Hello to you you stinking poophead ' + req.name + ', if that is your real name!!!!'
#  return
#
#app.use (req, res) ->
#  res.writeHead 200,
#    'Content-Type': 'text/html'
#
#  res.end '<h1>Hello, middleware</h1>'
#  return

app.listen '3005'
