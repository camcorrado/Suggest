import ApiContext from '../../ApiContext'
import React from 'react'
import Suggestion from '../Suggestion/Suggestion'

export default class ViewSuggestionsPage extends React.Component {
  static contextType = ApiContext
  
  render() {
    if (this.context.user === 'default') {
      return (
        <section className='suggestionsList'>
          <h1>Here's what other's had to say:</h1>
          <ul>
            {this.context.suggestions.sort((a, b) => b.id - a.id).map(suggestion =>
              <li key={suggestion.id}>
                <Suggestion
                  id={suggestion.id}
                  name={suggestion.name}
                  content={suggestion.content}
                  date_published={suggestion.date_published}
                  date_modified={suggestion.date_modified}
                  upvotes={suggestion.upvotes}
                />
              </li>
            )}
          </ul>
        </section>
      )
    } else if (this.context.user === 'employee') {
        let otherUserSuggestions = []
        for (let i = 0; i < this.context.suggestions.length; i++) {
          if (this.context.suggestions[i]["user id"] !== 100) {
            otherUserSuggestions.push(this.context.suggestions[i])
          }
        }
        return (
          <section className='suggestionsList'>
            <h1>Here's what other's had to say:</h1>
            <ul>
              {otherUserSuggestions.sort((a, b) => b.id - a.id).map(suggestion =>
                <li key={suggestion.id}>
                  <Suggestion
                    id={suggestion.id}
                    name={suggestion.name}
                    content={suggestion.content}
                    date_published={suggestion.date_published}
                    date_modified={suggestion.date_modified}
                    upvotes={suggestion.upvotes}
                  />
                  <button>Upvote</button>
                </li>
              )}
            </ul>
          </section>
        )
    } else if (this.context.user === 'admin') {
      let unapproavedSuggestions = []
      for (let i = 0; i < this.context.suggestions.length; i++) {
        if (this.context.suggestions[i].approved === false) {
          unapproavedSuggestions.push(this.context.suggestions[i])
        }
      }
      return (
        <section className='suggestionsList'>
          <h1>Here's what other's had to say:</h1>
          <ul>
            {unapproavedSuggestions.sort((a, b) => b.id - a.id).map(suggestion =>
              <li key={suggestion.id}>
                <Suggestion
                  id={suggestion.id}
                  name={suggestion.name}
                  content={suggestion.content}
                  date_published={suggestion.date_published}
                  date_modified={suggestion.date_modified}
                  upvotes={suggestion.upvotes}
                />
                <button>Approve</button>
              </li>
            )}
          </ul>
        </section>
      )
    }
  }
}