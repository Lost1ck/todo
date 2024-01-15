import Header from '../Header.jsx';
import UseTaskState from '../hooks/Hooks.jsx';

import Main from './main/Main.jsx';

const TodoApp = () => {
  const taskState = UseTaskState();

  return (
    <div className="todoapp">
      <Header taskState={taskState} />
      <Main taskState={taskState} />
    </div>
  );
};

export default TodoApp;
