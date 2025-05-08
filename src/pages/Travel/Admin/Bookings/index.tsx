
import React from 'react';
import { Card, Table, Tag, Button } from 'antd';
import type { TableColumnsType } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import styles from '../style.less';

interface BookingType {
  id: string;
  destination: string;
  user: string;
  date: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  numberOfPeople: number;
}

const BookingsAdmin: React.FC = () => {
  const mockData: BookingType[] = [
    {
      id: '1',
      destination: 'Ha Long Bay',
      user: 'John Doe',
      date: '2024-02-15',
      status: 'pending',
      numberOfPeople: 2
    }
  ];

  const columns: TableColumnsType<BookingType> = [
    { title: 'Destination', dataIndex: 'destination', key: 'destination' },
    { title: 'User', dataIndex: 'user', key: 'user' },
    { title: 'Date', dataIndex: 'date', key: 'date' },
    { 
      title: 'Status', 
      dataIndex: 'status', 
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'confirmed' ? 'green' : status === 'pending' ? 'gold' : 'red'}>
          {status.toUpperCase()}
        </Tag>
      )
    },
    { title: 'Number of People', dataIndex: 'numberOfPeople', key: 'numberOfPeople' },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <>
          <Button
            type="link"
            icon={<CheckOutlined />}
            disabled={record.status === 'confirmed'}
            onClick={() => console.log('Confirm booking:', record.id)}
          />
          <Button
            type="link"
            danger
            icon={<CloseOutlined />}
            disabled={record.status === 'cancelled'}
            onClick={() => console.log('Cancel booking:', record.id)}
          />
        </>
      ),
    },
  ];

  return (
    <div className={styles.container}>
      <Card title="Manage Bookings">
        <Table 
          dataSource={mockData} 
          columns={columns} 
          rowKey="id"
        />
      </Card>
    </div>
  );
};

export default BookingsAdmin;
