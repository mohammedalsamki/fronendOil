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
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';





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

 

export default function CreateUnit() {
  const [UnitList, setUnitList]= React.useState([]);
  

  const deleteUnit=(id)=>{
    axios.delete(`https://backendoil.vercel.app/api/oil/unit/${id}`).then( () =>{
      window.location.reload(false);
    } )
  }
  useEffect(()=>{
    axios.get(`https://backendoil.vercel.app/api/oil/unit`).then( (allOilsUnit) =>{
        setUnitList(allOilsUnit.data);
    })
  },[]);
  const [UnitNameEn, setUnitNameEn]= React.useState('');
  const [UnitNameAr,setUnitNameAr]= React.useState('');
      
  const creatUnitFun = ()=>{
    axios.post('https://backendoil.vercel.app/api/oil/unit',{UnitNameEn,UnitNameAr}).then( () => {
      window.location.reload(false);
    })
  }
  const setID=(id,UnitNameEn,UnitNameAr)=>{
    console.log(id)
    localStorage.setItem('ID', id)
    localStorage.setItem('UnitNameEn', UnitNameEn)
    localStorage.setItem('UnitNameAr', UnitNameAr)
  }
  

  return (
    
    <>
      <h2>Add Unit's to stock</h2>
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
        label="UnitNameEn"
        onChange={(event)=>setUnitNameEn(event.target.value)}
      />
            <TextField
        id="outlined-name"
        label="UnitNameAr"
        onChange={(event)=>setUnitNameAr(event.target.value)}
      />

    </Box>

    <br></br>
    <br></br>
    <Button variant="contained" color="success" onClick={creatUnitFun}>
        save
      </Button>
    <br></br>
    <br></br>

    </Box>
    <h2>All Unit's in Stock</h2>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="customized table">
        <TableHead>
          <TableRow>
          <StyledTableCell align="center">ID</StyledTableCell>

            <StyledTableCell align="center">UnitNameEn</StyledTableCell>
            <StyledTableCell align="center">UnitNameAr</StyledTableCell>
            <StyledTableCell align="cinter">Update</StyledTableCell>
            <StyledTableCell align="center">Action</StyledTableCell>


          </TableRow>
        </TableHead>
        <TableBody>
          {UnitList.map((unit,key) => (
            <StyledTableRow key={key}>
              <StyledTableCell align="center">{unit._id}</StyledTableCell>

              <StyledTableCell align="center">{unit.UnitNameEn}</StyledTableCell>
              <StyledTableCell align="center">{unit.UnitNameAr}</StyledTableCell>

                <StyledTableCell align="center">
                <Link to = './UpdateUnit'>
                <IconButton aria-label='edit' onClick={()=>setID(unit._id,unit.UnitNameEn,unit.UnitNameAr)}>

                <EditIcon fontSize="small"/>
                  </IconButton>
                </Link>
              </StyledTableCell>
              <StyledTableCell align="center">
                <IconButton aria-label='delete' className={ClassNames.margin} onClick={()=> deleteUnit(unit._id)}>
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
