import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'

const validate = values => {
  const errors = {};

  if (!values.email) {
    
    errors.email = 'Email is required';
  } else if (values.email.length < 2) {
    errors.email = 'Email must be a minimum of 2 characters';
  }
  if (!values.password) {
    errors.password = 'Password is required';
  } else if (values.password.length < 8) {
    errors.password = 'Password must be a minimum of 8 characters';
  }

  return errors;
}

class UserForm extends Component {

  constructor(props) {
    super(props)

    this.state = {
      email: "",
      password: "",
      username: "",
      emailErrors: {},
      passwordErrors: {}
    }
  }

  handleSubmit = data => this.props.onSubmit(data)

  handleChange(event) {
    if (event.target.name === 'email') {
      this.setState({
        emailErrors: validate({email: event.target.value}),
        email: event.target.value
      })
    } else if (event.target.name === 'password') {
      this.setState({
        passwordErrors: validate({password: event.target.value}),
        password: event.target.value
      })
    }
  }

  render() {
    const {handleSubmit, errors} = this.props
    const renderedErrorsLi = errors
    let NameField;
    if (this.props.action === 'signup') {
      NameField = <div>
        <label htmlFor="username">Username (optional)</label>
        <div >
            <Field
              name="username"
              value={this.state.username}
              onChange={this.handleChange.bind(this)}
             
              component="input"
              id="username"
              type="text"
              placeholder="Username"
            /><br /><br />
          </div>
        </div>
    }
    return (
      
      <form className="uk-form-stacked" onSubmit={handleSubmit(this.handleSubmit)}>

        {errors? <ul className="uk-alert-danger">{renderedErrorsLi}</ul> : null }
        <div className="uk-margin">
          {NameField}
          <label className="uk-form-label" htmlFor="email">Email*</label>
          <div className="uk-form-controls">
              <Field
                name="email"
                value={this.state.email}
                onChange={this.handleChange.bind(this)}
                className="uk-input uk-width-medium"
                component="input"
                id="email"
                type="text"
                placeholder="Email"
              /><br />
            {!!this.state.emailErrors.email ? <small className="uk-alert-danger">{this.state.emailErrors.username}</small> : <small><font color="white">.</font></small>}
          </div>
          <label className="uk-form-label" htmlFor="password">Password*</label>
          <div className="uk-form-controls">
              <Field
                name="password"
                value={this.state.password}
                onChange={this.handleChange.bind(this)}
                className="uk-input uk-width-medium"
                component="input"
                id="password"
                type="password"
                placeholder="Password"
              /><br />
            {!!this.state.passwordErrors.password ? <small className="uk-alert-danger">{this.state.passwordErrors.password}</small> : <small><font color="white">.</font></small>}
          </div><br />
          <input type="submit" className="uk-button uk-button-default uk-position-bottom-center" value={this.props.action === "signup" ? "Create User" : "Log In"} />
        </div>
      </form>
    )
  }
}

export default reduxForm({
  form: 'user',
  validate
})(UserForm);