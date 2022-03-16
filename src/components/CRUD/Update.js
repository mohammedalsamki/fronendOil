import React, { useState, useEffect } from 'react';
import { Form, Button } from 'semantic-ui-react';
import axios from 'axios';
import { useHistory } from 'react-router';
import '../style/form.css'

export default function AddEdit() {
    let history = useHistory();
    const [OilUsageAr, setFirstName] = useState('');
    const [OilUsageEn, setLastName] = useState('');
    const [ID, setID] = useState(null);
    const sendDataToAPI = () => {
        axios.put(`https://backendoil.vercel.app/api/oil/oilUseg/${ID}`, {
            OilUsageAr,
            OilUsageEn
        }).then(() => {
            history.push('/OilUseg');
            localStorage.clear();
        })
    }

    useEffect(() => {
        setFirstName(localStorage.getItem('OilUsageAr'));
        setLastName(localStorage.getItem('OilUsageEn'));
        setID(localStorage.getItem('ID'))
    }, [])

    return (
        <div className='form'>
            <Form>
                <Form.Field>
                    <label>OilUsageAr</label>
                    <input name="fname"
                    className='inputform'

                        value={OilUsageAr}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder='First Name' />
                </Form.Field>
                <Form.Field>
                    <label>OilUsageEn</label>
                    <input
                    className='inputform'
                    name="lname"
                        value={OilUsageEn}
                        placeholder='Last Name'
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </Form.Field>
                <Button type='submit' className='submitform' onClick={sendDataToAPI}>Update</Button>
            </Form>
        </div>
    )
}