import React from 'react';
import { USER_DRAWER_CONTENT_TYPE } from '../constants';
import AddUser from '../containers/AddUser';
import UserDetails from '../containers/UserDetails';
import { Grid } from '@material-ui/core';

const UsersDrawerContent = props => {
  const { drawerContentType } = props;

  const contentRenderer = () => {
    if (drawerContentType === USER_DRAWER_CONTENT_TYPE.new) {
      return <AddUser />;
    }
    if (drawerContentType === USER_DRAWER_CONTENT_TYPE.selected) {
      return <UserDetails />;
    }
    return null;
  };

  return <Grid container>{contentRenderer()}</Grid>;
};

export default UsersDrawerContent;
