import rootReducer from './index';
import {configureStore} from '@reduxjs/toolkit';

export default configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({immutableCheck: false, serializableCheck: false}),
});
