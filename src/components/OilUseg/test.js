import React, { useState, useEffect } from 'react';
import { Form, Button } from 'semantic-ui-react';
import axios from 'axios';
import { useHistory } from 'react-router';
import '../style/form.css'

export default function AddSpec() {
    let history = useHistory();
    const [Specs, setOilSpec] = useState('');
    const [OilUsageEn, setOilUsageEn] = useState('');
  
    const [ID, setID] = useState(null);
    const sendDataToAPI = () => {
        axios.put(`http://localhost:5001/api/oil/spec/${ID}`, {
          OilUsageEn,
          Specs
        }).then(() => {
          window.location.reload(false);
            history.push('/OilUseg');
            localStorage.clear();
            console.log(Specs)
        }).catch(error => {
          console.log(error.response)
      });
    }
    useEffect(() => {
        setID(localStorage.getItem('ID'))
        setOilUsageEn(localStorage.getItem('OilUsageEn'));
    
        setOilSpec(localStorage.getItem('Specs'))
    }, [])
    return (
        <div className='form'>
            <Form>
                <Form.Field>
                    <label>Specs</label>
                    <input name="Specs"
                    className='inputform'

                        value={Specs}
                        onChange={(e) => setOilSpec(e.target.value)}
                        placeholder='Specs' />
                </Form.Field>

                <Button type='submit' className='submitform' onClick={sendDataToAPI}>Add</Button>
            </Form>
        </div>
    )
}