import React, { useEffect } from 'react';
import { Container, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPurchasesThunk } from '../store/slices/purchases.slice';

const Purchases = () => {

    const dispatch = useDispatch()

    const purchases = useSelector(state => state.purchases)

    useEffect(() => {
        dispatch(getPurchasesThunk())
    }, [])


    return (
        <div>
            <h3 style={{ textAlign: "center" }}>My Purchases</h3>
            <hr />
            <div>
                {
                    purchases.map(purchase => (
                        <div key={purchase.id}>
                            {purchase.cart.products.map(product => (
                                <Container fluid>
                                    <Table key={product.id}>
                                        <thead>
                                            <tr>
                                                <th>Brand</th>
                                                <th>Date of Purchase</th>
                                                <th>Product Name</th>
                                                <th>Quantity</th>
                                                <th>Price</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{product.brand}</td>
                                                <td>{product.createdAt}</td>
                                                <Link to={`/product/${product.id}`}>
                                                    <td>
                                                        {product.title}
                                                    </td>
                                                </Link>
                                                <td>{product.productsInCart.quantity}</td>
                                                <td>${product.price}</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </Container>
                            ))}
                        </div>
                    ))
                }
            </div>

        </div>
    );
};

export default Purchases;