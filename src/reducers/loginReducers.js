import { LOGIN, ADD_USER, UPDATE_USER, FORM_SUBMISSION_STATUS } from '../types';

export const initialState = {
    profile: {
      firstName: '',
      lastName: '',
      telephone: '',
      age: 28,
      email: '',
      state: '',
      country: '',
      address: 'Home',
      address1: '',
      address2: '',
      interests: [],
      profileImage: '',
      subscribenewsletter: false
    },
    formSubmitted: false
  }


const loginReducer = (state = {}, action ) => {
    switch(action.type){
        case LOGIN:
            console.log('login', action.payload.user)
            return {
                ...state, 
                profile: action.payload.user,
                formSubmitted: false // after update user formsubmition reset
            }
            case ADD_USER:
                return {
                  ...state,
                  profile: action.payload.user,
                  formSubmitted: false // after update user formsubmition reset
                }
              case UPDATE_USER:
                return {
                  ...state,
                  profile: action.payload.user,
                  formSubmitted: false // after update user formsubmition reset
                }
              
              case FORM_SUBMISSION_STATUS:
                return {
                  ...state,
                  formSubmitted: action.payload.status
                }
              default:
                return state;
     
    }
}

export {loginReducer}