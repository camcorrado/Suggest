import ApiContext from '../../ApiContext'
import React, { Component } from 'react'
import ValidationError from '../ValidationError'

export default class EditNoteForm extends Component {
    static contextType = ApiContext

    state = {
        titleChange: {
            touched: false
        },
        contentChange: {
            touched: false
        }
    }

    onTitleChange = async (e) => {
        this.setState({ titleChange: { touched: true } })
        await this.props.onTitleChange(e.target.value)
        this.removeValidInfoPrompt()
    }

    validateTitle(value) {
        if (value.length === 0) {
            return 'Title is required'
        } else if (value.length < 3) {
            return 'Title must be at least 3 characters long'
        } else {
            return true
        }
    }

    onContentChange = async (e) => {
        this.setState({ contentChange: { touched: true } })
        await this.props.onContentChange(e.target.value)
        this.removeValidInfoPrompt()
    }

    validateContent(value) {
        if (value.length === 0) {
            return 'Content is required'
        } else if (value.length < 20) {
            return 'Content  must be at least 20 characters long'
        } else {
            return true
        }
    }

    removeValidInfoPrompt() {
        if (this.props.suggestion.title.length >= 3 && this.props.suggestion.content.length >= 20) {
            document.getElementById('submitMessage').innerHTML = ``
        }
    }

    handleClickSubmit = e => {
        e.preventDefault()
        if (this.validateTitle(this.props.suggestion.title) === true && this.validateContent(this.props.suggestion.content) === true) {
            this.props.onSubmit()
        } else {
            document.getElementById('submitMessage').innerHTML = `<p>Please enter valid information.</p>`
        }
    }

    handleClickCancel = e => {
        e.preventDefault()
        this.props.onCancel()
    }

    render() {
        const { title, content } = this.props.suggestion
        return (
            <section className='EditSuggestionForm'>
                <form onSubmit={this.handleSubmit}>
                    <div className='formSection'>
                        <label htmlFor='suggestionTitle'>Title</label>
                        <input 
                            id='title'
                            type='text' 
                            name='title' 
                            placeholder={title || ''}
                            required
                            value={title || ''} 
                            onChange={this.onTitleChange} 
                            aria-required='true'
                        />
                        {this.state.titleChange.touched && <ValidationError message={this.validateTitle(this.props.suggestion.title)} />}
                    </div>
                    <div className='formSection'>
                        <label htmlFor='suggestionContent'>Content</label>
                        <textarea
                            id='content'
                            name='content'
                            type='text'
                            placeholder={content || ''}
                            required
                            value={content || ''}
                            onChange={this.onContentChange}
                            rows='15'
                            aria-required='true'
                        ></textarea>
                        {this.state.contentChange.touched && <ValidationError message={this.validateContent(this.props.suggestion.content)} />}
                    </div>
                    <div id='submitMessage'></div>
                    <button onClick={this.handleClickSubmit}>
                        Submit
                    </button>
                    <button onClick={this.handleClickCancel}>
                        Cancel
                    </button>
                </form>        
            </section>
        )
    }
}