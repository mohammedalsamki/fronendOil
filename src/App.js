import React from 'react';

import { Container,AppBar,Typography, Grow,Grid } from '@material-ui/core';
import './App.css';
import ShowOil from './components/showOIl/showOil.js';
import CreatOil from './components/createOil/createOil.js';
import useStyles from './styles';
function App() {
  const classes= useStyles();
  return (
    <div className="App">
      <Container maxWidth="lg">
         <AppBar className={classes.appBar} position="static" color='inherit'>
         <Typography className={classes.heading} variant='h2' align='center'> oil creat and show </Typography>
         </AppBar>
         <Grow in>
           <Container>
             <Grid container justify="space-between" alignItems='strect'>
               <Grid item xs={12} sm={7}>
                 <AppBar className={classes.appBar} position='static' color='inherit'>

                     <ShowOil/> 

                 </AppBar>
              </Grid>

              <Grid item xs={12} sm={4}>
              <AppBar className={classes.appBar} position='static' color='inherit'>

                  <CreatOil/> 

              </AppBar>
              </Grid>


             </Grid>
           </Container>
         </Grow>
        </Container>

    </div>
  );
}

export default App;
