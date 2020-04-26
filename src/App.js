import React, { useState, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import Users from './components/Users/Users';
import Search from './components/Users/Search'
import User from './components/Users/User';
import Alert from './components/Layout/Alert';
import About from './components/pages/About';
import axios from 'axios';
import './App.css';
import GithubState from './context/github/GithubState';

const App = () => {

  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  // let [alert, setAlert] = useState(null); 


  const getUser = async (username) => {
    const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
      &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    setUser(res.data)
    setLoading(false)
  };

  const getUserRepos = async (username) => {
    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
       &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    setRepos(res.data)
    setLoading(false)
  };


  // setAlert = (message, type) => {
  //   setAlert(message, type);

  //   setTimeout(() => {
  //     setAlert(null)
  //   }, 3000);
  // };

  return (
    <GithubState>
       <Router>
        <div className="App">
        <Navbar />
        <div className="container">
            <Alert alert={alert} />
            <Switch>
              <Route path='/' exact render={props => (
                <Fragment>
                  <Search
                    showClear={users.length > 0 ? true : false}
                    // setAlert={setAlert}
                  />
                  <Users loading={loading} users={users} />
                </Fragment>
              )} />
              <Route exact path="/about" component={About} />
              <Route exact path="/user/:login"
                render={props => (
                  <User
                  {...props}
                  getUser={getUser} 
                  user={user} 
                  loading={loading}
                  repos={repos}  
                  getUserRepos={getUserRepos} />)}
              />
            </Switch>
        </div>
    </div>
      </Router> 
    </GithubState>
     
  );
}

export default App;
