import type { RootState, AppDispatch } from "./index"
import { useDispatch, useSelector, type TypedUseSelectorHook } from "react-redux"


// 带类型的 hooks，替代普通的 useDispatch / useSelector
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector