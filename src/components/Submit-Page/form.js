import React from 'react';

class Form extends React.Component {
  render() {
    return (
        <form id="record-suggestion">
            <div class="form-section">
                <label for="suggestion-title">Suggestion Title</label>
                <input type="text" name="suggestion-title" placeholder="What needs change?" required />
            </div>
            <div class="form-section">
                <label for="suggestion-summary">Suggestion summary</label>
                <textarea name="suggestion-summary" rows="15"   required></textarea>
            </div>
            <button type="submit">Submit</button>
            <button type="reset">Reset</button>
      </form>        
    );
  }
}

export default Form;