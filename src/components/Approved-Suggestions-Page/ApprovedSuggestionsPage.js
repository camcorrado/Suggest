import ApiContext from '../../ApiContext'
import React from 'react'
import SortByForm from '../SortByForm'
import Suggestion from '../Suggestion/Suggestion'

export default class ApprovedSuggestionsPage extends React.Component {
  static contextType = ApiContext

  render() {
    let approvedSuggestions = []
    for (let i = 0; i < this.context.suggestions.length; i++) {
      if (this.context.suggestions[i].approved === true) {
        approvedSuggestions.push(this.context.suggestions[i])
      }
    }

    return (
      <section className='approvedSuggestionsList'>
        <h1>Here's to success:</h1>
        <SortByForm />
        {this.context.sortBy === 'newest' &&
          <ul>
            {approvedSuggestions.sort((a, b) => b.id - a.id).map(suggestion =>
              <li key={suggestion.id}>
                  <Suggestion
                    id={suggestion.id}
                    name={suggestion.name}
                    content={suggestion.content}
                    date_published={suggestion.date_published}
                    date_modified={suggestion.date_modified}
                    approved={suggestion.approved}
                    date_approved={suggestion.date_approved}
                    upvotes={suggestion.upvotes}
                  />
              </li>
            )}
          </ul>
        }
        {this.context.sortBy === 'oldest' &&
          <ul>
            {approvedSuggestions.sort((a, b) => a.id - b.id).map(suggestion =>
              <li key={suggestion.id}>
                  <Suggestion
                    id={suggestion.id}
                    name={suggestion.name}
                    content={suggestion.content}
                    date_published={suggestion.date_published}
                    date_modified={suggestion.date_modified}
                    approved={suggestion.approved}
                    date_approved={suggestion.date_approved}
                    upvotes={suggestion.upvotes}
                  />
              </li>
            )}
          </ul>
        }
        {this.context.sortBy === 'upvotes' &&
          <ul>
            {approvedSuggestions.sort((a, b) => b.upvotes - a.upvotes).map(suggestion =>
              <li key={suggestion.id}>
                  <Suggestion
                    id={suggestion.id}
                    name={suggestion.name}
                    content={suggestion.content}
                    date_published={suggestion.date_published}
                    date_modified={suggestion.date_modified}
                    approved={suggestion.approved}
                    date_approved={suggestion.date_approved}
                    upvotes={suggestion.upvotes}
                  />
              </li>
            )}
          </ul>
        }
      </section>
    )
  }
}
