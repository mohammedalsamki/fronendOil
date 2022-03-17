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
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import { ClassNames } from '@emotion/react';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ReactDOM from 'react-dom'
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
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

    let history = useHistory();
    const [Specs, setOilSpec] = useState('');
    const [OilUsageEn, setOilUsageEn] = useState('');
    const [test, setlist] = useState('');

  const [OiUsgelList, setOiUsgelList]= React.useState([]);

  
    const [ID, setID] = useState(null);
    const sendDataToAPI = () => {
        axios.put(`https://backendoil.vercel.app/api/oil/spec/${ID}`, {
          OilUsageEn,
          Specs
        }).then(() => {
          window.location.reload(false);
            history.push('/OilUseg');
            localStorage.clear();
            // console.log(Specs)
        }).catch(error => {
          console.log(error.response)
      });
    }
    const deleteOilUsge=(id)=>{
      axios.delete(`https://backendoil.vercel.app/api/oil/oilUseg/${id}`).then( () =>{
        window.location.reload(false);
      } )
    }
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      axios.get(`https://backendoil.vercel.app/api/oil/tours/6232eed2073d7ddc71abba9c`).then( (allOilsUseg) =>{
        setOiUsgelList(allOilsUseg.data);
        setlist(allOilsUseg.data.Specs);
        setIsLoading(false);
      })
    
        setID(localStorage.getItem('ID'))
        setOilUsageEn(localStorage.getItem('OilUsageEn'));
    
        setOilSpec(localStorage.getItem('Specs'))
    }, [])


      console.log("test",test)
      for (let index = 0; index < OiUsgelList.length; index++) {
        console.log("array",test);
        
      }
      const NameList=()=> {
        const element = <StyledTableCell id="root">{test.map((name) =>( <h2>{name}</h2>))}</StyledTableCell>;
          ReactDOM.render(element, document.getElementById('root'));

      }

      return (
      <>
        <div className='form'>
            <Form>
                <Form.Field>
                    <label>Specs</label>
                    <input name="Specs"
                    className='inputform'

                        value={Specs}
                        onChange={(e) => setOilSpec(e.target.value)}
                        placeholder='Specs' />
                </Form.Field>

                <Button type='submit' className='submitform' onClick={sendDataToAPI}>Add</Button>
            </Form>


        </div>
<div>
<Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
          <TableContainer component={Paper}>

      <Table sx={{ minWidth: 650 }} aria-label="customized table">
        <TableHead>
        <TableRow>
        <Button onClick={NameList}><div>test</div></Button>

            <StyledTableCell align="center">id</StyledTableCell>
            <StyledTableCell align="center">OilUsageEn</StyledTableCell>
            <StyledTableCell align="center">Update</StyledTableCell>
            <StyledTableCell align="center">Delete</StyledTableCell>


          </TableRow>
        </TableHead>
        <TableBody>

            
            <StyledTableRow >
              <StyledTableCell id="root" align="center"></StyledTableCell>
              <div ></div>
              <StyledTableCell align="center">
                <IconButton aria-label='delete' className={ClassNames.margin}>
                  <DeleteIcon fontSize="small"/>
                  </IconButton>
                </StyledTableCell>


                <StyledTableCell align="center">
                <Link to = './spec'>
                <IconButton aria-label='edit' >
                <EditIcon fontSize="small"/>
                  </IconButton>
                </Link>
              </StyledTableCell>

            </StyledTableRow>
        </TableBody>
      </Table>
    </TableContainer>
        </Box>
      </Modal>
</div>
        <div>
        {/* <div id="root"></div> */}

        {/* {test.map((name) =>( <h2>{name}</h2>))} */}
    
        </div>
        </>
    )
}