import { csrfFetch } from "./csrf";
import { addTrack } from "./tracks";

const LOAD_JOB = "stems/LOAD_JOB";
const LOAD_STEMS = "stems/LOAD_STEMS";
const REMOVE_STEM = "stems/REMOVE_STEM";

const loadJob = (job) => ({ type: LOAD_JOB, job });
const loadStems = (stems) => ({ type: LOAD_STEMS, stems });
const removeStem = (stemId) => ({ type: REMOVE_STEM, stemId });

export const triggerSplit = (mixId) => async (dispatch) => {
  const res = await csrfFetch(`/api/stems/split/${mixId}`, { method: "POST" });
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

export const deleteStem = (stemId) => async (dispatch) => {
  const res = await csrfFetch(`/api/stems/${stemId}`, { method: "DELETE" });
  if (res.ok) dispatch(removeStem(stemId));
};

export const publishStem = (stemId, title) => async (dispatch) => {
  const res = await csrfFetch("/api/stems/publish", {
    method: "POST",
    body: JSON.stringify({ stemId, title }),
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(addTrack(data.track));
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
    case REMOVE_STEM:
      return {
        ...state,
        stems: state.stems.filter((s) => s.id !== action.stemId),
      };
    default:
      return state;
  }
};

export default stemsReducer;
