import { createStore, combineReducers, Action } from 'redux';

// Define action types
const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';
const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';
const FETCH_POSTS = 'FETCH_POSTS';
const ADD_POST = 'ADD_POST';

interface User {
  id: number;
  name: string;
  email: string;
}

interface Post {
  id: number;
  title: string;
  body: string;
}

interface CounterState {
  counter: {
    value: number;
  };
}

interface UsersState {
  items: User[];
  loading: boolean;
  error: string | null;
}

interface PostsState {
  items: Post[];
  loading: boolean;
  error: string | null;
}

interface FetchUsersSuccessAction extends Action<typeof FETCH_USERS_SUCCESS> {
  payload: User[];
}
interface FetchUsersFailureAction extends Action<typeof FETCH_USERS_FAILURE> {
  payload: string;
}
interface AddPostAction extends Action<typeof ADD_POST> {
  payload: Post;
}

type IncrementAction = Action<typeof INCREMENT>;
type DecrementAction = Action<typeof DECREMENT>;
type FetchUsersRequestAction = Action<typeof FETCH_USERS_REQUEST>;
type FetchPostsAction = Action<typeof FETCH_POSTS>;

type CounterActionTypes = IncrementAction | DecrementAction;
type UsersActionTypes = FetchUsersRequestAction | FetchUsersSuccessAction | FetchUsersFailureAction;
type PostsActionTypes = FetchPostsAction | AddPostAction;

// Define action creators
export const increment = (): IncrementAction => ({ type: INCREMENT });
export const decrement = (): DecrementAction => ({ type: DECREMENT });
export const fetchUsersRequest = (): FetchUsersRequestAction => ({ type: FETCH_USERS_REQUEST });
export const fetchUsersSuccess = (users: User[]): FetchUsersSuccessAction => ({ type: FETCH_USERS_SUCCESS, payload: users });
export const fetchUsersFailure = (error: string): FetchUsersFailureAction => ({ type: FETCH_USERS_FAILURE, payload: error });
export const fetchPosts = (): FetchPostsAction => ({ type: FETCH_POSTS });
export const addPost = (post: Post): AddPostAction => ({ type: ADD_POST, payload: post });

// Define initial state
const initialCounterState = {
  counter: {
    value: 0
  }
};

const initialUsersState = {
  items: [],
  loading: false,
  error: null
};

const initialPostsState = {
  items: [
    { id: 1, title: 'First Post', body: 'This is the first post' },
    { id: 2, title: 'Second Post', body: 'This is the second post' }
  ],
  loading: false,
  error: null
};

// Define reducers
const counterReducer = (state = initialCounterState, action: CounterActionTypes): CounterState => {
  switch (action.type) {
    case INCREMENT:
      return {
        ...state,
        counter: {
          ...state.counter,
          value: state.counter.value + 1
        }
      };
    case DECREMENT:
      return {
        ...state,
        counter: {
          ...state.counter,
          value: state.counter.value - 1
        }
      };
    default:
      return state;
  }
};

const usersReducer = (state = initialUsersState, action: UsersActionTypes): UsersState => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.payload
      };
    case FETCH_USERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

const postsReducer = (state = initialPostsState, action: PostsActionTypes): PostsState => {
  switch (action.type) {
    case FETCH_POSTS:
      return {
        ...state,
        loading: true
      };
    case ADD_POST:
      return {
        ...state,
        items: [...state.items, action.payload]
      };
    default:
      return state;
  }
};

// Combine reducers
const rootReducer = combineReducers({
  counter: counterReducer,
  users: usersReducer,
  posts: postsReducer
});

// Create store
const store = createStore(rootReducer);

export default store;