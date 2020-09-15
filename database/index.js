const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  name: String,
  owner: String,
  url: String,
  rank: Number,
  description: String
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repos) => {
  var reposToSave = repos.map((repo) => {
    var rank = repo.watchers + repo.stargazers_count;
    rank += repo.fork ? repo.forks : 0;
    return {
      name: repo.full_name,
      owner: repo.owner.login,
      url: repo.html_url,
      rank: rank,
      description: repo.description
    };
  });

  return Repo.insertMany(reposToSave); // <-- a promise?
}

module.exports.save = save;
