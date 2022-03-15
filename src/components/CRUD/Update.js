import React, { useState, useEffect } from 'react';
import { Form, Button } from 'semantic-ui-react';
import axios from 'axios';
import { useHistory } from 'react-router';
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
        <div>
            <Form>
                <Form.Field>
                    <label>OilUsageAr</label>
                    <input name="fname"
                        value={OilUsageAr}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder='First Name' />
                </Form.Field>
                <Form.Field>
                    <label>OilUsageEn</label>
                    <input
                        name="lname"
                        value={OilUsageEn}
                        placeholder='Last Name'
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </Form.Field>
                <Button type='submit' onClick={sendDataToAPI}>Update</Button>
            </Form>
        </div>
    )
}