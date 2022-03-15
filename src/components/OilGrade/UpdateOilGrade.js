import React, { useState, useEffect } from 'react';
import { Form, Button } from 'semantic-ui-react';
import axios from 'axios';
import { useHistory } from 'react-router';
export default function UpdateOilGrade() {
    let history = useHistory();
    const [OilGradeName, setFirstName] = useState('');
    const [OilGradeDis, setLastName] = useState('');
    const [ID, setID] = useState(null);
    const sendDataToAPI = () => {
        axios.put(`https://backendoil.vercel.app/api/oil/oilGrade/${ID}`, {
            OilGradeName,
            OilGradeDis
        }).then(() => {
            history.push('/OilGrade');
            localStorage.clear();
        })
    }

    useEffect(() => {
        setFirstName(localStorage.getItem('OilGradeName'));
        setLastName(localStorage.getItem('OilGradeDis'));
        setID(localStorage.getItem('ID'))
    }, [])

    return (
        <div>
            <Form>
                <Form.Field>
                    <label>OilGradeName</label>
                    <input name="fname"
                        value={OilGradeName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder='First Name' />
                </Form.Field>
                <Form.Field>
                    <label>OilGradeDis</label>
                    <input
                        name="lname"
                        value={OilGradeDis}
                        placeholder='Last Name'
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </Form.Field>
                <Button type='submit' onClick={sendDataToAPI}>Update</Button>
            </Form>
        </div>
    )
}