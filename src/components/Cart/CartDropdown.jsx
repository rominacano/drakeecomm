import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, removeItem } from '../../redux/reducer/cartSlice';

export default function CartDropdown() {

    const cart = useSelector(state => state.cart.cart);
    const dispatch = useDispatch()

    const handleButton = (product, operation) => {
        if (operation === "plus") {
            dispatch(addItem(product));
        } else {
            dispatch(removeItem(product));
        }
    }

    return (
        <div className="dropdown-center ms-2">
            <button className="btn btn-outline-dark dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                <i className="fa fa-shopping-cart me-1"></i>Cart ({cart.length})
            </button>
            <div className="dropdown-menu" >
                {cart.map((product, index) => {
                    return (
                        <div key={index}>
                            <div className="container mt-4 d-flex" >
                                <div >
                                    <img src={product.image} alt={product.name} height='50px' width="30px" />
                                </div>
                                <div className="d-flex mx-auto mb-2">
                                    <h6 className='me-3' >{product.name}</h6>
                                    <button className="btn btn-outline-dark me-3 btn-sm" onClick={() => handleButton(product, "minus")}>
                                        <i className="fa fa-minus"></i>
                                    </button>
                                    <p className='lead fw-bold me-3'>
                                        {product.quantity}
                                    </p>
                                    <button className="btn btn-outline-dark me-3 btn-sm" onClick={() => handleButton(product, "plus")}>
                                        <i className="fa fa-plus"></i>
                                    </button>
                                </div>
                            </div>
                            <h5 className='me-3 text-end fw-bold'>{`Precio: $ ${product.price}`}</h5>
                            <hr />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
