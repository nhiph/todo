import * as types from '../constants/ActionTypes';

var initialState = {}; //closeForm

var myReducer = (state = initialState, action ) => {
    switch (action.type){
        case types.EDIT_TASK:
            return action.task; 
        default:
            return state;
    }
}
export default myReducer;