import { createSlice } from '@reduxjs/toolkit'

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: [],
        total: 0
    },
    reducers: {
        addItem: (state, action) => {
            const product = action.payload;
            const exits = state.cart.find(x => x.head === product.head && x.tail === product.tail);
            if (exits) {
                return { 
                    ...state, 
                    cart: state.cart.map(x => x.head === product.head && x.tail === product.tail ? { ...x, quantity: x.quantity + 1 } : x),
                    total: state.total + parseInt(exits.price)
                }
            } else {
                return {
                    ...state,
                    cart: [
                        ...state.cart,
                        {
                            ...product,
                            quantity: 1
                        }
                    ],
                    total: state.total + parseInt(product.price)
                }
            }
        },
        removeItem: (state, action) => {
            const product = action.payload;
            const exitsItem = state.cart.find(x => x.head === product.head && x.tail === product.tail );
            if (exitsItem.quantity === 1) {
                return {...state, cart: state.cart.filter(x => x.head !== product.head || x.tail !== product.tail)};
            } else {
                return { 
                    ...state,
                    cart: state.cart.map(x => x.head === product.head && x.tail === product.tail ? { ...x, quantity: x.quantity - 1 } : x)
                }
            }
        }
    }
})

// Action creators are generated for each case reducer function
export const { addItem, removeItem } = cartSlice.actions

export default cartSlice.reducer
