/**
 * @author: Jason.占友伟 zhanyouwei@icloud.com
 * Created on 16/2/29.
 */
var http = require('http');
var https = require('https');

function _getCallback(resData, callback) {
  return function (res) {
    res.setEncoding('utf8');
    res.on('data', function (data) {
      resData += data;
    });
    res.on('end', function () {
      callback(null, resData);
    });
  };
}

/**
 * get转发
 * @param {String} url
 * @param {Function} callback
 */
function get(url, isSecret, callback) {
  var resData = '';
  var req = null;

  if (isSecret) {
    req = https.get(url, _getCallback(resData, callback));
  } else {
    req = http.get(url, _getCallback(resData, callback));
  }

  req.on('error', function (e) {
    console.log("Got error: " + e.message);
    callback(e.message);
  });
}

function post(options, params, callback) {
  var postData = '';
  var req = http.request(options, function (res) {
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      postData += chunk;
    });
    res.on('end', function () {
      callback(null, postData)
    });
  });
  req.on('error', function (e) {
    console.log("Got error: " + e.message);
    callback(e.message);
  });
  req.write(params);
  req.end();
}
exports.get = get;
exports.post = post;
