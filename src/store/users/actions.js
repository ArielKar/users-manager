import { openDrawerAction } from '../ui/actions';

export const SELECT_USER = '[users] Select User';

export const userSelectAction = userData => {
  return {
    type: SELECT_USER,
    payload: userData,
  };
};

export const handleUserSelect = userData => dispatch => {
  dispatch(userSelectAction(userData));
  dispatch(openDrawerAction());
};
