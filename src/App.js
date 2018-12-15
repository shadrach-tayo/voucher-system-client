import React, { Component } from 'react';
import { BrowserRouter, Route} from 'react-router-dom';
import './App.css';
import Login from './components/login/Login';
import Dashboard from './components/dashboard/Dashboard';
import Footer from './components/footer/Footer';

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
      if(user) {
        this.setState({user, isloggedIn: true});
      }
    });
  }

  getUser = () => {
    return fetch('api/current_user', {
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    }).then(res => {
        return res.json()
      }).catch(err => console.log('user not loggedIn: ', err))
  }

  render() {
    const currentHomeComponent = 
      this.state.user 
        ? <Route path="/" render={() => <Dashboard user={this.state.user} />} />
        : <Route exact path="/" component={() => <Login />} />
    return (
      <div>
        <BrowserRouter>
          {/* <div> */}
            {currentHomeComponent}
          {/* </div> */}
        </BrowserRouter>
        <Footer />
      </div>
    );
  }

}

export default App;
