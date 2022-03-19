import React, { Component } from 'react'
import Select from 'react-select'
import axios from 'axios'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Container,AppBar, Grow,Grid } from '@material-ui/core';


const ulStyle = {  padding: "12px 10px",  width:'40%', listStyleType:'none'}


export default class Test extends Component {

  constructor(props){
      
    super(props)
    this.state = {
      OilUsag:'',
      Brand:'',
      OilGrade:'',
      Capasity:0,
      StockQuantiti:0,
      UnitPrice:0,
      SaelsPrice:0,
      Unit:'',
      unitselectOptions:[],
      brandselectOptions : [],
      selectOptions : [],
      capacityselectOptions:[],
      id: "",
      name: '',
      ID:"",
      Note:'',
      PartNumber:'',
      StockNumber:'',
      ItemImage:''
    }
  }
  async getOptionsunit(){

    const res = await axios.get('https://backendoil.vercel.app/api/oil/unit')
    const data = res.data
    const options = data.map(d => ({
      "value" : d._id,
      "label" : d.UnitNameEn

    }))

    this.setState({unitselectOptions: options})
  }
 async getOptions(){

    const res = await axios.get('https://backendoil.vercel.app/api/oil/oilUseg')
    const data = res.data
    
    const options = data.map(d => ({
      "value" : d._id,
      "label" : d.OilUsageEn

    }))
    this.setState({selectOptions: options})

  }
  async getOptionsbrand(){

    const res = await axios.get('https://backendoil.vercel.app/api/oil/brand')
    const data = res.data
   this.setState({ID:data._id})

    const options = data.map(d => ({
      "value" : d._id,
      "label" : d.BrandEn

    }))
    this.setState({brandselectOptions: options})
  }
  async getOptionsoilGrade(){

    const res = await axios.get(`https://backendoil.vercel.app/api/oil/tours/${this.state.ID}`)
    const data = res.data.Specs
    const options = data.map(name => ({
      "value" : name,
      "label" : name

    }))

    this.setState({oilGradeselectOptions: options})

  }

  handleChange(e){
    
   this.setState({ID:e.value})
   console.log(this.state.ID)
   this.setState({OilUsag:e.label})

   this.setState({id:e.value, name:e.label})
   this.getOptionsoilGrade()

  }
  oilGradehandleChange(e){
    this.setState({OilGrade:e.label})
    this.setState({id:e.value, name:e.label})
   }
   brandhandleChange(e){
    this.setState({Brand:e.label})
    this.setState({id:e.value, name:e.label})
   }
   unithandleChange(e){
    this.setState({Unit:e.label})
    this.setState({id:e.value, name:e.label})
   }

  componentDidMount(){
      this.getOptions()
      this.getOptionsbrand()
      this.getOptionsoilGrade()
      this.getOptionsunit()




  }

  creatOill (e){
    this.setState({OilUsag:e.label})

    let x= {
      OilUsage:this.state.OilUsag,
      Brand:this.state.Brand,
      OilGrade:this.state.OilGrade,
      Capasity:this.state.Capasity,
      StockQuantiti:this.state.StockQuantiti,
      UnitPrice:this.state.UnitPrice,
      Unit:this.state.Unit,
      SaelsPrice:this.state.SaelsPrice,
      PartNumber:this.state.PartNumber,
      StockNumber:this.state.StockNumber,
      ItemImage:this.state.ItemImage,
      Note:this.state.Note
    }
    axios.post('https://backendoil.vercel.app/api/oil',x).then( () => {
      window.location.reload(false);

    })
  }
  render() {
    
    return (
      <div>
            <p justifyContent="center">Brand</p>
        <Select justifyContent="center" options={this.state.brandselectOptions} onChange={this.brandhandleChange.bind(this)} />
          <p justifyContent="center">Usges</p>
        <Select justifyContent="center" options={this.state.selectOptions} onChange={this.handleChange.bind(this)} />
        
    <p justifyContent="center">oil Specifications</p>

<Select justifyContent="center" options={this.state.oilGradeselectOptions} onChange={this.oilGradehandleChange.bind(this)} />
<p   alignItems="center"
>Capacity</p>


<TextField
justifyContent="center"
id="outlined-number"
label="Capacity"
type="number"
onChange={(e)=>this.setState({Capasity:e.target.value})}
InputLabelProps={{
 shrink: true,
}}
/>

        <p>Unit</p>

         <Select justifyContent="center" options={this.state.unitselectOptions} onChange={this.unithandleChange.bind(this)} />
         <br></br>
         
         <Grid container  justifyContent="center" style={{ margin: "0px 20px 0px 0px"}}>

           <TextField
         style={ulStyle}
        id="outlined-number"
          label="ItemImage"
          type="text"
          onChange={(e)=>this.setState({ItemImage:e.target.value})}
          InputLabelProps={{
            shrink: true,
          }}
        />


           <TextField
         
        id="outlined-number"
         style={ulStyle}
         label="Note"
          type="text"
          onChange={(e)=>this.setState({Note:e.target.value})}
          InputLabelProps={{
            shrink: true,
          }}
        />


           <TextField
         
        id="outlined-number"
         style={ulStyle}
         label="StockNumber"
          type="number"
          onChange={(e)=>this.setState({StockNumber:e.target.value})}
          InputLabelProps={{
            shrink: true,
          }}
        />



           <TextField
         
        id="outlined-number"
         style={ulStyle}
         label="PartNumber"
          type="number"
          onChange={(e)=>this.setState({PartNumber:e.target.value})}
          InputLabelProps={{
            shrink: true,
          }}
        />
                      </Grid>

         <Grid container  justifyContent="center" style={{ margin: "0px 20px 0px 0px"}}>

           <TextField
         style={ulStyle}
         
        id="outlined-number"
          label="StockQuantiti"
          type="number"
          onChange={(e)=>this.setState({StockQuantiti:e.target.value})}
          InputLabelProps={{
            shrink: true,
          }}
        />

        <TextField
         style={ulStyle}
         

          id="outlined-number"
          label="UnitPrice"
          type="number"
          onChange={(e)=>this.setState({UnitPrice:e.target.value})}
          InputLabelProps={{
            shrink: true,
          }}
        />


        <TextField
         style={ulStyle}
         
          id="outlined-number"
          label="SaelsPrice"
          type="number"
          onChange={(e)=>this.setState({SaelsPrice:e.target.value})}
          InputLabelProps={{
            shrink: true,
          }}
        />


        </Grid>

        <Grid container justifyContent="center" style={{ margin: "0px 0px 0px 0px"}}>

    <Button variant="contained" color="success" onClick={this.creatOill.bind(this)}>
        save
      </Button>
      </Grid>

      </div>
    )
  }
}