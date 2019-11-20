import { connect } from 'react-redux';
import App from '../App';
import { readToDoFromLocalAction } from '../actions/ToDoActions';

const mapStateToProps = (state, props) => ({
});

const mapDispatchToProps = (dispatch) => ({
  readToDoFromLocal: () => dispatch(readToDoFromLocalAction())
});

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppContainer;
