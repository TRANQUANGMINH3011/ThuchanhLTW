import React from 'react';
import { Card, Alert, Space } from 'antd';
import { useModel } from 'umi';
import { Column } from '@ant-design/plots';
import { Pie } from '@ant-design/plots';
import styles from './style.less';

const Budget: React.FC = () => {
  const { itineraryItems } = useModel('travel.itinerary');
  const budgetLimit = 10000000; // 10M VND example limit

  const calculateTotalsByCategory = () => {
    return itineraryItems.reduce(
      (acc, item) => {
        acc.food += item.costs.food;
        acc.accommodation += item.costs.accommodation;
        acc.transportation += item.costs.transportation;
        return acc;
      },
      { food: 0, accommodation: 0, transportation: 0 }
    );
  };

  const totals = calculateTotalsByCategory();
  const totalBudget = Object.values(totals).reduce((a, b) => a + b, 0);

  const pieData = [
    { type: 'Food', value: totals.food },
    { type: 'Accommodation', value: totals.accommodation },
    { type: 'Transportation', value: totals.transportation },
  ];

  const columnData = itineraryItems.map(item => ({
    destination: item.name,
    budget: item.costs.food + item.costs.accommodation + item.costs.transportation,
  }));

  return (
    <div className={styles.container}>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        {totalBudget > budgetLimit && (
          <Alert
            message="Budget Warning"
            description={`Your total budget (₫${totalBudget}) exceeds the limit of ₫${budgetLimit}`}
            type="warning"
            showIcon
          />
        )}

        <Card title="Budget Distribution">
          <Pie
            data={pieData}
            angleField="value"
            colorField="type"
            radius={0.8}
            label={{
              type: 'outer',
              content: '{name} ₫{value}',
            }}
          />
        </Card>

        <Card title="Budget by Destination">
          <Column
            data={columnData}
            xField="destination"
            yField="budget"
            label={{
              position: 'middle',
              style: {
                fill: '#FFFFFF',
              },
            }}
          />
        </Card>
      </Space>
    </div>
  );
};

export default Budget;