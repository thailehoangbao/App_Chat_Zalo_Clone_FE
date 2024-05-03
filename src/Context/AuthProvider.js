import React, { useEffect, useState } from 'react';
import firebase, { auth } from '../firebase/config';
import { useNavigate } from 'react-router-dom';
import { Spin } from 'antd';
const fbProvider = new firebase.auth.FacebookAuthProvider();
export const AuthContext = React.createContext();

export default function AuthProvider({ children }) {
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const unsubcribe = auth.onAuthStateChanged((user) => {
            if (user) {
                const { displayName, uid, email, photoURL } = user;
                setUser({ displayName, uid, email, photoURL });
                setLoading(false);
                navigate('/');
                return;
            }
            setLoading(false);
            navigate('/login');
        });
        return () => {
            unsubcribe();
        };
    }, []);

    return <AuthContext.Provider value={user}>{loading ? <Spin /> : children}</AuthContext.Provider>;
}
