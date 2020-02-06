import ApiContext from '../../ApiContext'
import config from '../../config'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import React from 'react'
import ValidationError from '../ValidationError'
import { withRouter } from 'react-router'

class EditSuggestionForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      suggestion: {
        id: '',
        userid: '',
        title: '',
        content: '',
        date_published: '',
        date_modified: '',
        upvotes: '',
        approved: '',
        date_approved: ''
      },
      titleChange: {
        touched: false
      },
      contentChange: {
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

  static propTypes = {
    match: PropTypes.object.isRequired
  }

  componentDidMount() {
    fetch(`${config.API_ENDPOINT}/api/suggestions/${this.props.match.params.suggestionId}`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status)
        }
        return res.json()
      })
      .then(responseData => {
        this.setState({
          suggestion: {
            id: responseData.id,
            userid: responseData.userid,
            title: responseData.title,
            content: responseData.content,
            date_published: responseData.date_published,
            date_modified: responseData.date_modified,
            upvotes: responseData.upvotes,
            approved: responseData.approved,
            date_approved: responseData.date_approved
          }
        })
      })
      .catch(error => {
        console.error(error)
        this.setState({ error })
      })
  }

  handleChangeTitle = e => {
    this.setState({ 
      suggestion: { 
        title: e.target.value,
        date_modified: new Date().toDateString()
      },
      titleChange: {
        touched: true
      }
    })
  }

  validateTitle(newTitle) {
    console.log(newTitle)
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
      suggestion: { 
        content: e.target.value,
        date_modified: new Date().toDateString()
      },
      contentChange: {
        touched: true
      }
    })
  }

  validateContent(newContent) {
    console.log(newContent)
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
    if (this.validateTitle(this.state.suggestion.title) === true && this.validateContent(this.state.suggestion.content) === true) {
    const { suggestionId } = this.state.suggestion.id
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

  render() {
    return (
      <form id='record-suggestion'>
          <div className='form-section'>
            <label htmlFor='suggestion-title'>Title</label>
            <input 
              type='text' 
              name='suggestion-title' 
              value={this.state.suggestion.title || ''} 
              onChange={this.handleChangeTitle} 
              aria-required='true'
            />
            {this.state.titleChange.touched && <ValidationError message={this.validateTitle(this.state.suggestion.title)} />}
          </div>
          <div className='form-section'>
            <label htmlFor='suggestion-content'>Content</label>
            <textarea
              name='suggestion-content'
              value={this.state.suggestion.content || ''}
              onChange={this.handleChangeContent}
              rows='15'
              aria-required='true'
            ></textarea>
            {this.state.contentChange.touched && <ValidationError message={this.validateContent(this.state.suggestion.content)} />}
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

export default withRouter(EditSuggestionForm)