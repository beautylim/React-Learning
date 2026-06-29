import { createSlice } from "@reduxjs/toolkit";
import { clearToken } from "../../utils";
import { setToken as _setToken, getToken } from "../../utils";
import { loginAPI } from "../../apis/user";
const initialState = {
    token: getToken() || ""
};
const tokenStore = createSlice({
    name: "token",
    initialState,
    reducers: {
        setToken(state, action) {
            state.token = action.payload;
            _setToken(action.payload);
        },
        removeToken(state) {
            state.token = "";
            clearToken();
        }
    }
});
const { setToken, removeToken } = tokenStore.actions;
const fetchToken = (form) => {
    return async (dispatch) => {
        const res = await loginAPI(form);
        dispatch(setToken(res.data.token));
    };
};
export { fetchToken, removeToken };
const tokenReducer = tokenStore.reducer;
export default tokenReducer;
