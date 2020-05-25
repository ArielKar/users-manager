import React, { useState } from 'react';
import {
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  Input,
  Chip,
  MenuItem,
  FormHelperText,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { APPLICATIONS_LIST } from '../constants';
import { validateForm } from '../utils/validations';
import { connect } from 'react-redux';
import { handleNewUser } from '../store/users/actions';

const useStyles = makeStyles(theme => {
  return {
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
    formContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: '1em',
      padding: '0 1em',
    },
    form: {
      width: '100%',
    },
    formControl: {
      width: '100%',
    },
    select: {
      margin: '0',
    },
    chips: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    chip: {
      margin: 2,
    },
  };
});

const AddUser = ({ addUser }) => {
  const formRequirments = {
    firstName: ['required', 'alpha'],
    lastName: ['required', 'alpha'],
    email: ['required', 'email'],
    applications: ['notEmptyList'],
  };

  const [userFormData, setUserFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    applications: [],
  });
  const [userFormErrors, setUserFormErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    applications: '',
  });
  const classes = useStyles();
  const getFullName = () => {
    if (userFormData.firstName || userFormData.lastName) {
      return `${userFormData.firstName} ${userFormData.lastName}`;
    }
    return <span>&nbsp;</span>;
  };

  const handleChange = (e, fieldId) => {
    setUserFormData({ ...userFormData, [fieldId]: e.target.value });
    setUserFormErrors({ ...userFormErrors, [fieldId]: '' });
  };

  const handleAppsSelectChange = e => {
    const applications = e.target.value;
    setUserFormData({ ...userFormData, applications });
    setUserFormErrors({ ...userFormErrors, applications: '' });
  };

  const handleFormSubmit = e => {
    e.preventDefault();
    const [isValid, errors] = validateForm(formRequirments)(userFormData);
    if (!isValid) {
      setUserFormErrors(errors);
      return;
    }
    addUser(userFormData);
  };

  return (
    <Box style={{ width: '100%' }}>
      <Box className={classes.detailsWrapper}>
        <Avatar className={classes.avatar} />
        <Typography style={{ fontSize: '24px', fontWeight: 'bold' }}>{getFullName()}</Typography>
        <Typography style={{ color: 'grey' }}>
          {userFormData.email || <span>&nbsp;</span>}
        </Typography>
      </Box>
      <Box className={classes.formContainer}>
        <form className={classes.form}>
          <div style={{ margin: '1em 0' }}>
            <TextField
              error={!!userFormErrors.firstName}
              helperText={userFormErrors.firstName}
              size="small"
              fullWidth
              id="firstName"
              label="First Name"
              type="text"
              value={userFormData.firstName}
              onChange={e => handleChange(e, 'firstName')}
              variant="outlined"
            />
          </div>
          <div style={{ margin: '1em 0' }}>
            <TextField
              error={!!userFormErrors.lastName}
              helperText={userFormErrors.lastName}
              size="small"
              fullWidth
              id="lastName"
              label="Last Name"
              type="text"
              value={userFormData.lastName}
              onChange={e => handleChange(e, 'lastName')}
              variant="outlined"
            />
          </div>
          <div style={{ margin: '1em 0' }}>
            <TextField
              error={!!userFormErrors.email}
              helperText={userFormErrors.email}
              size="small"
              fullWidth
              id="email"
              label="Email"
              type="email"
              value={userFormData.email}
              onChange={e => handleChange(e, 'email')}
              variant="outlined"
            />
          </div>
          <div style={{ margin: '1em 0' }}>
            <FormControl className={classes.formControl} error={!!userFormErrors.applications}>
              <InputLabel id="demo-mutiple-chip-label">Applications</InputLabel>
              <Select
                className={classes.select}
                size="small"
                labelId="demo-mutiple-chip-label"
                id="demo-mutiple-chip"
                multiple
                value={userFormData.applications}
                onChange={handleAppsSelectChange}
                input={<Input id="select-multiple-chip" />}
                renderValue={selected => (
                  <div className={classes.chips}>
                    {selected.map(value => (
                      <Chip key={value} label={value} className={classes.chip} />
                    ))}
                  </div>
                )}
              >
                {APPLICATIONS_LIST.map(name => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>{userFormErrors.applications}</FormHelperText>
            </FormControl>
          </div>
          <Button type="submit" onClick={handleFormSubmit} variant="contained" color="primary">
            Save
          </Button>
        </form>
      </Box>
    </Box>
  );
};

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    addUser: userData => dispatch(handleNewUser(userData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddUser);
