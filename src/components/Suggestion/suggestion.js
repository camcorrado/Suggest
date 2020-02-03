import ApiContext from '../../ApiContext'
import config from '../../config'
import React from 'react'

export default class Suggestion extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      touched: false
    }

    this.handleClickSubmitUpvote = this.handleClickSubmitUpvote.bind(this)
    this.handleClickSubmitApprove = this.handleClickSubmitApprove.bind(this)
  }

  static contextType = ApiContext

  static defaultProps ={
    handleUpvote: () => {},
    handleApprove: () => {}
  }

  handleClickSubmitUpvote = (suggestion, callback) =>{
    this.setState({ touched: true })
    const suggestionId = this.props.id
    const newUpvotes = this.props.upvotes + 1
    fetch(config.API_ENDPOINT + `/${suggestionId}`, {
      method: 'PATCH',
      body: JSON.stringify(suggestion),
      headers: {
        'content-type': 'application/json',
      },
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(error => Promise.reject(error))
      })
      .then(() => {
        callback(callback)
        this.context.handleUpvote(suggestionId, newUpvotes)
      })
      .catch(error => {
        console.error(error)
        this.setState({ error })
      })
  }

  handleClickSubmitApprove = (suggestion, callback) =>{
    const suggestionId = this.props.id
    const dateApprove = new Date().toDateString()
    fetch(config.API_ENDPOINT + `/${suggestionId}`, {
      method: 'PATCH',
      body: JSON.stringify(suggestion),
      headers: {
        'content-type': 'application/json',
      },
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(error => Promise.reject(error))
      })
      .then(() => {
        callback(callback)
        this.context.handleApprove(suggestionId, dateApprove)
      })
      .catch(error => {
        console.error(error)
        this.setState({ error })
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
                onClick={e => this.handleClickSubmitUpvote}
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
                onClick={e => this.handleClickSubmitApprove}
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