import axios from "axios";
import moment from "moment";
import {
  ROOMS_URL,
  WORKSPACES_URL,
  EQUIPMENT_URL,
  ROOMBOOKINGS_URL,
} from "../constants/API";

const roomsController = {
  search: async (token = null, query) => {
    if (query && query.length < 3) {
      return {};
    }
    try {
      const results = await axios.get(ROOMS_URL, {
        params: {
          query,
        },
        headers: {
          authorization: `Bearer ${token}`,
          "uclapi-roombookings-version": "1",
        },
      });
      if (!results.data.content.ok) {
        throw new Error(results.data.content.error);
      }
      return results.data.content.rooms;
    } catch (error) {
      throw error;
    }
  },
  getEquipment: async (token = null, { roomid, siteid }) => {
    if (!roomid || !siteid) {
      throw new Error("Must specify roomid and siteid");
    }
    try {
      const results = await axios.get(EQUIPMENT_URL, {
        params: {
          roomid,
          siteid,
        },
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      if (!results.data.content.ok) {
        throw new Error(results.data.content.error);
      }
      return results.data.content.equipment;
    } catch (error) {
      throw error;
    }
  },
  getBookings: async (
    token = null,
    { roomid, siteid, date = moment().format("YYYYMMDD") },
  ) => {
    if (!roomid || !siteid) {
      throw new Error("Must specify roomid and siteid");
    }
    try {
      const results = await axios.get(ROOMBOOKINGS_URL, {
        params: {
          roomid,
          siteid,
          date,
        },
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      if (!results.data.content.ok) {
        throw new Error(results.data.content.error);
      }
      return results.data.content.bookings;
    } catch (error) {
      throw error;
    }
  },
};

const workspacesApi = axios.create({
  baseURL: WORKSPACES_URL,
});

const workspacesController = {
  getLiveImage: async (token = null, surveyId, mapId) => {
    try {
      const result = workspacesApi.get("/getliveimage/map.svg", {
        params: {
          survey_id: surveyId,
          map_id: mapId,
        },
        headers: {
          authorization: `Bearer ${token}`,
          "uclapi-workspaces-version": "1",
        },
      });
      return result;
    } catch (error) {
      throw error;
    }
  },
};

export default {
  rooms: roomsController,
  workspaces: workspacesController,
};
