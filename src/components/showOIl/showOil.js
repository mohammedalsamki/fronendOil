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
import { async } from 'q';
import Select from 'react-select'



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
  left: '81%',

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
  left: '45%',
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


export default function ShowOilsData() {
  let history = useHistory();

  const [open, setOpen] = React.useState(false);
  const [unitList, setunitList] = React.useState(false);
  const getOptionsunit=async()=>{

    const res = await axios.get('https://backendoil.vercel.app/api/oil/unit')
    const data = res.data
    const options = data.map(d => ({
      "value" : d._id,
      "label" : d.UnitNameEn

    }))

    // this.setState({unitselectOptions: options})
    setunitList(options)
    console.log(unitList)
  }

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
    getOptionsunit();
    axios.get(`https://backendoil.vercel.app/api/oil/`).then( (allOils) =>{
      setOilList(allOils.data);
      localStorage.setItem('_id', _id)
    localStorage.setItem('Brand', Brand)
    localStorage.setItem('OilUsage', OilUsage)
    localStorage.setItem('OilGrade', OilGrade)
    localStorage.setItem('Capasity', Capasity)
    localStorage.setItem('Unit', Unit)
    localStorage.setItem('StockQuantiti', StockQuantiti)
    localStorage.setItem('UnitPrice', UnitPrice)
    localStorage.setItem('SaelsPrice', SaelsPrice)

    localStorage.setItem('ItemImage', ItemImage)
    localStorage.setItem('Note', Note)
    localStorage.setItem('StockNumber', StockNumber)
    localStorage.setItem('PartNumber', PartNumber)

    })
  },[]);
  const [Brand, setBrand]= React.useState('');
  const [_id,set_id]= React.useState('');
  let [OilUsage,setOilUsage]= React.useState('');
  let [UnitList,setUnitList]= React.useState('');

  let [OilGrade,setOilGrade]= React.useState('');
  let [Capasity,setCapasity]= React.useState('');
  let [Unit,setUnit]= React.useState('');
  let [StockQuantiti,setStockQuantiti]= React.useState('');
  let [UnitPrice,setUnitPrice]= React.useState('');
  let [SaelsPrice,setSaelsPrice]= React.useState('');

  let [ItemImage,setItemImage]= React.useState('');
  let [Note,setNote]= React.useState('');
  let [StockNumber,setStockNumber]= React.useState('');
  let [PartNumber,setPartNumber]= React.useState('');

  const setID=(_id,Brand,OilUsage,OilGrade,Capasity,Unit,StockNumber,ItemImage,Note,StockQuantiti,UnitPrice,SaelsPrice,PartNumber)=>{
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

    localStorage.setItem('ItemImage', ItemImage)
    localStorage.setItem('Note', Note)
    localStorage.setItem('StockNumber', StockNumber)
    localStorage.setItem('PartNumber', PartNumber)

    setBrand(localStorage.getItem('Brand'));
    set_id(localStorage.getItem('_id'));
    setOilUsage(localStorage.getItem('OilUsage'))
    setOilGrade(localStorage.getItem('OilGrade'))
    setCapasity(localStorage.getItem('Capasity'))
    setStockQuantiti(localStorage.getItem('StockQuantiti'))
    setUnitPrice(localStorage.getItem('UnitPrice'))
    setSaelsPrice(localStorage.getItem('SaelsPrice'))
    setUnit(localStorage.getItem('Unit'))

    setItemImage(localStorage.getItem('ItemImage'))
    setNote(localStorage.getItem('Note'))
    setStockNumber(localStorage.getItem('StockNumber'))
    setPartNumber(localStorage.getItem('PartNumber'))
  
  }
  const sendDataToAPI = () => {
    axios.put(`https://backendoil.vercel.app/api/oil/${_id}`, {
 
      StockQuantiti,
      UnitPrice,
      SaelsPrice
 
    }).then(() => {
alert("Updated")

      window.location.reload(false);

        localStorage.clear();
    })
}
// const onChangeHandler = (change) => {
//   setUnit({change});
// };

