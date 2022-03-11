import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import 'dotenv/config'


export default function CreateOil() {
  const [OilUsage, setOilUsage]= React.useState('');
  const [Brand,setBrand]= React.useState('');
  const [Capasity,setCapasity]= React.useState('');
  const [OilGrade,setOilGrade]= React.useState('');
  const [Unit,setunit]= React.useState('');
  const [UnitPrice,setUnitPrice]= React.useState('');
  const [StockQuantiti,setStockQuantiti]= React.useState('');



         
  const creatOil = ()=>{
    axios.post('https://backoil.herokuapp.com/api/oil',{OilUsage,Brand,Capasity,OilGrade,Unit,UnitPrice,StockQuantiti}).then( () => {
      window.location.reload(false);
    })
  }


  console.log(OilUsage,Brand,Capasity,OilGrade,Unit)

  return (
    <>
      <h2>Add Oil to stock</h2>
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Oil Usage</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          // value={OilUsage}
          label="OilUsage"
          onChange={(event)=>setOilUsage(event.target.value)}
        >
          <MenuItem value={'EngineOil'}>EngineOil</MenuItem>
          <MenuItem value={'BrakeFluid'}>BrakeFluid</MenuItem>
          <MenuItem value={'TransmissionFluid'}>TransmissionFluid</MenuItem>
        </Select>
      </FormControl>
    <br></br>
    <br></br>

      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Brand</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          // value={Brand}
          label="Brand"
          onChange={(event)=>setBrand(event.target.value)}
        >
          <MenuItem value={"Toyota"}>Toyota</MenuItem>
          <MenuItem value={'Bmw'}>Bmw</MenuItem>
          <MenuItem value={'Tesla'}>Tesla</MenuItem>
        </Select>
      </FormControl>
    
    <br></br>
    <br></br>
    <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">OilGrade</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          // value={OilGrade}
          label="OilGrade"
          onChange={(event)=>setOilGrade(event.target.value)}
        >
          <MenuItem value={'5W20'}>5W20</MenuItem>
          <MenuItem value={'5W30'}>5W30</MenuItem>
          <MenuItem value={'Dot 4'}>Dot 4</MenuItem>
        </Select>
      </FormControl>
    <br></br>
    <br></br>

      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Capasity</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          // value={Capasity}
          label="Capasity"
          onChange={(event)=>setCapasity(event.target.value)}
        >
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={500}>500</MenuItem>
          <MenuItem value={250}>250</MenuItem>
        </Select>
      </FormControl>
    
    <br></br>
    <br></br>
    <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">unit</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          // value={unit}
          label="unit"
          onChange={(event)=>setunit(event.target.value)}
        >
          <MenuItem value={'Quartz'}>Quartz</MenuItem>
          <MenuItem value={'liter'}>liter</MenuItem>
          <MenuItem value={'ml'}>ml</MenuItem>
        </Select>
      </FormControl>
    <br></br>
    <br></br>

    <TextField
          id="outlined-number"
          label="StockQuantiti"
          type="number"
          onChange={(event)=>setStockQuantiti(event.target.value)}
          // value={StockQuantiti}
          InputLabelProps={{
            shrink: true,
          }}
        />
    <br></br>
    <br></br>
    <TextField
          id="outlined-number"
          label="UnitPrice"
          type="number"
          // value={UnitPrice}
          onChange={(event)=>setUnitPrice(event.target.value)}

          InputLabelProps={{
            shrink: true,
          }}
        />
    
    <br></br>
    <br></br>
    <Button variant="contained" color="success" onClick={creatOil}>
        save
      </Button>
    <br></br>
    <br></br>

    </Box>
    </>
  );
}
