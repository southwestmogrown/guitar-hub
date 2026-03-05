import { csrfFetch } from "./csrf";

const LOAD = "tracks/LOAD";
const ADD = "tracks/ADD";
const UPDATE = "tracks/UPDATE";
const REMOVE = "tracks/REMOVE";

const load = (list) => ({ type: LOAD, list });
export const addTrack = (track) => ({ type: ADD, track });
const update = (track) => ({ type: UPDATE, track });
const remove = (trackId) => ({ type: REMOVE, trackId });

export const getTracks = () => async (dispatch) => {
  const res = await csrfFetch("/api/tracks");
  if (res.ok) {
    const data = await res.json();
    dispatch(load(data));
  }
};

export const updateTrack = (trackId, title) => async (dispatch) => {
  const res = await csrfFetch(`/api/tracks/${trackId}`, {
    method: "PATCH",
    body: JSON.stringify({ title }),
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(update(data.track));
  }
};

export const deleteTrack = (trackId) => async (dispatch) => {
  const res = await csrfFetch(`/api/tracks/${trackId}`, { method: "DELETE" });
  if (res.ok) dispatch(remove(trackId));
};

const initialState = { tracks: [] };

const tracksReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD:
      return { ...state, ...action.list };
    case ADD:
      return { ...state, tracks: [...state.tracks, action.track] };
    case UPDATE:
      return {
        ...state,
        tracks: state.tracks.map((t) =>
          t.id === action.track.id ? action.track : t,
        ),
      };
    case REMOVE:
      return {
        ...state,
        tracks: state.tracks.filter((t) => t.id !== action.trackId),
      };
    default:
      return state;
  }
};

export default tracksReducer;
