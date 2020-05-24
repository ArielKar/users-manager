import React from 'react';
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
  MenuItem,
  InputLabel,
  FormControl,
  IconButton,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles(() => ({
  detailsWrapper: {
    backgroundSize: '100% 64%',
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
    width: '40%',
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
}));

const UserDetails = props => {
  const { selectedUserData } = props;
  const classes = useStyles();
  const fullName = `${selectedUserData.firstName} ${selectedUserData.lastName}`;
  return (
    <Box style={{ width: '100%' }}>
      <Box className={classes.detailsWrapper}>
        <Avatar className={classes.avatar} />
        <Typography>{fullName}</Typography>
        <Typography>{selectedUserData.email}</Typography>
      </Box>
      <Box className={classes.appsAndRolesWrapper}>
        <Typography>Applications & Roles</Typography>
        <Divider />
        <List>
          {selectedUserData.applications.map((app, idx, appList) => (
            <>
              <ListItem className={classes.applicationItem}>
                <Typography>{app}</Typography>
                <IconButton>
                  <DeleteIcon />
                </IconButton>
              </ListItem>
              <Divider />
            </>
          ))}
        </List>
        <Paper className={classes.selectWrapper}>
          <FormControl variant="filled" className={classes.formControl}>
            <InputLabel htmlFor="filled-application-native-simple">Application</InputLabel>
            <Select
              className={classes.select}
              native
              //   value={state.age}
              //   onChange={handleChange}
              inputProps={{
                name: 'application',
                id: 'filled-application-native-simple',
              }}
            >
              <option aria-label="None" value="" />
              <option value={10}>Ten</option>
              <option value={20}>Twenty</option>
              <option value={30}>Thirty</option>
            </Select>
          </FormControl>
          <Button variant="outlined" className={classes.addBtn}>
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
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDetails);
