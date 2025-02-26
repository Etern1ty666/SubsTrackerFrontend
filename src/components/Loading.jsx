import React from 'react';
import { Space } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react-lite';

const SubscriptionDetails = () => {

        return(
            <Space direction="vertical" align='center' style={{width: '100%'}}>
                <LoadingOutlined style={{color: '#ffffff', fontSize: 64}}/>
            </Space>
    );
};
export default observer(SubscriptionDetails);
