import React, { Component } from 'react'
import Select from 'react-select'
import axios from 'axios'
import Button from '@mui/material/Button';


export default class Test extends Component {

  constructor(props){
      
    super(props)
    this.state = {
      OilUsag:'',

      selectOptions : [],
      id: "",
      name: '',
    }
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
  
  handleChange(e){
   this.setState({OilUsag:e.label})
    let OilUsag=e.label
    console.log(OilUsag)
   this.setState({id:e.value, name:e.label})
   let OilUsag1 = e.label
   console.log(e.label)
   return OilUsag1
  }

  componentDidMount(){
      this.getOptions()
  }

  creatOill (e){
    this.setState({OilUsag:e.label})
    console.log(this.state.OilUsag)

    let x= {
      OilUsage:this.state.OilUsag,
      Brand:'String',
      OilGrade:'String',
      Capasity:3,
      StockQuantiti:5,
      UnitPrice:7,
      Unit:'String'
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
    <p>You have selected <strong>{this.state.name} </strong></p>
    <Button variant="contained" color="success" onClick={this.creatOill.bind(this)}>
        save
      </Button>
      </div>
    )
  }
}