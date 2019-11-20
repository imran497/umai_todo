import * as actions from './actions/ToDoActions';
import reduxStore from './common/ReduxStore';
import moment from 'moment';

describe('Add or Update Task', () => {
  // ADD THE INITIAL TASK
  it('Should add 1st task', () => {
    const toDo = {
      id: 0,
      text: 'text1',
      dueDate: '2018-12-12',
      completedDate: "",
      status: "PENDING"
    };
    const expectedAction = {
      type: 'ADD_OR_UPDATE_TO_DO',
      data: [toDo]
    };
    expect(actions.addOrUpdateToDoAction(toDo)).toEqual(expectedAction);
  });


  // ADD THE TAASK TO 1ST INDEX OF ARRAY
  it('Should add 2nd task', () => {
    const firstToDo = {
      id: 0,
      text: 'text1',
      dueDate: '2018-12-12',
      completedDate: "",
      status: "PENDING"
    };
    reduxStore.dispatch({
      type: 'ADD_OR_UPDATE_TO_DO',
      data: [firstToDo]
    });

    const secondToDo = {
      id: 1,
      text: 'text2',
      dueDate: '2018-12-12',
      completedDate: "",
      status: "PENDING"
    };

    const expectedAction = {
      type: 'ADD_OR_UPDATE_TO_DO',
      data: [firstToDo, secondToDo]
    };
    expect(actions.addOrUpdateToDoAction(secondToDo)).toEqual(expectedAction);
  });

  // UPDATE THE TASK IF ALREADY EXIST
  it('Should update task', () => {
    const initialToDos = [
      {
        id: 0,
        text: 'text1',
        dueDate: '2018-12-12',
        completedDate: "",
        status: "PENDING"
      },
      {
        id: 1,
        text: 'text2',
        dueDate: '2018-12-12',
        completedDate: "",
        status: "PENDING"
      }
    ];


    reduxStore.dispatch({
      type: 'ADD_OR_UPDATE_TO_DO',
      data: initialToDos
    });

    const toDoUpdate = {
      id: 1,
      text: 'text5',
      dueDate: '2019-11-12'
    };

    const expectedAction = {
      type: 'ADD_OR_UPDATE_TO_DO',
      data: [
        {
          id: 0,
          text: 'text1',
          dueDate: '2018-12-12',
          completedDate: "",
          status: "PENDING"
        },
        {
          id: 1,
          text: 'text5',
          dueDate: '2019-11-12',
          completedDate: "",
          status: "PENDING"
        }
      ]
    };
    expect(actions.addOrUpdateToDoAction(toDoUpdate)).toEqual(expectedAction);
  });
});


describe('Reading data fom local storage', () => {
  // ACTION WHEN DATA DOESN'T EXIST ON LOCAL STORAGE
  it("read data from local when data doesn't exist", () => {

    if(localStorage.getItem('toDoList'))localStorage.removeItem('toDoList');
    const expectedAction = {
      type: 'ADD_OR_UPDATE_TO_DO',
      data: []
    };

    expect(actions.readToDoFromLocalAction()).toEqual(expectedAction);
  });

  // ACTION WHEN DATA IS AVAILABLE ON LOCALSTORAGE
  it("read data from local when data doesn't exist", () => {
    const initialToDos = [
      {
        id: 0,
        text: 'text1',
        dueDate: '2018-12-12',
        completedDate: "",
        status: "PENDING"
      },
      {
        id: 1,
        text: 'text2',
        dueDate: '2018-12-12',
        completedDate: "",
        status: "PENDING"
      }
    ];

    localStorage.setItem('toDoList', JSON.stringify(initialToDos));

    const expectedAction = {
      type: 'ADD_OR_UPDATE_TO_DO',
      data: initialToDos
    };

    expect(actions.readToDoFromLocalAction()).toEqual(expectedAction);
  });
});

