import { csrfFetch } from "./csrf";

const LOAD = 'users/LOAD';
const GET_ONE = 'users/GET_ONE';

const load = list => ({
    type: LOAD,
    list
});

const getOne = user => ({
    type: GET_ONE,
    user
})

export const getUsers = () => async dispatch => {
    const res = await csrfFetch('/api/users');

    if(res.ok) {
        const list = await res.json();
        
        dispatch(load(list))
    }
}

export const getOneUser = (id) => async dispatch => {
    
    const res = await csrfFetch(`/api/users/${id}`);

    if(res.ok) {
        const user = await res.json();
        dispatch(getOne(user));
        return user;
    }
}

const initialState = []

const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOAD: {
            
            return {
                ...state,
                ...action.list
            }
        }
        case GET_ONE: {
            return {
                ...state,
                ...action.user
            }
        }
        default:
            return state;
    }
}

export default userReducer;