import React from 'react';
import { Grid } from '@material-ui/core';
import Header from './Components/Header';

function App() {
  return (
    <Grid container direction="column">
      <Grid item>
        <Header />
      </Grid>
      <Grid item container>
        <Grid xs={0} sm={2} />
        <Grid item xs={12} sm={8}>
          This is the main content
        </Grid>
        <Grid xs={0} sm={2} />
      </Grid>
    </Grid>
  );
}

export default App;
