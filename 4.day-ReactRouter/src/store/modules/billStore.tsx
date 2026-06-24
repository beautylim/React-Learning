import { createSlice } from "@reduxjs/toolkit";
import type { AppDispatch } from "..";
import axios from "axios"

export interface Bill {
  id: string,
  type: string,
  money: number,
  date: string,
  useFor: string
}

interface BillState {
  billList: Bill[]
}

const initialState: BillState = {
  billList: []
}

const billStore = createSlice({
  name: "bill",
  initialState,
  reducers: {
    setBillList(state, action) {
      state.billList = action.payload
    },

    addBillList(state, action) {
      state.billList.push(action.payload)
    }
  }
})


const { setBillList, addBillList } = billStore.actions

const fechBillList = () => {
  return async (dispatch: AppDispatch) => {
    const res = await axios.get(' http://localhost:3004/records')
    dispatch(setBillList(res.data))
  }
}

const postBillList = (data: Bill) => {
  return async (dispatch: AppDispatch) => {
    console.log(data)
    const res = await axios.post(' http://localhost:3004/records', data)
    dispatch(addBillList(res.data))
  }
}
export { fechBillList, postBillList }

const billReducer = billStore.reducer
export default billReducer
