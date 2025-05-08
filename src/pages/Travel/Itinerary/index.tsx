import React from 'react';
import { Card, Timeline, Button, Space, Tag, Statistic } from 'antd';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useModel } from 'umi';
import { DeleteOutlined } from '@ant-design/icons';
import styles from './style.less';

const Itinerary: React.FC = () => {
  const { itineraryItems, removeItem, reorderItems } = useModel('travel.itinerary');

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    reorderItems(result.source.index, result.destination.index);
  };

  const calculateTotalBudget = () => {
    return itineraryItems.reduce((total, item) => {
      const itemTotal = item.costs.food + item.costs.accommodation + item.costs.transportation;
      return total + itemTotal;
    }, 0);
  };

  return (
    <div className={styles.container}>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Card title="Trip Summary">
          <Space size="large">
            <Statistic title="Total Destinations" value={itineraryItems.length} />
            <Statistic 
              title="Total Budget" 
              value={calculateTotalBudget()} 
              prefix="₫"
            />
          </Space>
        </Card>

        <Card title="Itinerary">
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="itinerary">
              {(provided) => (
                <Timeline {...provided.droppableProps} ref={provided.innerRef}>
                  {itineraryItems.map((item, index) => (
                    <Draggable key={item.id} draggableId={item.id} index={index}>
                      {(provided) => (
                        <Timeline.Item
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <Card size="small" title={item.name}>
                            <Space direction="vertical">
                              <div>
                                <Tag color="blue">{item.type}</Tag>
                                <Tag color="green">Rating: {item.rating}</Tag>
                              </div>
                              <div>Duration: {item.visitDuration} minutes</div>
                              <div>
                                <Space>
                                  Costs:
                                  <Tag>Food: ₫{item.costs.food}</Tag>
                                  <Tag>Stay: ₫{item.costs.accommodation}</Tag>
                                  <Tag>Transport: ₫{item.costs.transportation}</Tag>
                                </Space>
                              </div>
                              <Button 
                                type="text" 
                                danger 
                                icon={<DeleteOutlined />}
                                onClick={() => removeItem(item.id)}
                              >
                                Remove
                              </Button>
                            </Space>
                          </Card>
                        </Timeline.Item>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </Timeline>
              )}
            </Droppable>
          </DragDropContext>
        </Card>
      </Space>
    </div>
  );
};

export default Itinerary;