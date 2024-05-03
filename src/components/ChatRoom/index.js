import { Row,Col } from "antd/es/grid";
import Sidebar from "./Sidebar";
import ChatWindow from "./ChatWindow";

function ChatRoom() {
    return <div>
        <Row>
            <Col span={6}>
                <Sidebar />
            </Col>
            <Col span={18}>
                <ChatWindow />
            </Col>
        </Row>
    </div>;
}

export default ChatRoom;
