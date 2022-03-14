import React from 'react';
import { Container,AppBar, Grow,Grid } from '@material-ui/core';
import ShowOil from './components/showOIl/showOil.js';
import CreatOil from './components/createOil/createOil.js';
import useStyles from './styles';

export default function  Home() {
  const classes= useStyles();
  return (
  
  
    <div className="App">
      <Container maxWidth="lg">

         <Grow in>
           <Container>
             <Grid container  alignItems='strect'>
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

