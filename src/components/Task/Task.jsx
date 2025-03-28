import { formatDistanceToNow } from 'date-fns';
import { useState } from 'react';

export default function Task({ task, onDelete, onComplete, onEditTask }) {
  const { description, created, completed, id } = task;
  const [createTime, setCreateTime] = useState(formatDistanceToNow(created, { includeSeconds: true }));
  const [newDescription, setNewDescription] = useState(description);
  const [isEditing, setIsEditing] = useState(false);

  setInterval(() => {
    setCreateTime(formatDistanceToNow(created, { includeSeconds: true }));
  }, 30000);

  const editChange = (e) => {
    setNewDescription(e.target.value);
    console.log(task);
  };

  const editClick = () => {
    setIsEditing(true);
  };

  const editSubmit = (event) => {
    event.preventDefault();
    if (newDescription.trim()) {
      onEditTask(id, newDescription);
      setIsEditing(false);
    }
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
          <span className="description">{newDescription}</span>
          <span className="created">created {createTime} ago</span>
        </label>
        <button className="icon icon-edit" onClick={editClick}></button>
        <button className="icon icon-destroy" onClick={onDelete}></button>
      </div>
      {isEditing && (
        <form onSubmit={editSubmit} autoFocus>
          <input type="text" className="edit" value={newDescription} onChange={editChange} />
        </form>
      )}
    </li>
  );
}
