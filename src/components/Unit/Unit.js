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
  const [UnitName, setUnitName]= React.useState('');
  const [UnitDis,setUnitDis]= React.useState('');
      
  const creatUnitFun = ()=>{
    axios.post('https://backendoil.vercel.app/api/oil/unit',{UnitName,UnitDis}).then( () => {
      window.location.reload(false);
    })
  }
  const setID=(id,UnitName,UnitDis)=>{
    console.log(id)
    localStorage.setItem('ID', id)
    localStorage.setItem('UnitName', UnitName)
    localStorage.setItem('UnitDis', UnitDis)
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
        label="UnitName"
        onChange={(event)=>setUnitName(event.target.value)}
      />
            <TextField
        id="outlined-name"
        label="UnitDis"
        onChange={(event)=>setUnitDis(event.target.value)}
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
          <StyledTableCell align="right">ID</StyledTableCell>

            <StyledTableCell align="right">UnitName</StyledTableCell>
            <StyledTableCell align="right">UnitDis</StyledTableCell>
            <StyledTableCell align="cinter">Update</StyledTableCell>
            <StyledTableCell align="right">Action</StyledTableCell>


          </TableRow>
        </TableHead>
        <TableBody>
          {UnitList.map((unit,key) => (
            <StyledTableRow key={key}>
              <StyledTableCell align="right">{unit._id}</StyledTableCell>

              <StyledTableCell align="right">{unit.UnitName}</StyledTableCell>
              <StyledTableCell align="right">{unit.UnitDis}</StyledTableCell>
              <Link to = './UpdateUnit'>
                <Button onClick={()=>setID(unit._id,unit.UnitName,unit.UnitDis)}>
                  update
                </Button>
                </Link>
              <StyledTableCell align="right">
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
