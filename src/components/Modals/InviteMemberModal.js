import { Form, Select, Modal, Spin, Avatar } from 'antd';
import React, { useContext, useMemo, useState } from 'react';
import { addDocument } from '../../firebase/services';
import { AuthContext } from '../../Context/AuthProvider';
import { debounce } from 'lodash';
import { AppContext } from '../../Context/AppProvider.js';
import axios from 'axios';

const DebounceSelect = ({ fetchOptions, debounceTimeout = 500, ...props }) => {
    const [fetching, setFetching] = useState(false);
    const [option, setOption] = useState([]);

    const debounceFetcher = useMemo(() => {
        const loadOptions = (value) => {
            setOption([]);
            setFetching(true);

            fetchOptions(value).then((newOptions) => {
                // console.log(newOptions);
                setOption(newOptions);
                setFetching(false);
            });
        };

        return debounce(loadOptions, debounceTimeout);
    }, [fetchOptions, debounceTimeout]);

    return (
        <Select
            filterOption={false}
            labelInValue
            onSearch={debounceFetcher}
            notFoundContent={fetching ? <Spin size="small" /> : null}
            {...props}
        >
            {option?.map((op, index) => (
                <Select.Option key={index} title={op?.title} value={op?.title}>
                    <Avatar size="small" src={op?.imageUrl}>
                        {op?.imageUrl ? '' : option.title?.charAt(0)?.toUpperCase()}
                    </Avatar>
                    {`${op.title}`}
                </Select.Option>
            ))}
        </Select>
    );
};

const fetchUserList = async (keyword) => {
    let data = JSON.stringify({
        q: keyword,
    });

    let config = {
        method: 'post',
        url: 'https://google.serper.dev/images',
        headers: {
            'X-API-KEY': 'b42b3f5766dee5aa7d2acb7af32e0fa519ccd893',
            'Content-Type': 'application/json',
        },
        data: data,
    };

    const res = await axios(config)
        .then((response) => {
            // console.log(response.data.images);
            return response.data.images;
        })
        .catch((error) => {
            console.log(error);
        });

    return res
};

export default function InviteMemberModal() {
    const { isInvite, setIsInvite } = useContext(AppContext);
    const { uid } = useContext(AuthContext);
    const [value, setValue] = useState([]);
    const [form] = Form.useForm();
    const hanldeOk = () => {
        addDocument('rooms', { ...form.getFieldValue(), members: [uid] });

        //reset form
        form.resetFields();
        setIsInvite(false);
    };
    const handleCancel = () => {
        form.resetFields();
        setIsInvite(false);
    };

    console.log(value);
    return (
        <div>
            <Modal title="Mời Thêm Thành Viên" visible={isInvite} onOk={hanldeOk} onCancel={handleCancel}>
                <Form form={form} layout="vertical">
                    <DebounceSelect
                        mode="multiple"
                        label="Tên các thành viên"
                        value={value}
                        placeholder="Tên các thành viên"
                        fetchOptions={fetchUserList}
                        onChange={(newValue) => setValue(newValue)}
                        style={{ width: '100%' }}
                    />
                </Form>
            </Modal>
        </div>
    );
}
