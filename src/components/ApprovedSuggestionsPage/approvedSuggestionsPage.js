import React from 'react';
import ApiContext from '../../ApiContext';
import Suggestion from '../Suggestion/suggestion';

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
        <ul>
          {approvedSuggestions.map(suggestion =>
            <li key={suggestion.id}>
                <Suggestion
                  id={suggestion.id}
                  name={suggestion.name}
                  content={suggestion.content}
                />
            </li>
          )}
        </ul>
      </section>
    )
  }
}
