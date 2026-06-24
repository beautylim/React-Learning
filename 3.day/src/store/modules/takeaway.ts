import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"
import type { AppDispatch } from "../index"

// --- 数据模型 ---
export interface MenuItem {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  description?: string;
  sales: number;
  rating: number; // 好评度百分比
  isRecommended?: boolean;
  categoryId: string;
}

// 购物车项
export interface CartItem extends MenuItem {
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
  items: MenuItem[];
}

interface QuanityUpdateAction {
  id: string;
  delta: number;
}

interface FoodState {
  foodList: Category[];
  cartList: CartItem[];
}

const initialState: FoodState = {
  foodList: [],
  cartList: []
}

const foodStore = createSlice({
  name: 'foods',
  initialState,
  reducers: {
    setFoodList(state, action: PayloadAction<Category[]>) {
      state.foodList = action.payload
    },

    addCartList(state, action: PayloadAction<MenuItem>) {
      const item = state.cartList.find(item => item.id === action.payload.id)
      if (item) {
        item.quantity++
      } else {
        state.cartList.push({ ...action.payload, quantity: 1 })
      }
    },

    clearCartList(state) {
      state.cartList = []
    },

    updateCartItemQuanity(state, action: PayloadAction<QuanityUpdateAction>) {
      console.log(action.payload)
      console.log(state.cartList)
      const existing = state.cartList.find(cart => cart.id === action.payload.id);
      console.log(existing)
      if (!existing) return;
      const newQuantity = existing.quantity + action.payload.delta;
      if (newQuantity <= 0) {
        state.cartList = state.cartList.filter(cart => cart.id !== action.payload.id);
      }
      state.cartList = state.cartList.map(cart =>
        cart.id === action.payload.id ? { ...cart, quantity: newQuantity } : cart
      );

    }

  }
})

const { setFoodList, addCartList, clearCartList, updateCartItemQuanity } = foodStore.actions

const fetchFoodList = () => {
  return async (dispatch: AppDispatch) => {
    const res = await axios.get("http://localhost:3004/categories")
    dispatch(setFoodList(res.data))
    console.log("fetch complete")
  }
}

export { fetchFoodList, addCartList, clearCartList, updateCartItemQuanity }

const foodReducer = foodStore.reducer

export default foodReducer