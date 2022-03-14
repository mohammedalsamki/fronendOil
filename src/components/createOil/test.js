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

//   console.log(OilUsage,Brand,Capasity,OilGrade,Unit)
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
  createoilUsege (e){
    this.setState({OilUsag:e.label})
    console.log(this.state.OilUsag)
    let OilUsag=e.OilUsag
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ OilUsag: OilUsag })
    };
    fetch('https://backendoil.vercel.app/api/oil', requestOptions)
        .then(response => response.json())
        .then(data => this.setState({ OilUsag: data}));
        console.log(e.OilUsag)
  }
  creatOill (e){
    this.setState({OilUsag:e.label})
    console.log(this.state.OilUsag)
    let OilUsag=e.OilUsag
    console.log(OilUsag)
    axios.post('https://backendoil.vercel.app/api/oil',{OilUsag}).then( () => {
      window.location.reload(false);

    })
  }
  render() {
    
    return (
      <div>
          <p>oilUseg</p>
        <Select options={this.state.selectOptions} onChange={this.handleChange.bind(this)} />
    <p>You have selected <strong>{this.state.name} </strong></p>
    <Button variant="contained" color="success" onClick={this.createoilUsege.bind(this)}>
        save
      </Button>
      </div>
    )
  }
}