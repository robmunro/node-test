// Things to test with Broccoli
// See if i can get project running from here Express etc
// Get Broccoli restarting node if it fails
// Get performance testing on how long rebuild takes with
//   - Stylus
//   - Browserify

module.exports = function (broccoli) {
  var filterCoffeeScript = require('broccoli-coffee');
  var compileSass = require('broccoli-sass');
  var compileBrowserifyBundles = require('broccoli-browserify');
  var pickFiles = require('broccoli-static-compiler');
  var path = require('path')
  var fs = require('fs')

  // Build up coffee assets tree
//  var coffeeAssets = 'assets/js'
//  coffeeAssetsTree = pickFiles(coffeeAssets, {
//    srcDir: '/',
//    destDir: 'js/' // All files are served from "js/"?
//  });

//  // Process changes
//  appJs = filterCoffeeScript(coffeeAssetsTree, {
//    bare: false
//  });

  // Build up coffee assets tree for browserify
  var browserifyAssets = 'assets/jsBundles'
  browserifyAssetsTree = pickFiles(browserifyAssets, {
    srcDir: '/',
    files: ['**/*.js'],
    destDir: 'assets/jsBundles/' // All files are served from "jsBundles/"?
  });

//  // Convert those coffee assets into js
//  browserifyAssetsTree = filterCoffeeScript(browserifyAssetsTree, {
//    bare: false
//  });

//      fullpath = path.join publicDir, dir
//    if fs.statSync(fullpath).isDirectory() then list[dir] = fullpath


  browserifyFiles = [];

  browserifyDirectory = function (dir, outputDir, tree) {
    browserifiedFiles = []
    files = fs.readdirSync(path.join(__dirname, dir))

    for(var i=0; i < files.length; i++) {

      currentFile = files[i];
      fullpath = path.join(__dirname, dir, currentFile);
      currentFileRelativePath = './' + path.join(dir, currentFile);
      console.log(currentFileRelativePath);

      currentItem = fs.statSync(fullpath)
      if(currentItem.isFile()) {
        browserifiedFiles.push(
          compileBrowserifyBundles(tree, {
            entries: [currentFileRelativePath],
            outputFile: path.join(dir, currentFile) // Required for broccolli-browserify to work
          })
        );
      }
      if(currentItem.isDirectory()) {
        browserifiedFiles.concat(
          browserifyDirectory(dir + '/' + currentFile, outputDir + '/' + currentFile, tree)
        )
      }
    }
    return browserifiedFiles;
  };

  testArray = browserifyDirectory('assets/jsBundles', '/js', browserifyAssetsTree);

//  // Build selected browserify bundles
//  browserifyAppJs = compileBrowserifyBundles(browserifyAssetsTree, {
//    entries: ['./jsBundles/bundle.js'],
//    outputFile: 'js/bundled.js' // Required for broccolli-browserify to work
//  });

  // Build up styles tree
  var styleAssets = 'assets/css';
  styleAssetsTree = pickFiles(styleAssets, {
    srcDir: '/',
    destDir: 'css/' // Not sure when to use this - helps when multiple files with same name?
  });

  // Process changes - broccoli-sass supports compilations of one file only
  var appCss = compileSass([styleAssetsTree], 'css/test.scss', 'css/test.css');

//  browserify_options.basedir = srcDir;
//  var b = browserify(browserify_options);
//
//  if(options.dir != null) {
//    console.log("path.join(destDir, dir)", path.join(destDir, dir))
//    mkdirp.sync(path.join(destDir, dir))
//    list = fs.readdirSync(dir)
//
//  } else {;
//    mkdirp.sync(path.join(destDir, path.dirname(options.outputFile)))
//    for(var i=0; i < options.entries.length; i++) {
//      b.add(options.entries[i]);
//    }
//  }


  return [appCss].concat(testArray);
}
