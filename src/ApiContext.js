import React from 'react';

export default React.createContext({
  suggestions: [],
  user: 'default',
  changeUser: () => {},
  addSuggestion: () => {},
  editSuggestion: () => {},
  deleteSuggestion: () => {},
  approveSuggestion: () => {}
})