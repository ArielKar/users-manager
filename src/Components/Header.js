import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import logo from '../assets/logo_coognitive.svg';

const useStyles = makeStyles(() => ({
  logoWrapper: {},
  logo: {
    height: '25px',
  },
  pageNameWrapper: {
    borderTop: '1px solid #fff',
  },
  pageName: {
    fontSize: '18px',
    letterSpacing: '2px',
  },
}));

const Header = () => {
  const classes = useStyles();
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Box>
          <Box className={classes.logoWrapper}>
            <img src={logo} className={classes.logo} alt="company logo" />
          </Box>
          <Box className={classes.pageNameWrapper}>
            <Typography className={classes.pageName}>Users Manager</Typography>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
