import ApiContext from '../../ApiContext'
import React from 'react'
import Suggestion from '../Suggestion/Suggestion'

export default class SuggestionPage extends React.Component {
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
            title={suggestion.title}
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
            natitleme={suggestion.title}
            content={suggestion.content}
            date_published={suggestion.date_published}
            date_modified={suggestion.date_modified}
            upvotes={suggestion.upvotes}
          />
          <div id='upvoteButton'>
            <button 
              type='submit'
              onClick={e => this.handleUpvote(e, suggestionId)}
            >
              {this.state.upvoteButton}
            </button>
          </div>
        </section>   
      )
    }
  }
}