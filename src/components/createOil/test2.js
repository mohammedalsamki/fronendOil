import React from 'react';
import axios from 'axios';

export default class Test1 extends React.Component {
  state = {
    name: ''
  }

  handleChange = event => {
    this.setState({ name: event.target.value });
    console.log(event.target.value)
  }

  handleSubmit = event => {
    event.preventDefault();

    const OilUsage = {
      name: this.state.name
      
    };

    axios.post(`https://backoil.herokuapp.com/api/oil`, { OilUsage })
      .then(res => {
        console.log(res);
        console.log(res.data);


      })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Person Name:
            <input type="text" name="name" onChange={this.handleChange} />
          </label>
          <button type="submit">Add</button>
        </form>
      </div>
    )
  }
}
