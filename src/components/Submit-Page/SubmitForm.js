import ApiContext from '../../ApiContext'
import config from '../../config'
import React from 'react'
import ValidationError from '../ValidationError'

class SubmitForm extends React.Component {
  static contextType = ApiContext

  static defaultProps ={
    addSuggestion: () => {}
  }

  state = {
    newSuggestion: {
      userid: 100,
      title: '',
      content: '',
      date_published: new Date().toDateString(),
      date_modified: null,
      approved: false,
      date_approved: null,
      upvotes: 0,
    },
    titleChange: {
      touched: false
    },
    contentChange: {
      touched: false
    }
  }

  onTitleChange = async (value) => {
    this.setState({ titleChange: { touched: true } })
    await this.setState(prevState => ({
      newSuggestion: {
        ...prevState.newSuggestion,
        title: value
      }
    }))
    this.removeValidInfoPrompt()
  }

  validateTitle(value) {
    if (value.length === 0) {
      return 'Title is required'
    } else if (value.length < 3) {
      return 'Title must be at least 3 characters long'
    } else {
      return true
    }
  }

  onContentChange = async (value) => {
    this.setState({ contentChange: { touched: true } })
    await this.setState(prevState => ({
      newSuggestion: {
        ...prevState.newSuggestion,
        content: value
      }
    }))
    this.removeValidInfoPrompt()
  }

  validateContent(value) {
    if (value.length === 0) {
      return 'Content is required'
    } else if (value.length < 20) {
      return 'Content  must be at least 20 characters long'
    } else {
      return true
    }
  }

  removeValidInfoPrompt() {
    if (this.state.newSuggestion.title.length >= 3 && this.state.newSuggestion.content.length >= 20) {
      document.getElementById('submitMessage').innerHTML = ``
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    if (this.validateTitle(this.state.newSuggestion.title) === true && this.validateContent(this.state.newSuggestion.content) === true) {
      const suggestion = this.state.newSuggestion
      fetch(`${config.API_ENDPOINT}/api/suggestions`, {
        method: 'POST',
        body: JSON.stringify(suggestion),
        headers: {
          'content-type': 'application/json'
        }
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
          this.props.onSubmit()
        })
        .catch(error => {
          console.error(error)
        })
    } else {
      document.getElementById('submitMessage').innerHTML = `<p>Please enter valid information.</p>`
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className='form-section'>
          <label htmlFor='suggestion-title'>Title</label>
          <input 
            id='title'
            type='text' 
            name='title'
            placeholder='What needs change?'
            onChange={e => this.onTitleChange(e.target.value)} 
            aria-label='Enter a title for your Suggestion'
            aria-required='true'
            aria-describedby='suggestionTitleFeedback'
          />
          {this.state.titleChange.touched && <ValidationError message={this.validateTitle(this.state.newSuggestion.title)} />}
        </div>
        <div className='form-section'>
          <label htmlFor='suggestion-content'>Content</label>
          <textarea
            id='content'
            type='text'
            name='content'
            placeholder='Go into detail...'
            rows='15' 
            onChange={e => this.onContentChange(e.target.value)} 
            aria-label='Enter content for your Suggestion'
            aria-required='true'
            aria-describedby='suggestionContentFeedback'
          ></textarea>
          {this.state.contentChange.touched && <ValidationError message={this.validateContent(this.state.newSuggestion.content)} />}
        </div>
        <div id='submitMessage'></div>
        <button onClick={this.handleSubmit}>
          Submit
        </button>
        <button type='reset'>Reset</button>
      </form>        
    )
  }
}

export default SubmitForm