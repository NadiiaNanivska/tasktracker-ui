import React from "react";
import { Modal, List, ConfigProvider, Skeleton } from 'antd';
import { DeleteTwoTone} from '@ant-design/icons';
import {deleteEvent} from "../utils/eventsRequests";

const EventsList = ({ setEvents, isModalVisible, setIsModalVisible, dataList, date, isDarkMode }) => {
    const handleDelete = (event) => {
        const updatedDataList = dataList.filter((item) => item.id !== event.id);
        deleteEvent(event.id);
        setEvents(updatedDataList);
      };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const selectedDate = new Date(date);
    const filteredEvents = dataList.filter((item) => {
        const eventDate = new Date(item.date);
        const eventDay = eventDate.getDate();
        const eventMonth = eventDate.getMonth();
        const eventYear = eventDate.getFullYear();
        return eventDay === selectedDate.getDate() && eventMonth === selectedDate.getMonth() && eventYear === selectedDate.getFullYear();
    });

    const getTitleColor = (type) => {
        switch (type) {
            case 'warning':
                return 'yellow';
            case 'success':
                return 'green';
            case 'error':
                return 'red';
            default:
                return 'black';
        }
    };

    return (
        <ConfigProvider
        theme={{
          token: {
            colorBgElevated: isDarkMode ? '#444' : '#fff',
          },
        }}
      >
        <Modal
            visible={isModalVisible}
            title={new Date(date).toLocaleDateString()}
            onCancel={handleCancel}
            footer={null}
        >
            <List
                itemLayout="horizontal"
                dataSource={filteredEvents}
                renderItem={(item) => (
                    <List.Item>
                        <Skeleton loading={false} title={false}>
                        <List.Item.Meta
                            title={<a className={`${getTitleColor(item.type)}`}>{item.content}</a>}
                            description={item.time.split(':').slice(0, 2).join(':')}
                        />
                        <DeleteTwoTone twoToneColor="forestgreen" style={{ fontSize: '16px', cursor: 'pointer'}} onClick={() => handleDelete(item)}/>
                        </Skeleton>
                    </List.Item>
                )}
            />
        </Modal>
        </ConfigProvider>
    );
};

export default EventsList;
