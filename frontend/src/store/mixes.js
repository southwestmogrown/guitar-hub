import Cookies from 'js-cookie';
import { csrfFetch } from './csrf';

const LOAD = 'mixes/LOAD';
const ADD = 'mixes/ADD';
const UPDATE = 'mixes/UPDATE';
const REMOVE = 'mixes/REMOVE';

const load = (mixes) => ({ type: LOAD, mixes });
const add = (mix) => ({ type: ADD, mix });
const update = (mix) => ({ type: UPDATE, mix });
const remove = (mixId) => ({ type: REMOVE, mixId });

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

export const updateMix = (mixId, title) => async (dispatch) => {
  const res = await csrfFetch(`/api/mixes/${mixId}`, {
    method: 'PATCH',
    body: JSON.stringify({ title }),
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(update(data.mix));
  }
};

export const deleteMix = (mixId) => async (dispatch) => {
  const res = await csrfFetch(`/api/mixes/${mixId}`, { method: 'DELETE' });
  if (res.ok) dispatch(remove(mixId));
};

const initialState = { mixes: [] };

const mixesReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD:
      return { ...state, mixes: action.mixes };
    case ADD:
      return { ...state, mixes: [...state.mixes, action.mix] };
    case UPDATE:
      return { ...state, mixes: state.mixes.map(m => m.id === action.mix.id ? action.mix : m) };
    case REMOVE:
      return { ...state, mixes: state.mixes.filter(m => m.id !== action.mixId) };
    default:
      return state;
  }
};

export default mixesReducer;
