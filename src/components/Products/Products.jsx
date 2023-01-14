import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import Loading from '../Loading';

export default function Products() {

    const [data, setData] = useState([]);
    const [filter, setFilter] = useState(data);
    const [loading, setLoading] = useState(false);

    let componentMounted = true;

    useEffect(() => {
        const getProducts = async () => {
            setLoading(true);
            const response = await fetch("https://www.amiiboapi.com/api/amiibo/")
            if (componentMounted) {
                const result = await response.json();
                setData(result.amiibo);
                setFilter(result.amiibo);
                setLoading(false);
            }
            return () => {
                componentMounted = false;
            }
        }
        getProducts();
    }, [])

    const filterProducts = type => {
        const filteredList = data.filter(product => product.type === type);
        setFilter(filteredList);
    }

    const ShowProducts = () => {
        return (
            <>
                <div className="buttons d-flex justify-content-center mb-5 pb-5">
                    <button className='btn btn-outline-dark me-2' onClick={()=>setFilter(data)}>All</button>
                    <button className='btn btn-outline-dark me-2' onClick={()=> filterProducts('Card')}>Card</button>
                    <button className='btn btn-outline-dark me-2' onClick={()=> filterProducts('Figure')}>Figure</button>
                    <button className='btn btn-outline-dark me-2' onClick={()=> filterProducts('Yarn')}>Yarn</button>
                </div>
                {filter.map((product, index) => {
                    return (
                        <div className="col-md-3" key={index}>
                            <div className="card h-100 text-center p-4">
                                <img src={product.image} className="card-img-top" alt={product.name} />
                                <div className="card-body">
                                    <h5 className="card-title">{product.name}</h5>
                                    <p className="card-text">{`$ ${(Math.random() * (10000 - 100)+100).toFixed(2)}`}</p>
                                    <h5 className="card-title">{product.type}</h5>
                                    <NavLink to={`/products/${product.head}${product.tail}`} className="btn btn-primary">Buy Now</NavLink>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </>
        )
    }

    return (
        <div>
            <div className="container my-5 py-5">
                <div className="row">
                    <div className="col-12 mb-5">
                        <h1 className='display-6 fw-bolder text-center'>Latest Products</h1>
                        <hr />
                    </div>
                </div>
                <div className="row justify-content-center">
                    {loading ? <Loading /> : <ShowProducts />}
                </div>
            </div>
        </div>
    )
}
