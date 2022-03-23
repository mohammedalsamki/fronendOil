import React, { Component } from 'react'
import Select from 'react-select'
import axios from 'axios'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Grid } from '@material-ui/core';
import "../style/select.css"
import { file } from '@babel/types';
import Image from "material-ui-image";



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
      OEMPartNumber:'',
      BrandPartNumber:'',
      StockNumber:'',
      ItemImage:null,
      files:null,
      MinQty:0

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

  };

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
  async handleFile (e) {
    console.log(e.target.files)

    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        this.setState({files: e.target.result});
    // console.log(this.state.files)

      };
      reader.readAsDataURL(e.target.files[0]);

    

    }

  };
 async creatOill (e){

    this.setState({OilUsag:e.label});
 


    let x= {
      OilUsage:this.state.OilUsag,
      Brand:this.state.Brand,
      OilGrade:this.state.OilGrade,
      Capasity:this.state.Capasity,
      StockQuantiti:this.state.StockQuantiti,
      UnitPrice:this.state.UnitPrice,
      Unit:this.state.Unit,
      SaelsPrice:this.state.SaelsPrice,
      OEMPartNumber:this.state.OEMPartNumber,
      BrandPartNumber:this.state.BrandPartNumber,

      StockNumber:this.state.StockNumber,
      ItemImage:this.state.files,
      Note:this.state.Note,
      MinQty:this.state.MinQty
    }
    // console.log(x)
    alert("added NEW ITEM ")
    console.log(x)

  //  await axios
  //   .post('https://backendoil.vercel.app/api/oil', x)
  //   .then((response) => {
  //     console.log(response);
  //     window.location.reload(false);

  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });

  }
  render() {
    
    return (
      <div>
        {/* <div>
        <Image src={this.state.files}/>


        </div> */}
        <Grid container    style={{  margin: "10px",justifyContent: "space-around"}}>

        <Select justifyContent="center" placeholder="Brand" options={this.state.brandselectOptions} onChange={this.brandhandleChange.bind(this)} />
        <Select justifyContent="center" placeholder="Usge" options={this.state.selectOptions} onChange={this.handleChange.bind(this)} />
        </Grid>
        <br></br>
        <Grid container    style={{  margin: "10px",justifyContent: "space-around"}}>
        

        <Select justifyContent="center" placeholder="Specifications"  options={this.state.oilGradeselectOptions} onChange={this.oilGradehandleChange.bind(this)} />
        </Grid>
        <br></br>
        
        <Grid container    style={{  margin: "10px",justifyContent: "space-around"}}>
        
        


        <TextField
        id="outlined-number"
        placeholder="Capacity"
        type="number"
        style={ulStyle}
          onChange={(e)=>this.setState({Capacity:e.target.value})}
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
        placeholder="ItemImage"

          type="file"
          onChange={(e)=>this.handleFile(e)}
          InputLabelProps={{
            shrink: true,
          }}
        />


           <TextField
         
        id="outlined-number"
         style={ulStyle}
        placeholder="Note"
          type="text"
          onChange={(e)=>this.setState({Note:e.target.value})}
          InputLabelProps={{
            shrink: true,
          }}
        />


           <TextField
         
        id="outlined-number"
         style={ulStyle}
        placeholder="StockNumber"
          type="text"
          onChange={(e)=>this.setState({StockNumber:e.target.value})}
          InputLabelProps={{
            shrink: true,
          }}
        />
           <TextField
         
         id="outlined-number"
          style={ulStyle}
         placeholder="BrandPartNumber"
           type="text"
           onChange={(e)=>this.setState({BrandPartNumber:e.target.value})}
           InputLabelProps={{
             shrink: true,
           }}
         />


           <TextField
         
        id="outlined-number"
         style={ulStyle}
        placeholder="OEMPartNumber"
          type="text"
          onChange={(e)=>this.setState({OEMPartNumber:e.target.value})}
          InputLabelProps={{
            shrink: true,
          }}
        />
          </Grid>

         <Grid container  justifyContent="center" style={{ margin: "0px 20px 0px 0px"}}>

           <TextField
         style={ulStyle}
         
        id="outlined-number"
        placeholder="stockQuantity"
          type="number"
          onChange={(e)=>this.setState({StockQuantiti:e.target.value})}
          InputLabelProps={{
            shrink: true,
          }}
        />
                   <TextField
         style={ulStyle}
         
        id="outlined-number"
        placeholder="MinQty"
          type="number"
          onChange={(e)=>this.setState({MinQty:e.target.value})}
          InputLabelProps={{
            shrink: true,
          }}
        />

        <TextField
         style={ulStyle}
         

          id="outlined-number"
        placeholder="UnitPrice"
          type="number"
          onChange={(e)=>this.setState({UnitPrice:e.target.value})}
          InputLabelProps={{
            shrink: true,
          }}
        />


        <TextField
         style={ulStyle}
         
          id="outlined-number"
        placeholder="SaelsPrice"
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