import React from 'react';
import ApiContext from '../../ApiContext';
import { Link } from 'react-router-dom';

class Form extends React.Component {
  constructor(props) {
    super(props)
    this.handleChangeName = this.handleChangeName.bind(this)
    this.handleChangeContent = this.handleChangeContent.bind(this)
    this.handleClickSubmit = this.handleClickSubmit.bind(this)

    this.state = {
      name: {
        value: this.props.name
      },
      content: {
        value: this.props.content
      }
    }
  }

  static defaultProps ={
    editSuggestion: () => {}
  }

  static contextType = ApiContext;

  handleClickSubmit = () => {
    const suggestionId = this.props.id
    const newName = this.state.name.value
    const newContent = this.state.content.value
    this.context.editSuggestion(suggestionId, newName, newContent)
  }

  handleChangeName = e => {
    console.log(this.state.name.value)
    this.setState({name: {value: e}})
  }

  handleChangeContent = e => {
    this.setState({content: {value: e}})
  }

  render() {
    return (
      <form id="record-suggestion">
          <div className="form-section">
              <label htmlFor="suggestion-title">Suggestion Title</label>
              <input type="text" name="suggestion-title" value={this.state.name.value} onChange={e => this.handleChangeName(e.target.value)} required />
          </div>
          <div className="form-section">
              <label htmlFor="suggestion-summary">Suggestion summary</label>
              <textarea name="suggestion-summary" value={this.state.content.value} onChange={e => this.handleChangeContent(e.target.value)} rows="15" required></textarea>
          </div>
          <Link to={`/demo-employee`} onClick={this.handleClickSubmit}>
            Submit
          </Link>
          <Link to={`/demo-employee`}>
            Cancel
          </Link>
      </form>        
    );
  }
}

export default Form;