import ApiContext from '../../ApiContext'
import config from '../../config'
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

  handleClickDelete(suggestionId) {
    fetch(`${config.API_ENDPOINT}/api/suggestions/${suggestionId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(response => {
        if(!response.ok) {
          return response.json().then(error => {
            throw error
          })
        }
        return response.json()
      })
      .then(data => {
        this.context.deleteSuggestion(data)
      })
      .catch(error => {
        console.error(error)
      })
  }
  
  render() {
    let userSuggestions = []
    for (let i = 0; i < this.context.suggestions.length; i++) {
      if (this.context.suggestions[i].userid === 100) {
        userSuggestions.push(this.context.suggestions[i])
      }
    }
    // No Self-Submitted Suggestions as Employee User
    if (userSuggestions.length === 0) {
      return (
        <section className='suggestionsList'>
          <h1>You haven't made any suggestions yet!</h1>
          <Link to='/submit-suggestions'>Click here to make a suggestion!</Link>
        </section>
      )
    // Self-Submitted Suggestions as Employee User
    } else {
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
                  userid={suggestion.userid}
                  title={suggestion.title}
                  content={suggestion.content}
                  date_published={suggestion.date_published}
                  date_modified={suggestion.date_modified}
                  upvotes={suggestion.upvotes}
                  approved={suggestion.approved}
                  date_approved={suggestion.date_approved}
                />
                {suggestion.approved === false &&
                  <Link 
                    to={`/edit-suggestion/${suggestion.id}`} 
                    className='makeButton'
                  >
                    Edit
                  </Link>
                }
                {suggestion.approved === false &&
                  <button onClick={this.handleClickDelete(suggestion.id)}>
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
                  userid={suggestion.userid}
                  title={suggestion.title}
                  content={suggestion.content}
                  date_published={suggestion.date_published}
                  date_modified={suggestion.date_modified}
                  upvotes={suggestion.upvotes}
                  approved={suggestion.approved}
                  date_approved={suggestion.date_approved}
                />
                {suggestion.approved === false &&
                  <Link 
                    to={`/edit-suggestion/${suggestion.id}`} 
                    className='makeButton'
                  >
                    Edit
                  </Link>
                }
                {suggestion.approved === false &&
                  <button onClick={this.handleClickDelete(suggestion.id)}>
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
                  userid={suggestion.userid}
                  title={suggestion.title}
                  content={suggestion.content}
                  date_published={suggestion.date_published}
                  date_modified={suggestion.date_modified}
                  upvotes={suggestion.upvotes}
                  approved={suggestion.approved}
                  date_approved={suggestion.date_approved}
                />
                {suggestion.approved === false &&
                  <Link 
                    to={`/edit-suggestion/${suggestion.id}`} 
                    className='makeButton'
                  >
                    Edit
                  </Link>
                }
                {suggestion.approved === false &&
                  <button onClick={this.handleClickDelete(suggestion.id)}>
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
}