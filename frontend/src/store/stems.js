import { csrfFetch } from './csrf';

const LOAD_JOB = 'stems/LOAD_JOB';
const LOAD_STEMS = 'stems/LOAD_STEMS';

const loadJob = (job) => ({ type: LOAD_JOB, job });
const loadStems = (stems) => ({ type: LOAD_STEMS, stems });

export const triggerSplit = (mixId) => async (dispatch) => {
  const res = await csrfFetch(`/api/stems/split/${mixId}`, { method: 'POST' });
  if (res.ok) {
    const data = await res.json();
    dispatch(loadJob(data.stemJob));
    return data.stemJob;
  }
};

export const pollJobStatus = (mixId) => async (dispatch) => {
  const res = await csrfFetch(`/api/stems/job/${mixId}`);
  if (res.ok) {
    const data = await res.json();
    dispatch(loadJob(data.stemJob));
    if (data.stems && data.stems.length > 0) {
      dispatch(loadStems(data.stems));
    }
    return data;
  }
};

export const publishStem = (stemId, title) => async () => {
  const res = await csrfFetch('/api/stems/publish', {
    method: 'POST',
    body: JSON.stringify({ stemId, title }),
  });
  if (res.ok) {
    const data = await res.json();
    return data.track;
  }
};

const initialState = { currentJob: null, stems: [] };

const stemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_JOB:
      return { ...state, currentJob: action.job };
    case LOAD_STEMS:
      return { ...state, stems: action.stems };
    default:
      return state;
  }
};

export default stemsReducer;
