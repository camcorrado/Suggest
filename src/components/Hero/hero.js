import { Link } from 'react-router-dom'
import React from 'react'

class Hero extends React.Component {
    render() {
        return (
            <section className='hero'>
                <header role='banner'>
                    <h1>Suggest</h1>
                    <h2>What's on your mind?</h2>
                </header>
                <section>
                    <h3>You're Not Alone</h3>
                    <p>Everyone has something they're thinking, but aren't saying. Suggest aims to bring users together to attain common goals.</p>
                    <Link to='/view-suggestions'>View other people's suggestions</Link>
                </section>
                <section>
                    <h3>Asking for Success</h3>
                    <p>Ask and ye shall recieve (...maybe, within reason)</p>
                    <Link to='/approved-suggestions'>View approved suggestions</Link>
                </section>
            </section>
        )
    }
}

export default Hero
