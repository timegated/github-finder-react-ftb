import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import User from './components/Users/User';
import Alert from './components/Layout/Alert';
import About from './components/pages/About';
import Home from './components/pages/Home';
import './App.css';

// React Context API
import GithubState from './context/github/GithubState';
import AlertState from './context/alert/AlertState';

const App = () => {
  return (
    <GithubState>
      <AlertState>
    <Router>
        <div className="App">
        <Navbar />
        <div className="container">
            <Alert />
            <Switch>
                <Route path='/' exact component={Home} />
              <Route exact path="/about" component={About} />
              <Route exact path="/user/:login" component={User}/>
            </Switch>
        </div>
    </div>
      </Router> 
      </AlertState>
    </GithubState>
     
  );
}

export default App;
