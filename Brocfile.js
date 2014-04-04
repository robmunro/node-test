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

  // Build up coffee assets tree
  var coffeeAssets = 'assets/js'
  coffeeAssetsTree = pickFiles(coffeeAssets, {
    srcDir: '/',
    destDir: 'js/' // All files are served from "js/"?
  });

  // Process changes
  appJs = filterCoffeeScript(coffeeAssetsTree, {
    bare: false
  });

  // Build up coffee assets tree for browserify
  var browserifyAssets = 'assets/jsBundles'
  browserifyAssetsTree = pickFiles(browserifyAssets, {
    srcDir: '/',
    files: ['**/*.coffee'],
    destDir: 'jsBundles/' // All files are served from "jsBundles/"?
  });

  // Convert those coffee assets into js
  browserifyAssetsTree = filterCoffeeScript(browserifyAssetsTree, {
    bare: false
  });

  // Build selected browserify bundles
  browserifyAppJs = compileBrowserifyBundles(browserifyAssetsTree, {
    entries: ['./jsBundles/bundle.js'],
    outputFile: 'js/bundled.js' // Required for broccolli-browserify to work
  });

  // Build up styles tree
  var styleAssets = 'assets/css';
  styleAssetsTree = pickFiles(styleAssets, {
    srcDir: '/',
    destDir: 'css/' // Not sure when to use this - helps when multiple files with same name?
  });

  // Process changes - broccoli-sass supports compilations of one file only
  var appCss = compileSass([styleAssetsTree], 'css/test.scss', 'css/test.css');

  return [appJs, browserifyAppJs, appCss];
}
