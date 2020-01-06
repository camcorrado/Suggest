import React from 'react';
import { Link } from 'react-router-dom';
import ApiContext from '../../ApiContext';

export default class Suggestion extends React.Component {
  static contextType = ApiContext;

  render() {
    const { id, name, content, date_published, date_modified } = this.props
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
              Published: {date_published}
            </span>
            <span className='modified'>
              Last Modified: {date_modified}
            </span>
        </div>
      </div>
    )
  }
}