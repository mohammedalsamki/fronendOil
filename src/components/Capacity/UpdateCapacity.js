import React, { useState, useEffect } from 'react';
import { Form, Button } from 'semantic-ui-react';
import axios from 'axios';
import '../style/form.css'
import { useHistory } from 'react-router';
export default function UpdateCapacity() {
    let history = useHistory();
    const [capacityName, setFirstName] = useState('');
    const [capacityNumber, setLastName] = useState('');
    const [ID, setID] = useState(null);
    const sendDataToAPI = () => {
        axios.put(`https://backendoil.vercel.app/api/oil/capacity/${ID}`, {
            capacityName,
            capacityNumber
        }).then(() => {
            history.push('/Capacity');
            localStorage.clear();
        })
    }

    useEffect(() => {
        setFirstName(localStorage.getItem('capacityName'));
        setLastName(localStorage.getItem('capacityNumber'));
        setID(localStorage.getItem('ID'))
    }, [])

    return (
        <div className='form'>
            <Form>
                <Form.Field>
                    <label>capacityName</label>
                    <input name="fname"
                    className='inputform'
                    value={capacityName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder='' />
                </Form.Field>
                <Form.Field>
                    <label>capacityNumber</label>
                    <input
                    className='inputform'
                    name="lname"
                        type="number"
                        value={capacityNumber}
                        placeholder=''
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </Form.Field>
                <Button type='submit' className='submitform' onClick={sendDataToAPI}>Update</Button>
            </Form>
        </div>
    )
}