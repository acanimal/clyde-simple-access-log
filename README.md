# Simple Access log

A [morgan](https://github.com/expressjs/morgan) based logger which stores information into a log file for each request access.


## Configuration

Accepts the configuration properties:

* `file`: The file where to store log information.
* `directory`: The folder where to store log files.


## Examples

### Configured as global prefilter

All request to any provider will be stored:

```javascript
{
  "prefilters" : [
    {
      "id" : "logger",
      "path" : "./filters/simple-access-log",
      "config" : {
        "directory" : "./tmp/log",
        "file" : "global-access-%DATE%.log"
      }
    }
    ...
  ]
}
```

### Configured as provider prefilter

Only the requests addresses to the provider will be stored

```javascript
{
  "providers" : [
    {
      "id" : "some_provider",
      "context" : "/some_provider",
      "target" : "http://some_server",
      "prefilters" : [
        {
          "id" : "logger",
          "path" : "./filters/simple-access-log",
          "config" : {
            "directory" : "./tmp/log",
            "file" : "some_provder-access-%DATE%.log"
          }
        }
    },
    ...
  ]
}
```


## Notes:

* As a postfilter it is only invoked for success responses.

# License

The MIT License (MIT)

Copyright (c) 2015 Antonio Santiago (@acanimal)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
