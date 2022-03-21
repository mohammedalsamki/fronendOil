import React, { useState, useEffect } from 'react';
import { Form, Button } from 'semantic-ui-react';
import axios from 'axios';
import '../style/form.css'
import { useHistory } from 'react-router';
export default function UpdateUnit() {
    let history = useHistory();
    const [UnitNameEn, setFirstName] = useState('');
    const [UnitNameAr, setLastName] = useState('');
    const [ID, setID] = useState(null);
    const sendDataToAPI = () => {
        axios.put(`https://backendoil.vercel.app/api/oil/unit/${ID}`, {
            UnitNameEn,
            UnitNameAr
        }).then(() => {
            history.push('/unit');
            localStorage.clear();
        })
    }

    useEffect(() => {
        setFirstName(localStorage.getItem('UnitNameEn'));
        setLastName(localStorage.getItem('UnitNameAr'));
        setID(localStorage.getItem('ID'))
    }, [])

    return (
        <div className='form'>
            <Form>
                <Form.Field>
                    <label>Name En</label>
                    <input name="fname"
                    className='inputform'
                    value={UnitNameEn}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder='UnitNameEn' />
                </Form.Field>
                <Form.Field>
                    <label>Name Ar</label>
                    <input
                        name="lname"
                    className='inputform'
                    value={UnitNameAr}
                        placeholder='UnitNameAr'
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </Form.Field>
                <Button type='submit' className='submitform' onClick={sendDataToAPI}>Update</Button>
            </Form>
        </div>
    )
}