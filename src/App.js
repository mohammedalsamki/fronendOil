import React, { useState } from "react";
import { BrowserRouter as Router,Route,NavLink,Switch} from 'react-router-dom';
import './App.css';
import { Container,AppBar,Typography } from '@material-ui/core';
import Brand from './components/Brand/Brand';
import OilUseg from './components/OilUseg/OilUseg';
import Home from './Home';
import useStyles from './styles';
import Unit from './components/Unit/Unit'
import  AddEdit  from './components/CRUD/Update';
import UpdateUnit from './components/Unit/UpdateUnit';
import UpdateBrand from './components/Brand/UpdateBrand';
import './components/style/naz.css'
import AddSpec from './components/OilUseg/OilUsageModal';



function App() {
  
  const classes= useStyles();
  return (
  
  <Router>
    <div className="App">
    <Container maxWidth="100%">
         <AppBar className={classes.appBar} position="static" color='inherit'>
          
          <Typography className={classes.heading} variant='h2' align='center'> Ontario Storehouse</Typography>
         <br></br>

          <div class="topnav">
          <NavLink exact={true} activeClassName='active' to='/'>Home</NavLink>
          <NavLink activeClassName='active' to='/Brand'>Brand</NavLink>
          <NavLink activeClassName='active' to='/Oil_Fluid'>Oil's & Fluid's</NavLink>

          </div>
          
         <br></br>
         </AppBar>
          <div>
           <Switch>
           <Route path="/Oil_Fluid" exact component={Home}></Route>
            <Route path="/OilUseg" component={OilUseg}></Route>
            <Route path="/Brand" component={Brand}></Route>
            <Route path="/unit" component={Unit}></Route>
            <Route path="/update" component={AddEdit}></Route>
            <Route path="/spec" component={AddSpec}></Route>

            <Route path="/delete" component={Unit}></Route>
            <Route path="/UpdateUnit" component={UpdateUnit}></Route>
            <Route path="/UpdateBrand" component={UpdateBrand}></Route>
            

            {/* <Home/> */}
           </Switch>

          </div>

          </Container>
        
    </div>
    </Router>
  );
}

export default App;
