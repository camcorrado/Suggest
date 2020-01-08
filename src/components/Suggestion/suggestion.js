import ApiContext from '../../ApiContext'
import { Link } from 'react-router-dom'
import React from 'react'

export default class Suggestion extends React.Component {
  static contextType = ApiContext

  render() {
    const { id, name, content, date_published, date_modified, approved, date_approved, upvotes } = this.props

    return (
      <div className='Suggestion'>
        <h2 className='Suggestion__title'>
          {<Link to={`/suggestion/${id}`}>
            {name}
          </Link>}
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
              <p>Last Modified: {date_modified}</p>
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
  }
}