import ApiContext from '../../ApiContext'
import config from '../../config'
import React from 'react'

export default class Suggestion extends React.Component {
  static contextType = ApiContext

  static defaultProps = {
    handleUpvote: () => {},
    editSuggestion: () => {}
  }

  state = {
    touched: false
  }

  handleClickUpvote = (e) => {
    e.preventDefault()
    this.setState({ touched: true })
    const suggestionId = this.props.id
    const newUpvotes = this.props.upvotes + 1
    const { id, userid, title, content, date_published, date_modified, approved, date_approved } = this.props
    const newSuggestion = { 
      id: id,
      userid: userid, 
      title: title,
      content: content, 
      date_published: date_published,
      date_modified: date_modified,
      upvotes: newUpvotes,
      approved: approved,
      date_approved: date_approved
    }
    fetch(`${config.API_ENDPOINT}/api/suggestions/${suggestionId}`, {
      method: 'PATCH',
      body: JSON.stringify(newSuggestion),
      headers: {
        'content-type': 'application/json',
      },
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status)
        }
      })
      .then(() => {
        this.context.editSuggestion(newSuggestion)
      })
      .catch(error => {
        console.error(error)
      })
  }

  handleClickApprove = (e) => {
    e.preventDefault()
    const suggestionId = this.props.id
    const dateApproved = new Date().toDateString()
    const { id, userid, title, content, date_published, date_modified, upvotes } = this.props
    const newSuggestion = {
      id: id,
      userid: userid,
      title: title,
      content: content,
      date_published: date_published,
      date_modified: date_modified,
      upvotes: upvotes,
      date_approved: dateApproved,
      approved: true
    }
    fetch(`${config.API_ENDPOINT}/api/suggestions/${suggestionId}`, 
    {
      method: 'PATCH',
      body: JSON.stringify(newSuggestion),
      headers: {
        'content-type': 'application/json',
      },
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status)
        }
      })
      .then(() => {
        this.context.editSuggestion(newSuggestion)
      })
      .catch(error => {
        console.error(error)
      })
  }

  render() {
    const { userid, title, content, date_published, date_modified, approved, date_approved, upvotes } = this.props
    const suggestion = { userid, title, content, date_published, date_modified, approved, date_approved, upvotes }

    if (this.context.user === 'default') {
      return (
        <div className='Suggestion'
          suggestion={suggestion}
        >
          <h2 className='Suggestion__title'>
            {title}
          </h2>
          <div className='Suggestion__content'>
            <span className='content'>
              {content}
            </span>
          </div>
          <div className='Suggestion__dates'>
            <span className='published'>
              <p>Published: {date_published}</p>
            </span>
            {date_modified !== null &&
              <span className='modified'>
                <p>Modified: {date_modified}</p>
              </span>
            }
          </div>
          <div className='upvotes'>
            <p>Upvotes: {upvotes}</p>
          </div>
          <div className='approvedStatus'>
            {approved === true &&
              <div className='approvedInfo'>
                <span className='date_approved'>
                  <p>Date Approved: {date_approved}</p>
                </span>
              </div>
            }
          </div>
        </div>
      )
    } else if (this.context.user === 'employee') {
      return (
        <div className='Suggestion'
          suggestion={suggestion} 
        >
          <h2 className='Suggestion__title'>
            {title}
          </h2>
          <div className='Suggestion__content'>
            <span className='content'>
              {content}
            </span>
          </div>
          <div className='Suggestion__dates'>
            <span className='published'>
              <p>Published: {date_published}</p>
            </span>
            {date_modified !== null &&
              <span className='modified'>
                <p>Modified: {date_modified}</p>
              </span>
            }
          </div>
          {userid !== 100 && approved === false ? 
            <div className='upvotes'>
              <p>Upvotes: {upvotes}</p>
              <button 
                id='upvoteButton'
                type='submit'
                disabled={this.state.touched === true ? true : false}
                onClick={this.handleClickUpvote}
              >
                Upvote
              </button>
            </div> :
            <div className='upvotes'>
            <p>Upvotes: {upvotes}</p>
          </div>
          }
          <div className='approvedStatus'>
            {approved === true &&
              <div className='approvedInfo'>
                <span className='date_approved'>
                  <p>Date Approved: {date_approved}</p>
                </span>
              </div>
            }
          </div>
        </div>
      )
    } else if (this.context.user === 'admin') {
      return (
        <div className='Suggestion'
          suggestion={suggestion}
        >
          <h2 className='Suggestion__title'>
            {title}
          </h2>
          <div className='Suggestion__content'>
            <span className='content'>
              {content}
            </span>
          </div>
          <div className='Suggestion__dates'>
            <span className='published'>
              <p>Published: {date_published}</p>
            </span>
            {date_modified !== null &&
              <span className='modified'>
                <p>Modified: {date_modified}</p>
              </span>
            }
          </div>
          <div className='upvotes'>
              <p>Upvotes: {upvotes}</p>
          </div>
          <div className='approvedStatus'>
            {approved === false && 
              <button
                id='approveButton'
                type='submit'
                onClick={this.handleClickApprove}
              >
                Approve
              </button>
            }
            {approved === true &&
              <div className='approvedInfo'>
                <span className='date_approved'>
                  <p>Date Approved: {date_approved}</p>
                </span>
              </div>
            }
          </div>
        </div>
      )
    }
  }
}