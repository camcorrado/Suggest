import ApiContext from '../../ApiContext'
import React from 'react'
import Suggestion from '../Suggestion/Suggestion'

export default class SuggestionPage extends React.Component {
  constructor(props) {
    super(props)
    this.handleUpvote = this.handleUpvote.bind(this)
  }

  static contextType = ApiContext

  static defaultProps = {
    match: {
      params: {}
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.upvotes !== prevProps.upvotes) {
      this.fetchData(this.props.upvotes)
    }
  }

  handleUpvote(e, suggestionId) {
    e.preventDefault()
    for (let i = 0; i < this.context.suggestions.length; i++) {
      if (this.context.suggestions[i].id.toString() === suggestionId) {
        this.context.suggestions[i].upvotes++
        document.getElementById("upvoteButton").innerHTML = `<button type="submit" onClick={e => this.handleDownvote(e, suggestionId)}>Downvote</button>`
      }
    }
  }

  handleDownvote(e, suggestionId) {
    e.preventDefault()
    for (let i = 0; i < this.context.suggestions.length; i++) {
      if (this.context.suggestions[i].id.toString() === suggestionId) {
        this.context.suggestions[i].upvotes = this.context.suggestions[i].upvotes - 1
        document.getElementById("upvoteButton").innerHTML = `<button type="submit" onClick={e => this.handleUpvote(e, suggestionId)}>Upvote</button>`
      }
    }
  }
  
  render() {
    const suggestionId = this.props.match.params.suggestionId
    let suggestion = {}

    for (let i = 0; i < this.context.suggestions.length; i++) {
      if (this.context.suggestions[i].id.toString() === suggestionId) {
        Object.assign(suggestion, this.context.suggestions[i])
      }
    }

    if (this.context.user === 'default') {
      return (
        <section className='suggestionsId'>
          <Suggestion
            id={suggestion.id}
            name={suggestion.name}
            content={suggestion.content}
            date_published={suggestion.date_published}
            date_modified={suggestion.date_modified}
            upvotes={suggestion.upvotes}
          />
        </section>  
      )
    } else {
      return (
        <section className='SuggestionId'>
          <Suggestion
            id={suggestion.id}
            name={suggestion.name}
            content={suggestion.content}
            date_published={suggestion.date_published}
            date_modified={suggestion.date_modified}
            upvotes={suggestion.upvotes}
          />
          <div id='upvoteButton'>
            <button 
              type="submit"
              onClick={e => this.handleUpvote(e, suggestionId)}
            >
              Upvote
            </button>
          </div>
        </section>   
      )
    }
  }
}