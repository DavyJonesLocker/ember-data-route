'use strict';

var fs   = require('fs');
var path = require('path');

function EmberDataRoute(project) {
  this.project = project;
  this.name    = 'EmberDataRoute';
}

function unwatchedTree(dir) {
  return {
    read:    function() { return dir; },
    cleanup: function() { }
  };
}

EmberDataRoute.prototype.treeFor = function treeFor(name) {
  var treePath = path.relative(process.cwd(), __dirname);

  if (name === 'templates' || name === 'styles') {
      treePath = path.join(treePath, 'app', name);
  } else {
      treePath = path.join(treePath, name);
  }

  if (fs.existsSync(treePath)) {
    if (process.env.EMBER_ADDON_ENV === 'development') {
      return treePath;
    } else  {
      return unwatchedTree(treePath);
    }
  }
};

EmberDataRoute.prototype.included = function included(app) {
  this.app = app;
};

module.exports = EmberDataRoute;
