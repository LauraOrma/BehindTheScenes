import {IUser} from "../_interfaces/interfaceIUser";
import {ICountry} from "../_interfaces/interfaceICountry";
import {IState} from "../_interfaces/interfaceIState";
import {ICasting} from "../_interfaces/interfaceICasting";

type TSetAction = {
    type: "SET_TOKEN";
    token: string;
};

type TSetEmail = {
    type: "SET_EMAIL";
    email: string;
};

type TDeleteUser = {
    type: "DELETE_USER";
    userId: string;
};

type TCreateUser = {
    type: "CREATE_USER";
    user: IUser;
};

type TUpdateUser = {
    type: "UPDATE_USER";
    user: IUser;
};

type TSetCountry = {
    type: "SET_COUNTRY";
    country: ICountry[];
};

type TSetState = {
    type: "SET_STATE";
    state: IState[];
};

type TSetCasting = {
    type: "SET_CASTING";
    casting: ICasting[];
};

type TSetUser = {
    type: "SET_USER";
    user: IUser[];
};

export type TAction =
    TSetAction
    | TSetEmail
    | TDeleteUser
    | TCreateUser
    | TUpdateUser
    | TSetCountry
    | TSetState
    | TSetCasting
    | TSetUser;