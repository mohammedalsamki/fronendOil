import * as React from 'react';
import { useRef, useState } from "react";
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
import { Modal, Button } from "react-bootstrap";

// import EditIcon from '@mui/icons-material/Edit';
// import Form from '../OilGrade/Form';
// import FavouriteCards from '../OilGrade/FavouriteCards';
import Favourite from '../OilGrade/oilUsageUpdate';



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

 

export default function CreateOilUsge() {
  const [OiUsgelList, setOiUsgelList]= React.useState([]);
  const [put_id, setputid]= React.useState([]);
  const [put_OiUsgeAr, setputOiUsgeAr]= React.useState([]);
  let [put_OiUsgeEn, setputOiUsgeEn]= React.useState([]);

  // const [putResult, setPutResult] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const showFormm = () => {
    setShowForm(!showForm);
  }
const putData=(e)=> {
  e.preventDefault();


      // const putData = {
      //   OilUsageAr: put_OiUsgeAr.current.value,
      //   OilUsageEn: put_OiUsgeEn.current.value,
      // }
    
         axios.put(`https://backendoil.vercel.app/api/oil/oilUseg/${put_id}`,put_id, put_OiUsgeAr,put_OiUsgeEn)
        .then((put_id, put_OiUsgeAr,put_OiUsgeEn)=>{
          console.log(put_id, put_OiUsgeAr,put_OiUsgeEn)
        }).catch((err)=>{
          console.log(err)
        })
      }
  

  const deleteOilUsge=(id)=>{
    axios.delete(`https://backendoil.vercel.app/api/oil/oilUseg/${id}`).then( () =>{
      window.location.reload(false);
    } )
  }



  useEffect(()=>{
    axios.get(`https://backendoil.vercel.app/api/oil/oilUseg`).then( (allOilsUseg) =>{
      setOiUsgelList(allOilsUseg.data);
    })
  },[]);
  const [OilUsageAr, setOilUsageAr]= React.useState('');
  const [OilUsageEn,setOilUsageEn]= React.useState('');





         
  const creatOilusgefun = ()=>{
    axios.post('https://backendoil.vercel.app/api/oil/oilUseg',{OilUsageAr,OilUsageEn}).then( () => {
      window.location.reload(false);
    })
  }


  console.log(OilUsageAr,OilUsageEn)

  return (
    
    <>
    			<div>

				<Modal show={showForm} >
					<Modal.Header closeButton>
						<Modal.Title>Modal heading</Modal.Title>
					</Modal.Header>
					<Modal.Body>
          {OiUsgelList.map((oil,key) => (

						<form >
              
							<input
								type="text"
								onChange={setputid}
								value={oil._id}
							/>
							<br />
							<input
								type="text"
               onChange={(e)=>setputOiUsgeEn(e.target.value) }
               

							/>
							<br />
							<input
								type="text"
								onChange={setputOiUsgeAr}
								value={oil.OilUsageAr}
							/>

							<br />
							

							<input type="submit" value="update" onSubmit={putData} />
						</form>
          ),)}

					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" >
							Close
						</Button>
						<Button variant="primary" >
							Save Changes
						</Button>
					</Modal.Footer>
				</Modal>
			</div>
      <h2>Add Oil to stock</h2>

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
        label="OilUsageAr"
        onChange={(event)=>setOilUsageAr(event.target.value)}
      />
            <TextField
        id="outlined-name"
        label="OilUsageEn"
        onChange={(event)=>setOilUsageEn(event.target.value)}
      />

    </Box>

    <br></br>
    <br></br>
    <Button variant="contained" color="success" onClick={creatOilusgefun}>
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

            <StyledTableCell align="cinter">id</StyledTableCell>
            <StyledTableCell align="cinter">OilUsageAr</StyledTableCell>
            <StyledTableCell align="cinter">OilUsageEn</StyledTableCell>
            <StyledTableCell align="cinter">Update</StyledTableCell>

            <StyledTableCell align="cinter">Delete</StyledTableCell>


          </TableRow>
        </TableHead>
        <TableBody>
          {OiUsgelList.map((oil,key) => (
            <StyledTableRow key={key}>
              <StyledTableCell align="cinter">{oil._id}</StyledTableCell>

              <StyledTableCell align="cinter">{oil.OilUsageAr}</StyledTableCell>
              <StyledTableCell align="cinter">{oil.OilUsageEn}</StyledTableCell>
              <StyledTableCell align="cinter">
                <Button onClick={showFormm}>
                  update
                </Button>
                
              </StyledTableCell>

              <StyledTableCell align="cinter">
                <IconButton aria-label='delete' className={ClassNames.margin} onClick={()=> deleteOilUsge(oil._id,oil.OilUsageAr)}>
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
