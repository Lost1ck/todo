import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const TaskList = ({ taskState }) => {
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTaskText, setEditedTaskText] = useState('');
  const [runningTimers, setRunningTimers] = useState({});

  useEffect(() => {
    const intervalId = setInterval(() => {
      const { tasks, setTasks } = taskState;

      const updatedTasks = tasks.map((task) => {
        const { id, duration } = task;
        if (runningTimers[id] && duration > 0) {
          return { ...task, duration: duration - 1 };
        }
        return task;
      });

      setTasks(updatedTasks);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [taskState, runningTimers]);

  const formatTime = (duration) => {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handlePlay = (taskId) => {
    setRunningTimers({
      ...runningTimers,
      [taskId]: true,
    });
  };

  const handlePause = (taskId) => {
    setRunningTimers({
      ...runningTimers,
      [taskId]: false,
    });
  };

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
      const updatedTasks = taskState.tasks.map((task) => {
        if (task.id === taskId) {
          return { ...task, text: editedTaskText };
        }
        return task;
      });
      taskState.setTasks(updatedTasks);
      setEditingTaskId(null);
      setEditedTaskText('');
    }
  };

  const { toggleTaskCompletion, completedTasks, filter, tasks, handleDeleteTask } = taskState;

  let filteredTasks;
  switch (filter) {
    case 'active':
      filteredTasks = tasks.filter((task) => !completedTasks.includes(task.id));
      break;
    case 'completed':
      filteredTasks = tasks.filter((task) => completedTasks.includes(task.id));
      break;
    default:
      filteredTasks = tasks;
      break;
  }

  return (
    <>
      {filteredTasks.map((task) => (
        <li key={task.id} className={completedTasks.includes(task.id) ? 'completed' : ''}>
          <div className="view">
            {editingTaskId === task.id ? (
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
            ) : (
              <>
                <input
                  onClick={() => toggleTaskCompletion(task.id)}
                  id={task.id}
                  className="toggle"
                  type="checkbox"
                  checked={completedTasks.includes(task.id)}
                  readOnly
                />
                <label htmlFor={task.id}>
                  <span className="title">{task.text}</span>
                  <span className="description">
                    <button
                      className="icon icon-play"
                      onClick={() => handlePlay(task.id)}
                      disabled={runningTimers[task.id]}
                    ></button>
                    <button
                      className="icon icon-pause"
                      onClick={() => handlePause(task.id)}
                      disabled={!runningTimers[task.id]}
                    ></button>
                    <span>{formatTime(task.duration)}</span>
                  </span>
                  <span className="description">
                    created{' '}
                    {taskState.formatDistanceToNow(new Date(task.createdAt), {
                      includeSeconds: true,
                      addSuffix: true,
                    })}
                  </span>
                </label>
                <button className="icon icon-edit" onClick={() => startEditingTask(task.id, task.text)} />
                <button className="icon icon-destroy" onClick={() => handleDeleteTask(task.id)} />
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
