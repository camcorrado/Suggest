import ApiContext from '../../ApiContext'
import EditSuggestionForm from './EditSuggestionForm'
import React from 'react'

class EditSuggestionPage extends React.Component {
  static contextType = ApiContext

  render() {
    let suggestionId = this.props.match.params.suggestionId
    let editable = {}
    for (let i = 0; i < this.context.suggestions.length; i++) {
      if (this.context.suggestions[i]['id'].toString() === suggestionId) {
        Object.assign(editable, this.context.suggestions[i])
      }
    }

    return (
      <section className='editSuggestionPage'>
        <header>
          <h1>Make Some Changes:</h1>
        </header>
        <EditSuggestionForm
          id={editable.id}
          title={editable.title}
          content={editable.content}
        />
      </section>
    )
  }
}

export default EditSuggestionPage