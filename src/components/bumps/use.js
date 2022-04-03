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
import EditIcon from '@mui/icons-material/Edit';
import { ClassNames } from '@emotion/react';
import AddIcon from '@mui/icons-material/Add';
import ModalUnstyled from '@mui/base/ModalUnstyled';
import { Form, Button } from 'semantic-ui-react';


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

 

export default function CreatebumpsUsge() {
  const [OiUsgelList, setOiUsgelList]= React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [id, setid]= React.useState('');

  const handleOpen = () =>{ 
    
    setOpen(true)};
  const handleClose = () => {
    localStorage.clear();

    setOpen(false)};

  const deletebumpsUsge=(id)=>{
    axios.delete(`https://backendoil.vercel.app/api/bumps/use/${id}`).then( () =>{
      window.location.reload(false);
    } )
  }

  useEffect(()=>{
    axios.get(`https://backendoil.vercel.app/api/bumps/use/get`).then( (allbumpssUseg) =>{
      setOiUsgelList(allbumpssUseg.data);
    })
  },[]);
  const [pumpsUsageAr, setpumpsUsageAr]= React.useState('');
  const [pumpsUsageEn,setpumpsUsageEn]= React.useState('');


const setID=(id,pumpsUsageAr,pumpsUsageEn)=>{
  console.log(id)
  localStorage.setItem('ID', id)
  localStorage.setItem('pumpsUsageAr', pumpsUsageAr)
  localStorage.setItem('pumpsUsageEn', pumpsUsageEn)

 setpumpsUsageAr(localStorage.getItem('pumpsUsageAr'))
setpumpsUsageEn(localStorage.getItem('pumpsUsageEn'))
setid(localStorage.getItem('ID'))
}    
  const creatbumpsusgefun = ()=>{
    axios.post('https://backendoil.vercel.app/api/bumps/use',{pumpsUsageAr,pumpsUsageEn}).then( () => {
      window.location.reload(false);
    })
  }

  const sendDataToAPI = () => {
    axios.put(`https://backendoil.vercel.app/api/bumps/use/${id}`, {
 
      pumpsUsageAr:pumpsUsageAr,
      pumpsUsageEn:pumpsUsageEn
    
 
    }).then(() => {
alert("Updated")

    // history.push('/pumps');
        localStorage.clear();
      window.location.reload(false);

    })
}
  return (
    
    <>   	
      <h2>Pumps use</h2>
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
        label="pumpsUsageEn"
        onChange={(event)=>setpumpsUsageEn(event.target.value)}
      />
            <TextField
        id="outlined-name"
        label="pumpsUsageAr"
        onChange={(event)=>setpumpsUsageAr(event.target.value)}
      />

    </Box>

    <br></br>
    <br></br>
    <IconButton type="button" onClick={creatbumpsusgefun}>
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
            <StyledTableCell align="center">name En</StyledTableCell>
            <StyledTableCell align="center">name Ar</StyledTableCell>
            <StyledTableCell align="center">Update</StyledTableCell>
            <StyledTableCell align="center">Delete</StyledTableCell>


          </TableRow>
        </TableHead>
        <TableBody>
          {OiUsgelList.map((bumps,key) => (
            
            <StyledTableRow key={key}>
              <StyledTableCell align="center">{bumps._id}</StyledTableCell>
              <StyledTableCell align="center">{bumps.pumpsUsageEn}</StyledTableCell>
              <StyledTableCell align="center">{bumps.pumpsUsageAr}</StyledTableCell>
              <StyledTableCell align="center">
                <IconButton aria-label='edit' onClick={()=>{setID(bumps._id,bumps.pumpsUsageAr,bumps.pumpsUsageEn); handleOpen()}}>
                <EditIcon fontSize="small"/>
                  </IconButton>
              </StyledTableCell>

              <StyledTableCell align="center">
                <IconButton aria-label='delete' className={ClassNames.margin} onClick={()=> deletebumpsUsge(bumps._id,bumps.pumpsUsageAr)}>
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
                    <label>pumpsUsageAr</label>
                    <br></br>
                    <textarea name="pumpsUsageAr"
                    type="text"
                    class="item1"
                    className='inputform'
                    style={{ width:"300px",height :'100px' }}
                    value={pumpsUsageAr}
                        onChange={(e) => setpumpsUsageAr(e.target.value)}
                        placeholder='pumpsUsageAr' />

                </Form.Field>
                <Form.Field align="center"  class="grid-container">
                    <label>pumpsUsageEn</label>
                    <br></br>
                    <textarea name="pumpsUsageEn"
                    type="text"
                    class="item1"
                    className='inputform'
                    style={{ width:"300px",height :'100px' }}
                    value={pumpsUsageEn}
                        onChange={(e) => setpumpsUsageEn(e.target.value)}
                        placeholder='pumpsUsageEn' />

                </Form.Field>
                <Button type='submit' className='submitform' align="center" onClick={sendDataToAPI}>Update</Button>

            </Form>

            

        </Box>
        
      </StyledModal>
    </>
  );
}
