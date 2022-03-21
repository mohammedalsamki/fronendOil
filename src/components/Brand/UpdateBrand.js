import React, { useState, useEffect } from 'react';
import { Form, Button } from 'semantic-ui-react';
import '../style/form.css'
import axios from 'axios';
import { useHistory } from 'react-router';
export default function UpdateBrand() {
    let history = useHistory();
    const [BrandAr, setFirstName] = useState('');
    const [BrandEn, setLastName] = useState('');
    const [BrandDiscr, setBrandDiscr] = useState('');

    const [ID, setID] = useState(null);
    const sendDataToAPI = () => {
        axios.put(`https://backendoil.vercel.app/api/oil/brand/${ID}`, {
            BrandAr,
            BrandEn
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
                <Button type='submit' className='submitform' onClick={sendDataToAPI}>Update</Button>
            </Form>
        </div>
    )
}