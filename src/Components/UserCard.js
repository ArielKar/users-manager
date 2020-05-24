import React from 'react';
import { Card, Typography, Avatar, CardContent, Box, Chip } from '@material-ui/core';

import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  card: {
    height: '100%',
  },
  cardContent: {
    paddingBottom: '0.5em',
    paddingLeft: '0.5em',
    paddingRight: '0.5em',
    '&:last-child': {
      paddingBottom: '0.5em',
    },
  },
  nameWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: '2em',
    marginBottom: '4em',
  },
  avatar: {
    height: '60px',
    width: '60px',
    marginBottom: '1em',
  },
  name: {
    fontWeight: 'bold',
    fontSize: '18px',
  },
  appsWrapper: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexWrap: 'wrap',
    borderTop: '1px solid #BDBDBD',
    paddingTop: '0.5em',
    minHeight: '86px',
    boxSizing: 'border-box',
  },
  chip: {
    marginBottom: '0.5em',
  },
}));

const UserCard = props => {
  const classes = useStyles();

  const { firstName, lastName, applications } = props;
  return (
    <Card className={classes.card}>
      <CardContent className={classes.cardContent}>
        <Box className={classes.nameWrapper}>
          <Avatar className={classes.avatar} />
          <Typography className={classes.name}>{`${firstName} ${lastName}`}</Typography>
        </Box>
        <Box className={classes.appsWrapper}>
          {applications.map((app, idx) => (
            <Chip
              label={app}
              variant="outlined"
              color="primary"
              key={`userapp${idx}`}
              className={classes.chip}
            />
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default UserCard;