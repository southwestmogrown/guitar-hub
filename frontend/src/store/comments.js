import { csrfFetch } from "./csrf";


const LOAD = 'comments/LOAD';
const ADD = 'comments/ADD';
const REMOVE = 'comments/REMOVE';
const UDPDATE = 'comments/UDPDATE';

const load = list => ({
    type: LOAD,
    list
});

const remove = comment => ({
    type: REMOVE,
    comment
})

const add = comment => ({
    type: ADD,
    comment
});

const update = comment => ({
    type: UDPDATE,
    comment
})



export const getComments = () => async dispatch => {
    const res = await csrfFetch('/api/comments');
    
    if(res.ok) {
        const list = await res.json();
        dispatch(load(list));
    }
};

export const updateComment = (data, commentId) => async dispatch => {
    console.log(data)
    const res = await csrfFetch(`/api/comments/${commentId}`, {
        method: 'PATCH',
        body: JSON.stringify(data)
    });

    if(res.ok) {
        const comment = await res.json();
        dispatch(update(comment))
    }
    
}

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

export const removeComment = commentId => async dispatch => {
    const res = await csrfFetch(`/api/comments/${commentId}`, {
        method: 'delete'
    });

    if(res.ok) {
        const comment = await res.json()
        dispatch(remove(comment));
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
        case REMOVE: {
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