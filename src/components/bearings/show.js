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
import useStyles from '../../styles';
import AddIcon from '@mui/icons-material/Add';
import { AppBar } from '@material-ui/core';
import { NavLink} from 'react-router-dom';
import SearchBar from "material-ui-search-bar";
import Select from 'react-select'
import Createbearing from './create';






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


export default function ShowbearingData() {
  let history = useHistory();
  const [bearingList, setbearingList]= React.useState([]);
  const classes= useStyles();
  const [rows, setRows] = React.useState(bearingList);

  const [searched, setSearched] = React.useState(bearingList);

  const requestSearch = (searchedVal) => {
    const bearingedRows = bearingList.filter((bearingList) => {
      return bearingList.OEMPartNumber.toLowerCase().includes(searchedVal.toLowerCase());
    });

    setRows(bearingedRows);
  };
  const requestSearchCar = (searchedVal) => {
    const brakeedRows = bearingList.filter((brakeList) => {
      return brakeList.Note.toLowerCase().includes(searchedVal.toLowerCase());
    });

    setRows(brakeedRows);
  };
  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };
  const [originList, setoriginList] = React.useState(false);

  const getOptionsOrigin=async()=>{

    const res = await axios.get('https://backendapioill.herokuapp.com/api/bearing/use/get')
    const data = res.data
    const options = data.map(d => ({
      "value" : d._id,
      "label" : d.BearingsUsageEn


    }))

    // this.setState({unitselectOptions: options})
    setoriginList(options)
  }

  let [MinQty,setMinQty]= React.useState(0);
  let [Imagenew,setImagenew]= React.useState(String);

  const [open, setOpen] = React.useState(false);
  const [unitList, setunitList] = React.useState(false);
  const getOptionsunit=async()=>{

    
  }

  const handleOpen = () =>{ 
    
    setOpen(true)};
  const handleClose = () => {
    localStorage.clear();

    setOpen(false)};
  

  const deletebearing=(id)=>{
    let isExecuted = window.confirm("Are you sure to execute this action?");
    console.log(isExecuted);
    if(isExecuted){
    axios.delete(`https://backendapioill.herokuapp.com/api/bearing/${id}`).then( () =>{
      alert('delete done')
      
    window.location.reload(false);
    } )}
  }
  useEffect(async()=>{
    getOptionsunit();
    getOptionsOrigin();
   await axios.get(`https://backendapioill.herokuapp.com/api/bearing/Bearings/get`).then( (allbearings) =>{
      setbearingList(allbearings.data);
      setRows(allbearings.data);

      localStorage.setItem('_id', _id)
    localStorage.setItem('Brand', Brand)
    localStorage.setItem('usedFor', usedFor)
    localStorage.setItem('Unit', Unit)
    localStorage.setItem('StockQuantity', StockQuantity)
    localStorage.setItem('UnitPrice', UnitPrice)
    localStorage.setItem('SaelsPrice', SaelsPrice)

    localStorage.setItem('ItemImage', ItemImage)
    localStorage.setItem('Note', Note)
    localStorage.setItem('MinQty', MinQty)

    if(StockNumber===null){
      localStorage.setItem('StockNumber', 0)
    
    }else{
      localStorage.setItem('StockNumber', StockNumber)
    }  
    if(!OEMPartNumber){
      localStorage.setItem('OEMPartNumber', 0)
    
    }else{
      localStorage.setItem('OEMPartNumber', OEMPartNumber)
    } 
    })
    localStorage.setItem('BrandPartNumber', BrandPartNumber)

  },[]);
  const [Brand, setBrand]= React.useState('');
  const [_id,set_id]= React.useState('');
  let [usedFor,setusedFor]= React.useState('');

  let [Unit,setUnit]= React.useState('');
  let [StockQuantity,setStockQuantity]= React.useState('');
  let [UnitPrice,setUnitPrice]= React.useState('');
  let [SaelsPrice,setSaelsPrice]= React.useState('');

  let [ItemImage,setItemImage]= React.useState('');
  let [Note,setNote]= React.useState('');
  let [StockNumber,setStockNumber]= React.useState('');
  let [OEMPartNumber,setOEMPartNumber]= React.useState('');
  let [BrandPartNumber,setBrandPartNumber]= React.useState('');
  console.log(_id)

  const setID=(_id,Brand,usedFor,Unit,StockNumber,ItemImage,Note,StockQuantity,UnitPrice,SaelsPrice,OEMPartNumber,MinQty,BrandPartNumber)=>{
    // console.log(_id)
    localStorage.setItem('_id', _id)
    localStorage.setItem('Brand', Brand)
    localStorage.setItem('usedFor', usedFor)
    localStorage.setItem('Unit', Unit)
    localStorage.setItem('StockQuantity', StockQuantity)
    localStorage.setItem('UnitPrice', UnitPrice)
    localStorage.setItem('SaelsPrice', SaelsPrice)

    localStorage.setItem('ItemImage', ItemImage)
    localStorage.setItem('Note', Note)
    localStorage.setItem('StockNumber', StockNumber)
    localStorage.setItem('OEMPartNumber', OEMPartNumber)
    localStorage.setItem('BrandPartNumber', BrandPartNumber)
    localStorage.setItem('MinQty', MinQty)


    setBrand(localStorage.getItem('Brand'));
    set_id(localStorage.getItem('_id'));
    setusedFor(localStorage.getItem('usedFor'))
    setStockQuantity(localStorage.getItem('StockQuantity'))
    setUnitPrice(localStorage.getItem('UnitPrice'))
    setSaelsPrice(localStorage.getItem('SaelsPrice'))
    setUnit(localStorage.getItem('Unit'))
    setMinQty(localStorage.getItem('MinQty'))
    setItemImage(localStorage.getItem('ItemImage'))
    setNote(localStorage.getItem('Note'))
    if(MinQty===null){
      setMinQty(0)    }else{
      setMinQty(localStorage.getItem('MinQty'))
    }
    if(StockNumber===null){
      setStockNumber(0)    }else{
      setStockNumber(localStorage.getItem('StockNumber'))
    }
    if(OEMPartNumber===undefined){
      setOEMPartNumber(0)    }else{
        setOEMPartNumber(localStorage.getItem('OEMPartNumber'))
    }
    setBrandPartNumber(localStorage.getItem('BrandPartNumber'))

  }
  const handleFile = (e) =>{
    // console.log(e.target.files[0])
    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();
      console.log(reader)
      reader.onload = (e) => {
        setImagenew(reader.result);
        alert("image uploaded");
       console.log(Imagenew)

      };
      reader.readAsDataURL(e.target.files[0]);

    }
  }
  const sendDataToAPI = () => {
    axios.put(`https://backendapioill.herokuapp.com/api/bearing/${_id}`, {
 
      StockQuantity:StockQuantity,
      UnitPrice:UnitPrice,
      SaelsPrice:SaelsPrice,
      Note:Note,
      OEMPartNumber:OEMPartNumber,
      BrandPartNumber:BrandPartNumber,
      StockNumber:StockNumber,
      MinQty:MinQty,
      ItemImage:Imagenew,
      usedFor
    
 
    }).then(() => {
alert("Updated")

    // history.push('/bearing');
        localStorage.clear();
      window.location.reload(false);

    })
}
// const onChangeHandler = (change) => {
//   setUnit({change});
// };
const [openadd, setOpenadd] = React.useState(false);
const handleOpenAdd = () => setOpenadd(true);
const handleCloseAdd = () => setOpenadd(false);
console.log(SaelsPrice,_id,UnitPrice,StockQuantity)

  return (
    < >
                     <AppBar className={classes.appBar} position='static' color='inherit'  style={{ margin: "30px 10px 0px 0px"}}>
                 <div class="topnav">
                 <IconButton type="button" onClick={handleOpenAdd}>
                 <AddIcon fontSize="larg"/>
                 Add
                 </IconButton>
                 <NavLink activeClassName='active' to='/bearing/usage'>usedFor</NavLink>
          </div>

                 </AppBar>

    <div className="App">
      <StyledModal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={openadd}
        onClose={handleCloseAdd}
        BackdropComponent={Backdrop}
      >
        <Box sx={style}>
        <Createbearing /> 
        </Box>
      </StyledModal>  	
      </div>
    <h2>bearings in Stock</h2>
    <div >
    <SearchBar
          style={{ width:"400px",float:'left', marginLeft: '450px',border: '5px solid gray' }}
          value={searched}
          placeholder='Search by BrandPartNumber	'
          onChange={(searchVal) => requestSearch(searchVal)}
          onCancelSearch={() => cancelSearch()}
        />
            <SearchBar
          style={{ width:"400px",float:'left', marginLeft: '150px',border: '5px solid gray' }}
          value={searched}
          placeholder='Search by Car Modale	'
          onChange={(searchVal) => requestSearchCar(searchVal)}
          onCancelSearch={() => cancelSearch()}
        />


        </div>
    <TableContainer component={Paper} maxWidth="100%">
      <Table  sx={{ minWidth: 800 }} aria-label="customized table">
        <TableHead>
          <TableRow>
          <StyledTableCell align="center">Brand</StyledTableCell>
          <StyledTableCell align="center">Item Image</StyledTableCell>

            <StyledTableCell align="center">usedFor</StyledTableCell>
            <StyledTableCell align="center">Note</StyledTableCell>
            <StyledTableCell align="center">OEMPartNumber</StyledTableCell>
            <StyledTableCell align="center">BrandPartNumber</StyledTableCell>
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
          {rows.map((bearing,key) =>  {
            if(bearing.MinQty<bearing.StockQuantity){
            return(
            <StyledTableRow style={{backgroundColor: ''}} key={key}>
              <StyledTableCell align="center">{bearing.Brand}</StyledTableCell>
              <StyledTableCell align="center">
                <img src={bearing.ItemImage} alt="not found" width="70" height="70"></img>
                </StyledTableCell>
              <StyledTableCell align="center" component="th" scope="row">
                {bearing.usedFor}
              </StyledTableCell>

              <StyledTableCell align="center">{bearing.Note}</StyledTableCell>
              <StyledTableCell align="center">{bearing.OEMPartNumber}</StyledTableCell>
              <StyledTableCell align="center">{bearing.BrandPartNumber}</StyledTableCell>
              <StyledTableCell align="center">{bearing.StockNumber}</StyledTableCell>
              <StyledTableCell align="center">{bearing.MinQty}</StyledTableCell>

              <StyledTableCell align="center">{bearing.StockQuantity}</StyledTableCell>
              <StyledTableCell align="center">{bearing.UnitPrice}</StyledTableCell>
              <StyledTableCell align="center">{bearing.SaelsPrice}</StyledTableCell>
              <StyledTableCell align="center">
      <IconButton type="button"  onClick={()=>{
      setID(bearing._id,bearing.Brand,bearing.usedFor,bearing.Unit,bearing.StockNumber,bearing.ItemImage,bearing.Note,bearing.StockQuantity,bearing.UnitPrice,bearing.SaelsPrice,bearing.OEMPartNumber,bearing.MinQty,bearing.BrandPartNumber);
        handleOpen()}} >
                        <EditIcon fontSize="small"/>

      </IconButton>

    </StyledTableCell>

              <StyledTableCell align="center">
                <IconButton aria-label='delete' className={ClassNames.margin} onClick={()=> deletebearing(bearing._id)}>
                  <DeleteIcon fontSize="small"/>
                  </IconButton>
                </StyledTableCell>

            </StyledTableRow>
          )
        }else{
          return(
            <StyledTableRow style={{backgroundColor: 'red'}} key={key}>
              <StyledTableCell align="center">{bearing.Brand}</StyledTableCell>
              <StyledTableCell align="center">
                <img src={bearing.ItemImage} alt="not found" width="70" height="70"></img>
                </StyledTableCell>
              <StyledTableCell align="center" component="th" scope="row">
                {bearing.usedFor}
              </StyledTableCell>

              <StyledTableCell align="center">{bearing.Note}</StyledTableCell>
              <StyledTableCell align="center">{bearing.OEMPartNumber}</StyledTableCell>
              <StyledTableCell align="center">{bearing.BrandPartNumber}</StyledTableCell>
              <StyledTableCell align="center">{bearing.StockNumber}</StyledTableCell>
              <StyledTableCell align="center">{bearing.MinQty}</StyledTableCell>

              <StyledTableCell align="center">{bearing.StockQuantity}</StyledTableCell>
              <StyledTableCell align="center">{bearing.UnitPrice}</StyledTableCell>
              <StyledTableCell align="center">{bearing.SaelsPrice}</StyledTableCell>
              <StyledTableCell align="center">
      <IconButton type="button"  onClick={()=>{
      setID(bearing._id,bearing.Brand,bearing.usedFor,bearing.Unit,bearing.StockNumber,bearing.ItemImage,bearing.Note,bearing.StockQuantity,bearing.UnitPrice,bearing.SaelsPrice,bearing.OEMPartNumber,bearing.MinQty,bearing.BrandPartNumber);
        handleOpen()}} >
                        <EditIcon fontSize="small"/>

      </IconButton>

    </StyledTableCell>

              <StyledTableCell align="center">
                <IconButton aria-label='delete' className={ClassNames.margin} onClick={()=> deletebearing(bearing._id)}>
                  <DeleteIcon fontSize="small"/>
                  </IconButton>
                </StyledTableCell>

            </StyledTableRow>

          )
        
        
        }
          
      })}
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


          <h2>usedFor: {usedFor}</h2>

          <Select placeholder="{usedFor}" options={originList}   onChange={(e) => setusedFor(e.label)} />

          </div>
          <br></br>
        <Form>


        
                <Form.Field align="center"  class="grid-container">
                    <label>Note</label>
                    <br></br>
                    <textarea name="Note"
                    type="text"
                    class="item1"
                    className='inputform'
                    style={{ width:"300px",height :'100px' }}
                    value={Note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder='Note' />

                </Form.Field>
                <Form.Field align="center"  class="grid-container">
                    <label>image</label>
                    <br></br>
                    <input name="image"
                    type="file"
                    class="item1"
                    className='inputform'
                    // value={}
                        onChange={(e) => handleFile(e)}
                        placeholder='image' />

                </Form.Field>
                <Form.Field align="center"  class="grid-container">
                    <label>OEMPartNumber</label>
                    <br></br>
                    <input name="OEMPartNumber"
                    type="text"
                    class="item1"
                    className='inputform'
                    value={OEMPartNumber}
                        onChange={(e) => setOEMPartNumber(e.target.value)}
                        placeholder='OEMPartNumber' />

                </Form.Field>
                <Form.Field align="center"  class="grid-container">
                    <label>BrandPartNumber</label>
                    <br></br>
                    <input name="BrandPartNumber"
                    type="text"
                    class="item1"
                    className='inputform'
                    value={BrandPartNumber}
                        onChange={(e) => setBrandPartNumber(e.target.value)}
                        placeholder='OEMPartNumber' />

                </Form.Field>
                <Form.Field align="center"  class="grid-container">
                    <label>StockNumber</label>
                    <br></br>
                    <input name="StockNumber"
                    type="text"
                    class="item1"
                    className='inputform'
                    value={StockNumber}
                        onChange={(e) => setStockNumber(e.target.value)}
                        placeholder='StockNumber' />

                </Form.Field>
                <Form.Field align="center"  class="grid-container">
                    <label>StockQuantity</label>
                    <br></br>
                    <input name="StockQuantity"
                    type="number"
                    class="item1"
                    className='inputform'
                    value={StockQuantity}
                        onChange={(e) => setStockQuantity(e.target.value)}
                        placeholder='StockQuantity' />

                </Form.Field>
                <Form.Field align="center"  class="grid-container">
                    <label>MinQty</label>
                    <br></br>
                    <input name="MinQty"
                    type="number"
                    class="item1"
                    className='inputform'
                    value={MinQty}
                        onChange={(e) => setMinQty(e.target.value)}
                        placeholder='MinQty' />

                </Form.Field>

                <Form.Field align="center">
                    <label>UnitPrice</label>
                    <br></br>
                    <input name="UnitPrice"
                    type="number"
                    className='inputform'
                    value={UnitPrice}
                        onChange={(e) => setUnitPrice(e.target.value)}
                        placeholder='UnitPrice' />
                </Form.Field>
                <Form.Field align="center">
                    <label>SaelsPrice</label>
                    <br></br>
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
