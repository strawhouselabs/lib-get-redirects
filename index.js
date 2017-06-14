const rp = require('request-promise');
const errors = require('request-promise/errors');
const Promise = require('bluebird');

function get(url, accumulator = []) {
  return rp(url, {
    resolveWithFullResponse: true,
    followRedirect: false,
  })
    .then(() => {
      // in the event of a 200, we're done.
      return [...accumulator, url];
    })
    .catch(errors.StatusCodeError, err => {
      // non-2XX are StatusCodeErrors in rp.
      const statusCode = err.response && err.response.statusCode;

      // valid redirects are 300-399, if found, recurse.
      if (statusCode && statusCode >= 300 && statusCode < 400) {
        return get(err.response.headers.location, [...accumulator, url]);
      } 
      return Promise.reject(err);
    });
}

module.exports = get;
