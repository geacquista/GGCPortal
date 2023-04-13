import React, { Component } from 'react';
import "../../../assets/style/dropdown.css"

class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: '',
    };
    this.handleOptionChange = this.handleOptionChange.bind(this);
  }

  handleOptionChange(event) {
    this.setState({ selectedOption: event.target.value });
  }

  render() {
    const { options } = this.props;
    const { selectedOption } = this.state;

    return (
        <select id="dropdown" value={selectedOption} onChange={this.handleOptionChange}>
          <option value="">--State--</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
    );
  }
}

export default Dropdown;