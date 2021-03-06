# Some cool tests to set up
# Set up connect - DONE
# Set up express - DONE
# Set up asset-rack - DONE
# Set up connect-assets - DONE
# Set up stylus (connect assets and asset-rack) - DONE
# Set up browserify (browserify-middleware and asset-rack) - DONE
# Set up and test npm start - scripts in package.json - DONE
# Set up coffeescript (connect-assets and asset-rack) - DONE
# Set up snockets (asset-rack etc) - Just a javascript/Coffescript concat tool, ie no need if using browserify
# Set up styl - DONE
# Set up rework - DONE
# Set up libsass - DONE
# Set up nconf - DONE
# Set up Dynamo - DONE
# Set up Redis?? - Cache Cluster (ElasticCache) set up on AWS -
# Set up broccoli - working with style files and coffee script (imports on both) - DONE
#                 - get liveReload working and integrate in node backend - DONE
# Set up browserify with beefy live reload (can we setup in direct for testing)
# Set up watchify for fast reloading of browserified assets (can we setup in direct for testing)
# Set up debowerify to include bower modules with browserify (work out what modules we can handle with this)
# Set up decomponentify to include component modules with browserify (work out what modules we can handle with this)
# Set up paginated example with Redis and dynamo
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
browserify = require 'browserify-middleware'

reworkInline = require 'rework-inline'
rework = require 'rework'
reworkNpm = require 'rework-npm'
reworkImporter = require 'rework-importer'
reworkVariables = require 'rework-variant'
styl = require 'styl'
sass = require 'node-sass'
dynamoTable = require 'dynamo-table'

exec = require('child_process').exec

# run broccoli cli in child process
broccoli = exec 'broccoli serve', []

# show stdout of brocolli in process stdout
broccoli.stdout.pipe(process.stdout)

broccoli.on 'exit', (code) ->
  console.log 'Exit code: ' + code

# Setting and testing nconf
nconf.file __dirname + '/config.json'

app = express()
app.set 'views', __dirname + '/views'
app.set 'view engine', 'jade'

app.get '/test', (req, res, next) ->
  res.render 'index'

app.listen '3005'
