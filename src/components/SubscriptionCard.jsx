import React from 'react';
import { Avatar, Card} from 'antd';
import { Icons } from '../assets/IconsList';
import { observer } from 'mobx-react-lite';

const { Meta } = Card;

const SubscriptionCard = ({title, description, hoverable=false, onClick=()=>{}, ...props}) => {
    return (
        <Card
            onClick={() => onClick(props)}
            hoverable={hoverable}
            title={props.name}
            size="small"
        >
            <Meta
                title={title}
                description={description}
                avatar={
                    <Avatar
                        icon={Icons[props.icon]}
                        shape="square"
                        size="large"
                        style={{backgroundColor: props.color, marginTop: 7}}
                    />
                }
            />
        </Card>
    );
};

export default observer(SubscriptionCard);
