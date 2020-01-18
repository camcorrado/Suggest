import ApiContext from '../../ApiContext'
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

  handleClickSubmitUpvote = e => {
    e.preventDefault()
    const suggestionId = this.props.id
    const newUpvotes = this.props.upvotes + 1
    this.context.handleUpvote(suggestionId, newUpvotes)
    this.setState({ touched: true })
  }

  handleClickSubmitApprove = e => {
    e.preventDefault()
    const suggestionId = this.props.id
    const dateApprove = new Date().toDateString()
    this.context.handleApprove(suggestionId, dateApprove)
  }

  

  render() {
    const { user, title, content, date_published, date_modified, approved, date_approved, upvotes } = this.props

    if (this.context.user === 'default') {
      return (
        <div className='Suggestion'>
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
        <div className='Suggestion'>
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
                onClick={e => this.handleClickSubmitUpvote(e)}
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
        <div className='Suggestion'>
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
                onClick={e => this.handleClickSubmitApprove(e)}
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