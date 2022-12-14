import {combineReducers} from 'redux';

import userSlice from '~/slices/userSlice';
import chatSlice from '~/slices/chatSlice';
import postSlice from '~/slices/postSlice';
import myPositionSlice from '~/slices/myPositionSlice';
import dogsSlice from '~/slices/dogsSlice';
import socketPositionSlice from '~/slices/socketPositionSlice';
import watcherSlice from '~/slices/watcherSlice';
const rootReducer = combineReducers({
  user: userSlice.reducer,
  myPosition: myPositionSlice.reducer,
  chat: chatSlice.reducer,
  post: postSlice.reducer,
  dogs: dogsSlice.reducer,
  socketPosition: socketPositionSlice.reducer,
  watcher: watcherSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
