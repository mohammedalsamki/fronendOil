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

 

export default function CreatecarCareUsge() {
  const [OiUsgelList, setOiUsgelList]= React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [id, setid]= React.useState('');

  const handleOpen = () =>{ 
    
    setOpen(true)};
  const handleClose = () => {
    localStorage.clear();

    setOpen(false)};

  const deletecarCareUsge=(id)=>{
    axios.delete(`https://backendapioill.herokuapp.com/api/carCare/carCare/usage/${id}`).then( () =>{
      window.location.reload(false);
    } )
  }

  useEffect(()=>{
    axios.get(`https://backendapioill.herokuapp.com/api/carCare/carCare/usage`).then( (allcarCaresUseg) =>{
      setOiUsgelList(allcarCaresUseg.data);
    })
  },[]);
  const [carCareUsageAr, setcarCareUsageAr]= React.useState('');
  const [carCareUsageEn,setcarCareUsageEn]= React.useState('');


const setID=(id,carCareUsageAr,carCareUsageEn)=>{
  console.log(id)
  localStorage.setItem('ID', id)
  localStorage.setItem('carCareUsageAr', carCareUsageAr)
  localStorage.setItem('carCareUsageEn', carCareUsageEn)

 setcarCareUsageAr(localStorage.getItem('carCareUsageAr'))
setcarCareUsageEn(localStorage.getItem('carCareUsageEn'))
setid(localStorage.getItem('ID'))
}    
  const creatcarCareusgefun = ()=>{
    axios.post('https://backendapioill.herokuapp.com/api/carCare/carCare/usage',{carCareUsageAr,carCareUsageEn}).then( () => {
      window.location.reload(false);
    })
  }

  const sendDataToAPI = () => {
    axios.put(`https://backendapioill.herokuapp.com/api/carCare/carCare/usage/${id}`, {
 
      carCareUsageAr:carCareUsageAr,
      carCareUsageEn:carCareUsageEn
    
 
    }).then(() => {
alert("Updated")

    // history.push('/lamps');
        localStorage.clear();
      window.location.reload(false);

    })
}
  return (
    
    <>   	
      <h2>test Fluid Usges</h2>
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
        label="carCareUsageEn"
        onChange={(event)=>setcarCareUsageEn(event.target.value)}
      />
            <TextField
        id="outlined-name"
        label="carCareUsageAr"
        onChange={(event)=>setcarCareUsageAr(event.target.value)}
      />

    </Box>

    <br></br>
    <br></br>
    <IconButton type="button" onClick={creatcarCareusgefun}>
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
          {OiUsgelList.map((carCare,key) => (
            
            <StyledTableRow key={key}>
              <StyledTableCell align="center">{carCare._id}</StyledTableCell>
              <StyledTableCell align="center">{carCare.carCareUsageEn}</StyledTableCell>
              <StyledTableCell align="center">{carCare.carCareUsageAr}</StyledTableCell>
              <StyledTableCell align="center">
                <IconButton aria-label='edit' onClick={()=>{setID(carCare._id,carCare.carCareUsageAr,carCare.carCareUsageEn); handleOpen()}}>
                <EditIcon fontSize="small"/>
                  </IconButton>
              </StyledTableCell>

              <StyledTableCell align="center">
                <IconButton aria-label='delete' className={ClassNames.margin} onClick={()=> deletecarCareUsge(carCare._id,carCare.carCareUsageAr)}>
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
                    <label>carCareUsageAr</label>
                    <br></br>
                    <textarea name="carCareUsageAr"
                    type="text"
                    class="item1"
                    className='inputform'
                    style={{ width:"300px",height :'100px' }}
                    value={carCareUsageAr}
                        onChange={(e) => setcarCareUsageAr(e.target.value)}
                        placeholder='carCareUsageAr' />

                </Form.Field>
                <Form.Field align="center"  class="grid-container">
                    <label>carCareUsageEn</label>
                    <br></br>
                    <textarea name="carCareUsageEn"
                    type="text"
                    class="item1"
                    className='inputform'
                    style={{ width:"300px",height :'100px' }}
                    value={carCareUsageEn}
                        onChange={(e) => setcarCareUsageEn(e.target.value)}
                        placeholder='carCareUsageEn' />

                </Form.Field>
                <Button type='submit' className='submitform' align="center" onClick={sendDataToAPI}>Update</Button>

            </Form>

            

        </Box>
        
      </StyledModal>
    </>
  );
}
