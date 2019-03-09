import axios from "axios";
import EVENTS_URL from "../constants/API";

const eventController = {
    getEventsWithTime: async (time) => {
        try {
            const results = await axios.get(EVENTS_URL, {
                params: {
                    time,
                }
            });
            if (!results.data.content.ok){
                throw new Error(results.data.content.error);
            }
            return results.data.content.events;
        } catch (error) {
            throw error;
        }
    },

    getEvents: async () => {
        try {
            const results = await axios.get(EVENTS_URL);
            if (!results.data.content.ok){
                throw new Error(results.data.content.error);
            }
            return results.data.content.events;
        } catch (error){
            throw error;
        }
    },
};

export default {
    eventController: eventController,
};