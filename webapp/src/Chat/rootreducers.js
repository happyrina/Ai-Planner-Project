import { combineReducers } from 'redux';
import { messageReducer } from './messageReducer';

const rootReducer = combineReducers({
    content: messageReducer,
    authorRole:
    // Add other reducers if needed
});

export default rootReducer;