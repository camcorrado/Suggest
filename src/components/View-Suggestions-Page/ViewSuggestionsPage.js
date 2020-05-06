import ApiContext from '../../ApiContext'
import { Link } from 'react-router-dom'
import React from 'react'
import SortByForm from '../SortByForm'
import Suggestion from '../Suggestion/Suggestion'

export default class ViewSuggestionsPage extends React.Component {
    static contextType = ApiContext

    render() {
        let unapprovedSuggestions = []
        for (let i = 0; i < this.context.suggestions.length; i++) {
            if (this.context.suggestions[i].approved === false) {
                unapprovedSuggestions.push(this.context.suggestions[i])
            }
        }
        let otherUserSuggestions = []
        for (let i = 0; i < this.context.suggestions.length; i++) {
            if (this.context.suggestions[i].userid !== 100 && this.context.suggestions[i].approved === false) {
                otherUserSuggestions.push(this.context.suggestions[i])
            }
        }
        if (this.context.suggestions.length === 0 && this.context.user === 'default') {
            return (
                <section className='suggestionsList'>
                    <h1>There are currently no suggestions!</h1>
                </section>
            )
        } else if (otherUserSuggestions.length === 0 && this.context.user === 'employee') {
            return (
                <section className='suggestionsList'>
                    <h1>There are currently no suggestions by other users!</h1>
                </section>
            )
        } else if (this.context.suggestions.length === 0 && this.context.user === 'admin') {
            return (
                <section className='suggestionsList'>
                    <h1>There are currently no suggestions!</h1>
                </section>
            )
        } else if (unapprovedSuggestions.length === 0 && this.context.suggestions.length !==0 && this.context.user === 'default') {
            return (
                <section className='suggestionsList'>
                    <h1>All suggestions have been approved!</h1>
                    <Link to='/approved-suggestions'>
                        View approved suggestions
                    </Link>
                </section>
            )
        } else if (unapprovedSuggestions.length === 0 && this.context.suggestions.length !==0 && this.context.user === 'employee') {
            return (
                <section className='suggestionsList'>
                    <h1>All suggestions have been approved!</h1>
                    <Link to='/submit-suggestions'>
                        Click here to make more suggestions!
                    </Link>
                </section>
            )
        } else if (unapprovedSuggestions.length === 0 && this.context.suggestions.length !==0 && this.context.user === 'admin') {
            return (
                <section className='suggestionsList'>
                    <h1>All suggestions have been approved!</h1>
                </section>
            )
        } else if (this.context.user === 'default') {
            return (
                <section className='suggestionsList'>
                    <h1>Here's what others had to say:</h1>
                    <SortByForm />
                    {this.context.sortBy === 'newest' &&
                        <ul>
                            {this.context.suggestions.sort((a, b) => b.id - a.id).map(suggestion =>
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
                                </li>
                            )}
                        </ul>
                    }
                    {this.context.sortBy === 'oldest' &&
                        <ul>
                            {this.context.suggestions.sort((a, b) => a.id - b.id).map(suggestion =>
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
                                </li>
                            )}
                        </ul>
                    } 
                    {this.context.sortBy === 'upvotes' && 
                        <ul>
                            {this.context.suggestions.sort((a, b) => b.upvotes - a.upvotes).map(suggestion =>
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
                                </li>
                            )}
                        </ul>
                    }
                </section>
            )
        } else if (this.context.user === 'employee') {
            return (
                <section className='suggestionsList'>
                    <h1>Here's what others had to say:</h1>
                    <SortByForm />
                    {this.context.sortBy === 'newest' &&
                        <ul>
                            {otherUserSuggestions.sort((a, b) => b.id - a.id).map(suggestion =>
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
                                </li>
                            )}
                        </ul>
                    }
                    {this.context.sortBy === 'oldest' &&
                        <ul>
                            {otherUserSuggestions.sort((a, b) => a.id - b.id).map(suggestion =>
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
                                </li>
                            )}
                        </ul>
                    } 
                    {this.context.sortBy === 'upvotes' && 
                        <ul>
                            {otherUserSuggestions.sort((a, b) => b.upvotes - a.upvotes).map(suggestion =>
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
                                </li>
                            )}
                        </ul>
                    } 
                </section>
            )
        } else {
            return (
                <section className='suggestionsList'>
                    <h1>Here's what others had to say:</h1>
                    <SortByForm />
                    {this.context.sortBy === 'newest' &&
                        <ul>
                            {unapprovedSuggestions.sort((a, b) => b.id - a.id).map(suggestion =>
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
                                </li>
                            )}
                        </ul>
                    }
                    {this.context.sortBy === 'oldest' &&
                        <ul>
                            {unapprovedSuggestions.sort((a, b) => a.id - b.id).map(suggestion =>
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
                                </li>
                            )}
                        </ul>
                    }
                    {this.context.sortBy === 'upvotes' &&
                        <ul>
                            {unapprovedSuggestions.sort((a, b) => b.upvotes - a.upvotes).map(suggestion =>
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
                                </li>
                            )}
                        </ul>
                    }
                </section>
            )
        }
    }
}