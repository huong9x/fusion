const path = require('path');
require('app-module-path').addPath(path.normalize(path.join(__dirname, 'src')));
require('reflect-metadata');
require('babel-register')({
    ignore: /node_modules\/(?!@sphinx-software)/
});
require('./http.bootstrap');