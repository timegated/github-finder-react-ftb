import React, { Component } from 'react';
import Navbar from './layout/Navbar/Navbar';
import Users from './components/Users/Users';
import Search from './components/Users/Search';
import Alert from './layout/Alert/Alert';
import axios from 'axios';
import './App.css';

class App extends Component {
  state = {
    users: [],
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
    const { users, loading, alert } = this.state;

    return (
    <div className="App">
        <Navbar />
        <div className="container">
          <Alert alert={alert} />
          <Search
            searchUsers={this.searchUsers}
            clearUsers={this.clearUsers}
            showClear={users.length > 0 ? true : false}
            setAlert={this.setAlert}
          />
              <Users loading={loading} users={users} />
        </div>
    </div>
  );
  }
}

export default App;
