import {combineReducers} from "redux";
import userStore from "./userStore";
import {configureStore} from "@reduxjs/toolkit";
import authStore from "./authStore";
import friendsStore from "./friendsStore";


export default configureStore({
    reducer: {
        user: userStore,
        auth: authStore,
        friends: friendsStore
    }
});
