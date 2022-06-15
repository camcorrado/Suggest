import ApiContext from "../../ApiContext";
import ApprovedSuggestionsPage from "../Approved-Suggestions-Page/ApprovedSuggestionsPage";
import config from "../../config";
import EditSuggestionPage from "../Edit-Suggestion-Page/EditSuggestionPage";
import Hero from "../Hero/Hero";
import Nav from "../Nav/Nav";
import React from "react";
import { Route, Routes } from "react-router-dom";
import SubmitPage from "../Submit-Page/SubmitPage";
import SuggestionPage from "../Suggestion-Page/SuggestionPage";
import ViewSuggestionsPage from "../View-Suggestions-Page/ViewSuggestionsPage";
import YourSuggestionsPage from "../Your-Suggestions-Page/YourSuggestionsPage.js";

class App extends React.Component {
  state = {
    suggestions: [],
    user: "default",
    sortBy: "newest",
  };

  componentDidMount() {
    if (window.location.pathname === "/") {
      this.setState({ user: "default" });
    } else if (
      window.location.pathname === "/view-suggestions" &&
      localStorage.user === "default"
    ) {
      this.setState({ user: "default" });
    } else if (
      window.location.pathname === "/approved-suggestions" &&
      localStorage.user === "default"
    ) {
      this.setState({ user: "default" });
    } else if (
      window.location.pathname === "/demo-employee" ||
      window.location.pathname === "/submit-suggestions"
    ) {
      this.setState({ user: "employee" });
    } else if (
      window.location.pathname === "/view-suggestions" &&
      localStorage.user === "employee"
    ) {
      this.setState({ user: "employee" });
    } else if (
      window.location.pathname === "/approved-suggestions" &&
      localStorage.user === "employee"
    ) {
      this.setState({ user: "employee" });
    } else if (window.location.pathname === "/demo-adminUser") {
      this.setState({ user: "admin" });
    } else if (
      window.location.pathname === "/approved-suggestions" &&
      localStorage.user === "admin"
    ) {
      this.setState({ user: "admin" });
    }
    fetch(`${config.API_ENDPOINT}/api/suggestions`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        return res.json();
      })
      .then((data) => this.setSuggestions(data))
      .catch((error) => {
        console.error(error);
      });
  }

  setSuggestions = (suggestions) => {
    this.setState({
      suggestions,
    });
  };

  handleChangeUser = (newUser) => {
    localStorage.setItem("user", newUser);
    this.setState({
      user: localStorage.user,
    });
  };

  handleAddSuggestion = (suggestion) => {
    this.state.suggestions.push(suggestion);
  };

  handleEditSuggestion = (updatedSuggestion) => {
    const newSuggestions = this.state.suggestions.map((suggestion) =>
      suggestion.id === updatedSuggestion.id ? updatedSuggestion : suggestion
    );
    this.setState({
      suggestions: newSuggestions,
    });
  };

  handleDeleteSuggestion = (deletedSuggestionId) => {
    const newSuggestions = this.state.suggestions.filter(
      (suggestion) => suggestion.id !== deletedSuggestionId
    );
    this.setState({
      suggestions: newSuggestions,
    });
  };

  handleSortByChange = (value) => {
    this.setState({
      sortBy: value,
    });
  };

  render() {
    const value = {
      suggestions: this.state.suggestions,
      user: this.state.user,
      sortBy: this.state.sortBy,
      changeUser: this.handleChangeUser,
      addSuggestion: this.handleAddSuggestion,
      editSuggestion: this.handleEditSuggestion,
      deleteSuggestion: this.handleDeleteSuggestion,
      handleSortBy: this.handleSortByChange,
    };

    return (
      <ApiContext.Provider value={value}>
        <main className="App">
          <Nav />
          <Routes>
            <Route path="/" element={<Hero />}></Route>
            <Route
              path="/approved-suggestions"
              element={<ApprovedSuggestionsPage />}
            ></Route>
            <Route
              path="/edit-suggestions"
              element={<EditSuggestionPage />}
            ></Route>
            <Route
              path="/demo-employee"
              element={<YourSuggestionsPage />}
            ></Route>
            <Route
              path="/demo-adminUser"
              element={<ViewSuggestionsPage />}
            ></Route>
            <Route path="/submit-suggestions" element={<SubmitPage />}></Route>
            <Route
              path="/suggestion/:suggestionId"
              element={<SuggestionPage />}
            ></Route>
            <Route
              path="/view-suggestions"
              element={<ViewSuggestionsPage />}
            ></Route>
          </Routes>
        </main>
      </ApiContext.Provider>
    );
  }
}

export default App;
