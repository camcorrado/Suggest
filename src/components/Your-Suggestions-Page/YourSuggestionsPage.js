import ApiContext from '../../ApiContext'
import config from '../../config'
import { Link } from 'react-router-dom'
import React from 'react'
import SortByForm from '../SortByForm'
import Suggestion from '../Suggestion/Suggestion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

export default class YourSuggestionsPage extends React.Component {
    static contextType = ApiContext

    static defaultProps = {
        suggestions: [],
        deleteSuggestion: () => {}
    }

    handleClickDelete(e, suggestionId) {
        e.preventDefault()
        fetch(`${config.API_ENDPOINT}/api/suggestions/${suggestionId}`, 
            {
                method: 'DELETE',
                headers: {
                    'content-type': 'application/json'
                }
            })
            .then(res => {
                if (!res.ok) {
                    throw new Error(res.status)
                }
            })
            .then(this.context.deleteSuggestion(suggestionId))
            .catch(error => {
                console.error(error)
            })
    }
    
    render() {
        let userSuggestions = []
        for (let i = 0; i < this.context.suggestions.length; i++) {
            if (this.context.suggestions[i].userid === 100) {
                userSuggestions.push(this.context.suggestions[i])
            }
        }
        if (userSuggestions.length === 0) {
            return (
                <section className='suggestionsList'>
                    <h1>You haven't made any suggestions yet!</h1>
                    <Link to='/submit-suggestions'>
                        Click here to make a suggestion!
                    </Link>
                </section>
            )
        } else {
            return (
                <section className='suggestionsList'>
                    <h1>Here's what you had to say:</h1>
                    <SortByForm />
                    {this.context.sortBy === 'newest' && 
                        <ul>
                            {userSuggestions.sort((a, b) => b.id - a.id).map(suggestion =>
                                <li key={suggestion.id}>
                                    <Suggestion
                                        id={suggestion.id}
                                        userid={suggestion.userid}
                                        title={suggestion.title}
                                        content={suggestion.content}
                                        date_published={suggestion.date_published}
                                        date_modified={suggestion.date_modified}
                                        upvotes={suggestion.upvotes}
                                        approved={suggestion.approved}
                                        date_approved={suggestion.date_approved}
                                    />
                                    {suggestion.approved === false &&
                                        <Link 
                                            to={{
                                                pathname: `/edit-suggestion/${suggestion.id}`,
                                                state: {
                                                    paramId: suggestion.id
                                                }
                                            }}
                                            id='editButton'
                                        >
                                            <FontAwesomeIcon icon={faPencilAlt} />
                                        </Link>
                                    }
                                    {suggestion.approved === false &&
                                        <button 
                                            onClick={e => this.handleClickDelete(e, suggestion.id)}
                                            id='deleteButton'  
                                        >
                                            <FontAwesomeIcon icon={faTrashAlt} />
                                        </button>
                                    }
                                    {suggestion.approved === true &&
                                        <p className='suggestionApproved'>Congratulations! This suggestion was approved!</p>
                                    }
                                </li>
                            )}
                        </ul>
                    }
                    {this.context.sortBy === 'oldest' && 
                        <ul>
                            {userSuggestions.sort((a, b) => a.id - b.id).map(suggestion =>
                                <li key={suggestion.id}>
                                    <Suggestion
                                        id={suggestion.id}
                                        userid={suggestion.userid}
                                        title={suggestion.title}
                                        content={suggestion.content}
                                        date_published={suggestion.date_published}
                                        date_modified={suggestion.date_modified}
                                        upvotes={suggestion.upvotes}
                                        approved={suggestion.approved}
                                        date_approved={suggestion.date_approved}
                                    />
                                    {suggestion.approved === false &&
                                        <Link 
                                            to={{
                                                pathname: `/edit-suggestion/${suggestion.id}`,
                                                state: {
                                                    paramId: suggestion.id
                                                }
                                            }}
                                            id='editButton'
                                        >
                                            <FontAwesomeIcon icon={faPencilAlt} />
                                        </Link>
                                    }
                                    {suggestion.approved === false &&
                                        <button 
                                            onClick={e => this.handleClickDelete(e, suggestion.id)}
                                            id='deleteButton'  
                                        >
                                            <FontAwesomeIcon icon={faTrashAlt} />
                                        </button>
                                    }
                                    {suggestion.approved === true &&
                                        <p className='suggestionApproved'>Congratulations! This suggestion was approved!</p>
                                    }
                                </li>
                            )}
                        </ul>
                    }
                    {this.context.sortBy === 'upvotes' && 
                        <ul>
                            {userSuggestions.sort((a, b) => b.upvotes - a.upvotes).map(suggestion =>
                                <li key={suggestion.id}>
                                    <Suggestion
                                        id={suggestion.id}
                                        userid={suggestion.userid}
                                        title={suggestion.title}
                                        content={suggestion.content}
                                        date_published={suggestion.date_published}
                                        date_modified={suggestion.date_modified}
                                        upvotes={suggestion.upvotes}
                                        approved={suggestion.approved}
                                        date_approved={suggestion.date_approved}
                                    />
                                    {suggestion.approved === false &&
                                        <Link 
                                            to={{
                                                pathname: `/edit-suggestion/${suggestion.id}`,
                                                state: {
                                                    paramId: suggestion.id
                                                }
                                            }}
                                            id='editButton'
                                        >
                                            <FontAwesomeIcon icon={faPencilAlt} />
                                        </Link>
                                    }
                                    {suggestion.approved === false &&
                                        <button 
                                            onClick={e => this.handleClickDelete(e, suggestion.id)}
                                            id='deleteButton'  
                                        >
                                            <FontAwesomeIcon icon={faTrashAlt} />
                                        </button>
                                    }
                                    {suggestion.approved === true &&
                                        <p className='suggestionApproved'>Congratulations! This suggestion was approved!</p>
                                    }
                                </li>
                            )}
                        </ul>
                    }
                </section>
            )
        }
    }
}