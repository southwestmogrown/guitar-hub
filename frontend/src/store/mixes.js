import Cookies from 'js-cookie';
import { csrfFetch } from './csrf';

const LOAD = 'mixes/LOAD';
const ADD = 'mixes/ADD';

const load = (mixes) => ({ type: LOAD, mixes });
const add = (mix) => ({ type: ADD, mix });

export const getMyMixes = () => async (dispatch) => {
  const res = await csrfFetch('/api/mixes');
  if (res.ok) {
    const data = await res.json();
    dispatch(load(data.mixes));
  }
};

export const uploadMix = (formData) => async (dispatch) => {
  const res = await window.fetch('/api/mixes', {
    method: 'POST',
    headers: { 'XSRF-Token': Cookies.get('XSRF-TOKEN') },
    body: formData,
  });
  if (!res.ok) throw res;
  const data = await res.json();
  dispatch(add(data.mix));
  return data.mix;
};

const initialState = { mixes: [] };

const mixesReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD:
      return { ...state, mixes: action.mixes };
    case ADD:
      return { ...state, mixes: [...state.mixes, action.mix] };
    default:
      return state;
  }
};

export default mixesReducer;
