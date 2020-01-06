import React from 'react';
import ApiContext from '../../ApiContext';
import Suggestion from '../Suggestion/suggestion';
import { Link } from 'react-router-dom';

export default class YourSuggestions extends React.Component {
    static defaultProps ={
        deleteSuggestion: () => {},
        editSuggestion: () => {}
    }
    static contextType = ApiContext;

    handleClickDelete = (e, suggestionId) => {
        e.preventDefault()
        this.context.deleteSuggestion(suggestionId)
    }
  
    render() {
        let userSuggestions = []
        for (let i = 0; i < this.context.suggestions.length; i++) {
            if (this.context.suggestions[i]["user id"] === 100) {
                userSuggestions.push(this.context.suggestions[i])
            }
        }
        return (
            <section className='UserSuggestionList'>
            <h1>Here's what you had to say:</h1>
            <ul>
                {userSuggestions.map(suggestion =>
                    <li key={suggestion.id}>
                        <Suggestion
                            id={suggestion.id}
                            name={suggestion.name}
                            content={suggestion.content}
                            date={suggestion.date}
                        />
                        {<Link to={`/edit-suggestion/${suggestion.id}`}>
                            Edit
                        </Link>}
                        <button
                            onClick={(e) => this.handleClickDelete(e, suggestion.id)}
                        >
                            Delete
                        </button>
                    </li>
                )}
            </ul>
            </section>
        )
    }
}