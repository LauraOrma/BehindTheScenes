import {TAction} from "../_actions/actionTypes";
import {IState} from "../_interfaces/interfaceIState";

const initialUser: IState[] = [];

export const stateReducer = (
    state: IState[] = initialUser,
    action: TAction
): IState[] => {
    if (action.type === "SET_STATE") {
        return action.state;
    }

    return state;
};