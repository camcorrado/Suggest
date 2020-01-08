import ApiContext from '../../ApiContext'
import { Link } from 'react-router-dom'
import React from 'react'
import Suggestion from '../Suggestion/Suggestion'

export default class YourSuggestionsPage extends React.Component {
  static contextType = ApiContext

  static defaultProps ={
    deleteSuggestion: () => {},
    editSuggestion: () => {}
  }

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
          {userSuggestions.sort((a, b) => b.id - a.id).map(suggestion =>
            <li key={suggestion.id}>
              <Suggestion
                id={suggestion.id}
                name={suggestion.name}
                content={suggestion.content}
                date_published={suggestion.date_published}
                date_modified={suggestion.date_modified}
                upvotes={suggestion.upvotes}
              />
              {suggestion.approved === false &&
                <Link to={`/edit-suggestion/${suggestion.id}`}>
                  Edit
                </Link>
              }
              {suggestion.approved === false &&
                <button onClick={(e) => this.handleClickDelete(e, suggestion.id)}>
                    Delete
                </button>
              }
              {suggestion.approved === true &&
                <p className='suggestionApproved'>Congratulations! This suggestion was approved!</p>
              }
            </li>
          )}
        </ul>
      </section>
    )
  }
}