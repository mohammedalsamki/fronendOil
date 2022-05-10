import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { useEffect } from 'react';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import { ClassNames } from '@emotion/react';
import ModalUnstyled from '@mui/base/ModalUnstyled';
import { Form, Button } from 'semantic-ui-react';

const lotteryStyle={
    // border: '2px solid grey',
    // borderRadius: '10px',
    width:'40em',
    textAlign:'left',
  
  }
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
    backgroundColor:"white"
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

 

export default function CreateFilterUsge() {
  const [FilterUsgelList, setFilterUsgelList]= React.useState([]);
  const [open, setOpen] = React.useState(false);
  

  const deleteFilter=(id)=>{
    axios.delete(`https://backendapioill.herokuapp.com/api/filter/filter/usage/${id}`).then( () =>{
      window.location.reload(false);
    } )
  }
  const handleOpen = () =>{ 
    
    setOpen(true)};
  const handleClose = () => {
    localStorage.clear();

    setOpen(false)};
  useEffect(()=>{
    axios.get(`https://backendapioill.herokuapp.com/api/filter/filter/usage`).then( (allOilsUseg) =>{
      setFilterUsgelList(allOilsUseg.data);
    })
  },[]);
  const [FilterUsageAr, setFilterUsageAr]= React.useState('');
  const [FilterUsageEn,setFilterUsageEn]= React.useState('');
  const [_id,set_id]= React.useState('');



const setID=(id,FilterUsageAr,FilterUsageEn)=>{
  console.log(id)
  localStorage.setItem('_id', id)
  localStorage.setItem('FilterUsageAr', FilterUsageAr)
  localStorage.setItem('FilterUsageEn', FilterUsageEn)
  set_id(localStorage.getItem('_id'));
  setFilterUsageAr(localStorage.getItem('FilterUsageAr'));
  setFilterUsageEn(localStorage.getItem('FilterUsageEn'));


}
       
  const creatOilusgefun = ()=>{
    axios.post('https://backendapioill.herokuapp.com/api/filter/filter/usage',{FilterUsageAr,FilterUsageEn}).then( () => {
      window.location.reload(false);
    })
  }
  const sendDataToAPI = () => {
    axios.put(`https://backendapioill.herokuapp.com/api/filter/filter/usage/${_id}`, {
 
        FilterUsageAr,
        FilterUsageEn
 
    }).then(() => {
alert("Updated")

      window.location.reload(false);

        localStorage.clear();
    })
}

  console.log(FilterUsgelList)

  return (
    
    <> 
                 
      <h2>Filter Usges</h2>
    <Box sx={{ minWidth: 120 }}>
    <br></br>
    <br></br>
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >

            <TextField
        id="outlined-name"
        label="FilterUsageEn"
        onChange={(event)=>setFilterUsageEn(event.target.value)}
      />
            <TextField
        id="outlined-name"
        label="FilterUsageAr"
        onChange={(event)=>setFilterUsageAr(event.target.value)}
      />

    </Box>

    <br></br>
    <br></br>
    <Button variant="contained" color="success" onClick={creatOilusgefun}>
        save
      </Button>
    <br></br>
    <br></br>

    </Box>
 

    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="customized table">
        <TableHead>
        <TableRow>

            <StyledTableCell align="center">id</StyledTableCell>
            <StyledTableCell align="center">Name En</StyledTableCell>
            <StyledTableCell align="center">Name Ar</StyledTableCell>
            <StyledTableCell align="center">Update</StyledTableCell>
            <StyledTableCell align="center">Delete</StyledTableCell>


          </TableRow>
        </TableHead>
        <TableBody>
          {FilterUsgelList.map((oil,key) => (
            
            <StyledTableRow key={key}>
              <StyledTableCell align="center">{oil._id}</StyledTableCell>
              <StyledTableCell align="center">{oil.FilterUsageEn}</StyledTableCell>
              <StyledTableCell align="center">{oil.FilterUsageAr}</StyledTableCell>
              <StyledTableCell align="center">
                <IconButton aria-label='edit' onClick={()=>{setID(oil._id,oil.FilterUsageAr,oil.FilterUsageEn);handleOpen()}}>
                <EditIcon fontSize="small"/>
                  </IconButton>
              </StyledTableCell>

              <StyledTableCell align="center">
                <IconButton aria-label='delete' className={ClassNames.margin} onClick={()=> deleteFilter(oil._id,oil.FilterUsageAr)}>
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

        <Form>

       
                <Form.Field align="center" style={lotteryStyle} class="grid-container">
                    <label>Name En</label>
                    <input name="Name En"
                    type="text"
                    class="item1"
                    className='inputform'
                    value={FilterUsageEn}
                        onChange={(e) => setFilterUsageEn(e.target.value)}
                        placeholder='Name En' />

                </Form.Field>
                <Form.Field align="center" style={lotteryStyle} class="grid-container">
                    <label>Name Ar</label>
                    <input name="Name Ar"
                    type="text"
                    class="item1"
                    className='inputform'
                    value={FilterUsageAr}
                        onChange={(e) => setFilterUsageAr(e.target.value)}
                        placeholder='Name Ar' />

                </Form.Field>



               
                <Button type='submit' className='submitform' align="center" onClick={sendDataToAPI}>Update</Button>
            </Form>
        </Box>
      </StyledModal>
    </>
  );
}
