import ApiContext from '../../ApiContext'
import { Link } from 'react-router-dom'
import React from 'react'

class EditSuggestionForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      title: {
        value: this.props.title
      },
      content: {
        value: this.props.content
      },
      date_modified: null
    }

    this.handleChangeTitle = this.handleChangeTitle.bind(this)
    this.handleChangeContent = this.handleChangeContent.bind(this)
    this.handleClickSubmit = this.handleClickSubmit.bind(this)
  }

  static contextType = ApiContext

  static defaultProps ={
    editSuggestion: () => {}
  }

  handleChangeTitle = e => {
    this.setState({title: {value: e}})
  }

  handleChangeContent = e => {
    this.setState({content: {value: e}})
  }

  handleClickSubmit = () => {
    const suggestionId = this.props.id
    const newTitle = this.state.title.value
    const newContent = this.state.content.value
    const newModifiedDate = new Date().toDateString()
    this.context.editSuggestion(suggestionId, newTitle, newContent, newModifiedDate)
  }

  render() {
    return (
      <form id='record-suggestion'>
          <div className='form-section'>
            <label htmlFor='suggestion-title'>Suggestion Title</label>
            <input 
              type='text' 
              name='suggestion-title' 
              value={this.state.title.value} 
              onChange={e => this.handleChangeTitle(e.target.value)} 
              aria-required='true'
            />
          </div>
          <div className='form-section'>
            <label htmlFor='suggestion-summary'>Suggestion summary</label>
            <textarea
              name='suggestion-summary'
              value={this.state.content.value}
              onChange={e => this.handleChangeContent(e.target.value)}
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