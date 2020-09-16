import React from 'react';

const RepoItem = (props) => (
  <div>
    <a href={props.repo.url}>{props.repo.name}</a>
  </div>
)

export default RepoItem;
