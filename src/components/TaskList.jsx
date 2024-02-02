import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TaskList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editingTaskId: null,
      editedTaskText: '',
      runningTaskId: null,
      runningTimers: {},
    };
  }

  formatTime = (duration) => {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  handlePlay = (taskId) => {
    const { runningTimers } = this.state;
    this.setState({
      runningTimers: {
        ...runningTimers,
        [taskId]: true,
      },
    });
  };

  handlePause = (taskId) => {
    const { runningTimers } = this.state;
    this.setState({
      runningTimers: {
        ...runningTimers,
        [taskId]: false,
      },
    });
  };

  componentDidMount() {
    this.intervalId = setInterval(() => {
      const { runningTimers } = this.state;
      const { tasks, setTasks } = this.props.taskState;

      const updatedTasks = tasks.map((task) => {
        const { id, duration } = task;
        if (runningTimers[id] && duration > 0) {
          return { ...task, duration: duration - 1 };
        }
        return task;
      });

      setTasks(updatedTasks);
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  render() {
    const { taskState } = this.props;
    const { editingTaskId, editedTaskText, runningTimers } = this.state;
    const { toggleTaskCompletion, completedTasks, filter, tasks, handleDeleteTask } = taskState;

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
      this.setState({
        editingTaskId: taskId,
        editedTaskText: taskText,
      });
    };

    const cancelEditingTask = () => {
      this.setState({
        editingTaskId: null,
        editedTaskText: '',
      });
    };

    const saveEditedTask = (taskId) => {
      if (editedTaskText.trim()) {
        const updatedTasks = tasks.map((task) => {
          if (task.id === taskId) {
            return { ...task, text: editedTaskText };
          }
          return task;
        });
        this.props.taskState.setTasks(updatedTasks);
        this.setState({
          editingTaskId: null,
          editedTaskText: '',
        });
      }
    };

    return (
      <>
        {filteredTasks.map((task) => (
          <li key={task.id} className={completedTasks.includes(task.id) ? 'completed' : null}>
            <div className="view">
              {editingTaskId === task.id ? (
                <input
                  className="edit"
                  type="text"
                  autoFocus
                  value={editedTaskText}
                  onChange={(e) => this.setState({ editedTaskText: e.target.value })}
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
                    onChange={() => {}}
                  />
                  <label htmlFor={task.id}>
                    <span className="title">{task.text}</span>
                    <span className="description">
                      <button
                        className="icon icon-play"
                        onClick={() => this.handlePlay(task.id)}
                        disabled={runningTimers[task.id]}
                      ></button>
                      <button
                        className="icon icon-pause"
                        onClick={() => this.handlePause(task.id)}
                        disabled={!runningTimers[task.id]}
                      ></button>
                      <span>{this.formatTime(task.duration)}</span>
                    </span>
                    <span className="description">
                      created{' '}
                      {this.props.taskState.formatDistanceToNow(new Date(task.createdAt), {
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
  }
}

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
