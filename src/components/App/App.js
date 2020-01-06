import React from 'react';
import { Route } from 'react-router-dom';
import Hero from '../Hero/hero';
import dummySuggestions from '../../dummy-suggestions';
import ApiContext from '../../ApiContext';
import ViewSuggestionsPage from '../View-Suggestions-Page/ViewSuggestionsPage';
import FeedbackPage from '../Feedback-Page/feedback';
import SubmitPage from '../Submit-Page/Submit-Page';
import SuggestionPage from '../Suggestion-Page/SuggestionPage';
import YourSuggestions from '../Your-Suggestions-Page/yourSuggestions.js';
import ApprovedSuggestionsPage from '../ApprovedSuggestionsPage/approvedSuggestionsPage';
import EditSuggestion from '../Edit-Suggestion-Page/editSuggestion';
import Nav from '../Nav/nav'

class App extends React.Component {
  state = {
    suggestions: [],
    user: 'default'
  };

  componentDidMount() {
    // fake date loading from API call
    setTimeout(() => this.setState(dummySuggestions), 600);
  }

  handleDeleteSuggestion = suggestionId => {
    this.setState({
        suggestions: this.state.suggestions.filter(suggestion => suggestion.id !== suggestionId)
    });
  }

  handleEditSuggestion = (suggestionId, newName, newContent) => {
    this.setState(prevState => {
      const suggestions = [...prevState.suggestions]
      const index = suggestions.findIndex(s => s.id === suggestionId)
      suggestions[index].name = newName
      suggestions[index].content = newContent
      return { suggestions }
    })
  }

  handleChangeUser = (newUser) => {
    this.setState({
      user: newUser
    })
  }

  render() {
    const value = {
      suggestions: this.state.suggestions,
      user: this.state.user,
      changeUser: this.handleChangeUser,
      editSuggestion: this.handleEditSuggestion,
      deleteSuggestion: this.handleDeleteSuggestion
    };
    return (
      <ApiContext.Provider value={value}>
        <main className='App'>
          <Nav />
          <Route exact path="/" component={Hero} />
          <Route path="/demo-employee" component={YourSuggestions} />
          <Route path="/demo-adminUser" component={ViewSuggestionsPage} />
          <Route path="/approved-suggestions" component={ApprovedSuggestionsPage} />
          <Route path="/view-suggestions" component={ViewSuggestionsPage} />
          <Route path="/suggestion/:suggestionId" component={SuggestionPage} />
          <Route path="/submit-suggestions" component={SubmitPage} />
          <Route path="/feedback" component={FeedbackPage} />
          <Route path="/edit-suggestion/:suggestionId" component={EditSuggestion} />
        </main>
      </ApiContext.Provider>

    );
  }
}

export default App;