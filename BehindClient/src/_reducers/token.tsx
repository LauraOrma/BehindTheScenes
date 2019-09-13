import {TAction} from '../_actions/actionTypes';

const initialState: string = "";

export const tokenReducer = (
    state: string = initialState,
    action: TAction
): string => {
    if (action.type === "SET_TOKEN") {
        return action.token
    }
    return state;
};