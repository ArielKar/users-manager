import { uuid } from 'uuidv4';
import { APPLICATIONS_LIST } from '../../constants';
import { SELECT_USER, NEW_USER } from './actions';

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
    case NEW_USER:
      return {
        ...state,
        usersDrawerContentType: action.payload.drawerContentType,
      };
    default:
      return state;
  }
};
