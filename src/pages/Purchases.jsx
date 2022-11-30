import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPurchasesThunk } from '../store/slices/purchases.slice';


const Purchases = () => {

    const dispatch = useDispatch()

    const purchases = useSelector(state => state.purchases)

   

   useDispatch(() => {
    dispatch(getPurchasesThunk())
   }, [] )

    return (
        <div>
            <h1>Purchases</h1>
        </div>
    );
};

export default Purchases;
