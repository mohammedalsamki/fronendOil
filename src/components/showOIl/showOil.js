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
import { Form, Button } from 'semantic-ui-react';
import EditIcon from '@mui/icons-material/Edit';
import Select from 'react-select'
// import SelectField from "material-ui/SelectField";
// import MenuItem from "material-ui/MenuItem";
import SearchBar from "material-ui-search-bar";







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

  const [Brand, setBrand]= React.useState('');
  const [_id,set_id]= React.useState('');
  let [OilUsage,setOilUsage]= React.useState('');
  let [OilGrade,setOilGrade]= React.useState('');
  let [Capasity,setCapasity]= React.useState('');
  let [Unit,setUnit]= React.useState('');
  let [StockQuantiti,setStockQuantiti]= React.useState('');
  let [UnitPrice,setUnitPrice]= React.useState('');
  let [SaelsPrice,setSaelsPrice]= React.useState('');

  let [ItemImage,setItemImage]= React.useState(String);
  let [Imagenew,setImagenew]= React.useState(String);

  let [Note,setNote]= React.useState('');
  let [StockNumber,setStockNumber]= React.useState('');
  let [BrandPartNumber,setBrandPartNumber]= React.useState('');
  let [OEMPartNumber,setOEMPartNumber]= React.useState('');
  let [MinQty,setMinQty]= React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [unitList, setunitList] = React.useState(false);
  const getOptionsunit=async()=>{

    const res = await axios.get('https://backoil.herokuapp.com/api/oil/unit')
    const data = res.data
    const options = data.map(d => ({
      "value" : d._id,
      "label" : d.UnitNameEn

    }))

    // this.setState({unitselectOptions: options})
    setunitList(options)
  }
  const [oilList, setOilList]= React.useState([]);
  const [rows, setRows] = React.useState(oilList);

  const [searched, setSearched] = React.useState(oilList);

  const requestSearch = (searchedVal) => {
    const filteredRows = oilList.filter((oilList) => {
      return oilList.OilGrade.toLowerCase().includes(searchedVal.toLowerCase());
    });

    setRows(filteredRows);
  };
  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };
  const handleOpen = () =>{ 
    
    setOpen(true)};

  const handleClose = () => {
    localStorage.clear();

    setOpen(false)};
  

  const deleteOil=(id)=>{
    let isExecuted = window.confirm("Are you sure to execute this action?");
    console.log(isExecuted);
    if(isExecuted){
    axios.delete(`https://backoil.herokuapp.com/api/oil/${id}`).then( () =>{
      alert('delete done')
      window.location.reload(false);
    } )}

  }
   useEffect(()=>{
    getOptionsunit();
    axios.get(`https://backoil.herokuapp.com/api/oil/`).then( (allOils) =>{
      setOilList(allOils.data);
      setRows(allOils.data);

      localStorage.setItem('_id', _id)
    localStorage.setItem('Brand', Brand)
    localStorage.setItem('OilUsage', OilUsage)
    localStorage.setItem('OilGrade', OilGrade)
    localStorage.setItem('Capasity', Capasity)
    localStorage.setItem('Unit', Unit)
    localStorage.setItem('StockQuantiti', StockQuantiti)
    localStorage.setItem('UnitPrice', UnitPrice)
    localStorage.setItem('SaelsPrice', SaelsPrice)
    localStorage.setItem('MinQty', MinQty)
    
    localStorage.setItem('ItemImage', ItemImage)
    localStorage.setItem('Note', Note)

      localStorage.setItem('StockNumber', StockNumber)

      localStorage.setItem('OEMPartNumber', OEMPartNumber)
      localStorage.setItem('BrandPartNumber', BrandPartNumber)

    })
  },[]);


  const setID=(_id,Brand,OilUsage,OilGrade,Capasity,Unit,StockNumber,ItemImage,Note,StockQuantiti,UnitPrice,SaelsPrice,BrandPartNumber,MinQty,OEMPartNumber)=>{
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
    localStorage.setItem('BrandPartNumber', BrandPartNumber)
    localStorage.setItem('OEMPartNumber', OEMPartNumber)
    localStorage.setItem('MinQty', MinQty)


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


  };
  const sendDataToAPI = () => {
    axios.put(`https://backoil.herokuapp.com/api/oil/${_id}`, {
 
      StockQuantiti:StockQuantiti,
      UnitPrice,
      SaelsPrice,
      Note,
      Capasity,
      Unit,
      BrandPartNumber,
      OEMPartNumber,
      StockNumber,
      MinQty,
      ItemImage:Imagenew
 
    }).then(() => {
alert("Updated")
console.log(StockQuantiti,UnitPrice,      SaelsPrice,
  Note,
  Capasity,
  Unit,
  BrandPartNumber,
  OEMPartNumber,
  StockNumber,
  MinQty,ItemImage)
      
      window.location.reload(false);

        localStorage.clear();
    })
}


