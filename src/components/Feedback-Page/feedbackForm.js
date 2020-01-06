import React from 'react';

class feedbackForm extends React.Component {
  render() {
    return (
        <form id="record-feedback">
            <div class="form-section">
                <label for="feedback-title">Suggestion Title</label>
                <input type="text" name="feedback-title" placeholder="How can we improve?" required />
            </div>
            <div class="form-section">
                <label for="feedback-summary">Suggestion summary</label>
                <textarea name="feedback-summary" rows="15"   required></textarea>
            </div>
            <button type="submit">Submit</button>
            <button type="reset">Reset</button>
      </form>        
    );
  }
}

export default feedbackForm;