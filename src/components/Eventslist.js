import React from "react";
import { Modal, List, ConfigProvider } from 'antd';

const EventsList = ({ isModalVisible, setIsModalVisible, dataList, date, isDarkMode }) => {
    const options = { hour: 'numeric', minute: 'numeric' };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const selectedDate = new Date(date);
    const filteredEvents = dataList.filter((item) => {
        const eventDate = new Date(item.date);
        const eventDay = eventDate.getDay();
        const eventMonth = eventDate.getMonth();
        const eventYear = eventDate.getFullYear();
        return eventDay === selectedDate.getDay() && eventMonth === selectedDate.getMonth() && eventYear === selectedDate.getFullYear();
    });

    console.log(dataList)

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
                        <List.Item.Meta
                            title={<a className={`${getTitleColor(item.type)}`}>{item.content}</a>}
                            description={new Date(item.time).toLocaleTimeString(undefined, options)}
                        />
                    </List.Item>
                )}
            />
        </Modal>
        </ConfigProvider>
    );
};

export default EventsList;
