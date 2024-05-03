import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { publicRoutes } from './routes';
import AuthProvider from './Context/AuthProvider';
import AppProvider from './Context/AppProvider';
import AddRoomModal from './components/Modals/AddRoomModal';
import InviteMemberModal from './components/Modals/InviteMemberModal';

function App() {
    return (
        <Router>
            <AuthProvider>
                <AppProvider>
                    <div className="App">
                        <Routes>
                            {publicRoutes.map((route, index) => {
                                const Component = route.component;
                                return <Route key={index} path={route.path} element={<Component />} />;
                            })}
                        </Routes>
                        <AddRoomModal />
                    </div>
                <InviteMemberModal />
                </AppProvider>
            </AuthProvider>
        </Router>
    );
}

export default App;
