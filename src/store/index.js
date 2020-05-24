import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import usersReducer from './users/reducer';
import uiReducer from './ui/reducer';

const combinedReducers = combineReducers({
  users: usersReducer,
  ui: uiReducer,
});

export default createStore(combinedReducers, applyMiddleware(ReduxThunk));
