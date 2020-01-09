import ApiContext from '../../ApiContext'
import { Link } from 'react-router-dom'
import React from 'react'
import SignUpForm from '../Sign-Up/SignUpForm'
import SortByForm from '../SortByForm'
import Suggestion from '../Suggestion/Suggestion'

//Admin User VS when there are Approved Suggs

export default class ViewSuggestionsPage extends React.Component {

  static contextType = ApiContext

  render() {
    let unapprovedSuggestions = []
      for (let i = 0; i < this.context.suggestions.length; i++) {
        if (this.context.suggestions[i].approved === false) {
          unapprovedSuggestions.push(this.context.suggestions[i])
        }
      }
    let otherUserSuggestions = []
    for (let i = 0; i < this.context.suggestions.length; i++) {
      if (this.context.suggestions[i].userId !== 100 && this.context.suggestions[i].approved === false) {
        otherUserSuggestions.push(this.context.suggestions[i])
      }
    }
    // No Suggestions as Default User
    if (this.context.suggestions.length === 0 && this.context.user === 'default') {
      return (
        <section className='suggestionsList'>
          <h1>There are currently no suggestions!</h1>
          <SignUpForm />
        </section>
      )
    // No Suggestions as Employee User
    } else if (otherUserSuggestions.length === 0 && this.context.user === 'employee') {
      return (
        <section className='suggestionsList'>
          <h1>There are currently no suggestions by others!</h1>
        </section>
      )
    // No Suggestions as Admin User
    } else if (this.context.suggestions.length === 0 && this.context.user === 'admin') {
      return (
        <section className='suggestionsList'>
          <h1>There are currently no suggestions!</h1>
        </section>
      )
    // No Unapproved Suggestions as Default User
    } else if (unapprovedSuggestions.length === 0 && this.context.suggestions.length !==0 && this.context.user === 'default') {
        return (
          <section className='suggestionsList'>
            <h1>All suggestions have been approved!</h1>
            <SignUpForm />
          </section>
        )
    // No Unapproved Suggestions as Employee User
    } else if (unapprovedSuggestions.length === 0 && this.context.suggestions.length !==0 && this.context.user === 'employee') {
      return (
        <section className='suggestionsList'>
          <h1>All suggestions have been approved!</h1>
          <Link to='/submit-suggestions'>Click here to make more suggestions!</Link>
        </section>
      )
    // No Unapproved Suggestions as Admin User
    } else if (unapprovedSuggestions.length === 0 && this.context.suggestions.length !==0 && this.context.user === 'admin') {
      return (
        <section className='suggestionsList'>
          <h1>All suggestions have been approved!</h1>
        </section>
      )
    // Approved Suggestions as Default User
    } else if (this.context.user === 'default') {
      return (
        <section className='suggestionsList'>
          <h1>Here's what other's had to say:</h1>
          <SortByForm />
          {this.context.sortBy === 'newest' &&
            <ul>
              {this.context.suggestions.sort((a, b) => b.id - a.id).map(suggestion =>
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
              {this.context.suggestions.sort((a, b) => a.id - b.id).map(suggestion =>
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
            {this.context.suggestions.sort((a, b) => b.upvotes - a.upvotes).map(suggestion =>
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
          <SignUpForm />
        </section>
      )
    // Approved Suggestions as Employee User
    } else if (this.context.user === 'employee') {
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
    // Approved Suggestions as Admin User
    } else {
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