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
import AddIcon from '@mui/icons-material/Add';
import { Form, Button } from 'semantic-ui-react';
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

 

export default function CreateBrand() {
  const [BrandlList, setBrandlList]= React.useState([]);
  
  let [Imagenew,setImagenew]= React.useState(String);
  
  const handleFile = (e) =>{
    // console.log(e.target.files[0])
    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();
      console.log(reader)
      reader.onload = (e) => {
        setImagenew(reader.result);
        alert("image uploaded");
       console.log(Imagenew)

      };
      reader.readAsDataURL(e.target.files[0]);

    }
  }
  const deleteBrand=(id)=>{
    let isExecuted = window.confirm("Are you sure to execute this action?");
    console.log(isExecuted);
    if(isExecuted){
    axios.delete(`https://backendoil.vercel.app/api/oil/brand/${id}`).then( () =>{
      window.location.reload(false);
    } )
  }
  }
  useEffect(()=>{
    axios.get(`https://backendoil.vercel.app/api/oil/brand`).then( (allOilsUseg) =>{
      setBrandlList(allOilsUseg.data);
    })
  },[]);
  const [BrandAr, setBrandAr]= React.useState('');
  const [BrandEn,setBrandEn]= React.useState('');
  const [BrandImage,setBrandImage]= React.useState('');
  const [BrandDiscr,setBrandDiscr]= React.useState('');



  const setID=(id,BrandAr,BrandEn,BrandDiscr)=>{
    console.log(id)
    localStorage.setItem('ID', id)
    localStorage.setItem('BrandAr', BrandAr)
    localStorage.setItem('BrandEn', BrandEn)
    localStorage.setItem('BrandImage', BrandImage)
    localStorage.setItem('BrandDiscr', BrandDiscr)

  }
  

         
  const creatBrandfun = ()=>{
    axios.post('https://backendoil.vercel.app/api/oil/brand',{BrandAr,BrandEn,BrandImage:Imagenew,BrandDiscr}).then( () => {
      window.location.reload(false);
    })
  }


  console.log(BrandAr,BrandEn)

  return (
    
    <>
      <h2>Add Brand to stock</h2>
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
        label="Name En"
        onChange={(event)=>setBrandEn(event.target.value)}
      />
      <TextField
        id="outlined-name"
        label="Name Ar"
        onChange={(event)=>setBrandAr(event.target.value)}
      />
                           <Form.Field align="center"  class="grid-container">
                    <input name="image"
                    type="file"
                    class="item1"
                    className='inputform'
                    // value={}
                        onChange={(e) => handleFile(e)}
                        placeholder='image' />

                </Form.Field>
            <TextField
        id="outlined-name"
        label="Description"
        onChange={(event)=>setBrandDiscr(event.target.value)}
      />


    </Box>

    <IconButton type="button" onClick={creatBrandfun}>
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
          <StyledTableCell align="center">ID</StyledTableCell>
          <StyledTableCell align="center">Image</StyledTableCell>

            <StyledTableCell align="center">Name En</StyledTableCell>
            <StyledTableCell align="center">Name Ar</StyledTableCell>
            <StyledTableCell align="center">Description</StyledTableCell>

            <StyledTableCell align="center">Edit</StyledTableCell>

            <StyledTableCell align="center">Action</StyledTableCell>


          </TableRow>
        </TableHead>
        <TableBody>
          {BrandlList.map((brand,key) => (
            <StyledTableRow key={key}>
              <StyledTableCell align="center">{brand._id}</StyledTableCell>
              <StyledTableCell align="center">
                <img src={brand.BrandImage} alt="not found" width="70" height="70"></img>
                </StyledTableCell>

              <StyledTableCell align="center">{brand.BrandEn}</StyledTableCell>
              <StyledTableCell align="center">{brand.BrandAr}</StyledTableCell>
              <StyledTableCell align="center">{brand.BrandDiscr}</StyledTableCell>



              <StyledTableCell align="center">
                <Link to = './UpdateBrand'>
                <IconButton aria-label='edit' onClick={()=>setID(brand._id,brand.BrandAr,brand.BrandEn,brand.BrandDiscr)}>

                <EditIcon fontSize="small"/>
                  </IconButton>
                </Link>
                </StyledTableCell>
              <StyledTableCell align="center">


                <IconButton aria-label='delete' className={ClassNames.margin} onClick={()=> deleteBrand(brand._id)}>
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
