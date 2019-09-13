import {TAction} from '../_actions/actionTypes';

const initialState: string = "";

export const emailReducer = (
    state: string = initialState,
    action: TAction
): string => {
    if (action.type === "SET_EMAIL"){
        return action.email
    }
    return state;
};