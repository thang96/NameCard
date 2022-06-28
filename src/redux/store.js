import rootReducer from './index';
import {configureStore} from '@reduxjs/toolkit';

export default configureStore({reducer: rootReducer});
