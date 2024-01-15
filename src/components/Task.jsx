import TaskList from './TaskList.jsx';

const Task = ({ taskState }) => {
  return (
    <ul className="todo-list">
      <TaskList taskState={taskState} />
    </ul>
  );
};

export default Task;
