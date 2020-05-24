import { createSelector } from 'reselect';

const getUserList = state => state.users.usersList;
const getSearchTerm = state => state.users.searchTerm;
const getApplicationsToFilter = state => state.users.applicationsToFilter;

//memoized selector
export const getFilteredUsers = createSelector(
  [getUserList, getSearchTerm, getApplicationsToFilter],
  (usersList, searchTerm, applicationsToFilter) => {
    if (!(searchTerm || applicationsToFilter.length)) {
      return usersList;
    }
  }
);
