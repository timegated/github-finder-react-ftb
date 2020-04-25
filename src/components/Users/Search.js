import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import GithubContext from '../../context/github/githubContext';
console.log('[GithubContext in Search Component]',GithubContext)
const Search = ({ showClear, clearUsers, setAlert }) => {
    
    const githubContext = useContext(GithubContext);

    const [text, setText] = useState('');

    const onSubmit = (e) => {
        if (text === '') {
            setAlert('Text field cannot be empty', 'danger');
        } else {
            githubContext.searchUsers(text);
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
    clearUsers: PropTypes.func.isRequired,
    showClear: PropTypes.bool.isRequired,
    // setAlert: PropTypes.func.isRequired
};

export default Search;