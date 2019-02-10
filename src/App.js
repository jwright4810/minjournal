import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Dashboard from './components/Dashboard/Dashboard'; 
import SetGoals from './components/SetGoals/SetGoals'; 
import { icons } from './icons'; 
import './App.css';

 
const initialState = {
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    password: '',
    goalStart: '',
    goalEnd:'',
  },
  userGoals: { 
    goalOne: {
      title: '',
      desc: '',
      icon: ''
    },
    goalTwo: {
      title: '',
      desc: '',
      icon: ''
    },
    goalThree: {
      title: '',
      desc: '',
      icon: ''
    },
    goalFour: {
      title: '',
      desc: '',
      icon: ''
    },
    goalFive: {
      title: '',
      desc: '',
      icon: ''
    },
    goalSix: {
      title: '',
      desc: '',
      icon: ''
    }
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState
  }

  loadUser = (data) => {
    this.setState({  user: {
      id: data.id,
      name: data.name,
      email: data.email,
      password: data.password,
      goalStart: data.goal_start,
      goalEnd: data.goal_end,
    }})
  }

  loadGoals = (data) => {
    this.setState({userGoals: {
      goalOne: {
        title: data.goal_1,
        desc: data.goal_1_desc,
        icon: data.goal_1_icon
      },
      goalTwo: {
        title: data.goal_2,
        desc: data.goal_2_desc,
        icon: data.goal_2_icon
      },
      goalThree: {
        title: data.goal_3,
        desc: data.goal_3_desc,
        icon: data.goal_3_icon
      },
      goalFour: {
        title: data.goal_4,
        desc: data.goal_4_desc,
        icon: data.goal_4_icon
      },
      goalFive: {
        title: data.goal_5,
        desc: data.goal_5_desc,
        icon: data.goal_5_icon
      },
      goalSix: {
        title: data.goal_6,
        desc: data.goal_6_desc,
        icon: data.goal_6_icon
      }
    }})
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
    const { isSignedIn, route, user, userGoals} = this.state;
    return (
      <div className="App">
        
        { route === 'home'
            ? <div>             
              <Dashboard 
                icons={icons}
                user={user}
                userGoals={userGoals}
              />
            </div>
            : <div>
              <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
              {(
                route === 'setgoals'
                ? <div>
                     
                    <SetGoals 
                      icons={icons} 
                      loadGoals={this.loadGoals}
                      onRouteChange={this.onRouteChange}
                      user={user}
                      
                      />
                </div>
                : (
                  route === 'signin'
                  ? <Signin 
                      loadUser={this.loadUser} 
                      loadGoals={this.loadGoals}
                      onRouteChange={this.onRouteChange}
                    />
                  : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
                )
              )}
              </div>
            
            
        }
      </div>
    );
  }
}

export default App;
