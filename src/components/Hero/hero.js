import React from 'react';
import SignUp from '../SignUp/signup';
import { Link } from 'react-router-dom';

class Hero extends React.Component {
    render() {
        return (
            <main role="hero">
                <header role="banner">
                    <h1>SUGGEST</h1>
                    <h2>WHAT'S ON YOUR MIND?</h2>
                </header>
                <section>
                    <h3>You're Not Alone</h3>
                    <p>
                        Everyone has something they're thinking, but aren't saying. Suggest aims to bring
                        users together to attain common goals.
                    </p>
                    <Link to="/view-suggestions">View other people's suggestions.</Link>
                </section>
                <section>
                    <h3>Ask For Success</h3>
                    <SignUp />
                </section>
            </main>
        )
    }
}

export default Hero;
