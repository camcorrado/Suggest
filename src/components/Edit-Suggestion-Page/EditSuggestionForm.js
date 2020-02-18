import ApiContext from '../../ApiContext'
import { Link } from 'react-router-dom'
import React from 'react'
import ValidationError from '../ValidationError'

class EditSuggestionForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      titleChange: {
        touched: false
      },
      contentChange: {
        touched: false
      }
    }

    this.onTitleChange = this.onTitleChange.bind(this)
    this.onContentChange = this.onContentChange.bind(this)
    this.handleClickSubmit = this.handleClickSubmit.bind(this)
    this.validateTitle = this.validateTitle.bind(this)
    this.validateContent = this.validateContent.bind(this)
  }

  static contextType = ApiContext

  static defaultProps = {
    editSuggestion: () => {}
  }

  onTitleChange = e => {
    this.props.onTitleChange(e.target.value)
    this.setState({
      titleChange: {
        touched: true
      }
    })
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

  onContentChange = e => {
    this.props.onContentChange(e.target.value)
    this.setState({
      contentChange: {
        touched: true
      }
    })
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
    if (this.validateTitle(this.props.suggestion.title) === true && this.validateContent(this.props.suggestion.content) === true) {
      this.props.onSubmit()
    } else {
      document.getElementById('submitMessage').innerHTML = `<p>Please enter valid information.</p>`
    }
  }

  render() {
    return (
      <form id='record-suggestion'>
          <div className='form-section'>
            <label htmlFor='suggestion-title'>Title</label>
            <input 
              type='text' 
              name='suggestion-title' 
              value={this.props.suggestion.title} 
              onChange={this.onTitleChange} 
              aria-required='true'
            />
            {this.state.titleChange.touched && <ValidationError message={this.validateTitle(this.props.suggestion.title)} />}
          </div>
          <div className='form-section'>
            <label htmlFor='suggestion-content'>Content</label>
            <textarea
              name='suggestion-content'
              value={this.props.suggestion.content}
              onChange={this.onContentChange}
              rows='15'
              aria-required='true'
            ></textarea>
            {this.state.contentChange.touched && <ValidationError message={this.validateContent(this.props.suggestion.content)} />}
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