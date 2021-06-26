import { csrfFetch } from "./csrf";


const LOAD = 'comments/LOAD';
const ADD = 'comments/ADD';

const load = list => ({
    type: LOAD,
    list
});

const add = comment => ({
    type: ADD,
    comment
});

export const getComments = () => async dispatch => {
    const res = await csrfFetch('/api/comments');
    
    if(res.ok) {
        const list = await res.json();
        dispatch(load(list));
    }
};

export const addComment = data => async dispatch => {
    const res = await csrfFetch('/api/comments', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if(res.ok) {
        const comment = await res.json();
        dispatch(add(comment))
    }
    
    

}

const initialState = [];

const commentsReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOAD: {
            return {
                ...state,
                ...action.list
            }
        }
        case ADD: {
            return {
                ...state,
                ...action.comment
            }
        }
        default:
            return state;
    }
}

export default commentsReducer;