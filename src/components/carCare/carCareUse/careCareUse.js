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
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import { ClassNames } from '@emotion/react';
import AddIcon from '@mui/icons-material/Add';



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
  

  const deletecarCareUsge=(id)=>{
    axios.delete(`https://backendoil.vercel.app/api/carCare/carCare/usage/${id}`).then( () =>{
      window.location.reload(false);
    } )
  }

  useEffect(()=>{
    axios.get(`https://backendoil.vercel.app/api/carCare/carCare/usage`).then( (allcarCaresUseg) =>{
      setOiUsgelList(allcarCaresUseg.data);
    })
  },[]);
  const [carCareUsageAr, setcarCareUsageAr]= React.useState('');
  const [carCareUsageEn,setcarCareUsageEn]= React.useState('');
  let [Specs,setSpecs]= React.useState('');


const setID=(id,carCareUsageAr,carCareUsageEn,Specs)=>{
  console.log(id)
  localStorage.setItem('ID', id)
  localStorage.setItem('carCareUsageAr', carCareUsageAr)
  localStorage.setItem('carCareUsageEn', carCareUsageEn)
  localStorage.setItem('Specs', Specs)

}
       
  const creatcarCareusgefun = ()=>{
    axios.post('https://backendoil.vercel.app/api/carCare/carCare/usage',{carCareUsageAr,carCareUsageEn,Specs}).then( () => {
      window.location.reload(false);
    })
  }

  console.log(OiUsgelList)

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
                <Link to = './update'>
                <IconButton aria-label='edit' onClick={()=>setID(carCare._id,carCare.carCareUsageAr,carCare.carCareUsageEn)}>
                <EditIcon fontSize="small"/>
                  </IconButton>
                </Link>
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
    </>
  );
}