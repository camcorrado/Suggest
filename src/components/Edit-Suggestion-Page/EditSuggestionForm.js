import ApiContext from '../../ApiContext'
import config from '../../config'
import { Link } from 'react-router-dom'
import React from 'react'

class EditSuggestionForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
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
    }

    this.handleChangeTitle = this.handleChangeTitle.bind(this)
    this.handleChangeContent = this.handleChangeContent.bind(this)
    this.handleClickSubmit = this.handleClickSubmit.bind(this)
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
  }

  handleChangeContent = e => {
    this.setState({ content: e.target.value })
  }

  handleChangeDateModified = e => {
    this.setState({ date_modified: new Date().toDateString() })
  }

  handleClickSubmit = e => {
    e.preventDefault()
    const { suggestionId } = this.props.match.params
    const { id, userid, title, content, date_published, date_modified, upvotes, approved, date_approved } = this.state
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
  }

  render() {
    const { title, content } = this.state
    return (
      <form id='record-suggestion'>
          <div className='form-section'>
            <label htmlFor='suggestion-title'>Suggestion Title</label>
            <input 
              type='text' 
              name='suggestion-title' 
              value={title} 
              onChange={e => this.handleChangeTitle(e.target.value), this.handleChangeDateModified()} 
              aria-required='true'
            />
          </div>
          <div className='form-section'>
            <label htmlFor='suggestion-summary'>Suggestion summary</label>
            <textarea
              name='suggestion-summary'
              value={content}
              onChange={e => this.handleChangeContent(e.target.value), this.handleChangeDateModified()}
              rows='15'
              aria-required='true'
            ></textarea>
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