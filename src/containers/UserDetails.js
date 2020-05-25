import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  Box,
  Avatar,
  Typography,
  Divider,
  List,
  ListItem,
  Paper,
  Select,
  Button,
  makeStyles,
  InputLabel,
  FormControl,
  IconButton,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { APPLICATIONS_LIST } from '../constants';
import {
  addApplicationToUserAction,
  removeApplicationFromUser,
  handleDeleteUser,
} from '../store/users/actions';
import { toTitleCase } from '../utils/stringsUtils';

const useStyles = makeStyles(() => ({
  detailsWrapper: {
    backgroundSize: '100% 62%',
    backgroundImage: 'linear-gradient(to right, #47A3B5 , #76E2C0)',
    backgroundRepeat: 'no-repeat',
    paddingTop: '8em',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    width: '80px',
    height: '80px',
    marginBottom: '0.5em',
  },
  appsAndRolesWrapper: {
    padding: '0 1em',
    marginTop: '3em',
  },
  applicationItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F5F8FD',
    padding: '5px 10px',
    marginTop: '2em',
  },
  formControl: {
    width: '55%',
  },
  select: {
    backgroundColor: 'transparent',
  },
  addBtn: {
    height: '40px',
    borderRadius: '20px',
    color: 'grey',
    width: '80px',
  },
  deleteButton: {
    position: 'absolute',
    top: '8px',
    right: '8px',
    border: '2px solid #fff',
    padding: '8px',
  },
}));

const UserDetails = props => {
  const { selectedUserData, addApplicationToUser, removeApplicationFromUser, deleteUser } = props;

  const [selectedApp, setSelectedApp] = useState('');
  const classes = useStyles();
  const fullName = toTitleCase(`${selectedUserData.firstName} ${selectedUserData.lastName}`);

  const handleAppSelect = e => {
    setSelectedApp(e.target.value);
  };

  const handleAppAdd = () => {
    if (!selectedApp || selectedUserData.applications.includes(selectedApp)) return;
    addApplicationToUser(selectedUserData.id, selectedApp);
  };

  const removeAppFromUser = idx => {
    removeApplicationFromUser(selectedUserData.id, idx);
  };

  const handleDeleteUserClick = () => {
    deleteUser(selectedUserData.id);
  };

  return (
    <Box style={{ width: '100%' }}>
      <Box className={classes.detailsWrapper}>
        <IconButton onClick={handleDeleteUserClick} className={classes.deleteButton}>
          <DeleteIcon style={{ color: '#fff' }} />
        </IconButton>
        <Avatar className={classes.avatar} />
        <Typography style={{ fontSize: '24px', fontWeight: 'bold' }}>{fullName}</Typography>
        <Typography style={{ color: 'grey' }}>{selectedUserData.email}</Typography>
      </Box>
      <Box className={classes.appsAndRolesWrapper}>
        <Typography>Applications & Roles</Typography>
        <Divider />
        <List>
          {selectedUserData.applications.map((app, idx) => (
            <React.Fragment key={`userDetailsAppItem${idx}`}>
              <ListItem className={classes.applicationItem}>
                <Typography>{app}</Typography>
                <IconButton onClick={() => removeAppFromUser(idx)}>
                  <DeleteIcon />
                </IconButton>
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
        <Paper className={classes.selectWrapper}>
          <FormControl variant="filled" className={classes.formControl}>
            <InputLabel htmlFor="filled-application-native-simple">Application</InputLabel>
            <Select
              className={classes.select}
              onChange={handleAppSelect}
              value={selectedApp}
              native
              inputProps={{
                name: 'application',
                id: 'filled-application-native-simple',
              }}
            >
              <option value={''}></option>
              {APPLICATIONS_LIST.map((app, idx) => (
                <option value={app} key={`userDetailsAppItem${idx}`}>
                  {app}
                </option>
              ))}
            </Select>
          </FormControl>
          <Button variant="outlined" className={classes.addBtn} onClick={handleAppAdd}>
            Add
          </Button>
        </Paper>
      </Box>
    </Box>
  );
};

const mapStateToProps = state => {
  return {
    selectedUserData: state.users.selectedUserData,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addApplicationToUser: (id, app) => dispatch(addApplicationToUserAction(id, app)),
    removeApplicationFromUser: (userId, index) =>
      dispatch(removeApplicationFromUser(userId, index)),
    deleteUser: id => dispatch(handleDeleteUser(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDetails);
