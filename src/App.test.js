import React from "react";
import * as ReactDOM from "react-dom/client";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import App from "./components/App/App";
import ApprovedSuggestionsPage from "./components/Approved-Suggestions-Page/ApprovedSuggestionsPage";
import Hero from "./components/Hero/Hero";
import Nav from "./components/Nav/Nav";
import SortBy from "./components/SortByForm";
import SubmitPage from "./components/Submit-Page/SubmitPage";
import SubmitForm from "./components/Submit-Page/SubmitForm";
import Suggestion from "./components/Suggestion/Suggestion";
import SuggestionPage from "./components/Suggestion-Page/SuggestionPage";
import ValidationError from "./components/ValidationError";
import ViewSuggestionsPage from "./components/View-Suggestions-Page/ViewSuggestionsPage";
import YourSuggestionsPage from "./components/SortByForm";

describe("Suggest App Components", () => {
  it("renders the App without crashing", () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
  });

  it("renders the Approved Suggestions Page without crashing", () => {
    render(
      <BrowserRouter>
        <ApprovedSuggestionsPage />
      </BrowserRouter>
    );
  });

  it("renders the Hero without crashing", () => {
    render(
      <BrowserRouter>
        <Hero />
      </BrowserRouter>
    );
  });

  it("renders the Nav without crashing", () => {
    render(
      <BrowserRouter>
        <Nav />
      </BrowserRouter>
    );
  });

  it("renders the Sort By Form without crashing", () => {
    render(<SortBy />);
  });

  it("renders the Submit Page without crashing", () => {
    render(<SubmitPage />);
  });

  it("renders the Submit Form without crashing", () => {
    render(<SubmitForm />);
  });

  it("renders the Suggestion without crashing", () => {
    render(<Suggestion />);
  });

  it("renders the Suggestion Page without crashing", () => {
    render(<SuggestionPage />);
  });

  it("renders the Validation Error without crashing", () => {
    render(<ValidationError />);
  });

  it("renders the View Suggestions Page without crashing", () => {
    render(<ViewSuggestionsPage />);
  });

  it("renders the Your Suggestions Page without crashing", () => {
    render(<YourSuggestionsPage />);
  });
});
