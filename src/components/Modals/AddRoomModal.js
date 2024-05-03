import { Form, Input, Modal } from 'antd';
import React, { useContext } from 'react';
import { AppContext } from '../../Context/AppProvider';
import { addDocument } from '../../firebase/services';
import { AuthContext } from '../../Context/AuthProvider';

export default function AddRoomModal() {
    const { isVisible, setIsVisible } = useContext(AppContext);
    const { uid } = useContext(AuthContext);
    const [form] = Form.useForm();
    const hanldeOk = () => {
        addDocument('rooms', { ...form.getFieldValue(), members: [uid] });

        //reset form
        form.resetFields();
        setIsVisible(false);
    };
    const handleCancel = () => {
        form.resetFields();
        setIsVisible(false);
    };
    return (
        <div>
            <Modal title="Tạo Phòng" visible={isVisible} onOk={hanldeOk} onCancel={handleCancel}>
                <Form form={form} layout="vertical">
                    <Form.Item label="Tên Phòng" name="name">
                        <Input placeholder="Nhập vào tên phòng..." />
                    </Form.Item>
                    <Form.Item label="Mô Tả" name="description">
                        <Input.TextArea placeholder="Nhập vào mô tả.." />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}
