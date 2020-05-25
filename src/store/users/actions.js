import { openDrawerAction, closeDrawerAction } from '../ui/actions';
import { USER_DRAWER_CONTENT_TYPE } from '../../constants';
import { uuid } from 'uuidv4';

export const SELECT_USER = '[users] Select User';
export const NEW_USER_REQUEST = '[users] New User Request';
export const ADD_USER = '[users] Add New User';

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
    CAN EXTEND: create new User in models layer
    CAN EXTEND: make API call to server in infra layer
  */
  const newUser = {
    id: uuid(),
    ...userData,
  };
  dispatch(addUserAction(newUser));
  dispatch(closeDrawerAction());
};
