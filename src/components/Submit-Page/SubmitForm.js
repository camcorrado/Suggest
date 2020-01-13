import ApiContext from '../../ApiContext'
import config from '../../config'
import { Link } from 'react-router-dom'
import React from 'react'
import ValidationError from '../ValidationError'

class SubmitForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      newSuggestion: {
        'id': null,
        'userId': 100,
        'title': '',
        'content': '',
        'date_published': null,
        'date_modified': null,
        'approved': false,
        'date_approved': null,
        'upvotes': 0,
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

    this.updateTitle = this.updateTitle.bind(this)
    this.updateContent = this.updateContent.bind(this)
    this.validateTitle = this.validateTitle.bind(this)
    this.validateContent = this.validateContent.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  static contextType = ApiContext

  static defaultProps ={
    addSuggestion: () => {}
  }

  updateTitle(title) {
    this.setState({ titleChange: { value: title, touched: true } })
    this.setState(prevState => ({
      newSuggestion: {
        ...prevState.newSuggestion,
        'title': title
      }
    }))
  }

  updateContent(content) {
    this.setState({ contentChange: { value: content, touched: true } })
    this.setState(prevState => ({
      newSuggestion: {
        ...prevState.newSuggestion,
        'content': content
      }
    }))
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

  handleSubmit = e => {
    console.log('submit started')
    e.preventDefault()
    const suggestion = this.state.newSuggestion
    fetch(config.API_ENDPOINT, {
      method: 'POST',
      body: JSON.stringify(suggestion)
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(error => {
            throw error
          })
        }
        return res.json()
      })
      .then(data => {
        this.context.addSuggestion(data)
      })
      .catch(error => {
        this.setState({ error })
      })





    if (this.validateTitle(this.state.newSuggestion.title) === true && this.validateContent(this.state.newSuggestion.content) === true) {
      this.context.addSuggestion(this.state.newSuggestion)
    } else {
      document.getElementById('submitMessage').innerHTML = `<p>Please enter valid information.</p>`
    }
  }

  render() {
    const titleError = this.validateTitle()
    const contentError = this.validateContent()
    return (
      <form id='record-suggestion'>
        <div className='form-section'>
          <label htmlFor='suggestion-title'>Suggestion Title</label>
          <input 
            type='text' 
            name='suggestion-title'
            placeholder='What needs change?' 
            onChange={e => this.updateTitle(e.target.value)} 
            aria-required='true'
          />
          {this.state.titleChange.touched && <ValidationError message={titleError} />}
        </div>
        <div className='form-section'>
          <label htmlFor='suggestion-summary'>Suggestion summary</label>
          <textarea
            name='suggestion-summary'
            rows='15' 
            onChange={e => this.updateContent(e.target.value)} 
            aria-required='true'
          ></textarea>
          {this.state.contentChange.touched && <ValidationError message={contentError} />}
        </div>
        <div id='submitMessage'>
        </div>
        {this.validateTitle(this.state.newSuggestion.title) === true && this.validateContent(this.state.newSuggestion.content) === true ?
          <Link
            to={`/demo-employee`}
            onClick={this.handleSubmit}
            className='makeButton'
          >
            Submit
          </Link> : 
          <Link 
            to={`/submit-suggestions`} 
            onClick={this.handleSubmit}
            className='makeButton'
          >
            Submit
          </Link>
        }
        <button type='reset'>Reset</button>
      </form>        
    )
  }
}

export default SubmitForm