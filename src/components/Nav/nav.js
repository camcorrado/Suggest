import React from 'react';
import { Link } from 'react-router-dom';
import ApiContext from '../../ApiContext';

class Nav extends React.Component {
    constructor(props) {
        super(props)
        this.handleChangeUser = this.handleChangeUser.bind(this)
    }

    static defaultProps ={
        changeUser: () => {}
    }

    static contextType = ApiContext;

    handleChangeUser = (newUser) => {
        this.context.changeUser(newUser)
    }

    render() {
        if (this.context.user === 'default') {
            return (
                <nav role="navigation">
                    <Link to='/'>
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
                <nav role="navigation">
                    <Link to='/' onClick={() => {this.handleChangeUser('default')}}>
                        Home
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
                    <Link to='/feedback'>
                        Feedback
                    </Link>
                </nav>
            )
        } else if (this.context.user === 'admin') {
            return (
                <nav role="navigation">
                    <Link to='/' onClick={() => {this.handleChangeUser('default')}}>
                        Home
                    </Link>
                    <Link to='/demo-adminUser'>
                        View Suggestions
                    </Link>
                    <Link to='/approved-suggestions'>
                        Approved Suggestions
                    </Link>
                    <Link to='/feedback'>
                        Feedback
                    </Link>
                </nav>
            )
        }
    }
}

export default Nav;
