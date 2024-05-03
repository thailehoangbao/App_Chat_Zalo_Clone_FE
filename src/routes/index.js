import ChatRoom from "../components/ChatRoom";
import Login from "../components/Login";
import config from "../config";

const publicRoutes = [
    {
        path: config.routes.login,
        component: Login,
    },
    {
        path: config.routes.chatroom,
        component: ChatRoom,
    },

];

const privateRoutes = [];

export { privateRoutes, publicRoutes };
