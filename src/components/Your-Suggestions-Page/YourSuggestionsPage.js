import ApiContext from '../../ApiContext'
import { Link } from 'react-router-dom'
import React from 'react'
import SortByForm from '../SortByForm'
import Suggestion from '../Suggestion/Suggestion'

export default class YourSuggestionsPage extends React.Component {
  constructor(props) {
    super(props)

    this.handleClickDelete = this.handleClickDelete.bind(this);
  }

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
      if (this.context.suggestions[i].userId === 100) {
        userSuggestions.push(this.context.suggestions[i])
      }
    }

    return (
      <section className='suggestionsList'>
        <h1>Here's what you had to say:</h1>
        <SortByForm />
        {this.context.sortBy === 'newest' && 
          <ul>
          {userSuggestions.sort((a, b) => b.id - a.id).map(suggestion =>
            <li key={suggestion.id}>
              <Suggestion
                id={suggestion.id}
                userId={suggestion.userId}
                name={suggestion.name}
                content={suggestion.content}
                date_published={suggestion.date_published}
                date_modified={suggestion.date_modified}
                upvotes={suggestion.upvotes}
                approved={suggestion.approved}
                date_approved={suggestion.date_approved}
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
        }
        {this.context.sortBy === 'oldest' && 
          <ul>
          {userSuggestions.sort((a, b) => a.id - b.id).map(suggestion =>
            <li key={suggestion.id}>
              <Suggestion
                id={suggestion.id}
                userId={suggestion.userId}
                name={suggestion.name}
                content={suggestion.content}
                date_published={suggestion.date_published}
                date_modified={suggestion.date_modified}
                upvotes={suggestion.upvotes}
                approved={suggestion.approved}
                date_approved={suggestion.date_approved}
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
        }
        {this.context.sortBy === 'upvotes' && 
          <ul>
          {userSuggestions.sort((a, b) => b.upvotes - a.upvotes).map(suggestion =>
            <li key={suggestion.id}>
              <Suggestion
                id={suggestion.id}
                userId={suggestion.userId}
                name={suggestion.name}
                content={suggestion.content}
                date_published={suggestion.date_published}
                date_modified={suggestion.date_modified}
                upvotes={suggestion.upvotes}
                approved={suggestion.approved}
                date_approved={suggestion.date_approved}
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
        }
      </section>
    )
  }
}