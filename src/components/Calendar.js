import React, { useState } from 'react';
import { Badge, Calendar, ConfigProvider, Modal, Input, Button, Select, DatePicker, Radio, Col, Row, theme } from 'antd';
import '../styles/CustomCalendar.css';

const { Option } = Select;

const CustomCalendar = ({ isDarkMode }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newEvent, setNewEvent] = useState(null);
  const [events, setEvents] = useState([]);

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCreateEvent = () => {
    setEvents((prevEvents) => [...prevEvents, newEvent]);
    setIsModalVisible(false);
    setNewEvent(null);
  };

  const getListData = (value) => {
    const date = value.date();
    const month = value.month();

    const filteredEvents = events.filter((event) => {
      const eventDate = new Date(event.date);
      const eventDay = eventDate.getDate();
      const eventMonth = eventDate.getMonth();

      return eventDay === date && eventMonth === month;
    });

    return filteredEvents.map((event) => ({
      type: event.type,
      content: event.content,
    }));
  };

  const dateCellRender = (value) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item, index) => (
          <li key={index}>
            <Badge className="event-text" status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };

  const cellRender = (current, info) => {
    if (info.type === 'date') return dateCellRender(current);
    return current.originNode;
  };

  const headerRender = ({ value, type, onChange, onTypeChange }) => {
    const start = 0;
          const end = 12;
          const monthOptions = [];
          let current = value.clone();
          const localeData = value.localeData();
          const months = [];
          for (let i = 0; i < 12; i++) {
            current = current.month(i);
            months.push(localeData.monthsShort(current));
          }
          for (let i = start; i < end; i++) {
            monthOptions.push(
              <Select.Option key={i} value={i} className="month-item">
                {months[i]}
              </Select.Option>,
            );
          }
          const year = value.year();
          const month = value.month();
          const options = [];
          for (let i = year - 10; i < year + 10; i += 1) {
            options.push(
              <Select.Option key={i} value={i} className="year-item">
                {i}
              </Select.Option>,
            );
          }
          return (
            <div
              style={{
                padding: 10,
              }}
            >
              <Row gutter={10} style={{
                display: 'flex',
                justifyContent: 'space-between',
              }}>
                <Col><Button onClick={handleOpenModal}>Add Event</Button></Col>
                <Row style={{
                display: 'flex',
                justifyContent: 'space-around',
                paddingRight: 10
              }}>
                <Col>
                  <Radio.Group
                    onChange={(e) => onTypeChange(e.target.value)}
                    value={type}
                  >
                    <Radio.Button value="month">Month</Radio.Button>
                    <Radio.Button value="year">Year</Radio.Button>
                  </Radio.Group>
                </Col>
                <Col>
                  <Select
                    dropdownMatchSelectWidth={false}
                    className="my-year-select"
                    value={year}
                    onChange={(newYear) => {
                      const now = value.clone().year(newYear);
                      onChange(now);
                    }}
                  >
                    {options}
                  </Select>
                </Col>
                <Col>
                  <Select
                    dropdownMatchSelectWidth={false}
                    value={month}
                    onChange={(newMonth) => {
                      const now = value.clone().month(newMonth);
                      onChange(now);
                    }}
                  >
                    {monthOptions}
                  </Select>
                </Col>
                </Row>
              </Row>
            </div>
    );
  };
  

  return (
    <>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: 'forestgreen',
          colorBgContainer: isDarkMode ? '#444' : '#fff',
          colorText: isDarkMode ? '#cccccc' : 'black',
          colorBgElevated: isDarkMode ? '#444' : '#fff',
          controlItemBgActive: '#00410075',
          controlItemBgHover: '#0041003c',
        },
      }}
    >
      <Calendar cellRender={cellRender}  headerRender={headerRender}/>
    </ConfigProvider>
    <ConfigProvider
    theme={{
     algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
    }}>
  <Modal
    title="Add Event"
    visible={isModalVisible}
    onCancel={() => setIsModalVisible(false)}
    onOk={handleCreateEvent}
  >
    <div>
      <label>Type:</label>
      <Select
        value={newEvent?.type}
        onChange={(value) => setNewEvent({ ...newEvent, type: value })}
        placeholder="Select Type"
      >
        <Option value="warning">Warning</Option>
        <Option value="success">Success</Option>
        <Option value="error">Error</Option>
      </Select>
    </div>
    <div>
      <label>Date:</label>
      <DatePicker
        value={newEvent?.date}
        onChange={(date) => setNewEvent({ ...newEvent, date })}
      />
    </div>
    <div>
      <label>Content:</label>
      <Input
        value={newEvent?.content}
        onChange={(e) => setNewEvent({ ...newEvent, content: e.target.value })}
        placeholder="Event Content"
      />
    </div>
  </Modal>
  </ConfigProvider>
  </>
  );
};

export default CustomCalendar;
