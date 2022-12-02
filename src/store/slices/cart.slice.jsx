import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import getConfig from '../../utils/getConfig';
import { setIsLoading } from './isLoading.slice';

export const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        setCart: (state, action) => {
            return action.payload
        }
    }
})

export const getCartThunk = () => (dispatch) => {
    console.log("me ejecute")
    dispatch(setIsLoading(true));
    axios.get("https://e-commerce-api.academlo.tech/api/v1/cart", getConfig())
        .then((res) => dispatch(setCart(res.data.data.cart.products)))
        .finally(() => dispatch(setIsLoading(false)));
}

export const checkoutCartThunk = () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.post("https://e-commerce-api.academlo.tech/api/v1/purchases", {}, getConfig())
        .then(() => dispatch(setCart([])))
        .finally(() => dispatch(setIsLoading(false)));
}



export const { setCart } = cartSlice.actions;

export default cartSlice.reducer;