describe('Updating data in bulk', () => {
  // UPDATING SELECTED TASKS FROM PENDING TO COMPLETED
  it('update selected tasks PENDING --> COMPLETED', () => {
    const initialToDos = [
      {
        id: 0,
        text: 'text1',
        dueDate: '2018-12-12',
        completedDate: "",
        status: "PENDING"
      },
      {
        id: 1,
        text: 'text2',
        dueDate: '2018-12-12',
        completedDate: "",
        status: "PENDING"
      },
      {
        id: 2,
        text: 'text3',
        dueDate: '2018-12-12',
        completedDate: "",
        status: "PENDING"
      }
    ];


    reduxStore.dispatch({
      type: 'ADD_OR_UPDATE_TO_DO',
      data: initialToDos
    });

    const updateIndices = [0, 1];

    const expectedAction = {
      type: 'ADD_OR_UPDATE_TO_DO',
      data: [
        {
          id: 0,
          text: 'text1',
          dueDate: '2018-12-12',
          completedDate: moment(new Date()).format('YYYY-MM-DD'),
          status: "COMPLETED"
        },
        {
          id: 1,
          text: 'text2',
          dueDate: '2018-12-12',
          completedDate: moment(new Date()).format('YYYY-MM-DD'),
          status: "COMPLETED"
        },
        {
          id: 2,
          text: 'text3',
          dueDate: '2018-12-12',
          completedDate: "",
          status: "PENDING"
        }
      ]
    };
    expect(actions.updateStatusBulkAction(updateIndices, 'COMPLETED')).toEqual(expectedAction);
  });

  // UPDATING SELECTED TASKS FROM PENDING TO DELETED
  it('update selected tasks PENDING --> DELETED', () => {
    const initialToDos = [
      {
        id: 0,
        text: 'text1',
        dueDate: '2018-12-12',
        completedDate: "",
        status: "PENDING"
      },
      {
        id: 1,
        text: 'text2',
        dueDate: '2018-12-12',
        completedDate: "",
        status: "PENDING"
      },
      {
        id: 2,
        text: 'text3',
        dueDate: '2018-12-12',
        completedDate: "",
        status: "PENDING"
      }
    ];


    reduxStore.dispatch({
      type: 'ADD_OR_UPDATE_TO_DO',
      data: initialToDos
    });

    const updateIndices = [0, 1];

    const expectedAction = {
      type: 'ADD_OR_UPDATE_TO_DO',
      data: [
        {
          id: 0,
          text: 'text1',
          dueDate: '2018-12-12',
          completedDate: '',
          status: "DELETED"
        },
        {
          id: 1,
          text: 'text2',
          dueDate: '2018-12-12',
          completedDate: '',
          status: "DELETED"
        },
        {
          id: 2,
          text: 'text3',
          dueDate: '2018-12-12',
          completedDate: "",
          status: "PENDING"
        }
      ]
    };
    expect(actions.updateStatusBulkAction(updateIndices, 'DELETED')).toEqual(expectedAction);
  });

  // UPDATING SELECTED TASKS FROM COMPLETED TO PENDING
  it('update selected tasks COMPLETED --> PENDING', () => {
    const initialToDos = [
      {
        id: 0,
        text: 'text1',
        dueDate: '2018-12-12',
        completedDate: "",
        status: "COMPLETED"
      },
      {
        id: 1,
        text: 'text2',
        dueDate: '2018-12-12',
        completedDate: "2019-12-11",
        status: "COMPLETED"
      },
      {
        id: 2,
        text: 'text3',
        dueDate: '2018-12-12',
        completedDate: "",
        status: "COMPLETED"
      }
    ];


    reduxStore.dispatch({
      type: 'ADD_OR_UPDATE_TO_DO',
      data: initialToDos
    });

    const updateIndices = [1];

    const expectedAction = {
      type: 'ADD_OR_UPDATE_TO_DO',
      data: [
        {
          id: 0,
          text: 'text1',
          dueDate: '2018-12-12',
          completedDate: "",
          status: "COMPLETED"
        },
        {
          id: 1,
          text: 'text2',
          dueDate: '2018-12-12',
          completedDate: "2019-12-11",
          status: "PENDING"
        },
        {
          id: 2,
          text: 'text3',
          dueDate: '2018-12-12',
          completedDate: "",
          status: "COMPLETED"
        }
      ]
    };
    expect(actions.updateStatusBulkAction(updateIndices, 'PENDING')).toEqual(expectedAction);
  });

  // RESTORING THE DELETED TASKS
  it('update selected tasks RESTORE DELETED', () => {
    const initialToDos = [
      {
        id: 0,
        text: 'text1',
        dueDate: '2018-12-12',
        completedDate: "",
        status: "DELETED"
      },
      {
        id: 1,
        text: 'text2',
        dueDate: '2018-12-12',
        completedDate: "2019-12-11",
        status: "DELETED"
      }
    ];


    reduxStore.dispatch({
      type: 'ADD_OR_UPDATE_TO_DO',
      data: initialToDos
    });

    const updateIndices = [1];

    const expectedAction = {
      type: 'ADD_OR_UPDATE_TO_DO',
      data: [
        {
          id: 0,
          text: 'text1',
          dueDate: '2018-12-12',
          completedDate: "",
          status: "DELETED"
        },
        {
          id: 1,
          text: 'text2',
          dueDate: '2018-12-12',
          completedDate: "2019-12-11",
          status: "PENDING"
        }
      ]
    };
    expect(actions.updateStatusBulkAction(updateIndices, 'RESTORE')).toEqual(expectedAction);
  });
});
