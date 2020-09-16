const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  name: String,
  owner: String,
  url: { type: String, unique: true },
  rank: Number,
  description: String,
  updated_at: Date
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repos) => {
  var reposToSave = repos.map((repo) => {
    var rank = repo.watchers + repo.stargazers_count + (repo.forks * Number(!repo.fork));
    return {
      name: repo.full_name,
      owner: repo.owner.login,
      url: repo.html_url,
      rank: rank,
      description: repo.description,
      updated_at: repo.updated_at
    };
  });

  var createRepos = () => {
    return Repo.create(reposToSave);
  };

  return Repo.init()
  .then(createRepos);
};

let getTop25 = () => {
  return Repo.find({}).sort({ rank: -1, updated_at: -1 })
    .then((allRepos) => {
      return allRepos.slice(0, 25);
    })
};


module.exports = {
  save: save,
  getTop25: getTop25
}
