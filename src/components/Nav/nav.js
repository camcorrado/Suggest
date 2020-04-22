import ApiContext from '../../ApiContext'
import { Link } from 'react-router-dom'
import React from 'react'

class Nav extends React.Component {
  static contextType = ApiContext
  
  static defaultProps ={
    changeUser: () => {}
  }

  handleChangeUser = (newUser) => {
    this.context.changeUser(newUser)
  }

  render() {
    if (this.context.user === 'default') {
      return (
        <nav role='navigation'>
          <Link to='/' onClick={() => {this.handleChangeUser('default')}}>
            Home
          </Link>
          <Link to='/demo-employee' onClick={() => {this.handleChangeUser('employee')}}>
            Demo (Employee)
          </Link>
          <Link to='/demo-adminUser' onClick={() => {this.handleChangeUser('admin')}}>
            Demo (Admin User)
          </Link>
        </nav>
      )
    } else if (this.context.user === 'employee') {
      return (
        <nav role='navigation'>
          <Link to='/' onClick={() => {this.handleChangeUser('default')}}>
            Home
          </Link>
          <Link to='/submit-suggestions'>
            Make A Suggestion
          </Link>
          <Link to='/demo-employee'>
            Your Suggestions
          </Link>
          <Link to='/view-suggestions'>
            Other's Suggestions
          </Link>
          <Link to='/approved-suggestions'>
            Approved Suggestions
          </Link>
        </nav>
      )
    } else if (this.context.user === 'admin') {
      return (
        <nav role='navigation'>
          <Link to='/' onClick={() => {this.handleChangeUser('default')}}>
            Home
          </Link>
          <Link to='/demo-adminUser'>
            View Suggestions
          </Link>
          <Link to='/approved-suggestions'>
            Approved Suggestions
          </Link>
        </nav>
      )
    }
  }
}

export default Nav
