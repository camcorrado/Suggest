import React from 'react'
import SubmitForm from './SubmitForm'

class SubmitPage extends React.Component {
  render() {
    return (
      <section className='submitPage'>
        <header>
          <h1>Have a Suggestion?</h1>
        </header>
        <SubmitForm />
      </section>
    )
  }
}

export default SubmitPage