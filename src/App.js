import React from 'react';
import { Grid, Container } from '@material-ui/core';
import Header from './components/Header';
import UsersManager from './containers/UsersManager';
import { HEADER_HEIGHT } from './constants';

function App() {
  return (
    <Grid container direction="column">
      <Grid item>
        <Header />
      </Grid>
      <Grid item container>
        <Grid item xs={false} sm={1} />
        <Grid item xs={12} sm={10}>
          <Container style={{ paddingTop: HEADER_HEIGHT }}>
            <UsersManager />
          </Container>
        </Grid>
        <Grid item xs={false} sm={1} />
      </Grid>
    </Grid>
  );
}

export default App;
