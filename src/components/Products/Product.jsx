import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addItem } from '../../redux/reducer/cartSlice';
import Loading from '../Loading';

export default function Product() {

    const { id } = useParams();
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch()
    const addProduct = product => {
        dispatch(addItem(product));
    }

    useEffect(() => {
        const getProduct = async () => {
            setLoading(true);
            const response = await fetch(`https://www.amiiboapi.com/api/amiibo/?id=${id}`)
            const result = await response.json();
            const productFormated = {...result.amiibo, price: (Math.random() * (10000 - 100) + 100).toFixed(2)}
            setProduct(productFormated);
            setLoading(false);
        }
        getProduct();
    }, [id])

    const ShowProduct = () => {
        return (
            <>
                <div className="col-md-6">
                    <img src={product.image} alt={product.name} height="400px" width="400ps" />
                </div>
                <div className="col-md-6">
                    <h4 className='text-uppercase text-black-50'>
                        {product.type}
                    </h4>
                    <h1 className='display-5'>{product.name}</h1>
                    <h3 className='display-6 fw-bold my-4'>
                        {`$ ${product.price}`}
                    </h3>
                    <p className='lead'> {`Game series: ${product.gameSeries}`}</p>
                    <button className='btn btn-outline-dark px-4 py-2' onClick={() => addProduct(product)}>
                        Add to Cart
                    </button>
                    <NavLink to='/cart' className='btn btn-dark ms-2 px-3 py-2'>Go to Cart</NavLink>
                </div>
            </>
        )
    }

    return (
        <div>
            <div className="container py-5">
                <div className="row py-4">
                    {loading ? <Loading /> : <ShowProduct />}
                </div>
            </div>
        </div>
    )
}
