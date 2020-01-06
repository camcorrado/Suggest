import React from 'react';
import { Link } from 'react-router-dom';

class EmployeeNav extends React.Component {
    render() {
        return (
            <nav role="navigation">
                <Link to='/'>
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
    }
}

export default EmployeeNav;
