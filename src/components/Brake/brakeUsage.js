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
import AddIcon from '@mui/icons-material/Add';
import ModalUnstyled from '@mui/base/ModalUnstyled';
import { Form, Button } from 'semantic-ui-react';
import { useHistory } from 'react-router';

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
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

 

export default function CreatebrakeUsge() {
    let history = useHistory();

  const [brakeUsgelList, setbrakeUsgelList]= React.useState([]);
  const [open, setOpen] = React.useState(false);
  
  const handleOpen = () =>{ 
    
    setOpen(true)};

  const handleClose = () => {
    localStorage.clear();

    setOpen(false)};
  
    const [id,setid]= React.useState('');

  const deletebrakeUsge=(id)=>{
    let isExecuted = window.confirm("Are you sure to execute this action?");
    console.log(isExecuted);
    if(isExecuted){
    axios.delete(`https://backendapioill.herokuapp.com/api/brake/brake/usage/${id}`).then( () =>{
      window.location.reload(false);
    } )
}
  }

  useEffect(()=>{
    axios.get(`https://backendapioill.herokuapp.com/api/brake/brake/usage`).then( (allbrakesUseg) =>{
      setbrakeUsgelList(allbrakesUseg.data);
    })
  },[]);
  const [brakeUsageAr, setbrakeUsageAr]= React.useState('');
  const [brakeUsageEn,setbrakeUsageEn]= React.useState('');


const setID=(id,brakeUsageAr,brakeUsageEn)=>{
  console.log(id)
  localStorage.setItem('ID', id)
  localStorage.setItem('brakeUsageAr', brakeUsageAr)
  localStorage.setItem('brakeUsageEn', brakeUsageEn)
  setid(localStorage.getItem('ID'));
  setbrakeUsageAr(localStorage.getItem('brakeUsageAr'));
  setbrakeUsageEn(localStorage.getItem('brakeUsageEn'));




}
const sendDataToAPI = () => {
    axios.put(`https://backendapioill.herokuapp.com/api/brake/brake/usage/${id}`, {
 
        brakeUsageAr,
        brakeUsageEn,

 
    }).then(() => {
alert("Updated")
// history.push('/Oil_Fluid');
      
      window.location.reload(false);

        localStorage.clear();
    })
}
  const creatbrakeusgefun = ()=>{
    axios.post('https://backendapioill.herokuapp.com/api/brake/brake/usage',{brakeUsageAr,brakeUsageEn}).then( () => {
      window.location.reload(false);
    })
  }

  console.log(brakeUsgelList)

  return (
    
    <>   	
      <h2>Brake Usges</h2>
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
        label="brakeUsageEn"
        onChange={(event)=>setbrakeUsageEn(event.target.value)}
      />
            <TextField
        id="outlined-name"
        label="brakeUsageAr"
        onChange={(event)=>setbrakeUsageAr(event.target.value)}
      />

    </Box>

    <br></br>
    <br></br>
    <IconButton type="button" onClick={creatbrakeusgefun}>
                 <AddIcon fontSize="larg"/>
                 Add
                 </IconButton>

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
          {brakeUsgelList.map((brake,key) => (
            
            <StyledTableRow key={key}>
              <StyledTableCell align="center">{brake._id}</StyledTableCell>
              <StyledTableCell align="center">{brake.brakeUsageEn}</StyledTableCell>
              <StyledTableCell align="center">{brake.brakeUsageAr}</StyledTableCell>

              <StyledTableCell align="center">
      <IconButton type="button"  onClick={()=>{
      setID(brake._id,brake.brakeUsageAr,brake.brakeUsageEn);
        handleOpen()}} >
                        <EditIcon fontSize="small"/>

      </IconButton>

    </StyledTableCell>

              <StyledTableCell align="center">
                <IconButton aria-label='delete' className={ClassNames.margin} onClick={()=> deletebrakeUsge(brake._id,brake.brakeUsageAr)}>
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

        <Form.Field >
                    <label>Name Ar</label>
                    <br></br>
                    <input name="Name Ar"
                    type="text"
                    class="item1"
                    className='inputform'
                    value={brakeUsageAr}
                        onChange={(e) => setbrakeUsageAr(e.target.value)}
                        placeholder='Name Ar' />

                </Form.Field>
                


                <Form.Field align="center"  class="grid-container">
                    <label>Name En</label>
                    <br></br>
                    <input name="brakeUsageEn"
                    type="text"
                    class="item1"
                    className='inputform'
                    value={brakeUsageEn}
                        onChange={(e) => setbrakeUsageEn(e.target.value)}
                        placeholder='brakeUsageEn' />

                </Form.Field>
               
            <Button type='submit' className='submitform' align="center" onClick={sendDataToAPI}>Update</Button>
                
            </Form>
        </Box>
      </StyledModal>
    </>
  );
}
