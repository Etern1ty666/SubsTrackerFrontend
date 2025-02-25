import SubscriptionsPage from "../pages/SubscriptionsPage";
import StatisticsPage from "../pages/StatisticsPage";
import CalendarPage from "../pages/CalendarPage";
import SettingsPage from "../pages/SettingsPage";

export const AppRoutes = [
    {id: 1, path: '/', name: 'Подписки', element: <SubscriptionsPage/>},
    {id: 2, path: '/main', name: 'Подписки', element: <SubscriptionsPage/>},
    {id: 3, path: '/statistics', name: 'Статистика', element: <StatisticsPage/>},
    {id: 4, path: '/calendar', name: 'Каленндарь', element: <CalendarPage/>},
    {id: 5, path: '/settings', name: 'Настройки', element: <SettingsPage/>},

]