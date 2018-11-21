import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import Login from './components/login/Login';
import Dashboard from './components/dashboard/Dashboard';

class App extends Component {
  constructor() {
    super()
    this.state = {
      isloggedIn: false,
      user: null
    }

    this.getUser = this.getUser.bind(this);
  }

  componentDidMount() {
    this.getUser().then(user => {
      console.log('user is :', user);
      this.setState({user, isloggedIn: true});
    });
    console.log(this.state);
  }

  getUser() {
    return fetch('/api/current_user', {
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    })
      .then(res => {
        console.log(res);
        return res.json()
      })
      .catch(err => console.log('user not loggedIn: ', err))
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            {
              this.state.user ? <Route path="/" render={() => <Dashboard/>} />
              : <Route exact path="/" component={() => <Login />} />
            }
          </div>
        </BrowserRouter>
      </div>
    );
  }

}

export default App;
