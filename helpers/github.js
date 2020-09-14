const axios = require('axios');
const config = require('../config.js');

let getReposByUsername = (username) => {
  let options = {
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    },
    params: {
      sort: 'updated'
    }
  };

  return axios.get(options); // returning a promise?
}

module.exports.getReposByUsername = getReposByUsername;
