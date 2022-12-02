import React, { useEffect } from 'react';
import { Button, Offcanvas } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { checkoutCartThunk, getCartThunk } from '../store/slices/cart.slice';

const Cart = ({ show, handleClose }) => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCartThunk())

    }, [])

    const getCart = useSelector(state => state.cart)

    console.log(Cart)

  
    return (
        <Offcanvas show={show} onHide={handleClose}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title><b>Shopping Cart</b> {" "}<i class='bx bxs-cart bx-md'></i></Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                {getCart.map(carts => (
                    <div key={carts.id}>
                        <span><b>Product</b></span>
                        <hr />
                       <h6>{carts.title}</h6>
                       <span><b>Quantity:</b> {" "}{carts.productsInCart.quantity}</span>
                       <br />
                       <span><b>Price:</b>{" "}${carts.price}</span>
                       <div className='deleteProduct'><button  style={{border: "0"}}><i style={{fill: "lightblue"}} className='bx bxs-trash bx-sm' ></i></button></div>
                       <hr />
                      
                    </div>
                  
                ))
                 }
                <br /><hr />
                <Button onClick={() => dispatch(checkoutCartThunk())}  style={{ width: "100%" }}>Checkout</Button>
            </Offcanvas.Body>
        </Offcanvas>
    );
};

export default Cart;