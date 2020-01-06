import React from 'react';
import Form from './form';
import ApiContext from '../../ApiContext';

class EditSuggestion extends React.Component {

    static contextType = ApiContext;

    render() {
        let suggestionId = this.props.match.params.suggestionId
        let editable = {}
        for (let i = 0; i < this.context.suggestions.length; i++) {
            if (this.context.suggestions[i]["id"].toString() === suggestionId) {
                Object.assign(editable, this.context.suggestions[i])
            }
    }
        return (
            <main role="editSuggestionPage">
                <header>
                    <h1>Make Some Changes:</h1>
                </header>
                <Form 
                    id={editable.id}
                    name={editable.name}
                    content={editable.content}
                />
            </main>
        );
    }
}

export default EditSuggestion;