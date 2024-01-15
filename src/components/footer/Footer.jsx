import PropTypes from 'prop-types';

import SelectAll, { SelectActive, SelectCompleted, ClearAllCompleted } from '../TasksFilter.jsx';
const Footer = ({ taskState }) => {
  const { counterOfTasks } = taskState;

  return (
    <footer className="footer">
      <span className="todo-count">
        {`${counterOfTasks()} `}
        items left
      </span>
      <ul className="filters">
        <SelectAll taskState={taskState} />
        <SelectActive taskState={taskState} />
        <SelectCompleted taskState={taskState} />
      </ul>
      <ClearAllCompleted taskState={taskState} />
    </footer>
  );
};

Footer.propTypes = {
  taskState: PropTypes.shape({
    counterOfTasks: PropTypes.func.isRequired,
  }).isRequired,
};

export default Footer;
