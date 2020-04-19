import ApiContext from '../../ApiContext'
import { Link } from 'react-router-dom'
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
    // No Suggestions as Default User
    if (this.context.suggestions.length === 0 && this.context.user === 'default') {
      return (
        <section className='suggestionsList'>
          <h1>There are currently no suggestions to be approved!</h1>
        </section>
      )
    // No Suggestions as Employee User
    } else if (this.context.suggestions.length === 0 && this.context.user === 'employee') {
      return (
        <section className='suggestionsList'>
          <h1>There are currently no suggestions to be approved!</h1>
          <Link to='/submit-suggestions'>Click here to make a suggestion!</Link>
        </section>
      )
    // No Suggestions as Admin User
    } else if (this.context.suggestions.length === 0 && this.context.user === 'admin') {
      return (
        <section className='suggestionsList'>
          <h1>There are currently no suggestions to be approved!</h1>
        </section>
      )
    // No Approved Suggestions as Default User
    } else if (approvedSuggestions.length === 0 && this.context.user === 'default') {
      return (
        <section className='suggestionsList'>
          <h1>There are currently no approved suggestions!</h1>
        </section>
      )
    // No Approved Suggestions as Employee User
    } else if (approvedSuggestions.length === 0 && this.context.user === 'employee') {
      return (
        <section className='suggestionsList'>
          <h1>There are currently no approved suggestions!</h1>
            <Link to='/submit-suggestions'>Click here to make more suggestions!</Link>
        </section>
      )
    // No Approved Suggestions as Admin User
    } else if (approvedSuggestions.length === 0 && this.context.user === 'admin') {
      return (
        <section className='suggestionsList'>
          <h1>There are currently no approved suggestions!</h1>
        </section>
      )
    // There are Approved Suggestions as Default User
    } else if (approvedSuggestions.length !== 0 && this.context.user === 'default') {
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
                      title={suggestion.title}
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
                      title={suggestion.title}
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
                      title={suggestion.title}
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
    // There are Approved Suggestions as Emlployee & Admin User
    } else {
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
                      title={suggestion.title}
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
                      title={suggestion.title}
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
                      title={suggestion.title}
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
}
