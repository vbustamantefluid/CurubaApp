import { createReducer, on } from "@ngrx/store";
import { AppInitialState } from "../AppState";
import { hide, show } from "./loading.actions";
import { LoadingState } from "./LoadingState";

const initialState: LoadingState = AppInitialState.loading;

const reducer = createReducer(
    initialState,
    on(show, () => { return {show: true} }),
    on(hide, () => { return {show: false} })
);

export function loadingReducer(state: LoadingState, action){
    return reducer(state, action);
}