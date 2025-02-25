import Title from "antd/es/typography/Title";
import { observer } from 'mobx-react-lite';
import PageHeader from "../components/PageHeader";

function SettingsPage() {

    return (
        <>
            <PageHeader PageName={'Настройки'}/>
            <Title level={5}>Удалить все подписки</Title>
            <Title level={5}>Добавить тестовые подписки</Title>
        </>
    );
}

export default observer(SettingsPage);