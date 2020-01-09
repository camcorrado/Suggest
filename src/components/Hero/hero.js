import { Link } from 'react-router-dom'
import React from 'react'
import SignUpForm from '../Sign-Up/SignUpForm'

class Hero extends React.Component {
  render() {
    return (
      <section className='hero'>
        <header role='banner'>
          <h1>SUGGEST</h1>
          <h2>WHAT'S ON YOUR MIND?</h2>
        </header>
        <section>
          <h3>You're Not Alone</h3>
          <p>Everyone has something they're thinking, but aren't saying. Suggest aims to bring users together to attain common goals.</p>
          <Link to='/view-suggestions'>View other people's suggestions</Link>
        </section>
        <section>
          <h3>Asking for Success</h3>
          <p>Ask, and ye shall recieve (...maybe, withing reason)</p>
          <Link to='/approved-suggestions'>View approved suggestions</Link>
        </section>
        <section>
          <h3>Sign Up!</h3>
          <SignUpForm />
        </section>
      </section>
    )
  }
}

export default Hero
