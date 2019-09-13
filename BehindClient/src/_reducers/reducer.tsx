import {combineReducers} from "redux";
import {tokenReducer} from "./token";
import {emailReducer} from "./email";
import {ICountry} from "../_interfaces/interfaceICountry";
import {countryReducer} from "./country";
import {stateReducer} from "./state";
import {IState} from "../_interfaces/interfaceIState";
import {ICasting} from "../_interfaces/interfaceICasting";
import {castingReducer} from "./casting";
import {userReducer} from "./user";
import {IUser} from "../_interfaces/interfaceIUser";

export interface IGlobalState {
    token: string;
    email: string;
    country: ICountry[];
    state: IState[];
    casting: ICasting[];
    user: IUser[];
}

export const reducer = combineReducers<IGlobalState>({
    token: tokenReducer,
    email: emailReducer,
    country: countryReducer,
    state: stateReducer,
    casting: castingReducer,
    user: userReducer
});
