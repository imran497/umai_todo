export const toDoList = (state = [], action) => {
  switch(action.type){
    case "ADD_OR_UPDATE_TO_DO":
      return action.data;
    default:
      return state;
  }
}
