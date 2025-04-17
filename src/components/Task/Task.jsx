import React, { Component } from 'react';
import { formatDistanceToNow } from 'date-fns';

class Task extends Component {
  constructor(props) {
    super(props);
    const { description, created } = this.props.task;
    this.state = {
      createTime: formatDistanceToNow(created, { includeSeconds: true }),
      newDescription: description,
      isEditing: false,
      timer: true,
      timerTime: 0,
    };

    this.editChange = this.editChange.bind(this);
    this.onEditClick = this.onEditClick.bind(this);
    this.onEditSubmit = this.onEditSubmit.bind(this);
    this.onTimerStart = this.onTimerStart.bind(this);
    this.onTimerStop = this.onTimerStop.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.onCompleted = this.onCompleted.bind(this);
  }

  componentDidMount() {
    const { id } = this.props.task;
    const savedTimerTime = localStorage.getItem(`timerTime_${id}`);
    if (savedTimerTime) {
      this.setState({ timerTime: parseInt(savedTimerTime, 10) });
    }

    this.createTimeInterval = setInterval(() => {
      const { created } = this.props.task;
      this.setState({
        createTime: formatDistanceToNow(created, { includeSeconds: true }),
      });
    }, 30000);

    this.timerInterval = setInterval(() => {
      if (this.state.timer) {
        this.setState((prevState) => {
          const newTimerTime = prevState.timerTime + 1;
          localStorage.setItem(`timerTime_${id}`, newTimerTime);
          return { timerTime: newTimerTime };
        });
      }
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.createTimeInterval);
    clearInterval(this.timerInterval);
  }

  editChange(e) {
    this.setState({ newDescription: e.target.value });
  }

  onEditClick() {
    this.setState({ isEditing: true });
  }

  onEditSubmit(event) {
    event.preventDefault();
    const { id } = this.props.task;
    const { newDescription } = this.state;
    if (newDescription.trim()) {
      console.log(newDescription, id);
      this.props.onEdit(id, newDescription);
      this.setState({ isEditing: false });
    }
  }

  onCompleted() {
    this.props.onComplete();
  }

  onTimerStart() {
    this.setState({ timer: true });
  }

  onTimerStop() {
    this.setState({ timer: false });
  }

  handleDelete() {
    const { id } = this.props.task;
    localStorage.removeItem(`timerTime_${id}`);
    this.props.onDelete();
  }

  formatTime(timeInSeconds) {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
  }

  render() {
    const { task } = this.props;
    const { completed } = task;
    const { createTime, newDescription, isEditing, timerTime } = this.state;

    let className = '';
    if (completed) {
      className += 'completed ';
    }
    if (isEditing) {
      className += 'editing';
    }

    return (
      <li className={className}>
        <div className="view">
          <input className="toggle" type="checkbox" onChange={this.onCompleted} checked={completed} />
          <label>
            <span className="title">{newDescription}</span>
            <span className="description">
              <button className="icon icon-play" onClick={this.onTimerStart}></button>
              <button className="icon icon-pause" onClick={this.onTimerStop}></button>
              {this.formatTime(timerTime)}
            </span>
            <span className="description">created {createTime} ago</span>
          </label>
          <button className="icon icon-edit" onClick={this.onEditClick}></button>
          <button className="icon icon-destroy" onClick={this.handleDelete}></button>
        </div>
        {isEditing && (
          <form onSubmit={this.onEditSubmit} autoFocus>
            <input type="text" className="edit" value={newDescription} onChange={this.editChange} />
          </form>
        )}
      </li>
    );
  }
}

export default Task;
