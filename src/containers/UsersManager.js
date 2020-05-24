import React from 'react';
import UserCard from '../components/UserCard';
import {
  Grid,
  Typography,
  Box,
  Button,
  TextField,
  InputAdornment,
  ButtonGroup,
  Container,
} from '@material-ui/core';
import { APPLICATIONS_LIST } from '../constants';
import { makeStyles } from '@material-ui/styles';
import SearchIcon from '@material-ui/icons/Search';

const users = [
  {
    email: 'example@examp.com',
    firstName: 'John',
    lastName: 'Doe',
    applications: ['Interactbot', 'Conversationow'],
  },
  {
    email: 'example@examp.com',
    firstName: 'John',
    lastName: 'Doe',
    applications: ['Paperless'],
  },
  {
    email: 'example@examp.com',
    firstName: 'John',
    lastName: 'Doe',
    applications: APPLICATIONS_LIST,
  },
  {
    email: 'example@examp.com',
    firstName: 'John',
    lastName: 'Doe',
    applications: APPLICATIONS_LIST,
  },
  {
    email: 'example@examp.com',
    firstName: 'John',
    lastName: 'Doe',
    applications: APPLICATIONS_LIST,
  },
  {
    email: 'example@examp.com',
    firstName: 'John',
    lastName: 'Doe',
    applications: APPLICATIONS_LIST,
  },
  {
    email: 'example@examp.com',
    firstName: 'John',
    lastName: 'Doe',
    applications: APPLICATIONS_LIST,
  },
  {
    email: 'example@examp.com',
    firstName: 'John',
    lastName: 'Doe',
    applications: APPLICATIONS_LIST,
  },
  {
    email: 'example@examp.com',
    firstName: 'John',
    lastName: 'Doe',
    applications: APPLICATIONS_LIST,
  },
  {
    email: 'example@examp.com',
    firstName: 'John',
    lastName: 'Doe',
    applications: APPLICATIONS_LIST,
  },
  {
    email: 'example@examp.com',
    firstName: 'John',
    lastName: 'Doe',
    applications: APPLICATIONS_LIST,
  },
  {
    email: 'example@examp.com',
    firstName: 'John',
    lastName: 'Doe',
    applications: APPLICATIONS_LIST,
  },
  {
    email: 'example@examp.com',
    firstName: 'John',
    lastName: 'Doe',
    applications: APPLICATIONS_LIST,
  },
  {
    email: 'example@examp.com',
    firstName: 'John',
    lastName: 'Doe',
    applications: APPLICATIONS_LIST,
  },
  {
    email: 'example@examp.com',
    firstName: 'John',
    lastName: 'Doe',
    applications: APPLICATIONS_LIST,
  },
];

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
  },
  searchInput: {
    '& .MuiOutlinedInput-root': {
      height: '40px',
      borderRadius: '20px',
    },
  },
  filtersWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
}));

const UsersManager = () => {
  const classes = useStyles();
  return (
    <Grid container>
      <Grid container item className={classes.topBarWrapper}>
        <Grid item xs={false} sm={1} />
        <Grid container item xs={12} sm={10}>
          <Container>
            <Box className={classes.topBar}>
              <Typography variant="h4">Users</Typography>
              <Button color="primary" variant="contained">
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
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="disabled" />
              </InputAdornment>
            ),
          }}
        />
        <Box className={classes.filtersWrapper}>
          <Typography>Filters:</Typography>
          <ButtonGroup variant="outlined">
            {APPLICATIONS_LIST.map((app, idx) => (
              <Button key={`appFilterBtn${idx}`}>{app}</Button>
            ))}
          </ButtonGroup>
        </Box>
      </Grid>
      <Grid container item spacing={4}>
        {users.map((user, idx) => (
          <Grid item xs={12} sm={6} md={3} key={`usertile${idx}`}>
            <UserCard {...user} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default UsersManager;
