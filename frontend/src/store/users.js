const LOAD = 'users/LOAD';

const load = list => ({
    type: LOAD,
    list
});

export const getUsers = () => async dispatch => {
    const res = await fetch('/api/users');

    if(res.ok) {
        const list = res.json();
        dispatch(load(list))
    }
}

const initialState = []

const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOAD: {
            const allUsers = {};
            action.list.forEach(user => {
                allUsers[user.id] = user
            });
            return {
                ...allUsers,
                ...state,
                list: action.list
            }
        }
        default:
            return state;
    }
}

export default userReducer;