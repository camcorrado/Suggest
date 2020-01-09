import ApiContext from '../../ApiContext'
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
        'name': '',
        'content': '',
        'date_published': null,
        'date_modified': null,
        'approved': false,
        'date_approved': null,
        'upvotes': 0,
      },
      nameChange: {
        value: '',
        touched: false
      },
      contentChange: {
        value: '',
        touched: false
      }
    }

    this.updateName = this.updateName.bind(this)
    this.updateContent = this.updateContent.bind(this)
    this.validateName = this.validateName.bind(this)
    this.validateContent = this.validateContent.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  static contextType = ApiContext

  static defaultProps ={
    addSuggestion: () => {}
  }

  updateName(name) {
    this.setState({ nameChange: { value: name, touched: true } })
    this.setState(prevState => ({
      newSuggestion: {
        ...prevState.newSuggestion,
        'name': name
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

  validateName() {
    const name = this.state.nameChange.value.trim()
    if (name.length === 0) {
      return 'Suggestion Name is required'
    } else if (name.length < 3) {
      return 'Suggestion Name must be at least 3 characters long'
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
    if (this.validateName(this.state.newSuggestion.name) === true && this.validateContent(this.state.newSuggestion.content) === true) {
      this.context.addSuggestion(this.state.newSuggestion)
    } else {
      document.getElementById('submitMessage').innerHTML = `<p>Please enter valid information.</p>`
    }
  }

  render() {
    const nameError = this.validateName()
    const contentError = this.validateContent()
    return (
      <form id='record-suggestion'>
        <div className='form-section'>
          <label htmlFor='suggestion-title'>Suggestion Title</label>
          <input 
            type='text' 
            name='suggestion-title'
            placeholder='What needs change?' 
            onChange={e => this.updateName(e.target.value)} 
            aria-required='true'
          />
          {this.state.nameChange.touched && <ValidationError message={nameError} />}
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
        {this.validateName(this.state.newSuggestion.name) === true && this.validateContent(this.state.newSuggestion.content) === true ?
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