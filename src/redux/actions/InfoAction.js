import {Dispatch} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const UPDATE_USE = 'UPDATE_EMAIL';
import axios from 'axios';
export const updateUse = use => ({
  type: UPDATE_USE,
  payload: use,
});
// export const updateId = id => dispatch => {
//   axios.get(`https://randomuser.me/api`).then(response => {
//     dispatch({
//       type: DATA_API,
//       payload: response.data,
//     });
//   });
// };
