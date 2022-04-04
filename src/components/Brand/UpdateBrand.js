import React, { useState, useEffect } from 'react';
import { Form, Button } from 'semantic-ui-react';
import '../style/form.css'
import axios from 'axios';
import { useHistory } from 'react-router';

export default function UpdateBrand() {
  let [Imagenew,setImagenew]= React.useState(String);
  const handleFile = (e) =>{
    // console.log(e.target.files[0])
    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();
      console.log(reader)
      reader.onload = (e) => {
        setImagenew(reader.result);
        alert("image uploaded");
       console.log(Imagenew)

      };
      reader.readAsDataURL(e.target.files[0]);

    }
  }
    let history = useHistory();
    const [BrandAr, setFirstName] = useState('');
    const [BrandEn, setLastName] = useState('');
    const [BrandDiscr, setBrandDiscr] = useState('');

    const [ID, setID] = useState(null);
    const sendDataToAPI = () => {
        axios.put(`https://backoil.herokuapp.com/api/oil/brand/${ID}`, {
            BrandAr,
            BrandEn,
            BrandDiscr,
            BrandImage:Imagenew
        }).then(() => {
            history.push('/Brand');
            localStorage.clear();
        })
    }

    useEffect(() => {
        setFirstName(localStorage.getItem('BrandAr'));
        setLastName(localStorage.getItem('BrandEn'));
        setBrandDiscr(localStorage.getItem('BrandDiscr'));
        setID(localStorage.getItem('ID'))
    }, [])

    return (
        <div className='form'>
            <Form>
                <Form.Field>
                    <label>Name Ar</label>
                    <input name="fname"
                    className='inputform'
                    value={BrandAr}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder='' />
                </Form.Field>
                <Form.Field>
                    <label>Name En</label>
                    <input
                    className='inputform'
                    name="lname"
                        value={BrandEn}
                        placeholder=''
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Description</label>
                    <input
                    className='inputform'
                    name="lname"
                        value={BrandDiscr}
                        placeholder=''
                        onChange={(e) => setBrandDiscr(e.target.value)}
                    />
                </Form.Field>
                <Form.Field align="center"  class="grid-container">
                    <label>image</label>
                    <br></br>
                    <input name="image"
                    type="file"
                    class="item1"
                    className='inputform'
                    // value={}
                        onChange={(e) => handleFile(e)}
                        placeholder='image' />

                </Form.Field>
                <Button type='submit' className='submitform' onClick={sendDataToAPI}>Update</Button>
            </Form>
        </div>
    )
}