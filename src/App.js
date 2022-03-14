import React from 'react';
import { BrowserRouter as Router,Route,Switch,Link } from 'react-router-dom';
import './App.css';
import { Container,AppBar,Typography } from '@material-ui/core';

import OilGrade from './components/OilGrade/OilGrade';
// import Brand from './components/Brand/Brand';
import OilUseg from './components/OilUseg/OilUseg';
// import Capacity from './components/Capacity/Capacity';
import Home from './Home';
import useStyles from './styles';
import Test from './components/createOil/test';
import Test1 from './components/createOil/test2';


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
                  <Link to="/Test">Brand</Link>
                </li>                <li>
                  <Link to="/OilUseg">OilUseg</Link>
                </li>                <li>
                  <Link to="/Test1">Test1</Link>
                </li>
              </ul>
          </div>
         </AppBar>
          <div>
           <Switch>
           <Route path="/" exact component={Home}></Route>
            <Route path="/OilGrade" component={OilGrade}></Route>
            <Route path="/Test" component={Test}></Route>
            <Route path="/OilUseg" component={OilUseg}></Route>
            <Route path="/Test1" component={Test1}></Route>


            
            <Home/>
           </Switch>

          </div>

          </Container>
        
    </div>
    </Router>
  );
}

export default App;
