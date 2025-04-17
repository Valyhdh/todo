import React, { Component } from 'react';

class NewTaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ description: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { description } = this.state;
    if (description.trim()) {
      this.props.onAddTask(description);
      this.setState({ description: '' });
    }
  }

  render() {
    const { description } = this.state;

    return (
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            autoFocus
            value={description}
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}

export default NewTaskForm;
