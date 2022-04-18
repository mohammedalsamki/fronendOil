import { async } from 'q';
import React from 'react'
import axios from 'axios';

export default function Vehicles(props) {
  let [year,setyear]= React.useState(String);
  let [modale,setmodale]= React.useState(String);


const getVehiclesItem=async()=>{
  try {

    // console.log(res.data[0].vehicles[0])
    const resn = await axios.get(`https://backoil.herokuapp.com/api/vehicles/Vehicles/get/${props.vehclesItem[1]}`); 
  console.log(resn.data.ModelYear)
  setyear(resn.data.ModelYear)
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
    <button onClick={getVehiclesItem}>--</button>
    <p>{modale} {year}</p>

    <button >+</button>
  </div>
)
}


  