// console.log(SaelsPrice,_id,UnitPrice,StockQuantiti,Unit,MinQty)

  return (
    < >
    <h2>Oil's & Fluid's in Stock</h2>
    <SearchBar
     style={{ width:"99.5%",border: '5px solid gray' }}
          value={searched}
          onChange={(searchVal) => requestSearch(searchVal)}
          onCancelSearch={() => cancelSearch()}
        />
    <TableContainer component={Paper} maxWidth="100%">
      <Table  sx={{ minWidth: 800 }} aria-label="customized table">
        <TableHead>
          <TableRow>
          <StyledTableCell align="center">Brand</StyledTableCell>
          <StyledTableCell align="center">Item Image</StyledTableCell>

            <StyledTableCell align="center">Usge</StyledTableCell>
            <StyledTableCell align="center">Specifications</StyledTableCell>
            <StyledTableCell align="center">Capacity</StyledTableCell>
            <StyledTableCell align="center">Unit</StyledTableCell>
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
          {rows.map((oil,key) => {
            if(oil.MinQty<oil.StockQuantiti){
            return(
            
            <StyledTableRow  style={{backgroundColor: ''}}  key={key}>
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
              <StyledTableCell align="center">{oil.OEMPartNumber}</StyledTableCell>
              <StyledTableCell align="center">{oil.BrandPartNumber}</StyledTableCell>
              <StyledTableCell align="center">{oil.StockNumber}</StyledTableCell>

              <StyledTableCell align="center">{oil.MinQty}</StyledTableCell>
              <StyledTableCell align="center">{oil.StockQuantiti}</StyledTableCell>
              <StyledTableCell align="center">{oil.UnitPrice}</StyledTableCell>
              <StyledTableCell align="center">{oil.SaelsPrice}</StyledTableCell>

              <StyledTableCell align="center">
      <IconButton type="button"  onClick={()=>{
      setID(oil._id,oil.Brand,oil.OilUsage,oil.OilGrade,oil.Capasity,oil.Unit,oil.StockNumber,oil.ItemImage,oil.Note,oil.StockQuantiti,oil.UnitPrice,oil.SaelsPrice,oil.BrandPartNumberoil,oil.MinQty,oil.OEMPartNumber);
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
          )
      }else{
        return(
            
          <StyledTableRow  style={{backgroundColor: 'red'}}  key={key}>
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
            <StyledTableCell align="center">{oil.OEMPartNumber}</StyledTableCell>
            <StyledTableCell align="center">{oil.BrandPartNumber}</StyledTableCell>
            <StyledTableCell align="center">{oil.StockNumber}</StyledTableCell>

              <StyledTableCell align="center">{oil.MinQty}</StyledTableCell>
            <StyledTableCell align="center">{oil.StockQuantiti}</StyledTableCell>
            <StyledTableCell align="center">{oil.UnitPrice}</StyledTableCell>
            <StyledTableCell align="center">{oil.SaelsPrice}</StyledTableCell>
            <StyledTableCell align="center">
    <IconButton type="button"  onClick={()=>{
    setID(oil._id,oil.Brand,oil.OilUsage,oil.OilGrade,oil.Capasity,oil.Unit,oil.StockNumber,oil.ItemImage,oil.Note,oil.StockQuantiti,oil.UnitPrice,oil.SaelsPrice,oil.BrandPartNumberoil,oil.MinQty,oil.OEMPartNumber);
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
          <h3>Usge:  {OilUsage}</h3>
          <h3>Specifications: {OilGrade}</h3>




          </div>
        <Form>

        <Form.Field >
                    <label>Capacity</label>
                    <br></br>
                    <input name="Capasity"
                    type="text"
                    class="item1"
                    className='inputform'
                    value={Capasity}
                        onChange={(e) => setCapasity(e.target.value)}
                        placeholder='Capasity' />

                </Form.Field>
                
        <Form.Field  >
        <br></br>
        
                <Select placeholder='Unit' options={unitList}   onChange={(e) => setUnit(e.label)} />
                </Form.Field>

                <Form.Field align="center"  class="grid-container">
                    <label>Note</label>
                    <br></br>
                    <input name="Note"
                    type="text"
                    class="item1"
                    className='inputform'
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
                    <input name="stockQuantity"
                    type="number"
                    class="item1"
                    className='inputform'
                    value={StockQuantiti}
                        onChange={(e) => setStockQuantiti(e.target.value)}
                        placeholder='stockQuantity' />

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
