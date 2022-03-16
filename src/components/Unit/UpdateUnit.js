import React, { useState, useEffect } from 'react';
import { Form, Button } from 'semantic-ui-react';
import axios from 'axios';
import '../style/form.css'
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
        <div className='form'>
            <Form>
                <Form.Field>
                    <label>UnitName</label>
                    <input name="fname"
                    className='inputform'
                    value={UnitName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder='UnitName' />
                </Form.Field>
                <Form.Field>
                    <label>UnitDis</label>
                    <input
                        name="lname"
                    className='inputform'
                    value={UnitDis}
                        placeholder='UnitDis'
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </Form.Field>
                <Button type='submit' className='submitform' onClick={sendDataToAPI}>Update</Button>
            </Form>
        </div>
    )
}