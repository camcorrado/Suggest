export const findSuggestion = (suggestions=[], suggestionId) =>
  suggestions.find(suggestion => suggestion.id === suggestionId)