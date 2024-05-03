import { Avatar, Button, Typography } from 'antd';
import React from 'react';
import { styled } from 'styled-components';
import { auth } from '../../firebase/config';
import { AuthContext } from '../../Context/AuthProvider';

const WarraperStyled = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 12px 16px;
    border-bottom: 1px solid rgba(82, 38, 83);
    overflow: hidden;
    .username {
        color: white;
        margin-left: 5px;
    }
`;

export default function UserInfo() {


    const data = React.useContext(AuthContext)
    
    return (
        <WarraperStyled>
            <div>
                <Avatar src={data.photoURL}>{data.photoURL ? '' : data.displayName?.charAt(0)?.toUpperCase()}</Avatar>
                <Typography.Text className="username">{data.displayName}</Typography.Text>
            </div>
            <Button
                ghost
                onClick={() => {
                    localStorage.removeItem('USER_LOGIN');
                    auth.signOut();
                }}
            >
                Đăng Xuất
            </Button>
        </WarraperStyled>
    );
}
