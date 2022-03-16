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
             <Grid container  alignItems='strect' style={{ margin: "0px 20px 0px 0px"}}>
               <Grid item xs={15} sm={7} >
                 <AppBar className={classes.appBar} position='static' color='inherit' style={{ margin: "30px 100px 0px 0px"}}>

                     <ShowOil style={{color: "red", margin: "100px 25px 75px 100px"}}/> 

                 </AppBar>
              </Grid>
             <div></div>
              <Grid item xs={7} sm={3} style={{   padding: "0px 0px 10px 15px"}}>
              <AppBar className={classes.appBar} position='static' color='black' >

                  <CreatOil /> 

              </AppBar>
              </Grid>


             </Grid>
           </Container>
         </Grow>
        </Container>

    </div>

  );
}

