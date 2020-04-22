import ApiContext from '../../ApiContext'
import config from '../../config'
import EditSuggestionForm from './EditSuggestionForm'
import React from 'react'

class EditSuggestionPage extends React.Component {
  static contextType = ApiContext

  static defaultProps = {
    editSuggestion: () => {}
  }

  state = {
    id: null, 
    userid: null, 
    title: null, 
    content: null, 
    date_published: null, 
    date_modified: null, 
    upvotes: null, 
    approved: null, 
    date_approved: null
  }

  componentDidMount() {
    const { suggestionId } = this.props.match.params
    fetch(`${config.API_ENDPOINT}/api/suggestions/${suggestionId}`, 
    {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status)
        }
        return res.json()
      })
      .then(suggestion => {
        this.setState({
          id: suggestion.id, 
          userid: suggestion.userid, 
          title: suggestion.title, 
          content: suggestion.content, 
          date_published: suggestion.date_published, 
          date_modified: suggestion.date_modified, 
          upvotes: suggestion.upvotes, 
          approved: suggestion.approved, 
          date_approved: suggestion.date_approved
        })
      })
      .catch(error => {
        console.error(error)
      })
  }

  handleChangeTitle = value => {
    this.setState({
        title: value
    })
  }

  handleChangeContent = value => {
    this.setState({
        content: value
    })
  }

  handleSubmit = () => {
    const { id, userid, title, content, date_published, date_modified, upvotes, approved, date_approved } = this.state
    const newSuggestion = { id, userid, title, content, date_published, date_modified, upvotes, approved, date_approved }
    const { suggestionId } = this.props.match.params
    newSuggestion.date_modified = new Date().toDateString()
    fetch(`${config.API_ENDPOINT}/api/suggestions/${suggestionId}`, 
    {
      method: 'PATCH',
      body: JSON.stringify(newSuggestion),
      headers: {
        'content-type': 'application/json'
      },
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status)
        }
      })
      .then(() => {
        this.context.editSuggestion(newSuggestion)
        this.props.history.push('/demo-employee')
      })
      .catch(error => {
        console.error(error)
      })
  }

  render() {
    const { id, userid, title, date_published, content, date_modified, approved, date_approved, upvotes } = this.state
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