import React from 'react';
import { Container,AppBar, Grow,Grid } from '@material-ui/core';
import ShowOil from './components/showOIl/showOil.js';
import CreatOil from './components/createOil/createOil.js';
import useStyles from './styles';
import ModalUnstyled from '@mui/base/ModalUnstyled';
import { styled, Box } from '@mui/system';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';

const StyledModal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Backdrop = styled('div')`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
};

export default function  Home() {
  const classes= useStyles();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  return (
  
  
    <div className="App">
      <StyledModal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={open}
        onClose={handleClose}
        BackdropComponent={Backdrop}
      >
        <Box sx={style}>
        <CreatOil /> 
        </Box>
      </StyledModal>
      

           <Container maxWidth="1200px">
                 <AppBar className={classes.appBar} position='static' color='inherit'  style={{ margin: "30px 10px 0px 0px"}}>
                 <IconButton type="button" onClick={handleOpen}>
                 <AddIcon fontSize="larg"/>
                 Add
                 </IconButton>

                 </AppBar>
                 <ShowOil /> 


          
           </Container>

    </div>

  );
}

