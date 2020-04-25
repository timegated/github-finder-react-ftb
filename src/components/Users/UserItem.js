import React from 'react'
import PropTypes from 'prop-types';

function UserItem({user: {login, avatar_url, html_url}}) {
        return (
            <div className="card text-center">
                <img src={avatar_url} className="round-img" alt="github user avatar" style={{ width: '60px' }} />
                <h3>{login}</h3>
                <div>
                    <a href={html_url} className="btn btn-dark btn-sm my-1" target="_blank" rel="noopener noreferrer">More</a>
                </div>
            </div>
        )
};

UserItem.propTypes = {
    user: PropTypes.object.isRequired,

};

export default UserItem;