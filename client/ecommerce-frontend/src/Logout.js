import { useContext, useEffect } from 'react'
import { AuthContext } from './AuthContext'
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const {logout} = useContext(AuthContext);
    const navigate = useNavigate();
    useEffect(() => {
        logout();
        navigate('/');
    }, [navigate, logout]);
    return null;
}

export default Logout