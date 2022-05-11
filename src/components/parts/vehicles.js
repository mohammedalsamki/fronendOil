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
  console.log(props)
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  let [year,setyear]= React.useState(String);
  let [modale,setmodale]= React.useState(String);
  let [Manufacturer,setManufacturer]= React.useState(String);
  let [ManufacturerValue,setManufacturerValue]= React.useState(String);
  let [ManufacturerID,setManufacturerID]= React.useState(String);
  let [ModaleValue,setModaleValue]= React.useState(String);
  let [Modale,setModale]= React.useState(String);
  let [ModaleID,setModaleID]= React.useState(String);
  let [VehcleValue,setVehcleValue]= React.useState(String);
  let [Vehcle,setVehcle]= React.useState(String);
  let [VehcleID,setVehcleID]= React.useState(String);
  let [VehcleIDend,setVehcleIDend]= React.useState(String);
  let [VehcleValueend,setVehcleValueend]= React.useState(String);
  let [arrVhcles,setarrVhcles]= React.useState([]);






  

  const getOptionsBrand=async()=>{

    const res = await axios.get('https://backendapioill.herokuapp.com/api/vehicles/Manufacturer/get/')
    const data = res.data
    console.log(data)
  //  this.setState({ID:data._id})

    const options = data.map(d => ({
      "value" : d._id,
      "label" : d.nameEn

    }))
    setManufacturer(options)
    // getOptionsModale(ManufacturerID);
    localStorage.setItem('ManufacturerID', ManufacturerID)

  }
  const getOptionsModale=async()=>{
    console.log(ManufacturerID)
   
  //  this.setState({ID:data._id})
  async function fetchData() {
    try {
      const res = await axios.post('https://backendapioill.herokuapp.com/api/vehicles/Modale/get/',{category:ManufacturerID}); 
    const data = res.data
    const options = data.map(d => ({
      "value" : d._id,
      "label" : d.ModelEn

    }))
    setModale(options)
    console.log(Modale)

  } catch (err) {
      console.log(err);
  }
}
fetchData();

   
  }
  const getVehiclesItem=async(idNew,cat)=>{
    // setparent(localStorage.getItem('catID'));
    console.log(ModaleID)
    async function fetchData() {
        try {
          const res = await axios.post('https://backendapioill.herokuapp.com/api/vehicles/Vehicles/get/',{category:ModaleID}); 
          const data = res.data
          const options = data.map(d => ({
            "value" : d._id,
            "label" : d.ModelYear
      
          }))
          setVehcle(options)
          console.log(Vehcle)
        } catch (err) {
          console.log(err);
      }
    }
    fetchData();
     }
  useEffect(async()=>{
    getOptionsBrand();
   await getOptionsModale();
   getVehiclesItem();
  },[ManufacturerID,ModaleID]);
  
const allVehcles=()=>{
  for(let i = 0; i < Vehcle.length; i++){
  // console.log(Vehcle[i].value)
  if (Vehcle[i].label>=VehcleValue && Vehcle[i].label<=VehcleValueend) {
  arrVhcles.push(Vehcle[i].value)
    
  }
}

  try {
    axios.put(`https://backendapioill.herokuapp.com/api/products/spec/${props.partID}`,{
      vehicles:arrVhcles,
    })
    alert("Vehicles Added")
    window.location.reload(false);

  } catch (error) {
    
  }

  

  console.log(arrVhcles)

}
return (
  <>
        {(() => {
              if (!props.partID){
                  return (
                       <>
    <p>Vehicles </p>

                      <h3>Click in Part </h3>
                      </>
                  )
              }else{
                return (
  <div>
    
    <p>Vehicles </p>
    <p>{props.partID}</p>

    <Button onClick={handleOpen}>+</Button>    <div>
      
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <Select placeholder='Manufacturer' options={Manufacturer}   onChange={(e) => {setManufacturerValue(e.label); setManufacturerID(e.value);getOptionsModale(ManufacturerID)}} />
        <br></br>
        <br></br>
        <Select placeholder='Modale' options={Modale}   onChange={(e) => {setModaleValue(e.label);setModaleID(e.value) }} />
        <br></br>
        <br></br>
        <Select placeholder='start year' options={Vehcle}   onChange={(e) => {setVehcleValue(e.label);setVehcleID(e.value) }} />
        <br></br>
        <br></br>
        <Select placeholder='End year' options={Vehcle}   onChange={(e) => {setVehcleValueend(e.label);setVehcleIDend(e.value) }} />
        <br></br>
        <br></br>
        <Button onClick={allVehcles}>Add</Button>



        
        </Box>
      </Modal>
    </div>
  </div>
   )
  }
  return null;
})()}
  </>
)
}


  
