import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './components/App/App'
import ApprovedSuggestionsPage from './components/Approved-Suggestions-Page/ApprovedSuggestionsPage'
import Hero from './components/Hero/Hero'
import Nav from './components/Nav/Nav'
import SortBy from './components/SortByForm'
import SubmitPage from './components/Submit-Page/SubmitPage'
import SubmitForm from './components/Submit-Page/SubmitForm'
import Suggestion from './components/Suggestion/Suggestion'
import SuggestionPage from './components/Suggestion-Page/SuggestionPage'
import ValidationError from './components/ValidationError'
import ViewSuggestionsPage from './components/View-Suggestions-Page/ViewSuggestionsPage'
import YourSuggestionsPage from './components/SortByForm'

describe('Suggest App Components', () => {
    it('renders the App without crashing', () => {
    const div = document.createElement('div')

    ReactDOM.render(
        <BrowserRouter>
            <App />
        </BrowserRouter>, 
        div)

    ReactDOM.unmountComponentAtNode(div)
    })

    it('renders the Approved Suggestions Page without crashing', () => {
        const div = document.createElement('div')
    
        ReactDOM.render(
            <BrowserRouter>
                <ApprovedSuggestionsPage />
            </BrowserRouter>, 
            div)
    
        ReactDOM.unmountComponentAtNode(div)
    })

    it('renders the Hero without crashing', () => {
        const div = document.createElement('div')
    
        ReactDOM.render(
            <BrowserRouter>
                <Hero />
            </BrowserRouter>, 
            div)
    
        ReactDOM.unmountComponentAtNode(div)
    })

    it('renders the Nav without crashing', () => {
        const div = document.createElement('div')
    
        ReactDOM.render(
            <BrowserRouter>
                <Nav />
            </BrowserRouter>, 
            div)
    
        ReactDOM.unmountComponentAtNode(div)
    })

    it('renders the Sort By Form without crashing', () => {
        const div = document.createElement('div')
    
        ReactDOM.render(
                <SortBy />, 
            div)
    
        ReactDOM.unmountComponentAtNode(div)
    })

    it('renders the Submit Page without crashing', () => {
        const div = document.createElement('div')
    
        ReactDOM.render(
                <SubmitPage />, 
            div)
    
        ReactDOM.unmountComponentAtNode(div)
    })

    it('renders the Submit Form without crashing', () => {
        const div = document.createElement('div')
    
        ReactDOM.render(
                <SubmitForm />, 
            div)
    
        ReactDOM.unmountComponentAtNode(div)
    })

    it('renders the Suggestion without crashing', () => {
        const div = document.createElement('div')
    
        ReactDOM.render(
                <Suggestion />, 
            div)
    
        ReactDOM.unmountComponentAtNode(div)
    })

    it('renders the Suggestion Page without crashing', () => {
        const div = document.createElement('div')
    
        ReactDOM.render(
                <SuggestionPage />, 
            div)
    
        ReactDOM.unmountComponentAtNode(div)
    })

    it('renders the Validation Error without crashing', () => {
        const div = document.createElement('div')
    
        ReactDOM.render(
                <ValidationError />, 
            div)
    
        ReactDOM.unmountComponentAtNode(div)
    })

    it('renders the View Suggestions Page without crashing', () => {
        const div = document.createElement('div')
    
        ReactDOM.render(
                <ViewSuggestionsPage />, 
            div)
    
        ReactDOM.unmountComponentAtNode(div)
    })

    it('renders the Your Suggestions Page without crashing', () => {
        const div = document.createElement('div')
    
        ReactDOM.render(
                <YourSuggestionsPage />, 
            div)
    
        ReactDOM.unmountComponentAtNode(div)
    })
})
