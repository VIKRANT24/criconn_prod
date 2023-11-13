//local imports
import { LOADING_ACTION } from "../action/common"


const initialState = {
    showLoading: false
}

export function AuthReducer(state = initialState,action)
{
    if(action.type === LOADING_ACTION)
    {
       return {
           ...state,
           showLoading: action.payload
       }
    }
    return state;
}