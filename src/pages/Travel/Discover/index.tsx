import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Rate, Select, InputNumber, Space, Button, Modal } from 'antd';
import { useModel } from 'umi';
import type { DestinationType } from '@/services/Travel/typing.d';
import styles from './style.less';

const { Option } = Select;

const Discover: React.FC = () => {
  const { destinations, loading, getDestinations } = useModel('travel.destination');
  const [filters, setFilters] = useState({
    type: undefined,
    minPrice: undefined,
    minRating: undefined,
  });
  const [showRatingModal, setShowRatingModal] = useState(false);


  useEffect(() => {
    getDestinations(filters);
  }, [filters]);

  return (
    <div className={styles.container}>
      <Space className={styles.filters} size="large">
        <Select
          placeholder="Destination Type"
          style={{ width: 200 }}
          onChange={(value) => setFilters({ ...filters, type: value })}
        >
          <Option value="sea">Sea</Option>
          <Option value="mountain">Mountain</Option>
          <Option value="city">City</Option>
        </Select>
        <InputNumber
          placeholder="Min Price"
          style={{ width: 200 }}
          onChange={(value) => setFilters({ ...filters, minPrice: value })}
        />
        <Rate
          onChange={(value) => setFilters({ ...filters, minRating: value })}
        />
      </Space>

      <Row gutter={[16, 16]} className={styles.cardGrid}>
        {destinations.map((destination: DestinationType) => (
          <Col xs={24} sm={12} lg={8} xl={6} key={destination.id}>
            <Card
              hoverable
              cover={<img alt={destination.name} src={destination.image} />}
              loading={loading}
            >
              <Card.Meta
                title={destination.name}
                description={
                  <>
                    <Rate disabled defaultValue={destination.rating} />
                    <p>{destination.description}</p>
                  </>
                }
              />
              <div className={styles.ratingsSection}>
                <h3>Ratings & Reviews</h3>
                {destination.ratings?.map((rating) => (
                  <Card key={rating.id} className={styles.ratingCard}>
                    <Rate disabled defaultValue={rating.score} />
                    <p>{rating.comment}</p>
                    <small>{rating.userName} - {rating.date}</small>
                  </Card>
                ))}
                <Button type="primary" onClick={() => setShowRatingModal(true)}>
                  Add Review
                </Button>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
      <Modal title="Add Review" visible={showRatingModal} onCancel={() => setShowRatingModal(false)} footer={null}>
        {/* Add your review form here */}
        <p>Review Form will go here</p>
      </Modal>
    </div>
  );
};

export default Discover;