import React from 'react';
import { Card, Row, Col, Statistic } from 'antd';
import { Column } from '@ant-design/plots';
import styles from './style.less';

const Analytics: React.FC = () => {
  const mockVisitData = [
    { destination: 'Ha Long Bay', visits: 120 },
    { destination: 'Sapa', visits: 80 },
    { destination: 'Hoi An', visits: 150 },
    { destination: 'Da Lat', visits: 90 },
  ];

  return (
    <div className={styles.container}>
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Card>
            <Statistic title="Total Destinations" value={15} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Total Bookings" value={450} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Average Rating" value={4.5} suffix="/5" />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Total Revenue" value={125000000} prefix="₫" />
          </Card>
        </Col>
      </Row>

      <Card title="Popular Destinations" style={{ marginTop: 16 }}>
        <Column
          data={mockVisitData}
          xField="destination"
          yField="visits"
          label={{
            position: 'middle',
            style: {
              fill: '#FFFFFF',
            },
          }}
        />
      </Card>
    </div>
  );
};

export default Analytics;