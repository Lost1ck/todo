import React, { useState } from 'react';
import PropTypes from 'prop-types';

const TaskList = ({ taskState }) => {
  const { setTasks, formatDistanceToNow, toggleTaskCompletion, completedTasks, filter, tasks, handleDeleteTask } =
    taskState;

  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTaskText, setEditedTaskText] = useState('');

  const activeFilter = tasks.filter((task) => !completedTasks.includes(task.id));
  const completedTask = tasks.filter((task) => completedTasks.includes(task.id));

  let filteredTasks;

  switch (filter) {
    case 'active':
      filteredTasks = activeFilter;
      break;
    case 'completed':
      filteredTasks = completedTask;
      break;
    default:
      filteredTasks = tasks;
      break;
  }

  const startEditingTask = (taskId, taskText) => {
    setEditingTaskId(taskId);
    setEditedTaskText(taskText);
  };

  const cancelEditingTask = () => {
    setEditingTaskId(null);
    setEditedTaskText('');
  };

  const saveEditedTask = (taskId) => {
    if (editedTaskText.trim()) {
      const updatedTasks = tasks.map((task) => {
        if (task.id === taskId) {
          return { ...task, text: editedTaskText };
        }
        return task;
      });
      setTasks(updatedTasks);
      setEditingTaskId(null);
      setEditedTaskText('');
    }
  };

  return (
    <>
      {filteredTasks.map((task) => (
        <li key={task.id} className={completedTasks.includes(task.id) ? 'completed' : null}>
          <div className="view">
            {editingTaskId === task.id ? (
              <form>
                <input
                  className="edit"
                  type="text"
                  autoFocus
                  value={editedTaskText}
                  onChange={(e) => setEditedTaskText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      saveEditedTask(task.id);
                    } else if (e.key === 'Escape') {
                      cancelEditingTask();
                    }
                  }}
                />
              </form>
            ) : (
              <>
                <input
                  onClick={() => toggleTaskCompletion(task.id)}
                  id={task.id}
                  className="toggle"
                  type="checkbox"
                  checked={completedTasks.includes(task.id)}
                  onChange={() => {}}
                />
                <label htmlFor={task.id}>
                  <span className="description">{task.text}</span>
                  <span className="created">
                    created{' '}
                    {formatDistanceToNow(new Date(task.createdAt), {
                      includeSeconds: true,
                      addSuffix: true,
                    })}
                  </span>
                </label>
                <button className="icon icon-edit" onClick={() => startEditingTask(task.id, task.text)} />
                <button label="text" className="icon icon-destroy" onClick={() => handleDeleteTask(task.id)} />
              </>
            )}
          </div>
        </li>
      ))}
    </>
  );
};

TaskList.propTypes = {
  taskState: PropTypes.shape({
    setTasks: PropTypes.func.isRequired,
    formatDistanceToNow: PropTypes.func.isRequired,
    toggleTaskCompletion: PropTypes.func.isRequired,
    completedTasks: PropTypes.arrayOf(PropTypes.number).isRequired,
    filter: PropTypes.string.isRequired,
    tasks: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        text: PropTypes.string.isRequired,
        createdAt: PropTypes.instanceOf(Date).isRequired,
      })
    ).isRequired,
    handleDeleteTask: PropTypes.func.isRequired,
  }).isRequired,
};

export default TaskList;
