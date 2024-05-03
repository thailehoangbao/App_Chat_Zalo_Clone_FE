import React, { useContext, useMemo, useState } from 'react';
import { AuthContext } from './AuthProvider';
import useFirestore from '../hooks/useFirestore';

export const AppContext = React.createContext();

export default function AppProvider({ children }) {
    const { uid } = useContext(AuthContext);
    const [isInvite, setIsInvite] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const [selectedRoomId, setSelectedRoomId] = useState('');

    const roomsCondition = useMemo(() => {
        return {
            fieldName: 'members',
            operator: 'array-contains',
            compareValue: uid,
        };
    }, [uid]);
    const rooms = useFirestore('rooms', roomsCondition);

    const selectedRoom = useMemo(() => rooms.find((room) => room.id === selectedRoomId) || {}, [rooms, selectedRoomId]);
    const usersCondition = useMemo(() => {
        return {
            fieldName: 'uid',
            operator: 'in',
            compareValue: selectedRoom.members,
        };
    }, [selectedRoom.members]);
    const members = useFirestore('users', usersCondition);

    return (
        <AppContext.Provider
            value={{
                isInvite,
                setIsInvite,
                rooms,
                isVisible,
                setIsVisible,
                selectedRoomId,
                setSelectedRoomId,
                selectedRoom,
                members,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}
