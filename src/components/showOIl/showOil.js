import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect } from 'react';
import axios from 'axios';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {  Box } from '@mui/system';
import ModalUnstyled from '@mui/base/ModalUnstyled';
import { ClassNames } from '@emotion/react';
import { useHistory } from 'react-router';
import { Form, Button } from 'semantic-ui-react';
import EditIcon from '@mui/icons-material/Edit';


const lotteryStyle={
  // border: '2px solid grey',
  // borderRadius: '10px',
  width:'40em',
  textAlign:'left',

}
const lotteryStyle1={
  // border: '2px solid grey',
  // borderRadius: '10px',
  width:'40em',
  textAlign:'left',
  position: 'absolute',
  top: '41%',
  left: '83%',

}

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

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
};


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
let BAC_URL=process.env.BACE_URL
console.log(BAC_URL)

export default function ShowOilsData() {
  let history = useHistory();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () =>{ 
    
    setOpen(true)};
  const handleClose = () => {
    localStorage.clear();

    setOpen(false)};
  const [oilList, setOilList]= React.useState([]);
  

  const deleteOil=(id)=>{
    axios.delete(`https://backendoil.vercel.app/api/oil/${id}`).then( () =>{
      window.location.reload(false);
    } )
  }
  useEffect(()=>{
    axios.get(`https://backendoil.vercel.app/api/oil/`).then( (allOils) =>{
      setOilList(allOils.data);

    })
  },[]);
  const [Brand, setBrand]= React.useState('');
  const [_id,set_id]= React.useState('');
  let [OilUsage,setOilUsage]= React.useState('');
  let [OilGrade,setOilGrade]= React.useState('');
  let [Capasity,setCapasity]= React.useState('');
  let [Unit,setUnit]= React.useState('');
  let [StockQuantiti,setStockQuantiti]= React.useState('');
  let [UnitPrice,setUnitPrice]= React.useState('');
  let [SaelsPrice,setSaelsPrice]= React.useState('');
  const setID=(_id,Brand,OilUsage,OilGrade,Capasity,Unit,StockQuantiti,UnitPrice,SaelsPrice)=>{
    console.log(_id)
    localStorage.setItem('_id', _id)
    localStorage.setItem('Brand', Brand)
    localStorage.setItem('OilUsage', OilUsage)
    localStorage.setItem('OilGrade', OilGrade)
    localStorage.setItem('Capasity', Capasity)
    localStorage.setItem('Unit', Unit)
    localStorage.setItem('StockQuantiti', StockQuantiti)
    localStorage.setItem('UnitPrice', UnitPrice)
    localStorage.setItem('SaelsPrice', SaelsPrice)
    setBrand(localStorage.getItem('Brand'));
    set_id(localStorage.getItem('_id'));
    setOilUsage(localStorage.getItem('OilUsage'))
    setOilGrade(localStorage.getItem('OilGrade'))
    setCapasity(localStorage.getItem('Capasity'))
    setStockQuantiti(localStorage.getItem('StockQuantiti'))
    setUnitPrice(localStorage.getItem('UnitPrice'))
    setSaelsPrice(localStorage.getItem('UnitPrice'))
  
  }
  const sendDataToAPI = () => {
    axios.put(`https://backendoil.vercel.app/api/oil/${_id}`, {
      Brand,
      OilUsage,
      OilGrade,
      Capasity,
      Unit,
      StockQuantiti,
      UnitPrice,
      SaelsPrice
    }).then(() => {
      window.location.reload(false);
        localStorage.clear();
    })
}
console.log(SaelsPrice)

  return (
    < >
    <h2>All Oil & Fluid in Stock</h2>
    <TableContainer component={Paper} >
      <Table  sx={{ minWidth: 800 }} aria-label="customized table">
        <TableHead>
          <TableRow>
          <StyledTableCell align="center">ID</StyledTableCell>
          <StyledTableCell align="center">Brand</StyledTableCell>
            <StyledTableCell>Usges</StyledTableCell>
            <StyledTableCell align="center">Specifications</StyledTableCell>
            <StyledTableCell align="center">Capacity</StyledTableCell>
            <StyledTableCell align="center">Unit</StyledTableCell>
            <StyledTableCell align="center">StockQuantiti</StyledTableCell>
            <StyledTableCell align="center">UnitPrice</StyledTableCell>
            <StyledTableCell align="center">SaelsPrice</StyledTableCell>
            <StyledTableCell align="center">Update</StyledTableCell>

            <StyledTableCell align="center">Delete</StyledTableCell>


          </TableRow>
        </TableHead>
        <TableBody>
          {oilList.map((oil,key) => (
            <StyledTableRow key={key}>
              <StyledTableCell align="center">{oil._id}</StyledTableCell>
              <StyledTableCell align="center">{oil.Brand}</StyledTableCell>

              <StyledTableCell component="th" scope="row">
                {oil.OilUsage}
              </StyledTableCell>
              <StyledTableCell align="center">{oil.OilGrade}</StyledTableCell>
              <StyledTableCell align="center">{oil.Capasity}</StyledTableCell>
              <StyledTableCell align="center">{oil.Unit}</StyledTableCell>
              <StyledTableCell align="center">{oil.StockQuantiti}</StyledTableCell>
              <StyledTableCell align="center">{oil.UnitPrice}</StyledTableCell>
              <StyledTableCell align="center">{oil.SaelsPrice}</StyledTableCell>
              <StyledTableCell align="center">
      <IconButton type="button"  onClick={()=>{
{        setID(oil._id,oil.Brand,oil.OilUsage,oil.OilGrade,
          oil.Capasity,oil.Unit,oil.StockQuantiti,oil.UnitPrice,oil.SaelsPrice)}
        handleOpen()}} >
                        <EditIcon fontSize="small"/>

      </IconButton>

    </StyledTableCell>

              <StyledTableCell align="center">
                <IconButton aria-label='delete' className={ClassNames.margin} onClick={()=> deleteOil(oil._id)}>
                  <DeleteIcon fontSize="small"/>
                  </IconButton>
                </StyledTableCell>

            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <StyledModal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={open}
        onClose={handleClose}
        BackdropComponent={Backdrop}
      >
        <Box sx={style}>
          <div align="center">
          <h2>Brand: {Brand}</h2>
          <h3>Usges:  {OilUsage}</h3>
          <h3>Specifications: {OilGrade}</h3>


          </div>
        <Form>
                <Form.Field align="center" style={lotteryStyle} class="grid-container">
                    <label>StockQuantiti</label>
                    <input name="StockQuantiti"
                    type="number"
                    class="item1"
                    className='inputform'
                    value={StockQuantiti}
                        onChange={(e) => setStockQuantiti(e.target.value)}
                        placeholder='StockQuantiti' />
                <h3 style={lotteryStyle1} >Unit : {Unit} </h3>

                </Form.Field>

                <Form.Field align="center">
                    <label>UnitPrice</label>
                    <input name="UnitPrice"
                    type="number"
                    className='inputform'
                    value={UnitPrice}
                        onChange={(e) => setUnitPrice(e.target.value)}
                        placeholder='UnitPrice' />
                </Form.Field>
                <Form.Field align="center">
                    <label>SaelsPrice</label>
                    <input
                        name="SaelsPrice"
                    className='inputform'
                    type="number"
                    value={SaelsPrice}
                        placeholder='SaelsPrice'
                        onChange={(e) => setSaelsPrice(e.target.value)}
                    />
                </Form.Field>
                <Button type='submit' className='submitform' align="center" onClick={sendDataToAPI}>Update</Button>
            </Form>
        </Box>
      </StyledModal>
    </>
  );
}
