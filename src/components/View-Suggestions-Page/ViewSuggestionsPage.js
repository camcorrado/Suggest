import React from 'react';
import ApiContext from '../../ApiContext';
import Suggestion from '../Suggestion/suggestion';

export default class ViewSuggestionsPage extends React.Component {

  static contextType = ApiContext
  
  render() {
    if (this.context.user === 'default') {
      return (
        <section className='suggestionsList'>
          <h1>Here's what other's had to say:</h1>
          <ul>
            {this.context.suggestions.map(suggestion =>
              <li key={suggestion.id}>
                  <Suggestion
                    id={suggestion.id}
                    name={suggestion.name}
                    content={suggestion.content}
                    date_published={suggestion.date_published}
                    date_modified={suggestion.date_modified}
                  />
              </li>
            )}
          </ul>
        </section>
      )
    } else if (this.context.user === 'employee') {
      return (
        <section className='suggestionsList'>
          <h1>Here's what other's had to say:</h1>
          <ul>
            {this.context.suggestions.map(suggestion =>
              <li key={suggestion.id}>
                  <Suggestion
                    id={suggestion.id}
                    name={suggestion.name}
                    content={suggestion.content}
                    date_published={suggestion.date_published}
                    date_modified={suggestion.date_modified}
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
            {unapproavedSuggestions.map(suggestion =>
              <li key={suggestion.id}>
                  <Suggestion
                    id={suggestion.id}
                    name={suggestion.name}
                    content={suggestion.content}
                    date_published={suggestion.date_published}
                    date_modified={suggestion.date_modified}
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