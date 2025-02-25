import React, { useEffect, useState } from 'react';
import { Button, ColorPicker, Flex, Modal, Space, Avatar, Card } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { Icons } from '../assets/IconsList';
import { observer } from 'mobx-react-lite';

const ChooseIcon = ({color, icon, onColorChange, onIconChange}) => {
    const [opened, setOpened] = useState(false)

    return (
        <Space>
            <Avatar style={{backgroundColor: color}} icon={Icons[icon]} onClick={() => setOpened(true)} shape="square" size="large"/>
            <Button onClick={() => setOpened(true)} icon={<EditOutlined />} />
            <Modal
                title='Оформление'
                centered
                open={opened}
                onCancel={() => {onColorChange(color); onIconChange(icon); setOpened(false); }}
                footer={null}
                width={'100%'}
            >
                <Space
                    direction="vertical"
                    size="middle"
                    style={{
                    display: 'flex',
                    }}
                >
                    <Card title="Цвет">
                        <Card.Grid hoverable={false} style={{width: '100%', textAlign: 'start'}}>
                            <ColorPicker disabledAlpha value={color} onChangeComplete={(value) => onColorChange(value.toHexString())} defaultValue="#1677ff" showText/>
                        </Card.Grid>
                    </Card>
                    <Card title="Иконка">
                        <Card.Grid hoverable={false} style={{width: '100%', textAlign: 'start'}}>
                            <div style={{alignItems: 'center'}}>
                                <Flex justify={'space-between'} wrap gap="small">
                                    {Object.entries(Icons).map(([key, Icon]) => {
                                        var disabled = false
                                        var style = {backgroundColor: color}
                                        if(String(key)==String(icon)){
                                            disabled = true
                                            style = {}
                                        }
                                        return <Button key={key} style={style} disabled={disabled} onClick={() => onIconChange(Number(key))} size='large' type="primary" icon={Icon} />
                                    })}
                                </Flex>     
                            </div>
                        </Card.Grid>
                    </Card>
                </Space>
            </Modal>
        </Space>
  );
};
export default observer(ChooseIcon);