import React from 'react'
import axios from 'axios';
// import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import  { SelectChangeEvent } from '@mui/material/Select';
import Select from 'react-select'

import { useEffect } from 'react';


const style = {
  position: 'absolute' ,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


export default function Vehicles(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  let [year,setyear]= React.useState(String);
  let [modale,setmodale]= React.useState(String);
  let [Manufacturer,setManufacturer]= React.useState(String);
  let [ManufacturerValue,setManufacturerValue]= React.useState(String);


  const [age, setAge] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value );
  };

  const getOptionsBrand=async()=>{

    const res = await axios.get('https://backoil.herokuapp.com/api/vehicles/Manufacturer/get/')
    const data = res.data
    console.log(data)
  //  this.setState({ID:data._id})

    const options = data.map(d => ({
      "value" : d._id,
      "label" : d.nameEn

    }))
    setManufacturer(options)
  }
  useEffect(async()=>{
    getOptionsBrand();
    
  },[]);
  
const getVehiclesItem=async()=>{
  console.log(props)
  try {

    // console.log(res.data[0].vehicles[0])
    const resn = await axios.get(`https://backoil.herokuapp.com/api/vehicles/Vehicles/get/${props.vehclesItem[1]}`); 
  console.log(resn.data.ModelYear)
  setyear(resn.data.ModelYear)
  console.log(resn.data.category)
  const resnM = await axios.get(`https://backoil.herokuapp.com/api/vehicles/Modale/get/${resn.data.category}`); 
  console.log(resnM.data)
  setmodale(resnM.data.ModelEn)
    // console.log("from local",branditemData)
    // console.log("from api",res.data)
} catch (err) {
    console.log(err);
}
}
return (
  <div>
    <p>Vehicles </p>
    <button onClick={getOptionsBrand}>--</button>
    <p>{modale} {year}</p>

    <Button onClick={handleOpen}>+</Button>    <div>
      
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <Select placeholder='Manufacturer' options={Manufacturer}   onChange={(e) => setManufacturerValue(e.label)} />

        
        </Box>
      </Modal>
    </div>
  </div>
)
}


  
