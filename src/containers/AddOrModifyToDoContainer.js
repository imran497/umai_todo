import { connect } from 'react-redux';
import AddOrModifyToDo from '../views/AddOrModifyToDo';
import {addOrUpdateToDoAction} from '../actions/ToDoActions';

const mapStateToProps = (state, props) => ({
  toDoList: state.toDoList || []
});

const mapDispatchToProps = (dispatch) => ({
  addToDo: (content) => dispatch(addOrUpdateToDoAction(content))
});

const AddOrModifyToDoContainer = connect(mapStateToProps, mapDispatchToProps)(AddOrModifyToDo);

export default AddOrModifyToDoContainer;
