import { useContext, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import axios from 'axios';

const VerifyLoginToken = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const {login} = useContext(AuthContext);
    const {state} = location;
    useEffect(() => {
        axios.post('http://localhost:3001/api/users/verifyLogintoken/', {token: state.token})
            .then(res => {
                    login(res.data.payload.data);
                    navigate('/');
                })
            .catch(err => console.log(err));
    }, [navigate, state, login])
    return null;
}

export default VerifyLoginToken