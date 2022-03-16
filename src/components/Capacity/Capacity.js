import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
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
import { Link } from 'react-router-dom';




import { ClassNames } from '@emotion/react';
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

 

export default function CreateCapacity() {
  const [CapacityList, setCapacityList]= React.useState([]);
  

  const deletecapacity=(id)=>{
    axios.delete(`https://backendoil.vercel.app/api/oil/capacity/${id}`).then( () =>{
      window.location.reload(false);
    } )
  }
  useEffect(()=>{
    axios.get(`https://backendoil.vercel.app/api/oil/capacity`).then( (allOilscapacity) =>{
      setCapacityList(allOilscapacity.data);
    })
  },[]);
  const [capacityName, setcapacityName]= React.useState('');
  const [capacityNumber,setcapacityNumber]= React.useState('');

  const setID=(id,capacityName,capacityNumber)=>{
    console.log(id)
    localStorage.setItem('ID', id)
    localStorage.setItem('capacityName', capacityName)
    localStorage.setItem('capacityNumber', capacityNumber)
  }


         
  const creatcapacity = ()=>{
    axios.post('https://backendoil.vercel.app/api/oil/capacity',{capacityName,capacityNumber}).then( () => {
      window.location.reload(false);
    })
  }


  console.log(capacityName,capacityNumber)

  return (
    
    <>
      <h2>Add capacity to stock</h2>
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
        label="capacityName"
        onChange={(event)=>setcapacityName(event.target.value)}
      />

          <TextField
          id="outlined-number"
          label="capacityNumber"
          type="number"
          onChange={(event)=>setcapacityNumber(event.target.value)}
          // value={StockQuantiti}
          InputLabelProps={{
            shrink: true,
          }}
        />

    </Box>

    <br></br>
    <br></br>
    <Button variant="contained" color="success" onClick={creatcapacity}>
        save
      </Button>
    <br></br>
    <br></br>

    </Box>
    <h2>All Oil in Stock</h2>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="customized table">
        <TableHead>
          <TableRow>
          <StyledTableCell align="center">ID</StyledTableCell>

            <StyledTableCell align="center">capacityName</StyledTableCell>
            <StyledTableCell typeof='number' align="center">capacityNumber</StyledTableCell>
            <StyledTableCell align="center">Edit</StyledTableCell>

            <StyledTableCell align="center">Action</StyledTableCell>


          </TableRow>
        </TableHead>
        <TableBody>
          {CapacityList.map((cityList,key) => (
            <StyledTableRow key={key}>
              <StyledTableCell align="center">{cityList._id}</StyledTableCell>

              <StyledTableCell align="center">{cityList.capacityName}</StyledTableCell>
              <StyledTableCell align="center">{cityList.capacityNumber}</StyledTableCell>

                <StyledTableCell align="center">
                <Link to = './UpdateCapacity'>
                <IconButton aria-label='edit' onClick={()=>setID(cityList._id,cityList.capacityName,cityList.capacityNumber)}>

                <EditIcon fontSize="small"/>
                  </IconButton>
                </Link>
              </StyledTableCell>
              <StyledTableCell align="center">
                <IconButton aria-label='delete' className={ClassNames.margin} onClick={()=> deletecapacity(cityList._id)}>
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
