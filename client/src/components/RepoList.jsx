import React from 'react';
import RepoItem from './RepoItem.jsx';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    {props.repos.map((repo) =>
      <RepoItem repo={repo} key={repo._id}/>
    )}
  </div>
)

export default RepoList;
