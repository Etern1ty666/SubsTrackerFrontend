import React from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react-lite';

const AddSubscriptionButton = ({onChange}) => {
  return (
      <Button
        className="add-subscription-button"
        style={{
            zIndex: 999,
            position: "fixed",
            bottom: 98,
            right: 20,
            height: 60,
            width: 60,
            borderRadius: 15,
        }}
        variant="solid"
        color='primary'
        onClick={onChange}
      >
        <PlusOutlined style={{fontSize: 25}}/>
      </Button>
  );
};
export default observer(AddSubscriptionButton);