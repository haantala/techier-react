import { combineReducers } from 'redux';
import Data from './data';

const rootReducer = combineReducers({
  Data,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
