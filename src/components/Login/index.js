import { Row, Col, Typography, Button } from 'antd';
import firebase, { auth } from '../../firebase/config.js';
import { useNavigate } from 'react-router-dom';
import { addDocument } from '../../firebase/services.js';

const fbProvider = new firebase.auth.FacebookAuthProvider();

const { Title } = Typography;
function Login() {
    const navigate = useNavigate();
    const handleLogin = async () => {
        const { additionalUserInfo, user } = await auth.signInWithPopup(fbProvider);

        if (additionalUserInfo?.isNewUser) {
            addDocument('users', {
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                uid: user.uid,
                providerId: additionalUserInfo.providerId,
            });
        }
        auth.onAuthStateChanged((user) => {
            if (user) {
                localStorage.setItem('USER_LOGIN', JSON.stringify(user));
                navigate('/');
                return;
            }
        });
    };

    return (
        <div>
            <Row justify="center" style={{ height: 800 }}>
                <Col span={8}>
                    <Title style={{ textAlign: 'center' }} level={3}>
                        Fun Chat
                    </Title>
                    <Button style={{ width: '100%', marginBottom: 5 }}>Đăng Nhập bằng Google</Button>
                    <Button style={{ width: '100%' }} onClick={handleLogin}>
                        Đăng Nhập bằng Facebook
                    </Button>
                </Col>
            </Row>
        </div>
    );
}

export default Login;
