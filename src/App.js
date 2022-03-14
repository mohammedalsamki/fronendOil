import React from 'react';
import { BrowserRouter as Router,Route,Switch,Link } from 'react-router-dom';
import './App.css';
import { Container,AppBar,Typography } from '@material-ui/core';

import OilGrade from './components/OilGrade/OilGrade';
import Brand from './components/Brand/Brand';
import OilUseg from './components/OilUseg/OilUseg';
import Capacity from './components/Capacity/Capacity';
import Home from './Home';
import useStyles from './styles';
import Unit from './components/Unit/Unit'


function App() {
  const classes= useStyles();
  return (
  
  <Router>
    <div className="App">
    <Container maxWidth="lg">
         <AppBar className={classes.appBar} position="static" color='inherit'>
          
          <Typography className={classes.heading} variant='h2' align='center'> oil creat and show </Typography>
          <div className="App">
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/OilGrade">OilGrade</Link>
                </li>
                <li>
                  <Link to="/Brand">Brand</Link>
                </li>                <li>
                  <Link to="/OilUseg">OilUseg</Link>
                </li>                <li>
                  <Link to="/Capacity">Capacity</Link>
                </li>
                <li>

                  <Link to="/unit">Unit</Link>
                </li>
              </ul>
          </div>
         </AppBar>
          <div>
           <Switch>
           <Route path="/" exact component={Home}></Route>
            <Route path="/OilGrade" component={OilGrade}></Route>
            <Route path="/Capacity" component={Capacity}></Route>
            <Route path="/OilUseg" component={OilUseg}></Route>
            <Route path="/Brand" component={Brand}></Route>
            <Route path="/unit" component={Unit}></Route>



            
            <Home/>
           </Switch>

          </div>

          </Container>
        
    </div>
    </Router>
  );
}

export default App;
