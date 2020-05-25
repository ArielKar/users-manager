import { openDrawerAction, closeDrawerAction } from '../ui/actions';
import { USER_DRAWER_CONTENT_TYPE } from '../../constants';
import { uuid } from 'uuidv4';

export const SELECT_USER = '[users] Select User';
export const NEW_USER_REQUEST = '[users] New User Request';
export const ADD_USER = '[users] Add New User';
export const SET_SEARCH_TERM = '[users] Set search term';
export const SET_APPS_FILTER = '[users] Set applications filter';
export const ADD_APP_TO_USER = '[users] Add application to user';
export const REMOVE_APP_FROM_USER = '[users] Remove application from user';
export const DELETE_USER = '[users] Delete user';

export const userSelectAction = (userData, drawerContentType) => {
  return {
    type: SELECT_USER,
    payload: { userData, drawerContentType },
  };
};

export const newUserRequestAction = drawerContentType => {
  return {
    type: NEW_USER_REQUEST,
    payload: {
      drawerContentType,
    },
  };
};

export const handleUserSelect = userData => dispatch => {
  dispatch(userSelectAction(userData, USER_DRAWER_CONTENT_TYPE.selected));
  dispatch(openDrawerAction());
};

export const handleNewUserRequest = () => dispatch => {
  dispatch(newUserRequestAction(USER_DRAWER_CONTENT_TYPE.new));
  dispatch(openDrawerAction());
};

const addUserAction = newUser => {
  return {
    type: ADD_USER,
    payload: { newUser },
  };
};

export const handleNewUser = userData => dispatch => {
  /*
    CAN EXTEND: instanciate new User in models layer
    CAN EXTEND: make API call to server in infra layer
  */
  const newUser = {
    id: uuid(),
    ...userData,
  };
  dispatch(addUserAction(newUser));
  dispatch(closeDrawerAction());
};

export const setSearchTermAction = searchTerm => {
  return {
    type: SET_SEARCH_TERM,
    payload: searchTerm,
  };
};

export const setApplicationsFilterAction = appsArray => {
  return {
    type: SET_APPS_FILTER,
    payload: appsArray,
  };
};

export const addApplicationToUserAction = (id, app) => {
  return {
    type: ADD_APP_TO_USER,
    payload: {
      id,
      app,
    },
  };
};

export const removeApplicationFromUser = (userId, appIndex) => {
  return {
    type: REMOVE_APP_FROM_USER,
    payload: {
      userId,
      appIndex,
    },
  };
};

export const deleteUserAction = userId => {
  return {
    type: DELETE_USER,
    payload: {
      userId,
    },
  };
};

export const handleDeleteUser = userId => dispatch => {
  dispatch(closeDrawerAction());
  dispatch(deleteUserAction(userId));
};
