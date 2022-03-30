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
import Createlamps from './lampsCreate';
import Select from 'react-select'
import { async } from 'q';






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


export default function ShowlampsData() {
  let history = useHistory();
  const [lampsList, setlampsList]= React.useState([]);
  const [ES, setES]= React.useState([]);
  const [EStander, setEStander]= React.useState([]);


  const classes= useStyles();
  const [rows, setRows] = React.useState(lampsList);
  let [Capasity,setCapasity]= React.useState('');

  const [searched, setSearched] = React.useState(lampsList);

  const requestSearch = (searchedVal) => {
    const lampsedRows = lampsList.filter((lampsList) => {
      return lampsList.BrandPartNumber.toLowerCase().includes(searchedVal.toLowerCase());
    });

    setRows(lampsedRows);
  };
  const requestSearchCar = (searchedVal) => {
    const lampsedRows = lampsList.filter((lampsList) => {
      return lampsList.Note.toLowerCase().includes(searchedVal.toLowerCase());
    });

    setRows(lampsedRows);
  };
  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };

  let [MinQty,setMinQty]= React.useState(0);
  let [Imagenew,setImagenew]= React.useState(String);

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
  const getOptionsES=async()=>{

    const res = await axios.get('https://backendoil.vercel.app/api/lamps/lamps/EStander')
    const data = res.data
    const options = data.map(d => ({
      "value" : d._id,
      "label" : d.EStanderEn

    }))

    // this.setState({unitselectOptions: options})
    setES(options)
    console.log(unitList)
  }

  const handleOpen = () =>{ 
    
    setOpen(true)};
  const handleClose = () => {
    localStorage.clear();

    setOpen(false)};
  

  const deletelamps=(id)=>{
    let isExecuted = window.confirm("Are you sure to execute this action?");
    console.log(isExecuted);
    if(isExecuted){
    axios.delete(`https://backendoil.vercel.app/api/lamps/lamps/${id}`).then( () =>{
      alert('delete done')
      
    window.location.reload(false);
    } )}
  }
  useEffect(async()=>{
    getOptionsunit();
    getOptionsES();
    await axios.get(`https://backendoil.vercel.app/api/lamps/lamps/`).then( (alllampss) =>{
      setlampsList(alllampss.data);
      setRows(alllampss.data);

      localStorage.setItem('_id', _id)
    localStorage.setItem('Brand', Brand)
    localStorage.setItem('EStander', EStander)
    
    localStorage.setItem('lampsUsage', lampsUsage)
    localStorage.setItem('Unit', Unit)
    localStorage.setItem('StockQuantiti', StockQuantiti)
    localStorage.setItem('UnitPrice', UnitPrice)
    localStorage.setItem('SaelsPrice', SaelsPrice)
    localStorage.setItem('Capasity', Capasity)

    localStorage.setItem('ItemImage', ItemImage)
    localStorage.setItem('Note', Note)
    localStorage.setItem('MinQty', MinQty)

    if(StockNumber===null){
      localStorage.setItem('StockNumber', 0)
    
    }else{
      localStorage.setItem('StockNumber', StockNumber)
    }  

      localStorage.setItem('OEMPartNumber', OEMPartNumber)
    })
  },[]);
  const [Brand, setBrand]= React.useState('');
  const [_id,set_id]= React.useState('');
  let [lampsUsage,setlampsUsage]= React.useState('');

  let [Unit,setUnit]= React.useState('');
  let [StockQuantiti,setStockQuantiti]= React.useState('');
  let [UnitPrice,setUnitPrice]= React.useState('');
  let [SaelsPrice,setSaelsPrice]= React.useState('');

  let [ItemImage,setItemImage]= React.useState('');
  let [Note,setNote]= React.useState('');
  let [StockNumber,setStockNumber]= React.useState('');
  let [OEMPartNumber,setOEMPartNumber]= React.useState('');
  let [BrandPartNumber,setBrandPartNumber]= React.useState('');
  console.log(_id)

  const setID=(_id,Capasity,Brand,lampsUsage,Unit,StockNumber,ItemImage,Note,StockQuantiti,UnitPrice,SaelsPrice,OEMPartNumber,MinQty,BrandPartNumber,EStander)=>{
    // console.log(_id)
    localStorage.setItem('_id', _id)
    localStorage.setItem('Brand', Brand)
    localStorage.setItem('EStander', EStander)
    localStorage.setItem('lampsUsage', lampsUsage)
    localStorage.setItem('Unit', Unit)
    localStorage.setItem('StockQuantiti', StockQuantiti)
    localStorage.setItem('UnitPrice', UnitPrice)
    localStorage.setItem('SaelsPrice', SaelsPrice)

    localStorage.setItem('ItemImage', ItemImage)
    localStorage.setItem('Note', Note)
    localStorage.setItem('StockNumber', StockNumber)
    localStorage.setItem('OEMPartNumber', OEMPartNumber)
    localStorage.setItem('BrandPartNumber', BrandPartNumber)
    localStorage.setItem('MinQty', MinQty)
    localStorage.setItem('Capasity', Capasity)


    setCapasity(localStorage.getItem('Capasity'))
    setEStander(localStorage.getItem('EStander'))


    setBrand(localStorage.getItem('Brand'));
    set_id(localStorage.getItem('_id'));
    setlampsUsage(localStorage.getItem('lampsUsage'))
    setStockQuantiti(localStorage.getItem('StockQuantiti'))
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

    setStockNumber(localStorage.getItem('StockNumber'))

    setOEMPartNumber(localStorage.getItem('OEMPartNumber'))
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
    axios.put(`https://backendoil.vercel.app/api/lamps/lamps/${_id}`, {
 
      StockQuantiti:StockQuantiti,
      UnitPrice:UnitPrice,
      SaelsPrice:SaelsPrice,
      Note:Note,
      EStander:EStander,
      Unit:Unit,
      Capasity:Capasity,
      OEMPartNumber:OEMPartNumber,
      BrandPartNumber:BrandPartNumber,
      StockNumber:StockNumber,
      MinQty:MinQty,
      ItemImage:Imagenew
    
 
    }).then(() => {
alert("Updated")

    // history.push('/lamps');
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
console.log(SaelsPrice,_id,UnitPrice,StockQuantiti)

  return (
    < >
                     <AppBar className={classes.appBar} position='static' color='inherit'  style={{ margin: "30px 10px 0px 0px"}}>
                 <div class="topnav">
                 <IconButton type="button" onClick={handleOpenAdd}>
                 <AddIcon fontSize="larg"/>
                 Add
                 </IconButton>
                 <NavLink activeClassName='active' to='/lampusage'>Usge</NavLink>
                 <NavLink activeClassName='active' to='/EStander'>EStander</NavLink>

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
        <Createlamps /> 
        </Box>
      </StyledModal>  	
      </div>
    <h2>lampss in Stock</h2>
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

            <StyledTableCell align="center">EStander</StyledTableCell>
            <StyledTableCell align="center">Usge</StyledTableCell>
            <StyledTableCell align="center">Note</StyledTableCell>
            <StyledTableCell align="center">Capacity</StyledTableCell>
            <StyledTableCell align="center">Color</StyledTableCell>
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
          {rows.map((lamps,key) =>  {
            if(lamps.MinQty<lamps.StockQuantiti){
            return(
            <StyledTableRow style={{backgroundColor: ''}} key={key}>
              <StyledTableCell align="center">{lamps.Brand}</StyledTableCell>
              <StyledTableCell align="center">
                <img src={lamps.ItemImage} alt="not found" width="70" height="70"></img>
                </StyledTableCell>
              <StyledTableCell align="center" component="th" scope="row">
                {lamps.EStander}
              </StyledTableCell>
              <StyledTableCell align="center" component="th" scope="row">
                {lamps.lampsUsage}
              </StyledTableCell>

              <StyledTableCell align="center">{lamps.Note}</StyledTableCell>
              <StyledTableCell align="center">{lamps.Capasity}</StyledTableCell>
            <StyledTableCell align="center">{lamps.Unit}</StyledTableCell>
              <StyledTableCell align="center">{lamps.OEMPartNumber}</StyledTableCell>
              <StyledTableCell align="center">{lamps.BrandPartNumber}</StyledTableCell>

              <StyledTableCell align="center">{lamps.StockNumber}</StyledTableCell>
              <StyledTableCell align="center">{lamps.MinQty}</StyledTableCell>

              <StyledTableCell align="center">{lamps.StockQuantiti}</StyledTableCell>
              <StyledTableCell align="center">{lamps.UnitPrice}</StyledTableCell>
              <StyledTableCell align="center">{lamps.SaelsPrice}</StyledTableCell>
              <StyledTableCell align="center">
      <IconButton type="button"  onClick={()=>{
      setID(lamps._id,lamps.Capasity,lamps.Brand,lamps.lampsUsage,lamps.Unit,lamps.StockNumber,lamps.ItemImage,lamps.Note,lamps.StockQuantiti,lamps.UnitPrice,lamps.SaelsPrice,lamps.OEMPartNumber,lamps.MinQty,lamps.BrandPartNumber,lamps.EStander);
        handleOpen()}} >
                        <EditIcon fontSize="small"/>

      </IconButton>

    </StyledTableCell>

              <StyledTableCell align="center">
                <IconButton aria-label='delete' className={ClassNames.margin} onClick={()=> deletelamps(lamps._id)}>
                  <DeleteIcon fontSize="small"/>
                  </IconButton>
                </StyledTableCell>

            </StyledTableRow>
          )
        }else{
          return(
            <StyledTableRow style={{backgroundColor: 'red'}} key={key}>
              <StyledTableCell align="center">{lamps.Brand}</StyledTableCell>
              <StyledTableCell align="center">
                <img src={lamps.ItemImage} alt="not found" width="70" height="70"></img>
                </StyledTableCell>
                <StyledTableCell align="center" component="th" scope="row">
                {lamps.EStander}
              </StyledTableCell>
              <StyledTableCell align="center" component="th" scope="row">
                {lamps.lampsUsage}
              </StyledTableCell>

              <StyledTableCell align="center">{lamps.Note}</StyledTableCell>
              <StyledTableCell align="center">{lamps.Capasity}</StyledTableCell>
            <StyledTableCell align="center">{lamps.Unit}</StyledTableCell>
              <StyledTableCell align="center">{lamps.OEMPartNumber}</StyledTableCell>
              <StyledTableCell align="center">{lamps.BrandPartNumber}</StyledTableCell>
              <StyledTableCell align="center">{lamps.StockNumber}</StyledTableCell>
              <StyledTableCell align="center">{lamps.MinQty}</StyledTableCell>

              <StyledTableCell align="center">{lamps.StockQuantiti}</StyledTableCell>
              <StyledTableCell align="center">{lamps.UnitPrice}</StyledTableCell>
              <StyledTableCell align="center">{lamps.SaelsPrice}</StyledTableCell>
              <StyledTableCell align="center">
      <IconButton type="button"  onClick={()=>{
      setID(lamps._id,lamps.Capasity,lamps.Brand,lamps.lampsUsage,lamps.Unit,lamps.StockNumber,lamps.ItemImage,lamps.Note,lamps.StockQuantiti,lamps.UnitPrice,lamps.SaelsPrice,lamps.OEMPartNumber,lamps.MinQty,lamps.BrandPartNumber,lamps.EStander);
        handleOpen()}} >
                        <EditIcon fontSize="small"/>

      </IconButton>

    </StyledTableCell>

              <StyledTableCell align="center">
                <IconButton aria-label='delete' className={ClassNames.margin} onClick={()=> deletelamps(lamps._id)}>
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
          <h3>Usges:  {lampsUsage}</h3>




          </div>
        <Form>

        <Form.Field align="center"  class="grid-container">

        <br></br>
        <br></br>

        <Select placeholder='EStander' options={ES}   onChange={(e) => setEStander(e.label)} />
        </Form.Field>

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
                <Form.Field >
                    <label>Capacity</label>
                    <br></br>
                    <input name="Color"
                    type="text"
                    class="item1"
                    className='inputform'
                    value={Unit}
                        onChange={(e) => setUnit(e.target.value)}
                        placeholder='Color' />

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
                        placeholder='BrandPartNumber' />

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
                    <label>StockQuantiti</label>
                    <br></br>
                    <input name="StockQuantiti"
                    type="number"
                    class="item1"
                    className='inputform'
                    value={StockQuantiti}
                        onChange={(e) => setStockQuantiti(e.target.value)}
                        placeholder='StockQuantiti' />

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
