import ApiContext from '../../ApiContext'
import ApprovedSuggestionsPage from '../Approved-Suggestions-Page/ApprovedSuggestionsPage'
import DummySuggestions from '../../DummySuggestions'
import EditSuggestionPage from '../Edit-Suggestion-Page/EditSuggestionPage'
import Hero from '../Hero/Hero'
import Nav from '../Nav/Nav'
import React from 'react'
import { Route } from 'react-router-dom'
import SubmitPage from '../Submit-Page/SubmitPage'
import SuggestionPage from '../Suggestion-Page/SuggestionPage'
import ViewSuggestionsPage from '../View-Suggestions-Page/ViewSuggestionsPage'
import YourSuggestionsPage from '../Your-Suggestions-Page/YourSuggestionsPage.js'

class App extends React.Component {
  state = {
    suggestions: [],
    user: 'default',
    sortBy: 'newest'
  }

  componentDidMount() {
    setTimeout(() => this.setState(DummySuggestions), 600)
  }

  handleChangeUser = (newUser) => {
    this.setState({
      user: newUser
    })
  }

  handleAddSuggestion = (newSuggestion) => {
    newSuggestion.date_published = new Date().toDateString()
    console.log(newSuggestion)
    this.setState(prevState => {
        const newId = prevState.suggestions.length + 1
        newSuggestion.id = newId
        const suggestions = [ newSuggestion, ...this.state.suggestions ]
        return { suggestions }
      })
  }

  handleEditSuggestion = (suggestionId, newName, newContent, newModifiedDate) => {
    this.setState(prevState => {
      const suggestions = [...prevState.suggestions]
      const index = suggestions.findIndex(s => s.id === suggestionId)
      suggestions[index].name = newName
      suggestions[index].content = newContent
      suggestions[index].date_modified = newModifiedDate
      return { suggestions }
    })
  }

  handleDeleteSuggestion = suggestionId => {
    this.setState({
        suggestions: this.state.suggestions.filter(suggestion => suggestion.id !== suggestionId)
    })
  }

  handleApproveChange = (suggestionId, newDate) => {
    for (let i = 0; i < this.state.suggestions.length; i++) {
      if (this.state.suggestions[i].id === suggestionId) {
        this.setState(prevState => {
          const suggestions = [...prevState.suggestions]
          const index = suggestions.findIndex(s => s.id === suggestionId)
          suggestions[index].approved = true
          suggestions[index].date_approved = newDate
          return { suggestions }
        })
      }
    }
  }

  handleChangeUpvotes = (suggestionId, newUpvotes) => {
    for (let i = 0; i < this.state.suggestions.length; i++) {
      if (this.state.suggestions[i].id === suggestionId) {
        this.setState(prevState => {
          const suggestions = [...prevState.suggestions]
          const index = suggestions.findIndex(s => s.id === suggestionId)
          suggestions[index].upvotes = newUpvotes
          return { suggestions }
        })
      }
    }
  }

  handleSortByChange = (value) => {
    this.setState({
      sortBy: value
    })
  }

  render() {
    const value = {
      suggestions: this.state.suggestions,
      user: this.state.user,
      sortBy: this.state.sortBy,
      changeUser: this.handleChangeUser,
      addSuggestion: this.handleAddSuggestion,
      editSuggestion: this.handleEditSuggestion,
      deleteSuggestion: this.handleDeleteSuggestion,
      handleApprove: this.handleApproveChange,
      handleUpvote: this.handleChangeUpvotes,
      handleSortBy: this.handleSortByChange
    }

    return (
      <ApiContext.Provider value={value}>
        <main className='App'>
          <Nav />
          <Route exact path='/' component={Hero} />
          <Route path='/approved-suggestions' component={ApprovedSuggestionsPage} />
          <Route path='/edit-suggestion/:suggestionId' component={EditSuggestionPage} />
          <Route path='/demo-employee' component={YourSuggestionsPage} />
          <Route path='/demo-adminUser' component={ViewSuggestionsPage} />
          <Route path='/submit-suggestions' component={SubmitPage} />
          <Route path='/suggestion/:suggestionId' component={SuggestionPage} />
          <Route path='/view-suggestions' component={ViewSuggestionsPage} />
        </main>
      </ApiContext.Provider>
    )
  }
}

export default App