import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  watchId: undefined,
  isSaving: false,
  isLogging: false,
  myPosition: null,
  startDate: null,
  lastUpdate: null,
  path: [],
  second: 0,
  distance: 0,
  walkRoomId: '',
  dogs: [],
};

const socketPositionSlice = createSlice({
  name: 'socketPosition',
  initialState,
  reducers: {
    setIsLoggingOn(state) {
      state.isLogging = true;
    },
    setIsLoggingOff(state) {
      state.isLogging = false;
    },
    setIsSavingOn(state) {
      state.isSaving = true;
    },
    setIsSavingOff(state) {
      state.isSaving = false;
    },
    setMyPosition(state, action) {
      state.myPosition = action.payload;
    },
    addPath(state, action) {
      state.path = state.path.concat(action.payload);
    },
    setStates(state, action) {
      state.startDate = action.payload.startDate;
      state.lastUpdate = action.payload.lastUpdate;
      state.path = action.payload.walkingLogs;
      state.myPosition = action.payload.myPosition;
    },
    resetStates(state) {
      Object.assign(state, initialState);
    },
    setWatchId(state, action) {
      state.watchId = action.payload;
    },
    setStartDate(state, action) {
      state.startDate = action.payload;
    },
    setSecond(state, action) {
      state.second = action.payload;
    },
    setLastUpdate(state, action) {
      state.lastUpdate = action.payload;
    },
    setWalkRoomId(state, action) {
      state.walkRoomId = action.payload;
    },
    setDogs(state, action) {
      state.dogs = action.payload.dogs;
    },
    addDistance(state, action) {
      state.distance = state.distance + action.payload;
    },
  },
  extraReducers: builder => {},
});

export const {
  setDogs,
  setMyPosition,
  setIsLoggingOn,
  setIsLoggingOff,
  addPath,
  setStates,
  resetStates,
  setIsSavingOn,
  setIsSavingOff,
  setWatchId,
  setStartDate,
  setLastUpdate,
  setSecond,
  addDistance,
  setWalkRoomId,
} = socketPositionSlice.actions;
export default socketPositionSlice;
