import { createSlice } from '@reduxjs/toolkit'
import { standardStore } from 'app/services/redux';
import { initialState, reducers } from './reducer';

const slice = createSlice({
  name: 'global/loggedInUser',
  initialState,
  reducers,
});

export default standardStore({ slice });