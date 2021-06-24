import { csrfFetch } from "./csrf";

const LOAD = 'tracks/LOAD';

const load = list => ({
    type: LOAD,
    list
});

export const getTracks = () => async dispatch => {
    const res = await csrfFetch('/api/tracks');

    if(res.ok) {
        const list = await res.json();
        
        dispatch(load(list))
    }
}

const initialState = []

const tracksReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOAD: {
            
            return {
                ...state,
                ...action.list
            }
        }
        default:
            return state;
    }
}

export default tracksReducer