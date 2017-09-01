import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
//import { logout } from '../redux/modules/Auth/actions'
import fetch from 'isomorphic-fetch'

// views
//import Welcome from '../views/Welcome'
import Signup from '../views/Signup'
// import Login from '../views/Login'
// import NotFound from '../views/NotFound'
// import Dashboard from '../views/Dashboard'
// import Navbar from '../views/Navbar'

// custom made components
import { authenticate, authFailure } from '../redux/modules/Auth/actions'

type Props = {
  isAuthenticated: boolean,
  //logout: () => void,
  authenticate: () => void,
  authFailure: () => void
}

class App extends Component {

  props: Props

  componentDidMount() {
    const token = localStorage.getItem('token')
    if (token) {
      this.props.authenticate(token)
    } else {
      // Ping the API server in case it hasn't been used in 30 minutes and Heroku put it to sleep
      fetch('https://gentle-chamber-30614.herokuapp.com/api/v1', {'mode': 'no-cors'})
    }
  }

  render() {
    return (
      <Router>
        <div className="App">
          
          <Switch>
           
            <Route exact path="/signup" component={Signup} isAuthenticated={this.props.isAuthenticated} />
           
          </Switch>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    currentUser: state.auth.currentUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    //logout,
    authenticate,
    authFailure
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App);