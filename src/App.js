import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import Users from './components/Users/Users';
import Search from './components/Users/Search'
import User from './components/Users/User';
import Alert from './components/Layout/Alert';
import About from './components/pages/About';
import axios from 'axios';
import './App.css';

class App extends Component {
  state = {
    users: [],
    user: {},
    repos: [],
    loading: true,
    alert: null
  };

  async componentDidMount() {
    const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
    &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    this.setState({ users: res.data, loading: false });
  }

  searchUsers = async text => {
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
    &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    this.setState({
      users: res.data.items,
      loading: false
    });
  }

  getUser = async (username) => {
      const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
      &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
      this.setState({
        user: res.data,
        loading: false
      });
  }

  getUserRepos = async(username) => {
       const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
       &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
       this.setState({
         user: res.data,
         loading: false
       });
  }

  clearUsers = () => {
    this.setState({users: [], loading: false})
  }

  setAlert = (message, type) => {
    this.setState({ alert: { message: message, type: type } })

    setTimeout(() => {
      this.setState({alert: null})
    }, 3000);
  }

  render() {
    const { users, user, loading, alert, repos } = this.state;

    return (
      <Router>
        <div className="App">
        <Navbar />
        <div className="container">
            <Alert alert={alert} />
            <Switch>
              <Route path='/' exact render={props => (
                <Fragment>
                  <Search
                    searchUsers={this.searchUsers}
                    clearUsers={this.clearUsers}
                    showClear={users.length > 0 ? true : false}
                    setAlert={this.setAlert}
                  />
                  <Users loading={loading} users={users} />
                </Fragment>
              )} />
              <Route exact path="/about" component={About} />
              <Route exact path="/user/:login"
                render={props => (
                  <User
                  {...props}
                  getUser={this.getUser} 
                  user={user} 
                  loading={loading} 
                  getUserRepos={this.getUserRepos} />)}
              />
            </Switch>
        </div>
    </div>
      </Router>
    
  );
  }
}

export default App;
