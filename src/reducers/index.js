import {combineReducers} from 'redux';
import tasks from './tasks';
import isDisplayForm from './isDisplayForm';
import itemEditing from './editTask';

const myReducer = combineReducers ({

    tasks,
    isDisplayForm,
    itemEditing
});
export default myReducer;