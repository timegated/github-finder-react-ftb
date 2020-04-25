import React from 'react'
import UserItem from './UserItem';
import PropTypes from 'prop-types';
import Spinner from '../Layout/Spinner';

function Users({ users, loading }) {
    if (loading) {
        return <Spinner />
    }
    else {
        return (
        <div style={userStyle}>
            {users.map(user => {
                return (
                    <UserItem key={user.id} user={user} />
                )
            })}
        </div>
    );
    }
};
Users.propTypes = {
    users: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired
}
const userStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridGap: '1rem'
};

export default Users;