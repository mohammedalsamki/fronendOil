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
import { Form, Button } from 'semantic-ui-react';
import ModalUnstyled from '@mui/base/ModalUnstyled';

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

 

export default function LampsUsgeNew() {
  const [lampslList, setlampslList]= React.useState([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () =>{ 
    
    setOpen(true)};
  const handleClose = () => {
    localStorage.clear();

    setOpen(false)};

  const deletelampsUsge=(id)=>{
    axios.delete(`https://backendapioill.herokuapp.com/api/lamps/lamps/usage/${id}`).then( () =>{
      window.location.reload(false);
    } )
  }

  useEffect(()=>{
    axios.get(`https://backendapioill.herokuapp.com/api/lamps/lamps/usage`).then( (alllampssUseg) =>{
      setlampslList(alllampssUseg.data);
    })
  },[]);
  const [lampsUsageAr, setlampsUsageAr]= React.useState('');
  const [lampsUsageEn,setlampsUsageEn]= React.useState('');
  const [id, setid]= React.useState('');


const setID=(id,lampsUsageAr,lampsUsageEn)=>{
  console.log(id)
  localStorage.setItem('ID', id)
  localStorage.setItem('lampsUsageAr', lampsUsageAr)
  localStorage.setItem('lampsUsageEn', lampsUsageEn)

 setlampsUsageAr(localStorage.getItem('lampsUsageAr'))
setlampsUsageEn(localStorage.getItem('lampsUsageEn'))
setid(localStorage.getItem('ID'))
}      
  const creatlampsusgefun = ()=>{
    axios.post('https://backendapioill.herokuapp.com/api/lamps/lamps/usage',{lampsUsageAr,lampsUsageEn}).then( () => {
      window.location.reload(false);
    })
  }

  const sendDataToAPI = () => {
    axios.put(`https://backendapioill.herokuapp.com/api/lamps/lamps/usage/${id}`, {
 
        lampsUsageAr:lampsUsageAr,
        lampsUsageEn:lampsUsageEn
    
 
    }).then(() => {
alert("Updated")

    // history.push('/lamps');
        localStorage.clear();
      window.location.reload(false);

    })
}
  return (
    
    <>   	
      <h2>lamps Usges</h2>
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
        label="lampsUsageEn"
        onChange={(event)=>setlampsUsageEn(event.target.value)}
      />
            <TextField
        id="outlined-name"
        label="lampsUsageAr"
        onChange={(event)=>setlampsUsageAr(event.target.value)}
      />

    </Box>

    <br></br>
    <br></br>
    <IconButton type="button" onClick={creatlampsusgefun}>
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
            <StyledTableCell align="center">lamps En</StyledTableCell>
            <StyledTableCell align="center">lamps Ar</StyledTableCell>
            <StyledTableCell align="center">Update</StyledTableCell>
            <StyledTableCell align="center">Delete</StyledTableCell>


          </TableRow>
        </TableHead>
        <TableBody>
          {lampslList.map((lamps,key) => (
            
            <StyledTableRow key={key}>
              <StyledTableCell align="center">{lamps._id}</StyledTableCell>
              <StyledTableCell align="center">{lamps.lampsUsageEn}</StyledTableCell>
              <StyledTableCell align="center">{lamps.lampsUsageAr}</StyledTableCell>
              <StyledTableCell align="center">
                <IconButton aria-label='edit' onClick={()=>{setID(lamps._id,lamps.lampsUsageAr,lamps.lampsUsageEn,lamps.Specs);handleOpen()}}>
                <EditIcon fontSize="small"/>
                  </IconButton>
              </StyledTableCell>

              <StyledTableCell align="center">
                <IconButton aria-label='delete' className={ClassNames.margin} onClick={()=> deletelampsUsge(lamps._id,lamps.lampsUsageAr)}>
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





          </div>
        <Form>


                <Form.Field align="center"  class="grid-container">
                    <label>lampsUsageAr</label>
                    <br></br>
                    <textarea name="lampsUsageAr"
                    type="text"
                    class="item1"
                    className='inputform'
                    style={{ width:"300px",height :'100px' }}
                    value={lampsUsageAr}
                        onChange={(e) => setlampsUsageAr(e.target.value)}
                        placeholder='EStanderAr' />

                </Form.Field>
                <Form.Field align="center"  class="grid-container">
                    <label>lampsUsageEn</label>
                    <br></br>
                    <textarea name="lampsUsageEn"
                    type="text"
                    class="item1"
                    className='inputform'
                    style={{ width:"300px",height :'100px' }}
                    value={lampsUsageEn}
                        onChange={(e) => setlampsUsageEn(e.target.value)}
                        placeholder='EStanderEn' />

                </Form.Field>
                <Button type='submit' className='submitform' align="center" onClick={sendDataToAPI}>Update</Button>

            </Form>

            

        </Box>
        
      </StyledModal>
    </>
  );
}