console.log(SaelsPrice,_id,UnitPrice,StockQuantiti,Unit)

  return (
    < >
    <h2>Oil & Fluid in Stock</h2>
    <TableContainer component={Paper} maxWidth="100%">
      <Table  sx={{ minWidth: 800 }} aria-label="customized table">
        <TableHead>
          <TableRow>
          <StyledTableCell align="center">Brand</StyledTableCell>
          <StyledTableCell align="center">Item Image</StyledTableCell>

            <StyledTableCell>Usges</StyledTableCell>
            <StyledTableCell align="center">Specifications</StyledTableCell>
            <StyledTableCell align="center">Capacity</StyledTableCell>
            <StyledTableCell align="center">Unit</StyledTableCell>
            <StyledTableCell align="center">Note</StyledTableCell>
            <StyledTableCell align="center">PartNumber</StyledTableCell>
            <StyledTableCell align="center">StockNumber</StyledTableCell>

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
              <StyledTableCell align="center">{oil.Brand}</StyledTableCell>
              <StyledTableCell align="center">
                <img src={oil.ItemImage} alt="not found" width="70" height="70"></img>
                </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                {oil.OilUsage}
              </StyledTableCell>
              <StyledTableCell align="center">{oil.OilGrade}</StyledTableCell>
              <StyledTableCell align="center">{oil.Capasity}</StyledTableCell>
              <StyledTableCell align="center">{oil.Unit}</StyledTableCell>

              <StyledTableCell align="center">{oil.Note}</StyledTableCell>
              <StyledTableCell align="center">{oil.PartNumber}</StyledTableCell>
              <StyledTableCell align="center">{oil.StockNumber}</StyledTableCell>

              <StyledTableCell align="center">{oil.StockQuantiti}</StyledTableCell>
              <StyledTableCell align="center">{oil.UnitPrice}</StyledTableCell>
              <StyledTableCell align="center">{oil.SaelsPrice}</StyledTableCell>
              <StyledTableCell align="center">
      <IconButton type="button"  onClick={()=>{
      setID(oil._id,oil.Brand,oil.OilUsage,oil.OilGrade,oil.Capasity,oil.Unit,oil.StockNumber,oil.ItemImage,oil.Note,oil.StockQuantiti,oil.UnitPrice,oil.SaelsPrice,oil.PartNumberoil);
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
                    <label>Capacity</label>
                    <input name="Capasity"
                    type="text"
                    class="item1"
                    className='inputform'
                    value={Capasity}
                        onChange={(e) => setCapasity(e.target.value)}
                        placeholder='Capasity' />

                </Form.Field>
        <h3>Unit</h3>

                <Select justifyContent="center" options={unitList}   onChange={(e) => setUnit(e.label)} />

                <Form.Field align="center" style={lotteryStyle} class="grid-container">
                    <label>Note</label>
                    <input name="Note"
                    type="text"
                    class="item1"
                    className='inputform'
                    value={Note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder='Note' />

                </Form.Field>
                <Form.Field align="center" style={lotteryStyle} class="grid-container">
                    <label>PartNumber</label>
                    <input name="PartNumber"
                    type="number"
                    class="item1"
                    className='inputform'
                    value={PartNumber}
                        onChange={(e) => setPartNumber(e.target.value)}
                        placeholder='PartNumber' />

                </Form.Field>
                <Form.Field align="center" style={lotteryStyle} class="grid-container">
                    <label>StockNumber</label>
                    <input name="StockNumber"
                    type="number"
                    class="item1"
                    className='inputform'
                    value={PartNumber}
                        onChange={(e) => setStockNumber(e.target.value)}
                        placeholder='StockNumber' />

                </Form.Field>
                <Form.Field align="center" style={lotteryStyle} class="grid-container">
                    <label>StockQuantiti</label>
                    <input name="StockQuantiti"
                    type="number"
                    class="item1"
                    className='inputform'
                    value={StockQuantiti}
                        onChange={(e) => setStockQuantiti(e.target.value)}
                        placeholder='StockQuantiti' />

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
