import ApiContext from '../../ApiContext'
import React from 'react'
import SortByForm from '../SortByForm'
import Suggestion from '../Suggestion/Suggestion'

export default class ViewSuggestionsPage extends React.Component {

  static contextType = ApiContext

  render() {
    if (this.context.user === 'employee') {
        let otherUserSuggestions = []
        for (let i = 0; i < this.context.suggestions.length; i++) {
          if (this.context.suggestions[i].userId !== 100) {
            otherUserSuggestions.push(this.context.suggestions[i])
          }
        }
        return (
          <section className='suggestionsList'>
            <h1>Here's what other's had to say:</h1>
            <SortByForm />
            {this.context.sortBy === 'newest' &&
              <ul>
                {otherUserSuggestions.sort((a, b) => b.id - a.id).map(suggestion =>
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
                  </li>
                )}
              </ul>
            }
            {this.context.sortBy === 'oldest' &&
              <ul>
                {otherUserSuggestions.sort((a, b) => a.id - b.id).map(suggestion =>
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
                  </li>
                )}
              </ul>
            } 
            {this.context.sortBy === 'upvotes' && 
              <ul>
              {otherUserSuggestions.sort((a, b) => b.upvotes - a.upvotes).map(suggestion =>
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
                </li>
                )}
              </ul>
            } 
          </section>
        )
    } else {
      let unapprovedSuggestions = []
      for (let i = 0; i < this.context.suggestions.length; i++) {
        if (this.context.suggestions[i].approved === false) {
          unapprovedSuggestions.push(this.context.suggestions[i])
        }
      }
      return (
        <section className='suggestionsList'>
          <h1>Here's what other's had to say:</h1>
          <SortByForm />
          {this.context.sortBy === 'newest' &&
            <ul>
              {unapprovedSuggestions.sort((a, b) => b.id - a.id).map(suggestion =>
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
                </li>
              )}
            </ul>
          }
          {this.context.sortBy === 'oldest' &&
            <ul>
              {unapprovedSuggestions.sort((a, b) => a.id - b.id).map(suggestion =>
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
                </li>
              )}
            </ul>
          }
          {this.context.sortBy === 'upvotes' &&
            <ul>
              {unapprovedSuggestions.sort((a, b) => b.upvotes - a.upvotes).map(suggestion =>
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
                </li>
              )}
            </ul>
          }
        </section>
      )
    }
  }
}