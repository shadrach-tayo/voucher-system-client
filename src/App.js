import React, { Component } from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import './App.css';
import Login from './components/login/Login';
import Dashboard from './components/dashboard/Dashboard';
// import Header from './components/header/Header';

class App extends Component {
  constructor() {
    super()
    this.state = {
      isloggedIn: false,
      user: null
    }

  }

  componentDidMount() {
    this.getUser().then(user => {
      this.setState({user, isloggedIn: true});
    });
    console.log(this.state);
  }

  getUser = () => {
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
    const cartItems = this.state.user ? this.state.user.vouchers.length : 0;
    const currentHomeComponent = 
      this.state.user 
        ? <Route path="/" render={() => <Dashboard user={this.state.user} cartItems={cartItems}/>} />
        : <Route exact path="/" component={() => <Login />} />
    return (
      <div>
        {/* <Header isloggedIn={this.state.isloggedIn} cartItems={cartItems}/> */}
        <BrowserRouter>
          <div>
            {currentHomeComponent}
          </div>
        </BrowserRouter>
      </div>
    );
  }

}

export default App;
