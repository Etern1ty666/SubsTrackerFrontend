import { SmileOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react-lite';
import { Result } from "antd";


function StatisticsPage() {
    return (
        <Result
            icon={<SmileOutlined />}
            title="Эта вкладка скоро появится"
        />
    );
}

export default observer(StatisticsPage);