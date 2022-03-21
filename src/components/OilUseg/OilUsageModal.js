import React, { useState, useEffect } from 'react';
import { Form, Button } from 'semantic-ui-react';
import axios from 'axios';
import { useHistory } from 'react-router';
import '../style/form.css'
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { ClassNames } from '@emotion/react';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
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

export default function AddSpec() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setIDSpec(localStorage.getItem('ID'))

    setOpen(true);
  };
  const handleClose = () => setOpen(false);

    let history = useHistory();
    const [Specs, setOilSpec] = useState('');

    const [OilUsageEn, setOilUsageEn] = useState('');
    const [test, setlist] = useState('');

  const [OiUsgelList, setOiUsgelList]= React.useState([]);

  
    const [IDSpec, setIDSpec] = useState(null);
    const sendDataToAPI = () => {
        axios.put(`https://backendoil.vercel.app/api/oil/spec/${IDSpec}`, {
          OilUsageEn,
          Specs
        }).then(() => {
          window.location.reload(false);
            history.push('/OilUseg');
            // localStorage.clear();
            // console.log(Specs)
        }).catch(error => {
          console.log(error.response)
      });
    }
    const deleteSpec=(name)=>{
      axios.put(`https://backendoil.vercel.app/api/oil/specDelete/${IDSpec}`, {
        OilUsageEn,
        SpecsChiled:name
      }).then(() => {
        window.location.reload(false);
          console.log(name)
      }).catch(error => {
        console.log(error.response)
    });
    }

    useEffect(() => {
      axios.get(`https://backendoil.vercel.app/api/oil/tours/${IDSpec}`).then( (allOilsUseg) =>{
        setOiUsgelList(allOilsUseg.data.Specs);
        setlist(allOilsUseg.data.Specs);
      })
    
      setIDSpec(localStorage.getItem('ID'))
      setOilUsageEn(localStorage.getItem('OilUsageEn'));
  
      setOilSpec(localStorage.getItem('Specs'))
    }, [IDSpec])


      console.log("test",test)



      return (
      <>
        <div className='form'>
        <h2>add Specifications for {OilUsageEn}</h2>

            <Form>
                <Form.Field>
                    <input name="Specs"
                    className='inputform'

                        onChange={(e) => setOilSpec(e.target.value)}
                        placeholder='Specs' />
                </Form.Field>

            </Form>
            <Button type='submit' className='submitform' style={{ width:"100px" }} onClick={sendDataToAPI}>Add</Button>


        </div>
<div>
<TableContainer component={Paper}>

<Table sx={{ minWidth: 650 }} aria-label="customized table">
  <TableHead>
  <TableRow>

      <StyledTableCell align="center">ID</StyledTableCell>
      <StyledTableCell align="center">Specification</StyledTableCell>
      <StyledTableCell align="center">Delete</StyledTableCell>


    </TableRow>
  </TableHead>
  <TableBody>

  {OiUsgelList.map((name) =>(
      <StyledTableRow >
        <StyledTableCell id="root" align="center">{IDSpec}</StyledTableCell>
        <StyledTableCell align="center" > {name}</StyledTableCell>              <StyledTableCell align="center">
          <IconButton aria-label='delete' className={ClassNames.margin} onClick={()=> deleteSpec(name)}>
            <DeleteIcon fontSize="small"/>
            </IconButton>
          </StyledTableCell>

      </StyledTableRow>
      ))}
  </TableBody>
</Table>
</TableContainer>
  
</div>

        </>
    )
}