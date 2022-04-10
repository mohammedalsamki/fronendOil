import React, { Component } from 'react'
import Select from 'react-select'
import axios from 'axios'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import { Grid } from '@material-ui/core';
import "../style/select.css"


const ulStyle = {  padding: "12px 10px",  width:'40%', listStyleType:'none'}
const selectStyle = {padding: "12px 10px", listStyleType:'none',width:"300px",height :'100px'}


export default class CreateSuspention extends Component {

  constructor(props){
      
    super(props)
    this.state = {
      usedFor:'',
      Brand:'',
      StockQuantity:0,
      UnitPrice:0,
      SaelsPrice:0,
      Unit:'',
      category:localStorage.getItem('catID'),
      unitselectOptions:[],
      BrandselectOptions : [],
      selectOptions : [],
      id: "",
      name: '',
      nameAr: '',
      ID:"",
      Note:'',
      BrandPartNumber:'',
      OEMPartNumber:'',
      StockNumber:'',
      ItemImage:'',
      MinQty:0,
      files: null

    }
  }
  async getFiles(files){
    await  this.setState({ files: files })
  }
 
 async getOptions(){

    const res = await axios.get('https://backoil.herokuapp.com/api/Suspention/use/get')
    const data = res.data
    
    const options = data.map(d => ({
      "value" : d._id,
      "label" : d.SuspentionsUsageEn

    }))
    this.setState({selectOptions: options})

  }
  async getOptionsBrand(){

    const res = await axios.get('https://backoil.herokuapp.com/api/oil/Brand')
    const data = res.data
   this.setState({ID:data._id})

    const options = data.map(d => ({
      "value" : d._id,
      "label" : d.BrandEn

    }))
    this.setState({BrandselectOptions: options})
  }
  

  async handleChange(e){
   await this.setState({ID:e.value})
    
   this.setState({ID:e.value})
   console.log(this.state.ID)
   this.setState({usedFor:e.label})

   this.setState({id:e.value, name:e.label})

  }

   async BrandhandleChange(e){
     
    await this.setState({Brand:e.label})
    this.setState({id:e.value, name:e.label})
   }
   async  unithandleChange(e){
    await this.setState({Unit:e.label})
    this.setState({id:e.value, name:e.label})
   }

  componentDidMount(){
      this.getOptions()
      this.getOptionsBrand()

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
    // this.setState({usedFor:e.label})

    let x= {

      usedFor:this.state.usedFor,
      Brand:this.state.Brand,
      StockQuantity:this.state.StockQuantity,
      UnitPrice:this.state.UnitPrice,
      Unit:this.state.Unit,
      category:this.state.category,
      SaelsPrice:this.state.SaelsPrice,
      BrandPartNumber:this.state.BrandPartNumber,
      OEMPartNumber:this.state.OEMPartNumber,
      StockNumber:this.state.StockNumber,
      ItemImage:this.state.files,
      Note:this.state.Note,
      MinQty:this.state.MinQty

    }
    console.log(x)
   await axios.post('https://backoil.herokuapp.com/api/products/product/create',x).then( () => {
    alert("item added")

      // window.location.reload(false);

    })
  }
  render() {
    
    return (
      <div>
        <Grid container    style={{  margin: "10px",justifyContent: "space-around"}}>

        <Select justifyContent="center" placeholder="Brand" options={this.state.BrandselectOptions} onChange={this.BrandhandleChange.bind(this)} />
        <Select justifyContent="center" placeholder="usedFor" options={this.state.selectOptions} onChange={this.handleChange.bind(this)} />
        </Grid>
        <Grid container    style={{  margin: "10px",justifyContent: "space-around"}}>
        

        </Grid>
        <br></br>
        
        <Grid container    style={{  margin: "10px",justifyContent: "space-around"}}>
        
      
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


           <textarea
         
        id="outlined-number"
         style={selectStyle }

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
         placeholder="StockQuantity"

          type="number"
          onChange={(e)=>this.setState({StockQuantity:e.target.value})}
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