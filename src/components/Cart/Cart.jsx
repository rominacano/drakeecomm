import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, removeItem } from '../../redux/reducer/cartSlice';

export default function Cart() {
    const state = useSelector(state => state.cart);
    const dispatch = useDispatch()

    const handleButton = (product, operation) => {
        if (operation === "plus") {
            dispatch(addItem(product));
        } else {
            dispatch(removeItem(product));
        }
    }

    return (
        <>
            <div className="container my-3 py-3">
                <div className="row">
                    <div className="col-12">
                        <h1 className='display-6 fw-bolder text-center'>My Cart</h1>
                        <hr />
                    </div>
                </div>
            </div>
            {state.cart.map(product => {
                return (
                    <div className="container">
                        <div className="row">
                            <div className="col-md-4">
                                <img src={product.image} alt={product.name} height='200px' width="180px" />
                            </div>
                            <div className="col-md-4">
                                <h3>{product.name}</h3>
                                <p className='lead fw-bold'>
                                    {product.quantity}
                                </p>
                                <button className="btn btn-outline-dark me-4" onClick={() => handleButton(product, "minus")}>
                                    <i className="fa fa-minus"></i>
                                </button>
                                <button className="btn btn-outline-dark me-4" onClick={() => handleButton(product, "plus")}>
                                    <i className="fa fa-plus"></i>
                                </button>
                                <h5 className='me-3 text-end fw-bold'>{`Precio: $ ${product.price}`}</h5>
                            </div>
                        </div>
                    </div>
                )
            })}
            <h3 className='me-3 text-center fw-bold'>{`Precio Total: $ ${state.total}`}</h3>
        </>
    )
}
