import axios from 'axios';

export const addEvent = async (type, time, date, content) => {
    try {
        await axios.post('http://localhost:8080/events', {
            type: type,
            date: date,
            time: time,
            content: content
        });
    } catch (error) {
        console.log('error', error);
    }
};

export const fetchEvents = async (setEvents) => {
    try {
        const url = `http://localhost:8080/events`;
        const response = await axios.get(url);
        setEvents(response.data);
    } catch (error) {
        console.error('Error fetching events:', error);
    }
};

export const deleteEvent = async (eventId) => {
    try {
        await axios.delete(`http://localhost:8080/events/${eventId}`);
    } catch (error) {
        console.log('error', error);
    }
};