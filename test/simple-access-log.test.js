"use strict";

var path = require("path"),
    fs = require("fs"),
    moment = require("moment"),
    request = require("supertest"),
    http = require("http"),
    clyde = require("clyde");


describe("simple-access-log", function() {

  var server;

  afterEach(function() {
    server.close();
  });


  it("should initialize filter without configuration", function() {
    var logDirectory = path.join(__dirname, "../tmp");

    var options = {
      port: 8888,
      logfile: path.join(logDirectory, "clyde.log"),
      loglevel: "info",

      prefilters: [
        {
          id: "log",
          path: path.join(__dirname, "../lib/index.js")
        }
      ],

      providers: [
        {
          id: "id",
          context: "/provider",
          target: "http://server"
        }
      ]
    };

    try {
      // Create server with clyde's middleware options
      var middleware = clyde.createMiddleware(options);
      server = http.createServer(middleware);
      server.listen(options.port);
    } catch(err) {
      throw err;
    }
  });


  it("should success storing a request access log", function(done) {
    var logDirectory = path.join(__dirname, "../tmp");

    var options = {
      port: 8888,
      logfile: path.join(logDirectory, "clyde.log"),
      loglevel: "info",

      prefilters: [
        {
          id: "log",
          path: path.join(__dirname, "../lib/index.js"),
          config: {
            directory: logDirectory,
            file: "access-log"
          }
        }
      ],

      providers: [
        {
          id: "id",
          context: "/provider",
          target: "http://server"
        }
      ]
    };

    // Create server with clyde's middleware options
    var middleware = clyde.createMiddleware(options);
    server = http.createServer(middleware);
    server.listen(options.port);

    // Make request which expects a provider not found
    request("http://localhost:8888")
      .get("/foo")
      .expect(404);

    // Check for expected log file is created
    var expectedFile = "access-log." + moment().format("YYYY-MM-DD");
    fs.exists(path.join(logDirectory, expectedFile), function(exists) {
      if (exists) {
        done();
      } else {
        throw new Error("Expected log file '" + path.join(logDirectory, expectedFile) + "' not found !!!");
      }
    });
  });


});
