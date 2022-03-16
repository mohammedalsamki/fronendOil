import React, { useState, useEffect } from 'react';
import { styled, Box } from '@mui/system';
import { useHistory } from 'react-router';
import ModalUnstyled from '@mui/base/ModalUnstyled';
import axios from 'axios';
import Button from '@mui/material/Button';


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
  width: 800,
  bgcolor: 'white',
  border: '2px solid #000',
  p: 2,
  px: 4,
  pb: 3,
};

export default function ModalUnstyledDemo({parentToChild ,ToChild}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  let history = useHistory();
  const [Specs, setOilSpec] = useState('');
  const [ID, setID] = useState(null);
  const sendDataToAPI = () => {
      axios.put(`https://backendoil.vercel.app/api/oil/spec/${ID}`, {
        Specs
      }).then(() => {
          history.push('/OilUseg');
          localStorage.clear();
      })
  }
  useEffect(() => {
    setID(localStorage.getItem('ID'))
}, [])

  return (
    <div>
      <button type="button" onClick={handleOpen}>
        Open modal
      </button>
      <StyledModal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={open}
        onClose={handleClose}
        BackdropComponent={Backdrop}
      >
        <Box sx={style}>
          <h2 id="unstyled-modal-title">oil ID {parentToChild}</h2>
          <h2 id="unstyled-modal-title">oil Name {ToChild}</h2>

          <div align="center">Add Spec</div>
          <br></br>

        <form align="center">
        <input name="fname"
                    className='inputform'

                        onChange={(e) => setOilSpec(e.target.value)}
                        placeholder='First Name' />
          <br></br>
          <br></br>

          <Button type='submit' className='submitform' onClick={sendDataToAPI}>Add</Button>
        </form>
        </Box>
      </StyledModal>
    </div>
  );
}
