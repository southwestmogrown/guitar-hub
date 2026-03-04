import Cookies from 'js-cookie';
import { csrfFetch } from './csrf';

const LOAD = 'songs/LOAD';
const ADD = 'songs/ADD';

const load = (songs) => ({ type: LOAD, songs });
const add = (song) => ({ type: ADD, song });

export const getMySongs = () => async (dispatch) => {
  const res = await csrfFetch('/api/songs');
  if (res.ok) {
    const data = await res.json();
    dispatch(load(data.songs));
  }
};

export const uploadSong = (formData) => async (dispatch) => {
  // Use raw fetch to avoid csrfFetch's Content-Type: application/json override
  const res = await window.fetch('/api/songs', {
    method: 'POST',
    headers: { 'XSRF-Token': Cookies.get('XSRF-TOKEN') },
    body: formData,
  });
  if (!res.ok) throw res;
  const data = await res.json();
  dispatch(add(data.song));
  return data.song;
};

const initialState = { songs: [] };

const songsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD:
      return { ...state, songs: action.songs };
    case ADD:
      return { ...state, songs: [...state.songs, action.song] };
    default:
      return state;
  }
};

export default songsReducer;
