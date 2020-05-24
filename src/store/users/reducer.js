import { uuid } from 'uuidv4';
import { APPLICATIONS_LIST } from '../../constants';
import { SELECT_USER } from './actions';

const getUsersMock = () => {
  return Array(8)
    .fill({})
    .map(i => ({
      id: uuid(),
      email: 'exmple@examp.com',
      firstName: 'John',
      lastName: 'Doe',
      applications: [...APPLICATIONS_LIST],
    }));
};

const initialState = {
  usersList: getUsersMock(),
  selectedUserData: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SELECT_USER:
      return {
        ...state,
        selectedUserData: action.payload,
      };

    default:
      return state;
  }
};
