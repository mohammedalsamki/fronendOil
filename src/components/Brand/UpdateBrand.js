import React, { useState, useEffect } from 'react';
import { Form, Button } from 'semantic-ui-react';
import axios from 'axios';
import { useHistory } from 'react-router';
export default function UpdateBrand() {
    let history = useHistory();
    const [BrandAr, setFirstName] = useState('');
    const [BrandEn, setLastName] = useState('');
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
        setID(localStorage.getItem('ID'))
    }, [])

    return (
        <div>
            <Form>
                <Form.Field>
                    <label>BrandAr</label>
                    <input name="fname"
                        value={BrandAr}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder='' />
                </Form.Field>
                <Form.Field>
                    <label>BrandEn</label>
                    <input
                        name="lname"
                        value={BrandEn}
                        placeholder=''
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </Form.Field>
                <Button type='submit' onClick={sendDataToAPI}>Update</Button>
            </Form>
        </div>
    )
}