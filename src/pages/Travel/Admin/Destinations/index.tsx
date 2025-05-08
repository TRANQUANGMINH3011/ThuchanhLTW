import React, { useState } from 'react';
import { Card, Table, Button, Modal, Form, Input, InputNumber, Select } from 'antd';
import type { DestinationType } from '@/services/Travel/typing.d';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import styles from './style.less';

const { Option } = Select;

const DestinationsAdmin: React.FC = () => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const mockData: DestinationType[] = [
    {
      id: '1',
      name: 'Ha Long Bay',
      type: 'sea',
      rating: 4.8,
      image: 'https://example.com/halong.jpg',
      description: 'Beautiful bay with limestone islands',
      visitDuration: 480,
      costs: {
        food: 500000,
        accommodation: 1200000,
        transportation: 400000
      }
    }
  ];

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Type', dataIndex: 'type', key: 'type' },
    { title: 'Rating', dataIndex: 'rating', key: 'rating' },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record: DestinationType) => (
        <>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => {
              setEditingId(record.id);
              form.setFieldsValue(record);
              setVisible(true);
            }}
          />
          <Button
            type="link"
            danger
            icon={<DeleteOutlined />}
          />
        </>
      ),
    },
  ];

  return (
    <div className={styles.container}>
      <Card
        title="Manage Destinations"
        extra={
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              setEditingId(null);
              form.resetFields();
              setVisible(true);
            }}
          >
            Add Destination
          </Button>
        }
      >
        <Table dataSource={mockData} columns={columns} rowKey="id" />
      </Card>

      <Modal
        title={editingId ? 'Edit Destination' : 'Add Destination'}
        visible={visible}
        onOk={form.submit}
        onCancel={() => setVisible(false)}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={(values) => {
            console.log(values);
            setVisible(false);
          }}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="type"
            label="Type"
            rules={[{ required: true }]}
          >
            <Select>
              <Option value="sea">Sea</Option>
              <Option value="mountain">Mountain</Option>
              <Option value="city">City</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="rating"
            label="Rating"
            rules={[{ required: true }]}
          >
            <InputNumber min={0} max={5} step={0.1} />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name={['costs', 'food']}
            label="Food Cost (VND)"
            rules={[{ required: true }]}
          >
            <InputNumber min={0} step={1000} />
          </Form.Item>
          <Form.Item
            name={['costs', 'accommodation']}
            label="Accommodation Cost (VND)"
            rules={[{ required: true }]}
          >
            <InputNumber min={0} step={1000} />
          </Form.Item>
          <Form.Item
            name={['costs', 'transportation']}
            label="Transportation Cost (VND)"
            rules={[{ required: true }]}
          >
            <InputNumber min={0} step={1000} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default DestinationsAdmin;