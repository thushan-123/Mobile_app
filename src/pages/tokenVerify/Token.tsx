import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import { useStorage } from '../../storage/useStorage';
import { VerifyUserToken } from '../../function/user_login'; // Ensure the correct import

const Token: React.FC = () => {
    const history = useHistory();
    const { store, loadUserData } = useStorage();
    const [token, setToken] = useState<string | null>(null);

    const isHaveToken = async () => {
        if (store) {
            const storedToken = await loadUserData('token');
            setToken(storedToken);
        } else {
            history.push('/login');
        }

        if (token) {
            try {
                const response = await VerifyUserToken(token);
                if (!response.status) {
                    history.push('/login');
                }
            } catch (error) {
                console.log(error);
                history.push('/login');
            }
        } else {
            history.push('/login');
        }
    };

    useEffect(() => {
        isHaveToken();
    }, [token]); // Added token dependency to avoid using old state

    return <></>;
};

export default Token;
