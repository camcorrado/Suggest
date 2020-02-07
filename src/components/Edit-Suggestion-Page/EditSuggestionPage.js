import ApiContext from '../../ApiContext'
import config from '../../config'
import EditSuggestionForm from './EditSuggestionForm'
import React from 'react'

class EditSuggestionPage extends React.Component {
  static contextType = ApiContext

  state = {
    id: null,
    title: null,
    content: null
  };

  componentDidMount() {
    const { suggestionId } = this.props.match.params
    fetch(`${config.API_ENDPOINT}/api/suggestions/${suggestionId}`, {
      method: 'GET'
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(error => Promise.reject(error))

        return res.json()
      })
      .then(responseData => {
        this.setState({
          id: responseData.id,
          title: responseData.title,
          content: responseData.content,
        })
      })
      .catch(error => {
        console.error(error)
      })
  }

  render() {
    const { id, title, content } = this.state
    return (
      <section className='editSuggestionPage'>
        <header>
          <h1>Make Some Changes:</h1>
        </header>
        <EditSuggestionForm
          id={id}
          title={title}
          content={content}
        />
      </section>
    )
  }
}

export default EditSuggestionPage