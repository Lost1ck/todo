import React from 'react';

import TaskForm from './NewTaskForm.jsx';

const Header = ({ taskState }) => {
  return <TaskForm taskState={taskState} />;
};

export default Header;
