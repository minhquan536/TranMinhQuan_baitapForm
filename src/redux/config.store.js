import { combineReducers , createStore } from "redux";
import { reactFormReducer } from "./reducer/React.reducer";
//! file tao theo thu vien

/**
 * Reducer: noi quản lý state và logic
 * state = 10; 10 giá trị defualt của state
 */
const rootReducer = combineReducers({
    countReducer: (state = 100, action) => {
        // console.log({action})
        
        if(action.type === "TANG_GIAM_COUNT"){
            state += action.payload;
        }
        
        return state;
    },
    reactFormReducer
});

export const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);