"use strict";

var FileStreamRotator = require("file-stream-rotator");
var mkdirp = require("mkdirp");
var path = require("path");
var morgan = require("morgan");


/**
 * Simple access log filter implementation.
 *
 * @public
 * @param  {String} name Name of the filter
 * @param  {object} config JavaScript object with filter configuration
 * @returns {middleware} Middleware function implementing the filter.
 */
module.exports.init = function(name, config) {

  // Apply default values if needed
  config.format = config.format || "combined";
  config.directory = config.directory || "./";
  config.file = config.file || "access-%DATE%.log";
  config.frequency = config.frequency || "daily";
  config.verbose = config.verbose || false;
  config.date_format = config.date_format || "YYYY-MM-DD";  // eslint-disable-line camelcase

  // Ensure log directory exists
  mkdirp.sync(config.directory);

  // Create a rotating write stream
  var accessLogStream = FileStreamRotator.getStream({
    filename: path.join(config.directory, config.file),
    frequency: config.frequency,
    verbose: config.verbose,
    date_format: config.date_format // eslint-disable-line camelcase
  });

  return morgan(config.format, {stream: accessLogStream});
};
