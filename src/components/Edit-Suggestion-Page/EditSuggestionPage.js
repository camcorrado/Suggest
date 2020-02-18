import ApiContext from '../../ApiContext'
import config from '../../config'
import EditSuggestionForm from './EditSuggestionForm'
import React from 'react'

class EditSuggestionPage extends React.Component {
  constructor(props) {
    super(props)

    this.handleChangeTitle = this.handleChangeTitle.bind(this)
    this.handleChangeContent = this.handleChangeContent.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  static contextType = ApiContext

  state = {
    suggestion: {}
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

  handleChangeTitle = value => {
    const { suggestion } = this.state
    let updatedSuggestion = suggestion
    updatedSuggestion.title = value
    this.setState({
      suggestion: updatedSuggestion
    })
  }

  handleChangeContent = value => {
    const { suggestion } = this.state
    let updatedSuggestion = suggestion
    updatedSuggestion.content = value
    this.setState({
      suggestion: updatedSuggestion
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    const { id, userid, title, content, date_published, date_modified, upvotes, approved, date_approved } = this.state.suggestion
    const newSuggestion = { id, userid, title, content, date_published, date_modified, upvotes, approved, date_approved }
    newSuggestion.date_modified = new Date().toDateString()
    fetch(`${config.API_ENDPOINT}/api/suggestions/${this.props.match.params.suggestionId}`, {
      method: 'PATCH',
      body: JSON.stringify(newSuggestion),
      headers: {
        'content-type': 'application/json'
      },
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(error => Promise.reject(error))
      })
      .then(() => {
        this.resetFields(newSuggestion)
        this.context.editSuggestion(newSuggestion)
      })
      .catch(error => {
        console.error(error)
        this.setState({ error })
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
          onTitleChange={this.handleChangeTitle}
          onContentChange={this.handleChangeContent}
          onSubmit={this.handleSubmit}
        />
      </section>
    )
  }
}

export default EditSuggestionPage