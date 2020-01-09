import React from 'react'
import ValidationError from '../ValidationError'

class SignUpForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      firstName: {
        value: '',
        touched: false
      },
      lastName: {
        value: '',
        touched: false
      },
      email: {
        value: '',
        touched: false
      },
      password: {
        value: '',
        touched: false
      },
      button: {
        value: 'Sign Up'
      }
    }

    this.updateFirstName = this.updateFirstName.bind(this)
    this.updateLastName = this.updateLastName.bind(this)
    this.updateEmail = this.updateEmail.bind(this)
    this.updatePassword = this.updatePassword.bind(this)
    this.validateFirstName = this.validateFirstName.bind(this)
    this.validateLastName = this.validateLastName.bind(this)
    this.validateEmail = this.validateEmail.bind(this)
    this.validatePassword = this.validatePassword.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  updateFirstName(name) {
    this.setState({ firstName: { value: name, touched: true } })
  }

  updateLastName(name) {
    this.setState({ lastName: { value: name, touched: true } })
  }

  updateEmail(email) {
    this.setState({ email: { value: email, touched: true } })
  }

  updatePassword(password) {
    this.setState({ password: { value: password, touched: true } })
  }

  validateFirstName() {
    const firstName = this.state.firstName.value.trim()
    if (firstName.length === 0) {
      return 'First Name is required'
    } else if (firstName.length < 2) {
      return 'First Name must be at least 2 characters long'
    } else if (!firstName.match(/^[A-Za-z]+$/)) {
      return 'Invalid characters'
    } else {
      return true
    }
  }

  validateLastName() {
    const lastName = this.state.lastName.value.trim()
    if (lastName.length === 0) {
      return 'Last Name is required'
    } else if (lastName.length < 2) {
      return 'Last Name must be at least 2 characters long'
    } else if (!lastName.match(/^[A-Za-z]+$/)) {
      return 'Invalid characters'
    } else {
      return true
    }
  }

  validateEmail() {
    const email = this.state.email.value.trim()
    if (email.length === 0) {
      return 'Email is required'
    } else if (!email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
      return 'Email invalid. Try again.'
    } else {
      return true
    }
  }

  validatePassword() {
    const password = this.state.password.value.trim()
    if (password.length === 0) {
      return 'Password is required'
    } else if (password.length < 6 || password.length > 16) {
      return 'Password must be between 6 and 16 characters long'
    } else if (!password.match(/[0-9]/)) {
      return 'Password must contain at least one number'
    } else {
      return true
    }
  }

  handleSubmit = e => {
    e.preventDefault()
    if (this.state.button.value === 'Sign Up' && this.validateEmail(this.state.email.value) === true && this.validateFirstName(this.state.firstName.value) === true && this.validateLastName(this.state.lastName.value) === true && this.validatePassword(this.state.password.value) === true) {
      this.setState({ button: { value: 'Try it again!'} })
      document.getElementById('submitMessage').innerHTML = `<p>Thank you for successfully testing out this sign up form!</p>`
    } else if (this.state.button.value === 'Try it again!') {
      this.setState({
        firstName: {
          value: '',
          touched: false
        },
        lastName: {
          value: '',
          touched: false
        },
        email: {
          value: '',
          touched: false
        },
        password: {
          value: '',
          touched: false
        },
        button: {
          value: 'Sign Up'
        }
      })
      document.getElementById('signup-form').reset()
      document.getElementById('submitMessage').innerHTML = ``
    } else {
      this.setState({ button: { value: 'Sign Up'} })
      document.getElementById('submitMessage').innerHTML = `<p>Please enter valid information.</p>`
    }
  }

  render() {
    const firstNameError = this.validateFirstName()
    const lastNameError = this.validateLastName()
    const emailError = this.validateEmail()
    const passwordError = this.validatePassword()

    return (
      <form id='signup-form'>
        <div>
          <label htmlFor='first-name'>First name</label>
          <input 
            placeholder='First Name' 
            type='text' 
            name='first-name' 
            id='first-name' 
            onChange={e => this.updateFirstName(e.target.value)} 
            aria-required='true'
          />
          {this.state.firstName.touched && <ValidationError message={firstNameError} />}
        </div>
        <div>
          <label htmlFor='last-name'>Last name</label>
          <input 
            type='text'
            name='last-name' 
            id='last-name' 
            placeholder='Last Name' 
            onChange={e => this.updateLastName(e.target.value)} 
            aria-required='true'
          />
          {this.state.lastName.touched && <ValidationError message={lastNameError} />}
        </div>
        <div>
          <label htmlFor='username'>Email</label>
          <input 
            type='text' 
            name='username'
            id='username' 
            onChange={e => this.updateEmail(e.target.value)} 
            aria-required='true' 
          />
          {this.state.email.touched && <ValidationError message={emailError} />}
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input 
            type='password' 
            name='password' 
            id='password' 
            maxLength='16' 
            onChange={e => this.updatePassword(e.target.value)} 
            aria-required='true' 
          />
          {this.state.password.touched && <ValidationError message={passwordError} />}
        </div>
        <div id='submitMessage'>
        </div>
        <button
          type='submit' 
          onClick={this.handleSubmit}
        >
          {this.state.button.value}
        </button>
      </form>     
    )
  }
}

export default SignUpForm