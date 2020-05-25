import React, { useState, useEffect } from 'react';
import UserCard from '../components/UserCard';
import {
  Grid,
  Typography,
  Box,
  Button,
  TextField,
  InputAdornment,
  Container,
  Drawer,
} from '@material-ui/core';
import { APPLICATIONS_LIST } from '../constants';
import { makeStyles } from '@material-ui/styles';
import ClearIcon from '@material-ui/icons/Clear';
import SearchIcon from '@material-ui/icons/Search';
import { connect } from 'react-redux';
import { closeDrawerAction } from '../store/ui/actions';
import {
  handleUserSelect,
  handleNewUserRequest,
  setSearchTermAction,
  setApplicationsFilterAction,
} from '../store/users/actions';
import { getFilteredUsers } from '../store/users/selectors';
import UsersDrawerContent from '../components/UsersDrawerContent';

const useStyles = makeStyles(() => ({
  topBarWrapper: {
    position: 'fixed',
    left: 0,
    zIndex: 1,
    backgroundColor: '#fafafa',
  },
  topBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #BDBDBD',
    padding: '1em 0',
    width: 'inherit',
  },
  searchSection: {
    margin: '6em 0 4em 0',
    justifyContent: 'space-between',
    alignItems: 'end',
  },
  searchInput: {
    marginBottom: '1em',
    '& .MuiOutlinedInput-root': {
      height: '40px',
      borderRadius: '20px',
      backgroundColor: '#fff',
    },
  },
  filtersWrapper: {
    display: 'flex',
    alignItems: 'baseline',
    flexWrap: 'wrap',
  },
  filtersBtnsWrapper: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  rounded: {
    borderRadius: '20px',
  },
  newUserBtn: {
    paddingLeft: '2em',
    paddingRight: '2em',
  },
}));

const UsersManager = props => {
  const {
    usersList,
    onCloseDrawer,
    userSelected,
    isDrawerOpen,
    newUserClick,
    usersDrawerContentType,
    updateSearchTerm,
    updateApplicationsFilter,
  } = props;
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAppList, setFilterAppList] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      updateSearchTerm(searchTerm);
      updateApplicationsFilter(filterAppList);
    }, 300);
    return () => clearTimeout(timer);
  });

  const handleSearchChange = e => {
    setSearchTerm(e.target.value);
  };

  const addRemoveToAppsFilterList = app => {
    if (filterAppList.includes(app)) {
      setFilterAppList(filterAppList.filter(fApp => fApp !== app));
    } else {
      setFilterAppList(filterAppList.concat(app));
    }
  };

  const onUserSelect = userData => {
    userSelected(userData);
  };

  const hanleNewUserClick = () => {
    newUserClick();
  };
  return (
    <>
      <Grid container>
        <Grid container item className={classes.topBarWrapper}>
          <Grid item xs={false} sm={1} />
          <Grid container item xs={12} sm={10}>
            <Container>
              <Box className={classes.topBar}>
                <Typography variant="h4">Users</Typography>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={hanleNewUserClick}
                  className={`${classes.newUserBtn} ${classes.rounded}`}
                >
                  New User
                </Button>
              </Box>
            </Container>
          </Grid>
          <Grid item xs={false} sm={1} />
        </Grid>
        <Grid container item xs={12} className={classes.searchSection}>
          <TextField
            className={classes.searchInput}
            id="users-search"
            placeholder="Search"
            variant="outlined"
            value={searchTerm}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="disabled" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment
                  position="end"
                  style={
                    searchTerm ? { cursor: 'pointer' } : { visibility: 'hidden', cursor: 'pointer' }
                  }
                >
                  <ClearIcon color="disabled" onClick={() => setSearchTerm('')} />
                </InputAdornment>
              ),
            }}
          />
          <Box className={classes.filtersWrapper}>
            <Typography style={{ fontSize: '14px' }}>Filters:</Typography>
            <Box className={classes.filtersBtnsWrapper}>
              {APPLICATIONS_LIST.map((app, idx) => (
                <Button
                  key={`appFilterBtn${idx}`}
                  className={classes.rounded}
                  style={{ marginLeft: '10px', marginBottom: '0.5em' }}
                  variant="outlined"
                  color={filterAppList.includes(app) ? 'primary' : 'default'}
                  onClick={() => addRemoveToAppsFilterList(app)}
                >
                  {app}
                </Button>
              ))}
            </Box>
          </Box>
        </Grid>
        <Grid container item spacing={4}>
          {usersList.map((user, idx) => (
            <Grid item xs={12} sm={6} md={3} key={`usertile${idx}`}>
              <UserCard userData={user} handleUserClick={onUserSelect} />
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={onCloseDrawer}
        PaperProps={{
          style: { maxWidth: '400px', width: '80%' },
        }}
      >
        <UsersDrawerContent drawerContentType={usersDrawerContentType} />
      </Drawer>
    </>
  );
};

const mapStateToProps = state => {
  return {
    isDrawerOpen: state.ui.isDrawerOpen,
    usersList: getFilteredUsers(state),
    usersDrawerContentType: state.users.usersDrawerContentType,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onCloseDrawer: () => dispatch(closeDrawerAction()),
    userSelected: userData => dispatch(handleUserSelect(userData)),
    newUserClick: () => dispatch(handleNewUserRequest()),
    updateSearchTerm: searchTerm => dispatch(setSearchTermAction(searchTerm)),
    updateApplicationsFilter: appsFilters => dispatch(setApplicationsFilterAction(appsFilters)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersManager);
