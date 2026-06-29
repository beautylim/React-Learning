import { createSlice } from "@reduxjs/toolkit";
import { getUserProfileAPI } from "../../apis/user";
const emptyUserInfo = { userId: 0, username: "", password: "", email: "", phone: "" };
const initialState = {
    userInfo: emptyUserInfo
};
const userInfoStore = createSlice({
    name: "userInfo",
    initialState,
    reducers: {
        setUserInfo(state, action) {
            state.userInfo = action.payload;
        },
        clearUserInfo(state) {
            state.userInfo = emptyUserInfo;
        }
    }
});
const { setUserInfo, clearUserInfo } = userInfoStore.actions;
const fetchUserInfo = () => {
    return async (dispatch) => {
        const res = await getUserProfileAPI();
        dispatch(setUserInfo(res.data));
    };
};
export { fetchUserInfo, clearUserInfo };
const userInfoReducer = userInfoStore.reducer;
export default userInfoReducer;
