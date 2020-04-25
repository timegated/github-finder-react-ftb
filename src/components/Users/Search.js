import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Search extends Component {
    state = {
        text: ''
    }

    static propTypes = {
        searchUsers: PropTypes.func.isRequired,
        clearUsers: PropTypes.func.isRequired,
        showClear: PropTypes.bool.isRequired,
        setAlert: PropTypes.func.isRequired
    }

    onSubmit = (e) => {
        const { text } = this.state;
        if (text === '') {
            this.props.setAlert('Text field cannot be empty', 'danger');
        } else {
            this.props.searchUsers(text)
            this.setState({ text: '' })
        }
        e.preventDefault();
    }

    onChange = (e) => {
       this.setState({[e.target.name]: e.target.value})
    }
    
    render() {
        const { showClear, clearUsers } = this.props;
        return (
            <div>
                <form className="form" onSubmit={this.onSubmit}>
                    <input
                        type="text"
                        name="text"
                        placeholder="Search Users..."
                        value={this.state.text}
                        onChange={this.onChange}/>
                    <input type="submit" value="Search" className="btn btn-dark btn-block" />
                </form> 
                {showClear &&
                    (<button className="btn btn-light btn-block" onClick={clearUsers}>Clear</button>)
                }
                
            </div>
        );
    };
};

export default Search;