import React, { Component } from 'react'
import Select from 'react-select'
import axios from 'axios'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Grid } from '@material-ui/core';
import "../style/select.css"


const ulStyle = {  padding: "12px 10px",  width:'40%', listStyleType:'none'}
const selectStyle = { padding: "12px 10px", width: "50%",marginTop: "20px" }


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
      ItemImage:'',
      files: []

    }
  }
  async getFiles(files){
    await  this.setState({ files: files })
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

  async handleChange(e){
   await this.setState({ID:e.value})
    
   this.setState({ID:e.value})
   console.log(this.state.ID)
   this.setState({OilUsag:e.label})

   this.setState({id:e.value, name:e.label})
   this.getOptionsoilGrade()

  }
  async  oilGradehandleChange(e){
   await this.setState({OilGrade:e.label})
    this.setState({id:e.value, name:e.label})
   }
   async brandhandleChange(e){
     
    await this.setState({Brand:e.label})
    this.setState({id:e.value, name:e.label})
   }
   async  unithandleChange(e){
    await this.setState({Unit:e.label})
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
        <Grid container    style={{  margin: "10px",justifyContent: "space-around"}}>

        <Select justifyContent="center" placeholder="Brand" options={this.state.brandselectOptions} onChange={this.brandhandleChange.bind(this)} />
        <Select justifyContent="center" placeholder="Usges" options={this.state.selectOptions} onChange={this.handleChange.bind(this)} />
        </Grid>
        <br></br>
        <Grid container    style={{  margin: "10px",justifyContent: "space-around"}}>
        

        <Select justifyContent="center" placeholder="Specifications"  options={this.state.oilGradeselectOptions} onChange={this.oilGradehandleChange.bind(this)} />
        </Grid>
        <br></br>
        
        <Grid container    style={{  margin: "10px",justifyContent: "space-around"}}>
        
        


        <TextField
        id="outlined-number"
        label="Capacity"
        type="number"
        // style={ulStyle}
        onChange={(e)=>this.setState({Capasity:e.target.value})}
        InputLabelProps={{
        shrink: true,
        }}
        />

         
         <Select maxWidth="100%"  options={this.state.unitselectOptions} onChange={this.unithandleChange.bind(this)} placeholder="Unit"  style={selectStyle}  />
         </Grid>
         
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
          label="stockQuantity"
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