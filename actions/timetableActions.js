// @flow
import moment, { Moment } from "moment";
import { TIMETABLE_URL } from "../constants/API";
import {
  TIMETABLE_FETCH_SUCCESS,
  TIMETABLE_FETCH_FAILURE,
  TIMETABLE_IS_FETCHING,
  CLEAR_TIMETABLE,
} from "../constants/timetableConstants";

export const fetchTimetableSuccess = (timetableFrag: Object) => ({
  type: TIMETABLE_FETCH_SUCCESS,
  timetableFrag,
});

export const fetchTimetableFailure = (error: String) => ({
  type: TIMETABLE_FETCH_FAILURE,
  error,
});

export const setIsFetchingTimetable = () => ({
  type: TIMETABLE_IS_FETCHING,
});

export const fetchTimetable = (
  token: String = null,
  date: Moment = moment(),
) => async (dispatch: Function) => {
  await dispatch(setIsFetchingTimetable());
  const datePart = date ? `?date=${date.format("YYYY-MM-DD")}` : "";
  const url = `${TIMETABLE_URL}${datePart}`;
  try {
    const res = await fetch(url, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    const json = await res.json();
    if (!res.ok) {
      throw new Error(json.error || "There was a problem");
    }
    const now = moment();
    Object.keys(json.content.timetable).forEach(day => {
      const timetable = json.content.timetable[day];
      json.content.timetable[day] = {
        lastUpdated: now,
        timetable,
      };
    });
    return dispatch(fetchTimetableSuccess(json.content.timetable));
  } catch (error) {
    return dispatch(
      fetchTimetableFailure(typeof error === "string" ? error : error.message),
    );
  }
};

export const clearTimetable = () => ({
  type: CLEAR_TIMETABLE,
});
