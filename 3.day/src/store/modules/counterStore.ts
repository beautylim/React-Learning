import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


const counterStore = createSlice({
  name: "counter",
  initialState: {
    count: 0
  },
  // 修改状态的方法 同步方法 支持之间修改
  reducers: {
    increment(state) {
      state.count++
    },
    decrement(state) {
      state.count--
    },
    addToNum(state, action: PayloadAction<number>) {
      state.count = action.payload
    }
  }
})

// 解构action
const { increment, decrement, addToNum } = counterStore.actions
//获取reducer
const counterReducer = counterStore.reducer

//以按需导出的方式导出action
export { increment, decrement, addToNum }
//默认导出

export default counterReducer
