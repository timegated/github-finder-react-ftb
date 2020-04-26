import React, { useState, useContext } from 'react';
import GithubContext from '../../context/github/githubContext';
import AlertContext from '../../context/alert/alertContext';

const Search = () => {
    const githubContext = useContext(GithubContext);
    const alertContext = useContext(AlertContext);
    
    const [text, setText] = useState('');

    const onSubmit = (e) => {
        if (text === '') {
            alertContext.setAlert('Search field cannot be empty', 'danger');
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
                {githubContext.users.length > 0 &&
                    (<button className="btn btn-light btn-block" onClick={githubContext.clearUsers}>Clear</button>)
                }
                
            </div>
        );
    
};

export default Search;