import { connect } from 'react-redux';
import ToDoList from '../views/ToDoList';
import { pathToStatusMapping } from '../common/Constants';
import { updateStatusBulkAction } from '../actions/ToDoActions';

const getToDoList = (listStatus) => {
  const statusToShow = pathToStatusMapping[window.location.pathname];
  const toDoList = (localStorage.getItem('toDoList'))?JSON.parse(localStorage.getItem('toDoList')):[];
  return toDoList.filter(item => {
    return item.status === statusToShow
  });
};

const mapStateToProps = (state, props) => ({
  toDoList: getToDoList(state.listStatus)
});

const mapDispatchToProps = (dispatch) => ({
  updateStatus: (updateIndices, status) => dispatch(updateStatusBulkAction(updateIndices, status))
});

const ToDoListContainer = connect(mapStateToProps, mapDispatchToProps)(ToDoList);

export default ToDoListContainer;
