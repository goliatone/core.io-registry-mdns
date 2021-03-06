/*jshint esversion:6, node:true*/
'use strict';

/*
 * Default initializer for the module.
 *
 * You can always override this and make
 * a custom initializer.
 */
module.exports.init = require('./lib/init');

module.exports.Client = require('./lib/client');
module.exports.Browser = require('./lib/browser');