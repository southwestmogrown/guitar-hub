import { csrfFetch } from "./csrf";


const LOAD = 'comments/LOAD';

const load = list => ({
    type: LOAD,
    list
});

export const getComments = () => async dispatch => {
    const res = await csrfFetch('/api/comments');
    
    if(res.ok) {
        const list = await res.json();
        console.log(list)
        dispatch(load(list));
    }
};

const initialState = [];

const commentsReducer = (state = initialState, action) => {
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

export default commentsReducer;