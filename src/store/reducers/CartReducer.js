const initState = {
    products: [],
    totalPrice: 0,
    totalQuantities: 0
}

const CartReducer = (state = initState, action) => {
    let findproduct;
    let index;
    switch(action.type){
        case 'ADD_TO_CART':
            // console.log(action.payload.product.id);
            const {product, quantity} = action.payload;
            // console.log(product.id);
            const check = state.products.find(pr => pr.id === product.id);
            if(check){
                return state;
            } else {
                const Tprice = state.totalPrice + product.discountPrice * quantity;
                const Tquantities = state.totalQuantities + quantity;
                product.quantity = quantity;
                return {
                    ...state, products: [...state.products, product],totalPrice: Tprice, totalQuantities: Tquantities 
                }
    
            }
            case 'INC':
                findproduct = state.products.find(product => product.id === action.payload);
                index = state.products.findIndex(product => product.id === action.payload);
                findproduct.quantity += 1;
                state.products[index] = findproduct;
                    return{
                        ...state,
                        totalPrice: state.totalPrice + findproduct.discountPrice, totalQuantities: state.totalQuantities+1
                    }
            case 'DEC':
                findproduct = state.products.find(product => product.id === action.payload);
                index = state.products.findIndex(product => product.id === action.payload);
                if(findproduct.quantity > 1){
                    findproduct.quantity -= 1;
                    state.products[index] = findproduct;
                    return{
                        ...state,
                        totalPrice: state.totalPrice - findproduct.discountPrice, totalQuantities: state.totalQuantities-1
                    }
                } else{
                    return state;
                }
            case 'REMOVE':
                findproduct = state.products.find(product => product.id === action.payload);
                const filtered =state.products.filter(product => product.id !== action.payload);
                return{
                    ...state,
                    products: filtered,
                    totalPrice: state.totalPrice - findproduct.discountPrice * findproduct.quantity,
                    totalQuantities: state.totalQuantities - findproduct.quantity
                }
        default:
            return state;
    }
}
export default CartReducer;