import { observer } from 'mobx-react-lite';
import { Card, Divider, Flex, Progress, Space, Statistic, Typography } from "antd";
import PageHeader from '../components/PageHeader';

import { useEffect, useState } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { categories } from '../assets/ListOptions';
import subscriptionsStore from '../store/subscriptionsStore';
import { getClearCost } from '../utils/Formatting';

function StatisticsPage() {
    const categoryMap = Object.fromEntries(categories.map(cat => [cat.value, {label: cat.label, color: cat.color, id: cat.id}]));

    var iterations = 0;
    const categoryData = subscriptionsStore.data.reduce((acc, item) => {
        const categoryInfo = categoryMap[item.category];
        if (!acc[categoryInfo.label]) {
            acc[categoryInfo.label] = { category: categoryInfo.label, items: [], count: 0, color: categoryInfo.color, id: iterations };
        }

        acc[categoryInfo.label].items.push(item);
        acc[categoryInfo.label].count++;
        iterations++;
        return acc;
    }, {});

    const totalItems = subscriptionsStore.data.length;

    const result = Object.values(categoryData)
    .map((cat) => {let percent = ((cat.count / totalItems) * 100);
        return {
        id: cat.id,
        label: cat.category,
        value: percent%1===0?percent:parseFloat(percent.toFixed(2)),
        items: cat.items,
        color: cat.color
    }})
    .sort((a, b) => b.value - a.value);

    const renderExspenses = (cost, period, periodType) => {
        let costPerDay = 0;

        if (periodType === "day") {
            costPerDay = cost / period;
        } else if (periodType === "week") {
            costPerDay = cost / (period * 7);
        } else if (periodType === "month") {
            costPerDay = cost / (period * 30.44);
        } else if (periodType === "year") {
            costPerDay = cost / (period * 365);
        } else {
            throw new Error("Error");
        }

        return {
            perDay: costPerDay,
            perMonth: costPerDay * 30.44,
            perYear: costPerDay * 365
        };

    }
    const [expenses, setExpenses] = useState({perDay: 0, perMonth: 0, perYear: 0})
        
    useEffect(() => {
        const totalExpenses = subscriptionsStore.data.reduce((acc, subscription) => {
            const subExpenses = renderExspenses(subscription.cost, subscription.period, subscription.periodType);
            return {
                perDay: acc.perDay + subExpenses.perDay,
                perMonth: acc.perMonth + subExpenses.perMonth,
                perYear: acc.perYear + subExpenses.perYear,
            };
        }, { perDay: 0, perMonth: 0, perYear: 0 });
      
        setExpenses(totalExpenses);
    }, [subscriptionsStore.data]);

    const [selectedIndex, setSelectedIndex] = useState(null);
    
    return (
        <>
            <PageHeader PageName={'Статистика'}/>
            <Space
                            direction="vertical"
                            size="middle"
                            style={{display: 'flex', margin: 10}}
                        >
                <Card title='Расходы'>
                    <Flex justify="space-around" align='center'>
                        <Space direction='vertical'>
                            <Statistic title="Месяц" value={getClearCost(expenses.perMonth)} />
                            <Statistic title="День" value={getClearCost(expenses.perDay)} />
                        </Space>
                        <Statistic title="Год" value={getClearCost(expenses.perYear)} />
                    </Flex> 
                </Card>
                <Card title='Категории'>
                    {
                        subscriptionsStore.data.length===0 && subscriptionsStore.isLoading===false
                        ?
                        <Flex justify="space-around" >
                            <Typography>Пока нет подписок</Typography>
                        </Flex>
                        :
                        <Flex justify="space-around" >
                            <PieChart
                                slotProps={{ legend: { hidden: true } }}
                                width={200}
                                height={200}
                                onHighlightChange={(value) => { if(value!==null){setSelectedIndex(value.dataIndex)}}}
                                onItemClick={(event, d) => { if(d!==null){setSelectedIndex(d.dataIndex)}}}
                                margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                                tooltip={{ disablePortal: true }}
                                series={[
                                    {
                                    data: result,
                                    innerRadius: 60,
                                    outerRadius: 90,
                                    }
                                ]}
                            />
                        </Flex>
                    }
                    
                    {result.map(item => {
                        return <>
                            <Typography>{item.label} {item.value}%</Typography>
                            <Progress strokeColor={item.color} percent={item.value} status="active" showInfo={false}/>
                        </>
                    })}
                </Card>
                
            </Space>
        </>
        
    );
}

export default observer(StatisticsPage);