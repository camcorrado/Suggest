import React from 'react'

export default React.createContext({
    suggestions: [],
    user: 'default',
    sortBy: 'newest',
    changeUser: () => {},
    addSuggestion: () => {},
    editSuggestion: () => {},
    deleteSuggestion: () => {},
    handleSortBy: () => {}
})