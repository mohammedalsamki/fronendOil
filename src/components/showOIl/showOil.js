import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect } from 'react';
import axios from 'axios';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

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
let BAC_URL=process.env.BACE_URL
console.log(BAC_URL)

export default function ShowOilsData() {
  const [oilList, setOilList]= React.useState([]);
  

  const deleteOil=(id)=>{
    axios.delete(`https://backoil.herokuapp.com/api/oil/${id}`).then( () =>{
      window.location.reload(false);
    } )
  }
  useEffect(()=>{
    axios.get(`https://backoil.herokuapp.com/api/oil`).then( (allOils) =>{
      setOilList(allOils.data);
    })
  },[]);

  return (
    <>
    <h2>All Oil in Stock</h2>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>OilUsage</StyledTableCell>
            <StyledTableCell align="right">Brand</StyledTableCell>
            <StyledTableCell align="right">OilGrade</StyledTableCell>
            <StyledTableCell align="right">Capasity</StyledTableCell>
            <StyledTableCell align="right">Unit</StyledTableCell>
            <StyledTableCell align="right">StockQuantiti</StyledTableCell>
            <StyledTableCell align="right">UnitPrice</StyledTableCell>
            <StyledTableCell align="right">Action</StyledTableCell>


          </TableRow>
        </TableHead>
        <TableBody>
          {oilList.map((oil,key) => (
            <StyledTableRow key={key}>
              <StyledTableCell component="th" scope="row">
                {oil.OilUsage}
              </StyledTableCell>
              <StyledTableCell align="right">{oil.Brand}</StyledTableCell>
              <StyledTableCell align="right">{oil.OilGrade}</StyledTableCell>
              <StyledTableCell align="right">{oil.Capasity}</StyledTableCell>
              <StyledTableCell align="right">{oil.Unit}</StyledTableCell>
              <StyledTableCell align="right">{oil.StockQuantiti}</StyledTableCell>
              <StyledTableCell align="right">{oil.UnitPrice}</StyledTableCell>
              <StyledTableCell align="right">
                <IconButton aria-label='delete' className={ClassNames.margin} onClick={()=> deleteOil(oil._id)}>
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
