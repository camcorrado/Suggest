import ApiContext from '../../ApiContext'
import config from '../../config'
import { Link } from 'react-router-dom'
import React from 'react'
import ValidationError from '../ValidationError'

class EditSuggestionForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      suggestion: {
        id: this.props.id,
      userid: this.props.userid,
      title: {
        value: this.props.title
      },
      content: {
        value: this.props.content
      },
      date_published: this.props.date_published,
      date_modified: null,
      upvotes: this.props.upvotes,
      approved: this.props.approved,
      date_approved: this.props.date_approved
      },
      titleChange: {
        value: '',
        touched: false
      },
      contentChange: {
        value: '',
        touched: false
      }
    }

    this.handleChangeTitle = this.handleChangeTitle.bind(this)
    this.handleChangeContent = this.handleChangeContent.bind(this)
    this.handleClickSubmit = this.handleClickSubmit.bind(this)
    this.validateTitle = this.validateTitle.bind(this)
    this.validateContent = this.validateContent.bind(this)
  }

  static contextType = ApiContext

  static defaultProps ={
    editSuggestion: () => {},
    match: {
      params: {}
    }
  }

  componentDidMount() {
    const { suggestionId } = this.props.match.params
    fetch(config.API_ENDPOINT + `/${suggestionId}`, {
      method: 'GET'
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(error => Promise.reject(error))
        return res.json()
      })
      .then(responseData => {
        this.setState({
          title: responseData.title,
          content: responseData.content,
          date_modified: responseData.date_modified
        })
      })
      .catch(error => {
        console.error(error)
        this.setState({ error })
      })
  }

  handleChangeTitle = e => {
    this.setState({ title: e.target.value })
    this.setState({ date_modified: new Date().toDateString() })
  }

  handleChangeContent = e => {
    this.setState({ content: e.target.value })
    this.setState({ date_modified: new Date().toDateString() })
  }

  handleClickSubmit = e => {
    e.preventDefault()
    if (this.validateTitle(this.state.suggestion.title) === true && this.validateContent(this.state.suggestion.content) === true) {
    const { suggestionId } = this.props.match.params
    const { id, userid, title, content, date_published, date_modified, upvotes, approved, date_approved } = this.state.suggestion
    const newSuggestion = { id, userid, title, content, date_published, date_modified, upvotes, approved, date_approved }
    fetch(config.API_ENDPOINT + `/${suggestionId}`, {
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
    } else {
      document.getElementById('submitMessage').innerHTML = `<p>Please enter valid information.</p>`
    }
  }

  validateTitle() {
    const title = this.state.titleChange.value.trim()
    if (title.length === 0) {
      return 'Suggestion Title is required'
    } else if (title.length < 3) {
      return 'Suggestion Title must be at least 3 characters long'
    } else {
      return true
    }
  }

  validateContent() {
    const content = this.state.contentChange.value.trim()
    if (content.length === 0) {
      return 'Suggestion Content is required'
    } else if (content.length < 20) {
      return 'Suggestion Content  must be at least 20 characters long'
    } else {
      return true
    }
  }

  render() {
    const { title, content } = this.state.suggestion
    const titleError = this.validateTitle()
    const contentError = this.validateContent()
    return (
      <form id='record-suggestion'>
          <div className='form-section'>
            <label htmlFor='suggestion-title'>Suggestion Title</label>
            <input 
              type='text' 
              name='suggestion-title' 
              value={title} 
              onChange={e => this.handleChangeTitle(e.target.value)} 
              aria-required='true'
            />
            {this.state.titleChange.touched && <ValidationError message={titleError} />}
          </div>
          <div className='form-section'>
            <label htmlFor='suggestion-summary'>Suggestion summary</label>
            <textarea
              name='suggestion-summary'
              value={content}
              onChange={e => this.handleChangeContent(e.target.value)}
              rows='15'
              aria-required='true'
            ></textarea>
            {this.state.contentChange.touched && <ValidationError message={contentError} />}
          </div>
          <Link
            to={`/demo-employee`}
            onClick={this.handleClickSubmit}
            className='makeButton'
          >
            Submit
          </Link>
          <Link 
            to={`/demo-employee`}
            className='makeButton'
          >
            Cancel
          </Link>
      </form>        
    )
  }
}

export default EditSuggestionForm