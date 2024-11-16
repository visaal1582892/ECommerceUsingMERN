import React from 'react';
import {useParams} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import {useEffect} from 'react';

const Activate = () => {
    const navigate = useNavigate();
    const {token} = useParams();
    useEffect(() => {
        axios.post('http://localhost:3001/api/users/verify/', {token: token})
            .then(response => {console.log(response);
                return navigate('/login');
            })
            .catch(error => console.log(error));
    }, [navigate, token]);
    return null;
}

export default Activate