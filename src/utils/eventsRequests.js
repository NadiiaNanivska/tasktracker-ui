import axios from 'axios';

export const addEvent = async (type, time, date, content, user) => {
    try {
        const token = localStorage.getItem('token');

        const headers = {
            'Authorization': `Bearer ${token}`
        };

        const response = await axios.post('http://localhost:8080/events', {
            type: type,
            date: date,
            time: time,
            content: content,
            userId: user
        }, { headers });

        return response.data;
    } catch (error) {
        console.log('error', error);
    }
};

export const fetchEvents = async (setEvents, userId) => {
    try {
        const token = localStorage.getItem('token');

        const headers = {
            'Authorization': `Bearer ${token}`
        };

        const url = `http://localhost:8080/${userId}/events`;
        const response = await axios.get(url, {headers});
        setEvents(response.data);
    } catch (error) {
        console.error('Error fetching events:', error);
    }
};

export const deleteEvent = async (eventId) => {
    try {
        const token = localStorage.getItem('token');

        const headers = {
            'Authorization': `Bearer ${token}`
        };

        await axios.delete(`http://localhost:8080/events/${eventId}`, {headers});
    } catch (error) {
        console.log('error', error);
    }
};