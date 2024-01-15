import PropTypes from 'prop-types';

import Footer from '../../footer/Footer.jsx';
import Task from '../../Task.jsx';

const Main = ({ taskState }) => (
  <>
    <Task taskState={taskState} />
    <Footer taskState={taskState} />
  </>
);

Main.propTypes = {
  taskState: PropTypes.shape({
    counterOfTasks: PropTypes.func.isRequired,
  }).isRequired,
};

export default Main;
