const axios = require('axios');
const config = require('../config.js');

let getReposByUsername = (username) => {
  return axios({
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    },
    params: {
      sort: 'updated'
    }
  })
    .then((response) => {
      return response.data;
    })
}

module.exports.getReposByUsername = getReposByUsername;
