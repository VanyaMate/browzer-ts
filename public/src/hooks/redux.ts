import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {StoreType} from "../store";
import {bindActionCreators} from "redux";
import {authActions} from "../store/auth/auth.slice";

const actions = {
    ...authActions
}

export const useMySelector: TypedUseSelectorHook<StoreType> = useSelector;
export const useActions = () => {
    const dispatch = useDispatch();
    return bindActionCreators(actions, dispatch);
}