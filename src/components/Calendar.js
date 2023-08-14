import React, {useEffect, useState} from 'react';
import { Badge, Calendar, ConfigProvider, Button, Select, Radio, Col, Row } from 'antd';
import '../styles/CustomCalendar.css';
import EventsList from './Eventslist';
import AddEvent from './AddEvent';
import { v4 as uuidv4 } from 'uuid';
import {fetchEvents} from "../utils/eventsRequests";


const CustomCalendar = ({ isDarkMode }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEventsModalVisible, setIsEventsModalVisible] = useState(false);
  const [newEvent, setNewEvent] = useState(null);
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleOpenEventsModal = (date) => {
    setSelectedDate(date);
    setIsEventsModalVisible(true);
  };

  useEffect(() => {
    fetchEvents(setEvents, localStorage.getItem('userId'));
  }, []);

  const handleCreateEvent = () => {
    const eventId = uuidv4();
    const eventWithId = { ...newEvent, id: eventId, time: newEvent.time.format("HH:mm:ss") };
    setEvents((prevEvents) => [...prevEvents, eventWithId]);
    setIsModalVisible(false);
    setNewEvent(null);
  };

  const getListData = (value) => {
    const date = value.date();
    const month = value.month();
    const year = value.year();

    const filteredEvents = events.filter((event) => {
      const eventDate = new Date(event.date);
      const eventDay = eventDate.getDate();
      const eventMonth = eventDate.getMonth();
      const eventYear = eventDate.getFullYear();
      return eventDay === date && eventMonth === month && eventYear === year;
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
        <Row className='add-even-btn'>
          <Col><Button onClick={handleOpenModal}>Add Event</Button></Col>
          <Row className='calendar-controls' gutter={10}>
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
            colorIcon: isDarkMode ? '#444' : '#fff',
          },
        }}
      >
        <Calendar cellRender={cellRender} headerRender={headerRender} onSelect={(value, type) => {
          if (type.source === 'date') {
            handleOpenEventsModal(value.toDate());
          }
        }} />
      </ConfigProvider>
      <AddEvent newEvent={newEvent} setNewEvent={setNewEvent} isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} handleCreateEvent={handleCreateEvent} isDarkMode={isDarkMode} />
      <EventsList isDarkMode={isDarkMode} setEvents={setEvents} isModalVisible={isEventsModalVisible} setIsModalVisible={setIsEventsModalVisible} date={selectedDate} dataList={events} />
    </>
  );
};

export default CustomCalendar;
