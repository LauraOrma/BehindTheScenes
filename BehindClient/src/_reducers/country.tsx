import {TAction} from "../_actions/actionTypes";
import {ICountry} from "../_interfaces/interfaceICountry";

const initialUser: ICountry[] = [];

export const countryReducer = (
    state: ICountry[] = initialUser,
    action: TAction
): ICountry[] => {
    if (action.type === "SET_COUNTRY") {
        return action.country;
    }

    return state;
};