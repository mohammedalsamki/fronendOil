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

 

export default function CreateOilGrade() {
  const [OilGradeList, setOilGradeList]= React.useState([]);
  

  const deleteOilGrade=(id)=>{
    axios.delete(`https://backendoil.vercel.app/api/oil/oilGrade/${id}`).then( () =>{
      window.location.reload(false);
    } )
  }
  useEffect(()=>{
    axios.get(`https://backendoil.vercel.app/api/oil/oilGrade`).then( (allOilsGrade) =>{
      setOilGradeList(allOilsGrade.data);
    })
  },[]);
  const [OilGradeName, setOilGradeName]= React.useState('');
  const [OilGradeDis,setOilGradeDis]= React.useState('');



  const setID=(id,OilGradeName,OilGradeDis)=>{
    console.log(id)
    localStorage.setItem('ID', id)
    localStorage.setItem('OilGradeName', OilGradeName)
    localStorage.setItem('OilGradeDis', OilGradeDis)
  }
         
  const creatOilGrade = ()=>{
    axios.post('https://backendoil.vercel.app/api/oil/oilGrade',{OilGradeName,OilGradeDis}).then( () => {
      window.location.reload(false);
    })
  }


  console.log(OilGradeName,OilGradeDis)

  return (
    
    <>
      <h2>Add OilGrade to stock</h2>
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
        label="OilGradeName"
        onChange={(event)=>setOilGradeName(event.target.value)}
      />
            <TextField
        id="outlined-name"
        label="OilGrade Discription"
        onChange={(event)=>setOilGradeDis(event.target.value)}
      />

    </Box>

    <br></br>
    <br></br>
    <Button variant="contained" color="success" onClick={creatOilGrade}>
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

            <StyledTableCell align="center">OilGradeName</StyledTableCell>
            <StyledTableCell align="center">OilGrade Discription</StyledTableCell>
            <StyledTableCell align="center">Edit</StyledTableCell>

            <StyledTableCell align="center">Action</StyledTableCell>


          </TableRow>
        </TableHead>
        <TableBody>
          {OilGradeList.map((oilGrade,key) => (
            <StyledTableRow key={key}>
              <StyledTableCell align="center">{oilGrade._id}</StyledTableCell>

              <StyledTableCell align="center">{oilGrade.OilGradeName}</StyledTableCell>
              <StyledTableCell align="center">{oilGrade.OilGradeDis}</StyledTableCell>
              <StyledTableCell align="center">
                <Link to = './UpdateOilGrade'>
                <IconButton aria-label='edit' onClick={()=>setID(oilGrade._id,oilGrade.OilGradeName,oilGrade.OilGradeDis)}>

                <EditIcon fontSize="small"/>
                  </IconButton>
                </Link>
              </StyledTableCell>

              <StyledTableCell align="center">
                <IconButton aria-label='delete' className={ClassNames.margin} onClick={()=> deleteOilGrade(oilGrade._id)}>
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
