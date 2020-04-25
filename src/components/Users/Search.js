import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Search = ({ showClear, clearUsers, setAlert, searchUsers }) => {
    const [text, setText] = useState('');

    const onSubmit = (e) => {
        if (text === '') {
            setAlert('Text field cannot be empty', 'danger');
        } else {
            searchUsers(text)
            setText('')
        }
        e.preventDefault();
    }

    const onChange = (e) => {
      return setText(e.target.value)
    }
    
    return (
            <div>
                <form className="form" onSubmit={onSubmit}>
                    <input
                        type="text"
                        name="text"
                        placeholder="Search Users..."
                        value={text}
                        onChange={onChange}/>
                    <input type="submit" value="Search" className="btn btn-dark btn-block" />
                </form> 
                {showClear &&
                    (<button className="btn btn-light btn-block" onClick={clearUsers}>Clear</button>)
                }
                
            </div>
        );
    
};

Search.propTypes = {
    searchUsers: PropTypes.func.isRequired,
    clearUsers: PropTypes.func.isRequired,
    showClear: PropTypes.bool.isRequired,
    setAlert: PropTypes.func.isRequired
};

export default Search;