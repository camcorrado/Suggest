import React from 'react'
import Suggestion from '../Suggestion/suggestion'
import ApiContext from '../../ApiContext';

export default class SuggestionPage extends React.Component {
    static defaultProps = {
      match: {
        params: {}
      }
    }

    static contextType = ApiContext
  
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
            />
            <form id="comment-on-suggestion">
              <div class="form-section">
                  <label for="comment">Comment</label>
                  <textarea name="comment" rows="15"   required></textarea>
              </div>
              <button type="submit">Submit</button>
              <button type="reset">Reset</button>
          </form> 
          </section>   
        )
      }
      
    }
  }