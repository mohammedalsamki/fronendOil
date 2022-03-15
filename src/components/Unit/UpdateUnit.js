import React, { useState, useEffect } from 'react';
import { Form, Button } from 'semantic-ui-react';
import axios from 'axios';
import { useHistory } from 'react-router';
export default function UpdateUnit() {
    let history = useHistory();
    const [UnitName, setFirstName] = useState('');
    const [UnitDis, setLastName] = useState('');
    const [ID, setID] = useState(null);
    const sendDataToAPI = () => {
        axios.put(`https://backendoil.vercel.app/api/oil/unit/${ID}`, {
            UnitName,
            UnitDis
        }).then(() => {
            history.push('/unit');
            localStorage.clear();
        })
    }

    useEffect(() => {
        setFirstName(localStorage.getItem('UnitName'));
        setLastName(localStorage.getItem('UnitDis'));
        setID(localStorage.getItem('ID'))
    }, [])

    return (
        <div>
            <Form>
                <Form.Field>
                    <label>UnitName</label>
                    <input name="fname"
                        value={UnitName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder='UnitName' />
                </Form.Field>
                <Form.Field>
                    <label>UnitDis</label>
                    <input
                        name="lname"
                        value={UnitDis}
                        placeholder='UnitDis'
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </Form.Field>
                <Button type='submit' onClick={sendDataToAPI}>Update</Button>
            </Form>
        </div>
    )
}