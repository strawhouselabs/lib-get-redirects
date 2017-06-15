lib-get-redirects
=================

A simple package for getting the list of redirects a request followed. Returns an array of redirects, sorted from your request URL to your destination URL.

Usage
-----
```js
const getRedirects = require('lib-get-redirects');
getRedirects('http://google.ca').then(list => {
  console.log(list); // ['http://google.ca', 'http://www.google.com/']
});
```