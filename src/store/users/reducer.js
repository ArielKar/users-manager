import { uuid } from 'uuidv4';
import {
  SELECT_USER,
  NEW_USER_REQUEST,
  ADD_USER,
  SET_SEARCH_TERM,
  SET_APPS_FILTER,
  ADD_APP_TO_USER,
  REMOVE_APP_FROM_USER,
  DELETE_USER,
} from './actions';

const getUsersMock = () => {
  return Array(8)
    .fill({})
    .map(i => ({
      id: uuid(),
      email: 'john@doe.com',
      firstName: 'John',
      lastName: 'Doe',
      applications: ['Interactbot'],
    }));
};

const initialState = {
  usersList: getUsersMock(),
  selectedUserData: null,
  searchTerm: '',
  applicationsToFilter: [],
  usersDrawerContentType: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SELECT_USER:
      return {
        ...state,
        selectedUserData: action.payload.userData,
        usersDrawerContentType: action.payload.drawerContentType,
      };
    case NEW_USER_REQUEST:
      return {
        ...state,
        usersDrawerContentType: action.payload.drawerContentType,
      };
    case ADD_USER:
      return {
        ...state,
        usersList: state.usersList.concat(action.payload.newUser),
      };
    case SET_SEARCH_TERM:
      return {
        ...state,
        searchTerm: action.payload,
      };
    case SET_APPS_FILTER:
      return {
        ...state,
        applicationsToFilter: [...action.payload],
      };
    case ADD_APP_TO_USER: {
      const { usersList } = state;
      const userToUpdate = usersList.find(user => user.id === action.payload.id);
      userToUpdate.applications.push(action.payload.app);
      return {
        ...state,
        usersList: [...usersList],
        selectedUserData: { ...userToUpdate },
      };
    }
    case REMOVE_APP_FROM_USER: {
      const { usersList } = state;
      const userToUpdate = usersList.find(user => user.id === action.payload.userId);
      userToUpdate.applications.splice(action.payload.appIndex, 1);
      return {
        ...state,
        usersList: [...usersList],
        selectedUserData: { ...userToUpdate },
      };
    }
    case DELETE_USER: {
      const { usersList } = state;
      const userIndex = usersList.findIndex(user => user.id === action.payload.userId);
      usersList.splice(userIndex, 1);
      return {
        ...state,
        usersList: [...usersList],
      };
    }
    default:
      return state;
  }
};
