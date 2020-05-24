import { openDrawerAction } from '../ui/actions';
import { USER_DRAWER_CONTENT_TYPE } from '../../constants';

export const SELECT_USER = '[users] Select User';
export const NEW_USER = '[users] New User Request';

export const userSelectAction = (userData, drawerContentType) => {
  return {
    type: SELECT_USER,
    payload: { userData, drawerContentType },
  };
};

export const newUserRequestAction = drawerContentType => {
  return {
    type: NEW_USER,
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
