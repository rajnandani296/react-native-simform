import {
  FETCH_CHEMICAL_RECORD_SUCCESS,
  FETCH_CHEMICAL_RECORD_ERROR,
} from './ActionType';
import {BASE_URL} from '../constants/Config';
import axios from 'axios';

export const fetchChemicalRecord = loading => {
  console.log('fetchChemicalRecord');
  return async dispatch => {
    //Then perform your asynchronous operations.
    try {
      axios
        .get(BASE_URL)
        .then(function (response) {
          dispatch({
            type: FETCH_CHEMICAL_RECORD_SUCCESS,
            data: response,
          });
        })
        .catch(function (error) {
          // handle error
          dispatch({type: FETCH_CHEMICAL_RECORD_ERROR, error: error});
          console.log(error);
        });
    } catch (error) {
      console.log('Getting People Error---------', error);
      dispatch({type: FETCH_CHEMICAL_RECORD_ERROR, error: error});
    }
  };
};
