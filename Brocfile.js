module.exports = function (broccoli) {
  var filterCoffeeScript = require('broccoli-coffee');
  var compileSass = require('broccoli-sass');
  var pickFiles = require('broccoli-static-compiler');

  var filterCoffeeScript = require('broccoli-coffee');

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

  // Build up styles tree
  var styleAssets = 'assets/css';
  styleAssetsTree = pickFiles(styleAssets, {
    srcDir: '/',
    destDir: 'css/' // Not sure when to use this - helps when multiple files with same name?
  });

  // Process changes - broccoli-sass supports compilations of one file only
  var appCss = compileSass([styleAssetsTree], 'css/test.scss', 'css/test.css');

  return [appJs, appCss];
}
