import React, { Component } from 'react'
import Select from 'react-select'
import axios from 'axios'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';



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
      Unit:'',
      unitselectOptions:[],
      brandselectOptions : [],
      selectOptions : [],
      capacityselectOptions:[],
      id: "",
      name: '',
      ID:"6232eed2073d7ddc71abba9c"
    }
  }
  async getOptionsunit(){

    const res = await axios.get('https://backendoil.vercel.app/api/oil/unit')
    const data = res.data
    const options = data.map(d => ({
      "value" : d._id,
      "label" : d.UnitName

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
  async getOptionsCapasity(){

    const res = await axios.get('https://backendoil.vercel.app/api/oil/capacity')
    const data = res.data
    const options = data.map(d => ({
      "value" : d._id,
      "label" : d.capacityNumber

    }))

    this.setState({capacityselectOptions: options})
    console.log("reload grade")

  }
  
  handleChangecapacity(e){
    this.setState({Capasity:e.label})
    this.setState({id:e.value, name:e.label})
 
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
      this.getOptionsCapasity()




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
      Unit:this.state.Unit
    }
    axios.post('https://backendoil.vercel.app/api/oil',x).then( () => {
      window.location.reload(false);

    })
  }
  render() {
    
    return (
      <div>
          <p>oilUseg</p>
        <Select options={this.state.selectOptions} onChange={this.handleChange.bind(this)} />
    <p>Brand</p>
        <Select options={this.state.brandselectOptions} onChange={this.brandhandleChange.bind(this)} />

    <p>oil Specifications</p>

        <Select options={this.state.oilGradeselectOptions} onChange={this.oilGradehandleChange.bind(this)} />
        <p>Unit</p>

         <Select options={this.state.unitselectOptions} onChange={this.unithandleChange.bind(this)} />
           <p>Capasity</p>

      <Select options={this.state.capacityselectOptions} onChange={this.handleChangecapacity.bind(this)} />
           <br></br>
           <TextField
          id="outlined-number"
          label="StockQuantiti"
          type="number"
          onChange={(e)=>this.setState({StockQuantiti:e.target.value})}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <br></br>
        <br></br>

        <TextField
          id="outlined-number"
          label="StockQuantiti"
          type="UnitPrice"
          onChange={(e)=>this.setState({UnitPrice:e.target.value})}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <br></br>
        <br></br>


    <Button variant="contained" color="success" onClick={this.creatOill.bind(this)}>
        save
      </Button>
      </div>
    )
  }
}