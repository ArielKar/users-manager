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

const dummyUsers = [
  {
    id: uuid(),
    firstName: 'Noy',
    lastName: 'Tsemach',
    email: 'noyt@coo.com',
    applications: ['Interactbot', 'Conversationow', 'Paperless'],
  },
  {
    id: uuid(),
    firstName: 'Shahar',
    lastName: 'Ziv',
    email: 'shaharz@coo.com',
    applications: ['Interactbot', 'Conversationow'],
  },
  {
    id: uuid(),
    firstName: 'John',
    lastName: 'Dan',
    email: 'johnd@coo.com',
    applications: ['Conversationow', 'Paperless'],
  },
  {
    id: uuid(),
    firstName: 'Jack',
    lastName: 'Wall',
    email: 'jackw@coo.com',
    applications: ['Interactbot', 'Paperless'],
  },
  {
    id: uuid(),
    firstName: 'James',
    lastName: 'Dean',
    email: 'jamesd@coo.com',
    applications: ['Conversationow'],
  },
  {
    id: uuid(),
    firstName: 'Dani',
    lastName: 'Roop',
    email: 'danir@coo.com',
    applications: ['Paperless'],
  },
  {
    id: uuid(),
    firstName: 'Mark',
    lastName: 'Knofler',
    email: 'markk@coo.com',
    applications: ['Paperless'],
  },
  {
    id: uuid(),
    firstName: 'John',
    lastName: 'Pertucci',
    email: 'johnp@coo.com',
    applications: ['Paperless', 'Interactbot'],
  },
];

const initialState = {
  usersList: dummyUsers,
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
