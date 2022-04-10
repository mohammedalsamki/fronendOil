import React, { useEffect, useState } from "react";
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { IconButton } from '@mui/material';
import Table from '@mui/material/Table';
import EditIcon from '@mui/icons-material/Edit';
import { ClassNames } from '@emotion/react';
import DeleteIcon from '@mui/icons-material/Delete';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Test from "./test";
import { NavLink} from 'react-router-dom';

import {
    Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@material-ui/core";
import "./styles.css";
import axios from 'axios';
import { styled } from '@mui/material/styles';
import ModalUnstyled from '@mui/base/ModalUnstyled';
import { Form } from 'semantic-ui-react';

const style = {
    position: 'absolute',
    top: '50%',
    left: '45%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'white',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4
  };
const StyledModal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Backdrop = styled('div')`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0);
  -webkit-tap-highlight-color: transparent;
`;
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
function ModalBox(props) {

  const [open, setOpen] = useState(false);
  const [state, setState] = useState({
    name: "",
    nameAR: ""
  });
  setState({
    name: "",
    nameAR: ""
  });

  // const handleChange = name => e => {
  //   setState({
  //     ...state,
  //     [name]: e.target.value
  //   });
  // };

  const handleClickOpen = () => {

    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>

        <h1>Pumps</h1>
        <NavLink activeClassName='active' to='/Pumbs/use'>Usge</NavLink>
        <br></br>
        <br></br>

      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Create New
      </Button>
      <br></br>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>

        <Test />
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              props.addDataSource(state.name, state.nameAR);
              setOpen(false);
            }}
            color="primary"
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

function Bumps() {
  const [bumpslList, setbumpslList]= React.useState([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () =>{ 
    
    setOpen(true)};
  const handleClose = () => {
    localStorage.clear();

    setOpen(false)};



  let [catName,setcatName]= React.useState(String);
  let [nameAR,setnameAR]= React.useState(String);
  let [name,setname]= React.useState(String);

  const [data, setData] = useState([]);

  function createData(id,name, provider) {
    // {bumpslList.map((lamps,key) =>createData(lamps.name,lamps.nameAr) )}
    alert('ia mahere')

    return [id, name, provider];
  }

  useEffect(async() => {
    await axios.get(`https://backoil.herokuapp.com/api/bumps/bumps/get`).then( (alllampssUseg) =>{
        setbumpslList(alllampssUseg.data);
      })
      console.log(bumpslList)
    setcatName(localStorage.getItem('catName'));
    // {bumpslList.map((lamps,key) =>createData(lamps.name,lamps.nameAr) )}
    const data = [
        bumpslList.map((lamps,key) =>createData(lamps._id,lamps.name,lamps.nameAr) )

    ];
    setData(data);
    console.log(data)
  }, []);
  const deletelampsUsge=(id)=>{
    axios.delete(`https://backoil.herokuapp.com/api/bumps/${id}`).then( () =>{
      window.location.reload(false);
    } )
  }



  const addDataSource = (name, nameAR) => {
    const updated = [...data];
    updated.push(createData(name, nameAR));
    setData(updated);
  };

  return (
    <div className="f-height fx-column-cont">
      <div>
        <h1>{catName}</h1>
        <ModalBox
          addDataSource={(name, nameAR) => addDataSource(name, nameAR)}
        />
      <br></br>

        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="customized table">
        <TableHead>
        <TableRow>
            <StyledTableCell align="center">id</StyledTableCell>
            <StyledTableCell align="center">Brand</StyledTableCell>
            <StyledTableCell align="center">Use</StyledTableCell>
            <StyledTableCell align="center">Note</StyledTableCell>
            <StyledTableCell align="center">BrandPartNumber</StyledTableCell>
            <StyledTableCell align="center">OEMPartNumber</StyledTableCell>
            <StyledTableCell align="center">StockNumber</StyledTableCell>
            <StyledTableCell align="center">MinQty</StyledTableCell>
            <StyledTableCell align="center">StockQuantity</StyledTableCell>
            <StyledTableCell align="center">UnitPrice</StyledTableCell>
            <StyledTableCell align="center">SaelsPrice</StyledTableCell>
            <StyledTableCell align="center">Update</StyledTableCell>
            <StyledTableCell align="center">Delete</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bumpslList.map((lamps,key) => (
            
            <StyledTableRow key={key}>
              <StyledTableCell align="center">{lamps._id}</StyledTableCell>
              <StyledTableCell align="center">{lamps.Brand}</StyledTableCell>
              <StyledTableCell align="center">{lamps.usedFor}</StyledTableCell>
              <StyledTableCell align="center">{lamps.Note}</StyledTableCell>
              <StyledTableCell align="center">{lamps.BrandPartNumber}</StyledTableCell>
              <StyledTableCell align="center">{lamps.OEMPartNumber}</StyledTableCell>
              <StyledTableCell align="center">{lamps.StockNumber}</StyledTableCell>
              <StyledTableCell align="center">{lamps.MinQty}</StyledTableCell>
              <StyledTableCell align="center">{lamps.StockQuantity}</StyledTableCell>
              <StyledTableCell align="center">{lamps.UnitPrice}</StyledTableCell>
              <StyledTableCell align="center">{lamps.SaelsPrice}</StyledTableCell>
              <StyledTableCell align="center">
                <IconButton aria-label='edit' onClick={()=>handleOpen()}>
                <EditIcon fontSize="small"/>
                  </IconButton>
              </StyledTableCell>

              <StyledTableCell align="center">
                <IconButton aria-label='delete' className={ClassNames.margin} onClick={()=> deletelampsUsge(lamps._id)}>
                  <DeleteIcon fontSize="small"/>
                  </IconButton>
                </StyledTableCell>


            </StyledTableRow>
          ))}
        </TableBody>
        </Table>
    </TableContainer>
       
      </div>
      <StyledModal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={open}
        onClose={handleClose}
        BackdropComponent={Backdrop}
      >
        <Box sx={style}>
          <div align="center">
          </div>
        <Form>
                <Form.Field align="center"  class="grid-container">
                    <label>namesAR</label>
                    <br></br>
                    <textarea name="nameAR"
                    type="text"
                    class="item1"
                    className='inputform'
                    style={{ width:"300px",height :'100px' }}
                    value={nameAR}
                        onChange={(e) => setnameAR(e.target.value)}
                        placeholder='nameAR' />
                </Form.Field>
                <Form.Field align="center"  class="grid-container">
                    <label>name</label>
                    <br></br>
                    <textarea name="name"
                    type="text"
                    class="item1"
                    className='inputform'
                    style={{ width:"300px",height :'100px' }}
                    value={name}
                        onChange={(e) => setname(e.target.value)}
                        placeholder='name' />
                </Form.Field>
                <Button type='submit' className='submitform' align="center" onClick={console.log("working")}>Update</Button>
            </Form>
        </Box>    
      </StyledModal>
    </div>
  );
}

export default Bumps;
