import ApiContext from '../../ApiContext'
import config from '../../config'
import EditSuggestionForm from './EditSuggestionForm'
import React from 'react'

class EditSuggestionPage extends React.Component {
  static contextType = ApiContext

  state = {
    suggestion: []
  }

  componentDidMount() {
    const { suggestionId } = this.props.match.params
    fetch(`${config.API_ENDPOINT}/api/suggestions/${suggestionId}`, {
      method: 'GET'
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(error => Promise.reject(error))
        }
        return res.json()
      })
      .then(suggestion => {
        this.setState({
          suggestion
        })
      })
      .catch(error => {
        console.error(error)
      })
  }

  render() {
    const { id, userid, title, date_published, content, date_modified, approved, date_approved, upvotes } = this.state.suggestion
    const suggestion = { id, userid, title, date_published, content, date_modified, approved, date_approved, upvotes }
    return (
      <section className='editSuggestionPage'>
        <header>
          <h1>Make Some Changes:</h1>
        </header>
        <EditSuggestionForm
          suggestion={suggestion}
        />
      </section>
    )
  }
}

export default EditSuggestionPage