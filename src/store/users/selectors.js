import { createSelector } from 'reselect';

const getUserList = state => state.users.usersList;
const getSearchTerm = state => state.users.searchTerm;
const getApplicationsToFilter = state => state.users.applicationsToFilter;

//memoized selector
export const getFilteredUsers = createSelector(
  [getUserList, getSearchTerm, getApplicationsToFilter],
  (usersList, searchTerm, applicationsToFilter) => {
    if (searchTerm) {
      usersList = filterBySearchTerm(searchTerm, usersList);
    }
    if (applicationsToFilter.length) {
      usersList = filterByApplications(applicationsToFilter, usersList);
    }
    return usersList;
  }
);

const filterBySearchTerm = (searchTerm, users) => {
  return users.filter(user => {
    for (const key in user) {
      if (typeof user[key] === 'string' && user[key].match(searchTerm)) {
        return true;
      }
    }
    return false;
  });
};

const filterByApplications = (applicationsToFilter, users) => {
  return users.filter(user => {
    for (const app of applicationsToFilter) {
      return user.applications.includes(app);
    }
    return false;
  });
};
