import React, { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';

export default function Task({ task, onDelete, onComplete, onEditTask }) {
  const { description, created, completed, id } = task;
  const [createTime, setCreateTime] = useState(formatDistanceToNow(created, { includeSeconds: true }));
  const [newDescription, setNewDescription] = useState(description);
  const [isEditing, setIsEditing] = useState(false);
  const [timer, setTimer] = useState(true);
  const [timerTime, setTimerTime] = useState(0);

  useEffect(() => {
    const savedTimerTime = localStorage.getItem(`timerTime_${id}`);
    if (savedTimerTime) {
      setTimerTime(parseInt(savedTimerTime, 10));
    }
  }, [id]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCreateTime(formatDistanceToNow(created, { includeSeconds: true }));
    }, 30000);

    return () => clearInterval(intervalId);
  }, [created]);

  const editChange = (e) => {
    setNewDescription(e.target.value);
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
        setTimerTime((TimerTime) => {
          const newTimerTime = TimerTime + 1;
          localStorage.setItem(`timerTime_${id}`, newTimerTime);
          return newTimerTime;
        });
      }, 1000);
    } else if (!timer && timerTime !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timer, id]);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
  };

  const handleDelete = () => {
    localStorage.removeItem(`timerTime_${id}`);
    onDelete();
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
        <input className="toggle" type="checkbox" onChange={onComplete} checked={completed} />
        <label>
          <span className="title">{newDescription}</span>
          <span className="description">
            <button className="icon icon-play" onClick={onTimerStart}></button>
            <button className="icon icon-pause" onClick={onTimerStop}></button>
            {formatTime(timerTime)}
          </span>
          <span className="description">created {createTime} ago</span>
        </label>
        <button className="icon icon-edit" onClick={onEditClick}></button>
        <button className="icon icon-destroy" onClick={handleDelete}></button>
      </div>
      {isEditing && (
        <form onSubmit={onEditSubmit} autoFocus>
          <input type="text" className="edit" value={newDescription} onChange={editChange} />
        </form>
      )}
    </li>
  );
}
