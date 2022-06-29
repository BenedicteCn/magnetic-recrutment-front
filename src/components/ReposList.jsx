import React from 'react';

function ReposList({ pinnedRepos }) {
  console.log('repo', pinnedRepos);
  return (
    <div>
      <ul>
        {pinnedRepos.slice(0, 11).map((repo) => {
          return (
            <>
              <h4>Repo Names</h4>
              <li className="list-git-repo" key={repo.id}>
                <a href={repo.html_url}> {repo.name}</a>
                <p className="repo-language">
                  {' '}
                  Language used: {repo.language}{' '}
                </p>
              </li>
            </>
          );
        })}
      </ul>
    </div>
  );
}

export default ReposList;
