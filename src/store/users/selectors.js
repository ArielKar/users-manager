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
  const normalizedSearchTerm = searchTerm.toLowerCase().trim().replace(/\s/g, '');
  return users.filter(user => {
    const normalizedName = (user.firstName + user.lastName).toLowerCase().trim().replace(/\s/, '');
    return normalizedName.includes(normalizedSearchTerm);
  });
};

const filterByApplications = (applicationsToFilter, users) => {
  return users.filter(user => {
    let matched = true;
    for (const app of applicationsToFilter) {
      matched = matched && user.applications.includes(app);
    }
    return matched;
  });
};
