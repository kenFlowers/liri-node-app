console.log('this is loaded');

var twitter = require("twitter");

var twitterKeys = new twitter ({
  consumer_key: 'IgXoyL4iTNBCuES3zPchYvSis',
  consumer_secret: 'I1vHXZfBlrJJl5UosIL0a72tGq1XZ5fFXMnvgdpENZfXUZo63q',
  access_token_key: '935893903420674048-BJR3T2SIcTTv07TXGzC666y7N7ZO1Q2',
  access_token_secret: '5tTGGrqe6dtwNK5ku8R2sER0A4Xhorp4ghJxGJD8v64hn',
});

module.exports = twitterKeys;