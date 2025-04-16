import React, { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';

export default function Task({ task, onDelete, onComplete, onEditTask }) {
  const { description, created, completed, id } = task;
  const [createTime, setCreateTime] = useState(formatDistanceToNow(created, { includeSeconds: true }));
  const [newDescription, setNewDescription] = useState(description);
  const [isEditing, setIsEditing] = useState(false);
  const [timer, setTimer] = useState(true);
  const [timerTime, setTimerTime] = useState(0);
  const [savedTimerTime, setSavedTimerTime] = useState(0);

  setInterval(() => {
    setCreateTime(formatDistanceToNow(created, { includeSeconds: true }));
  }, 30000);

  const editChange = (e) => {
    setNewDescription(e.target.value);
    console.log(task);
  };

  const onEditClick = () => {
    setIsEditing(true);
  };

  const onEditSubmit = (event) => {
    event.preventDefault();
    if (newDescription.trim()) {
      onEditTask(id, newDescription);
      setIsEditing(false);
    }
  };

  const onTimerStart = () => {
    setTimer(true);
  };

  const onTimerStop = () => {
    setTimer(false);
  };

  useEffect(() => {
    let interval = null;

    if (timer) {
      interval = setInterval(() => {
        setTimerTime((timerTime) => timerTime + 1);
      }, 1000);
    } else if (!timer && timerTime !== 0) {
      setSavedTimerTime(timerTime);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timer, timerTime]);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
  };

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
        <input className="toggle" type="checkbox" onChange={onComplete} />
        <label>
          <span className="title">{newDescription}</span>
          <span className="description">
            <button className="icon icon-play" onClick={onTimerStart}></button>
            <button className="icon icon-pause" onClick={onTimerStop}></button>
            {timer ? formatTime(timerTime) : formatTime(savedTimerTime)}
          </span>
          <span className="description">created {createTime} ago</span>
        </label>
        <button className="icon icon-edit" onClick={onEditClick}></button>
        <button className="icon icon-destroy" onClick={onDelete}></button>
      </div>
      {isEditing && (
        <form onSubmit={onEditSubmit} autoFocus>
          <input type="text" className="edit" value={newDescription} onChange={editChange} />
        </form>
      )}
    </li>
  );
}
