import ApiContext from '../../ApiContext'
import config from '../../config'
import { Link } from 'react-router-dom'
import React from 'react'
import ValidationError from '../ValidationError'

class EditSuggestionForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
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
    editSuggestion: () => {}
  }

  componentDidMount() {
    this.setState({
      titleChange: {
        value: this.props.suggestion.title
      },
      contentChange: {
        value: this.props.suggestion.content
      }
    })
    console.log(this.state)
  }

  handleChangeTitle = e => {
    this.setState({
      titleChange: { 
        value: e.target.value,
        touched: true
      }
    })
    console.log(this.state)
  }

  validateTitle(newTitle) {
    if (newTitle.length === 0) {
      return 'Suggestion Title is required'
    } else if (newTitle.length < 3) {
      return 'Suggestion Title must be at least 3 characters long'
    } else {
      return true
    }
  }

  handleChangeContent = e => {
    this.setState({
      contentChange: {
        value: e.target.value,
        touched: true
      }
    })
    console.log(this.state)
  }

  validateContent(newContent) {
    console.log(newContent.length)
    if (newContent.length === 0) {
      return 'Suggestion Content is required'
    } else if (newContent.length < 20) {
      return 'Suggestion Content  must be at least 20 characters long'
    } else {
      return true
    }
  }

  handleClickSubmit = e => {
    e.preventDefault()
    this.setState({
      suggestion: {
        title: this.state.titleChange.value,
        content: this.state.contentChange.value
      }
    })
    console.log(this.state)
    if (this.validateTitle(this.state.suggestion.title) === true && this.validateContent(this.state.suggestion.content) === true) {
    const { id, userid, title, content, date_published, date_modified, upvotes, approved, date_approved } = this.state.suggestion
    const newSuggestion = { id, userid, title, content, date_published, date_modified, upvotes, approved, date_approved }
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
    } else {
      document.getElementById('submitMessage').innerHTML = `<p>Please enter valid information.</p>`
    }
  }

  render() {
    const { title, content } = this.props.suggestion
    return (
      <form id='record-suggestion'>
          <div className='form-section'>
            <label htmlFor='suggestion-title'>Title</label>
            <input 
              type='text' 
              name='suggestion-title' 
              value={title} 
              onChange={this.handleChangeTitle} 
              aria-required='true'
            />
            {this.state.titleChange.touched && <ValidationError message={this.validateTitle(title)} />}
          </div>
          <div className='form-section'>
            <label htmlFor='suggestion-content'>Content</label>
            <textarea
              name='suggestion-content'
              value={content}
              onChange={this.handleChangeContent}
              rows='15'
              aria-required='true'
            ></textarea>
            {this.state.contentChange.touched && <ValidationError message={this.validateContent(content)} />}
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