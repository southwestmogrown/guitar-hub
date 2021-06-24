import { csrfFetch } from './csrf';



const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';




const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};


export const create = user => async dispatch => {
  const { images, image, username, email, password } = user;
  const formData = new FormData();
  formData.append('username', username);
  formData.append('email', email);
  formData.append('password', password);

  if (images && images.length !== 0) {
    for (var i = 0; i < images.length; i++) {
      formData.append('images', images[i]);
    }
  }

  if (image) formData.append('image', image);

  const res = await csrfFetch('/api/users/', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    body: formData
  });

  const data = await res.json();
  dispatch(setUser(data.user));
}


const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};


export const login = (user) => async (dispatch) => {
  const { credential, password, photoUrl } = user;
  const response = await csrfFetch('/api/session', {
    method: 'POST',
    body: JSON.stringify({
      credential,
      password,
      photoUrl
    }),
  });
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};


export const restoreUser = () => async (dispatch) => { 
  const res = await csrfFetch('/api/session');
  const data = await res.json();
  dispatch(setUser(data.user));
  return res;
};

export const signup = (user) => async (dispatch) => {
  const { username, email, password, photoUrl } = user;
  const res = await csrfFetch('/api/users', {
    method: 'POST',
    body: JSON.stringify({
      username,
      email,
      password,
      photoUrl
    }),
  });
  const data = await res.json();
  dispatch(setUser(data.user));
  return res;
};

export const logout = () => async (dispatch) => {
  const res = await csrfFetch('/api/session', {
    method: 'DELETE',
  });
  dispatch(removeUser());
  return res;
}

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_USER:
      newState = Object.assign({}, state);
      newState.user = action.payload;
      return newState;
    case REMOVE_USER:
      newState = Object.assign({}, state);
      newState.user = null;
      return newState;
    default:
      return state;
  }
};



export default sessionReducer;