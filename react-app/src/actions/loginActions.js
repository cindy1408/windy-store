import { LOGIN, ADD_USER, UPDATE_USER, FORM_SUBMISSION_STATUS } from '../types';

//holds the constants of actions to be reused. 
const loginAction = {
    login: (user) => ({type: LOGIN, payload: {user}}), 
    register: (user) => ({type: ADD_USER, payload: {user}}),
    updateUser: (user) => ({type: UPDATE_USER, pauload: {user}}),
    formSubmissionStatus: (status) => ({type: FORM_SUBMISSION_STATUS, payload: {status}})
}

export default loginAction