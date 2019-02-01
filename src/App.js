import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Dashboard from './components/Dashboard/Dashboard'; 
import SetGoals from './components/SetGoals/SetGoals'; 
import './App.css';

 
const initialState = {
  route: 'setgoals',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    password: '',
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState
  }


  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState)
    } else if (route === 'home') {
      this.setState({isSignedIn: true});
    }
      this.setState({route: route});
  }
  
  render() {
    const { isSignedIn, route } = this.state;
    return (
      <div className="App">
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        { route === 'home'
            ? <div>
              <Dashboard />
            </div>
            : (
                route === 'setgoals'
                ? <div>
                    <SetGoals />
                </div>
                : (
                  route === 'signin'
                  ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
                  : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
                )
              )
        }
      </div>
    );
  }
}

export default App;
