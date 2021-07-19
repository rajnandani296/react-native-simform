import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {combineReducers} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {reducer as fetchChemicalReducer} from '../reducer';

import {persistStore, persistReducer} from 'redux-persist';
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['fetchChemicalReducer'],
};
const reducers = combineReducers({
  fetchChemicalReducer: fetchChemicalReducer,
});
const pReducer = persistReducer(persistConfig, reducers);
// Connect our store to the reducers
const store = createStore(pReducer, applyMiddleware(thunk));
const persistor = persistStore(store);
export {store, persistor};
