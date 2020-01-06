import React from 'react';
import FeedbackForm from './feedbackForm';

class FeedbackPage extends React.Component {
    render() {
        return (
            <main role="feedback">
                <header>
                    <h1>Have a Suggestion for Us?</h1>
                </header>
                <FeedbackForm />
            </main>
        );
    }
}

export default FeedbackPage;