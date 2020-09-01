import ApiContext from "../ApiContext";
import React from "react";

export default class YourSuggestionsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "newest",
    };

    this.handleChange = this.handleChange.bind(this);
  }

  static contextType = ApiContext;

  static defaultProps = {
    handleSortBy: () => {},
  };

  async handleChange(event) {
    await this.setState({ value: event.target.value });
    this.context.handleSortBy(this.state.value);
  }

  render() {
    return (
      <form>
        <label>
          Sort Suggestions By:
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="upvotes">Upvotes</option>
          </select>
        </label>
      </form>
    );
  }
}
