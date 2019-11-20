import reduxStore from '../common/ReduxStore';
import {toDoStatus} from '../common/Constants';
import moment from 'moment';


// ACTION TO ADD OR UPDATE A TODO TASK
export const addOrUpdateToDoAction = (content) => {
  const { toDoList } = reduxStore.getState();
  let itemExist = false;
  let toDoListUpdated = toDoList.map(item => {
    if(item.id === content.id){
      itemExist = true;
      return ({
        ...item,
        text: content.text,
        dueDate: content.dueDate
      });
    }
    return item;
  });
  if(!itemExist){
    toDoListUpdated.push({
      id: toDoListUpdated.length,
      text: content.text,
      dueDate: content.dueDate,
      completedDate: "",
      status: "PENDING"
    });
  }

  localStorage.setItem('toDoList', JSON.stringify(toDoListUpdated));

  return({
    type: 'ADD_OR_UPDATE_TO_DO',
    data: toDoListUpdated
  });
}

// ACTION TO READ TODO'S FROM LOCALSTORAGE AND UPDATE TO REDUX STORE
export const readToDoFromLocalAction = () => {
  let toDoList = localStorage.getItem('toDoList')?JSON.parse(localStorage.getItem('toDoList')):[];
  return({
    type: 'ADD_OR_UPDATE_TO_DO',
    data: toDoList
  });
}


// ACTION TO UPDATE TASKS IN A BATCH
export const updateStatusBulkAction = (updateIndices, status) => {
  const { toDoList } = reduxStore.getState();
  if(status === 'RESTORE')status = toDoStatus.PENDING;
  let updatedList = toDoList.map(item => {
    if(updateIndices.indexOf(item.id) !== -1){
      return {
        ...item,
        completedDate: (status === toDoStatus.COMPLETED)?moment(new Date()).format('YYYY-MM-DD'):item.completedDate,
        status
      }
    }else{
      return item
    }
  });

  localStorage.setItem('toDoList', JSON.stringify(updatedList));

  return({
    type: 'ADD_OR_UPDATE_TO_DO',
    data: updatedList
  });
}
