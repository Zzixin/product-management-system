import { createStore } from 'redux';
import { optionReducer } from '../reducers/index.js';
export const store = createStore(optionReducer);
