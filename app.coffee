# Some cool tests to set up
# Set up connect - DONE
# Set up express - DONE
# Set up asset-rack - DONE
# Set up connect-assets - DONE
# Set up stylus(connect assets and asset-rack) - DONE
# Set up browserify(browserify-middleware and asset-rack) - DONE
# Set up and test npm start - scripts in package.json - DONE
# Set up coffeescript (connect-assets and asset-rack) - DONE
# Set up snockets(asset-rack etc) - Just a javascript/Coffescript concat tool
# Set up styl -
# Set up rework
# Set up libsass
# Set up Dynamo
# Set up Redis??
# Set up broccoli
# Set up brunch
# Set up gulp
# Checkout Mimosa
# Set up rebuilding (brocolli/supervisor/livereload etc)
# Set up lodash/underscore
# Set up nconf
# Set up debugging scrips of app in chrome

# Set up sample jadified/html templates bundle for caching
express = require('express')
fs = require('fs')
coffeeScript = require('coffee-script')
connectAssets = require('connect-assets')
rack = require('asset-rack')
browserify = require('browserify-middleware')

styl = require('styl')

fs.readFile __dirname + '/assets/css/style.styl', (err, data) ->
  console.log "dog", data.toString()
  testCss = styl(data.toString(), { whitespace: true }).toString()

  fs.writeFile __dirname + '/public/stylesheets/styl.css', testCss, (err) ->
    if(err) then console.log(err) else console.log("The file was saved!")

app = express()
app.set 'views', __dirname + '/views'
app.set 'view engine', 'jade'



assets = new rack.Rack([
  new rack.Asset(
    url: '/hello.txt'
    contents: 'hello world'
  ),
  new rack.StylusAsset(
    url: '/style.css'
    filename: __dirname + '/assets/css/style.styl'
  )
#  new rack.DyanmicAssets(
#    type: LessAsset
#    urlPrefix: '/style'
#    dirname: './style'
#  )
])
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
app.use '/assets', connectAssets(
  build: true
  detectChanges: true
  compressStylus: true
  servePath: '/assets'
)
app.get '/test', (req, res, next) ->
  res.render 'index'


#app.use assets
app.use new rack.DynamicAssets(
  type: rack.BrowserifyAsset
  urlPrefix: '/js'
  dirname: __dirname + '/public/javascripts'
  filter: 'coffee'
)
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
