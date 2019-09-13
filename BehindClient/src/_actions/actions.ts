import {ActionCreator} from "redux";
import {TAction} from "./actionTypes";
import {IUser} from "../_interfaces/interfaceIUser";
import {ICountry} from "../_interfaces/interfaceICountry";
import {IState} from "../_interfaces/interfaceIState";
import {ICasting} from "../_interfaces/interfaceICasting";

export const setToken: ActionCreator<TAction> = (token: string) => ({
    type: "SET_TOKEN",
    token
});

export const setEmail: ActionCreator<TAction> = (email: string) => ({
    type: "SET_EMAIL",
    email
});

export const DeleteUserStore: ActionCreator<TAction> = (userId: string) => ({
    type: "DELETE_USER",
    userId
});

export const pushUser: ActionCreator<TAction> = (user: IUser) => ({
    type: "CREATE_USER",
    user
});

export const updateUser: ActionCreator<TAction> = (user: IUser) => ({
    type: "UPDATE_USER",
    user
});

export const setCountry: ActionCreator<TAction> = (country: ICountry[]) => ({
    type: "SET_COUNTRY",
    country
});

export const setState: ActionCreator<TAction> = (state: IState[]) => ({
    type: "SET_STATE",
    state
});

export const setCasting: ActionCreator<TAction> = (casting: ICasting[]) => ({
    type: "SET_CASTING",
    casting
});

export const setUser: ActionCreator<TAction> = (user: IUser[]) => ({
    type: "SET_USER",
    user
});