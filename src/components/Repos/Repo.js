import React from 'react'
import RepoItem from './RepoItem';
import PropTypes from 'prop-types';


const Repo = ({ repos }) => {
    return repos.map(repo => {
        return (
            <RepoItem key={repo.id} repo={repo}/>
        )
    })
}

Repo.propTypes = {
    repos: PropTypes.array.isRequired
}

export default Repo;