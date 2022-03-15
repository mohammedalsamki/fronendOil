import React, { useState, useEffect } from 'react';
import { Form, Button } from 'semantic-ui-react';
import axios from 'axios';
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
        <div>
            <Form>
                <Form.Field>
                    <label>capacityName</label>
                    <input name="fname"
                        value={capacityName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder='' />
                </Form.Field>
                <Form.Field>
                    <label>capacityNumber</label>
                    <input
                        name="lname"
                        type="number"
                        value={capacityNumber}
                        placeholder=''
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </Form.Field>
                <Button type='submit' onClick={sendDataToAPI}>Update</Button>
            </Form>
        </div>
    )
}