import randomSeed from "./random";
import axios from 'axios'



export function generateRows () {
    
    const res =  axios.get('http://localhost:5002/api/category/get')
    let data = res.data
    console.log(data)

  return data;
}

