import React from 'react'
import SubmitForm from './SubmitForm'

class SubmitPage extends React.Component {
    handleSubmit = () => {
            this.props.history.push('/demo-employee')
    }

    render() {
        return (
            <section className='submitPage'>
                <header>
                    <h1>Have a Suggestion?</h1>
                </header>
                <SubmitForm onSubmit={this.handleSubmit}/>
            </section>
        )
    }
}

export default SubmitPage